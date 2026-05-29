import{j as e,a as P}from"./index-D8gKqgHT.js";import{e as h}from"./vendor-XGveNieF.js";import{u as L}from"./i18n-NlBb8p2r.js";const C=[{value:"maraichage",fr:"Maraîchage",en:"Market Gardening",icon:"🥬"},{value:"cereales",fr:"Céréales",en:"Cereals",icon:"🌾"},{value:"elevage",fr:"Élevage",en:"Livestock",icon:"🐄"},{value:"mixte",fr:"Agri. Mixte",en:"Mixed Farming",icon:"🌱"},{value:"transformation",fr:"Transformation",en:"Agri-Processing",icon:"🏭"}],F=[{value:"low",fr:"< 50 000 FCFA/mois",en:"< 50,000 FCFA/mo"},{value:"medium",fr:"50 000 – 200 000 FCFA/mois",en:"50k–200k FCFA/mo"},{value:"high",fr:"200 000 – 500 000 FCFA/mois",en:"200k–500k FCFA/mo"},{value:"very_high",fr:"> 500 000 FCFA/mois",en:"> 500k FCFA/mo"}],S=[{value:"water",fr:"Accès à l'eau",en:"Water access"},{value:"inputs",fr:"Intrants agricoles",en:"Agricultural inputs"},{value:"financing",fr:"Financement",en:"Financing"},{value:"market",fr:"Débouchés commerciaux",en:"Market access"},{value:"technique",fr:"Techniques agricoles",en:"Farming techniques"},{value:"climate",fr:"Changements climatiques",en:"Climate variability"},{value:"labor",fr:"Main d'œuvre",en:"Labor shortage"}],I=[{value:"income",fr:"Augmenter mes revenus",en:"Increase my income"},{value:"costs",fr:"Réduire mes coûts",en:"Reduce my costs"},{value:"diversify",fr:"Diversifier mon activité",en:"Diversify my business"},{value:"funding",fr:"Obtenir un financement",en:"Secure financing"},{value:"certify",fr:"Me certifier / Me former",en:"Get certified / Trained"}],T=`## 🎯 Actions Immédiates (0-2 semaines)
- Dresser l'inventaire complet de vos ressources actuelles (terres, équipements, semences)
- Identifier 2-3 marchés locaux les plus proches et leurs jours de marché
- Ouvrir un carnet de bord simplifié pour suivre vos dépenses et revenus
- Contacter GreenFCO pour une consultation gratuite initiale
- Vérifier l'état de vos sources d'eau avant la prochaine saison

## 📅 Plan 30 jours
- Établir un calendrier cultural pour les 6 prochains mois
- Calculer vos coûts de production par hectare (avec notre outil Finance)
- Identifier une culture à haute valeur marchande adaptée à votre zone
- Rejoindre au moins un groupement d'agriculteurs local
- Mettre en place un suivi des prix sur votre marché local
- Tester les outils du tableau de bord GreenFCO (météo, cultures, irrigation)
- Explorer les options de crédit agricole disponibles dans votre région

## 📈 Plan 90 jours
- Diversifier avec une culture de contre-saison si l'eau le permet
- Négocier des contrats d'approvisionnement avec des acheteurs locaux
- Soumettre un dossier à un programme de financement agricole
- Suivre une formation GreenFCO en Agriculture Durable

## 💡 Ressources GreenFCO Recommandées
- **Assistance-Conseil** : Accompagnement personnalisé pour votre plan d'affaires
- **Formations** : Agriculture Durable et Agriculture Intelligente pour votre région
- **Marché Numérique** : Publiez vos produits et trouvez des acheteurs directement
- **Intrants BioGrowth** : Bio-fertilisant liquide pour améliorer vos rendements

## ⚠️ Points de vigilance
- Suivez quotidiennement les prévisions météo (module Météo disponible)
- Maintenez un fonds de réserve d'au moins 10% de votre budget pour les imprévus
- Évitez de vous endetter au-delà de votre capacité de remboursement saisonnière`,D=`## 🎯 Immediate Actions (0-2 weeks)
- Take a complete inventory of your current resources (land, equipment, seeds)
- Identify 2-3 nearest local markets and their market days
- Start a simple logbook to track expenses and income
- Contact GreenFCO for a free initial consultation
- Assess the state of your water sources before the next season

## 📅 30-Day Plan
- Build a 6-month crop calendar
- Calculate your production costs per hectare (using the Finance tool)
- Identify a high-value crop suited to your area
- Join at least one local farmer group
- Track prices at your local market weekly
- Explore GreenFCO dashboard tools (weather, crops, irrigation)
- Research available agricultural credit options in your region

## 📈 90-Day Plan
- Diversify with an off-season crop if water allows
- Negotiate supply agreements with local buyers
- Submit an application to an agricultural financing program
- Complete a GreenFCO Sustainable Agriculture training

## 💡 Recommended GreenFCO Resources
- **Advisory Services**: Personalized support for your business plan
- **Training Programs**: Sustainable and Smart Agriculture courses for your region
- **Digital Market**: List your products and find buyers directly
- **BioGrowth Inputs**: Liquid bio-fertilizer to improve your yields

## ⚠️ Key Risks to Monitor
- Track daily weather forecasts (Weather module available)
- Maintain a reserve fund of at least 10% of your budget for emergencies
- Avoid borrowing beyond your seasonal repayment capacity`;function z(){var A;const{i18n:M}=L(),s=(A=M.language)!=null&&A.startsWith("fr")?"fr":"en",[c,u]=h.useState("diagnostic"),[r,m]=h.useState({activity:"",surface:"",budget:"",challenges:[],objective:""}),[d,b]=h.useState(""),[y,j]=h.useState(!1),[N,k]=h.useState({});function $(a){m(n=>({...n,challenges:n.challenges.includes(a)?n.challenges.filter(l=>l!==a):[...n.challenges,a]}))}async function w(a){var f,t,o;if(a.preventDefault(),!r.activity||!r.objective)return;j(!0);const n=((f=C.find(i=>i.value===r.activity))==null?void 0:f[s])||r.activity,l=((t=F.find(i=>i.value===r.budget))==null?void 0:t[s])||"",g=r.challenges.map(i=>{var v;return(v=S.find(O=>O.value===i))==null?void 0:v[s]}).filter(Boolean).join(", "),p=((o=I.find(i=>i.value===r.objective))==null?void 0:o[s])||r.objective,x=s==="fr"?`Activité: ${n}
Surface: ${r.surface||"non précisé"} ha
Budget mensuel: ${l||"non précisé"}
Défis: ${g||"non précisés"}
Objectif: ${p}`:`Activity: ${n}
Area: ${r.surface||"not specified"} ha
Monthly budget: ${l||"not specified"}
Challenges: ${g||"none specified"}
Objective: ${p}`;try{const i=await P.post("/ai/koob-assist",{prompt:x,language:s});b(i.data.plan)}catch{b(s==="fr"?T:D)}finally{j(!1),u("plan"),k({})}}const G=d?d.split(/\n(?=## )/).filter(a=>a.trim()):[];return e.jsxs("div",{className:"koob-assist",children:[e.jsx("div",{className:"module-header",children:e.jsxs("div",{children:[e.jsx("span",{className:"koob-badge",children:"📱 Beta"}),e.jsx("h1",{children:"Koob Assist"}),e.jsx("p",{children:s==="fr"?"Conseiller IA pour entrepreneurs agricoles":"AI Advisor for Agricultural Entrepreneurs"})]})}),e.jsxs("div",{className:"koob-tabs",children:[e.jsxs("button",{className:`koob-tab ${c==="diagnostic"?"active":""}`,onClick:()=>u("diagnostic"),children:["📋 ",s==="fr"?"Diagnostic":"Assessment"]}),e.jsxs("button",{className:`koob-tab ${c==="plan"?"active":""}`,onClick:()=>u("plan"),disabled:!d&&c!=="plan",children:["📈 ",s==="fr"?"Mon Plan":"My Plan",d&&e.jsx("span",{className:"koob-dot"})]})]}),c==="diagnostic"&&e.jsxs("form",{className:"koob-form card",onSubmit:w,children:[e.jsx("h3",{children:s==="fr"?"Votre situation agricole":"Your Farming Situation"}),e.jsx("p",{className:"koob-intro",children:s==="fr"?"Répondez à 5 questions pour recevoir un plan d'action personnalisé généré par IA.":"Answer 5 questions to receive an AI-generated personalized action plan."}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:s==="fr"?"1. Type d'activité principale *":"1. Main activity type *"}),e.jsx("div",{className:"activity-grid",children:C.map(a=>e.jsxs("button",{type:"button",className:`activity-btn ${r.activity===a.value?"selected":""}`,onClick:()=>m(n=>({...n,activity:a.value})),children:[e.jsx("span",{className:"activity-icon",children:a.icon}),e.jsx("span",{children:s==="fr"?a.fr:a.en})]},a.value))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:s==="fr"?"2. Surface exploitée (ha)":"2. Farmed area (hectares)"}),e.jsx("input",{type:"number",className:"form-input",placeholder:s==="fr"?"Ex : 2.5":"E.g. 2.5",value:r.surface,onChange:a=>m(n=>({...n,surface:a.target.value})),min:"0",step:"0.1"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:s==="fr"?"3. Budget mensuel disponible":"3. Available monthly budget"}),e.jsx("div",{className:"budget-options",children:F.map(a=>e.jsxs("label",{className:`budget-option ${r.budget===a.value?"selected":""}`,children:[e.jsx("input",{type:"radio",name:"budget",value:a.value,checked:r.budget===a.value,onChange:()=>m(n=>({...n,budget:a.value}))}),s==="fr"?a.fr:a.en]},a.value))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:s==="fr"?"4. Principaux défis (plusieurs choix)":"4. Main challenges (multiple)"}),e.jsx("div",{className:"chips-grid",children:S.map(a=>e.jsxs("label",{className:`chip ${r.challenges.includes(a.value)?"selected":""}`,children:[e.jsx("input",{type:"checkbox",checked:r.challenges.includes(a.value),onChange:()=>$(a.value)}),s==="fr"?a.fr:a.en]},a.value))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:s==="fr"?"5. Objectif principal *":"5. Main objective *"}),e.jsxs("select",{className:"form-select",value:r.objective,onChange:a=>m(n=>({...n,objective:a.target.value})),required:!0,children:[e.jsx("option",{value:"",children:s==="fr"?"— Sélectionner —":"— Select —"}),I.map(a=>e.jsx("option",{value:a.value,children:s==="fr"?a.fr:a.en},a.value))]})]}),e.jsx("button",{type:"submit",className:"btn btn-primary koob-generate",disabled:y||!r.activity||!r.objective,children:y?e.jsxs("span",{className:"koob-loading-text",children:[e.jsx("span",{className:"koob-spinner",children:"🌿"}),s==="fr"?"Analyse en cours…":"Analyzing…"]}):`✨ ${s==="fr"?"Générer mon plan d'action IA":"Generate my AI action plan"}`})]}),c==="plan"&&d&&e.jsxs("div",{className:"koob-plan",children:[e.jsxs("div",{className:"koob-plan-meta card",children:[e.jsxs("span",{className:"koob-plan-badge",children:["✨ ",s==="fr"?"Plan généré par IA":"AI-generated plan"]}),e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>u("diagnostic"),children:s==="fr"?"↩ Modifier":"↩ Edit"})]}),G.map((a,n)=>{var f;const l=a.split(`
`).filter(Boolean),g=(f=l[0])==null?void 0:f.replace("## ",""),p=l.slice(1).filter(t=>t.startsWith("- ")||t.startsWith("• ")),x=l.slice(1).filter(t=>!t.startsWith("- ")&&!t.startsWith("• ")&&t.trim());return e.jsxs("div",{className:"plan-card card",children:[e.jsx("h3",{className:"plan-title",children:g}),p.length>0&&e.jsx("ul",{className:"plan-list",children:p.map((t,o)=>{const i=`${n}-${o}`;return e.jsxs("li",{className:`plan-item ${N[i]?"done":""}`,onClick:()=>k(v=>({...v,[i]:!v[i]})),children:[e.jsx("span",{className:"plan-check",children:N[i]?"✅":"⬜"}),e.jsx("span",{children:t.replace(/^[-•]\s+/,"").replace(/\*\*(.*?)\*\*/g,"$1")})]},o)})}),x.map((t,o)=>e.jsx("p",{className:"plan-para",children:t.replace(/\*\*(.*?)\*\*/g,"$1")},o))]},n)}),e.jsxs("div",{className:"koob-cta",children:[e.jsxs("a",{href:"https://wa.me/22600000000",target:"_blank",rel:"noreferrer",className:"btn btn-whatsapp",children:["💬 ",s==="fr"?"Parler à un expert GreenFCO":"Talk to a GreenFCO expert"]}),e.jsx("button",{className:"btn btn-secondary",onClick:()=>{u("diagnostic"),b("")},children:s==="fr"?"🔄 Nouveau diagnostic":"🔄 New assessment"})]})]}),c==="plan"&&!d&&e.jsxs("div",{className:"koob-empty card",children:[e.jsxs("p",{children:["📋 ",s==="fr"?"Complétez d'abord le diagnostic.":"Complete the assessment first."]}),e.jsx("button",{className:"btn btn-primary",onClick:()=>u("diagnostic"),children:s==="fr"?"Commencer":"Start"})]})]})}export{z as default};
