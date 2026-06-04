import React, { useState, useRef, useEffect } from "react";
import { Loader2, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Upload, X, MapPin } from "lucide-react";

// Same-origin API paths. In production these are Cloudflare Pages Functions;
// in local dev they are handled by the Vite proxy / middleware (vite.config.js).
const QUESTIONS_URL = "/api/booking-questions";
const SUBMIT_URL = "/api/booking-submit";
const PHOTOS_URL = "/api/booking-photos";
const ADDRESS_URL = "/api/address-autocomplete";

const MAX_PHOTOS = 6;
const JSON_HEADERS = { "Content-Type": "application/json" };

// Fire the Google Ads booking conversion (once, when the lead is captured).
function fireConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18190004003/W96tCOG0v7QcEKPe1eFD",
      value: 200,
      currency: "AUD",
    });
  }
}

function safeParseQuestions(text) {
  if (!text) return [];
  try {
    const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleaned);
    if (Array.isArray(data)) return data.filter(Boolean).slice(0, 8);
    if (Array.isArray(data.questions)) return data.questions.filter(Boolean).slice(0, 8);
    return [];
  } catch {
    return [];
  }
}

// Downscale + compress an image file to a JPEG data URL so payloads stay small.
function compressImage(file, maxDim = 1600, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        try {
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = reader.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors";

export default function BookingEmbed({ variant = "section" }) {
  const [step, setStep] = useState("details"); // details | questions | done
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Two-phase capture: the lead is created/sent on Continue; the final step
  // only updates that same lead with the answers (no duplicate).
  const [started, setStarted] = useState(false);
  const [leadId, setLeadId] = useState("");

  // Address autocomplete
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addrTimer = useRef(null);
  const addrBox = useRef(null);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const detailsValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.description.trim();

  useEffect(() => {
    function onDocClick(e) {
      if (addrBox.current && !addrBox.current.contains(e.target)) setShowSuggestions(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function onAddressChange(e) {
    const value = e.target.value;
    setForm((f) => ({ ...f, address: value }));
    if (addrTimer.current) clearTimeout(addrTimer.current);
    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    addrTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${ADDRESS_URL}?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        const list = Array.isArray(data.suggestions) ? data.suggestions : [];
        setSuggestions(list);
        setShowSuggestions(list.length > 0);
        if (data && data.error) console.warn("Address autocomplete:", data.error);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 280);
  }

  function pickAddress(text) {
    setForm((f) => ({ ...f, address: text }));
    setSuggestions([]);
    setShowSuggestions(false);
  }

  async function onPhotos(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    const room = MAX_PHOTOS - photos.length;
    const next = [];
    for (const file of files.slice(0, room)) {
      if (!file.type.startsWith("image/")) continue;
      const dataUrl = await compressImage(file);
      if (dataUrl) next.push({ id: `${Date.now()}-${file.name}-${Math.random()}`, name: file.name, dataUrl });
    }
    setPhotos((p) => [...p, ...next]);
  }

  function removePhoto(id) {
    setPhotos((p) => p.filter((x) => x.id !== id));
  }

  function basePayload(extra) {
    return {
      firstName: form.firstName,
      lastName: form.lastName,
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      phone: form.phone,
      address: form.address,
      description: form.description,
      photoCount: photos.length,
      ...extra,
    };
  }

  // Attach the uploaded photos to the ServiceM8 job (fire-and-forget).
  function attachPhotos(jobId) {
    if (!jobId || !photos.length) return;
    try {
      fetch(PHOTOS_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        keepalive: true,
        body: JSON.stringify({ leadId: jobId, photos: photos.map((p) => ({ name: p.name, dataUrl: p.dataUrl })) }),
      }).catch(() => {});
    } catch {
      /* ignore */
    }
  }

  async function fetchQuestions() {
    try {
      const res = await fetch(QUESTIONS_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({ description: form.description }),
      });
      return safeParseQuestions(await res.text());
    } catch {
      return [];
    }
  }

  async function startLead() {
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(basePayload({ qa: [], leadId: "" })),
      });
      if (!res.ok) return null;
      const data = await res.json().catch(() => ({}));
      return typeof data.leadId === "string" ? data.leadId : "";
    } catch {
      return null;
    }
  }

  async function handleNext(e) {
    e.preventDefault();
    if (!detailsValid) {
      setError("Please fill in your name, email, phone and a short description.");
      return;
    }
    setError("");
    setLoading(true);
    const [lead, qs] = await Promise.all([startLead(), fetchQuestions()]);
    if (lead !== null) {
      setStarted(true);
      setLeadId(lead);
      fireConversion();
      attachPhotos(lead);
    }
    setQuestions(qs);
    setLoading(false);
    setStep("questions");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const qa = questions.map((q) => ({ question: q, answer: (answers[q] || "").trim() }));
    try {
      if (started) {
        if (leadId) {
          await fetch(SUBMIT_URL, {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify(basePayload({ qa, leadId })),
          });
        }
        setStep("done");
      } else {
        const res = await fetch(SUBMIT_URL, {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify(basePayload({ qa, leadId: "" })),
        });
        if (!res.ok) throw new Error("bad status");
        const data = await res.json().catch(() => ({}));
        attachPhotos(typeof data.leadId === "string" ? data.leadId : "");
        fireConversion();
        setStep("done");
      }
    } catch {
      if (started) {
        setStep("done");
      } else {
        setError(
          "Sorry — something went wrong sending your enquiry. Please call us on (07) 5651 2386 and we'll sort it out."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const steps = (
    <>
      {step === "details" && (
        <form onSubmit={handleNext} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
              <input className={inputClass} value={form.firstName} onChange={setField("firstName")} placeholder="First name" autoComplete="given-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
              <input className={inputClass} value={form.lastName} onChange={setField("lastName")} placeholder="Last name" autoComplete="family-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input className={inputClass} value={form.phone} onChange={setField("phone")} placeholder="04xx xxx xxx" inputMode="tel" autoComplete="tel" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input className={inputClass} value={form.email} onChange={setField("email")} placeholder="you@email.com" type="email" autoComplete="email" />
            </div>
          </div>

          <div ref={addrBox} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                className={inputClass + " pl-10"}
                value={form.address}
                onChange={onAddressChange}
                onFocus={() => suggestions.length && setShowSuggestions(true)}
                placeholder="Start typing your address…"
                autoComplete="off"
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {suggestions.map((s, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => pickAddress(s.text)}
                    className="w-full text-left px-4 py-2.5 hover:bg-green-50 text-gray-700 text-sm flex items-start gap-2"
                  >
                    <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{s.text}</span>
                  </button>
                ))}
                <div className="px-4 py-1.5 text-[11px] text-gray-400 text-right border-t border-gray-100">
                  powered by Google
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How can we help you? *</label>
            <textarea
              className={inputClass + " min-h-[110px] resize-y"}
              value={form.description}
              onChange={setField("description")}
              placeholder="e.g. Two storey house, want the windows cleaned inside and out, plus the gutters cleared."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg px-4 py-5 cursor-pointer hover:border-green-400 hover:bg-green-50/40 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Tap to add photos of the job</span>
              <span className="text-xs text-gray-400 mt-1">Up to {MAX_PHOTOS} images</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={onPhotos} disabled={photos.length >= MAX_PHOTOS} />
            </label>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                {photos.map((p) => (
                  <div key={p.id} className="relative group">
                    <img src={p.dataUrl} alt={p.name} className="w-full h-20 object-cover rounded-lg border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => removePhoto(p.id)}
                      className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-0.5 shadow hover:bg-red-50"
                      aria-label="Remove photo"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving your details…
              </>
            ) : (
              <>
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400">
            Free, no-obligation quote. Your details are sent to our team as soon as you press Continue.
          </p>
        </form>
      )}

      {step === "questions" && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {questions.length > 0 ? (
            <>
              <div className="flex items-center text-green-600 font-medium">
                <Sparkles className="w-5 h-5 mr-2" />
                A few quick questions so we can quote accurately
              </div>
              {questions.map((q, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{q}</label>
                  <input
                    className={inputClass}
                    value={answers[q] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q]: e.target.value }))}
                    placeholder="Your answer (optional)"
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-600">All set — send your enquiry through and we'll be in touch.</p>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => { setError(""); setStep("details"); }}
              className="inline-flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending…
                </>
              ) : (
                "Submit Booking Request"
              )}
            </button>
          </div>
        </form>
      )}

      {step === "done" && (
        <div className="text-center py-6">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanks, {form.firstName || "there"}!</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Your enquiry has been received and sent straight to our team. We'll be in touch shortly with your free quote.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Need us sooner? Call <a href="tel:0756512386" className="text-green-600 font-medium">(07) 5651 2386</a>.
          </p>
        </div>
      )}
    </>
  );

  // Compact card for the hero side column.
  if (variant === "hero") {
    return (
      <div id="quote-form" className="bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-7 w-full">
        <div className="text-center mb-5">
          <h3 className="text-2xl font-bold text-gray-900">Get a Free Quote in 2 Minutes</h3>
        </div>
        {steps}
      </div>
    );
  }

  // Full-width section (used at the bottom of pages).
  return (
    <section className="py-16 bg-white" id="book-online">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Online — Free Quote</h2>
          <p className="text-lg text-gray-600">
            Tell us about your job and we'll get back to you fast. No phone call required.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-10">
          {steps}
        </div>
      </div>
    </section>
  );
}
