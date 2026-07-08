import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Target, Menu, X, Phone } from "lucide-react";
import logoImage from "/logo.png";
import FreeAuditModal from "./FreeAuditModal";

// ✅ Added Student Corner & Master Panel links
const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/student-corner", label: "Student Corner" },
  { to: "/master-panel", label: "Master Panel" },
];

const headerStyles = `
/* ═══════════════════════════════════════════════════════════════
   HEADER / NAVBAR
   All class names are scoped to .header-* to avoid global conflicts
   ═══════════════════════════════════════════════════════════════ */

/* ── Core bar ── */
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transform: translateZ(0);
  will-change: box-shadow, background-color;
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(0, 0, 0, 0.04);
  border-bottom-color: transparent;
}

/* ── Inner row ── */
.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* ── Logo ── */
.header-logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  outline-offset: 4px;
}

.header-logo img {
  height: 46px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  display: block;
  transform-origin: left center;
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.header.scrolled .header-logo img {
  transform: scale(0.87);
}

.header-logo:hover img {
  opacity: 0.82;
}

/* ── Desktop navigation ── */
.header-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-nav-list {
  display: flex;
  list-style: none;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.header-nav-list li a {
  display: block;
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  position: relative;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;
  letter-spacing: 0.01em;
}

.header-nav-list li a::after {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-nav-list li a:hover {
  color: var(--color-primary);
  background: rgba(228, 64, 59, 0.06);
}

.header-nav-list li a.active {
  color: var(--color-primary-hover);
  background: rgba(228, 64, 59, 0.08);
}

.header-nav-list li a:hover::after,
.header-nav-list li a.active::after {
  transform: scaleX(1);
}

/* ── Desktop CTA buttons ── */
.header-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.header-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.575rem 1.125rem;
  border-radius: 9999px;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease,
    border-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  border: none;
  white-space: nowrap;
  line-height: 1;
  outline-offset: 3px;
  -webkit-user-select: none;
  user-select: none;
}

.header-btn:focus-visible {
  outline: 2px solid var(--color-primary);
}

.header-btn-outline {
  background: transparent;
  border: 1.5px solid rgba(228, 64, 59, 0.35);
  color: var(--color-primary);
}

.header-btn-outline:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.header-btn-primary {
  background: var(--gradient-primary);
  color: #ffffff;
  box-shadow: 0 3px 12px rgba(228, 64, 59, 0.28);
}

.header-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(228, 64, 59, 0.38);
}

/* Full-width variant for mobile buttons */
.header-btn-full {
  width: 100%;
  justify-content: center;
  padding: 0.8rem 1.25rem;
  font-size: 0.95rem;
}

/* ── Hamburger ── */
.header-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  color: #1e293b;
  line-height: 0;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.header-hamburger:hover {
  background: #f1f5f9;
}

.header-hamburger:active {
  background: #e2e8f0;
}

/* ── Mobile backdrop overlay ── */
.header-mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9998;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.header-mobile-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* ── Mobile slide-in drawer ── */
.header-mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(82vw, 320px);
  background: #ffffff;
  z-index: 9999;
  transform: translateX(102%);
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 5rem 1.25rem 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: -8px 0 48px rgba(0, 0, 0, 0.15);
}

.header-mobile-drawer.open {
  transform: translateX(0);
}

/* ── Drawer close button ── */
.header-drawer-close {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  color: #1e293b;
  line-height: 0;
  transition: background 0.2s ease;
}

.header-drawer-close:hover {
  background: #e2e8f0;
}

/* ── Mobile nav list ── */
.header-mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.header-mobile-nav-list li a {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  text-decoration: none;
  color: #1e293b;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: background 0.2s ease, color 0.2s ease;
}

.header-mobile-nav-list li a:hover,
.header-mobile-nav-list li a.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

/* ── Mobile action buttons ── */
.header-mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  margin-top: auto;
}

/* ═══════════════════════════════
   RESPONSIVE BREAKPOINTS
   ═══════════════════════════════ */

@media (max-width: 1100px) {
  .header-nav-list li a {
    padding: 0.45rem 0.6rem;
    font-size: 0.84rem;
  }

  .header-btn {
    padding: 0.525rem 0.9rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 900px) {
  .header-nav,
  .header-actions {
    display: none;
  }

  .header-hamburger {
    display: flex;
  }

  .header-inner {
    height: 64px;
  }
}

@media (max-width: 480px) {
  .header-inner {
    padding: 0 1rem;
    height: 58px;
  }

  .header-logo img {
    height: 38px;
  }

  .header.scrolled .header-logo img {
    transform: scale(0.89);
  }

  .header-mobile-drawer {
    width: min(90vw, 300px);
    padding: 4.5rem 1rem 1.5rem;
  }

  .header-mobile-nav-list li a {
    padding: 0.75rem 0.875rem;
    font-size: 0.95rem;
  }
}
`;

const Header = ({ onBookCall }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 900) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const closeMobile = () => setIsMobileMenuOpen(false);

  const mobilePortal = createPortal(
    <>
      <div
        className={`header-mobile-overlay${isMobileMenuOpen ? " open" : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      <nav
        className={`header-mobile-drawer${isMobileMenuOpen ? " open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
        aria-label="Mobile navigation"
      >
        <button
          className="header-drawer-close"
          aria-label="Close menu"
          onClick={closeMobile}
        >
          <X size={22} />
        </button>

        <ul className="header-mobile-nav-list">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end || undefined} onClick={closeMobile}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="header-mobile-actions">
          <button
            className="header-btn header-btn-outline header-btn-full"
            onClick={() => {
              setIsAuditModalOpen(true);
              closeMobile();
            }}
          >
            <Target size={16} /> Free Audit
          </button>

          <button
            className="header-btn header-btn-primary header-btn-full"
            onClick={() => {
              onBookCall?.();
              closeMobile();
            }}
          >
            <Phone size={16} /> Book a Call
          </button>

          <Link
            to="/contact"
            className="header-btn header-btn-primary header-btn-full"
            onClick={closeMobile}
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
    </>,
    document.body
  );

  return (
    <>
      <style>{headerStyles}</style>

      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <img src={logoImage} alt="DigiQlik" />
          </Link>

          <nav className="header-nav" aria-label="Main navigation">
            <ul className="header-nav-list">
              {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end || undefined}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              className="header-btn header-btn-outline"
              onClick={() => setIsAuditModalOpen(true)}
            >
              <Target size={14} />
              Free Audit
            </button>

            <button className="header-btn header-btn-primary" onClick={onBookCall}>
              Book a Call
              <Phone size={14} />
            </button>
          </div>

          <button
            className="header-hamburger"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((p) => !p)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobilePortal}

      <FreeAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </>
  );
};

export default Header;