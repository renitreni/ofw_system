import { useState } from 'react'
import './App.css'

// --- AUTH PAGE COMPONENT ---
// This handles both Login and Registration views
function AuthPage({ isLogin, onBack, onToggle }) {
  return (
    <div className="auth-page-wrapper">
      <button className="back-home-btn" onClick={onBack}>← Back</button>
      
      {/* Organic background shape that shifts side based on view */}
      <div className={`auth-organic-shape ${isLogin ? 'left-side' : 'right-side'}`}></div>

      <div className={`auth-container ${isLogin ? 'align-left' : 'align-right'}`}>
        <div className="auth-content-wrapper">
          
          <div className="auth-brand">
            <div className="logo-circle"></div>
            <h3>Logo Name</h3>
          </div>

          <div className="auth-form-card">
            {/* The Dynamic Question Row */}
            <div className="auth-toggle-row">
              <span className="auth-question">
                {isLogin ? "Don't have an account yet?" : "Already have an account?"}
              </span>
              <button className="auth-toggle-btn-inline" onClick={onToggle}>
                {isLogin ? "Create one" : "Sign in"}
              </button>
            </div>

            <h1 className="auth-main-title">
              {isLogin ? "Welcome Back!" : "Create an account"}
            </h1>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && <input type="text" placeholder="Full Name" className="auth-input" />}
              <input type="email" placeholder="Email@domain.com" className="auth-input" />
              <input type="password" placeholder="Password" className="auth-input" />
              
              <button type="submit" className="auth-submit-btn">
                {isLogin ? "Continue" : "Register Now"}
              </button>
              
              <div className="auth-divider"><span>or</span></div>
              
              <button type="button" className="social-auth-btn">Continue with Google</button>
              <button type="button" className="social-auth-btn">Continue with Apple</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeIndex, setActiveIndex] = useState(null);
  
  // --- AUTH STATES ---
  const [showAuth, setShowAuth] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const menuItems = ['Home', 'Featured', 'How it Works', 'FAQ', 'News'];

  const handleNav = (item) => {
    setActiveTab(item);
    const sectionId = item.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (item === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // --- CONDITIONAL RENDERING ---
  // If showAuth is true, display the AuthPage instead of the landing page
  if (showAuth) {
    return (
      <AuthPage 
        isLogin={isLoginView} 
        onBack={() => setShowAuth(false)} 
        onToggle={() => setIsLoginView(!isLoginView)} 
      />
    );
  }

  return (
    <div className="main-wrapper">
      {/* --- SECTION 1: HERO --- */}
      <header className="hero-page" id="home">
        <nav className="glass-nav">
          <div className="nav-left"><div className="logo-circle"></div></div>
          <div className="nav-center">
            {menuItems.map((item) => (
              <button
                key={item}
                className={`nav-link ${activeTab === item ? 'active' : ''}`}
                onClick={() => handleNav(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <div className="hero-body">
          <h1 className="hero-title">Your OFW Monitoring <br/> Made Easy</h1>
          <p className="hero-subtitle">
            Stay updated on your loved one's location, work status, and safety reports in real-time
          </p>
          <div className="hero-actions">
            <button className="pill-btn-white" onClick={() => { setShowAuth(true); setIsLoginView(true); }}>
              Sign In Now
            </button>
            <button className="text-link">Learn More..</button>
          </div>
        </div>
        <div className="glow-wave"></div>
        <div className="subtle-wave"></div>
        <div className="organic-bg-shape"></div>
      </header>

      <main className="scroll-content">
        {/* --- SECTION 2: FEATURED --- */}
        <section className="stats-container" id="featured">
          <div className="stat-card"><h3>500+ OFWs</h3><p>monitored safely</p></div>
          <div className="stat-card shadow-mode"><h3>500+ OFWs</h3><p>monitored safely</p></div>
          <div className="stat-card"><h3>500+ OFWs</h3><p>monitored safely</p></div>
        </section>

        <section className="bento-layout">
           <div className="bento-header">Make your strategic choice</div>
           <div className="bento-grid">
              <div className="bento-box tall">Real-time <br/> location tracking</div>
              <div className="bento-box">Health & Safety <br/> Alerts</div>
              <div className="bento-box tall">Work Status <br/> Updates</div>
              <div className="bento-box">Family <br/> Communication</div>
              <div className="bento-box wide">Report & <br/> Analytics</div>
           </div>
        </section>

        {/* --- SECTION 3: HOW IT WORKS --- */}
        <section className="how-it-works-combined" id="how-it-works">
          <div className="how-it-works-header">
            <h2 className="section-title">How it works?</h2>
            <div className="process-row">
              <div className="step"><div className="step-circle"></div><p>Register</p></div>
              <div className="step"><div className="step-circle"></div><p>Add OFW</p></div>
              <div className="step"><div className="step-circle"></div><p>Monitor</p></div>
            </div>
          </div>

          <div className="testimonials-integration">
            <h2 className="section-title">What people says about Us?</h2>
            <div className="testi-container">
              <div className="testi-card">
                <div className="quote-icon">““</div>
                <p className="testi-text">Monitor status & Receive alerts. Highly recommended for families.</p>
                <div className="user-profile"><strong>John Mark</strong><span>OSW 2023</span></div>
              </div>
              <div className="testi-card">
                <div className="quote-icon">““</div>
                <p className="testi-text">Very easy to use and reliable tracking system for peace of mind.</p>
                <div className="user-profile"><strong>John Mark</strong><span>OSW 2023</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: FAQ --- */}
        <section className="faq-section" id="faq">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {[1, 2, 3].map((i, index) => (
              <div key={index} className="faq-item-wrapper">
                <div className="faq-header" onClick={() => toggleFAQ(index)}>
                  <p>How do I add an OFW to the system?</p>
                  <span className={`arrow-down ${activeIndex === index ? 'rotate' : ''}`}>⌵</span>
                </div>
                <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 5: NEWS --- */}
        <section className="updates-section" id="news">
          <h2 className="section-title">Latest Update</h2>
          <div className="updates-container">
            <div className="update-images">
              <div className="img-large"></div>
              <div className="img-small-stack">
                <div className="img-small"></div>
                <div className="img-small"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- SECTION 6: FOOTER AREA --- */}
      <footer className="footer-area">
        <div className="interested-bar">
          <span className="interested-text">Interested?</span>
          <button className="register-now-btn" onClick={() => { setShowAuth(true); setIsLoginView(false); }}>
            Register NOW
          </button>
        </div>
        
        <div className="footer-main">
          <div className="footer-brand">
            <div className="logo-section">
              <div className="logo-circle-small"></div>
              <h3>Logo Name</h3>
            </div>
            <div className="brand-description">
              <p>Monitor status & Receive alerts</p>
              <p>Monitor status & Receive alerts</p>
              <p>Monitor status & Receive alerts</p>
              <p>Monitor status & Receive alerts</p>
              <p>Monitor status & Receive alerts</p>
            </div>
            <div className="social-links">
              <span className="social-icon">f</span>
              <span className="social-icon">i</span>
              <span className="social-icon">t</span>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Quick Link</h4>
              <p>Add OFW details</p>
              <p>Add OFW details</p>
              <p>Add OFW details</p>
            </div>
            <div className="footer-col">
              <h4>Quick Link</h4>
              <p>Add OFW details</p>
              <p>Add OFW details</p>
              <p>Add OFW details</p>
            </div>
            <div className="footer-col">
              <h4>Office</h4>
              <p>Add OFW details</p>
              <p>Add OFW details</p>
              <p>Add OFW details</p>
            </div>
          </div>
        </div>

        <div className="footer-copyright">All rights Reserved 2026</div>
      </footer>
    </div>
  )
}

export default App