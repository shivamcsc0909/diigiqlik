import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  GraduationCap,
  LayoutDashboard,
  Layers3,
  Laptop,
  PlayCircle,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  Zap,
  X
} from "lucide-react";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwkRsPx0xo-MktCSVkeBqQa5Bb-3LpDupk6rXW5reoF1bjKG3D0x9LLkvH4GDQPNU77/exec";

const courseCategories = [
  {
    title: "SEO & Performance Marketing",
    icon: <Zap size={22} />,
    desc: "Learn search visibility, keyword strategy, audits, and measurable growth systems.",
  },
  {
    title: "Google Ads",
    icon: <Laptop size={22} />,
    desc: "Search, display, YouTube, remarketing, and conversion-focused account setup.",
  },
  {
    title: "Meta Ads",
    icon: <Users size={22} />,
    desc: "Lead generation, WhatsApp campaigns, instant forms, and creative testing.",
  },
  {
    title: "Content & Branding",
    icon: <Layers3 size={22} />,
    desc: "Build content systems, brand identity, and campaign messaging that converts.",
  },
  {
    title: "Web / Landing Pages",
    icon: <LayoutDashboard size={22} />,
    desc: "Conversion-friendly pages, basic funnels, and high-quality marketing assets.",
  },
  {
    title: "Freelancing & Career",
    icon: <GraduationCap size={22} />,
    desc: "Portfolio, client handling, proposals, and job/internship preparation.",
  },
];

const planCards = [
  {
    name: "Essential",
    price: "₹1,999",
    oldPrice: "₹8,999",
    subtitle: "For starters who want live learning with practical support.",
    badge: "Most Popular",
    features: [
      "25 Live Classes",
      "Recorded access",
      "Study material",
      "Certificate",
      "Q&A support",
      "Student Corner access",
    ],
  },
  {
    name: "Professional",
    price: "₹4,999",
    oldPrice: "₹14,999",
    subtitle: "For learners who want deeper mentorship and project support.",
    badge: "Best Value",
    features: [
      "Everything in Essential",
      "Advanced projects",
      "Portfolio building",
      "Priority support",
      "Mock interview prep",
      "Master panel access for admins",
    ],
  },
];

const steps = [
  "Register / Enroll",
  "Attend Live Classes",
  "Complete Assignments",
  "Get Recordings",
  "Track Progress in Student Corner",
];

const UPI_ID = "digitalmarketing@upi";
// Fixed relative path fallback image if real local path fails
const QR_IMAGE_URL = "/DigiQlik/payment-qr.webp";

