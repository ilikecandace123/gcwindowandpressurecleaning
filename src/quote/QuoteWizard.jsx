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
} from "lucide-react";

const SUBMIT_URL = "/api/booking-submit";
const ADDRESS_URL = "/api/address-autocomplete";
const JSON_HEADERS = { "Content-Type": "application/json" };

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
  const [leadId, setLeadId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingAnswer, setBookingAnswer] = useState(null); // "yes" | "no"

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
  function buildDescription(booking) {
    const lines = [];
    if (mode === "details") {
      lines.push("QUOTE REQUEST (online) — customer chose to leave details only.");
      if (contact.quotePref === "visit") lines.push("QUOTE PREFERENCE: wants us to VISIT the property to quote.");
      else if (contact.quotePref === "phone") lines.push("QUOTE PREFERENCE: happy with a price over the PHONE.");
      if (contact.notes.trim()) lines.push(`Message: ${contact.notes.trim()}`);
      return lines.join("\n");
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

  function buildPayload(extra) {
    const qa = mode === "details" ? [] : collectAnswers(expanded);
    return {
      firstName: contact.firstName,
      lastName: contact.lastName,
      name: `${contact.firstName} ${contact.lastName}`.trim(),
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      description: buildDescription(extra && extra.booking),
      photoCount: 0,
      qa,
      leadId: (extra && extra.leadId) || "",
      source: "instant-quote",
    };
  }

  const contactValid =
    contact.firstName.trim() && contact.lastName.trim() && contact.email.trim() && contact.phone.trim();

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
      let id = "";
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (typeof data.leadId === "string") id = data.leadId;
      } else if (mode === "details") {
        throw new Error("bad status");
      }
      setLeadId(id);
      fireConversionOnce();
      setPhase(mode === "details" ? "done-details" : "result");
    } catch {
      if (mode === "details") {
        setError("Sorry — something went wrong sending your details. Please call us on (07) 5651 2386 and we'll sort it out.");
      } else {
        // Never block the price reveal — the lead attempt already happened.
        fireConversionOnce();
        setPhase("result");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function answerBooking(answer) {
    setBookingAnswer(answer);
    try {
      fetch(SUBMIT_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(buildPayload({ booking: answer, leadId })),
      }).catch(() => {});
    } catch {
      /* lead is already captured — never surface an error here */
    }
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

  function renderContact() {
    const setField = (k) => (e) => setContact((c) => ({ ...c, [k]: e.target.value }));
    return (
      <div className="quote-step-enter">
        {mode === "instant" ? (
          <>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">Almost there</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Pop in your details to reveal your price</h2>
          </>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">Leave your details</h2>
            <p className="text-gray-500 mb-6">We&rsquo;ll be in touch quickly with your free quote — no obligation.</p>
          </>
        )}

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

          <div ref={addrBox} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
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
              {mode === "details" ? "How can we help you?" : "Anything else we should know?"}{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              className={inputClass + " min-h-[90px] resize-y"}
              value={contact.notes}
              onChange={setField("notes")}
              placeholder={
                mode === "details"
                  ? "e.g. Two storey house, want the windows cleaned inside and out."
                  : "Gate codes, dogs, parking, anything at all…"
              }
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
            ) : mode === "instant" ? (
              <>
                Show My Quote <ArrowRight className="w-5 h-5 ml-2" />
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

  function renderResult() {
    if (quote.custom) {
      return (
        <div className="quote-step-enter text-center py-4">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Sparkles className="w-9 h-9 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Thanks, {contact.firstName || "there"} — your job&rsquo;s a little unique!
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto mb-6">
            Based on your answers, your job needs a custom quote. We&rsquo;ll put together a tailored price and be in
            touch ASAP.
          </p>
          <p className="text-sm text-gray-400">
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

        {quote.lines.some((l) => l.plan) && (
          <p className="text-sm text-gray-500 text-center mb-7 -mt-3">
            Plan prices are per visit at your chosen frequency — including your plan discount.
          </p>
        )}

        {!bookingAnswer ? (
          <div className="text-center">
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
          <div className="text-center bg-green-50 border border-green-100 rounded-2xl px-6 py-7">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-900 mb-1">
              {bookingAnswer === "yes" ? "Great — we'll be in touch shortly to lock in a time!" : "No worries — we've sent your quote through and we'll follow up."}
            </p>
            <p className="text-sm text-gray-500">
              Need us sooner? Call{" "}
              <a href="tel:0756512386" className="text-green-600 font-medium">
                (07) 5651 2386
              </a>
              .
            </p>
          </div>
        )}
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
