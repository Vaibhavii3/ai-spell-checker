import React, { useState } from 'react';
import axios from 'axios';

const TextProcessor = () => {
  const styles = {
    textProcessor: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc4 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    
    header: {
      background: 'linear-gradient(135deg, #6b5b3d 0%, #8b7355 100%)',
      color: '#faf8f3',
      padding: '3rem 1rem',
      textAlign: 'center',
      marginBottom: '2.5rem',
      boxShadow: '0 4px 20px rgba(107, 91, 61, 0.2)'
    },
    
    headerTitle: {
      margin: '0 0 0.75rem 0',
      fontSize: '2.5rem',
      fontWeight: '700',
      letterSpacing: '-0.5px',
      textShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    
    headerSubtitle: {
      margin: 0,
      opacity: 0.95,
      fontSize: '1.15rem',
      fontWeight: '400',
      letterSpacing: '0.3px'
    },
    
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 1.5rem 3rem'
    },
    
    controls: {
      backgroundColor: '#faf8f3',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 8px 30px rgba(107, 91, 61, 0.12)',
      marginBottom: '2rem',
      border: '1px solid #d4c4a8'
    },
    
    modeSection: {
      marginBottom: '1.5rem'
    },
    
    sectionTitle: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#6b5b3d',
      marginBottom: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    
    modeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    
    modeButton: {
      padding: '0.85rem 1rem',
      border: '2px solid #d4c4a8',
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#faf8f3',
      color: '#6b5b3d'
    },
    
    modeButtonActive: {
      backgroundColor: '#8b7355',
      color: '#faf8f3',
      borderColor: '#8b7355',
      boxShadow: '0 4px 12px rgba(139, 115, 85, 0.3)',
      transform: 'translateY(-2px)'
    },
    
    optionsRow: {
      display: 'flex',
      gap: '1.5rem',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginBottom: '1.5rem'
    },
    
    optionGroup: {
      flex: '1',
      minWidth: '200px'
    },
    
    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #d4c4a8',
      borderRadius: '10px',
      fontSize: '0.9rem',
      backgroundColor: '#faf8f3',
      color: '#6b5b3d',
      cursor: 'pointer',
      fontWeight: '500'
    },
    
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      paddingTop: '1rem',
      borderTop: '1px solid #d4c4a8'
    },
    
    btnPrimary: {
      backgroundColor: '#8b7355',
      color: '#faf8f3',
      border: 'none',
      padding: '0.9rem 2rem',
      borderRadius: '10px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(139, 115, 85, 0.2)'
    },
    
    btnSecondary: {
      backgroundColor: 'transparent',
      color: '#8b7355',
      border: '2px solid #8b7355',
      padding: '0.9rem 2rem',
      borderRadius: '10px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    
    btnDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    
    error: {
      backgroundColor: '#f9e8e8',
      color: '#b85c5c',
      padding: '1rem 1.25rem',
      borderRadius: '10px',
      border: '1px solid #e8c4c4',
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    success: {
      backgroundColor: '#e8f4e8',
      color: '#5c8b5c',
      padding: '1rem 1.25rem',
      borderRadius: '10px',
      border: '1px solid #c4e8c4',
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    editorSection: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '2rem'
    },
    
    editorSectionWithResult: {
      gridTemplateColumns: '1fr 1fr'
    },
    
    editorContainer: {
      backgroundColor: '#faf8f3',
      borderRadius: '16px',
      boxShadow: '0 8px 30px rgba(107, 91, 61, 0.12)',
      overflow: 'hidden',
      border: '1px solid #d4c4a8',
      transition: 'all 0.3s ease'
    },
    
    editorHeader: {
      padding: '1.25rem 1.5rem',
      background: 'linear-gradient(135deg, #e8dcc4 0%, #d4c4a8 100%)',
      borderBottom: '1px solid #c4b49a',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    
    editorHeaderTitle: {
      margin: 0,
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#6b5b3d',
      letterSpacing: '0.3px'
    },
    
    charCount: {
      fontSize: '0.8rem',
      color: '#8b7355',
      fontWeight: '600',
      backgroundColor: '#faf8f3',
      padding: '0.35rem 0.75rem',
      borderRadius: '20px'
    },
    
    editor: {
      width: '100%',
      padding: '1.5rem',
      border: 'none',
      outline: 'none',
      resize: 'vertical',
      fontSize: '0.95rem',
      lineHeight: '1.7',
      fontFamily: 'inherit',
      backgroundColor: '#faf8f3',
      color: '#4a4035',
      minHeight: '300px'
    },
    
    resultText: {
      padding: '1.5rem',
      fontSize: '0.95rem',
      lineHeight: '1.7',
      color: '#4a4035',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#faf8f3',
      minHeight: '300px'
    },
    
    copyButton: {
      backgroundColor: '#6b5b3d',
      color: '#faf8f3',
      border: 'none',
      padding: '0.6rem 1.2rem',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem'
    },
    
    statsBar: {
      display: 'flex',
      gap: '1.5rem',
      padding: '1rem 1.5rem',
      backgroundColor: '#f0e8d8',
      borderTop: '1px solid #d4c4a8',
      fontSize: '0.85rem',
      color: '#6b5b3d',
      fontWeight: '500'
    },
    
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    statLabel: {
      color: '#8b7355',
      fontWeight: '600'
    },
    
    loadingSpinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid #faf8f3',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }
  };

  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('spell');
  const [tone, setTone] = useState('professional');
  const [goal, setGoal] = useState('email');
  const [targetAudience, setTargetAudience] = useState('general');
  const [formality, setFormality] = useState('neutral');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const modes = [
    { value: 'spell', label: 'Spell Check', icon: '✓' },
    { value: 'grammar', label: 'Grammar Fix', icon: '📝' },
    { value: 'rephrase', label: 'Rephrase', icon: '🔄' },
    { value: 'tone', label: 'Change Tone', icon: '🎭' },
    { value: 'vocabulary', label: 'Enhance Vocabulary', icon: '📚' },
    { value: 'expand', label: 'Expand Text', icon: '📏' },
    { value: 'compress', label: 'Make Concise', icon: '📉' },
    { value: 'analyze', label: 'Analyze Writing', icon: '🔍' },
    { value: 'seo', label: 'SEO Optimize', icon: '🚀' },
    { value: 'summarize', label: 'Summarize', icon: '📄' },
    { value: 'bullets', label: 'Convert to Bullets', icon: '•' },
    { value: 'translate', label: 'Translate', icon: '🌐' },
    { value: 'goal', label: 'Goal-Based Writing', icon: '🎯' }
  ];

  const tones = ['professional', 'casual', 'formal', 'friendly', 'academic', 'humorous', 'empathetic'];
  const goals = ['email', 'essay', 'story', 'blog', 'social', 'resume', 'cover_letter'];
  const audiences = ['general', 'academic', 'professional', 'casual', 'children'];
  const formalityLevels = ['formal', 'neutral', 'casual'];
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' }
  ];

  const processText = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/spell/process`,
        {
          text: text.trim(),
          mode,
          tone: mode === 'tone' ? tone : undefined,
          goalType: mode === 'goal' ? goal : undefined,
          targetAudience,
          formality,
          language
        }
      );

      setResult(res.data.result || '');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText('');
    setResult('');
    setError('');
    setCopied(false);
  };

  const getWordCount = (str) => {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Add CSS animation for spinner
  const styleSheet = document.styleSheets[0];
  if (styleSheet && !Array.from(styleSheet.cssRules).some(rule => rule.name === 'spin')) {
    styleSheet.insertRule(`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  }

  return (
    <div style={styles.textProcessor}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>AI Writing Assistant</h1>
        <p style={styles.headerSubtitle}>
          Transform your writing with intelligent AI-powered tools
        </p>
      </header>

      <div style={styles.container}>
        {/* Controls Panel */}
        <div style={styles.controls}>
          {/* Mode Selection */}
          <div style={styles.modeSection}>
            <h3 style={styles.sectionTitle}>Select Mode</h3>
            <div style={styles.modeGrid}>
              {modes.map(m => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  style={{
                    ...styles.modeButton,
                    ...(mode === m.value ? styles.modeButtonActive : {})
                  }}
                  onMouseEnter={(e) => {
                    if (mode !== m.value) {
                      e.target.style.borderColor = '#8b7355';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (mode !== m.value) {
                      e.target.style.borderColor = '#d4c4a8';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div style={styles.optionsRow}>
            {mode === 'tone' && (
              <div style={styles.optionGroup}>
                <label style={styles.sectionTitle}>Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  style={styles.select}
                >
                  {tones.map(t => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {mode === 'goal' && (
              <div style={styles.optionGroup}>
                <label style={styles.sectionTitle}>Goal Type</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  style={styles.select}
                >
                  {goals.map(g => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1).replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {mode === 'translate' && (
              <div style={styles.optionGroup}>
                <label style={styles.sectionTitle}>Target Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={styles.select}
                >
                  {languages.map(l => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={styles.optionGroup}>
              <label style={styles.sectionTitle}>Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                style={styles.select}
              >
                {audiences.map(a => (
                  <option key={a} value={a}>
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.optionGroup}>
              <label style={styles.sectionTitle}>Formality</label>
              <select
                value={formality}
                onChange={(e) => setFormality(e.target.value)}
                style={styles.select}
              >
                {formalityLevels.map(f => (
                  <option key={f} value={f}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button
              onClick={processText}
              disabled={loading || !text.trim()}
              style={{
                ...styles.btnPrimary,
                ...(loading || !text.trim() ? styles.btnDisabled : {})
              }}
              onMouseEnter={(e) => {
                if (!loading && text.trim()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(139, 115, 85, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && text.trim()) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.2)';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={styles.loadingSpinner}></span>
                  {' Processing...'}
                </>
              ) : (
                'Process Text'
              )}
            </button>
            <button
              onClick={clearAll}
              style={styles.btnSecondary}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#8b7355';
                e.target.style.color = '#faf8f3';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#8b7355';
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.error}>
            <span></span>
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {copied && (
          <div style={styles.success}>
            <span></span>
            <span>Copied to clipboard!</span>
          </div>
        )}

        {/* Editor Section */}
        <div
          style={{
            ...styles.editorSection,
            ...(result ? styles.editorSectionWithResult : {})
          }}
        >
          {/* Input Editor */}
          <div style={styles.editorContainer}>
            <div style={styles.editorHeader}>
              <h3 style={styles.editorHeaderTitle}>Input Text</h3>
              <span style={styles.charCount}>{text.length} chars</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here... Type or paste content you want to improve."
              style={styles.editor}
            />
            <div style={styles.statsBar}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Words:</span>
                <span>{getWordCount(text)}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Characters:</span>
                <span>{text.length}</span>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div style={styles.editorContainer}>
              <div style={styles.editorHeader}>
                <h3 style={styles.editorHeaderTitle}> AI Result</h3>
                <button
                  onClick={copyToClipboard}
                  style={styles.copyButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#8b7355';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#6b5b3d';
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={styles.resultText}>{result}</div>
              <div style={styles.statsBar}>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Words:</span>
                  <span>{getWordCount(result)}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Characters:</span>
                  <span>{result.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextProcessor;