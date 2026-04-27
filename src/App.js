import React, { useState } from 'react';

function App() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = '';
    let requiredChars = '';

    if (includeUppercase) {
      charPool += uppercaseChars;
      requiredChars += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (includeLowercase) {
      charPool += lowercaseChars;
      requiredChars += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    if (includeNumbers) {
      charPool += numberChars;
      requiredChars += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (includeSymbols) {
      charPool += symbolChars;
      requiredChars += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    if (charPool === '') {
      setGeneratedPassword('');
      return;
    }

    let password = requiredChars;
    for (let i = requiredChars.length; i < passwordLength; i++) {
      password += charPool[Math.floor(Math.random() * charPool.length)];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');
    setGeneratedPassword(password);
  };

  const copyToClipboard = async () => {
    if (!generatedPassword) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopyMessage('Copied!');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      setCopyMessage('Failed to copy');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '40px 32px',
    borderRadius: '20px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    maxWidth: '480px',
    width: '100%',
    backdropFilter: 'blur(10px)',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '28px',
    textAlign: 'center',
    color: '#111827',
    letterSpacing: '-0.025em',
  };

  const labelStyle = {
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '10px',
    color: '#374151',
    display: 'block',
  };

  const sliderStyle = {
    width: '100%',
    marginBottom: '24px',
    height: '8px',
    borderRadius: '4px',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: '#e5e7eb',
    outline: 'none',
  };

  const checkboxContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  };

  const checkboxStyle = {
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '12px',
    cursor: 'pointer',
    marginBottom: '12px',
    width: '100%',
    boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.4)',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  };

  const copyButtonStyle = {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '12px',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 24px',
    fontSize: '20px',
    marginBottom: '18px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    textAlign: 'center',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    backgroundColor: '#f9fafb',
    fontWeight: '500',
    letterSpacing: '0.05em',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const messageStyle = {
    color: '#4CAF50',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Password Generator</h1>

        <label style={labelStyle}>
          Password Length: {passwordLength}
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          style={sliderStyle}
        />

        <div style={checkboxContainerStyle}>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Uppercase (A-Z)
          </label>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Lowercase (a-z)
          </label>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Numbers (0-9)
          </label>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Symbols (!@#$%^&*)
          </label>
        </div>

         <button 
           onClick={generatePassword} 
           style={buttonStyle}
           onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
           onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
         >
           Generate Password
         </button>

        <input
          type="text"
          value={generatedPassword}
          readOnly
          placeholder="Generated password will appear here"
          style={inputStyle}
        />

         <button 
           onClick={copyToClipboard} 
           style={copyButtonStyle}
           onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
           onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
         >
           Copy to Clipboard
         </button>

        {copyMessage && <div style={messageStyle}>{copyMessage}</div>}
      </div>
    </div>
  );
}

export default App;
