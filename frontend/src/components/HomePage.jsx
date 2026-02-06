import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import bg from '../assets/bg.png';

const Homepage = () => {
  const [currentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const features = [
    {
      icon: "✓",
      title: "Spell Check",
      description: "Instantly detect and correct spelling mistakes in your text",
      color: "#10b981"
    },
    {
      icon: "📝",
      title: "Grammar Fix",
      description: "Fix grammatical errors and improve sentence structure",
      color: "#3b82f6"
    },
    {
      icon: "🔄",
      title: "Rephrase",
      description: "Rewrite sentences for better clarity and flow",
      color: "#8b5cf6"
    },
    {
      icon: "🎯",
      title: "Tone Adjustment",
      description: "Change the tone to match your audience and purpose",
      color: "#f59e0b"
    },
    {
      icon: "📚",
      title: "Vocabulary Enhancement",
      description: "Upgrade your vocabulary with more sophisticated words",
      color: "#ef4444"
    },
    {
      icon: "✨",
      title: "Overall Improvement",
      description: "Comprehensive enhancement of your writing quality",
      color: "#06b6d4"
    }
  ];

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const styles = {
    homepage: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6,
      color: '#1f2937',
      overflow: 'hidden'
    },
    hero: {
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 2
    },
    heroContent: {
      textAlign: 'center',
      color: 'white',
      maxWidth: '800px',
      margin: '0 auto'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '700',
      marginBottom: '1.5rem',
      background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'slideInUp 1s ease-out',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    },
    heroSubtitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
      marginBottom: '3rem',
      opacity: 0.95,
      animation: 'slideInUp 1s ease-out 0.2s both',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
    },
    ctaButton: {
      display: 'inline-block',
      padding: '1rem 2.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '600',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      animation: 'slideInUp 1s ease-out 0.4s both',
      cursor: 'pointer'
    },
    features: {
      padding: '6rem 0',
      backgroundColor: '#f8fafc'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    sectionSubtitle: {
      fontSize: '1.2rem',
      textAlign: 'center',
      color: '#6b7280',
      marginBottom: '4rem',
      maxWidth: '600px',
      margin: '0 auto 4rem'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '4rem'
    },
    featureCard: {
      background: 'white',
      padding: '2rem',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1f2937'
    },
    featureDescription: {
      color: '#6b7280',
      fontSize: '1rem'
    },
    demo: {
      padding: '6rem 0',
      backgroundColor: 'white',
      position: 'relative'
    },
    demoContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },
    demoContent: {
      opacity: isVisible.demo ? 1 : 0,
      transform: isVisible.demo ? 'translateX(0)' : 'translateX(-50px)',
      transition: 'all 0.8s ease'
    },
    demoTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#1f2937'
    },
    demoDescription: {
      fontSize: '1.1rem',
      color: '#6b7280',
      marginBottom: '2rem'
    },
    demoFeatures: {
      listStyle: 'none',
      padding: 0
    },
    demoFeature: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      fontSize: '1rem',
      color: '#374151'
    },
    demoFeatureIcon: {
      color: '#10b981',
      marginRight: '0.75rem',
      fontSize: '1.2rem'
    },
    demoVisual: {
      position: 'relative',
      opacity: isVisible.demo ? 1 : 0,
      transform: isVisible.demo ? 'translateX(0)' : 'translateX(50px)',
      transition: 'all 0.8s ease 0.2s'
    },
    demoBox: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '20px',
      padding: '2rem',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    demoText: {
      fontSize: '1.1rem',
      marginBottom: '1rem',
      position: 'relative',
      zIndex: 2
    },
    demoButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '10px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    testimonials: {
      padding: '6rem 0',
      backgroundColor: '#f8fafc'
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '4rem'
    },
    testimonialCard: {
      background: 'white',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    testimonialText: {
      fontSize: '1.1rem',
      fontStyle: 'italic',
      marginBottom: '1.5rem',
      color: '#374151'
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center'
    },
    testimonialAvatar: {
      fontSize: '2.5rem',
      marginRight: '1rem'
    },
    testimonialInfo: {
      flex: 1
    },
    testimonialName: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    testimonialRole: {
      color: '#6b7280',
      fontSize: '0.9rem'
    },
    cta: {
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      color: 'white',
      textAlign: 'center'
    },
    ctaTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '700',
      marginBottom: '1.5rem'
    },
    ctaDescription: {
      fontSize: '1.2rem',
      marginBottom: '3rem',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto 3rem'
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    ctaPrimary: {
      padding: '1rem 2.5rem',
      backgroundColor: '#667eea',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none'
    },
    ctaSecondary: {
      padding: '1rem 2.5rem',
      backgroundColor: 'transparent',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '600',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    footer: {
      padding: '3rem 0',
      backgroundColor: '#1f2937',
      color: 'white',
      textAlign: 'center'
    },
    footerText: {
      opacity: 0.7,
      fontSize: '0.9rem'
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    }
  };

  const keyframes = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(100vw);
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.homepage}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.container}>
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>
                Transform Your Writing with AI
              </h1>
              <p style={styles.heroSubtitle}>
                Professional text processing powered by advanced AI. Fix grammar, enhance vocabulary, adjust tone, and perfect your writing in seconds.
              </p>
              <button 
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Link to="/text" style={styles.link}>
                Try It Now
                </Link>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={styles.features}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Powerful Writing Tools</h2>
            <p style={styles.sectionSubtitle}>
              Everything you need to create perfect, professional text
            </p>
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.featureCard,
                    transform: isVisible.features ? 'translateY(0)' : 'translateY(30px)',
                    opacity: isVisible.features ? 1 : 0,
                    transition: `all 0.6s ease ${index * 0.1}s`,
                    borderTop: `4px solid ${feature.color}`
                  }}
                >
                  <span style={styles.featureIcon}>{feature.icon}</span>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" style={styles.demo}>
          <div style={styles.container}>
            <div style={styles.demoContainer}>
              <div style={styles.demoContent}>
                <h2 style={styles.demoTitle}>See It In Action</h2>
                <p style={styles.demoDescription}>
                  Our AI-powered text processor analyzes your content and provides intelligent suggestions for improvement.
                </p>
                <ul style={styles.demoFeatures}>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    Real-time text processing
                  </li>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    Multiple processing modes
                  </li>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    Instant results
                  </li>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    Professional quality output
                  </li>
                </ul>
              </div>
              <div style={styles.demoVisual}>
                <div style={styles.demoBox}>
                  <div style={styles.demoText}>
                    <strong>Current Mode:</strong> {features[currentFeature].title}
                  </div>
                  <div style={styles.demoText}>
                    {features[currentFeature].description}
                  </div>
                  <button style={styles.demoButton}>
                    Process Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.container}>
            <p style={styles.footerText}>
              © 2025 Text Processor. Built with care.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;