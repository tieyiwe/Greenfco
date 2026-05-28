import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api/client';
import './GreenBot.css';

const SUGGESTIONS_FR = [
  "Comment planter des oignons en saison sèche ?",
  "Quels sont les besoins en eau du sorgho ?",
  "Comment améliorer la fertilité de mon sol ?",
  "Quelles cultures sont adaptées au Sahel ?",
  "Comment prévenir la chenille légionnaire ?",
];

const SUGGESTIONS_EN = [
  "How to plant onions in the dry season?",
  "What are the water needs of sorghum?",
  "How to improve my soil fertility?",
  "Which crops are adapted to the Sahel?",
  "How to prevent the fall armyworm?",
];

export default function GreenBot() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: lang === 'fr'
        ? "Bonjour ! Je suis GreenBot, votre assistant agricole IA de GreenFCO 🌿 Je suis spécialisé dans l'agriculture ouest-africaine — cultures, irrigation, sols, marchés. Comment puis-je vous aider aujourd'hui ?"
        : "Hello! I'm GreenBot, your GreenFCO AI farm assistant 🌿 I specialize in West African agriculture — crops, irrigation, soils, markets. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text) {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await api.post('/ai/greenbot', {
        message: userMsg,
        history,
        language: lang,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: lang === 'fr'
          ? "Désolé, je rencontre une difficulté technique. Veuillez réessayer dans quelques instants."
          : "Sorry, I'm experiencing a technical issue. Please try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  const suggestions = lang === 'fr' ? SUGGESTIONS_FR : SUGGESTIONS_EN;

  return (
    <div className="greenbot">
      <div className="greenbot-header">
        <div className="greenbot-avatar">🤖</div>
        <div>
          <h2>GreenBot</h2>
          <p className="greenbot-status">
            <span className="status-dot" />
            {lang === 'fr' ? 'Assistant IA — Agro-expert Afrique de l\'Ouest' : 'AI Assistant — West Africa Agro-expert'}
          </p>
        </div>
        <div className="greenbot-badges">
          <span className="badge badge-green">Claude AI</span>
          <span className="badge badge-green">GreenFCO Expert</span>
        </div>
      </div>

      <div className="greenbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message message-${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="message-avatar">🌿</div>
            )}
            <div className="message-bubble">
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>{msg.content}</p>
            </div>
            {msg.role === 'user' && (
              <div className="message-avatar message-avatar-user">👤</div>
            )}
          </div>
        ))}

        {loading && (
          <div className="message message-assistant">
            <div className="message-avatar">🌿</div>
            <div className="message-bubble typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="suggestions">
          <p className="suggestions-label">
            {lang === 'fr' ? 'Suggestions :' : 'Suggestions:'}
          </p>
          <div className="suggestions-grid">
            {suggestions.map(s => (
              <button
                key={s}
                className="suggestion-btn"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="greenbot-input" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder={lang === 'fr' ? 'Posez votre question agricole...' : 'Ask your farming question...'}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}>
          {loading ? '...' : '→'}
        </button>
      </form>

      <p className="greenbot-disclaimer">
        {lang === 'fr'
          ? 'GreenBot est un assistant IA. Pour des conseils professionnels, consultez un agronome ou l\'équipe GreenFCO.'
          : 'GreenBot is an AI assistant. For professional advice, consult an agronomist or the GreenFCO team.'}
      </p>
    </div>
  );
}
