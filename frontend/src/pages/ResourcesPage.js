// frontend/src/pages/ResourcesPage.js
import React from 'react';
import './ResourcesPage.css';

function ResourcesPage() {
  return (
    <div className="resources-page">
      <header className="resources-header">
        <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="resources-logo" />
        <h1>Resources</h1>
      </header>

      <div className="resource-card">
        <h2>Free Resources</h2>
        <p>
          Access a variety of free resources to support your learning journey. Click below to explore!
        </p>
        <a href="https://drive.google.com/drive/folders/1gC6GQLgcuoHzwDXtEGzTwvzCz0YsYuwg" target="_blank" rel="noopener noreferrer" className="resource-link">
          Google Drive Free Resources
        </a>
      </div>

      <div className="resource-card discounted">
        <h2>Discounted Resources</h2>
        <p>
          Use code: <strong>thelearningzone</strong> for 5% off on all resources.
        </p>
        <a href="https://rtr.sg" target="_blank" rel="noopener noreferrer" className="resource-link">
          Visit RTR.sg for Discounted Resources
        </a>
      </div>
    </div>
  );
}

export default ResourcesPage;

