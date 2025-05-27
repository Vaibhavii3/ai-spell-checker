import React, { useState } from 'react';
import axios from 'axios';

const TextProcessor = () => {
  const styles = {
    textProcessor: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem 1rem',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    headerTitle: {
      margin: '0 0 0.5rem 0',
      fontSize: '2rem',
      fontWeight: '600'
    },
    headerSubtitle: {
      margin: 0,
      opacity: 0.9,
      fontSize: '1.1rem'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    controls: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      alignItems: 'flex-end'
    },
    controlGroup: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '150px'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    select: {
      padding: '0.5rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '0.875rem',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'border-color 0.2s'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem',
      marginLeft: 'auto'
    },
    btnPrimary: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      opacity: 1
    },
    btnSecondary: {
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    btnSmall: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    btnDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    error: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid #fecaca',
      marginBottom: '1rem',
      fontSize: '0.875rem'
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
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    editorHeader: {
      padding: '1rem 1.5rem',
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    editorHeaderTitle: {
      margin: 0,
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827'
    },
    charCount: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    editor: {
      width: '100%',
      padding: '1.5rem',
      border: 'none',
      outline: 'none',
      resize: 'vertical',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      fontFamily: 'inherit',
      backgroundColor: 'white'
    },
    resultActions: {
      display: 'flex',
      gap: '0.5rem'
    },
    resultText: {
      padding: '1.5rem',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      color: '#374151',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#f9fafb'
    }
  };
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('spell');
  const [tone, setTone] = useState('professional');
  const [goal, setGoal] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const modes = [
    { value: 'spell', label: 'Spell Check' },
    { value: 'grammar', label: 'Grammar Fix' },
    { value: 'rephrase', label: 'Rephrase' },
    { value: 'tone', label: 'Change Tone' },
    { value: 'vocabulary', label: 'Enhance Vocabulary' },
    { value: 'default', label: 'Improve Overall' },
    { value: 'goal', label: 'Goal-Based Writing'}
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'academic', label: 'Academic' }
  ];

  const goals = [
  { value: 'email', label: 'Email' },
  { value: 'essay', label: 'Essay' },
  { value: 'story', label: 'Story' },
  { value: 'resume', label: 'Resume' }
];


  const processText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to process');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem("authToken");
            if (!token) {
              console.error("No token found");
              setError("Authorization token missing.");
              setLoading(false);
              return;
            }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/spell/process`, 
        {
          text: text.trim(),
          mode,
          tone: mode === 'tone' ? tone : undefined,
          goal: mode === 'goal' ? goal : undefined
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        },
      );

      // if (!response.ok) {
      //   throw new Error('Failed to process text');
      // }

      // const data = await response.json();
      setResult(response.data.result || 'No result received');
    } catch (err) {
      setError( err.response?.data?.error || err.message || 'An error occurred while processing');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText('');
    setResult('');
    setError('');
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
  };

  const replaceOriginal = () => {
    setText(result);
    setResult('');
  };

  return (
    <div style={styles.textProcessor}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Text Processor</h1>
        <p style={styles.headerSubtitle}>Improve your writing with AI assistance</p>
      </header>

      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.controlGroup}>
            <label htmlFor="mode" style={styles.label}>Processing Mode:</label>
            <select 
              id="mode"
              value={mode} 
              onChange={(e) => setMode(e.target.value)}
              style={styles.select}
            >
              {modes.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {mode === 'tone' && (
            <div style={styles.controlGroup}>
              <label htmlFor="tone" style={styles.label}>Tone:</label>
              <select 
                id="tone"
                value={tone} 
                onChange={(e) => setTone(e.target.value)}
                style={styles.select}
              >
                {tones.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          )}

          {mode === 'goal' && (
            <div style={styles.controlGroup}>
              <label htmlFor="goal" style={styles.label}>Writing Goal:</label>
              <select 
                id="goal"
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
                style={styles.select}
              >
              {goals.map(g => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
              </select>
            </div>
          )}


          <div style={styles.buttonGroup}>
            <button 
              onClick={processText} 
              disabled={loading || !text.trim()}
              style={{
                ...styles.btnPrimary,
                ...(loading || !text.trim() ? styles.btnDisabled : {})
              }}
            >
              {loading ? 'Processing...' : 'Process Text'}
            </button>
            <button 
              onClick={clearAll}
              style={styles.btnSecondary}
            >
              Clear All
            </button>
          </div>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <div style={{
          ...styles.editorSection,
          ...(result ? styles.editorSectionWithResult : {})
        }}>
          <div style={styles.editorContainer}>
            <div style={styles.editorHeader}>
              <h3 style={styles.editorHeaderTitle}>Input Text</h3>
              <span style={styles.charCount}>{text.length} characters</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              style={styles.editor}
              rows="10"
            />
          </div>

          {result && (
            <div style={styles.editorContainer}>
              <div style={styles.editorHeader}>
                <h3 style={styles.editorHeaderTitle}>Processed Result</h3>
                <div style={styles.resultActions}>
                  <button onClick={copyResult} style={styles.btnSmall}>
                    Copy
                  </button>
                  <button onClick={replaceOriginal} style={styles.btnSmall}>
                    Replace Original
                  </button>
                </div>
              </div>
              <div style={styles.resultText}>
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextProcessor;