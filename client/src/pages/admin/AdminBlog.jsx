import { useState } from 'react';

const ARTICLES = [
  { slug: 'interview-elie-dipama-lefaso', title_fr: "L'Agriculture Intelligente au Burkina Faso : Vision et Ambition de GreenFCO", category: 'Actualités', author: 'Wenmanegda Elie DIPAMA', date: '2024-03-15', readTime: '8 min', featured: true },
  { slug: 'agroecologie-burkina-faso-enjeux', title_fr: "Agroécologie au Burkina Faso : Enjeux et Perspectives pour 2025", category: 'Agriculture Durable', author: 'GreenFCO Team', date: '2024-04-10', readTime: '6 min', featured: false },
  { slug: 'finance-carbone-afrique-opportunites', title_fr: "Finance Carbone en Afrique de l'Ouest : Opportunités pour les Agriculteurs", category: 'Recherche & Innovation', author: 'Wenmanegda Elie DIPAMA', date: '2024-05-22', readTime: '7 min', featured: false },
  { slug: 'faidherbia-albida-sahel', title_fr: "Faidherbia Albida : L'Arbre du Sahel qui Nourrit les Champs", category: 'Environnement', author: 'GreenFCO Team', date: '2024-06-08', readTime: '5 min', featured: false },
  { slug: 'agroecologie-sahel-changement-climatique', title_fr: "L'agroécologie au Sahel : solutions face au changement climatique", category: 'Agroécologie', author: 'Aminata Sawadogo', date: '2025-11-10', readTime: '6 min', featured: false },
  { slug: 'prix-cereales-afrique-ouest-2026', title_fr: "Prix des céréales en Afrique de l'Ouest : analyse et perspectives 2026", category: 'Marché', author: 'Oumarou Traoré', date: '2025-12-05', readTime: '7 min', featured: false },
  { slug: 'drones-agricoles-surveillance-cultures', title_fr: "Les drones agricoles révolutionnent la surveillance des cultures", category: 'Innovation', author: 'Kofi Mensah', date: '2026-01-18', readTime: '5 min', featured: false },
  { slug: 'financement-agricole-petits-exploitants', title_fr: "Financement agricole : nouvelles opportunités pour les petits exploitants", category: 'Financement', author: 'Fatoumata Diallo', date: '2026-02-07', readTime: '6 min', featured: false },
  { slug: 'sesame-burkina-faso-chaine-valeur', title_fr: "La chaîne de valeur du sésame burkinabè : opportunités d'export", category: 'Export', author: 'Wendyam Compaoré', date: '2026-02-25', readTime: '7 min', featured: false },
  { slug: 'irrigation-goutte-a-goutte-saison-seche', title_fr: "Irrigation goutte-à-goutte : économiser l'eau en saison sèche", category: 'Irrigation', author: 'Ibrahim Coulibaly', date: '2026-03-14', readTime: '5 min', featured: false },
  { slug: 'marches-numeriques-agricoles-vendre-en-ligne', title_fr: "Marchés numériques agricoles : comment vendre en ligne", category: 'Numérique', author: 'Aicha Sow', date: '2026-04-02', readTime: '6 min', featured: false },
  { slug: 'agroforesterie-arbres-rendements', title_fr: "Agroforesterie : planter des arbres pour améliorer les rendements", category: 'Agroforesterie', author: 'Seydou Ouédraogo', date: '2026-05-12', readTime: '6 min', featured: false },
];

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' },
  title: { fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)', margin: 0 },
  subtitle: { fontSize: '0.85rem', color: 'var(--gray-mid)', marginTop: '0.15rem' },
  addBtn: {
    background: '#1B4332', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)',
    padding: '0.55rem 1rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  },
  card: {
    background: 'white', border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: {
    textAlign: 'left', padding: '0.75rem 1rem',
    background: 'var(--off-white)', borderBottom: '1px solid var(--gray-light)',
    fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
    color: 'var(--gray-mid)', fontWeight: 600,
  },
  td: { padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f0', color: '#3D3D35', verticalAlign: 'middle' },
  catBadge: { display: 'inline-block', background: '#d1fae5', color: '#065f46', padding: '0.18rem 0.5rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 600 },
  featuredBadge: { display: 'inline-block', background: '#fef9c3', color: '#854d0e', padding: '0.18rem 0.5rem', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 600, marginLeft: '0.4rem' },
  editBtn: { border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', background: '#dbeafe', color: '#1e40af', fontFamily: 'var(--font-body)', marginRight: '0.4rem' },
  deleteBtn: { border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', background: '#fee2e2', color: '#991b1b', fontFamily: 'var(--font-body)' },
  modal: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
  },
  modalBox: {
    background: 'white', borderRadius: 'var(--radius-md)',
    padding: '1.75rem', width: '100%', maxWidth: '480px',
    boxShadow: 'var(--shadow-xl)',
  },
  modalTitle: { fontSize: '1.1rem', fontWeight: 700, color: '#1B4332', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' },
  formGroup: { marginBottom: '1rem' },
  label: { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-mid)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
  input: { width: '100%', padding: '0.55rem 0.75rem', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none', color: '#3D3D35' },
  textarea: { width: '100%', padding: '0.55rem 0.75rem', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none', color: '#3D3D35', resize: 'vertical', minHeight: '80px' },
  modalActions: { display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem' },
  cancelBtn: { border: '1px solid var(--gray-light)', background: 'white', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font-body)', color: '#3D3D35' },
  saveBtn: { border: 'none', background: '#1B4332', color: 'white', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 },
};

export default function AdminBlog() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', category: '' });

  function handleSave(e) {
    e.preventDefault();
    alert('[Demo] Article saved (no actual persistence):\n' + JSON.stringify(form, null, 2));
    setShowForm(false);
    setForm({ title: '', excerpt: '', category: '' });
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h2 style={s.title}>Blog Management</h2>
          <p style={s.subtitle}>{ARTICLES.length} articles published</p>
        </div>
        <button style={s.addBtn} onClick={() => setShowForm(true)}>
          + Add Article
        </button>
      </div>

      <div style={s.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                {['Title (FR)', 'Category', 'Author', 'Date', 'Read Time', 'Actions'].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ARTICLES.map((article) => (
                <tr key={article.slug}>
                  <td style={{ ...s.td, maxWidth: '300px' }}>
                    <span style={{ fontWeight: 500, color: '#1A1A14', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {article.title_fr}
                    </span>
                    {article.featured && <span style={s.featuredBadge}>Featured</span>}
                  </td>
                  <td style={s.td}><span style={s.catBadge}>{article.category}</span></td>
                  <td style={s.td}>{article.author}</td>
                  <td style={s.td}>{new Date(article.date).toLocaleDateString('en-GB')}</td>
                  <td style={s.td}>{article.readTime}</td>
                  <td style={s.td}>
                    <button style={s.editBtn} onClick={() => alert(`[Demo] Edit: ${article.title_fr}`)}>Edit</button>
                    <button style={s.deleteBtn} onClick={() => alert(`[Demo] Delete: ${article.title_fr}`)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Article Modal */}
      {showForm && (
        <div style={s.modal} onClick={() => setShowForm(false)}>
          <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
            <h3 style={s.modalTitle}>Add New Article</h3>
            <form onSubmit={handleSave}>
              <div style={s.formGroup}>
                <label style={s.label}>Title</label>
                <input
                  style={s.input}
                  type="text"
                  placeholder="Article title..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Excerpt / Summary</label>
                <textarea
                  style={s.textarea}
                  placeholder="Short description of the article..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Category</label>
                <input
                  style={s.input}
                  type="text"
                  placeholder="e.g. Agroécologie, Innovation..."
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div style={s.modalActions}>
                <button type="button" style={s.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" style={s.saveBtn}>Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
