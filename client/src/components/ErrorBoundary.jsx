import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem' }}>🌿</div>
          <h2 style={{ color: '#1B4332' }}>Une erreur est survenue / An error occurred</h2>
          <p style={{ color: '#6B7280', maxWidth: '400px' }}>
            {this.props.fallbackMessage || "Quelque chose s'est mal passé. Veuillez actualiser la page. / Something went wrong. Please refresh the page."}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            style={{ background: '#1B4332', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}
          >
            🔄 Actualiser / Refresh
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '1rem', textAlign: 'left', maxWidth: '600px', fontSize: '0.8rem', color: '#6B7280' }}>
              <summary>Error details (dev only)</summary>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{this.state.error.toString()}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
