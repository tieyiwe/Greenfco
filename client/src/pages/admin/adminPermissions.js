// Shared admin permissions constants
// Extracted to avoid circular imports between AdminLayout and AdminSettings

export const ALL_PERMISSIONS = [
  { key: 'view_users',           label: 'Voir les utilisateurs',                  category: 'Users' },
  { key: 'manage_users',         label: 'Gérer les utilisateurs (suspendre/supprimer)', category: 'Users' },
  { key: 'view_listings',        label: 'Voir les annonces',                       category: 'Listings' },
  { key: 'manage_listings',      label: 'Approuver/Retirer/Signaler les annonces', category: 'Listings' },
  { key: 'view_transactions',    label: 'Voir les transactions',                   category: 'Transactions' },
  { key: 'manage_transactions',  label: 'Modifier les transactions',               category: 'Transactions' },
  { key: 'view_blog',            label: 'Voir le blog',                            category: 'Blog' },
  { key: 'manage_blog',          label: 'Gérer les articles',                      category: 'Blog' },
  { key: 'view_consulting',      label: 'Voir les consultations',                  category: 'Consulting' },
  { key: 'manage_consulting',    label: 'Confirmer/Annuler les RDV',               category: 'Consulting' },
  { key: 'view_projects',        label: 'Voir les projets',                        category: 'Projects' },
  { key: 'manage_projects',      label: 'Créer/Modifier des projets',              category: 'Projects' },
  { key: 'view_activity',        label: "Voir le journal d'activité",              category: 'Activity' },
  { key: 'view_settings',        label: 'Accéder aux paramètres admin',            category: 'Settings' },
  { key: 'manage_team',          label: "Gérer l'équipe et les rôles",             category: 'Settings' },
];

export const ADMIN_ROLE_DEFINITIONS = {
  super_admin:     { label: 'Super Admin',       color: '#EF4444' },
  manager:         { label: 'Manager',           color: '#F59E0B' },
  analyst:         { label: 'Analyst',           color: '#3B82F6' },
  staff:           { label: 'Staff',             color: '#8B5CF6' },
  assistant:       { label: 'Assistant',         color: '#06B6D4' },
  technician:      { label: 'Technicien',        color: '#10B981' },
  secretary:       { label: 'Secrétaire',        color: '#EC4899' },
  marketing_agent: { label: 'Agent Marketing',   color: '#F97316' },
};

export const ROLE_BASE_PERMISSIONS = {
  super_admin: ALL_PERMISSIONS.map(p => p.key),
  manager: [
    'view_users', 'manage_users',
    'view_listings', 'manage_listings',
    'view_transactions',
    'view_blog', 'manage_blog',
    'view_consulting', 'manage_consulting',
    'view_projects', 'manage_projects',
    'view_activity',
  ],
  analyst: [
    'view_users',
    'view_listings',
    'view_transactions',
    'view_blog',
    'view_consulting',
    'view_projects',
    'view_activity',
  ],
  staff: [
    'view_users',
    'view_listings',
    'view_consulting',
    'view_activity',
  ],
  assistant: [
    'view_users',
    'view_listings',
    'view_transactions',
    'view_consulting',
    'view_projects',
    'view_activity',
  ],
  technician: [
    'view_users',
    'view_listings', 'manage_listings',
    'view_transactions',
    'view_activity',
  ],
  secretary: [
    'view_users',
    'view_consulting', 'manage_consulting',
    'view_activity',
  ],
  marketing_agent: [
    'view_listings', 'manage_listings',
    'view_blog', 'manage_blog',
    'view_transactions',
    'view_activity',
  ],
};
