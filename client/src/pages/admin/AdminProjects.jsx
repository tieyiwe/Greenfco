import { useState, useEffect } from 'react';

const DEFAULT_TEAM = [
  { id: '1', name: 'Aïssata Kaboré', email: 'akabore@greenfco.com', role: 'manager' },
  { id: '2', name: 'Moussa Traoré', email: 'mtraore@greenfco.com', role: 'analyst' },
  { id: '3', name: 'Admin GreenFCO', email: 'admin@greenfco.com', role: 'super_admin' },
];

const DEFAULT_PROJECTS = [
  {
    id: 'p1',
    title: 'Lancement GreenFCO v2',
    description: 'Mise en production de la nouvelle plateforme',
    status: 'active',
    priority: 'urgent',
    assignedTo: [{ id: '1', name: 'Aïssata Kaboré' }, { id: '3', name: 'Admin GreenFCO' }],
    dueDate: '2026-06-30',
    createdAt: '2026-04-01',
    createdBy: 'Admin GreenFCO',
    tags: ['tech', 'prod'],
    comments: [{ id: 'c1', author: 'Admin GreenFCO', text: 'Avancement bon, 80% complet.', createdAt: '2026-05-20T10:00:00Z' }],
    tasks: [
      { id: 't1', title: 'Tests de régression', assignedTo: { id: '1', name: 'Aïssata Kaboré' }, dueDate: '2026-06-10', status: 'in_progress', createdAt: '2026-04-15T08:00:00Z' },
      { id: 't2', title: 'Déploiement serveur production', assignedTo: { id: '3', name: 'Admin GreenFCO' }, dueDate: '2026-06-25', status: 'todo', createdAt: '2026-04-15T08:00:00Z' },
    ],
    progress: 80,
  },
  {
    id: 'p2',
    title: 'Campagne Marketplace Q2',
    description: 'Recruter 50 vendeurs actifs sur la marketplace',
    status: 'active',
    priority: 'high',
    assignedTo: [{ id: '2', name: 'Moussa Traoré' }],
    dueDate: '2026-06-15',
    createdAt: '2026-04-10',
    createdBy: 'Admin GreenFCO',
    tags: ['marketing', 'marché'],
    comments: [],
    tasks: [
      { id: 't3', title: 'Contacter coopératives', assignedTo: { id: '2', name: 'Moussa Traoré' }, dueDate: '2026-05-30', status: 'done', createdAt: '2026-04-10T09:00:00Z' },
    ],
    progress: 40,
  },
  {
    id: 'p3',
    title: 'Formation équipe terrain',
    description: 'Formation de 20 agriculteurs pilotes à la plateforme',
    status: 'planning',
    priority: 'medium',
    assignedTo: [{ id: '1', name: 'Aïssata Kaboré' }],
    dueDate: '2026-07-20',
    createdAt: '2026-05-01',
    createdBy: 'Aïssata Kaboré',
    tags: ['formation'],
    comments: [],
    tasks: [],
    progress: 0,
  },
];

const PRIORITY_COLORS = {
  urgent: '#EF4444',
  high: '#F59E0B',
  medium: '#3B82F6',
  low: '#9CA3AF',
};

const STATUS_LABELS = {
  planning: 'Planification',
  active: 'Actif',
  paused: 'En pause',
  completed: 'Terminé',
};

const STATUS_COLORS = {
  planning: { bg: '#dbeafe', color: '#1e40af' },
  active: { bg: '#d1fae5', color: '#065f46' },
  paused: { bg: '#fef9c3', color: '#854d0e' },
  completed: { bg: '#f3f4f6', color: '#374151' },
};

const TASK_STATUS_LABELS = {
  todo: 'À faire',
  in_progress: 'En cours',
  done: 'Terminé',
};

const AVATAR_COLORS = ['#2D6A4F', '#52B788', '#1B4332', '#8B5E3C', '#6366f1', '#ec4899'];

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function loadProjects() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_projects'));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {}
  return DEFAULT_PROJECTS;
}

function saveProjects(projects) {
  localStorage.setItem('greenfco_projects', JSON.stringify(projects));
}

function loadTeam() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_admin_collaborators'));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {}
  return DEFAULT_TEAM;
}

