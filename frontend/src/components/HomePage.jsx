import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import bg from '../assets/bg.png';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = [
    {
      title: "Spell Check",
      description: "Instantly detect and correct spelling mistakes with AI-powered accuracy",
      color: "#8b7355",
      gradient: "linear-gradient(135deg, #8b7355 0%, #a68968 100%)"
    },
    {
      title: "Grammar Fix",
      description: "Perfect your grammar and sentence structure effortlessly",
      color: "#6b5b3d",
      gradient: "linear-gradient(135deg, #6b5b3d 0%, #8b7355 100%)"
    },
    {
      title: "Smart Rephrase",
      description: "Rewrite sentences for crystal-clear communication",
      color: "#9d8b6d",
      gradient: "linear-gradient(135deg, #9d8b6d 0%, #b5a384 100%)"
    },
    {
      title: "Tone Adjustment",
      description: "Adapt your writing style to match any audience or purpose",
      color: "#7d6b4f",
      gradient: "linear-gradient(135deg, #7d6b4f 0%, #9d8b6d 100%)"
    },
    {
      title: "Vocabulary Enhancement",
      description: "Elevate your language with sophisticated word choices",
      color: "#5d4d37",
      gradient: "linear-gradient(135deg, #5d4d37 0%, #7d6b4f 100%)"
    },
    {
      title: "SEO Optimization",
      description: "Optimize your content for better search engine visibility",
      color: "#8b7355",
      gradient: "linear-gradient(135deg, #8b7355 0%, #a68968 100%)"
    },
    {
      title: "Writing Analysis",
      description: "Get detailed insights on readability and writing quality",
      color: "#6b5b3d",
      gradient: "linear-gradient(135deg, #6b5b3d 0%, #8b7355 100%)"
    },
    {
      title: "Text Expansion",
      description: "Transform brief ideas into comprehensive, detailed content",
      color: "#9d8b6d",
      gradient: "linear-gradient(135deg, #9d8b6d 0%, #b5a384 100%)"
    },
    {
      title: "Smart Compression",
      description: "Distill lengthy text into concise, impactful messages",
      color: "#7d6b4f",
      gradient: "linear-gradient(135deg, #7d6b4f 0%, #9d8b6d 100%)"
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const styles = {
    homepage: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6,
      color: '#4a4035',
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
      background: 'linear-gradient(135deg, rgba(107, 91, 61, 0.85) 0%, rgba(139, 115, 85, 0.75) 100%)',
      zIndex: 1
    },
    heroParticles: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 1
    },
    particle: {
      position: 'absolute',
      background: 'rgba(250, 248, 243, 0.1)',
      borderRadius: '50%',
      animation: 'float 20s infinite ease-in-out'
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
      color: '#faf8f3',
      maxWidth: '900px',
      margin: '0 auto'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontWeight: '800',
      marginBottom: '1.5rem',
      lineHeight: '1.2',
      textShadow: '2px 4px 8px rgba(0, 0, 0, 0.3)',
      animation: 'slideInUp 1s ease-out',
      letterSpacing: '-1px'
    },
    heroSubtitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      marginBottom: '3rem',
      opacity: 0.95,
      animation: 'slideInUp 1s ease-out 0.2s both',
      textShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)',
      lineHeight: '1.8',
      maxWidth: '700px',
      margin: '0 auto 3rem'
    },
    ctaButtonGroup: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      animation: 'slideInUp 1s ease-out 0.4s both'
    },
    ctaButton: {
      display: 'inline-block',
      padding: '1.2rem 3rem',
      backgroundColor: '#faf8f3',
      color: '#6b5b3d',
      textDecoration: 'none',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '700',
      border: 'none',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      letterSpacing: '0.3px'
    },
    ctaButtonSecondary: {
      display: 'inline-block',
      padding: '1.2rem 3rem',
      backgroundColor: 'transparent',
      color: '#faf8f3',
      textDecoration: 'none',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '700',
      border: '2px solid rgba(250, 248, 243, 0.5)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      letterSpacing: '0.3px'
    },
    stats: {
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc4 100%)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '3rem',
      textAlign: 'center'
    },
    statCard: {
      opacity: isVisible.stats ? 1 : 0,
      transform: isVisible.stats ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease'
    },
    statIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#6b5b3d',
      marginBottom: '0.5rem',
      display: 'block'
    },
    statLabel: {
      fontSize: '1.1rem',
      color: '#8b7355',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    features: {
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #faf8f3 0%, #f5f1e8 100%)'
    },
    sectionTitle: {
      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#6b5b3d',
      letterSpacing: '-1px'
    },
    sectionSubtitle: {
      fontSize: '1.25rem',
      textAlign: 'center',
      color: '#8b7355',
      marginBottom: '5rem',
      maxWidth: '700px',
      margin: '0 auto 5rem',
      lineHeight: '1.8'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2.5rem',
      marginTop: '4rem'
    },
    featureCard: {
      background: 'white',
      padding: '2.5rem',
      borderRadius: '24px',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(107, 91, 61, 0.12)',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #e8dcc4'
    },
    featureCardGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
      transition: 'all 0.4s ease'
    },
    featureIcon: {
      fontSize: '3.5rem',
      marginBottom: '1.5rem',
      display: 'block',
      filter: 'drop-shadow(0 4px 8px rgba(107, 91, 61, 0.2))'
    },
    featureTitle: {
      fontSize: '1.6rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: '#6b5b3d'
    },
    featureDescription: {
      color: '#8b7355',
      fontSize: '1.05rem',
      lineHeight: '1.7'
    },
    demo: {
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #6b5b3d 0%, #8b7355 100%)',
      color: '#faf8f3',
      position: 'relative',
      overflow: 'hidden'
    },
    demoPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      backgroundImage: 'radial-gradient(circle, #faf8f3 1px, transparent 1px)',
      backgroundSize: '30px 30px'
    },
    demoContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'center'
    },
    demoContent: {
      opacity: isVisible.demo ? 1 : 0,
      transform: isVisible.demo ? 'translateX(0)' : 'translateX(-50px)',
      transition: 'all 0.8s ease'
    },
    demoTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '800',
      marginBottom: '1.5rem',
      letterSpacing: '-0.5px'
    },
    demoDescription: {
      fontSize: '1.15rem',
      marginBottom: '2.5rem',
      lineHeight: '1.8',
      opacity: 0.95
    },
    demoFeatures: {
      listStyle: 'none',
      padding: 0
    },
    demoFeature: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.25rem',
      fontSize: '1.1rem',
      padding: '0.75rem',
      background: 'rgba(250, 248, 243, 0.1)',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)'
    },
    demoFeatureIcon: {
      color: '#faf8f3',
      marginRight: '1rem',
      fontSize: '1.5rem',
      background: 'rgba(250, 248, 243, 0.2)',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px'
    },
    demoVisual: {
      position: 'relative',
      opacity: isVisible.demo ? 1 : 0,
      transform: isVisible.demo ? 'translateX(0)' : 'translateX(50px)',
      transition: 'all 0.8s ease 0.2s'
    },
    demoBox: {
      background: 'rgba(250, 248, 243, 0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '3rem',
      border: '1px solid rgba(250, 248, 243, 0.2)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    demoBoxHeader: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      opacity: 0.8
    },
    demoText: {
      fontSize: '1.3rem',
      marginBottom: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.6'
    },
    demoButton: {
      background: '#faf8f3',
      color: '#6b5b3d',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none',
      fontWeight: '700',
      width: '100%',
      marginTop: '1rem'
    },
    testimonials: {
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc4 100%)'
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2.5rem',
      marginTop: '4rem'
    },
    testimonialCard: {
      background: 'white',
      padding: '2.5rem',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(107, 91, 61, 0.12)',
      position: 'relative',
      border: '1px solid #e8dcc4',
      opacity: isVisible.testimonials ? 1 : 0,
      transform: isVisible.testimonials ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease'
    },
    quoteIcon: {
      fontSize: '3rem',
      color: '#e8dcc4',
      position: 'absolute',
      top: '1.5rem',
      left: '1.5rem',
      opacity: 0.3
    },
    testimonialRating: {
      color: '#f59e0b',
      fontSize: '1.2rem',
      marginBottom: '1rem'
    },
    testimonialText: {
      fontSize: '1.1rem',
      fontStyle: 'italic',
      marginBottom: '2rem',
      color: '#6b5b3d',
      lineHeight: '1.8',
      position: 'relative',
      zIndex: 1
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e8dcc4'
    },
    testimonialAvatar: {
      fontSize: '3rem',
      marginRight: '1rem',
      background: 'linear-gradient(135deg, #e8dcc4 0%, #d4c4a8 100%)',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%'
    },
    testimonialInfo: {
      flex: 1
    },
    testimonialName: {
      fontWeight: '700',
      color: '#6b5b3d',
      marginBottom: '0.25rem',
      fontSize: '1.1rem'
    },
    testimonialRole: {
      color: '#8b7355',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    cta: {
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #6b5b3d 0%, #4a4035 100%)',
      color: '#faf8f3',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    ctaPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
      backgroundImage: 'radial-gradient(circle, #faf8f3 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    },
    ctaContent: {
      position: 'relative',
      zIndex: 1
    },
    ctaTitle: {
      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
      fontWeight: '800',
      marginBottom: '1.5rem',
      letterSpacing: '-1px'
    },
    ctaDescription: {
      fontSize: '1.3rem',
      marginBottom: '3rem',
      opacity: 0.95,
      maxWidth: '700px',
      margin: '0 auto 3rem',
      lineHeight: '1.8'
    },
    ctaButtons: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    ctaPrimary: {
      padding: '1.2rem 3rem',
      backgroundColor: '#faf8f3',
      color: '#6b5b3d',
      textDecoration: 'none',
      borderRadius: '50px',
      fontSize: '1.15rem',
      fontWeight: '700',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
      letterSpacing: '0.3px'
    },
    ctaSecondary: {
      padding: '1.2rem 3rem',
      backgroundColor: 'transparent',
      color: '#faf8f3',
      textDecoration: 'none',
      borderRadius: '50px',
      fontSize: '1.15rem',
      fontWeight: '700',
      border: '2px solid rgba(250, 248, 243, 0.5)',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      letterSpacing: '0.3px'
    },
    footer: {
      padding: '3rem 0',
      backgroundColor: '#4a4035',
      color: '#faf8f3',
      textAlign: 'center'
    },
    footerText: {
      opacity: 0.8,
      fontSize: '1rem',
      fontWeight: '500'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block'
    }
  };

  const keyframes = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      33% {
        transform: translateY(-20px) translateX(10px);
      }
      66% {
        transform: translateY(10px) translateX(-10px);
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }

    @media (max-width: 768px) {
      .demo-container {
        grid-template-columns: 1fr !important;
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
                Professional text processing powered by advanced artificial intelligence. 
                Fix grammar, enhance vocabulary, adjust tone, and perfect your writing in seconds.
              </p>
              <div style={styles.ctaButtonGroup}>
                <Link to="/text" style={styles.link}>
                  <button 
                    style={styles.ctaButton}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-4px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    Try It Free
                  </button>
                </Link>
                <button 
                  style={styles.ctaButtonSecondary}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(250, 248, 243, 0.2)';
                    e.target.style.borderColor = '#faf8f3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'rgba(250, 248, 243, 0.5)';
                  }}
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={styles.features}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Powerful Writing Tools</h2>
            <p style={styles.sectionSubtitle}>
              Everything you need to create perfect, professional content with the power of AI
            </p>
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.featureCard,
                    transform: isVisible.features ? 'translateY(0)' : 'translateY(40px)',
                    opacity: isVisible.features ? 1 : 0,
                    transitionDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(107, 91, 61, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(107, 91, 61, 0.12)';
                  }}
                >
                  <div style={{
                    ...styles.featureCardGlow,
                    background: feature.gradient
                  }}></div>
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
          <div style={styles.demoPattern}></div>
          <div style={styles.container}>
            <div style={{...styles.demoContainer}} className="demo-container">
              <div style={styles.demoContent}>
                <h2 style={styles.demoTitle}>See It In Action</h2>
                <p style={styles.demoDescription}>
                  Our AI-powered text processor analyzes your content in real-time and provides 
                  intelligent, context-aware suggestions for improvement.
                </p>
                <ul style={styles.demoFeatures}>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    Lightning-fast real-time processing
                  </li>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    13+ intelligent processing modes
                  </li>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    Professional-grade results instantly
                  </li>
                  <li style={styles.demoFeature}>
                    <span style={styles.demoFeatureIcon}>✓</span>
                    Context-aware AI suggestions
                  </li>
                </ul>
              </div>
              <div style={styles.demoVisual}>
                <div style={styles.demoBox}>
                  <div style={styles.demoBoxHeader}>
                    CURRENTLY ACTIVE
                  </div>
                  <div style={styles.demoText}>
                    <strong>{features[currentFeatureIndex].title}</strong>
                  </div>
                  <div style={{...styles.demoText, fontSize: '1.1rem', fontWeight: '400', opacity: 0.9}}>
                    {features[currentFeatureIndex].description}
                  </div>
                  <button 
                    style={styles.demoButton}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.03)';
                      e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Link to="/text" style={{...styles.link, color: '#6b5b3d'}}>
                      Try This Mode →
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section style={styles.cta}>
          <div style={styles.ctaPattern}></div>
          <div style={styles.ctaContent}>
            <div style={styles.container}>
              <h2 style={styles.ctaTitle}>Ready to Transform Your Writing?</h2>
              <p style={styles.ctaDescription}>
                Start creating professional, polished content today with our AI-powered writing assistant. 
                It's free to try, no credit card required.
              </p>
              <div style={styles.ctaButtons}>
                <Link to="/text" style={styles.link}>
                  <button 
                    style={styles.ctaPrimary}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-4px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    Get Started Free
                  </button>
                </Link>
                <button 
                  style={styles.ctaSecondary}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(250, 248, 243, 0.2)';
                    e.target.style.borderColor = '#faf8f3';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'rgba(250, 248, 243, 0.5)';
                  }}
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                >
                  View All Features
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.container}>
            <p style={styles.footerText}>
              © 2025 AI Writing Assistant • Built with ❤️ for writers everywhere
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;