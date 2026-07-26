import React, { useState, useRef, useEffect, useMemo } from "react";
import { calculateQuote, formatMoney } from "./engine";
import {
  buildQuestionSteps,
  collectAnswers,
  expandState,
  getByPath,
  setByPath,
  SERVICE_ORDER,
  SERVICE_META,
} from "./steps";
import PaneCountingGuide from "./PaneCountingGuide";
import FrenchPaneExamples from "./FrenchPaneExamples";
import { fireAdsConversion } from "../lib/adsConversion";
import { trackQuote, flushQuoteTrack } from "./funnelTrack";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Check,
  Loader2,
  MapPin,
  Info,
  Sparkles,
  Zap,
  PhoneCall,
  Star,
  ChevronDown,
  ChevronUp,
  AppWindow,
  Waves,
  Home,
  Droplets,
  Brush,
  Sun,
  Bird,
  Camera,
} from "lucide-react";

const SUBMIT_URL = "/api/booking-submit";
const PHOTOS_URL = "/api/booking-photos";
const ADDRESS_URL = "/api/address-autocomplete";
const JSON_HEADERS = { "Content-Type": "application/json" };

// Deferred lead sending: how long we wait on the result screen before sending
// a phone-only partial lead (leaving the page sends it immediately).
const PARTIAL_SEND_DELAY_MS = 60_000;

const MAX_PHOTOS = 5;
const MAX_PHOTO_DIM = 1600;

