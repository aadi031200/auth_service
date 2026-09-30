import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub } from "react-icons/fa";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Check,
  Moon,
  Sun,
} from "lucide-react";
import { NavLink } from "react-router-dom";

/* ---------------------------------------------------------------------- */
/*  Google glyph — neutral monochrome mark (not the brand's four-color    */
/*  logo) so the button still reads as "Google" at a glance.              */
/* ---------------------------------------------------------------------- */

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.6 12.23c0-.68-.06-1.34-.17-1.98H12v3.74h5.4a4.62 4.62 0 0 1-2 3.03v2.5h3.24c1.9-1.75 2.96-4.33 2.96-7.29Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 22c2.7 0 4.96-.89 6.62-2.42l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.59-4.11H3.06v2.58A9.99 9.99 0 0 0 12 22Z"
        fill="currentColor"
        opacity="0.65"
      />
      <path
        d="M6.41 13.93a5.99 5.99 0 0 1 0-3.86V7.49H3.06a10 10 0 0 0 0 9.02l3.35-2.58Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M12 6.06c1.47 0 2.79.5 3.83 1.49l2.87-2.87C16.95 2.99 14.7 2 12 2A9.99 9.99 0 0 0 3.06 7.49l3.35 2.58C7.2 7.71 9.4 6.06 12 6.06Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

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
/*  Left brand panel                                                      */
/* ---------------------------------------------------------------------- */

const BULLETS = [
  "Passwordless & biometric ready",
  "SOC 2 Type II certified",
  "Full audit trail on every session",
];

