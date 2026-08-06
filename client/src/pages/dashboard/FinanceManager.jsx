import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../../api/client';
import './FinanceManager.css';

const CATEGORIES_FR = {
  income: ['Vente récolte', 'Subvention', 'Autre revenu'],
  expense: ['Semences', 'Engrais/intrants', 'Main d\'œuvre', 'Irrigation', 'Transport', 'Matériel', 'Autre dépense'],
};

export default function FinanceManager() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const DEMO_ENTRIES = [
    { id: 1, type: 'income', category: 'Vente récolte', amount: 250000, currency: 'FCFA', date: '2024-06-01', notes: 'Oignons 500kg' },
    { id: 2, type: 'expense', category: 'Semences', amount: 15000, currency: 'FCFA', date: '2024-05-10', notes: 'Semences maïs' },
    { id: 3, type: 'expense', category: 'Engrais/intrants', amount: 35000, currency: 'FCFA', date: '2024-05-15', notes: 'Urée 25kg' },
    { id: 4, type: 'income', category: 'Vente récolte', amount: 180000, currency: 'FCFA', date: '2024-06-10', notes: 'Pommes de terre 1t' },
  ];
  const [entries, setEntries] = useState(DEMO_ENTRIES);

  useEffect(() => {
    api.get('/finance')
      .then(res => { if (res.data?.length > 0) setEntries(res.data); })
      .catch(() => {});
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [activeType, setActiveType] = useState('all');
  const [form, setForm] = useState({ type: 'income', category: '', amount: '', currency: 'FCFA', date: new Date().toISOString().slice(0, 10), notes: '' });

  const totalIncome = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const filtered = entries.filter(e => activeType === 'all' || e.type === activeType);

  const chartData = [
    { name: lang === 'fr' ? 'Revenus' : 'Income', value: totalIncome, fill: '#52B788' },
    { name: lang === 'fr' ? 'Dépenses' : 'Expenses', value: totalExpense, fill: '#F4A261' },
    { name: 'Balance', value: balance, fill: balance >= 0 ? '#1B4332' : '#e53e3e' },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const entryData = { ...form, amount: Number(form.amount) };
    setShowForm(false);
    setForm({ type: 'income', category: '', amount: '', currency: 'FCFA', date: new Date().toISOString().slice(0, 10), notes: '' });
    try {
      const res = await api.post('/finance', entryData);
      setEntries(prev => [res.data, ...prev]);
    } catch {
      setEntries(prev => [{ id: Date.now(), ...entryData }, ...prev]);
    }
  }

  const fmt = (n) => n.toLocaleString('fr-FR');

  return (
    <div className="finance-manager">
      <div className="module-header">
        <div>
          <h1>{lang === 'fr' ? 'Gestion Financière' : 'Finance Manager'}</h1>
          <p>{lang === 'fr' ? 'Suivi de vos revenus et dépenses' : 'Track your income and expenses'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕' : `+ ${lang === 'fr' ? 'Nouvelle entrée' : 'New entry'}`}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="finance-summary">
        <div className="finance-summary-card income">
          <span>💰</span>
          <div>
            <p>{lang === 'fr' ? 'Revenus' : 'Income'}</p>
            <strong>{fmt(totalIncome)} FCFA</strong>
          </div>
        </div>
        <div className="finance-summary-card expense">
          <span>📉</span>
          <div>
            <p>{lang === 'fr' ? 'Dépenses' : 'Expenses'}</p>
            <strong>{fmt(totalExpense)} FCFA</strong>
          </div>
        </div>
        <div className={`finance-summary-card ${balance >= 0 ? 'balance-pos' : 'balance-neg'}`}>
          <span>{balance >= 0 ? '✅' : '⚠️'}</span>
          <div>
            <p>Balance</p>
            <strong>{balance >= 0 ? '+' : ''}{fmt(balance)} FCFA</strong>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>
          {lang === 'fr' ? 'Vue d\'ensemble financière' : 'Financial overview'}
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => [`${fmt(v)} FCFA`]} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <rect key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.25rem' }}>{lang === 'fr' ? 'Nouvelle entrée' : 'New entry'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Type' : 'Type'}</label>
                <select className="form-select" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value, category: '' }))}>
                  <option value="income">{lang === 'fr' ? 'Revenu' : 'Income'}</option>
                  <option value="expense">{lang === 'fr' ? 'Dépense' : 'Expense'}</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Catégorie' : 'Category'}</label>
                <select className="form-select" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  <option value="">{lang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
                  {CATEGORIES_FR[form.type].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Montant' : 'Amount'} *</label>
                <input type="number" className="form-input" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} required min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === 'fr' ? 'Date' : 'Date'}</label>
                <input type="date" className="form-input" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{lang === 'fr' ? 'Notes' : 'Notes'}</label>
              <input type="text" className="form-input" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder={lang === 'fr' ? 'Description...' : 'Description...'} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary">{lang === 'fr' ? 'Enregistrer' : 'Save'}</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter & List */}
      <div className="finance-list-header">
        <div className="type-tabs">
          {[['all', lang === 'fr' ? 'Tout' : 'All'], ['income', lang === 'fr' ? 'Revenus' : 'Income'], ['expense', lang === 'fr' ? 'Dépenses' : 'Expenses']].map(([k, l]) => (
            <button key={k} className={`filter-btn ${activeType === k ? 'active' : ''}`} onClick={() => setActiveType(k)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="finance-entries">
        {filtered.map(entry => (
          <div key={entry.id} className={`finance-entry card ${entry.type}`}>
            <div className="entry-left">
              <span className="entry-type-icon">{entry.type === 'income' ? '💰' : '📉'}</span>
              <div>
                <p className="entry-category">{entry.category}</p>
                {entry.notes && <p className="entry-notes">{entry.notes}</p>}
                <p className="entry-date">{new Date(entry.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</p>
              </div>
            </div>
            <span className={`entry-amount ${entry.type}`}>
              {entry.type === 'income' ? '+' : '-'}{fmt(entry.amount)} {entry.currency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
