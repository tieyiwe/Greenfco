import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './BlogPost.css';

const POSTS = {
  'interview-elie-dipama-lefaso': {
    title_fr: "L'Agriculture Intelligente au Burkina Faso : Vision et Ambition de GreenFCO",
    title_en: "Smart Agriculture in Burkina Faso: GreenFCO's Vision and Ambition",
    author: 'Wenmanegda Elie DIPAMA',
    date: '2024-03-15',
    category: 'Actualités',
    readTime: '8 min',
    body_fr: `
## Introduction

*Entretien réalisé par Lefaso.net avec Wenmanegda Elie DIPAMA, co-fondateur de Green Field Consortium (GreenFCO) et Expert Agro-Environnemental.*

---

**Lefaso.net : Pouvez-vous vous présenter et nous parler de GreenFCO ?**

Wenmanegda Elie DIPAMA : Je suis agro-économiste, spécialiste en analyse des politiques agricoles et en planification de projets. Avec mon frère jumeau Elisée, nous avons fondé le Green Field Consortium — GreenFCO — le 7 octobre 2021 au Burkina Faso.

GreenFCO est une entreprise agro-environnementale qui a pour vocation d'accompagner les acteurs du secteur agricole et agri-alimentaire dans leur transition vers des pratiques plus durables, innovantes et rentables. Notre slogan résume tout : *"Cultiver un avenir durable, ensemble."*

> "L'agriculture est l'épine dorsale de nos économies. Mais elle doit se transformer pour faire face aux défis climatiques et nourrir une population en croissance."

---

**Lefaso.net : Quelles sont vos principales lignes de services ?**

Nous intervenons sur sept lignes de services complémentaires :

1. **Assistance-Conseil** — Accompagnement à la création et gestion d'entreprises agricoles, notamment via notre future application mobile Koob Assist
2. **Négoce Agricole** — Commerce de produits comme les oignons et pommes de terre
3. **Formations** — Agriculture Durable, Agriculture Intelligente, Agriculture Hors-sol, et Formation de Formateurs (ToT)
4. **Études** — Études environnementales et études de marché
5. **Aménagements Hydro-Agricoles** — Pour une agriculture productive même en période sèche
6. **Intrants Agricoles** — Dont notre bio-fertilisant liquide BioGrowth (en développement)
7. **Développement de Projets** — Accompagnement à la structuration et au financement de projets

---

**Lefaso.net : Vous avez obtenu des fellowships internationaux remarquables. Pouvez-vous nous en parler ?**

En 2023, j'ai eu l'honneur d'être sélectionné comme Mandela Washington Fellow dans le cadre du Young African Leaders Initiative (YALI) de l'Université Purdue aux États-Unis. Ce programme m'a permis de renforcer mes compétences en leadership et de tisser des liens avec d'autres jeunes leaders africains engagés.

En 2025, j'ai reçu le Fellowship Alexander von Humboldt pour la protection internationale du climat. Ce fellowship me permet de mener des recherches au Centre for Rural Development (SLE) de l'Université Humboldt à Berlin, sur les liens entre changement climatique, agriculture et développement rural en Afrique subsaharienne.

> "Ces reconnaissances internationales sont pour moi une responsabilité : celle de ramener les connaissances et les réseaux au service de nos agriculteurs africains."

---

**Lefaso.net : Quelle est votre vision pour l'agriculture burkinabè ?**

Je crois profondément que l'agroécologie et l'agriculture climato-intelligente sont les voies d'avenir pour le Burkina Faso. Face aux changements climatiques — sécheresses, irrégularité des pluies, dégradation des sols — nous devons combiner les savoirs traditionnels africains avec les innovations modernes.

Des espèces comme le Faidherbia albida, qui fixe l'azote et améliore la fertilité des sols tout en offrant de l'ombre au bétail, représentent des solutions basées sur la nature, accessibles aux petits producteurs.

Je pense aussi à la finance carbone : les agriculteurs qui pratiquent l'agroforesterie et les pratiques régénératives peuvent désormais générer des revenus supplémentaires en séquestrant du carbone. GreenFCO travaille à rendre ces opportunités accessibles.

---

**Lefaso.net : Qu'est-ce que le programme de parrainage de plantes que vous développez ?**

C'est une idée innovante qui me tient à cœur. L'idée est de permettre à des personnes — au Burkina Faso, en Europe, partout dans le monde — de parrainer des jeunes plants d'arbres et d'espèces agroforestières.

Le parrain suit la croissance de "son" arbre via une plateforme numérique, reçoit des photos et des mises à jour, et obtient un certificat de parrainage. Au-delà de l'aspect symbolique, c'est une contribution concrète à la reforestation, à la séquestration du carbone et à la résilience des communautés rurales.

---

**Lefaso.net : Un message pour les jeunes agripreneurs burkinabè ?**

L'agriculture n'est pas le dernier recours. C'est un secteur stratégique, innovant, et porteur de solutions pour les défis de demain. Avec les bons outils, la bonne formation et les bons réseaux, vous pouvez construire des entreprises agricoles rentables et durables.

GreenFCO est là pour vous accompagner. Notre plateforme numérique — avec ses outils de gestion de ferme, son assistant IA, son marché numérique et son réseau d'experts — est conçue pour vous, pour nous, pour notre agriculture.

*Cultiver un avenir durable, ensemble.*
    `,
    body_en: `
## Introduction

*Interview by Lefaso.net with Wenmanegda Elie DIPAMA, co-founder of Green Field Consortium (GreenFCO) and Agro-Environmental Expert.*

---

**Lefaso.net: Can you introduce yourself and tell us about GreenFCO?**

Wenmanegda Elie DIPAMA: I am an agroeconomist, specializing in agricultural policy analysis and project planning. With my twin brother Elisée, we founded Green Field Consortium — GreenFCO — on October 7, 2021 in Burkina Faso.

GreenFCO is an agro-environmental enterprise whose mission is to support actors in the agricultural and agri-food sector in their transition to more sustainable, innovative, and profitable practices. Our slogan says it all: *"Cultivating a sustainable future, together."*

> "Agriculture is the backbone of our economies. But it must transform to face climate challenges and feed a growing population."

---

**Lefaso.net: What are your main service lines?**

We operate across seven complementary service lines:

1. **Advisory Services** — Support for creating and managing agricultural businesses, notably through our future mobile app Koob Assist
2. **Agricultural Trading** — Trade in products like onions and potatoes
3. **Training Programs** — Sustainable Agriculture, Smart Agriculture, Soilless Agriculture, and Training of Trainers (ToT)
4. **Studies** — Environmental studies and market research
5. **Hydro-Agricultural Development** — For productive agriculture even in dry periods
6. **Agricultural Inputs** — Including our liquid bio-fertilizer BioGrowth (in development)
7. **Project Development** — Support for project structuring and financing

---

**Lefaso.net: You have received remarkable international fellowships. Can you tell us about them?**

In 2023, I had the honor of being selected as a Mandela Washington Fellow through the Young African Leaders Initiative (YALI) at Purdue University in the United States. This program allowed me to strengthen my leadership skills and build connections with other committed young African leaders.

In 2025, I received the Alexander von Humboldt Fellowship for International Climate Protection. This fellowship allows me to conduct research at the Centre for Rural Development (SLE) at Humboldt University in Berlin, on the links between climate change, agriculture, and rural development in sub-Saharan Africa.

> "These international recognitions carry a responsibility: to bring knowledge and networks back in service of our African farmers."

---

**Lefaso.net: What is your vision for Burkinabe agriculture?**

I deeply believe that agroecology and climate-smart agriculture are the paths forward for Burkina Faso. In the face of climate change — droughts, irregular rainfall, soil degradation — we must combine traditional African knowledge with modern innovations.

Species like Faidherbia albida, which fixes nitrogen and improves soil fertility while providing shade for livestock, represent nature-based solutions accessible to smallholder farmers.

I also think about carbon finance: farmers who practice agroforestry and regenerative practices can now generate additional income by sequestering carbon. GreenFCO is working to make these opportunities accessible.

---

**Lefaso.net: What is the plant sponsorship program you are developing?**

This is an innovative idea close to my heart. The idea is to allow people — in Burkina Faso, in Europe, anywhere in the world — to sponsor young seedlings of trees and agroforestry species.

The sponsor follows the growth of "their" tree via a digital platform, receives photos and updates, and receives a sponsorship certificate. Beyond the symbolic aspect, it is a concrete contribution to reforestation, carbon sequestration, and the resilience of rural communities.

---

**Lefaso.net: A message for young Burkinabe agripreneurs?**

Agriculture is not a last resort. It is a strategic, innovative sector, carrying solutions to tomorrow's challenges. With the right tools, the right training, and the right networks, you can build profitable and sustainable agricultural enterprises.

GreenFCO is here to support you. Our digital platform — with its farm management tools, AI assistant, digital market, and expert network — is designed for you, for us, for our agriculture.

*Cultivating a sustainable future, together.*
    `,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const post = POSTS[slug];

  if (!post) {
    return (
      <main className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>{lang === 'fr' ? 'Article introuvable' : 'Article not found'}</h2>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {lang === 'fr' ? '← Retour au blog' : '← Back to blog'}
          </Link>
        </div>
      </main>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post[`title_${lang}`];

  return (
    <main className="blog-post-page">
      <div className="post-hero">
        <div className="container">
          <Link to="/blog" className="back-link">← Blog</Link>
          <div className="post-meta">
            <span className="badge badge-green">{post.category}</span>
            <span className="post-date">
              {new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
            <span className="post-read-time">⏱ {post.readTime}</span>
          </div>
          <h1>{post[`title_${lang}`]}</h1>
        </div>
      </div>

      <div className="container post-layout">
        <article className="post-content">
          <div className="post-image img-placeholder" style={{ height: '400px', marginBottom: '2.5rem' }}>
            <span>{lang === 'fr' ? 'Photo interview / GreenFCO — 1200×500px' : 'Interview photo / GreenFCO — 1200×500px'}</span>
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post[`body_${lang}`]) }} />
        </article>

        <aside className="post-sidebar">
          <div className="card author-bio-card">
            <div className="author-avatar" style={{ width: '64px', height: '64px', fontSize: '1.5rem', margin: '0 0 1rem' }}>
              {post.author.charAt(0)}
            </div>
            <h4>{post.author}</h4>
            <p>{lang === 'fr' ? 'Co-fondateur & Expert Agro-Environnemental, GreenFCO' : 'Co-founder & Agro-Environmental Expert, GreenFCO'}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
              <span className="badge badge-green">🏅 Mandela Washington Fellow 2023</span>
              <span className="badge badge-green">🔬 Humboldt Fellow 2025</span>
            </div>
            <a href="mailto:info@greenfco.com" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
              {lang === 'fr' ? 'Contacter l\'auteur' : 'Contact author'}
            </a>
          </div>

          <div className="card share-card">
            <h4>{lang === 'fr' ? 'Partager cet article' : 'Share this article'}</h4>
            <div className="share-buttons">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                💬 WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Twitter/X
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function renderMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--gray-light);margin:2rem 0">')
    .replace(/^\d+\. \*\*(.+?)\*\* — (.+)$/gm, '<li><strong>$1</strong> — $2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ol>$&</ol>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<h|<bl|<hr|<ol|<li)(.+)$/gm, (m, p1) => p1.startsWith('<') ? m : `<p>${p1}</p>`)
    .replace(/<p><\/p>/g, '');
}
