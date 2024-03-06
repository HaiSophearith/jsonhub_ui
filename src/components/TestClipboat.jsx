import React, { useState } from 'react';

function App() {
    
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(event.target.href);
    setCopiedText(event.target.href);
  };

  return (
    <div>
      <a href="https://example.com" onClick={handleCopy}>
        Copy link to clipboard
      </a>
      {copiedText && <p>Link copied: {copiedText}</p>}
    </div>
  );
}

export default App;