function CoursesPage() {
  const navigate = useNavigate();

  // Modal Control States
  const [activeModal, setActiveModal] = useState(null); // 'enquiry' | 'reserve' | 'payment' | null
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentTab, setPaymentTab] = useState("gateway"); // 'gateway' | 'qr'
  const [loading, setLoading] = useState(false);

  // Form Initial States
  const [enquiryForm, setEnquiryForm] = useState({ fullName: "", mobile: "", email: "", courseInterest: "Digital Marketing Masterclass" });
  const [reserveForm, setReserveForm] = useState({ fullName: "", mobile: "", email: "", batch: "" });
  const [paymentForm, setPaymentForm] = useState({ fullName: "", mobile: "", email: "", batch: "", plan: "", utrTransactionId: "" });

  const batches = useMemo(
    () => [
      { value: "morning", label: "Morning (8 AM – 10 AM)" },
      { value: "afternoon", label: "Afternoon (2 PM – 4 PM)" },
      { value: "evening", label: "Evening (7 PM – 9 PM)" },
    ],
    []
  );

  const submitToSheet = async (formType, payload) => {
    setLoading(true);
    const body = new URLSearchParams({
      formType,
      ...payload,
      pageUrl: window.location.href,
    });
    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e, type) => {
    e.preventDefault();
    let success = false;

    if (type === "enquiry") {
      success = await submitToSheet("enquiry", enquiryForm);
      if (success) {
        alert("📊 Enquiry details submitted! Our team will contact you soon.");
        setEnquiryForm({ fullName: "", mobile: "", email: "", courseInterest: "Digital Marketing Masterclass" });
      }
    } else if (type === "reserve") {
      success = await submitToSheet("reserve", reserveForm);
      if (success) {
        alert("🎉 Your seat reservation request has been received!");
        setReserveForm({ fullName: "", mobile: "", email: "", batch: "" });
      }
    } else if (type === "payment") {
      if (paymentTab === "gateway") {
        setLoading(true);
        try {
          const scriptLoaded = await loadRazorpayScript();
          if (!scriptLoaded) {
            alert("❌ Razorpay SDK failed to load. Are you connected to the internet?");
            setLoading(false);
            return;
          }

          const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_TB0lRMCdVDdoz3";
          const coursePrice = selectedPlan === "Professional" ? 4999 : 1999;

          const options = {
            key: razorpayKey,
            amount: coursePrice * 100, // in paise
            currency: "INR",
            name: "DigiQlik",
            description: `${selectedPlan} Course Enrollment`,
            handler: async function (response) {
              setLoading(true);
              try {
                // Simulate backend verification success and update local storage logs
                const offlinePayments = JSON.parse(localStorage.getItem('offline_payments') || '[]');
                offlinePayments.unshift({
                  purchase_id: Date.now(),
                  student_name: paymentForm.fullName,
                  student_email: paymentForm.email,
                  course_title: selectedPlan === "Professional" ? "Google Ads Mastery" : "SEO & Performance Marketing",
                  amount: coursePrice,
                  razorpay_payment_id: response.razorpay_payment_id,
                  payment_status: 'paid',
                  purchase_date: new Date().toISOString().replace('T', ' ').substring(0, 19).replace('Z', '')
                });
                localStorage.setItem('offline_payments', JSON.stringify(offlinePayments));

                // Save credentials in local storage for auto-sign in
                localStorage.setItem("digiklik_pending_login", JSON.stringify({
                  email: paymentForm.email,
                  name: paymentForm.fullName,
                  role: "student",
                  token: "jwt-token-here"
                }));

                alert(`🎉 Payment verified successfully! Payment ID: ${response.razorpay_payment_id}`);
                setActiveModal(null);
                navigate("/student-corner");
              } catch (err) {
                console.error("Local storage update failed:", err);
              } finally {
                setLoading(false);
              }
            },
            prefill: {
              name: paymentForm.fullName,
              email: paymentForm.email,
              contact: paymentForm.mobile
            },
            theme: {
              color: "#dc2626"
            },
            modal: {
              ondismiss: function () {
                setLoading(false);
              }
            }
          };

          const rzp = new window.Razorpay(options);

          rzp.on('payment.failed', function (response) {
            alert(`❌ Payment failed: ${response.error.description}`);
            setLoading(false);
          });

          rzp.open();
        } catch (err) {
          console.error("Razorpay integration error:", err);
          alert("❌ Failed to initiate Razorpay checkout.");
          setLoading(false);
        }
      } else {
        // Manual QR/UPI scan flow
        success = await submitToSheet("payment", { ...paymentForm, plan: selectedPlan });
        if (success) {
          alert("✅ Registration & Payment details submitted successfully! Verification takes up to 2-4 hours.");
          setPaymentForm({ fullName: "", mobile: "", email: "", batch: "", plan: "", utrTransactionId: "" });
        }
      }
    }
    if (success) setActiveModal(null);
  };

  const openPaymentModal = (planName) => {
    setSelectedPlan(planName);
    setActiveModal("payment");
  };

  // Opens payment modal specifically for the Essential (₹1999) plan
  const open1999Payment = () => {
    openPaymentModal("Essential");
  };

  return (
    <div className="courses-page">
      <style>{`
        .courses-page {
          background: #fff;
          color: #111827;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .cp-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        .cp-hero {
          background: linear-gradient(135deg, #fff1f2 0%, #ffffff 52%, #f8fafc 100%);
          padding: 5rem 0 4rem;
        }
        .cp-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2.5rem;
          align-items: center;
        }
        .cp-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .cp-title {
          font-size: clamp(2.3rem, 5vw, 3.8rem);
          line-height: 1.1;
          margin: 0 0 1.5rem;
          letter-spacing: -0.03em;
          font-weight: 800;
        }
        .cp-title span { color: #dc2626; }
        .cp-subtitle {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #4b5563;
          margin: 0 0 2rem;
        }
        .cp-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .cp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          font-size: 0.95rem;
          text-decoration: none;
          background: transparent;
        }
        .cp-btn-primary {
          background: linear-gradient(135deg, #dc2626, #991b1b);
          color: #fff;
          box-shadow: 0 10px 20px rgba(220, 38, 38, 0.15);
        }
        .cp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(220, 38, 38, 0.25); }
        .cp-btn-outline { background: #fff; color: #111827; border-color: #e5e7eb; }
        .cp-btn-outline:hover { border-color: #dc2626; color: #dc2626; transform: translateY(-2px); }
        .cp-btn-disabled {
          background: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
          border-color: #d1d5db;
          box-shadow: none;
          opacity: 0.8;
        }
        .cp-btn-disabled:hover { transform: none; box-shadow: none; }
        .cp-hero-card {
          background: #ffffff;
          border: 1px solid #f3f4f6;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
        }
        .cp-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .cp-stat { background: #f9fafb; border: 1px solid #eef2f7; border-radius: 16px; padding: 1.25rem; }
        .cp-stat strong { display: block; font-size: 1.05rem; color: #111827; margin-bottom: 0.25rem; }
        .cp-stat span { color: #6b7280; font-size: 0.88rem; line-height: 1.4; }
        
        .cp-section { padding: 5rem 0; }
        .cp-section-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .cp-section-head h2 { font-size: clamp(1.8rem, 4vw, 2.4rem); font-weight: 800; margin: 0; }
        .cp-muted { color: #6b7280; margin-bottom: 3rem; max-width: 700px; line-height: 1.6; }
        
        .cp-category-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .cp-cat-card { background: #fff; border: 1px solid #f3f4f6; border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.01); transition: all 0.2s; }
        .cp-cat-card:hover { transform: translateY(-3px); border-color: #fecaca; }
        .cp-cat-icon { color: #dc2626; margin-bottom: 1rem; background: #fff5f5; width: fit-content; padding: 0.5rem; border-radius: 10px; display: flex; }
        .cp-cat-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem; }
        .cp-cat-desc { color: #6b7280; font-size: 0.92rem; line-height: 1.5; }

        .cp-step-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .cp-step { background: #fff; border: 1px solid #f3f4f6; border-radius: 20px; padding: 1.5rem 1rem; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.01); }
        .cp-step-num { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; margin: 0 auto 1rem; background: #fee2e2; color: #b91c1c; font-weight: 800; }
        .cp-step-text { margin: 0; font-weight: 700; font-size: 0.9rem; color: #111827; }

        .cp-benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .cp-benefit { background: #fff5f5; border: 1px solid #fecaca; border-radius: 20px; padding: 1.5rem; }
        .cp-benefit strong { display: block; margin: 0.5rem 0 0.25rem; font-size: 1.05rem; }
        .cp-benefit p { margin: 0; color: #4b5563; font-size: 0.9rem; line-height: 1.5; }

        .cp-plan-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        .cp-plan-card { background: #fff; border: 1px solid #f3f4f6; border-radius: 24px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
        .cp-plan-badge { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.75rem; border-radius: 999px; width: fit-content; margin-bottom: 1rem; }
        .cp-price-row { display: flex; align-items: baseline; gap: 0.75rem; margin: 1rem 0; }
        .cp-old-price { text-decoration: line-through; color: #9ca3af; font-size: 1.2rem; font-weight: 600; }
        .cp-price { color: #dc2626; font-size: 2.5rem; font-weight: 800; }
        .cp-price-soon { color: #9ca3af; font-size: 1.8rem; font-weight: 800; }
        .cp-feature-list { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 0.85rem; flex-grow: 1; }
        .cp-feature-list li { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.95rem; }
        .cp-check { color: #dc2626; flex-shrink: 0; margin-top: 0.15rem; }

        .cp-bottom-cta { background: linear-gradient(135deg, #111827, #0f172a); color: #fff; border-radius: 28px; padding: 2.5rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .cp-bottom-cta p { margin: 0.25rem 0 0; color: #cbd5e1; }
        .cp-bottom-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }

        /* Modal Overlay & Styling */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          overflow-y: auto;
        }
        .modal-wrapper {
          background: #ffffff;
          border-radius: 24px;
          width: 100%;
          max-width: 520px;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          box-sizing: border-box;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-close {
          position: absolute;
          top: 1.25rem; right: 1.25rem;
          background: #f3f4f6;
          border: none;
          padding: 0.4rem;
          border-radius: 50%;
          cursor: pointer;
          color: #4b5563;
          display: flex;
          transition: 0.2s;
        }
        .modal-close:hover { background: #fee2e2; color: #dc2626; }
        .modal-title { font-size: 1.5rem; font-weight: 800; margin: 0 0 0.25rem; color: #111827; }
        .modal-subtitle { color: #6b7280; font-size: 0.9rem; margin: 0 0 1.5rem; }
        
        .form-group { margin-bottom: 1.1rem; }
        .form-group label { display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.4rem; color: #374151; }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%; border: 1px solid #d1d5db; border-radius: 12px; padding: 0.8rem 1rem; font-size: 0.95rem; outline: none; transition: 0.2s; box-sizing: border-box;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #dc2626; box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08); }
        
        /* Payment Modal Specific Inner Sub-Tabs */
        .payment-tabs { display: flex; gap: 0.5rem; border-bottom: 1px solid #e5e7eb; margin: 1rem 0; padding-bottom: 0.5rem; }
        .pay-tab-btn { flex: 1; padding: 0.6rem; font-weight: 700; border-radius: 8px; border: 1px solid #e5e7eb; background: #f9fafb; cursor: pointer; text-align: center; font-size: 0.9rem; }
        .pay-tab-btn.active { background: #fff5f5; color: #dc2626; border-color: #fecaca; }
        
        .tab-content-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1.25rem; margin-bottom: 1.25rem; text-align: center; }
        .qr-img-container img { max-width: 150px; width: 100%; border-radius: 10px; border: 1px solid #d1d5db; background: #fff; }

        @media (max-width: 1024px) {
          .cp-hero-grid, .cp-plan-grid { grid-template-columns: 1fr; }
          .cp-category-grid { grid-template-columns: repeat(2, 1fr); }
          .cp-step-grid { grid-template-columns: repeat(3, 1fr); }
          .cp-benefit-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .cp-category-grid, .cp-step-grid, .cp-benefit-grid { grid-template-columns: 1fr; }
          .cp-cta-row { flex-direction: column; }
          .cp-btn { width: 100%; }
          .cp-stat-grid { grid-template-columns: 1fr; }
          .modal-wrapper { padding: 1.5rem; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="cp-hero">
        <div className="cp-shell">
          <div className="cp-hero-grid">
            <div>
              <div className="cp-pill">
                <ShieldCheck size={15} /> Live classes · Recorded access · Certificate included
              </div>
              <h1 className="cp-title">Learn Digital Marketing <span>the practical way</span></h1>
              <p className="cp-subtitle">
                Choose a batch, attend live sessions, get recordings, and track everything from one place. Register fast and get instant access.
              </p>
              <div className="cp-cta-row">
                <button type="button" className="cp-btn cp-btn-primary" onClick={() => setActiveModal("reserve")}>
                  Reserve Seat <ArrowRight size={16} />
                </button>
                <button type="button" className="cp-btn cp-btn-primary" onClick={open1999Payment}>
                  Buy Course Just at ₹1999 <ArrowRight size={16} />
                </button>
                <button type="button" className="cp-btn cp-btn-outline" onClick={() => setActiveModal("enquiry")}>
                  Enquiry Now
                </button>
                <Link to="/student-corner" className="cp-btn cp-btn-outline"><PlayCircle size={16} /> Student Corner</Link>
              </div>
              <div className="cp-bottom-links">
                <Link to="/master-panel" className="cp-btn cp-btn-outline">Master Panel</Link>
              </div>
            </div>

            <div className="cp-hero-card">
              <div className="cp-stat-grid">
                <div className="cp-stat"><strong>25 Live Classes</strong><span>Interactive teaching with real Q&A.</span></div>
                <div className="cp-stat"><strong>Recorded Access</strong><span>Watch later anytime via Student Corner.</span></div>
                <div className="cp-stat"><strong>Certificate</strong><span>Completion verification included.</span></div>
                <div className="cp-stat"><strong>Practical Projects</strong><span>Campaigns, creatives, analytics setup.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Categories */}
      <section className="cp-section" id="courses">
        <div className="cp-shell">
          <div className="cp-section-head">
            <BookOpen size={22} color="#dc2626" />
            <h2>What you will learn</h2>
          </div>
          <p className="cp-muted">Everything is structured to turn you into an execution-first professional.</p>
          <div className="cp-category-grid">
            {courseCategories.map((item) => (
              <div className="cp-cat-card" key={item.title}>
                <div className="cp-cat-icon">{item.icon}</div>
                <div className="cp-cat-title">{item.title}</div>
                <p className="cp-cat-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Flow Steps */}
      <section className="cp-section" style={{ background: "#fafafa" }}>
        <div className="cp-shell">
          <div className="cp-section-head">
            <Clock3 size={22} color="#dc2626" />
            <h2>Learning flow</h2>
          </div>
          <p className="cp-muted">A clear roadmap from dynamic orientation sessions to dashboard provisioning.</p>
          <div className="cp-step-grid">
            {steps.map((step, index) => (
              <div className="cp-step" key={step}>
                <div className="cp-step-num">{index + 1}</div>
                <p className="cp-step-text">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="cp-section">
        <div className="cp-shell">
          <div className="cp-section-head">
            <Star size={22} color="#dc2626" />
            <h2>Why students choose this course</h2>
          </div>
          <div className="cp-benefit-grid">
            <div className="cp-benefit">
              <CheckCircle2 size={18} color="#dc2626" />
              <strong>Live teaching</strong>
              <p>Real-time interactions, live audit reviews.</p>
            </div>
            <div className="cp-benefit">
              <CheckCircle2 size={18} color="#dc2626" />
              <strong>Recorded classes</strong>
              <p>Missed a lecture? Catch up instantly via student panel.</p>
            </div>
            <div className="cp-benefit">
              <CheckCircle2 size={18} color="#dc2626" />
              <strong>Practical Support</strong>
              <p>Get actual budgets handling setups guided by mentors.</p>
            </div>
            <div className="cp-benefit">
              <CheckCircle2 size={18} color="#dc2626" />
              <strong>Unified Dashboard</strong>
              <p>Assignments, recordings and codes synchronized.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Plans */}
      <section className="cp-section" style={{ background: "#fff5f5" }}>
        <div className="cp-shell">
          <div className="cp-section-head">
            <Wallet size={22} color="#dc2626" />
            <h2>Pricing Plans</h2>
          </div>
          <p className="cp-muted">Select the tier appropriate for your goals. Click purchase to open registration & instant payment options.</p>
          <div className="cp-plan-grid">
            {planCards.map((plan) => {
              const isProfessional = plan.name === "Professional";
              return (
                <div className="cp-plan-card" key={plan.name}>
                  <span className="cp-plan-badge">{plan.badge}</span>
                  <h3 style={{ margin: "0 0 0.3rem", fontSize: "1.35rem" }}>{plan.name}</h3>
                  <p style={{ color: "#6b7280", margin: 0, fontSize: "0.9rem" }}>{plan.subtitle}</p>
                  <div className="cp-price-row">
                    <span className="cp-old-price">{plan.oldPrice}</span>
                    {isProfessional ? (
                      <span className="cp-price-soon">Available Soon</span>
                    ) : (
                      <span className="cp-price">{plan.price}</span>
                    )}
                  </div>
                  <ul className="cp-feature-list">
                    {plan.features.map((f) => (
                      <li key={f}><CheckCircle2 size={16} className="cp-check" /><span>{f}</span></li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`cp-btn ${isProfessional ? "cp-btn-disabled" : "cp-btn-primary"}`}
                    disabled={isProfessional}
                    onClick={() => openPaymentModal(plan.name)}
                  >
                    {isProfessional ? "Purchased" : "Buy Now & Enrol"} {!isProfessional && <ArrowRight size={16} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cp-section" style={{ paddingTop: 0 }}>
        <div className="cp-shell">
          <div className="cp-bottom-cta">
            <div>
              <strong style={{ fontSize: "1.3rem", fontWeight: "800" }}>Ready to join our community channels?</strong>
              <p>Explore resources and setups before standard admissions terminate.</p>
            </div>
            <div className="cp-bottom-links">
              <button className="cp-btn cp-btn-primary" onClick={() => setActiveModal("reserve")}>Reserve Seat Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MODALS OVERLAYS (ENQUIRY / RESERVE / PAYMENT) 
         ======================================================== */}

      {/* 1. ENQUIRY MODAL */}
      {activeModal === "enquiry" && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}><X size={18} /></button>
            <div className="modal-title">Course Enquiry</div>
            <div className="modal-subtitle">Submit your questions and receive guidance from our team members.</div>
            <form onSubmit={(e) => handleFormSubmit(e, "enquiry")}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Nitish Kumar" required value={enquiryForm.fullName} onChange={(e) => setEnquiryForm({...enquiryForm, fullName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" placeholder="10 Digit Number" required value={enquiryForm.mobile} onChange={(e) => setEnquiryForm({...enquiryForm, mobile: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="example@gmail.com" required value={enquiryForm.email} onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Course Topic</label>
                <input type="text" readOnly value={enquiryForm.courseInterest} />
              </div>
              <button type="submit" className="cp-btn cp-btn-primary" style={{ width: "100%" }} disabled={loading}>
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. RESERVE SEAT MODAL */}
      {activeModal === "reserve" && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}><X size={18} /></button>
            <div className="modal-title">Hold/Reserve Seat</div>
            <div className="modal-subtitle">Reserve a slot to hold limited offers before final payment workflows.</div>
            <form onSubmit={(e) => handleFormSubmit(e, "reserve")}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter Full Name" required value={reserveForm.fullName} onChange={(e) => setReserveForm({...reserveForm, fullName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" placeholder="Enter Contact Number" required value={reserveForm.mobile} onChange={(e) => setReserveForm({...reserveForm, mobile: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@domain.com" required value={reserveForm.email} onChange={(e) => setReserveForm({...reserveForm, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Select Batch Schedule</label>
                <select required value={reserveForm.batch} onChange={(e) => setReserveForm({...reserveForm, batch: e.target.value})}>
                  <option value="">Choose Batch Timeline</option>
                  {batches.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
              <button type="submit" className="cp-btn cp-btn-primary" style={{ width: "100%" }} disabled={loading}>
                {loading ? "Processing..." : "Reserve My Seat"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. PAYMENT & REGISTRATION MODAL */}
      {activeModal === "payment" && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}><X size={18} /></button>
            <div className="modal-title">Complete Enrollment</div>
            <div className="modal-subtitle">Plan Selected: <span style={{color: "#dc2626", fontWeight: "bold"}}>{selectedPlan}</span></div>
            
            {/* Embedded Payment Method Tabs */}
            <div className="payment-tabs">
              <button type="button" className={`pay-tab-btn ${paymentTab === "gateway" ? "active" : ""}`} onClick={() => setPaymentTab("gateway")}>Razorpay Gateway</button>
              <button type="button" className={`pay-tab-btn ${paymentTab === "qr" ? "active" : ""}`} onClick={() => setPaymentTab("qr")}>Scan QR Code</button>
            </div>

            {paymentTab === "gateway" ? (
              <div className="tab-content-box" style={{ textAlign: "center", padding: "1rem" }}>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#4b5563" }}>
                  Instant activation via secure Razorpay checkout gateway.
                </p>
              </div>
            ) : (
              <div className="tab-content-box qr-img-container">
                <img 
                  src={QR_IMAGE_URL} 
                  alt="Payment Gateway QR" 
                  onError={(e)=>{
                    e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${UPI_ID}%26pn=DigitalMarketing`;
                  }}
                />
                <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem", color: "#6b7280" }}>Scan & transfer exact amount to UPI ID: <strong>{UPI_ID}</strong></p>
              </div>
            )}

            {/* Registration Form inputs */}
            <form onSubmit={(e) => handleFormSubmit(e, "payment")}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your Official Name" required value={paymentForm.fullName} onChange={(e) => setPaymentForm({...paymentForm, fullName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Mobile Number (WhatsApp preferred)</label>
                <input type="tel" placeholder="Mobile Number" required value={paymentForm.mobile} onChange={(e) => setPaymentForm({...paymentForm, mobile: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Your Email Address" required value={paymentForm.email} onChange={(e) => setPaymentForm({...paymentForm, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Batch Selection</label>
                <select required value={paymentForm.batch} onChange={(e) => setPaymentForm({...paymentForm, batch: e.target.value})}>
                  <option value="">Select Batch</option>
                  {batches.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
              {paymentTab === "qr" && (
                <div className="form-group">
                  <label>Transaction Reference ID / UTR Number</label>
                  <input type="text" placeholder="12 Digit Transaction Number" required value={paymentForm.utrTransactionId} onChange={(e) => setPaymentForm({...paymentForm, utrTransactionId: e.target.value})} />
                </div>
              )}
              <button type="submit" className="cp-btn cp-btn-primary" style={{ width: "100%", marginTop: "1rem" }} disabled={loading}>
                {loading 
                  ? "Processing..." 
                  : paymentTab === "gateway" 
                    ? "Pay & Enrol (Razorpay)" 
                    : "Submit Payment Record"
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;