import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './VerifyTransaction.css';

export default function VerifyTransaction() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [txn, setTxn] = useState(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const all = (() => { try { return JSON.parse(localStorage.getItem('greenfco_transactions')) || []; } catch { return []; } })();
    const found = all.find(t => t.token === token);
    if (found) setTxn(found);
    // Pre-fill buyer name from profile if available
    const profile = (() => { try { return JSON.parse(localStorage.getItem('greenfco_buyer_profile')); } catch { return null; } })();
    if (profile?.name) setBuyerName(profile.name);
  }, [token]);

  function handleConfirm(e) {
    e.preventDefault();
    if (!finalPrice || !buyerName) { setError('Veuillez remplir tous les champs / Please fill all fields'); return; }
    const price = Number(finalPrice);
    if (isNaN(price) || price <= 0) { setError('Prix invalide / Invalid price'); return; }

    const all = (() => { try { return JSON.parse(localStorage.getItem('greenfco_transactions')) || []; } catch { return []; } })();
    const updated = all.map(t => t.token === token ? {
      ...t,
      finalPrice: price,
      buyerName,
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
    } : t);
    localStorage.setItem('greenfco_transactions', JSON.stringify(updated));
    setConfirmed(true);
  }

  if (!token || !txn) return (
    <div className="vt-container">
      <div className="vt-card card">
        <div className="vt-icon">❌</div>
        <h2>{!token ? 'Lien invalide / Invalid link' : 'Transaction introuvable / Transaction not found'}</h2>
        <Link to="/marketplace" className="btn btn-primary">Retour / Back</Link>
      </div>
    </div>
  );

  if (txn.status === 'confirmed' || confirmed) return (
    <div className="vt-container">
      <div className="vt-card card vt-success">
        <div className="vt-check">✅</div>
        <h2>Transaction confirmée !</h2>
        <p>Transaction confirmed!</p>
        <div className="vt-summary">
          <div className="vt-row"><span>Produit</span><strong>{txn.productName}</strong></div>
          <div className="vt-row"><span>Vendeur</span><strong>{txn.sellerName}</strong></div>
          <div className="vt-row"><span>Prix final</span><strong>{(txn.finalPrice || Number(finalPrice)).toLocaleString()} {txn.currency}</strong></div>
          <div className="vt-row"><span>Date</span><strong>{new Date().toLocaleDateString('fr-FR')}</strong></div>
        </div>
        <p className="vt-note">La transaction a été enregistrée. / The transaction has been recorded.</p>
        <Link to="/marketplace" className="btn btn-primary">← Marketplace</Link>
      </div>
    </div>
  );

  return (
    <div className="vt-container">
      <div className="vt-card card">
        <div className="vt-header">
          <h2>📱 Confirmer la transaction</h2>
          <p>Confirm transaction</p>
        </div>
        <div className="vt-details">
          <div className="vt-row"><span>🌿 Produit</span><strong>{txn.productName}</strong></div>
          <div className="vt-row"><span>👤 Vendeur</span><strong>{txn.sellerName}</strong></div>
          <div className="vt-row"><span>📍 Lieu</span><strong>{txn.location || '—'}</strong></div>
          <div className="vt-row vt-agreed"><span>💰 Prix convenu</span><strong>{txn.agreedPrice.toLocaleString()} {txn.currency}</strong></div>
        </div>

        <form onSubmit={handleConfirm} className="vt-form">
          <div className="form-group">
            <label className="form-label">👤 Votre nom / Your name *</label>
            <input className="form-input" value={buyerName} onChange={e => setBuyerName(e.target.value)} placeholder="Nom complet" required />
          </div>
          <div className="form-group">
            <label className="form-label">💵 Prix final payé (FCFA) *</label>
            <input className="form-input vt-price-input" type="number" min="1" value={finalPrice} onChange={e => setFinalPrice(e.target.value)} placeholder="Ex: 45000" required />
            <p className="vt-price-hint">Entrez le montant exact de la transaction / Enter the exact transaction amount</p>
          </div>
          {error && <div className="vt-error">{error}</div>}
          <button type="submit" className="btn btn-primary vt-confirm-btn">
            ✅ Confirmer la transaction / Confirm transaction
          </button>
        </form>
      </div>
    </div>
  );
}