// Read a picked file as a data URL, downscaling large images so the JSON
// payload stays sane. Photos are POSTed as normal fetch — NEVER with
// keepalive:true (64KB body cap silently truncates them).
function fileToResizedDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read-failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(reader.result); // can't draw it — send as-is
      img.onload = () => {
        const scale = Math.min(1, MAX_PHOTO_DIM / Math.max(img.width, img.height));
        if (scale >= 1) return resolve(reader.result);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

const SERVICE_ICONS = { AppWindow, Waves, Home, Droplets, Brush, Sun, Bird };

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors";

// ── Small building blocks ────────────────────────────────────────────────────

function OptionCard({ selected, onClick, label, sublabel, badge, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "relative w-full text-left rounded-xl border-2 px-5 py-4 transition-all duration-150 " +
        (selected
          ? "border-blue-600 bg-blue-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40")
      }
    >
      {badge && (
        <span className="absolute -top-2.5 right-4 bg-red-500 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-center">
        <div
          className={
            "w-5 h-5 rounded-full border-2 mr-3.5 flex-shrink-0 flex items-center justify-center " +
            (selected ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")
          }
        >
          {selected && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-900">{label}</div>
          {sublabel && <div className="text-sm text-gray-500 mt-0.5">{sublabel}</div>}
        </div>
      </div>
      {children}
    </button>
  );
}

function Pills({ value, onChange, options }) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(o.value)}
          className={
            "px-4 py-2 rounded-full border-2 text-sm font-semibold transition-colors " +
            (value === o.value
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-blue-300")
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CollapsibleVisual({ label, defaultOpen, children }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="mb-5 border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-blue-700 bg-blue-50/60 hover:bg-blue-50"
      >
        {label}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

function StepShell({ step, children }) {
  return (
    <div key={step.id} className="quote-step-enter">
      <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
        {step.serviceLabel}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">{step.title}</h2>
      {step.subtitle && <p className="text-gray-500 mb-2">{step.subtitle}</p>}
      {step.hint && <p className="text-sm text-gray-500 mb-2">{step.hint}</p>}
      <div className="mt-5">{children}</div>
      {step.supportPoint && (
        <p className="mt-5 text-sm text-gray-400 flex items-center">
          <CheckCircle className="w-4 h-4 mr-1.5 text-green-500" /> {step.supportPoint}
        </p>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

// Reusable quote wizard. Renders as the full page flow on /instant-quote and
// embeds inline inside QuoteCTA (homepage hero + bottom-of-page section).
// initialPhase lets callers skip the entry chooser ("services" or "contact").
export default function QuoteWizard({ embedded = false, initialMode = "instant", initialPhase = "entry", onBackFromStart }) {
  // phase: entry | services | questions | contact | result | done-details
  const [phase, setPhase] = useState(initialPhase);
  const [mode, setMode] = useState(initialMode); // instant | details
  const [state, setState] = useState({ services: [] });
  const [qIndex, setQIndex] = useState(0);
  const [freeTextDraft, setFreeTextDraft] = useState("");

  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", notes: "", quotePref: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingAnswer, setBookingAnswer] = useState(null); // "yes" | "no"

  // Split contact flow (instant mode): screen 1 = name + phone, then the
  // result screen shows the price with email/address/notes/photos below it.
  const [photos, setPhotos] = useState([]); // [{ name, dataUrl }]
  const [detailsSent, setDetailsSent] = useState(false);
  const [detailsSubmitting, setDetailsSubmitting] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  // Deferred lead sending. The lead goes out (a) when the email/address form
  // is completed, (b) PARTIAL_SEND_DELAY_MS after the price is revealed, or
  // (c) immediately if they leave the page — whichever comes first. Later
  // sends reuse the same leadId so n8n UPDATES the existing ServiceM8 job
  // instead of creating a new one.
  const leadIdRef = useRef("");
  const sentRef = useRef("none"); // none | partial | full
  const partialTimer = useRef(null);
  const sendRef = useRef(null); // always points at the latest-render sender
  const sendChain = useRef(Promise.resolve()); // serialises sends so updates carry the leadId
  const pickerOpenRef = useRef(false); // photo file-picker can fire visibilitychange

  // Address autocomplete
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addrTimer = useRef(null);
  const addrBox = useRef(null);

  const topRef = useRef(null);

  const expanded = useMemo(() => expandState(state), [state]);
  const questionSteps = useMemo(() => buildQuestionSteps(expanded), [expanded]);
  const quote = useMemo(() => calculateQuote(expanded), [expanded]);

  // Progress across the whole instant flow: services + questions + contact.
  const totalScreens = 1 + questionSteps.length + 1;
  const screenNumber =
    phase === "services" ? 1 : phase === "questions" ? 2 + qIndex : phase === "contact" ? totalScreens : totalScreens;
  const progressPct =
    phase === "entry" ? 0 : Math.min(100, Math.round((screenNumber / totalScreens) * 100));

  const firstPaint = useRef(true);
  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    if (topRef.current) {
      const y = topRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  }, [phase, qIndex]);

  useEffect(() => {
    function onDocClick(e) {
      if (addrBox.current && !addrBox.current.contains(e.target)) setShowSuggestions(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // First-party funnel tracking: record each screen the visitor reaches so
  // the daily report can show where people drop off. Screens are deduped per
  // page load inside trackQuote, so back-and-forth navigation doesn't double
  // count. "entry" is skipped — tracking starts once they actually begin.
  const stepForTracking = questionSteps[qIndex];
  useEffect(() => {
    if (phase === "entry") return;
    const services = (state.services || []).join(",");
    if (phase === "questions") {
      if (stepForTracking) {
        trackQuote({
          event: "screen",
          phase,
          stepId: stepForTracking.id,
          stepIndex: qIndex,
          stepTitle: stepForTracking.title,
          services,
          mode,
        });
      }
    } else {
      trackQuote({ event: "screen", phase, services, mode });
      if (phase === "result" || phase === "done-details") flushQuoteTrack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qIndex, stepForTracking]);

  const convFired = useRef(false);
  function fireConversionOnce() {
    if (convFired.current) return;
    convFired.current = true;
    fireAdsConversion("formSubmit");
  }

  // ── Navigation helpers ──────────────────────────────────────────────────
  const step = questionSteps[qIndex];

  function goBack() {
    setError("");
    setFreeTextDraft("");
    if (phase === "services") {
      if (initialPhase === "services" && onBackFromStart) onBackFromStart();
      else setPhase("entry");
    } else if (phase === "questions") {
      if (qIndex === 0) setPhase("services");
      else setQIndex(qIndex - 1);
    } else if (phase === "contact") {
      if (mode === "details") {
        if (initialPhase === "contact" && onBackFromStart) onBackFromStart();
        else setPhase("entry");
      } else if (questionSteps.length) {
        setPhase("questions");
        setQIndex(questionSteps.length - 1);
      } else setPhase("services");
    }
  }

  function selectOption(value, opt) {
    const nextState = setByPath(state, step.path, value);
    setState(nextState);
    if (opt && opt.freeText) return; // wait for the free-text + continue
    setTimeout(() => goNextQuestionFrom(nextState), 200);
  }

  function goNextQuestionFrom(nextState) {
    // IMPORTANT: derive steps from the EXPANDED state (shared property answers
    // fanned out to each service) — the raw state doesn't know e.g. the
    // property type, so conditional steps like the interior add-on would be
    // miscounted and skipped when they're the last question.
    const steps = buildQuestionSteps(expandState(nextState));
    setFreeTextDraft("");
    if (qIndex + 1 < steps.length) setQIndex(qIndex + 1);
    else setPhase("contact");
  }

  // ── Lead payload ────────────────────────────────────────────────────────
  function buildDescription({ booking, partial } = {}) {
    const lines = [];
    if (mode === "details") {
      lines.push("QUOTE REQUEST (online) — customer chose to leave details only.");
      if (contact.quotePref === "visit") lines.push("QUOTE PREFERENCE: wants us to VISIT the property to quote.");
      else if (contact.quotePref === "phone") lines.push("QUOTE PREFERENCE: happy with a price over the PHONE.");
      if (contact.notes.trim()) lines.push(`Message: ${contact.notes.trim()}`);
      return lines.join("\n");
    }
    if (partial) {
      lines.push("⚠️ PARTIAL LEAD — customer entered name & phone and saw their price, but didn't finish the email/address screen. Worth a call!");
    } else if (sentRef.current === "partial") {
      lines.push("UPDATE — customer has now completed their full details (same job as the earlier partial lead).");
    }
    const svcNames = (state.services || []).map((s) => SERVICE_META[s]?.label || s).join(", ");
    lines.push(`INSTANT QUOTE (online) — ${svcNames}`);
    if (quote.custom) {
      lines.push(`RESULT: CUSTOM QUOTE required — no price shown to customer.`);
      lines.push(`Triggers: ${quote.customReasons.join("; ")}`);
    } else {
      lines.push(`RESULT: instant price shown — TOTAL ${formatMoney(quote.total)} inc GST.`);
      for (const l of quote.lines) {
        lines.push(
          `• ${l.label}${l.frequencyLabel ? ` (${l.frequencyLabel})` : ""}: ${formatMoney(l.subtotal)}${l.plan ? "/visit" : ""}`
        );
      }
      if (quote.floorApplied) lines.push(`• Minimum charge applied (${quote.floorApplied.label}: ${formatMoney(quote.floorApplied.amount)})`);
      for (const add of quote.postFloorAdds || []) lines.push(`• ${add.label}: ${formatMoney(add.amount)}`);
    }
    if (booking) lines.push(`WANTS TO BOOK: ${booking === "yes" ? "YES — please lock in a time" : "Not yet — follow up"}`);
    if (contact.notes.trim()) lines.push(`Customer note: ${contact.notes.trim()}`);
    return lines.join("\n");
  }

  function buildPayload(extra = {}) {
    const qa = mode === "details" ? [] : collectAnswers(expanded);
    return {
      firstName: contact.firstName,
      lastName: contact.lastName,
      name: `${contact.firstName} ${contact.lastName}`.trim(),
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      description: buildDescription(extra),
      photoCount: photos.length,
      qa,
      leadId: extra.leadId || "",
      source: "instant-quote",
    };
  }

  const contactValid =
    contact.firstName.trim() && contact.lastName.trim() && contact.email.trim() && contact.phone.trim();
  const basicValid = contact.firstName.trim() && contact.lastName.trim() && contact.phone.trim();

  // ── Instant-mode lead sending ───────────────────────────────────────────
  // All sends run through a promise chain so a follow-up send always carries
  // the leadId returned by the first one (n8n updates the same ServiceM8 job
  // instead of creating a duplicate).
  function sendLeadNow(opts = {}) {
    const run = () => doSendLead(opts);
    sendChain.current = sendChain.current.then(run, run);
    return sendChain.current;
  }

  async function doSendLead({ keepalive = false, once = false, booking = bookingAnswer } = {}) {
    if (mode !== "instant") return;
    if (once && sentRef.current !== "none") return; // auto-fire only happens once
    const partial = !(contact.email.trim() && contact.address.trim());
    const payload = buildPayload({ booking, leadId: leadIdRef.current, partial });
    if (!partial) sentRef.current = "full";
    else if (sentRef.current === "none") sentRef.current = "partial";
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(payload),
        keepalive, // JSON only — photos must never use keepalive (64KB cap)
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (typeof data.leadId === "string" && data.leadId) leadIdRef.current = data.leadId;
      }
    } catch {
      /* never surface network errors once the price is on screen */
    }
  }

  // Keep a ref pointing at a latest-render sender so timers and page-leave
  // handlers never fire with stale contact/quote state.
  sendRef.current = ({ once = false, keepalive = false, booking } = {}) => {
    if (phase !== "result" || mode !== "instant") return;
    if (detailsSent) return;
    if (!basicValid) return;
    return sendLeadNow({ once, keepalive, booking });
  };

  // Send the partial lead if they leave the page (or navigate away in-app)
  // before finishing the email/address form.
  useEffect(() => {
    const flush = () => sendRef.current && sendRef.current({ once: true, keepalive: true });
    const onVis = () => {
      // Opening the photo file-picker can fire visibilitychange — not a leave.
      if (document.visibilityState === "hidden" && !pickerOpenRef.current) flush();
    };
    const onFocus = () => {
      pickerOpenRef.current = false;
    };
    window.addEventListener("pagehide", flush);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
      if (partialTimer.current) clearTimeout(partialTimer.current);
      flush(); // SPA navigation unmounts the wizard — capture the lead
    };
  }, []);

  // Screen 1 (instant): first name, last name, phone → reveal the price and
  // arm the partial-lead timer. Nothing is sent yet.
  function submitContactBasic(e) {
    e.preventDefault();
    if (!basicValid) {
      setError("Please pop in your first name, last name and phone number.");
      return;
    }
    setError("");
    fireConversionOnce();
    setPhase("result");
    if (partialTimer.current) clearTimeout(partialTimer.current);
    partialTimer.current = setTimeout(
      () => sendRef.current && sendRef.current({ once: true }),
      PARTIAL_SEND_DELAY_MS
    );
  }

  // Screen 2 (on the result page): email + address (+ notes/photos) → full send.
  async function submitDetails(e) {
    e.preventDefault();
    if (!contact.email.trim() || !contact.address.trim()) {
      setDetailsError("Please add your email and address so we can send your quote through.");
      return;
    }
    setDetailsError("");
    setDetailsSubmitting(true);
    if (partialTimer.current) clearTimeout(partialTimer.current);
    try {
      await sendLeadNow({});
      if (photos.length && leadIdRef.current) {
        // Plain fetch on purpose — keepalive:true truncates photo bodies at 64KB.
        await fetch(PHOTOS_URL, {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify({ leadId: leadIdRef.current, photos }),
        }).catch(() => {});
      }
    } catch {
      /* the lead attempt already happened — never block the customer */
    }
    setDetailsSubmitting(false);
    setDetailsSent(true);
    trackQuote({ event: "complete", phase: "result", mode });
    flushQuoteTrack();
  }

  // "Put in your details" mode — unchanged single screen, sends immediately.
  async function submitLead(e) {
    e.preventDefault();
    if (!contactValid) {
      setError("Please fill in your name, phone and email so we can send your quote.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(buildPayload({})),
      });
      if (!res.ok) throw new Error("bad status");
      fireConversionOnce();
      trackQuote({ event: "complete", phase: "contact", mode: "details" });
      setPhase("done-details");
    } catch {
      setError("Sorry — something went wrong sending your details. Please call us on (07) 5651 2386 and we'll sort it out.");
    } finally {
      setSubmitting(false);
    }
  }

  function answerBooking(answer) {
    setBookingAnswer(answer);
    trackQuote({ event: "booking_" + answer, phase: "result", mode });
    // If the lead already went out (timer or page-leave), push the booking
    // answer through as an update to the same job. Otherwise it simply rides
    // along with whichever send happens next.
    if (sentRef.current !== "none") sendLeadNow({ booking: answer });
  }

  async function onPhotosChange(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    pickerOpenRef.current = false;
    const room = Math.max(0, MAX_PHOTOS - photos.length);
    const added = [];
    for (const f of files.slice(0, room)) {
      try {
        added.push({ name: f.name, dataUrl: await fileToResizedDataUrl(f) });
      } catch {
        /* unreadable file — skip it */
      }
    }
    if (added.length) setPhotos((p) => [...p, ...added].slice(0, MAX_PHOTOS));
  }

  // ── Address autocomplete (same endpoint as the booking form) ───────────
  function onAddressChange(e) {
    const value = e.target.value;
    setContact((c) => ({ ...c, address: value }));
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
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 280);
  }

  // ── Screens ─────────────────────────────────────────────────────────────

  function renderEntry() {
    return (
      <div className="quote-step-enter text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Get Your Free Quote</h1>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6 items-stretch">
          <button
            type="button"
            onClick={() => {
              setMode("instant");
              setPhase("services");
            }}
            className="group bg-green-500 hover:bg-green-600 text-white rounded-2xl p-7 text-left shadow-lg transition-colors flex flex-col"
          >
            <Zap className="w-8 h-8 mb-3" />
            <span className="text-xl font-bold mb-1.5">Get Instant Quote</span>
            <span className="text-green-50 text-sm flex-1">
              Answer some quick questions and see your price straight away — about 2 minutes.
            </span>
            <span className="mt-4 inline-flex items-center font-semibold text-sm">
              Start now <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("details");
              setPhase("contact");
            }}
            className="group bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-7 text-left shadow-sm transition-colors flex flex-col"
          >
            <PhoneCall className="w-8 h-8 mb-3 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 mb-1.5">Put in your details</span>
            <span className="text-gray-500 text-sm flex-1">
              Skip the questions — leave your details and we&rsquo;ll contact you with your quote.
            </span>
            <span className="mt-4 inline-flex items-center font-semibold text-sm text-blue-600">
              Leave my details <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        <div className="max-w-2xl mx-auto flex items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-left">
          <Info className="w-5 h-5 text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            Please answer as honestly and accurately as possible — major variations from your answers may result in a
            price change when we arrive.
          </p>
        </div>
      </div>
    );
  }

  function renderServices() {
    const selected = state.services || [];
    const toggle = (svc) => {
      const next = selected.includes(svc) ? selected.filter((s) => s !== svc) : [...selected, svc];
      setState({ ...state, services: next });
    };
    return (
      <div className="quote-step-enter">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">What can we help you with?</h2>
        <p className="text-gray-500 mb-6">Select one or more services</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICE_ORDER.map((svc) => {
            const meta = SERVICE_META[svc];
            const Icon = SERVICE_ICONS[meta.icon];
            const isSel = selected.includes(svc);
            return (
              <button
                key={svc}
                type="button"
                onClick={() => toggle(svc)}
                className={
                  "flex items-center rounded-xl border-2 px-4 py-4 text-left transition-all " +
                  (isSel ? "border-blue-600 bg-blue-50 shadow-sm" : "border-gray-200 bg-white hover:border-blue-300")
                }
              >
                <div
                  className={
                    "w-11 h-11 rounded-lg flex items-center justify-center mr-3.5 flex-shrink-0 " +
                    (isSel ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600")
                  }
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900">{meta.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{meta.tagline}</div>
                </div>
                <div
                  className={
                    "w-5 h-5 rounded-full border-2 ml-3 flex-shrink-0 flex items-center justify-center " +
                    (isSel ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")
                  }
                >
                  {isSel && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
                </div>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          disabled={!selected.length}
          onClick={() => {
            setQIndex(0);
            setPhase("questions");
          }}
          className="mt-7 w-full sm:w-auto inline-flex items-center justify-center bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors"
        >
          Continue <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    );
  }

  function renderFreeText(pathKey) {
    return (
      <div className="mt-4">
        <input
          className={inputClass}
          value={freeTextDraft}
          onChange={(e) => setFreeTextDraft(e.target.value)}
          placeholder="Tell us a little more…"
          autoFocus
        />
        <button
          type="button"
          onClick={() => {
            const next = setByPath(state, [...step.path.slice(0, -1), pathKey], freeTextDraft.trim());
            setState(next);
            goNextQuestionFrom(next);
          }}
          className="mt-3 inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    );
  }

  function renderSelectStep() {
    const value = getByPath(state, step.path);
    const selectedOpt = step.options.find((o) => o.value === value);
    const cols = step.columns === 2 ? "grid sm:grid-cols-2 gap-3" : "space-y-3";
    return (
      <StepShell step={step}>
        {step.visual === "panes" && (
          <CollapsibleVisual label="Not sure how to count? Tap to see the pane-counting guide" defaultOpen>
            <PaneCountingGuide className="w-full h-auto max-w-xl mx-auto" />
          </CollapsibleVisual>
        )}
        {step.visual === "french" && (
          <CollapsibleVisual label="Not sure what French panes are? Tap to see examples" defaultOpen>
            <FrenchPaneExamples />
          </CollapsibleVisual>
        )}
        <div className={cols}>
          {step.options.map((o) => (
            <OptionCard
              key={String(o.value)}
              selected={value === o.value}
              onClick={() => selectOption(o.value, o)}
              label={o.label}
              sublabel={o.sublabel}
              badge={o.badge}
            />
          ))}
        </div>
        {selectedOpt && selectedOpt.freeText && renderFreeText(step.path[step.path.length - 1] + "Other")}
      </StepShell>
    );
  }

  function renderMultiStep() {
    const value = getByPath(state, step.path) || [];
    const toggle = (v) => {
      const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
      setState(setByPath(state, step.path, next));
    };
    const hasOther = value.includes("other");
    const cols = step.columns === 2 ? "grid sm:grid-cols-2 gap-3" : "space-y-3";
    return (
      <StepShell step={step}>
        <div className={cols}>
          {step.options.map((o) => (
            <OptionCard
              key={String(o.value)}
              selected={value.includes(o.value)}
              onClick={() => toggle(o.value)}
              label={o.label}
              sublabel={o.sublabel}
            />
          ))}
        </div>
        {hasOther && (
          <input
            className={inputClass + " mt-4"}
            value={freeTextDraft}
            onChange={(e) => setFreeTextDraft(e.target.value)}
            placeholder="Tell us what else needs cleaning…"
          />
        )}
        <button
          type="button"
          disabled={!value.length}
          onClick={() => {
            let next = state;
            if (hasOther && freeTextDraft.trim()) {
              next = setByPath(state, [...step.path.slice(0, -1), step.path[step.path.length - 1] + "Other"], freeTextDraft.trim());
              setState(next);
            }
            goNextQuestionFrom(next);
          }}
          className="mt-6 inline-flex items-center bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </StepShell>
    );
  }

  function renderApartmentStep() {
    const w = state.window || {};
    const setW = (k, v) => setState(setByPath(state, ["window", k], v));
    const done = w.balcony && w.apartmentScope && (w.balcony === "no" || w.balconyTap);
    return (
      <StepShell step={step}>
        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-800 mb-2.5">Do you have a balcony?</p>
            <Pills
              value={w.balcony}
              onChange={(v) => setW("balcony", v)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-2.5">What would you like cleaned?</p>
            <div className="space-y-3">
              <OptionCard
                selected={w.apartmentScope === "interior"}
                onClick={() => setW("apartmentScope", "interior")}
                label="Interior only"
              />
              <OptionCard
                selected={w.apartmentScope === "everything"}
                onClick={() => setW("apartmentScope", "everything")}
                label="Interior + exterior of everything"
              />
              <OptionCard
                selected={w.apartmentScope === "interior-balcony-ext"}
                onClick={() => setW("apartmentScope", "interior-balcony-ext")}
                label="Interior of everything + exterior of balcony only"
              />
            </div>
          </div>
          {w.balcony === "yes" && (
            <div>
              <p className="font-semibold text-gray-800 mb-2.5">Is there a tap on your balcony we can attach a hose to?</p>
              <Pills
                value={w.balconyTap}
                onChange={(v) => setW("balconyTap", v)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={!done}
          onClick={() => goNextQuestionFrom(state)}
          className="mt-7 inline-flex items-center bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </StepShell>
    );
  }

  function renderBalustradeStep() {
    const w = state.window || {};
    return (
      <StepShell step={step}>
        <div className="space-y-3">
          <OptionCard
            selected={w.balustrades === "yes"}
            onClick={() => setState(setByPath(state, ["window", "balustrades"], "yes"))}
            label="Yes"
          />
          <OptionCard
            selected={w.balustrades === "no"}
            onClick={() => {
              const next = setByPath(
                setByPath(state, ["window", "balustrades"], "no"),
                ["window", "balustradeCount"],
                ""
              );
              setState(next);
              setTimeout(() => goNextQuestionFrom(next), 200);
            }}
            label="No"
          />
        </div>
        {w.balustrades === "yes" && (
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roughly how many would you like cleaned?{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              className={inputClass}
              value={w.balustradeCount || ""}
              onChange={(e) => setState(setByPath(state, ["window", "balustradeCount"], e.target.value))}
              placeholder="e.g. 3"
              inputMode="numeric"
              autoFocus
            />
            <button
              type="button"
              onClick={() => goNextQuestionFrom(state)}
              className="mt-4 inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </StepShell>
    );
  }

  function renderSoftwashCondStep() {
    const s = state.softwash || {};
    const rows = [
      { key: "mould", label: "Mould / organic growth" },
      { key: "webs", label: "Spiderwebs / bug nests" },
      { key: "grime", label: "Grime / dust" },
    ];
    const done = rows.every((r) => s[r.key]);
    return (
      <StepShell step={step}>
        <div className="space-y-5">
          {rows.map((r) => (
            <div key={r.key}>
              <p className="font-semibold text-gray-800 mb-2.5">{r.label}</p>
              <Pills
                value={s[r.key]}
                onChange={(v) => setState(setByPath(state, ["softwash", r.key], v))}
                options={[
                  { value: "light", label: "Light" },
                  { value: "moderate", label: "Moderate" },
                  { value: "heavy", label: "Heavy" },
                ]}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          disabled={!done}
          onClick={() => goNextQuestionFrom(state)}
          className="mt-7 inline-flex items-center bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </StepShell>
    );
  }

  function renderAddressField(required) {
    return (
      <div ref={addrBox} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address{required ? " *" : ""}</label>
        <div className="relative">
          <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className={inputClass + " pl-10"}
            value={contact.address}
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
                onClick={() => {
                  setContact((c) => ({ ...c, address: s.text }));
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-green-50 text-gray-700 text-sm flex items-start gap-2"
              >
                <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{s.text}</span>
              </button>
            ))}
            <div className="px-4 py-1.5 text-[11px] text-gray-400 text-right border-t border-gray-100">powered by Google</div>
          </div>
        )}
      </div>
    );
  }

  function renderContact() {
    const setField = (k) => (e) => setContact((c) => ({ ...c, [k]: e.target.value }));

    // Instant mode: just name + phone — the price is one tap away.
    if (mode === "instant") {
      return (
        <div className="quote-step-enter">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">Almost there</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Pop in your details to see your price</h2>

          <form onSubmit={submitContactBasic} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                <input className={inputClass} value={contact.firstName} onChange={setField("firstName")} placeholder="First name" autoComplete="given-name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                <input className={inputClass} value={contact.lastName} onChange={setField("lastName")} placeholder="Last name" autoComplete="family-name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input className={inputClass} value={contact.phone} onChange={setField("phone")} placeholder="04xx xxx xxx" inputMode="tel" autoComplete="tel" />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
            >
              Show My Quote <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <p className="text-center text-xs text-gray-400">Free, no-obligation quote — takes 10 seconds.</p>
          </form>
        </div>
      );
    }

    return (
      <div className="quote-step-enter">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">Leave your details</h2>
        <p className="text-gray-500 mb-6">We&rsquo;ll be in touch quickly with your free quote — no obligation.</p>

        <form onSubmit={submitLead} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
              <input className={inputClass} value={contact.firstName} onChange={setField("firstName")} placeholder="First name" autoComplete="given-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
              <input className={inputClass} value={contact.lastName} onChange={setField("lastName")} placeholder="Last name" autoComplete="family-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input className={inputClass} value={contact.phone} onChange={setField("phone")} placeholder="04xx xxx xxx" inputMode="tel" autoComplete="tel" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input className={inputClass} value={contact.email} onChange={setField("email")} placeholder="you@email.com" type="email" autoComplete="email" />
            </div>
          </div>

          {renderAddressField(false)}

          {mode === "details" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How would you like your quote?</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { value: "visit", label: "Visit my property to quote" },
                  { value: "phone", label: "Give me a price over the phone" },
                ].map((o) => (
                  <button
                    type="button"
                    key={o.value}
                    onClick={() => setContact((cc) => ({ ...cc, quotePref: cc.quotePref === o.value ? "" : o.value }))}
                    className={
                      "flex items-center rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors " +
                      (contact.quotePref === o.value
                        ? "border-blue-600 bg-blue-50 text-gray-900"
                        : "border-gray-300 bg-white text-gray-700 hover:border-blue-300")
                    }
                  >
                    <span
                      className={
                        "w-5 h-5 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center " +
                        (contact.quotePref === o.value ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white")
                      }
                    >
                      {contact.quotePref === o.value && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.5} />}
                    </span>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How can we help you? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              className={inputClass + " min-h-[90px] resize-y"}
              value={contact.notes}
              onChange={setField("notes")}
              placeholder="e.g. Two storey house, want the windows cleaned inside and out."
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving your details…
              </>
            ) : (
              <>
                Send My Details <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400">
            Free, no-obligation quote. Your details are sent to our team as soon as you press the button.
          </p>
        </form>
      </div>
    );
  }

  // Email/address/notes/photos capture card shown under the price (or the
  // custom-quote message). Completing it sends the full lead — updating the
  // partial one if the timer/page-leave already fired.
  function renderDetailsCapture() {
    const setField = (k) => (e) => setContact((c) => ({ ...c, [k]: e.target.value }));

    if (detailsSent) {
      return (
        <div className="text-center bg-green-50 border border-green-100 rounded-2xl px-6 py-7">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-lg font-semibold text-gray-900 mb-1">All done, {contact.firstName || "legend"}!</p>
          <p className="text-sm text-gray-500">
            {quote.custom
              ? "We've got everything we need to put your custom quote together — we'll be in touch ASAP."
              : bookingAnswer === "yes"
                ? "We've got everything we need — we'll be in touch shortly to lock in a time."
                : "We've sent your quote through and we'll follow up soon."}
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Need us sooner? Call{" "}
            <a href="tel:0756512386" className="text-green-600 font-medium">
              (07) 5651 2386
            </a>
            .
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 sm:px-7 py-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {quote.custom
            ? "Help us get your custom quote right"
            : bookingAnswer === "yes"
              ? "Last step — where are we headed?"
              : "Where should we send your quote?"}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {quote.custom
            ? "Pop in your email and address and we'll put your tailored price together."
            : "Pop in your email and address and we'll send this quote straight through to you."}
        </p>

        <form onSubmit={submitDetails} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input className={inputClass} value={contact.email} onChange={setField("email")} placeholder="you@email.com" type="email" autoComplete="email" />
          </div>

          {renderAddressField(true)}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Anything else we should know? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              className={inputClass + " min-h-[80px] resize-y"}
              value={contact.notes}
              onChange={setField("notes")}
              placeholder="Gate codes, dogs, parking, anything at all…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add photos <span className="text-gray-400 font-normal">(optional — helps us get it right)</span>
            </label>
            <label
              onClick={() => {
                pickerOpenRef.current = true;
              }}
              className="flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg px-4 py-4 cursor-pointer text-sm text-gray-500 transition-colors"
            >
              <Camera className="w-5 h-5 mr-2 text-gray-400" />
              {photos.length ? `Add more photos (${photos.length}/${MAX_PHOTOS})` : "Tap to add photos of the job"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onPhotosChange}
                disabled={photos.length >= MAX_PHOTOS}
              />
            </label>
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {photos.map((p, i) => (
                  <div key={i} className="relative">
                    <img src={p.dataUrl} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => setPhotos((ph) => ph.filter((_, j) => j !== i))}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-800 text-white text-xs leading-none flex items-center justify-center"
                      aria-label="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {detailsError && <p className="text-red-600 text-sm">{detailsError}</p>}

          <button
            type="submit"
            disabled={detailsSubmitting}
            className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all shadow-lg"
          >
            {detailsSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send my details <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  function renderResult() {
    if (quote.custom) {
      return (
        <div className="quote-step-enter">
          <div className="text-center py-4">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Sparkles className="w-9 h-9 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Thanks, {contact.firstName || "there"} — your job&rsquo;s a little unique!
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto mb-4">
              Based on your answers, your job needs a custom quote. We&rsquo;ll put together a tailored price and be in
              touch ASAP.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Need us sooner? Call{" "}
              <a href="tel:0756512386" className="text-green-600 font-medium">
                (07) 5651 2386
              </a>
              .
            </p>
          </div>
          {renderDetailsCapture()}
        </div>
      );
    }

    return (
      <div className="quote-step-enter">
        <div className="text-center mb-7">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Here&rsquo;s your quote, {contact.firstName || "there"}!
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-7">
          {(() => {
            // Plans cover exteriors only: show the exterior per-visit price with
            // the discount noted in brackets, and split the interior add-on out
            // as its own optional line.
            const rows = [];
            for (const l of quote.lines) {
              const foldedAdd = l.postFloorAdd ? l.postFloorAdd.amount : 0;
              if (l.plan) {
                const interior = l.items.find((it) => it.label.startsWith("Interior windows"));
                const disc = l.items.find((it) => it.visible && it.amount < 0);
                const extras = l.items.filter((it) => it.visible && it.amount > 0 && it !== interior);
                rows.push({
                  key: l.service,
                  label: l.service === "window" ? "Window Cleaning — exterior windows & screens" : l.label,
                  badge: l.frequencyLabel,
                  amount: l.subtotal + foldedAdd - (interior ? interior.amount : 0),
                  per: true,
                  includes: extras,
                  note:
                    "Price per visit" +
                    (disc ? ` (with ${formatMoney(disc.amount)} off every visit)` : "") +
                    (l.service === "window" ? ". Your plan covers the exteriors — that's the side that gets dirty fastest." : "."),
                });
                if (interior) {
                  rows.push({
                    key: l.service + "-interior",
                    label: "Interior windows + tracks — optional add-on",
                    amount: interior.amount,
                    plus: true,
                    note: "Add your interiors on at any of your plan visits — whenever suits you.",
                  });
                }
              } else {
                rows.push({
                  key: l.service,
                  label: l.label,
                  amount: l.subtotal + foldedAdd,
                  visibleItems: l.items.filter((it) => it.visible),
                  note: l.note,
                });
              }
            }
            const floorAdj = quote.floorApplied ? quote.floorApplied.adjustment : 0;
            if (floorAdj > 0) {
              const main = rows.filter((r) => !r.plus).sort((a, b) => b.amount - a.amount)[0];
              if (main) main.amount = Math.round((main.amount + floorAdj) * 100) / 100;
            }
            return rows.map((r, i) => (
              <div key={r.key} className={"px-5 sm:px-7 py-5 " + (i > 0 ? "border-t border-gray-100" : "")}>
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <span className="font-bold text-gray-900">{r.label}</span>
                    {r.badge && (
                      <span className="ml-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5">
                        {r.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-gray-900 whitespace-nowrap">
                    {r.plus ? "+" : ""}
                    {formatMoney(r.amount)}
                    {r.per && <span className="text-sm font-medium text-gray-500">/visit</span>}
                  </div>
                </div>
                {(r.visibleItems || []).length > 0 && (
                  <div className="mt-2 space-y-1">
                    {r.visibleItems.map((it, j) => (
                      <div key={j} className="flex justify-between text-sm text-gray-500">
                        <span>{it.label}</span>
                        <span className={"whitespace-nowrap ml-3 " + (it.amount < 0 ? "text-green-600 font-medium" : "")}>
                          {it.amount < 0 ? "−" : "+"}
                          {formatMoney(it.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {(r.includes || []).map((it, j) => (
                  <p key={j} className="mt-1.5 text-sm text-gray-500">
                    Includes {it.label.toLowerCase()} (+{formatMoney(it.amount)})
                  </p>
                ))}
                {r.note && <p className="mt-1.5 text-xs text-gray-400">{r.note}</p>}
              </div>
            ));
          })()}

          <div className="px-5 sm:px-7 py-5 bg-blue-900 text-white flex justify-between items-center">
            <span className="font-semibold">Total (inc GST)</span>
            <span className="text-3xl font-extrabold">{formatMoney(quote.total)}</span>
          </div>
        </div>

        {quote.lines.some((l) => l.service === "window" && l.balustradesUnspecified) && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-center mb-7 -mt-3">
            Glass balustrade cleaning isn&rsquo;t included in this price — you didn&rsquo;t tell us how many you have. Let us know the number and we&rsquo;ll add it to your quote.
          </p>
        )}

        {quote.lines.some((l) => l.plan) && (
          <p className="text-sm text-gray-500 text-center mb-7 -mt-3">
            Plan prices are per visit at your chosen frequency — including your plan discount.
          </p>
        )}

        {!bookingAnswer ? (
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Would you like to book this in?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => answerBooking("yes")}
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors"
              >
                Yes — book me in!
              </button>
              <button
                type="button"
                onClick={() => answerBooking("no")}
                className="inline-flex items-center justify-center bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-10 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Not yet
              </button>
            </div>
          </div>
        ) : (
          !detailsSent && (
            <div className="text-center bg-green-50 border border-green-100 rounded-xl px-5 py-4 mb-8">
              <p className="font-semibold text-gray-900">
                {bookingAnswer === "yes"
                  ? "Great — we'll be in touch shortly to lock in a time!"
                  : "No worries — we'll send your quote through and follow up."}
              </p>
            </div>
          )
        )}

        {renderDetailsCapture()}
      </div>
    );
  }

  function renderDoneDetails() {
    return (
      <div className="quote-step-enter text-center py-6">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Thanks, {contact.firstName || "there"}!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Your details have been sent straight to our team. We&rsquo;ll be in touch shortly with your free quote.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Need us sooner? Call{" "}
          <a href="tel:0756512386" className="text-green-600 font-medium">
            (07) 5651 2386
          </a>
          .
        </p>
      </div>
    );
  }

  const showProgress = phase === "services" || phase === "questions" || (phase === "contact" && mode === "instant");
  const showBack = phase === "services" || phase === "questions" || phase === "contact";

  return (
    <div className={embedded ? "" : "bg-gray-50 min-h-screen"}>
      <style>{`
        .quote-step-enter { animation: quoteStepIn 0.28s ease both; }
        @keyframes quoteStepIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .quote-step-enter { animation: none; }
        }
      `}</style>

      <div ref={topRef} className={embedded ? "" : "max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14"}>
        {/* Progress */}
        {showProgress && (
          <div className="mb-7">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
              <span>
                Step {Math.min(screenNumber, totalScreens)} of {totalScreens}
              </span>
              <span className="flex items-center">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" /> 5.0 — 2500+ happy customers
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Back */}
        {showBack && (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
          </button>
        )}

        <div className={embedded ? "" : "bg-white rounded-2xl shadow-sm border border-gray-100 px-5 sm:px-10 py-8 sm:py-10"}>
          {phase === "entry" && renderEntry()}
          {phase === "services" && renderServices()}
          {phase === "questions" && step && step.type === "select" && renderSelectStep()}
          {phase === "questions" && step && step.type === "multi" && renderMultiStep()}
          {phase === "questions" && step && step.type === "apartment" && renderApartmentStep()}
          {phase === "questions" && step && step.type === "balustrade" && renderBalustradeStep()}
          {phase === "questions" && step && step.type === "softwash-cond" && renderSoftwashCondStep()}
          {phase === "contact" && renderContact()}
          {phase === "result" && renderResult()}
          {phase === "done-details" && renderDoneDetails()}
        </div>

        {phase === "entry" && !embedded && (
          <p className="text-center text-sm text-gray-400 mt-6">
            Prefer to talk?{" "}
            <a href="tel:0756512386" className="text-blue-600 font-medium hover:underline">
              Call (07) 5651 2386
            </a>{" "}
            — we actually answer.
          </p>
        )}
      </div>
    </div>
  );
}
