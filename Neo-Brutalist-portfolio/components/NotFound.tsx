import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main id="main-content" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <Helmet>
        <title>Page Not Found | SRITECH</title>
      </Helmet>
      <h1 style={{ fontSize: '64px', fontWeight: '600', margin: '0' }}>404</h1>
      <p style={{ fontSize: '18px', color: '#666', margin: '16px 0' }}>
        Page not found
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block', padding: '10px 24px',
          background: '#000', color: '#fff', borderRadius: '6px',
          textDecoration: 'none', fontSize: '14px'
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