function BrandPanel() {
  return (
    <div className="w-brand">
      <div className="w-brand-grid" />
      <div className="w-brand-top">
        <div className="w-logo w-display">
          <span className="w-logo-mark"><KeyRound size={16} /></span>
          <NavLink to={"/"}>
                Warden
          </NavLink>
        </div>
      </div>

      <div className="w-brand-mid">
        <span className="w-eyebrow"><ShieldCheck size={14} /> Zero-trust identity infrastructure</span>
        <h1 className="w-brand-title w-display">Good to see you again.</h1>
        <p className="w-brand-sub">
          Every sign-in gets re-checked against live risk signals — same account,
          fresh verification, every time.
        </p>
        <ul className="w-bullet-list">
          {BULLETS.map((b) => (
            <li key={b}>
              <span className="w-bullet-icon"><Check size={13} strokeWidth={3} /></span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-orbit-wrap">
        <div className="w-orbit-ring w-orbit-ring-1" />
        <div className="w-orbit-ring w-orbit-ring-2" />
        <div className="w-orbit-core"><ShieldCheck size={22} /></div>
        <div className="w-orbit-dot" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Page                                                                   */
/* ---------------------------------------------------------------------- */

export default function login() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          --danger: #F87171;
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
          --danger: #DC2626;
          --shadow: 0 20px 50px -24px rgba(30,25,10,0.18);
        }
        .w-root * { box-sizing: border-box; }
        .w-display { font-family: 'Space Grotesk', sans-serif; }

        .w-shell-grid { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; }

        /* --- Brand panel (left) --- */
        .w-brand {
          position: relative; overflow: hidden; padding: 40px 48px;
          background: var(--surface); border-right: 1px solid var(--border);
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .w-brand-grid {
          position: absolute; inset: 0; opacity: 0.5; pointer-events: none;
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 70% 60% at 30% 30%, black 30%, transparent 85%);
        }
        .w-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; position: relative; z-index: 1; }
        .w-logo-mark { width: 28px; height: 28px; border-radius: 8px; background: var(--accent); color: var(--accent-ink); display: flex; align-items: center; justify-content: center; }

        .w-brand-mid { position: relative; z-index: 1; max-width: 420px; margin-top: 60px; }
        .w-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600;
          color: var(--accent); background: var(--accent-soft); border: 1px solid var(--accent-soft);
          padding: 6px 12px; border-radius: 100px; margin-bottom: 22px;
        }
        .w-brand-title { font-size: 34px; line-height: 1.12; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 16px; }
        .w-brand-sub { color: var(--text-muted); font-size: 15.5px; line-height: 1.65; margin-bottom: 28px; }
        .w-bullet-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
        .w-bullet-list li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--text); }
        .w-bullet-icon {
          width: 20px; height: 20px; border-radius: 50%; background: var(--accent-soft); color: var(--success);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .w-orbit-wrap { position: relative; z-index: 1; width: 120px; height: 120px; margin-top: 40px; }
        .w-orbit-ring { position: absolute; inset: 0; border: 1px solid var(--border); border-radius: 50%; }
        .w-orbit-ring-2 { inset: -18px; opacity: 0.6; }
        .w-orbit-core {
          position: absolute; inset: 34px; border-radius: 50%; background: var(--accent-soft); color: var(--accent);
          display: flex; align-items: center; justify-content: center; border: 1px solid var(--accent-soft);
        }
        .w-orbit-dot {
          position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
          top: -22px; left: 50%; margin-left: -4px;
          animation: w-orbit-spin 7s linear infinite;
          transform-origin: 4px 78px;
        }
        @keyframes w-orbit-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .w-orbit-dot { animation: none; } }

        /* --- Form panel (right) --- */
        .w-form-panel { position: relative; display: flex; flex-direction: column; padding: 32px 48px; }
        .w-form-top { display: flex; justify-content: flex-end; align-items: center; }
        .w-form-mobile-logo { display: none; }
        .w-icon-btn {
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          border-radius: 9px; border: 1px solid var(--border); background: var(--surface); color: var(--text);
          cursor: pointer; transition: border-color 0.15s ease;
        }
        .w-icon-btn:hover { border-color: var(--accent); }
        .w-icon-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        .w-form-center { flex: 1; display: flex; flex-direction: column; justify-content: center; max-width: 380px; width: 100%; margin: 0 auto; }
        .w-form-head { margin-bottom: 30px; }
        .w-form-title { font-size: 29px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
        .w-form-sub { color: var(--text-muted); font-size: 15px; line-height: 1.6; }

        .w-social-row { display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; }
        .w-btn-social {
          width: 100% !important; justify-content: center !important; gap: 10px !important;
          background: var(--surface) !important; color: var(--text) !important; border: 1px solid var(--border) !important;
          font-weight: 500 !important;
        }
        .w-btn-social:hover { border-color: var(--accent) !important; }

        .w-divider-row { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
        .w-divider-row span { font-size: 12.5px; color: var(--text-muted); white-space: nowrap; }
        .w-divider-line { height: 1px; background: var(--border); flex: 1; }

        .w-field { margin-bottom: 18px; }
        .w-field-label-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7px; }
        .w-field-label { font-size: 13.5px; font-weight: 500; color: var(--text); display: block; }
        .w-forgot-link { font-size: 13px; color: var(--accent); text-decoration: none; font-weight: 500; }
        .w-forgot-link:hover { text-decoration: underline; }
        .w-input-wrap { position: relative; display: flex; align-items: center; }
        .w-input-icon { position: absolute; left: 12px; color: var(--text-muted); pointer-events: none; }
        .w-input {
          width: 100%; background: var(--surface) !important; border: 1px solid var(--border) !important;
          color: var(--text) !important; padding-left: 38px !important; height: 42px !important; border-radius: 9px !important;
          font-size: 14.5px !important;
        }
        .w-input:focus { border-color: var(--accent) !important; outline: none; box-shadow: 0 0 0 3px var(--accent-soft) !important; }
        .w-input-toggle {
          position: absolute; right: 10px; background: none; border: none; color: var(--text-muted);
          cursor: pointer; display: flex; align-items: center; padding: 4px;
        }
        .w-input-toggle:hover { color: var(--text); }
        .w-input-toggle:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }

        .w-btn-primary {
          background: var(--accent) !important; color: var(--accent-ink) !important; border: none !important;
          font-weight: 600 !important; width: 100% !important; justify-content: center !important; gap: 6px !important;
        }
        .w-btn-primary:hover { filter: brightness(1.06); }

        .w-form-footer { margin-top: 24px; text-align: center; }
        .w-form-footer p { font-size: 14px; color: var(--text-muted); margin: 0; }
        .w-form-footer a { color: var(--accent); text-decoration: none; font-weight: 500; }
        .w-form-footer a:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .w-shell-grid { grid-template-columns: 1fr; }
          .w-brand { display: none; }
          .w-form-mobile-logo { display: flex; }
          .w-form-panel { padding: 24px; }
        }
      `}</style>

      <div className="w-shell-grid">
        <BrandPanel />

        <div className="w-form-panel">
          <div className="w-form-top">
            <div className="w-logo w-display w-form-mobile-logo" style={{ marginRight: "auto" }}>
              <span className="w-logo-mark"><KeyRound size={16} /></span>
              Warden
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          <div className="w-form-center">
            <div className="w-form-head">
              <h2 className="w-form-title w-display">Welcome back</h2>
              <p className="w-form-sub">Sign in to keep verifying identities where you left off.</p>
            </div>

            <div className="w-social-row">
              <Button type="button" variant="outline" className="w-btn-social">
                <GoogleGlyph /> Continue with Google
              </Button>
              <Button type="button" variant="outline" className="w-btn-social">
                <FaGithub size={16} /> Continue with GitHub
              </Button>
            </div>

            <div className="w-divider-row">
              <div className="w-divider-line" />
              <span>OR CONTINUE WITH EMAIL</span>
              <div className="w-divider-line" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="w-field">
                <Label htmlFor="email" className="w-field-label">Email address</Label>
                <div className="w-input-wrap" style={{ marginTop: 7 }}>
                  <Mail size={16} className="w-input-icon" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="w-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="w-field">
                <div className="w-field-label-row">
                  <Label htmlFor="password" className="w-field-label">Password</Label>
                  <a href="#" className="w-forgot-link">Forgot password?</a>
                </div>
                <div className="w-input-wrap">
                  <Lock size={16} className="w-input-icon" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-input"
                    style={{ paddingRight: 40 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="w-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-btn-primary" size="lg">
                Sign in <ArrowRight size={16} />
              </Button>
            </form>

            <div className="w-form-footer">
              <p>Don't have an account? <a href="/Signup">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
