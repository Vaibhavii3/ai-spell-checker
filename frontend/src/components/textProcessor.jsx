import React, { useState } from 'react';
import axios from 'axios';

const TextProcessor = () => {
  const styles = {
    textProcessor: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
      flexDirection: 'column'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
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
      cursor: 'pointer'
    },
    btnSecondary: {
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    btnSmall: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: '500',
      cursor: 'pointer'
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
      lineHeight: '1.6'
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
    { value: 'goal', label: 'Goal-Based Writing' }
  ];

  const tones = ['professional', 'casual', 'formal', 'friendly', 'academic'];
  const goals = ['email', 'essay', 'story', 'resume'];

  const processText = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/spell/process`,
        {
          text: text.trim(),
          mode,
          tone: mode === 'tone' ? tone : undefined,
          goalType: mode === 'goal' ? goal : undefined
        }
      );

      setResult(res.data.result || '');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.textProcessor}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>AI Text Processor</h1>
        <p style={styles.headerSubtitle}>
          Improve your writing instantly using AI
        </p>
      </header>

      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.controlGroup}>
            <label style={styles.label}>Mode</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {modes.map(m => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  style={{
                    ...styles.btnSmall,
                    backgroundColor:
                      mode === m.value ? '#4f46e5' : '#e5e7eb',
                    color: mode === m.value ? 'white' : '#111827'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {mode === 'tone' && (
            <div style={styles.controlGroup}>
              <label style={styles.label}>Tone</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {tones.map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    style={{
                      ...styles.btnSmall,
                      backgroundColor:
                        tone === t ? '#4f46e5' : '#e5e7eb',
                      color: tone === t ? 'white' : '#111827'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'goal' && (
            <div style={styles.controlGroup}>
              <label style={styles.label}>Goal</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {goals.map(g => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    style={{
                      ...styles.btnSmall,
                      backgroundColor:
                        goal === g ? '#4f46e5' : '#e5e7eb',
                      color: goal === g ? 'white' : '#111827'
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button
              onClick={processText}
              disabled={loading}
              style={{
                ...styles.btnPrimary,
                ...(loading ? styles.btnDisabled : {})
              }}
            >
              {loading ? 'Processing…' : 'Process Text'}
            </button>
            <button
              onClick={() => {
                setText('');
                setResult('');
                setError('');
              }}
              style={styles.btnSecondary}
            >
              Clear
            </button>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div
          style={{
            ...styles.editorSection,
            ...(result ? styles.editorSectionWithResult : {})
          }}
        >
          <div style={styles.editorContainer}>
            <div style={styles.editorHeader}>
              <h3 style={styles.editorHeaderTitle}>Input</h3>
              <span style={styles.charCount}>{text.length} chars</span>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter text here..."
              rows={10}
              style={styles.editor}
            />
          </div>

          {result && (
            <div style={styles.editorContainer}>
              <div style={styles.editorHeader}>
                <h3 style={styles.editorHeaderTitle}>Result</h3>
              </div>
              <div style={styles.resultText}>{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextProcessor;