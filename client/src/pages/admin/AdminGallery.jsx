import { useState, useEffect } from 'react';
import adminClient from '../../api/adminClient';

const CATEGORIES = ['general', 'terrain', 'formations', 'evenements', 'ferme-ecole'];

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  addCard: { background: 'white', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' },
  addTitle: { fontSize: '0.9rem', fontWeight: 700, color: '#1B4332', marginBottom: '1rem' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' },
  input: { padding: '0.55rem 0.9rem', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-body)', width: '100%', boxSizing: 'border-box' },
  select: { padding: '0.55rem 0.9rem', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', background: 'white', width: '100%', cursor: 'pointer' },
  submitBtn: { background: '#1B4332', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.55rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', marginTop: '0.75rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' },
  itemCard: { background: 'white', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', position: 'relative' },
  img: { width: '100%', height: '160px', objectFit: 'cover', display: 'block', background: '#f5f5f0' },
  imgPlaceholder: { width: '100%', height: '160px', background: '#f0f0ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#c0c0b8' },
  itemBody: { padding: '0.75rem' },
  itemTitle: { fontWeight: 600, fontSize: '0.875rem', color: '#1A1A14', marginBottom: '0.25rem', lineHeight: 1.3 },
  catBadge: { display: 'inline-block', background: '#d1fae5', color: '#065f46', padding: '0.15rem 0.5rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 600, textTransform: 'capitalize' },
  deleteBtn: { position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyState: { textAlign: 'center', padding: '3rem 2rem', color: 'var(--gray-mid)', background: 'white', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-md)' },
};

function getRole() {
  try { return JSON.parse(localStorage.getItem('greenfco_admin_session'))?.role || 'analyst'; } catch { return 'analyst'; }
}

export default function AdminGallery() {
  const adminRole = getRole();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    title: '', title_fr: '', category: 'general', image_url: '', caption: '', caption_fr: '',
  });

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  useEffect(() => {
    adminClient.get('/gallery')
      .then(r => setItems(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.image_url.trim()) {
      showToast('Titre et URL de l\'image requis.');
      return;
    }
    setAdding(true);
    try {
      const res = await adminClient.post('/gallery', {
        ...form,
        title_fr: form.title_fr || form.title,
        caption_fr: form.caption_fr || form.caption,
      });
      setItems(prev => [res.data, ...prev]);
      setForm({ title: '', title_fr: '', category: 'general', image_url: '', caption: '', caption_fr: '' });
      showToast('Photo ajoutée à la galerie.');
    } catch { showToast('Erreur lors de l\'ajout.'); }
    finally { setAdding(false); }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer "${item.title}" de la galerie ?`)) return;
    try {
      await adminClient.delete(`/gallery/${item.id}`);
      setItems(prev => prev.filter(i => i.id !== item.id));
      showToast('Photo supprimée.');
    } catch { showToast('Erreur lors de la suppression.'); }
  }

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })); }

  const canManage = adminRole === 'super_admin' || adminRole === 'manager';

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Galerie</h2>
          <p style={s.subtitle}>{items.length} photo{items.length !== 1 ? 's' : ''} dans la galerie</p>
        </div>
      </div>

      {canManage && (
        <div style={s.addCard}>
          <div style={s.addTitle}>🖼️ Ajouter une photo</div>
          <form onSubmit={handleAdd}>
            <div style={s.formGrid}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>Titre (EN) *</label>
                <input style={s.input} placeholder="Field visit — Burkina Faso" value={form.title} onChange={e => setField('title', e.target.value)} required />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>Titre (FR)</label>
                <input style={s.input} placeholder="Visite terrain — Burkina Faso" value={form.title_fr} onChange={e => setField('title_fr', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>Catégorie</label>
                <select style={s.select} value={form.category} onChange={e => setField('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>URL de l'image *</label>
                <input style={s.input} type="url" placeholder="https://…/photo.jpg" value={form.image_url} onChange={e => setField('image_url', e.target.value)} required />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>Légende (EN)</label>
                <input style={s.input} placeholder="Optional caption" value={form.caption} onChange={e => setField('caption', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', display: 'block', marginBottom: '0.3rem' }}>Légende (FR)</label>
                <input style={s.input} placeholder="Légende optionnelle" value={form.caption_fr} onChange={e => setField('caption_fr', e.target.value)} />
              </div>
            </div>
            <button type="submit" style={s.submitBtn} disabled={adding}>
              {adding ? 'Ajout en cours…' : '+ Ajouter à la galerie'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement…</p>
      ) : items.length === 0 ? (
        <div style={s.emptyState}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🖼️</div>
          <p>Aucune photo dans la galerie.</p>
          {canManage && <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Ajoutez la première photo avec le formulaire ci-dessus.</p>}
        </div>
      ) : (
        <div style={s.grid}>
          {items.map(item => (
            <div key={item.id} style={s.itemCard}>
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title_fr || item.title}
                  style={s.img}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
              ) : null}
              <div style={{ ...s.imgPlaceholder, display: item.image_url ? 'none' : 'flex' }}>🏞️</div>
              <div style={s.itemBody}>
                <p style={s.itemTitle}>{item.title_fr || item.title}</p>
                <span style={s.catBadge}>{item.category || 'general'}</span>
                {item.caption_fr && <p style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', marginTop: '0.35rem', lineHeight: 1.4 }}>{item.caption_fr}</p>}
              </div>
              {(adminRole === 'super_admin' || adminRole === 'manager') && (
                <button style={s.deleteBtn} onClick={() => handleDelete(item)} title="Supprimer">🗑</button>
              )}
            </div>
          ))}
        </div>
      )}

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}
