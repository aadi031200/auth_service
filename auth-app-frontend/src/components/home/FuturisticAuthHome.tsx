import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Fingerprint,
  ShieldCheck,
  Users,
  Lock,
  Activity,
  Eye,
  Moon,
  Sun,
  ArrowRight,
  Check,
  Copy,
  KeyRound,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

/* ---------------------------------------------------------------------- */
/*  Content                                                                */
/* ---------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#flow" },
  { label: "Security", href: "#security" },
  { label: "Docs", href: "#docs" },
];

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Passwordless & biometric",
    desc: "Let people in with a fingerprint, a face, or a passkey. No password to phish, forget, or reuse.",
  },
  {
    icon: ShieldCheck,
    title: "Adaptive multi-factor",
    desc: "Step-up challenges trigger only when risk rises — new device, new country, odd hour.",
  },
  {
    icon: Users,
    title: "Single sign-on",
    desc: "One identity across every app in your stack, from the internal wiki to the production console.",
  },
  {
    icon: Lock,
    title: "Fine-grained access",
    desc: "Roles and scopes down to the resource level, enforced the same way on every request.",
  },
  {
    icon: Activity,
    title: "Live audit trail",
    desc: "Every grant, denial, and token refresh, timestamped and searchable, for as long as you need it.",
  },
  {
    icon: Eye,
    title: "Anomaly detection",
    desc: "Impossible travel, credential stuffing, and token replay get flagged before they get in.",
  },
];

const FLOW_STEPS = [
  {
    n: "01",
    title: "Request",
    desc: "A client asks to sign in with a credential, a passkey, or a biometric signal.",
  },
  {
    n: "02",
    title: "Verify",
    desc: "Warden checks the identity against policy, device history, and live risk signals.",
  },
  {
    n: "03",
    title: "Issue",
    desc: "A short-lived, signed token is minted for the session — nothing long-lived sits in a database.",
  },
  {
    n: "04",
    title: "Access",
    desc: "Scoped access is granted, and every following call is re-checked silently in the background.",
  },
];

const COMPLIANCE = [
  "SOC 2 Type II",
  "GDPR ready",
  "ISO 27001",
  "AES-256 at rest",
  "HttpOnly + Secure cookies",
];

const CODE = {
  node: `import { Warden } from "@warden/sdk";

const warden = new Warden({ apiKey: process.env.WARDEN_KEY });

const session = await warden.verify(token);
if (session.valid) {
  grantAccess(session.claims);
}`,
  java: `WardenClient warden = WardenClient.create(apiKey);

Session session = warden.verify(token);
if (session.isValid()) {
    grantAccess(session.getClaims());
}`,
  python: `from warden import Warden

warden = Warden(api_key=API_KEY)

session = warden.verify(token)
if session.valid:
    grant_access(session.claims)`,
};

/* ---------------------------------------------------------------------- */
/*  Theme toggle                                                          */
/* ---------------------------------------------------------------------- */

type Theme = "dark" | "light";

interface ThemeToggleProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-icon-btn"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/*  Signature hero visual — a JWT decoding in real time                    */
/* ---------------------------------------------------------------------- */