function loadCurrentUser() {
  try {
    const stored = JSON.parse(localStorage.getItem('greenfco_admin_session'));
    if (stored && stored.name) return stored;
  } catch {}
  return { name: 'Admin GreenFCO', email: 'admin@greenfco.com', role: 'super_admin' };
}

function calcProgress(tasks) {
  if (!tasks || tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.status === 'done').length;
  return Math.round((done / tasks.length) * 100);
}

function isOverdue(dueDate) {
  return dueDate && new Date(dueDate) < new Date(new Date().toDateString());
}

// ─── Modal Overlay ──────────────────────────────────────────────────────────
function ModalOverlay({ onClose, children }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

// ─── Create Project Modal ───────────────────────────────────────────────────
function CreateProjectModal({ team, currentUser, onSave, onClose }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: [],
    tags: '',
  });
  const [error, setError] = useState('');

  function toggleAssign(member) {
    setForm((f) => {
      const exists = f.assignedTo.find((a) => a.id === member.id);
      return {
        ...f,
        assignedTo: exists
          ? f.assignedTo.filter((a) => a.id !== member.id)
          : [...f.assignedTo, { id: member.id, name: member.name }],
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) { setError('Le titre est requis.'); return; }
    const project = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      status: 'planning',
      priority: form.priority,
      assignedTo: form.assignedTo,
      dueDate: form.dueDate,
      createdAt: new Date().toISOString(),
      createdBy: currentUser.name,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      comments: [],
      tasks: [],
      progress: 0,
    };
    onSave(project);
  }

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{
        background: 'white', borderRadius: '12px', width: '100%', maxWidth: '520px',
        maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, color: '#1B4332', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
            Nouveau Projet
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9CA3AF' }}>×</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Titre *</label>
            <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre du projet" />
            {error && <p style={{ color: '#EF4444', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>{error}</p>}
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description du projet" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Priorité</label>
              <select style={inputStyle} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Date limite</label>
              <input type="date" style={inputStyle} value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Assigner à</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.5rem', border: '1px solid var(--gray-light)', borderRadius: '6px' }}>
              {team.map((member) => {
                const checked = !!form.assignedTo.find((a) => a.id === member.id);
                return (
                  <label key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#3D3D35' }}>
                    <input type="checkbox" checked={checked} onChange={() => toggleAssign(member)} />
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: getAvatarColor(member.name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>
                      {getInitials(member.name)}
                    </div>
                    {member.name}
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Tags (séparés par des virgules)</label>
            <input style={inputStyle} value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="ex: tech, prod, marketing" />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} style={btnSecondary}>Annuler</button>
            <button type="submit" style={btnPrimary}>Créer le projet</button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

// ─── Project Detail Modal ───────────────────────────────────────────────────
function ProjectDetailModal({ project, team, currentUser, onUpdate, onClose }) {
  const [activeTab, setActiveTab] = useState('tasks');
  const [proj, setProj] = useState(project);

  // Tasks tab state
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', dueDate: '' });

  // Comments tab state
  const [commentText, setCommentText] = useState('');

  // Infos tab state
  const [editInfo, setEditInfo] = useState({
    title: project.title,
    description: project.description,
    priority: project.priority,
    status: project.status,
    dueDate: project.dueDate,
    assignedTo: project.assignedTo,
    tags: project.tags.join(', '),
  });

  function save(updated) {
    setProj(updated);
    onUpdate(updated);
  }

  // Task actions
  function cycleTaskStatus(taskId) {
    const cycle = { todo: 'in_progress', in_progress: 'done', done: 'todo' };
    const updatedTasks = proj.tasks.map((t) =>
      t.id === taskId ? { ...t, status: cycle[t.status] } : t
    );
    const updated = { ...proj, tasks: updatedTasks, progress: calcProgress(updatedTasks) };
    save(updated);
  }

  function deleteTask(taskId) {
    const updatedTasks = proj.tasks.filter((t) => t.id !== taskId);
    const updated = { ...proj, tasks: updatedTasks, progress: calcProgress(updatedTasks) };
    save(updated);
  }

  function addTask(e) {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    const member = team.find((m) => m.id === newTask.assignedTo);
    const task = {
      id: crypto.randomUUID(),
      title: newTask.title.trim(),
      assignedTo: member ? { id: member.id, name: member.name } : { id: '', name: 'Non assigné' },
      dueDate: newTask.dueDate,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...proj.tasks, task];
    const updated = { ...proj, tasks: updatedTasks, progress: calcProgress(updatedTasks) };
    save(updated);
    setNewTask({ title: '', assignedTo: '', dueDate: '' });
    setShowAddTask(false);
  }

  // Comment actions
  function addComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    const comment = {
      id: crypto.randomUUID(),
      author: currentUser.name,
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = { ...proj, comments: [...proj.comments, comment] };
    save(updated);
    setCommentText('');
  }

  // Info save
  function saveInfo(e) {
    e.preventDefault();
    const updated = {
      ...proj,
      title: editInfo.title,
      description: editInfo.description,
      priority: editInfo.priority,
      status: editInfo.status,
      dueDate: editInfo.dueDate,
      assignedTo: editInfo.assignedTo,
      tags: editInfo.tags ? editInfo.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };
    save(updated);
  }

  function toggleInfoAssign(member) {
    setEditInfo((f) => {
      const exists = f.assignedTo.find((a) => a.id === member.id);
      return {
        ...f,
        assignedTo: exists
          ? f.assignedTo.filter((a) => a.id !== member.id)
          : [...f.assignedTo, { id: member.id, name: member.name }],
      };
    });
  }

  const taskStatusColor = {
    todo: { bg: '#f3f4f6', color: '#374151' },
    in_progress: { bg: '#dbeafe', color: '#1e40af' },
    done: { bg: '#d1fae5', color: '#065f46' },
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{
        background: 'white', borderRadius: '12px', width: '100%', maxWidth: '660px',
        maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{ background: PRIORITY_COLORS[proj.priority], color: 'white', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 700 }}>
                {proj.priority.toUpperCase()}
              </span>
              <span style={{ background: STATUS_COLORS[proj.status]?.bg, color: STATUS_COLORS[proj.status]?.color, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600 }}>
                {STATUS_LABELS[proj.status]}
              </span>
            </div>
            <h3 style={{ margin: 0, color: '#1B4332', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{proj.title}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#6B7280' }}>{proj.description}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9CA3AF', flexShrink: 0 }}>×</button>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>
            <span>Progression</span>
            <span>{proj.progress}%</span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: '#e5e7eb', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${proj.progress}%`, background: 'var(--green-light)', borderRadius: '3px', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--gray-light)', marginBottom: '1.25rem' }}>
          {[{ key: 'tasks', label: `Tâches (${proj.tasks.length})` }, { key: 'comments', label: `Commentaires (${proj.comments.length})` }, { key: 'info', label: 'Infos' }].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none', border: 'none', padding: '0.6rem 1rem',
                fontSize: '0.875rem', fontWeight: activeTab === tab.key ? 700 : 500,
                color: activeTab === tab.key ? '#1B4332' : '#6B7280',
                borderBottom: activeTab === tab.key ? '2px solid var(--green-light)' : '2px solid transparent',
                marginBottom: '-2px', cursor: 'pointer', fontFamily: 'var(--font-body)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Tasks */}
        {activeTab === 'tasks' && (
          <div>
            {proj.tasks.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontStyle: 'italic', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>Aucune tâche pour l'instant.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {proj.tasks.map((task) => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <button
                      onClick={() => cycleTaskStatus(task.id)}
                      style={{
                        background: taskStatusColor[task.status]?.bg,
                        color: taskStatusColor[task.status]?.color,
                        border: 'none', borderRadius: '6px', padding: '0.2rem 0.5rem',
                        fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                        fontFamily: 'var(--font-body)',
                      }}
                      title="Changer le statut"
                    >
                      {TASK_STATUS_LABELS[task.status]}
                    </button>
                    <span style={{ flex: 1, fontSize: '0.875rem', color: '#3D3D35', textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>
                      {task.title}
                    </span>
                    {task.assignedTo?.name && (
                      <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>{task.assignedTo.name}</span>
                    )}
                    {task.dueDate && (
                      <span style={{ fontSize: '0.72rem', color: isOverdue(task.dueDate) && task.status !== 'done' ? '#EF4444' : '#9CA3AF' }}>
                        {task.dueDate}
                      </span>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '1rem', padding: '0 4px', flexShrink: 0 }}
                      title="Supprimer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showAddTask ? (
              <form onSubmit={addTask} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <input style={inputStyle} placeholder="Titre de la tâche *" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} autoFocus />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <select style={inputStyle} value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}>
                    <option value="">— Assigner à —</option>
                    {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  <input type="date" style={inputStyle} value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" style={{ ...btnPrimary, fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>Ajouter</button>
                  <button type="button" onClick={() => setShowAddTask(false)} style={{ ...btnSecondary, fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>Annuler</button>
                </div>
              </form>
            ) : (
              <button onClick={() => setShowAddTask(true)} style={{ ...btnPrimary, width: '100%', textAlign: 'center', fontSize: '0.875rem' }}>
                + Ajouter une tâche
              </button>
            )}
          </div>
        )}

        {/* Tab: Comments */}
        {activeTab === 'comments' && (
          <div>
            {proj.comments.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontStyle: 'italic', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>Aucun commentaire pour l'instant.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                {proj.comments.map((comment) => (
                  <div key={comment.id} style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: getAvatarColor(comment.author), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>
                        {getInitials(comment.author)}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#1B4332' }}>{comment.author}</span>
                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                        {new Date(comment.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#3D3D35', lineHeight: 1.5 }}>{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={addComment} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
              <textarea
                style={{ ...inputStyle, flex: 1, minHeight: '60px', resize: 'vertical' }}
                placeholder="Ajouter un commentaire..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" style={{ ...btnPrimary, padding: '0.5rem 1rem', height: '60px' }}>Envoyer</button>
            </form>
          </div>
        )}

        {/* Tab: Infos */}
        {activeTab === 'info' && (
          <form onSubmit={saveInfo} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div>
              <label style={labelStyle}>Titre</label>
              <input style={inputStyle} value={editInfo.title} onChange={(e) => setEditInfo({ ...editInfo, title: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={editInfo.description} onChange={(e) => setEditInfo({ ...editInfo, description: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
              <div>
                <label style={labelStyle}>Priorité</label>
                <select style={inputStyle} value={editInfo.priority} onChange={(e) => setEditInfo({ ...editInfo, priority: e.target.value })}>
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Statut</label>
                <select style={inputStyle} value={editInfo.status} onChange={(e) => setEditInfo({ ...editInfo, status: e.target.value })}>
                  <option value="planning">Planification</option>
                  <option value="active">Actif</option>
                  <option value="paused">En pause</option>
                  <option value="completed">Terminé</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Date limite</label>
                <input type="date" style={inputStyle} value={editInfo.dueDate} onChange={(e) => setEditInfo({ ...editInfo, dueDate: e.target.value })} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Membres assignés</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.5rem', border: '1px solid var(--gray-light)', borderRadius: '6px' }}>
                {team.map((member) => {
                  const checked = !!editInfo.assignedTo.find((a) => a.id === member.id);
                  return (
                    <label key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#3D3D35' }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleInfoAssign(member)} />
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: getAvatarColor(member.name), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>
                        {getInitials(member.name)}
                      </div>
                      {member.name}
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Tags (séparés par des virgules)</label>
              <input style={inputStyle} value={editInfo.tags} onChange={(e) => setEditInfo({ ...editInfo, tags: e.target.value })} placeholder="tech, prod, marketing" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="submit" style={btnPrimary}>Enregistrer</button>
            </div>
          </form>
        )}
      </div>
    </ModalOverlay>
  );
}

// ─── Shared Styles ──────────────────────────────────────────────────────────
const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600,
  color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem',
};
const inputStyle = {
  width: '100%', padding: '0.55rem 0.75rem', border: '1px solid var(--gray-light)',
  borderRadius: '6px', fontSize: '0.875rem', fontFamily: 'var(--font-body)',
  color: '#3D3D35', boxSizing: 'border-box', outline: 'none', background: 'white',
};
const btnPrimary = {
  background: 'var(--green-mid)', color: 'white', border: 'none', borderRadius: '6px',
  padding: '0.55rem 1.1rem', fontSize: '0.875rem', fontWeight: 600,
  cursor: 'pointer', fontFamily: 'var(--font-body)',
};
const btnSecondary = {
  background: 'var(--off-white)', color: 'var(--gray-dark)', border: '1px solid var(--gray-light)',
  borderRadius: '6px', padding: '0.55rem 1.1rem', fontSize: '0.875rem', fontWeight: 600,
  cursor: 'pointer', fontFamily: 'var(--font-body)',
};

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AdminProjects() {
  const [projects, setProjects] = useState(loadProjects);
  const [team] = useState(loadTeam);
  const [currentUser] = useState(loadCurrentUser);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  function handleCreateProject(project) {
    setProjects((prev) => [project, ...prev]);
    setShowCreate(false);
  }

  function handleUpdateProject(updated) {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProject?.id === updated.id) setSelectedProject(updated);
  }

  const now = new Date(new Date().toDateString());
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const overdueProjects = projects.filter((p) => p.dueDate && new Date(p.dueDate) < now && p.status !== 'completed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#1B4332', fontFamily: 'var(--font-display)' }}>
            Projets
          </h2>
          <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--gray-mid)' }}>
            Gestion et suivi des projets d'équipe
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} style={btnPrimary}>
          + Nouveau Projet
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Total Projets', value: totalProjects, color: '#1B4332', icon: '📋' },
          { label: 'Actifs', value: activeProjects, color: '#2D6A4F', icon: '🚀' },
          { label: 'Terminés', value: completedProjects, color: '#52B788', icon: '✅' },
          { label: 'En retard', value: overdueProjects, color: '#EF4444', icon: '⚠️' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: 'white', border: '1px solid var(--gray-light)', borderRadius: '10px', padding: '1.1rem 1.25rem', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${stat.color}` }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.2rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--gray-mid)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📋</div>
          <p>Aucun projet pour l'instant. Créez le premier !</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {projects.map((project) => {
            const overdue = isOverdue(project.dueDate) && project.status !== 'completed';
            const statusC = STATUS_COLORS[project.status] || STATUS_COLORS.planning;
            return (
              <div
                key={project.id}
                style={{ background: 'white', border: '1px solid var(--gray-light)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                {/* Priority + Status badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: PRIORITY_COLORS[project.priority], color: 'white', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 700 }}>
                    {project.priority.toUpperCase()}
                  </span>
                  <span style={{ background: statusC.bg, color: statusC.color, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 600 }}>
                    {STATUS_LABELS[project.status]}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1B4332', lineHeight: 1.3 }}>{project.title}</h3>
                  <p style={{ margin: '0.3rem 0 0', fontSize: '0.825rem', color: '#6B7280', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '4px' }}>
                    <span>Progression</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: '#e5e7eb', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${project.progress}%`, background: 'var(--green-light)', borderRadius: '3px' }} />
                  </div>
                </div>

                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  {/* Avatars */}
                  <div style={{ display: 'flex' }}>
                    {project.assignedTo.slice(0, 4).map((member, idx) => (
                      <div key={member.id} title={member.name} style={{
                        width: 26, height: 26, borderRadius: '50%', border: '2px solid white',
                        background: getAvatarColor(member.name), display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: 'white', fontSize: '0.6rem', fontWeight: 700,
                        marginLeft: idx === 0 ? 0 : -8, zIndex: 10 - idx, flexShrink: 0,
                      }}>
                        {getInitials(member.name)}
                      </div>
                    ))}
                    {project.assignedTo.length > 4 && (
                      <div style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid white', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#6B7280', marginLeft: -8 }}>
                        +{project.assignedTo.length - 4}
                      </div>
                    )}
                  </div>

                  {/* Task count */}
                  <span style={{ background: '#f3f4f6', color: '#374151', padding: '0.15rem 0.5rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 600 }}>
                    {project.tasks.length} tâche{project.tasks.length !== 1 ? 's' : ''}
                  </span>

                  {/* Due date */}
                  <span style={{ fontSize: '0.72rem', color: overdue ? '#EF4444' : '#9CA3AF', fontWeight: overdue ? 600 : 400 }}>
                    {project.dueDate ? `📅 ${project.dueDate}` : '—'}
                  </span>
                </div>

                {/* Tags */}
                {project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{ background: '#f0fdf4', color: '#166534', padding: '0.1rem 0.5rem', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 500 }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Voir button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  style={{ ...btnPrimary, width: '100%', textAlign: 'center', marginTop: 'auto' }}
                >
                  Voir le projet
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {showCreate && (
        <CreateProjectModal
          team={team}
          currentUser={currentUser}
          onSave={handleCreateProject}
          onClose={() => setShowCreate(false)}
        />
      )}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          team={team}
          currentUser={currentUser}
          onUpdate={handleUpdateProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