function TokenVisual() {
  const [revealed, setRevealed] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const reducedMotion = useRef<boolean>(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion.current) {
      setRevealed(true);
      return;
    }

    let raf: number;
    const cycleMs = 3200;
    let start = Date.now();

    const tick = () => {
      const elapsed = (Date.now() - start) % cycleMs;
      const pct = elapsed / cycleMs;
      setProgress(pct);
      setRevealed(pct > 0.42);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-token-card">
      <div className="w-token-topbar">
        <div className="w-token-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="w-token-label">session.token</span>
        <div className="w-token-progress">
          <div
            className="w-token-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="w-token-body">
        <div className={`w-token-encoded ${revealed ? "is-dim" : ""}`}>
          <span className="seg seg-a">eyJhbGciOiJSUzI1NiJ9</span>.
          <span className="seg seg-b">eyJzdWIiOiJ1c3JfN0Y4M2sifQ</span>.
          <span className="seg seg-c">4f3a9c8e7b21d0a5</span>
        </div>

        <div className={`w-token-decoded ${revealed ? "is-shown" : ""}`}>
          <div className="w-token-row">
            <span className="w-token-key">header</span>
            <span className="w-token-val">{`{ "alg": "RS256", "typ": "JWT" }`}</span>
          </div>
          <div className="w-token-row">
            <span className="w-token-key">payload</span>
            <span className="w-token-val">{`{ "sub": "usr_7F83K", "role": "admin", "exp": 1752300000 }`}</span>
          </div>
          <div className="w-token-row w-token-verified">
            <span className="w-token-key">signature</span>
            <span className="w-token-val w-verified-pill">
              <Check size={13} strokeWidth={3} />
              verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Code panel                                                             */
/* ---------------------------------------------------------------------- */

type CodeTab = keyof typeof CODE;

function CodePanel() {
  const [tab, setTab] = useState<CodeTab>("node");
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="w-code-card">
      <Tabs value={tab} onValueChange={(v) => setTab(v as CodeTab)}>
        <div className="w-code-header">
          <TabsList className="w-tabs-list">
            <TabsTrigger value="node">Node.js</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          <button className="w-icon-btn" onClick={onCopy} aria-label="Copy code">
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
        {Object.keys(CODE).map((key) => (
          <TabsContent key={key} value={key} className="w-code-content">
            <pre>
              <code>{CODE[key]}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Page                                                                   */
/* ---------------------------------------------------------------------- */

export default function WardenHomepage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="w-root" data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .w-root {
          --bg: #0A0D14;
          --surface: #12161F;
          --surface-2: #1A1F2B;
          --border: #262C3A;
          --text: #E8EAF0;
          --text-muted: #8A93A6;
          --accent: #F0B429;
          --accent-ink: #1A1400;
          --accent-soft: rgba(240, 180, 41, 0.12);
          --success: #34D399;
          --shadow: 0 20px 60px -20px rgba(0,0,0,0.6);
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .w-root[data-theme="light"] {
          --bg: #FAF8F2;
          --surface: #FFFFFF;
          --surface-2: #F2EEE4;
          --border: #E3DFD2;
          --text: #16181D;
          --text-muted: #656C7A;
          --accent: #B8790F;
          --accent-ink: #FFF7E6;
          --accent-soft: rgba(184, 121, 15, 0.10);
          --success: #0F9D6E;
          --shadow: 0 20px 50px -24px rgba(30,25,10,0.18);
        }

        .w-root * { box-sizing: border-box; }
        .w-display { font-family: 'Space Grotesk', sans-serif; }
        .w-mono { font-family: 'JetBrains Mono', monospace; }

        .w-shell { max-width: 1160px; margin: 0 auto; padding: 0 24px; }

        /* --- Nav --- */
        .w-nav {
          position: sticky; top: 0; z-index: 40;
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .w-nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; max-width: 1160px; margin: 0 auto; }
        .w-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; }
        .w-logo-mark { width: 28px; height: 28px; border-radius: 8px; background: var(--accent); color: var(--accent-ink); display: flex; align-items: center; justify-content: center; }
        .w-nav-links { display: flex; gap: 32px; }
        .w-nav-link { color: var(--text-muted); font-size: 14.5px; font-weight: 500; text-decoration: none; transition: color 0.15s ease; }
        .w-nav-link:hover { color: var(--text); }
        .w-nav-actions { display: flex; align-items: center; gap: 10px; }
        .w-icon-btn {
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          border-radius: 9px; border: 1px solid var(--border); background: var(--surface); color: var(--text);
          cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease;
        }
        .w-icon-btn:hover { border-color: var(--accent); }
        .w-icon-btn:focus-visible, .w-btn:focus-visible, .w-nav-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .w-menu-toggle { display: none; }

        .w-btn-primary {
          background: var(--accent) !important; color: var(--accent-ink) !important; border: none !important;
          font-weight: 600 !important;
        }
        .w-btn-primary:hover { filter: brightness(1.06); }
        .w-btn-ghost {
          background: transparent !important; color: var(--text) !important; border: 1px solid var(--border) !important;
        }

        /* --- Hero --- */
        .w-hero { padding: 88px 0 64px; position: relative; overflow: hidden; }
        .w-hero-grid {
          position: absolute; inset: 0; opacity: 0.5; pointer-events: none;
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 90%);
        }
        .w-hero-inner { position: relative; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
        .w-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600;
          color: var(--accent); background: var(--accent-soft); border: 1px solid var(--accent-soft);
          padding: 6px 12px; border-radius: 100px; margin-bottom: 22px; letter-spacing: 0.01em;
        }
        .w-h1 {
          font-size: 52px; line-height: 1.04; font-weight: 700; letter-spacing: -0.025em; margin: 0 0 20px;
        }
        .w-h1 span { color: var(--accent); }
        .w-sub { font-size: 17.5px; line-height: 1.6; color: var(--text-muted); max-width: 480px; margin-bottom: 32px; }
        .w-hero-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }

        /* --- Token visual --- */
        .w-token-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
          box-shadow: var(--shadow); overflow: hidden;
        }
        .w-token-topbar { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .w-token-dots { display: flex; gap: 6px; }
        .w-token-dots span { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
        .w-token-label { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--text-muted); }
        .w-token-progress { margin-left: auto; width: 64px; height: 3px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .w-token-progress-fill { height: 100%; background: var(--accent); }
        .w-token-body { padding: 26px 20px; min-height: 168px; position: relative; }
        .w-token-encoded {
          font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 2; word-break: break-all;
          color: var(--text-muted); transition: opacity 0.4s ease; position: absolute; inset: 26px 20px;
        }
        .w-token-encoded.is-dim { opacity: 0; pointer-events: none; }
        .w-token-encoded .seg-a { color: var(--text); }
        .w-token-encoded .seg-c { color: var(--accent); }
        .w-token-decoded { opacity: 0; transform: translateY(6px); transition: opacity 0.4s ease, transform 0.4s ease; }
        .w-token-decoded.is-shown { opacity: 1; transform: translateY(0); }
        .w-token-row { display: flex; flex-direction: column; gap: 3px; padding: 9px 0; border-bottom: 1px dashed var(--border); }
        .w-token-row:last-child { border-bottom: none; }
        .w-token-key { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
        .w-token-val { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--text); }
        .w-verified-pill { display: inline-flex; align-items: center; gap: 5px; color: var(--success); font-weight: 600; }

        @media (prefers-reduced-motion: reduce) {
          .w-token-encoded, .w-token-decoded, .w-token-progress-fill { transition: none !important; }
        }

        /* --- Trust strip --- */
        .w-trust { padding: 30px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .w-trust-label { font-size: 12.5px; color: var(--text-muted); text-align: center; margin-bottom: 22px; letter-spacing: 0.03em; }
        .w-trust-row { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; opacity: 0.75; }
        .w-trust-row span { font-weight: 700; font-size: 16px; font-family: 'Space Grotesk', sans-serif; color: var(--text-muted); }

        /* --- Section shell --- */
        .w-section { padding: 96px 0; }
        .w-section-head { max-width: 560px; margin: 0 auto 52px; text-align: center; }
        .w-section-eyebrow { font-size: 13px; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .w-section-title { font-size: 34px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 14px; }
        .w-section-sub { color: var(--text-muted); font-size: 16px; line-height: 1.6; }

        /* --- Features --- */
        .w-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .w-feature-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 26px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .w-feature-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .w-feature-icon {
          width: 42px; height: 42px; border-radius: 10px; background: var(--accent-soft); color: var(--accent);
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .w-feature-title { font-weight: 600; font-size: 16.5px; margin-bottom: 8px; }
        .w-feature-desc { color: var(--text-muted); font-size: 14.5px; line-height: 1.6; }

        /* --- Flow --- */
        .w-flow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
        .w-flow-step { padding: 0 22px; position: relative; }
        .w-flow-step:not(:first-child)::before {
          content: ""; position: absolute; left: 0; top: 22px; width: 100%; height: 1px; background: var(--border);
          transform: translateX(-50%);
        }
        .w-flow-n { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--accent); font-weight: 600; margin-bottom: 14px; }
        .w-flow-title { font-weight: 600; font-size: 17px; margin-bottom: 8px; }
        .w-flow-desc { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

        /* --- Security --- */
        .w-security { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .w-badge-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
        .w-security-badge {
          display: inline-flex; align-items: center; gap: 7px; font-size: 13.5px; font-weight: 500;
          padding: 9px 14px; border-radius: 9px; border: 1px solid var(--border); background: var(--surface); color: var(--text);
        }

        /* --- Code / docs --- */
        .w-code-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: var(--shadow); }
        .w-code-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
        .w-tabs-list { background: transparent !important; padding: 0 !important; gap: 4px; }
        .w-code-content pre {
          margin: 0; padding: 22px; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.7;
          color: var(--text); overflow-x: auto;
        }

        /* --- Testimonial --- */
        .w-quote-card {
          max-width: 680px; margin: 0 auto; text-align: center; padding: 44px 40px;
          background: var(--surface); border: 1px solid var(--border); border-radius: 18px;
        }
        .w-quote-text { font-family: 'Space Grotesk', sans-serif; font-size: 23px; line-height: 1.5; font-weight: 500; margin-bottom: 20px; }
        .w-quote-attr { color: var(--text-muted); font-size: 14px; }

        /* --- Final CTA --- */
        .w-cta-band {
          background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
          padding: 56px 40px; text-align: center; position: relative; overflow: hidden;
        }
        .w-cta-glow {
          position: absolute; width: 400px; height: 400px; background: var(--accent); opacity: 0.12; filter: blur(90px);
          border-radius: 50%; top: -140px; left: 50%; transform: translateX(-50%); pointer-events: none;
        }
        .w-cta-title { font-size: 30px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 12px; position: relative; }
        .w-cta-sub { color: var(--text-muted); margin-bottom: 28px; position: relative; }

        /* --- Footer --- */
        .w-footer { border-top: 1px solid var(--border); padding: 56px 0 32px; }
        .w-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 40px; }
        .w-footer-col-title { font-size: 13px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; }
        .w-footer-link { display: block; color: var(--text); text-decoration: none; font-size: 14.5px; margin-bottom: 12px; }
        .w-footer-link:hover { color: var(--accent); }
        .w-footer-bottom { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-muted); flex-wrap: wrap; gap: 12px; }

        /* --- Responsive --- */
        @media (max-width: 860px) {
          .w-nav-links { display: none; }
          .w-menu-toggle { display: flex; }
          .w-hero-inner { grid-template-columns: 1fr; }
          .w-h1 { font-size: 38px; }
          .w-feature-grid { grid-template-columns: 1fr 1fr; }
          .w-flow { grid-template-columns: 1fr 1fr; row-gap: 32px; }
          .w-flow-step:nth-child(3)::before, .w-flow-step:nth-child(1)::before { display: none; }
          .w-security { grid-template-columns: 1fr; }
          .w-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .w-feature-grid { grid-template-columns: 1fr; }
          .w-flow { grid-template-columns: 1fr; }
          .w-flow-step::before { display: none; }
          .w-footer-grid { grid-template-columns: 1fr; }
          .w-h1 { font-size: 32px; }
        }
      `}</style>

      {/* NAV */}
      <header className="w-nav">
        <div className="w-nav-inner">
          
          <div className="w-logo w-display">
            <span className="w-logo-mark"><KeyRound size={16} /></span>
            <NavLink to={"/"}>Warden</NavLink>
           </div>
           
          <nav className="w-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.label} className="w-nav-link" href={l.href}>{l.label}</a>
            ))}
          </nav>
          <div className="w-nav-actions">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <NavLink to={"/login"}>
            <Button to="/login" variant="outline" className="w-btn-ghost" size="sm">Sign in</Button>
            </NavLink>
             <NavLink to={"/signup"}>
            <Button className="w-btn-primary" size="sm">
              Get started <ArrowRight size={15} style={{ marginLeft: 6 }} />
            </Button>
            </NavLink>
            <button className="w-icon-btn w-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="w-shell" style={{ paddingBottom: 16 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} className="w-nav-link" href={l.href} style={{ display: "block", padding: "10px 0" }}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="w-hero">
        <div className="w-hero-grid" />
        <div className="w-shell w-hero-inner">
          <div>
            <span className="w-eyebrow"><ShieldCheck size={14} /> Zero-trust identity infrastructure</span>
            <h1 className="w-h1 w-display">
              Every request,<br />verified in <span>milliseconds.</span>
            </h1>
            <p className="w-sub">
              Warden handles login, multi-factor, and access control so your team can ship
              the product instead of re-building auth for the fourth time.
            </p>
            <div className="w-hero-actions">
              <Button className="w-btn-primary" size="lg">
                Start building <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </Button>
              <Button variant="outline" className="w-btn-ghost" size="lg">View documentation</Button>
            </div>
          </div>
          <TokenVisual />
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="w-shell">
        <div className="w-trust">
          <p className="w-trust-label">TRUSTED BY TEAMS SECURING MILLIONS OF LOGINS A DAY</p>
          <div className="w-trust-row">
            <span>Fluxbank</span>
            <span>Northlane</span>
            <span>Ordinal</span>
            <span>Havenly</span>
            <span>Ferrovia</span>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="w-section" id="features">
        <div className="w-shell">
          <div className="w-section-head">
            <div className="w-section-eyebrow">Product</div>
            <h2 className="w-section-title w-display">Everything auth needs, nothing it doesn't</h2>
            <p className="w-section-sub">One SDK, one dashboard, one place to see who has access to what.</p>
          </div>
          <div className="w-feature-grid">
            {FEATURES.map((f) => (
              <div className="w-feature-card" key={f.title}>
                <div className="w-feature-icon"><f.icon size={20} /></div>
                <div className="w-feature-title">{f.title}</div>
                <div className="w-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-section" id="flow" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-shell">
          <div className="w-section-head">
            <div className="w-section-eyebrow">How it works</div>
            <h2 className="w-section-title w-display">Four steps, every single time</h2>
            <p className="w-section-sub">The same flow runs whether it's a login page or a background service call.</p>
          </div>
          <div className="w-flow">
            {FLOW_STEPS.map((s) => (
              <div className="w-flow-step" key={s.n}>
                <div className="w-flow-n">{s.n}</div>
                <div className="w-flow-title">{s.title}</div>
                <div className="w-flow-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="w-section" id="security">
        <div className="w-shell">
          <div className="w-security">
            <div>
              <div className="w-section-eyebrow">Security & compliance</div>
              <h2 className="w-section-title w-display">Built for the audit, not just the demo</h2>
              <p className="w-section-sub">
                Every token is signed, every session is short-lived, and every decision is
                logged the moment it happens.
              </p>
              <div className="w-badge-grid">
                {COMPLIANCE.map((c) => (
                  <span className="w-security-badge" key={c}>
                    <Check size={14} style={{ color: "var(--success)" }} /> {c}
                  </span>
                ))}
              </div>
            </div>
            <CodePanel />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="w-section" style={{ paddingTop: 0 }}>
        <div className="w-shell">
          <div className="w-quote-card">
            <p className="w-quote-text">
              "We ripped out three years of homegrown auth in a sprint. Warden just quietly
              handles the part of the product nobody wants to own."
            </p>
            <p className="w-quote-attr">Priya Nair — CTO, Fluxbank</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-shell" style={{ paddingBottom: 96 }}>
        <div className="w-cta-band">
          <div className="w-cta-glow" />
          <h2 className="w-cta-title w-display">Ship auth you don't have to think about.</h2>
          <p className="w-cta-sub">Free for the first 10,000 verified sessions every month.</p>
          <Button className="w-btn-primary" size="lg">
            Create your account <ArrowRight size={16} style={{ marginLeft: 6 }} />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-footer">
        <div className="w-shell">
          <div className="w-footer-grid">
            <div>
              <div className="w-logo w-display" style={{ marginBottom: 14 }}>
                <span className="w-logo-mark"><KeyRound size={16} /></span>
                Warden
              </div>
              <p className="w-section-sub" style={{ fontSize: 14, maxWidth: 260 }}>
                Identity and access infrastructure for teams who'd rather build the product.
              </p>
            </div>
            <div>
              <div className="w-footer-col-title">Product</div>
              <a className="w-footer-link" href="#features">Features</a>
              <a className="w-footer-link" href="#security">Security</a>
              <a className="w-footer-link" href="#">Pricing</a>
              <a className="w-footer-link" href="#">Changelog</a>
            </div>
            <div>
              <div className="w-footer-col-title">Developers</div>
              <a className="w-footer-link" href="#docs">Documentation</a>
              <a className="w-footer-link" href="#">API reference</a>
              <a className="w-footer-link" href="#">SDKs</a>
              <a className="w-footer-link" href="#">Status</a>
            </div>
            <div>
              <div className="w-footer-col-title">Company</div>
              <a className="w-footer-link" href="#">About</a>
              <a className="w-footer-link" href="#">Blog</a>
              <a className="w-footer-link" href="#">Careers</a>
              <a className="w-footer-link" href="#">Privacy</a>
            </div>
          </div>
          <Separator style={{ background: "var(--border)", marginBottom: 24 }} />
          <div className="w-footer-bottom">
            <span>© 2026 Warden Identity, Inc.</span>
            <span>Made for developers who'd rather not build this twice.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
