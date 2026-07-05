const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminLayout-C-UWFfbZ.js","assets/vendor-hyKWh86c.js","assets/adminPermissions-BpFOmu71.js","assets/AdminLayout-pgB0QKFz.css","assets/AdminDashboard-D1syEoN8.js","assets/AdminUsers-DzAAdsdn.js","assets/AdminListings-DZVab4q6.js","assets/AdminBlog-Bjd_qs6h.js","assets/AdminConsulting-BY59QxaT.js","assets/DashboardLayout-0O4LiEn5.js","assets/i18n-CaT5xHvk.js","assets/DashboardLayout-BpKe-wRa.css","assets/DashboardHome-B1QIQAeD.js","assets/DashboardHome-BLD588yz.css","assets/CropManager-DbJF04MX.js","assets/CropManager-BD-LpmFo.css","assets/IrrigationManager-DI5P_SJd.js","assets/IrrigationManager-CZCXtdu3.css","assets/FinanceManager-CU45JyGg.js","assets/charts-DdzZAI62.js","assets/FinanceManager-CTGCeKBU.css","assets/WeatherHub-QLNfJU_p.js","assets/WeatherHub-BCakf7cf.css","assets/SpeciesLibrary-atL8VbK0.js","assets/SpeciesLibrary-NnjfWp4_.css","assets/GreenBot-B8-UeTMK.js","assets/GreenBot-D75McUtq.css","assets/SoilAdvisor-BS8a70va.js","assets/SoilAdvisor-B1clJ25z.css","assets/KoobAssist-DwxQZKRy.js","assets/KoobAssist-CjSwZy0D.css","assets/MarketPage-CmvYBll2.js","assets/MarketPage-DpFR5JJb.css","assets/SellerProfilePage-BmKNdUgd.js","assets/SellerProfilePage-DPItoylU.css","assets/BuyerProfilePage-nu5M7cot.js","assets/BuyerProfilePage-Cf8EZ_59.css","assets/NetworkPage-CbXt2YNK.js","assets/NetworkPage-CrcCg5Ce.css","assets/VerifyTransaction-BD0HF4eb.js","assets/VerifyTransaction-DfdVffKM.css","assets/AdminTransactions-8i5QPySX.js","assets/AdminSettings-DVQUvBcU.js","assets/AdminProjects-ZfywTB01.js","assets/AdminActivity-DINJIIOp.js","assets/AdminTeamChat-UUjbVMGY.js","assets/AdminLogin-BzK-s_nM.js"])))=>i.map(i=>d[i]);
import{R as fe,r as b,j as e,u as _t,L as S,N as Je,h as Ft,f as Kr,B as kt,c as Et,b as C,a as Le,d as Ot}from"./vendor-hyKWh86c.js";import{a as qt,B as Rt,i as Lt,u as D}from"./i18n-CaT5xHvk.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}})();const Pt="modulepreload",Tt=function(r){return"/"+r},jr={},F=function(t,s,n){let a=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));a=Promise.allSettled(s.map(u=>{if(u=Tt(u),u in jr)return;jr[u]=!0;const d=u.endsWith(".css"),c=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${c}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Pt,d||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((x,f)=>{p.addEventListener("load",x),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return a.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Dt={home:"Accueil",services:"Services",about:"À Propos",blog:"Blog",gallery:"Galerie",contact:"Contact",login:"Se connecter",register:"S'inscrire",dashboard:"Tableau de bord",market:"Marché",marketplace:"Marketplace",agropro:"AgroPro",network:"Réseau",profile:"Mon Profil",logout:"Déconnexion"},It={slogan:"Cultiver un avenir durable, ensemble.",subtitle:"Plateforme agro-environnementale pour l'Afrique francophone — outils intelligents, expertise locale, impact réel.",cta_primary:"Découvrir nos services",cta_secondary:"Accéder à la plateforme"},Bt={founded:"Fondé en 2021",fellows:"2 Fellows Internationaux",services:"7 Lignes de Services",presence:"Présence Afrique & Europe"},Mt={title:"Nos Services",subtitle:"7 lignes de services intégrés pour accompagner votre projet agricole et agri-alimentaire.",conseil:{title:"Assistance-Conseil",desc:"Accompagnement à la création et à la gestion d'entreprises agricoles et agri-alimentaires.",cta:"En savoir plus"},negoce:{title:"Négoce Agricole",desc:"Commerce de produits agricoles et agri-alimentaires : oignons, pommes de terre et autres.",cta:"En savoir plus"},formations:{title:"Formations",desc:"Agriculture Durable, Agriculture Intelligente, Agriculture Hors-sol — formations certifiantes.",cta:"En savoir plus"},etudes:{title:"Études",desc:"Études environnementales et études de marché pour vos projets agricoles.",cta:"En savoir plus"},hydro:{title:"Aménagements Hydro-Agricoles",desc:"Conception et réalisation d'aménagements hydro-agricoles durables.",cta:"En savoir plus"},intrants:{title:"Intrants Agricoles",desc:"Vente d'intrants agricoles de qualité, dont BioGrowth — notre bio-fertilisant liquide.",cta:"En savoir plus"},projets:{title:"Développement de Projets",desc:"Développement de projets et études de marché pour agripreneurs et institutions.",cta:"En savoir plus"}},zt={title:"Qui Nous Sommes",subtitle:"GreenFCO est une entreprise agro-environnementale fondée au Burkina Faso par deux frères passionnés d'agriculture durable et d'impact.",mission:"Notre Mission",vision:"Notre Vision",values:"Nos Valeurs",mission_text:"Accompagner les acteurs agricoles de l'Afrique francophone dans la transition vers des pratiques durables, innovantes et rentables.",vision_text:"Un secteur agricole africain résilient, inclusif et compétitif, ancré dans les pratiques agroécologiques.",values_durability:"Durabilité",values_innovation:"Innovation",values_impact:"Impact",founders:"Nos Co-fondateurs",timeline_title:"Notre Parcours"},Gt={title:"Blog & Actualités",subtitle:"Articles, recherches et nouvelles du monde agro-environnemental.",read_more:"Lire la suite",categories:{all:"Tous",news:"Actualités",research:"Recherche & Innovation",agriculture:"Agriculture Durable",environment:"Environnement"},newsletter_cta:"Restez informé",newsletter_text:"Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles et conseils agricoles."},Ut={title:"Contactez-Nous",subtitle:"Notre équipe est disponible pour répondre à vos questions et vous accompagner dans vos projets.",form_name:"Nom complet",form_email:"Adresse e-mail",form_subject:"Sujet",form_message:"Message",form_country:"Pays",form_submit:"Envoyer le message",whatsapp:"Contactez-nous sur WhatsApp",email:"Écrire un e-mail",success:"Votre message a été envoyé avec succès !",error:"Une erreur est survenue. Veuillez réessayer."},Wt={login_title:"Se connecter",register_title:"Créer un compte",email:"Adresse e-mail",password:"Mot de passe",confirm_password:"Confirmer le mot de passe",name:"Nom complet",country:"Pays",user_type:"Type de compte",farmer:"Agriculteur / Agripreneur",expert:"Expert / Consultant",investor:"Investisseur",organization:"Organisation / Institution",login_btn:"Se connecter",register_btn:"Créer mon compte",forgot_password:"Mot de passe oublié ?",no_account:"Pas encore de compte ?",have_account:"Déjà un compte ?",language_pref:"Langue préférée"},$t={welcome:"Bienvenue",crops:"Mes Cultures",irrigation:"Irrigation",finance:"Finances",map:"Cartographie",weather:"Météo",species:"Espèces",market:"Marché",business_plan:"Business Plan",ai_advisor:"Conseiller IA",greenbot:"GreenBot",my_farms:"Mes Fermes",add_farm:"Ajouter une ferme"},Ht={title:"Météo Agricole",subtitle:"Prévisions et alertes adaptées à votre exploitation",detect_location:"Détecter ma position",manual_city:"Entrer une ville",forecast_7days:"Prévisions 7 jours",rainfall_30days:"Pluies — 30 derniers jours",alerts:"Alertes Météo",recommendation:"Conseils du jour",temp_max:"Max",temp_min:"Min",rain:"Pluies",wind:"Vent",humidity:"Humidité"},Vt={title:"Marché Numérique",subtitle:"Achetez, vendez et échangez des produits agricoles",post_listing:"Publier une annonce",browse:"Parcourir les annonces",filters:"Filtres",crop:"Culture",quantity:"Quantité (kg)",price:"Prix",location:"Localisation",contact_whatsapp:"Contacter sur WhatsApp",my_listings:"Mes annonces"},Jt={title:"Réseau Agro-Environnemental",subtitle:"Connectez-vous avec des experts, agriculteurs et organisations",forums:"Forums",experts:"Experts",events:"Événements",knowledge:"Ressources",sponsorship:"Parrainage Plantes",investors:"Hub Investisseurs",impact:"Impact"},Kt={slogan:"Cultiver un avenir durable, ensemble.",rights:"Tous droits réservés",founded:"Fondé en 2021 au Burkina Faso"},Yt={loading:"Chargement...",error:"Une erreur est survenue",save:"Enregistrer",cancel:"Annuler",delete:"Supprimer",edit:"Modifier",add:"Ajouter",close:"Fermer",back:"Retour",next:"Suivant",previous:"Précédent",search:"Rechercher",filter:"Filtrer",export:"Exporter",download:"Télécharger",view_all:"Voir tout",learn_more:"En savoir plus",coming_soon:"Bientôt disponible",in_development:"En développement"},Xt={nav:Dt,hero:It,stats:Bt,services:Mt,about:zt,blog:Gt,contact:Ut,auth:Wt,dashboard:$t,weather:Ht,market:Vt,network:Jt,footer:Kt,common:Yt},Qt={home:"Home",services:"Services",about:"About",blog:"Blog",gallery:"Gallery",contact:"Contact",login:"Sign In",register:"Register",dashboard:"Dashboard",market:"Market",marketplace:"Marketplace",agropro:"AgroPro",network:"Network",profile:"My Profile",logout:"Sign Out"},Zt={slogan:"Cultivating a sustainable future, together.",subtitle:"Agro-environmental platform for Francophone Africa — smart tools, local expertise, real impact.",cta_primary:"Explore our services",cta_secondary:"Access the platform"},es={founded:"Founded in 2021",fellows:"2 International Fellows",services:"7 Service Lines",presence:"Africa & Europe Presence"},rs={title:"Our Services",subtitle:"7 integrated service lines to support your agricultural and agri-food project.",conseil:{title:"Advisory Services",desc:"Business creation and management consulting for agricultural and agri-food enterprises.",cta:"Learn more"},negoce:{title:"Agricultural Trading",desc:"Trading of agricultural and agri-food products: onions, potatoes, and more.",cta:"Learn more"},formations:{title:"Training Programs",desc:"Sustainable Agriculture, Smart Agriculture, Soilless Agriculture — certified training.",cta:"Learn more"},etudes:{title:"Studies & Research",desc:"Environmental studies and market research for your agricultural projects.",cta:"Learn more"},hydro:{title:"Hydro-Agricultural Development",desc:"Design and implementation of sustainable hydro-agricultural projects.",cta:"Learn more"},intrants:{title:"Agricultural Inputs",desc:"Quality agricultural inputs, including BioGrowth — our liquid bio-fertilizer.",cta:"Learn more"},projets:{title:"Project Development",desc:"Project development and market studies for agripreneurs and institutions.",cta:"Learn more"}},ts={title:"Who We Are",subtitle:"GreenFCO is an agro-environmental enterprise founded in Burkina Faso by two brothers passionate about sustainable agriculture and impact.",mission:"Our Mission",vision:"Our Vision",values:"Our Values",mission_text:"Accompany agricultural actors in Francophone Africa in their transition to sustainable, innovative, and profitable practices.",vision_text:"A resilient, inclusive, and competitive African agricultural sector, grounded in agroecological practices.",values_durability:"Sustainability",values_innovation:"Innovation",values_impact:"Impact",founders:"Our Co-founders",timeline_title:"Our Journey"},ss={title:"Blog & News",subtitle:"Articles, research, and news from the agro-environmental world.",read_more:"Read more",categories:{all:"All",news:"News",research:"Research & Innovation",agriculture:"Sustainable Agriculture",environment:"Environment"},newsletter_cta:"Stay Informed",newsletter_text:"Subscribe to our newsletter to receive the latest agricultural news and tips."},ns={title:"Contact Us",subtitle:"Our team is available to answer your questions and support your projects.",form_name:"Full name",form_email:"Email address",form_subject:"Subject",form_message:"Message",form_country:"Country",form_submit:"Send message",whatsapp:"Contact us on WhatsApp",email:"Send an email",success:"Your message was sent successfully!",error:"An error occurred. Please try again."},as={login_title:"Sign In",register_title:"Create Account",email:"Email address",password:"Password",confirm_password:"Confirm password",name:"Full name",country:"Country",user_type:"Account type",farmer:"Farmer / Agripreneur",expert:"Expert / Consultant",investor:"Investor",organization:"Organization / Institution",login_btn:"Sign In",register_btn:"Create my account",forgot_password:"Forgot password?",no_account:"Don't have an account?",have_account:"Already have an account?",language_pref:"Preferred language"},is={welcome:"Welcome",crops:"My Crops",irrigation:"Irrigation",finance:"Finance",map:"Farm Map",weather:"Weather",species:"Species",market:"Market",business_plan:"Business Plan",ai_advisor:"AI Advisor",greenbot:"GreenBot",my_farms:"My Farms",add_farm:"Add Farm"},os={title:"Agricultural Weather",subtitle:"Forecasts and alerts adapted to your farm",detect_location:"Detect my location",manual_city:"Enter a city",forecast_7days:"7-day forecast",rainfall_30days:"Rainfall — last 30 days",alerts:"Weather Alerts",recommendation:"Today's Advice",temp_max:"Max",temp_min:"Min",rain:"Rain",wind:"Wind",humidity:"Humidity"},ls={title:"Digital Market",subtitle:"Buy, sell, and trade agricultural products",post_listing:"Post a listing",browse:"Browse listings",filters:"Filters",crop:"Crop",quantity:"Quantity (kg)",price:"Price",location:"Location",contact_whatsapp:"Contact on WhatsApp",my_listings:"My listings"},cs={title:"Agro-Environmental Network",subtitle:"Connect with experts, farmers, and organizations",forums:"Forums",experts:"Experts",events:"Events",knowledge:"Resources",sponsorship:"Plant Sponsorship",investors:"Investor Hub",impact:"Impact"},us={slogan:"Cultivating a sustainable future, together.",rights:"All rights reserved",founded:"Founded in 2021 in Burkina Faso"},ds={loading:"Loading...",error:"An error occurred",save:"Save",cancel:"Cancel",delete:"Delete",edit:"Edit",add:"Add",close:"Close",back:"Back",next:"Next",previous:"Previous",search:"Search",filter:"Filter",export:"Export",download:"Download",view_all:"View all",learn_more:"Learn more",coming_soon:"Coming soon",in_development:"In development"},ms={nav:Qt,hero:Zt,stats:es,services:rs,about:ts,blog:ss,contact:ns,auth:as,dashboard:is,weather:os,market:ls,network:cs,footer:us,common:ds};qt.use(Rt).use(Lt).init({resources:{fr:{translation:Xt},en:{translation:ms}},fallbackLng:"fr",defaultNS:"translation",detection:{order:["localStorage","navigator"],caches:["localStorage"],lookupLocalStorage:"greenfco_lang"},interpolation:{escapeValue:!1}});const Ar=r=>{let t;const s=new Set,n=(d,c)=>{const p=typeof d=="function"?d(t):d;if(!Object.is(p,t)){const x=t;t=c??(typeof p!="object"||p===null)?p:Object.assign({},t,p),s.forEach(f=>f(t,x))}},a=()=>t,l={setState:n,getState:a,getInitialState:()=>u,subscribe:d=>(s.add(d),()=>s.delete(d))},u=t=r(n,a,l);return l},ps=r=>r?Ar(r):Ar,hs=r=>r;function fs(r,t=hs){const s=fe.useSyncExternalStore(r.subscribe,fe.useCallback(()=>t(r.getState()),[r,t]),fe.useCallback(()=>t(r.getInitialState()),[r,t]));return fe.useDebugValue(s),s}const wr=r=>{const t=ps(r),s=n=>fs(t,n);return Object.assign(s,t),s},gs=r=>r?wr(r):wr;function bs(r,t){let s;try{s=r()}catch{return}return{getItem:a=>{var i;const o=u=>u===null?null:JSON.parse(u,void 0),l=(i=s.getItem(a))!=null?i:null;return l instanceof Promise?l.then(o):o(l)},setItem:(a,i)=>s.setItem(a,JSON.stringify(i,void 0)),removeItem:a=>s.removeItem(a)}}const rr=r=>t=>{try{const s=r(t);return s instanceof Promise?s:{then(n){return rr(n)(s)},catch(n){return this}}}catch(s){return{then(n){return this},catch(n){return rr(n)(s)}}}},vs=(r,t)=>(s,n,a)=>{let i={storage:bs(()=>window.localStorage),partialize:g=>g,version:0,merge:(g,j)=>({...j,...g}),...t},o=!1,l=0;const u=new Set,d=new Set;let c=i.storage;if(!c)return r((...g)=>{console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`),s(...g)},n,a);const p=()=>{const g=i.partialize({...n()});return c.setItem(i.name,{state:g,version:i.version})},x=a.setState;a.setState=(g,j)=>(x(g,j),p());const f=r((...g)=>(s(...g),p()),n,a);a.getInitialState=()=>f;let A;const v=()=>{var g,j;if(!c)return;const N=++l;o=!1,u.forEach(y=>{var _;return y((_=n())!=null?_:f)});const h=((j=i.onRehydrateStorage)==null?void 0:j.call(i,(g=n())!=null?g:f))||void 0;return rr(c.getItem.bind(c))(i.name).then(y=>{if(y)if(typeof y.version=="number"&&y.version!==i.version){if(i.migrate){const _=i.migrate(y.state,y.version);return _ instanceof Promise?_.then(E=>[!0,E]):[!0,_]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,y.state];return[!1,void 0]}).then(y=>{var _;if(N!==l)return;const[E,Z]=y;if(A=i.merge(Z,(_=n())!=null?_:f),s(A,!0),E)return p()}).then(()=>{N===l&&(h==null||h(n(),void 0),A=n(),o=!0,d.forEach(y=>y(A)))}).catch(y=>{N===l&&(h==null||h(void 0,y))})};return a.persist={setOptions:g=>{i={...i,...g},g.storage&&(c=g.storage)},clearStorage:()=>{c==null||c.removeItem(i.name)},getOptions:()=>i,rehydrate:()=>v(),hasHydrated:()=>o,onHydrate:g=>(u.add(g),()=>{u.delete(g)}),onFinishHydration:g=>(d.add(g),()=>{d.delete(g)})},i.skipHydration||v(),A||f},xs=vs,ue=gs(xs(r=>({user:null,token:null,isAuthenticated:!1,setAuth:(t,s)=>r({user:t,token:s,isAuthenticated:!0}),logout:()=>r({user:null,token:null,isAuthenticated:!1}),updateUser:t=>r(s=>({user:{...s.user,...t}}))}),{name:"greenfco_auth",partialize:r=>({user:r.user,token:r.token,isAuthenticated:r.isAuthenticated})}));class ys extends b.Component{constructor(t){super(t),this.state={hasError:!1,error:null}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,s){console.error("[ErrorBoundary]",t,s.componentStack)}render(){return this.state.hasError?e.jsxs("div",{style:{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"1rem",padding:"2rem",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"3rem"},children:"🌿"}),e.jsx("h2",{style:{color:"#1B4332"},children:"Une erreur est survenue / An error occurred"}),e.jsx("p",{style:{color:"#6B7280",maxWidth:"400px"},children:this.props.fallbackMessage||"Quelque chose s'est mal passé. Veuillez actualiser la page. / Something went wrong. Please refresh the page."}),e.jsx("button",{onClick:()=>{this.setState({hasError:!1,error:null}),window.location.reload()},style:{background:"#1B4332",color:"white",border:"none",padding:"0.75rem 1.5rem",borderRadius:"8px",cursor:"pointer",fontSize:"1rem"},children:"🔄 Actualiser / Refresh"}),!1]}):this.props.children}}function js(){var n;const{i18n:r}=D(),t=(n=r.language)!=null&&n.startsWith("fr")?"fr":"en";function s(){const a=t==="fr"?"en":"fr";r.changeLanguage(a),localStorage.setItem("greenfco_lang",a)}return e.jsxs("button",{className:"lang-toggle",onClick:s,title:"Toggle language",children:[e.jsx("span",{className:t==="fr"?"active":"",children:"FR"}),e.jsx("span",{className:"separator",children:"|"}),e.jsx("span",{className:t==="en"?"active":"",children:"EN"})]})}function As(){var g,j,N;const{t:r,i18n:t}=D(),s=(g=t.language)!=null&&g.startsWith("fr")?"fr":"en",n=_t(),{isAuthenticated:a,user:i,logout:o}=ue(),[l,u]=b.useState(!1),[d,c]=b.useState(!1),p=n.pathname.startsWith("/dashboard")||n.pathname.startsWith("/network")||n.pathname.startsWith("/market"),x=[{to:"/",icon:"🏠",label:r("nav.home"),exact:!0},{to:"/services",icon:"🌿",label:r("nav.services")},{to:"/consulting",icon:"🤝",label:s==="fr"?"Consultation":"Consulting"},{to:"/about",icon:"👥",label:r("nav.about")},{to:"/blog",icon:"📰",label:r("nav.blog")},{to:"/gallery",icon:"📷",label:r("nav.gallery")},{to:"/contact",icon:"✉️",label:r("nav.contact")},{to:"/marketplace",icon:"🛒",label:r("nav.marketplace"),highlight:!0},{to:"/agropro",icon:"📊",label:r("nav.agropro"),highlight:!0}],f=[{to:"/dashboard",icon:"📊",label:r("nav.dashboard"),exact:!0},{to:"/marketplace",icon:"🛒",label:r("nav.marketplace"),highlight:!0},{to:"/agropro",icon:"📊",label:r("nav.agropro"),highlight:!0},{to:"/network",icon:"🌍",label:r("nav.network")},{to:"/blog",icon:"📰",label:r("nav.blog")}],A=a?f:x;function v(){o(),c(!1),u(!1)}return e.jsxs(e.Fragment,{children:[e.jsx("header",{className:`navbar ${p?"navbar-dashboard":""}`,children:e.jsxs("div",{className:"navbar-container",children:[e.jsxs(S,{to:"/",className:"navbar-logo",onClick:()=>u(!1),children:[e.jsx("span",{className:"logo-icon",children:"🌿"}),e.jsxs("span",{className:"logo-text",children:[e.jsx("span",{className:"logo-green",children:"Green"}),"FCO"]})]}),e.jsx("nav",{className:"navbar-links",children:A.map(h=>h.highlight?e.jsxs(Je,{to:h.to,className:({isActive:y})=>`nav-link nav-market-btn ${y?"active":""}`,children:[h.icon," ",h.label]},h.to):e.jsx(Je,{to:h.to,end:h.exact,className:({isActive:y})=>`nav-link ${y?"active":""}`,children:h.label},h.to))}),e.jsx(S,{to:"/admin",style:{fontSize:"0.75rem",color:"var(--gray-mid)",marginRight:"0.5rem",textDecoration:"none",letterSpacing:"0.02em",opacity:.7},children:"Admin"}),e.jsxs("div",{className:"navbar-actions",children:[e.jsx(js,{}),a?e.jsxs("div",{className:"profile-menu",children:[e.jsxs("button",{className:"profile-trigger",onClick:()=>c(!d),children:[e.jsx("span",{className:"profile-avatar",children:((j=i==null?void 0:i.name)==null?void 0:j.charAt(0).toUpperCase())||"U"}),e.jsx("span",{className:"profile-name desktop-only",children:(N=i==null?void 0:i.name)==null?void 0:N.split(" ")[0]}),e.jsx("span",{className:"profile-chevron desktop-only",children:d?"▲":"▼"})]}),d&&e.jsxs("div",{className:"profile-dropdown",children:[e.jsx(S,{to:"/profile",onClick:()=>c(!1),children:r("nav.profile")}),e.jsx("button",{onClick:v,children:r("nav.logout")})]})]}):e.jsxs("div",{className:"auth-buttons",children:[e.jsx(S,{to:"/login",className:"btn btn-secondary btn-sm",children:r("nav.login")}),e.jsx(S,{to:"/register",className:"btn btn-primary btn-sm mobile-only",children:r("nav.register")})]})]}),e.jsxs("button",{className:`hamburger ${l?"open":""}`,onClick:()=>u(!l),"aria-label":"Menu","aria-expanded":l,children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})]})}),l&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mobile-overlay",onClick:()=>u(!1)}),e.jsxs("nav",{className:"mobile-sheet",role:"navigation",children:[e.jsx("div",{className:"sheet-handle"}),e.jsxs("div",{className:"sheet-header",children:[e.jsxs("span",{className:"sheet-logo",children:["🌿 ",e.jsx("strong",{children:"GreenFCO"})]}),e.jsx("button",{className:"sheet-close",onClick:()=>u(!1),children:"✕"})]}),e.jsx("div",{className:"sheet-links",children:A.map(h=>e.jsxs(Je,{to:h.to,end:h.exact,className:({isActive:y})=>`sheet-link ${y?"sheet-link-active":""}`,onClick:()=>u(!1),children:[e.jsx("span",{className:"sheet-link-icon",children:h.icon}),e.jsx("span",{children:h.label})]},h.to))}),!a&&e.jsxs("div",{className:"sheet-auth",children:[e.jsx(S,{to:"/register",className:"btn btn-primary",style:{width:"100%",justifyContent:"center"},onClick:()=>u(!1),children:s==="fr"?"Créer un compte gratuit":"Create free account"}),e.jsx(S,{to:"/login",className:"btn btn-secondary",style:{width:"100%",justifyContent:"center"},onClick:()=>u(!1),children:r("nav.login")})]}),a&&e.jsx("div",{className:"sheet-auth",children:e.jsx("button",{onClick:v,className:"btn btn-secondary",style:{width:"100%",justifyContent:"center",color:"#c00",borderColor:"#c00"},children:r("nav.logout")})})]})]})]})}function ws(){const{t:r}=D(),t=new Date().getFullYear();return e.jsxs("footer",{className:"footer",children:[e.jsx("div",{className:"footer-grain"}),e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-top",children:[e.jsxs("div",{className:"footer-brand",children:[e.jsxs(S,{to:"/",className:"footer-logo",children:[e.jsx("span",{children:"🌿"}),e.jsxs("span",{children:[e.jsx("span",{style:{color:"var(--green-light)"},children:"Green"}),"FCO"]})]}),e.jsxs("p",{className:"footer-slogan",children:['"',r("footer.slogan"),'"']}),e.jsx("p",{className:"footer-founded",children:r("footer.founded")}),e.jsxs("div",{className:"footer-social",children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noreferrer","aria-label":"Facebook",children:e.jsx(Ns,{})}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noreferrer","aria-label":"Twitter",children:e.jsx(Cs,{})}),e.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noreferrer","aria-label":"LinkedIn",children:e.jsx(Ss,{})}),e.jsx("a",{href:"https://wa.me/22600000000",target:"_blank",rel:"noreferrer","aria-label":"WhatsApp",children:e.jsx(_s,{})})]})]}),e.jsxs("div",{className:"footer-nav",children:[e.jsxs("div",{className:"footer-col",children:[e.jsx("h4",{children:"Navigation"}),e.jsx(S,{to:"/",children:r("nav.home")}),e.jsx(S,{to:"/about",children:r("nav.about")}),e.jsx(S,{to:"/services",children:r("nav.services")}),e.jsx(S,{to:"/blog",children:r("nav.blog")}),e.jsx(S,{to:"/gallery",children:r("nav.gallery")}),e.jsx(S,{to:"/contact",children:r("nav.contact")})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h4",{children:"Plateforme"}),e.jsx(S,{to:"/dashboard",children:r("nav.dashboard")}),e.jsx(S,{to:"/marketplace",children:r("nav.marketplace")}),e.jsx(S,{to:"/agropro",children:r("nav.agropro")}),e.jsx(S,{to:"/network",children:r("nav.network")}),e.jsx(S,{to:"/register",children:r("nav.register")})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h4",{children:"Contact"}),e.jsx("a",{href:"mailto:info@greenfco.com",children:"info@greenfco.com"}),e.jsx("a",{href:"https://wa.me/22600000000",target:"_blank",rel:"noreferrer",children:"WhatsApp"}),e.jsx("span",{children:"Ouagadougou, Burkina Faso"})]})]})]}),e.jsxs("div",{className:"footer-bottom",children:[e.jsxs("p",{children:["© ",t," Green Field Consortium (GreenFCO). ",r("footer.rights"),"."]}),e.jsxs("div",{className:"footer-badges",children:[e.jsx("span",{className:"badge badge-green",children:"🏅 YALI Fellow 2023"}),e.jsx("span",{className:"badge badge-green",children:"🏅 Humboldt Fellow 2025"})]})]})]})]})}function Ns(){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:e.jsx("path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"})})}function Cs(){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:e.jsx("path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"})})}function Ss(){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:[e.jsx("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"}),e.jsx("circle",{cx:"4",cy:"4",r:"2"})]})}function _s(){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"18",height:"18",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"})})}function Yr(r,t){return function(){return r.apply(t,arguments)}}const{toString:Fs}=Object.prototype,{getPrototypeOf:De}=Object,{iterator:Ie,toStringTag:Xr}=Symbol,Be=(r=>t=>{const s=Fs.call(t);return r[s]||(r[s]=s.slice(8,-1).toLowerCase())})(Object.create(null)),M=r=>(r=r.toLowerCase(),t=>Be(t)===r),Me=r=>t=>typeof t===r,{isArray:de}=Array,ce=Me("undefined");function ge(r){return r!==null&&!ce(r)&&r.constructor!==null&&!ce(r.constructor)&&T(r.constructor.isBuffer)&&r.constructor.isBuffer(r)}const Qr=M("ArrayBuffer");function ks(r){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(r):t=r&&r.buffer&&Qr(r.buffer),t}const Es=Me("string"),T=Me("function"),Zr=Me("number"),be=r=>r!==null&&typeof r=="object",Os=r=>r===!0||r===!1,Ee=r=>{if(Be(r)!=="object")return!1;const t=De(r);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Xr in r)&&!(Ie in r)},qs=r=>{if(!be(r)||ge(r))return!1;try{return Object.keys(r).length===0&&Object.getPrototypeOf(r)===Object.prototype}catch{return!1}},Rs=M("Date"),Ls=M("File"),Ps=r=>!!(r&&typeof r.uri<"u"),Ts=r=>r&&typeof r.getParts<"u",Ds=M("Blob"),Is=M("FileList"),Bs=r=>be(r)&&T(r.pipe);function Ms(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Nr=Ms(),Cr=typeof Nr.FormData<"u"?Nr.FormData:void 0,zs=r=>{if(!r)return!1;if(Cr&&r instanceof Cr)return!0;const t=De(r);if(!t||t===Object.prototype||!T(r.append))return!1;const s=Be(r);return s==="formdata"||s==="object"&&T(r.toString)&&r.toString()==="[object FormData]"},Gs=M("URLSearchParams"),[Us,Ws,$s,Hs]=["ReadableStream","Request","Response","Headers"].map(M),Vs=r=>r.trim?r.trim():r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function ve(r,t,{allOwnKeys:s=!1}={}){if(r===null||typeof r>"u")return;let n,a;if(typeof r!="object"&&(r=[r]),de(r))for(n=0,a=r.length;n<a;n++)t.call(null,r[n],n,r);else{if(ge(r))return;const i=s?Object.getOwnPropertyNames(r):Object.keys(r),o=i.length;let l;for(n=0;n<o;n++)l=i[n],t.call(null,r[l],l,r)}}function et(r,t){if(ge(r))return null;t=t.toLowerCase();const s=Object.keys(r);let n=s.length,a;for(;n-- >0;)if(a=s[n],t===a.toLowerCase())return a;return null}const se=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,rt=r=>!ce(r)&&r!==se;function tr(...r){const{caseless:t,skipUndefined:s}=rt(this)&&this||{},n={},a=(i,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const l=t&&et(n,o)||o,u=sr(n,l)?n[l]:void 0;Ee(u)&&Ee(i)?n[l]=tr(u,i):Ee(i)?n[l]=tr({},i):de(i)?n[l]=i.slice():(!s||!ce(i))&&(n[l]=i)};for(let i=0,o=r.length;i<o;i++)r[i]&&ve(r[i],a);return n}const Js=(r,t,s,{allOwnKeys:n}={})=>(ve(t,(a,i)=>{s&&T(a)?Object.defineProperty(r,i,{__proto__:null,value:Yr(a,s),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(r,i,{__proto__:null,value:a,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:n}),r),Ks=r=>(r.charCodeAt(0)===65279&&(r=r.slice(1)),r),Ys=(r,t,s,n)=>{r.prototype=Object.create(t.prototype,n),Object.defineProperty(r.prototype,"constructor",{__proto__:null,value:r,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(r,"super",{__proto__:null,value:t.prototype}),s&&Object.assign(r.prototype,s)},Xs=(r,t,s,n)=>{let a,i,o;const l={};if(t=t||{},r==null)return t;do{for(a=Object.getOwnPropertyNames(r),i=a.length;i-- >0;)o=a[i],(!n||n(o,r,t))&&!l[o]&&(t[o]=r[o],l[o]=!0);r=s!==!1&&De(r)}while(r&&(!s||s(r,t))&&r!==Object.prototype);return t},Qs=(r,t,s)=>{r=String(r),(s===void 0||s>r.length)&&(s=r.length),s-=t.length;const n=r.indexOf(t,s);return n!==-1&&n===s},Zs=r=>{if(!r)return null;if(de(r))return r;let t=r.length;if(!Zr(t))return null;const s=new Array(t);for(;t-- >0;)s[t]=r[t];return s},en=(r=>t=>r&&t instanceof r)(typeof Uint8Array<"u"&&De(Uint8Array)),rn=(r,t)=>{const n=(r&&r[Ie]).call(r);let a;for(;(a=n.next())&&!a.done;){const i=a.value;t.call(r,i[0],i[1])}},tn=(r,t)=>{let s;const n=[];for(;(s=r.exec(t))!==null;)n.push(s);return n},sn=M("HTMLFormElement"),nn=r=>r.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(s,n,a){return n.toUpperCase()+a}),sr=(({hasOwnProperty:r})=>(t,s)=>r.call(t,s))(Object.prototype),an=M("RegExp"),tt=(r,t)=>{const s=Object.getOwnPropertyDescriptors(r),n={};ve(s,(a,i)=>{let o;(o=t(a,i,r))!==!1&&(n[i]=o||a)}),Object.defineProperties(r,n)},on=r=>{tt(r,(t,s)=>{if(T(r)&&["arguments","caller","callee"].includes(s))return!1;const n=r[s];if(T(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+s+"'")})}})},ln=(r,t)=>{const s={},n=a=>{a.forEach(i=>{s[i]=!0})};return de(r)?n(r):n(String(r).split(t)),s},cn=()=>{},un=(r,t)=>r!=null&&Number.isFinite(r=+r)?r:t;function dn(r){return!!(r&&T(r.append)&&r[Xr]==="FormData"&&r[Ie])}const mn=r=>{const t=new WeakSet,s=n=>{if(be(n)){if(t.has(n))return;if(ge(n))return n;if(!("toJSON"in n)){t.add(n);const a=de(n)?[]:{};return ve(n,(i,o)=>{const l=s(i);!ce(l)&&(a[o]=l)}),t.delete(n),a}}return n};return s(r)},pn=M("AsyncFunction"),hn=r=>r&&(be(r)||T(r))&&T(r.then)&&T(r.catch),st=((r,t)=>r?setImmediate:t?((s,n)=>(se.addEventListener("message",({source:a,data:i})=>{a===se&&i===s&&n.length&&n.shift()()},!1),a=>{n.push(a),se.postMessage(s,"*")}))(`axios@${Math.random()}`,[]):s=>setTimeout(s))(typeof setImmediate=="function",T(se.postMessage)),fn=typeof queueMicrotask<"u"?queueMicrotask.bind(se):typeof process<"u"&&process.nextTick||st,gn=r=>r!=null&&T(r[Ie]),m={isArray:de,isArrayBuffer:Qr,isBuffer:ge,isFormData:zs,isArrayBufferView:ks,isString:Es,isNumber:Zr,isBoolean:Os,isObject:be,isPlainObject:Ee,isEmptyObject:qs,isReadableStream:Us,isRequest:Ws,isResponse:$s,isHeaders:Hs,isUndefined:ce,isDate:Rs,isFile:Ls,isReactNativeBlob:Ps,isReactNative:Ts,isBlob:Ds,isRegExp:an,isFunction:T,isStream:Bs,isURLSearchParams:Gs,isTypedArray:en,isFileList:Is,forEach:ve,merge:tr,extend:Js,trim:Vs,stripBOM:Ks,inherits:Ys,toFlatObject:Xs,kindOf:Be,kindOfTest:M,endsWith:Qs,toArray:Zs,forEachEntry:rn,matchAll:tn,isHTMLForm:sn,hasOwnProperty:sr,hasOwnProp:sr,reduceDescriptors:tt,freezeMethods:on,toObjectSet:ln,toCamelCase:nn,noop:cn,toFiniteNumber:un,findKey:et,global:se,isContextDefined:rt,isSpecCompliantForm:dn,toJSONObject:mn,isAsyncFn:pn,isThenable:hn,setImmediate:st,asap:fn,isIterable:gn},bn=m.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),vn=r=>{const t={};let s,n,a;return r&&r.split(`
`).forEach(function(o){a=o.indexOf(":"),s=o.substring(0,a).trim().toLowerCase(),n=o.substring(a+1).trim(),!(!s||t[s]&&bn[s])&&(s==="set-cookie"?t[s]?t[s].push(n):t[s]=[n]:t[s]=t[s]?t[s]+", "+n:n)}),t};function xn(r){let t=0,s=r.length;for(;t<s;){const n=r.charCodeAt(t);if(n!==9&&n!==32)break;t+=1}for(;s>t;){const n=r.charCodeAt(s-1);if(n!==9&&n!==32)break;s-=1}return t===0&&s===r.length?r:r.slice(t,s)}const yn=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),jn=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function cr(r,t){return m.isArray(r)?r.map(s=>cr(s,t)):xn(String(r).replace(t,""))}const An=r=>cr(r,yn),wn=r=>cr(r,jn);function nt(r){const t=Object.create(null);return m.forEach(r.toJSON(),(s,n)=>{t[n]=wn(s)}),t}const Sr=Symbol("internals");function he(r){return r&&String(r).trim().toLowerCase()}function Oe(r){return r===!1||r==null?r:m.isArray(r)?r.map(Oe):An(String(r))}function Nn(r){const t=Object.create(null),s=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=s.exec(r);)t[n[1]]=n[2];return t}const Cn=r=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim());function Ke(r,t,s,n,a){if(m.isFunction(n))return n.call(this,t,s);if(a&&(t=s),!!m.isString(t)){if(m.isString(n))return t.indexOf(n)!==-1;if(m.isRegExp(n))return n.test(t)}}function Sn(r){return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,s,n)=>s.toUpperCase()+n)}function _n(r,t){const s=m.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(r,n+s,{__proto__:null,value:function(a,i,o){return this[n].call(this,t,a,i,o)},configurable:!0})})}let P=class{constructor(t){t&&this.set(t)}set(t,s,n){const a=this;function i(l,u,d){const c=he(u);if(!c)throw new Error("header name must be a non-empty string");const p=m.findKey(a,c);(!p||a[p]===void 0||d===!0||d===void 0&&a[p]!==!1)&&(a[p||u]=Oe(l))}const o=(l,u)=>m.forEach(l,(d,c)=>i(d,c,u));if(m.isPlainObject(t)||t instanceof this.constructor)o(t,s);else if(m.isString(t)&&(t=t.trim())&&!Cn(t))o(vn(t),s);else if(m.isObject(t)&&m.isIterable(t)){let l={},u,d;for(const c of t){if(!m.isArray(c))throw TypeError("Object iterator must return a key-value pair");l[d=c[0]]=(u=l[d])?m.isArray(u)?[...u,c[1]]:[u,c[1]]:c[1]}o(l,s)}else t!=null&&i(s,t,n);return this}get(t,s){if(t=he(t),t){const n=m.findKey(this,t);if(n){const a=this[n];if(!s)return a;if(s===!0)return Nn(a);if(m.isFunction(s))return s.call(this,a,n);if(m.isRegExp(s))return s.exec(a);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,s){if(t=he(t),t){const n=m.findKey(this,t);return!!(n&&this[n]!==void 0&&(!s||Ke(this,this[n],n,s)))}return!1}delete(t,s){const n=this;let a=!1;function i(o){if(o=he(o),o){const l=m.findKey(n,o);l&&(!s||Ke(n,n[l],l,s))&&(delete n[l],a=!0)}}return m.isArray(t)?t.forEach(i):i(t),a}clear(t){const s=Object.keys(this);let n=s.length,a=!1;for(;n--;){const i=s[n];(!t||Ke(this,this[i],i,t,!0))&&(delete this[i],a=!0)}return a}normalize(t){const s=this,n={};return m.forEach(this,(a,i)=>{const o=m.findKey(n,i);if(o){s[o]=Oe(a),delete s[i];return}const l=t?Sn(i):String(i).trim();l!==i&&delete s[i],s[l]=Oe(a),n[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const s=Object.create(null);return m.forEach(this,(n,a)=>{n!=null&&n!==!1&&(s[a]=t&&m.isArray(n)?n.join(", "):n)}),s}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,s])=>t+": "+s).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...s){const n=new this(t);return s.forEach(a=>n.set(a)),n}static accessor(t){const n=(this[Sr]=this[Sr]={accessors:{}}).accessors,a=this.prototype;function i(o){const l=he(o);n[l]||(_n(a,o),n[l]=!0)}return m.isArray(t)?t.forEach(i):i(t),this}};P.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);m.reduceDescriptors(P.prototype,({value:r},t)=>{let s=t[0].toUpperCase()+t.slice(1);return{get:()=>r,set(n){this[s]=n}}});m.freezeMethods(P);const Fn="[REDACTED ****]";function kn(r){if(m.hasOwnProp(r,"toJSON"))return!0;let t=Object.getPrototypeOf(r);for(;t&&t!==Object.prototype;){if(m.hasOwnProp(t,"toJSON"))return!0;t=Object.getPrototypeOf(t)}return!1}function En(r,t){const s=new Set(t.map(i=>String(i).toLowerCase())),n=[],a=i=>{if(i===null||typeof i!="object"||m.isBuffer(i))return i;if(n.indexOf(i)!==-1)return;i instanceof P&&(i=i.toJSON()),n.push(i);let o;if(m.isArray(i))o=[],i.forEach((l,u)=>{const d=a(l);m.isUndefined(d)||(o[u]=d)});else{if(!m.isPlainObject(i)&&kn(i))return n.pop(),i;o=Object.create(null);for(const[l,u]of Object.entries(i)){const d=s.has(l.toLowerCase())?Fn:a(u);m.isUndefined(d)||(o[l]=d)}}return n.pop(),o};return a(r)}let w=class at extends Error{static from(t,s,n,a,i,o){const l=new at(t.message,s||t.code,n,a,i);return l.cause=t,l.name=t.name,t.status!=null&&l.status==null&&(l.status=t.status),o&&Object.assign(l,o),l}constructor(t,s,n,a,i){super(t),Object.defineProperty(this,"message",{__proto__:null,value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,s&&(this.code=s),n&&(this.config=n),a&&(this.request=a),i&&(this.response=i,this.status=i.status)}toJSON(){const t=this.config,s=t&&m.hasOwnProp(t,"redact")?t.redact:void 0,n=m.isArray(s)&&s.length>0?En(t,s):m.toJSONObject(t);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:n,code:this.code,status:this.status}}};w.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";w.ERR_BAD_OPTION="ERR_BAD_OPTION";w.ECONNABORTED="ECONNABORTED";w.ETIMEDOUT="ETIMEDOUT";w.ECONNREFUSED="ECONNREFUSED";w.ERR_NETWORK="ERR_NETWORK";w.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";w.ERR_DEPRECATED="ERR_DEPRECATED";w.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";w.ERR_BAD_REQUEST="ERR_BAD_REQUEST";w.ERR_CANCELED="ERR_CANCELED";w.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";w.ERR_INVALID_URL="ERR_INVALID_URL";w.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const On=null;function nr(r){return m.isPlainObject(r)||m.isArray(r)}function it(r){return m.endsWith(r,"[]")?r.slice(0,-2):r}function Ye(r,t,s){return r?r.concat(t).map(function(a,i){return a=it(a),!s&&i?"["+a+"]":a}).join(s?".":""):t}function qn(r){return m.isArray(r)&&!r.some(nr)}const Rn=m.toFlatObject(m,{},null,function(t){return/^is[A-Z]/.test(t)});function ze(r,t,s){if(!m.isObject(r))throw new TypeError("target must be an object");t=t||new FormData,s=m.toFlatObject(s,{metaTokens:!0,dots:!1,indexes:!1},!1,function(g,j){return!m.isUndefined(j[g])});const n=s.metaTokens,a=s.visitor||p,i=s.dots,o=s.indexes,l=s.Blob||typeof Blob<"u"&&Blob,u=s.maxDepth===void 0?100:s.maxDepth,d=l&&m.isSpecCompliantForm(t);if(!m.isFunction(a))throw new TypeError("visitor must be a function");function c(v){if(v===null)return"";if(m.isDate(v))return v.toISOString();if(m.isBoolean(v))return v.toString();if(!d&&m.isBlob(v))throw new w("Blob is not supported. Use a Buffer instead.");return m.isArrayBuffer(v)||m.isTypedArray(v)?d&&typeof Blob=="function"?new Blob([v]):Buffer.from(v):v}function p(v,g,j){let N=v;if(m.isReactNative(t)&&m.isReactNativeBlob(v))return t.append(Ye(j,g,i),c(v)),!1;if(v&&!j&&typeof v=="object"){if(m.endsWith(g,"{}"))g=n?g:g.slice(0,-2),v=JSON.stringify(v);else if(m.isArray(v)&&qn(v)||(m.isFileList(v)||m.endsWith(g,"[]"))&&(N=m.toArray(v)))return g=it(g),N.forEach(function(y,_){!(m.isUndefined(y)||y===null)&&t.append(o===!0?Ye([g],_,i):o===null?g:g+"[]",c(y))}),!1}return nr(v)?!0:(t.append(Ye(j,g,i),c(v)),!1)}const x=[],f=Object.assign(Rn,{defaultVisitor:p,convertValue:c,isVisitable:nr});function A(v,g,j=0){if(!m.isUndefined(v)){if(j>u)throw new w("Object is too deeply nested ("+j+" levels). Max depth: "+u,w.ERR_FORM_DATA_DEPTH_EXCEEDED);if(x.indexOf(v)!==-1)throw Error("Circular reference detected in "+g.join("."));x.push(v),m.forEach(v,function(h,y){(!(m.isUndefined(h)||h===null)&&a.call(t,h,m.isString(y)?y.trim():y,g,f))===!0&&A(h,g?g.concat(y):[y],j+1)}),x.pop()}}if(!m.isObject(r))throw new TypeError("data must be an object");return A(r),t}function _r(r){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(r).replace(/[!'()~]|%20/g,function(n){return t[n]})}function ur(r,t){this._pairs=[],r&&ze(r,this,t)}const ot=ur.prototype;ot.append=function(t,s){this._pairs.push([t,s])};ot.toString=function(t){const s=t?function(n){return t.call(this,n,_r)}:_r;return this._pairs.map(function(a){return s(a[0])+"="+s(a[1])},"").join("&")};function Ln(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function lt(r,t,s){if(!t)return r;const n=s&&s.encode||Ln,a=m.isFunction(s)?{serialize:s}:s,i=a&&a.serialize;let o;if(i?o=i(t,a):o=m.isURLSearchParams(t)?t.toString():new ur(t,a).toString(n),o){const l=r.indexOf("#");l!==-1&&(r=r.slice(0,l)),r+=(r.indexOf("?")===-1?"?":"&")+o}return r}class Fr{constructor(){this.handlers=[]}use(t,s,n){return this.handlers.push({fulfilled:t,rejected:s,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){m.forEach(this.handlers,function(n){n!==null&&t(n)})}}const dr={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Pn=typeof URLSearchParams<"u"?URLSearchParams:ur,Tn=typeof FormData<"u"?FormData:null,Dn=typeof Blob<"u"?Blob:null,In={isBrowser:!0,classes:{URLSearchParams:Pn,FormData:Tn,Blob:Dn},protocols:["http","https","file","blob","url","data"]},mr=typeof window<"u"&&typeof document<"u",ar=typeof navigator=="object"&&navigator||void 0,Bn=mr&&(!ar||["ReactNative","NativeScript","NS"].indexOf(ar.product)<0),Mn=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",zn=mr&&window.location.href||"http://localhost",Gn=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:mr,hasStandardBrowserEnv:Bn,hasStandardBrowserWebWorkerEnv:Mn,navigator:ar,origin:zn},Symbol.toStringTag,{value:"Module"})),L={...Gn,...In};function Un(r,t){return ze(r,new L.classes.URLSearchParams,{visitor:function(s,n,a,i){return L.isNode&&m.isBuffer(s)?(this.append(n,s.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...t})}function Wn(r){return m.matchAll(/\w+|\[(\w*)]/g,r).map(t=>t[0]==="[]"?"":t[1]||t[0])}function $n(r){const t={},s=Object.keys(r);let n;const a=s.length;let i;for(n=0;n<a;n++)i=s[n],t[i]=r[i];return t}function ct(r){function t(s,n,a,i){let o=s[i++];if(o==="__proto__")return!0;const l=Number.isFinite(+o),u=i>=s.length;return o=!o&&m.isArray(a)?a.length:o,u?(m.hasOwnProp(a,o)?a[o]=m.isArray(a[o])?a[o].concat(n):[a[o],n]:a[o]=n,!l):((!m.hasOwnProp(a,o)||!m.isObject(a[o]))&&(a[o]=[]),t(s,n,a[o],i)&&m.isArray(a[o])&&(a[o]=$n(a[o])),!l)}if(m.isFormData(r)&&m.isFunction(r.entries)){const s={};return m.forEachEntry(r,(n,a)=>{t(Wn(n),a,s,0)}),s}return null}const le=(r,t)=>r!=null&&m.hasOwnProp(r,t)?r[t]:void 0;function Hn(r,t,s){if(m.isString(r))try{return(t||JSON.parse)(r),m.trim(r)}catch(n){if(n.name!=="SyntaxError")throw n}return(s||JSON.stringify)(r)}const xe={transitional:dr,adapter:["xhr","http","fetch"],transformRequest:[function(t,s){const n=s.getContentType()||"",a=n.indexOf("application/json")>-1,i=m.isObject(t);if(i&&m.isHTMLForm(t)&&(t=new FormData(t)),m.isFormData(t))return a?JSON.stringify(ct(t)):t;if(m.isArrayBuffer(t)||m.isBuffer(t)||m.isStream(t)||m.isFile(t)||m.isBlob(t)||m.isReadableStream(t))return t;if(m.isArrayBufferView(t))return t.buffer;if(m.isURLSearchParams(t))return s.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(i){const u=le(this,"formSerializer");if(n.indexOf("application/x-www-form-urlencoded")>-1)return Un(t,u).toString();if((l=m.isFileList(t))||n.indexOf("multipart/form-data")>-1){const d=le(this,"env"),c=d&&d.FormData;return ze(l?{"files[]":t}:t,c&&new c,u)}}return i||a?(s.setContentType("application/json",!1),Hn(t)):t}],transformResponse:[function(t){const s=le(this,"transitional")||xe.transitional,n=s&&s.forcedJSONParsing,a=le(this,"responseType"),i=a==="json";if(m.isResponse(t)||m.isReadableStream(t))return t;if(t&&m.isString(t)&&(n&&!a||i)){const l=!(s&&s.silentJSONParsing)&&i;try{return JSON.parse(t,le(this,"parseReviver"))}catch(u){if(l)throw u.name==="SyntaxError"?w.from(u,w.ERR_BAD_RESPONSE,this,null,le(this,"response")):u}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:L.classes.FormData,Blob:L.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};m.forEach(["delete","get","head","post","put","patch","query"],r=>{xe.headers[r]={}});function Xe(r,t){const s=this||xe,n=t||s,a=P.from(n.headers);let i=n.data;return m.forEach(r,function(l){i=l.call(s,i,a.normalize(),t?t.status:void 0)}),a.normalize(),i}function ut(r){return!!(r&&r.__CANCEL__)}let ye=class extends w{constructor(t,s,n){super(t??"canceled",w.ERR_CANCELED,s,n),this.name="CanceledError",this.__CANCEL__=!0}};function dt(r,t,s){const n=s.config.validateStatus;!s.status||!n||n(s.status)?r(s):t(new w("Request failed with status code "+s.status,s.status>=400&&s.status<500?w.ERR_BAD_REQUEST:w.ERR_BAD_RESPONSE,s.config,s.request,s))}function Vn(r){const t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(r);return t&&t[1]||""}function Jn(r,t){r=r||10;const s=new Array(r),n=new Array(r);let a=0,i=0,o;return t=t!==void 0?t:1e3,function(u){const d=Date.now(),c=n[i];o||(o=d),s[a]=u,n[a]=d;let p=i,x=0;for(;p!==a;)x+=s[p++],p=p%r;if(a=(a+1)%r,a===i&&(i=(i+1)%r),d-o<t)return;const f=c&&d-c;return f?Math.round(x*1e3/f):void 0}}function Kn(r,t){let s=0,n=1e3/t,a,i;const o=(d,c=Date.now())=>{s=c,a=null,i&&(clearTimeout(i),i=null),r(...d)};return[(...d)=>{const c=Date.now(),p=c-s;p>=n?o(d,c):(a=d,i||(i=setTimeout(()=>{i=null,o(a)},n-p)))},()=>a&&o(a)]}const Pe=(r,t,s=3)=>{let n=0;const a=Jn(50,250);return Kn(i=>{if(!i||typeof i.loaded!="number")return;const o=i.loaded,l=i.lengthComputable?i.total:void 0,u=l!=null?Math.min(o,l):o,d=Math.max(0,u-n),c=a(d);n=Math.max(n,u);const p={loaded:u,total:l,progress:l?u/l:void 0,bytes:d,rate:c||void 0,estimated:c&&l?(l-u)/c:void 0,event:i,lengthComputable:l!=null,[t?"download":"upload"]:!0};r(p)},s)},kr=(r,t)=>{const s=r!=null;return[n=>t[0]({lengthComputable:s,total:r,loaded:n}),t[1]]},Er=r=>(...t)=>m.asap(()=>r(...t)),Yn=L.hasStandardBrowserEnv?((r,t)=>s=>(s=new URL(s,L.origin),r.protocol===s.protocol&&r.host===s.host&&(t||r.port===s.port)))(new URL(L.origin),L.navigator&&/(msie|trident)/i.test(L.navigator.userAgent)):()=>!0,Xn=L.hasStandardBrowserEnv?{write(r,t,s,n,a,i,o){if(typeof document>"u")return;const l=[`${r}=${encodeURIComponent(t)}`];m.isNumber(s)&&l.push(`expires=${new Date(s).toUTCString()}`),m.isString(n)&&l.push(`path=${n}`),m.isString(a)&&l.push(`domain=${a}`),i===!0&&l.push("secure"),m.isString(o)&&l.push(`SameSite=${o}`),document.cookie=l.join("; ")},read(r){if(typeof document>"u")return null;const t=document.cookie.split(";");for(let s=0;s<t.length;s++){const n=t[s].replace(/^\s+/,""),a=n.indexOf("=");if(a!==-1&&n.slice(0,a)===r)return decodeURIComponent(n.slice(a+1))}return null},remove(r){this.write(r,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Qn(r){return typeof r!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)}function Zn(r,t){return t?r.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):r}function mt(r,t,s){let n=!Qn(t);return r&&(n||s===!1)?Zn(r,t):t}const Or=r=>r instanceof P?{...r}:r;function ae(r,t){t=t||{};const s=Object.create(null);Object.defineProperty(s,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function n(d,c,p,x){return m.isPlainObject(d)&&m.isPlainObject(c)?m.merge.call({caseless:x},d,c):m.isPlainObject(c)?m.merge({},c):m.isArray(c)?c.slice():c}function a(d,c,p,x){if(m.isUndefined(c)){if(!m.isUndefined(d))return n(void 0,d,p,x)}else return n(d,c,p,x)}function i(d,c){if(!m.isUndefined(c))return n(void 0,c)}function o(d,c){if(m.isUndefined(c)){if(!m.isUndefined(d))return n(void 0,d)}else return n(void 0,c)}function l(d,c,p){if(m.hasOwnProp(t,p))return n(d,c);if(m.hasOwnProp(r,p))return n(void 0,d)}const u={url:i,method:i,data:i,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:l,headers:(d,c,p)=>a(Or(d),Or(c),p,!0)};return m.forEach(Object.keys({...r,...t}),function(c){if(c==="__proto__"||c==="constructor"||c==="prototype")return;const p=m.hasOwnProp(u,c)?u[c]:a,x=m.hasOwnProp(r,c)?r[c]:void 0,f=m.hasOwnProp(t,c)?t[c]:void 0,A=p(x,f,c);m.isUndefined(A)&&p!==l||(s[c]=A)}),s}const ea=["content-type","content-length"];function ra(r,t,s){if(s!=="content-only"){r.set(t);return}Object.entries(t).forEach(([n,a])=>{ea.includes(n.toLowerCase())&&r.set(n,a)})}const ta=r=>encodeURIComponent(r).replace(/%([0-9A-F]{2})/gi,(t,s)=>String.fromCharCode(parseInt(s,16))),pt=r=>{const t=ae({},r),s=x=>m.hasOwnProp(t,x)?t[x]:void 0,n=s("data");let a=s("withXSRFToken");const i=s("xsrfHeaderName"),o=s("xsrfCookieName");let l=s("headers");const u=s("auth"),d=s("baseURL"),c=s("allowAbsoluteUrls"),p=s("url");if(t.headers=l=P.from(l),t.url=lt(mt(d,p,c),r.params,r.paramsSerializer),u&&l.set("Authorization","Basic "+btoa((u.username||"")+":"+(u.password?ta(u.password):""))),m.isFormData(n)&&(L.hasStandardBrowserEnv||L.hasStandardBrowserWebWorkerEnv?l.setContentType(void 0):m.isFunction(n.getHeaders)&&ra(l,n.getHeaders(),s("formDataHeaderPolicy"))),L.hasStandardBrowserEnv&&(m.isFunction(a)&&(a=a(t)),a===!0||a==null&&Yn(t.url))){const f=i&&o&&Xn.read(o);f&&l.set(i,f)}return t},sa=typeof XMLHttpRequest<"u",na=sa&&function(r){return new Promise(function(s,n){const a=pt(r);let i=a.data;const o=P.from(a.headers).normalize();let{responseType:l,onUploadProgress:u,onDownloadProgress:d}=a,c,p,x,f,A;function v(){f&&f(),A&&A(),a.cancelToken&&a.cancelToken.unsubscribe(c),a.signal&&a.signal.removeEventListener("abort",c)}let g=new XMLHttpRequest;g.open(a.method.toUpperCase(),a.url,!0),g.timeout=a.timeout;function j(){if(!g)return;const h=P.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),_={data:!l||l==="text"||l==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:h,config:r,request:g};dt(function(Z){s(Z),v()},function(Z){n(Z),v()},_),g=null}"onloadend"in g?g.onloadend=j:g.onreadystatechange=function(){!g||g.readyState!==4||g.status===0&&!(g.responseURL&&g.responseURL.startsWith("file:"))||setTimeout(j)},g.onabort=function(){g&&(n(new w("Request aborted",w.ECONNABORTED,r,g)),v(),g=null)},g.onerror=function(y){const _=y&&y.message?y.message:"Network Error",E=new w(_,w.ERR_NETWORK,r,g);E.event=y||null,n(E),v(),g=null},g.ontimeout=function(){let y=a.timeout?"timeout of "+a.timeout+"ms exceeded":"timeout exceeded";const _=a.transitional||dr;a.timeoutErrorMessage&&(y=a.timeoutErrorMessage),n(new w(y,_.clarifyTimeoutError?w.ETIMEDOUT:w.ECONNABORTED,r,g)),v(),g=null},i===void 0&&o.setContentType(null),"setRequestHeader"in g&&m.forEach(nt(o),function(y,_){g.setRequestHeader(_,y)}),m.isUndefined(a.withCredentials)||(g.withCredentials=!!a.withCredentials),l&&l!=="json"&&(g.responseType=a.responseType),d&&([x,A]=Pe(d,!0),g.addEventListener("progress",x)),u&&g.upload&&([p,f]=Pe(u),g.upload.addEventListener("progress",p),g.upload.addEventListener("loadend",f)),(a.cancelToken||a.signal)&&(c=h=>{g&&(n(!h||h.type?new ye(null,r,g):h),g.abort(),v(),g=null)},a.cancelToken&&a.cancelToken.subscribe(c),a.signal&&(a.signal.aborted?c():a.signal.addEventListener("abort",c)));const N=Vn(a.url);if(N&&!L.protocols.includes(N)){n(new w("Unsupported protocol "+N+":",w.ERR_BAD_REQUEST,r));return}g.send(i||null)})},aa=(r,t)=>{if(r=r?r.filter(Boolean):[],!t&&!r.length)return;const s=new AbortController;let n=!1;const a=function(u){if(!n){n=!0,o();const d=u instanceof Error?u:this.reason;s.abort(d instanceof w?d:new ye(d instanceof Error?d.message:d))}};let i=t&&setTimeout(()=>{i=null,a(new w(`timeout of ${t}ms exceeded`,w.ETIMEDOUT))},t);const o=()=>{r&&(i&&clearTimeout(i),i=null,r.forEach(u=>{u.unsubscribe?u.unsubscribe(a):u.removeEventListener("abort",a)}),r=null)};r.forEach(u=>u.addEventListener("abort",a));const{signal:l}=s;return l.unsubscribe=()=>m.asap(o),l},ia=function*(r,t){let s=r.byteLength;if(s<t){yield r;return}let n=0,a;for(;n<s;)a=n+t,yield r.slice(n,a),n=a},oa=async function*(r,t){for await(const s of la(r))yield*ia(s,t)},la=async function*(r){if(r[Symbol.asyncIterator]){yield*r;return}const t=r.getReader();try{for(;;){const{done:s,value:n}=await t.read();if(s)break;yield n}}finally{await t.cancel()}},qr=(r,t,s,n)=>{const a=oa(r,t);let i=0,o,l=u=>{o||(o=!0,n&&n(u))};return new ReadableStream({async pull(u){try{const{done:d,value:c}=await a.next();if(d){l(),u.close();return}let p=c.byteLength;if(s){let x=i+=p;s(x)}u.enqueue(new Uint8Array(c))}catch(d){throw l(d),d}},cancel(u){return l(u),a.return()}},{highWaterMark:2})};function ca(r){if(!r||typeof r!="string"||!r.startsWith("data:"))return 0;const t=r.indexOf(",");if(t<0)return 0;const s=r.slice(5,t),n=r.slice(t+1);if(/;base64/i.test(s)){let o=n.length;const l=n.length;for(let f=0;f<l;f++)if(n.charCodeAt(f)===37&&f+2<l){const A=n.charCodeAt(f+1),v=n.charCodeAt(f+2);(A>=48&&A<=57||A>=65&&A<=70||A>=97&&A<=102)&&(v>=48&&v<=57||v>=65&&v<=70||v>=97&&v<=102)&&(o-=2,f+=2)}let u=0,d=l-1;const c=f=>f>=2&&n.charCodeAt(f-2)===37&&n.charCodeAt(f-1)===51&&(n.charCodeAt(f)===68||n.charCodeAt(f)===100);d>=0&&(n.charCodeAt(d)===61?(u++,d--):c(d)&&(u++,d-=3)),u===1&&d>=0&&(n.charCodeAt(d)===61||c(d))&&u++;const x=Math.floor(o/4)*3-(u||0);return x>0?x:0}if(typeof Buffer<"u"&&typeof Buffer.byteLength=="function")return Buffer.byteLength(n,"utf8");let i=0;for(let o=0,l=n.length;o<l;o++){const u=n.charCodeAt(o);if(u<128)i+=1;else if(u<2048)i+=2;else if(u>=55296&&u<=56319&&o+1<l){const d=n.charCodeAt(o+1);d>=56320&&d<=57343?(i+=4,o++):i+=3}else i+=3}return i}const pr="1.16.1",Rr=64*1024,{isFunction:Ce}=m,Lr=(r,...t)=>{try{return!!r(...t)}catch{return!1}},ua=r=>{const t=m.global!==void 0&&m.global!==null?m.global:globalThis,{ReadableStream:s,TextEncoder:n}=t;r=m.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},r);const{fetch:a,Request:i,Response:o}=r,l=a?Ce(a):typeof fetch=="function",u=Ce(i),d=Ce(o);if(!l)return!1;const c=l&&Ce(s),p=l&&(typeof n=="function"?(j=>N=>j.encode(N))(new n):async j=>new Uint8Array(await new i(j).arrayBuffer())),x=u&&c&&Lr(()=>{let j=!1;const N=new i(L.origin,{body:new s,method:"POST",get duplex(){return j=!0,"half"}}),h=N.headers.has("Content-Type");return N.body!=null&&N.body.cancel(),j&&!h}),f=d&&c&&Lr(()=>m.isReadableStream(new o("").body)),A={stream:f&&(j=>j.body)};l&&["text","arrayBuffer","blob","formData","stream"].forEach(j=>{!A[j]&&(A[j]=(N,h)=>{let y=N&&N[j];if(y)return y.call(N);throw new w(`Response type '${j}' is not supported`,w.ERR_NOT_SUPPORT,h)})});const v=async j=>{if(j==null)return 0;if(m.isBlob(j))return j.size;if(m.isSpecCompliantForm(j))return(await new i(L.origin,{method:"POST",body:j}).arrayBuffer()).byteLength;if(m.isArrayBufferView(j)||m.isArrayBuffer(j))return j.byteLength;if(m.isURLSearchParams(j)&&(j=j+""),m.isString(j))return(await p(j)).byteLength},g=async(j,N)=>{const h=m.toFiniteNumber(j.getContentLength());return h??v(N)};return async j=>{let{url:N,method:h,data:y,signal:_,cancelToken:E,timeout:Z,onDownloadProgress:$e,onUploadProgress:gr,responseType:H,headers:ee,withCredentials:Ae="same-origin",fetchOptions:br,maxContentLength:z,maxBodyLength:He}=pt(j);const me=m.isNumber(z)&&z>-1,Ct=m.isNumber(He)&&He>-1;let vr=a||fetch;H=H?(H+"").toLowerCase():"text";let V=aa([_,E&&E.toAbortSignal()],Z),I=null;const re=V&&V.unsubscribe&&(()=>{V.unsubscribe()});let xr;try{if(me&&typeof N=="string"&&N.startsWith("data:")&&ca(N)>z)throw new w("maxContentLength size of "+z+" exceeded",w.ERR_BAD_RESPONSE,j,I);if(Ct&&h!=="get"&&h!=="head"){const k=await g(ee,y);if(typeof k=="number"&&isFinite(k)&&k>He)throw new w("Request body larger than maxBodyLength limit",w.ERR_BAD_REQUEST,j,I)}if(gr&&x&&h!=="get"&&h!=="head"&&(xr=await g(ee,y))!==0){let k=new i(N,{method:"POST",body:y,duplex:"half"}),oe;if(m.isFormData(y)&&(oe=k.headers.get("content-type"))&&ee.setContentType(oe),k.body){const[we,Ne]=kr(xr,Pe(Er(gr)));y=qr(k.body,Rr,we,Ne)}}m.isString(Ae)||(Ae=Ae?"include":"omit");const R=u&&"credentials"in i.prototype;if(m.isFormData(y)){const k=ee.getContentType();k&&/^multipart\/form-data/i.test(k)&&!/boundary=/i.test(k)&&ee.delete("content-type")}ee.set("User-Agent","axios/"+pr,!1);const J={...br,signal:V,method:h.toUpperCase(),headers:nt(ee.normalize()),body:y,duplex:"half",credentials:R?Ae:void 0};I=u&&new i(N,J);let G=await(u?vr(I,br):vr(N,J));if(me){const k=m.toFiniteNumber(G.headers.get("content-length"));if(k!=null&&k>z)throw new w("maxContentLength size of "+z+" exceeded",w.ERR_BAD_RESPONSE,j,I)}const Ve=f&&(H==="stream"||H==="response");if(f&&G.body&&($e||me||Ve&&re)){const k={};["status","statusText","headers"].forEach(pe=>{k[pe]=G[pe]});const oe=m.toFiniteNumber(G.headers.get("content-length")),[we,Ne]=$e&&kr(oe,Pe(Er($e),!0))||[];let yr=0;const St=pe=>{if(me&&(yr=pe,yr>z))throw new w("maxContentLength size of "+z+" exceeded",w.ERR_BAD_RESPONSE,j,I);we&&we(pe)};G=new o(qr(G.body,Rr,St,()=>{Ne&&Ne(),re&&re()}),k)}H=H||"text";let W=await A[m.findKey(A,H)||"text"](G,j);if(me&&!f&&!Ve){let k;if(W!=null&&(typeof W.byteLength=="number"?k=W.byteLength:typeof W.size=="number"?k=W.size:typeof W=="string"&&(k=typeof n=="function"?new n().encode(W).byteLength:W.length)),typeof k=="number"&&k>z)throw new w("maxContentLength size of "+z+" exceeded",w.ERR_BAD_RESPONSE,j,I)}return!Ve&&re&&re(),await new Promise((k,oe)=>{dt(k,oe,{data:W,headers:P.from(G.headers),status:G.status,statusText:G.statusText,config:j,request:I})})}catch(R){if(re&&re(),V&&V.aborted&&V.reason instanceof w){const J=V.reason;throw J.config=j,I&&(J.request=I),R!==J&&(J.cause=R),J}throw R&&R.name==="TypeError"&&/Load failed|fetch/i.test(R.message)?Object.assign(new w("Network Error",w.ERR_NETWORK,j,I,R&&R.response),{cause:R.cause||R}):w.from(R,R&&R.code,j,I,R&&R.response)}}},da=new Map,ht=r=>{let t=r&&r.env||{};const{fetch:s,Request:n,Response:a}=t,i=[n,a,s];let o=i.length,l=o,u,d,c=da;for(;l--;)u=i[l],d=c.get(u),d===void 0&&c.set(u,d=l?new Map:ua(t)),c=d;return d};ht();const hr={http:On,xhr:na,fetch:{get:ht}};m.forEach(hr,(r,t)=>{if(r){try{Object.defineProperty(r,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(r,"adapterName",{__proto__:null,value:t})}});const Pr=r=>`- ${r}`,ma=r=>m.isFunction(r)||r===null||r===!1;function pa(r,t){r=m.isArray(r)?r:[r];const{length:s}=r;let n,a;const i={};for(let o=0;o<s;o++){n=r[o];let l;if(a=n,!ma(n)&&(a=hr[(l=String(n)).toLowerCase()],a===void 0))throw new w(`Unknown adapter '${l}'`);if(a&&(m.isFunction(a)||(a=a.get(t))))break;i[l||"#"+o]=a}if(!a){const o=Object.entries(i).map(([u,d])=>`adapter ${u} `+(d===!1?"is not supported by the environment":"is not available in the build"));let l=s?o.length>1?`since :
`+o.map(Pr).join(`
`):" "+Pr(o[0]):"as no adapter specified";throw new w("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return a}const ft={getAdapter:pa,adapters:hr};function Qe(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new ye(null,r)}function Tr(r){return Qe(r),r.headers=P.from(r.headers),r.data=Xe.call(r,r.transformRequest),["post","put","patch"].indexOf(r.method)!==-1&&r.headers.setContentType("application/x-www-form-urlencoded",!1),ft.getAdapter(r.adapter||xe.adapter,r)(r).then(function(n){Qe(r),r.response=n;try{n.data=Xe.call(r,r.transformResponse,n)}finally{delete r.response}return n.headers=P.from(n.headers),n},function(n){if(!ut(n)&&(Qe(r),n&&n.response)){r.response=n.response;try{n.response.data=Xe.call(r,r.transformResponse,n.response)}finally{delete r.response}n.response.headers=P.from(n.response.headers)}return Promise.reject(n)})}const Ge={};["object","boolean","number","function","string","symbol"].forEach((r,t)=>{Ge[r]=function(n){return typeof n===r||"a"+(t<1?"n ":" ")+r}});const Dr={};Ge.transitional=function(t,s,n){function a(i,o){return"[Axios v"+pr+"] Transitional option '"+i+"'"+o+(n?". "+n:"")}return(i,o,l)=>{if(t===!1)throw new w(a(o," has been removed"+(s?" in "+s:"")),w.ERR_DEPRECATED);return s&&!Dr[o]&&(Dr[o]=!0,console.warn(a(o," has been deprecated since v"+s+" and will be removed in the near future"))),t?t(i,o,l):!0}};Ge.spelling=function(t){return(s,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function ha(r,t,s){if(typeof r!="object")throw new w("options must be an object",w.ERR_BAD_OPTION_VALUE);const n=Object.keys(r);let a=n.length;for(;a-- >0;){const i=n[a],o=Object.prototype.hasOwnProperty.call(t,i)?t[i]:void 0;if(o){const l=r[i],u=l===void 0||o(l,i,r);if(u!==!0)throw new w("option "+i+" must be "+u,w.ERR_BAD_OPTION_VALUE);continue}if(s!==!0)throw new w("Unknown option "+i,w.ERR_BAD_OPTION)}}const qe={assertOptions:ha,validators:Ge},B=qe.validators;let ne=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Fr,response:new Fr}}async request(t,s){try{return await this._request(t,s)}catch(n){if(n instanceof Error){let a={};Error.captureStackTrace?Error.captureStackTrace(a):a=new Error;const i=(()=>{if(!a.stack)return"";const o=a.stack.indexOf(`
`);return o===-1?"":a.stack.slice(o+1)})();try{if(!n.stack)n.stack=i;else if(i){const o=i.indexOf(`
`),l=o===-1?-1:i.indexOf(`
`,o+1),u=l===-1?"":i.slice(l+1);String(n.stack).endsWith(u)||(n.stack+=`
`+i)}}catch{}}throw n}}_request(t,s){typeof t=="string"?(s=s||{},s.url=t):s=t||{},s=ae(this.defaults,s);const{transitional:n,paramsSerializer:a,headers:i}=s;n!==void 0&&qe.assertOptions(n,{silentJSONParsing:B.transitional(B.boolean),forcedJSONParsing:B.transitional(B.boolean),clarifyTimeoutError:B.transitional(B.boolean),legacyInterceptorReqResOrdering:B.transitional(B.boolean)},!1),a!=null&&(m.isFunction(a)?s.paramsSerializer={serialize:a}:qe.assertOptions(a,{encode:B.function,serialize:B.function},!0)),s.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?s.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:s.allowAbsoluteUrls=!0),qe.assertOptions(s,{baseUrl:B.spelling("baseURL"),withXsrfToken:B.spelling("withXSRFToken")},!0),s.method=(s.method||this.defaults.method||"get").toLowerCase();let o=i&&m.merge(i.common,i[s.method]);i&&m.forEach(["delete","get","head","post","put","patch","query","common"],A=>{delete i[A]}),s.headers=P.concat(o,i);const l=[];let u=!0;this.interceptors.request.forEach(function(v){if(typeof v.runWhen=="function"&&v.runWhen(s)===!1)return;u=u&&v.synchronous;const g=s.transitional||dr;g&&g.legacyInterceptorReqResOrdering?l.unshift(v.fulfilled,v.rejected):l.push(v.fulfilled,v.rejected)});const d=[];this.interceptors.response.forEach(function(v){d.push(v.fulfilled,v.rejected)});let c,p=0,x;if(!u){const A=[Tr.bind(this),void 0];for(A.unshift(...l),A.push(...d),x=A.length,c=Promise.resolve(s);p<x;)c=c.then(A[p++],A[p++]);return c}x=l.length;let f=s;for(;p<x;){const A=l[p++],v=l[p++];try{f=A(f)}catch(g){v.call(this,g);break}}try{c=Tr.call(this,f)}catch(A){return Promise.reject(A)}for(p=0,x=d.length;p<x;)c=c.then(d[p++],d[p++]);return c}getUri(t){t=ae(this.defaults,t);const s=mt(t.baseURL,t.url,t.allowAbsoluteUrls);return lt(s,t.params,t.paramsSerializer)}};m.forEach(["delete","get","head","options"],function(t){ne.prototype[t]=function(s,n){return this.request(ae(n||{},{method:t,url:s,data:(n||{}).data}))}});m.forEach(["post","put","patch","query"],function(t){function s(n){return function(i,o,l){return this.request(ae(l||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:i,data:o}))}}ne.prototype[t]=s(),t!=="query"&&(ne.prototype[t+"Form"]=s(!0))});let fa=class gt{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let s;this.promise=new Promise(function(i){s=i});const n=this;this.promise.then(a=>{if(!n._listeners)return;let i=n._listeners.length;for(;i-- >0;)n._listeners[i](a);n._listeners=null}),this.promise.then=a=>{let i;const o=new Promise(l=>{n.subscribe(l),i=l}).then(a);return o.cancel=function(){n.unsubscribe(i)},o},t(function(i,o,l){n.reason||(n.reason=new ye(i,o,l),s(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const s=this._listeners.indexOf(t);s!==-1&&this._listeners.splice(s,1)}toAbortSignal(){const t=new AbortController,s=n=>{t.abort(n)};return this.subscribe(s),t.signal.unsubscribe=()=>this.unsubscribe(s),t.signal}static source(){let t;return{token:new gt(function(a){t=a}),cancel:t}}};function ga(r){return function(s){return r.apply(null,s)}}function ba(r){return m.isObject(r)&&r.isAxiosError===!0}const ir={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(ir).forEach(([r,t])=>{ir[t]=r});function bt(r){const t=new ne(r),s=Yr(ne.prototype.request,t);return m.extend(s,ne.prototype,t,{allOwnKeys:!0}),m.extend(s,t,null,{allOwnKeys:!0}),s.create=function(a){return bt(ae(r,a))},s}const O=bt(xe);O.Axios=ne;O.CanceledError=ye;O.CancelToken=fa;O.isCancel=ut;O.VERSION=pr;O.toFormData=ze;O.AxiosError=w;O.Cancel=O.CanceledError;O.all=function(t){return Promise.all(t)};O.spread=ga;O.isAxiosError=ba;O.mergeConfig=ae;O.AxiosHeaders=P;O.formToJSON=r=>ct(m.isHTMLForm(r)?new FormData(r):r);O.getAdapter=ft.getAdapter;O.HttpStatusCode=ir;O.default=O;const{Axios:fo,AxiosError:go,CanceledError:bo,isCancel:vo,CancelToken:xo,VERSION:yo,all:jo,Cancel:Ao,isAxiosError:wo,spread:No,toFormData:Co,AxiosHeaders:So,HttpStatusCode:_o,formToJSON:Fo,getAdapter:ko,mergeConfig:Eo,create:Oo}=O,ie=O.create({baseURL:"/api",headers:{"Content-Type":"application/json"}});ie.interceptors.request.use(r=>{const t=ue.getState().token;return t&&(r.headers.Authorization=`Bearer ${t}`),r});ie.interceptors.response.use(r=>r,r=>{var t;return((t=r.response)==null?void 0:t.status)===401&&(ue.getState().logout(),window.location.href="/login"),Promise.reject(r)});function Ir(r,t){document.title=r;const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content",t)}const va=[{key:"conseil",icon:"🤝",color:"#1B4332"},{key:"negoce",icon:"🌾",color:"#2D6A4F"},{key:"formations",icon:"📚",color:"#52B788"},{key:"etudes",icon:"🔬",color:"#8B5E3C"},{key:"hydro",icon:"💧",color:"#2D6A4F"},{key:"intrants",icon:"🌱",color:"#1B4332"},{key:"projets",icon:"📋",color:"#52B788"}],te={slug:"interview-elie-dipama-lefaso",title_fr:"L'Agriculture Intelligente au Burkina Faso : Vision et Ambition de GreenFCO",title_en:"Smart Agriculture in Burkina Faso: GreenFCO's Vision and Ambition",category:"Actualités",author:"Wenmanegda Elie DIPAMA",date:"2024-03-15",excerpt_fr:"Elie Dipama, co-fondateur de GreenFCO et Fellow Humboldt 2025, partage sa vision pour une agriculture durable et innovante en Afrique de l'Ouest.",excerpt_en:"Elie Dipama, co-founder of GreenFCO and 2025 Humboldt Fellow, shares his vision for sustainable and innovative agriculture in West Africa."};function xa(){var c;const{t:r,i18n:t}=D(),s=(c=t.language)!=null&&c.startsWith("fr")?"fr":"en",[n,a]=b.useState(""),[i,o]=b.useState(!1),[l,u]=b.useState(!1);b.useEffect(()=>{s==="fr"?Ir("GreenFCO — Green Field Consortium | Agriculture Durable en Afrique","Green Field Consortium (GreenFCO) — Plateforme agro-environnementale pour l'Afrique francophone. Conseil, formations, négoce et innovations agricoles durables au Burkina Faso et en Afrique de l'Ouest."):Ir("GreenFCO — Green Field Consortium | Sustainable Agriculture in West Africa","Green Field Consortium (GreenFCO) — Agro-environmental platform for West Africa. Advisory, training, trade, and sustainable agricultural innovations in Burkina Faso and across West Africa.")},[s]);async function d(p){if(p.preventDefault(),!!n){u(!0);try{await ie.post("/newsletter/subscribe",{email:n,language:s}),o(!0)}catch{o(!0)}finally{u(!1)}}}return e.jsxs("main",{className:"home",children:[e.jsxs("section",{className:"hero",children:[e.jsxs("div",{className:"hero-bg",children:[e.jsx("div",{className:"hero-photo","aria-hidden":"true"}),e.jsx("div",{className:"hero-overlay","aria-hidden":"true"})]}),e.jsxs("div",{className:"hero-content container",children:[e.jsx("div",{className:"hero-eyebrow",children:e.jsx("span",{className:"badge badge-green",children:"🌍 Afrique Francophone"})}),e.jsx("h1",{className:"hero-slogan",children:r("hero.slogan")}),e.jsx("p",{className:"hero-subtitle",children:r("hero.subtitle")}),e.jsxs("div",{className:"hero-cta",children:[e.jsx(S,{to:"/services",className:"btn btn-primary btn-lg",children:r("hero.cta_primary")}),e.jsx(S,{to:"/register",className:"btn btn-secondary btn-lg",children:r("hero.cta_secondary")})]})]}),e.jsx("div",{className:"hero-scroll",children:e.jsx("span",{children:"↓"})})]}),e.jsx("section",{className:"stats-bar",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"stats-grid",children:[e.jsx(Se,{label:r("stats.founded"),icon:"📅"}),e.jsx(Se,{label:r("stats.fellows"),icon:"🏅"}),e.jsx(Se,{label:r("stats.services"),icon:"🌿"}),e.jsx(Se,{label:r("stats.presence"),icon:"🌍"})]})})}),e.jsx("section",{className:"section",id:"services",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"eyebrow",children:r("services.title")}),e.jsx("h2",{children:s==="fr"?"Ce que nous faisons":"What We Do"}),e.jsx("div",{className:"divider"}),e.jsx("p",{children:r("services.subtitle")})]}),e.jsx("div",{className:"services-grid",children:va.map(p=>e.jsx(ya,{service:p,t:r},p.key))}),e.jsx("div",{className:"services-cta",children:e.jsxs(S,{to:"/services",className:"btn btn-secondary",children:[r("common.view_all")," services →"]})})]})}),e.jsx("section",{className:"who-we-are section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"who-grid",children:[e.jsxs("div",{className:"who-image",children:[e.jsx("img",{src:"/images/cofounders.jpg",alt:"Elie et Elisée Dipama, co-fondateurs de GreenFCO",className:"who-photo",loading:"lazy"}),e.jsxs("div",{className:"who-badge",children:[e.jsx("span",{children:"🏅"}),e.jsx("span",{children:"Fondé au Burkina Faso · 2021"})]})]}),e.jsxs("div",{className:"who-content",children:[e.jsx("span",{className:"eyebrow",children:r("about.title")}),e.jsx("h2",{children:s==="fr"?"Deux frères, une mission":"Two Brothers, One Mission"}),e.jsx("div",{className:"divider divider-left"}),e.jsx("p",{children:s==="fr"?"Fondée le 7 octobre 2021 par Elie et Elisée Dipama, Green Field Consortium (GreenFCO) est une entreprise agro-environnementale engagée dans la transformation durable du secteur agricole en Afrique francophone.":"Founded on October 7, 2021 by Elie and Elisée Dipama, Green Field Consortium (GreenFCO) is an agro-environmental enterprise committed to the sustainable transformation of the agricultural sector in Francophone Africa."}),e.jsx("p",{children:s==="fr"?"Portée par un double palmarès international — Mandela Washington Fellowship (YALI, Purdue 2023) et Alexander von Humboldt Foundation Fellowship (2025) — l'équipe GreenFCO allie expertise académique et terrain.":"Backed by dual international recognition — Mandela Washington Fellowship (YALI, Purdue 2023) and Alexander von Humboldt Foundation Fellowship (2025) — the GreenFCO team combines academic expertise with field experience."}),e.jsxs("div",{className:"who-fellowships",children:[e.jsxs("div",{className:"fellowship-badge",children:[e.jsx("span",{children:"🏅"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Mandela Washington Fellow"}),e.jsx("span",{children:"YALI · Purdue University · 2023"})]})]}),e.jsxs("div",{className:"fellowship-badge",children:[e.jsx("span",{children:"🏅"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Alexander von Humboldt Fellow"}),e.jsx("span",{children:"International Climate Protection · 2025"})]})]})]}),e.jsxs(S,{to:"/about",className:"btn btn-primary",children:[r("common.learn_more")," →"]})]})]})})}),e.jsx("section",{className:"section blog-preview-section",style:{background:"var(--off-white)"},children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"eyebrow",children:"Blog"}),e.jsx("h2",{children:s==="fr"?"Dernière publication":"Latest Article"}),e.jsx("div",{className:"divider"})]}),e.jsxs("div",{className:"blog-preview-card card",children:[e.jsxs("div",{className:"blog-preview-inner",children:[e.jsxs("div",{className:"blog-preview-meta",children:[e.jsx("span",{className:"badge badge-green",children:te.category}),e.jsx("span",{className:"blog-date",children:new Date(te.date).toLocaleDateString(s==="fr"?"fr-FR":"en-US",{year:"numeric",month:"long",day:"numeric"})})]}),e.jsx("h3",{children:te[`title_${s}`]}),e.jsx("p",{children:te[`excerpt_${s}`]}),e.jsxs("div",{className:"blog-preview-author",children:[e.jsx("div",{className:"author-avatar",children:te.author.charAt(0)}),e.jsx("span",{children:te.author})]}),e.jsxs(S,{to:`/blog/${te.slug}`,className:"btn btn-secondary btn-sm",children:[r("blog.read_more")," →"]})]}),e.jsx("div",{className:"blog-preview-image",children:e.jsx("div",{className:"img-placeholder",style:{height:"100%",minHeight:"280px"},children:e.jsx("span",{children:"Image article — 600×400px"})})})]}),e.jsx("div",{style:{textAlign:"center",marginTop:"2rem"},children:e.jsxs(S,{to:"/blog",className:"btn btn-secondary",children:[r("common.view_all")," articles →"]})})]})}),e.jsx("section",{className:"section innovation-section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"eyebrow",children:"Innovation"}),e.jsx("h2",{children:s==="fr"?"En cours de développement":"In Development"}),e.jsx("div",{className:"divider"}),e.jsx("p",{children:s==="fr"?"Deux innovations majeures en préparation pour révolutionner l'agriculture en Afrique de l'Ouest.":"Two major innovations in preparation to revolutionize agriculture in West Africa."})]}),e.jsxs("div",{className:"grid-2",children:[e.jsxs("div",{className:"card innovation-card",children:[e.jsx("div",{className:"innovation-icon",children:"📱"}),e.jsx("div",{className:"badge badge-earth",style:{marginBottom:"0.75rem"},children:r("common.coming_soon")}),e.jsx("h3",{children:"Koob Assist"}),e.jsx("p",{children:s==="fr"?"Application mobile d'assistance-conseil pour les entrepreneurs agricoles. Diagnostic, planification et suivi de votre activité, accessible depuis votre smartphone.":"Mobile advisory app for agricultural entrepreneurs. Diagnosis, planning, and tracking of your business, accessible from your smartphone."})]}),e.jsxs("div",{className:"card innovation-card",children:[e.jsx("div",{className:"innovation-icon",children:"🌿"}),e.jsx("div",{className:"badge badge-earth",style:{marginBottom:"0.75rem"},children:r("common.in_development")}),e.jsx("h3",{children:"BioGrowth"}),e.jsx("p",{children:s==="fr"?"Bio-fertilisant liquide innovant, conçu pour les sols ouest-africains. Une solution organique performante pour améliorer vos rendements tout en préservant l'environnement.":"Innovative liquid bio-fertilizer designed for West African soils. A high-performance organic solution to improve your yields while preserving the environment."})]})]})]})}),e.jsx("section",{className:"newsletter-section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"newsletter-inner",children:[e.jsxs("div",{className:"newsletter-text",children:[e.jsx("h2",{children:r("blog.newsletter_cta")}),e.jsx("p",{children:r("blog.newsletter_text")})]}),i?e.jsxs("div",{className:"newsletter-success",children:[e.jsx("span",{children:"✅"}),e.jsx("p",{children:s==="fr"?"Merci pour votre inscription !":"Thank you for subscribing!"})]}):e.jsxs("form",{className:"newsletter-form",onSubmit:d,children:[e.jsx("input",{type:"email",className:"form-input",placeholder:s==="fr"?"Votre adresse e-mail":"Your email address",value:n,onChange:p=>a(p.target.value),required:!0}),e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:l,children:l?"...":s==="fr"?"S'abonner":"Subscribe"})]})]})})})]})}function Se({icon:r,label:t}){return e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-icon",children:r}),e.jsx("span",{className:"stat-label",children:t})]})}function ya({service:r,t}){return e.jsxs("div",{className:"service-card card",children:[e.jsx("div",{className:"service-icon",style:{background:r.color+"15",color:r.color},children:r.icon}),e.jsx("h3",{className:"service-title",children:t(`services.${r.key}.title`)}),e.jsx("p",{className:"service-desc",children:t(`services.${r.key}.desc`)}),e.jsxs(S,{to:"/services",className:"service-link",children:[t(`services.${r.key}.cta`)," →"]})]})}function Br(r,t){document.title=r;const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content",t)}const ja=[{year:"2021",icon:"🌱",fr:"Fondation de GreenFCO le 7 octobre 2021 à Ouagadougou, Burkina Faso.",en:"GreenFCO founded on October 7, 2021 in Ouagadougou, Burkina Faso."},{year:"2022",icon:"🚀",fr:"Déploiement des premières lignes de services — conseil et négoce agricole.",en:"Deployment of first service lines — advisory and agricultural trading."},{year:"2023",icon:"🏅",fr:"Elie Dipama sélectionné Mandela Washington Fellow — YALI, Purdue University. Expansion des activités vers l'Europe.",en:"Elie Dipama selected as Mandela Washington Fellow — YALI, Purdue University. Expansion of activities to Europe."},{year:"2024",icon:"🌍",fr:"Lancement du développement de la plateforme numérique GreenFCO et des outils smart farming.",en:"Launch of GreenFCO digital platform development and smart farming tools."},{year:"2025",icon:"🔬",fr:"Elie Dipama lauréat de l'Alexander von Humboldt Foundation Fellowship — Climate Protection. Partenariat avec Humboldt Universität zu Berlin.",en:"Elie Dipama awarded Alexander von Humboldt Foundation Fellowship — Climate Protection. Partnership with Humboldt Universität zu Berlin."}],Aa=[{key:"durability",icon:"🌿",color:"#1B4332",fr_title:"Durabilité",en_title:"Sustainability",fr_desc:"Chaque action GreenFCO préserve les ressources naturelles pour les générations futures, en intégrant les pratiques agroécologiques au cœur de notre modèle.",en_desc:"Every GreenFCO action preserves natural resources for future generations, integrating agroecological practices at the heart of our model."},{key:"innovation",icon:"💡",color:"#8B5E3C",fr_title:"Innovation",en_title:"Innovation",fr_desc:"Nous combinons les savoirs traditionnels africains et les technologies modernes pour créer des solutions adaptées aux réalités du terrain.",en_desc:"We combine traditional African knowledge and modern technologies to create solutions adapted to field realities."},{key:"impact",icon:"🎯",color:"#52B788",fr_title:"Impact",en_title:"Impact",fr_desc:"Mesurable, concret, humain. GreenFCO agit pour transformer les vies des agriculteurs et des communautés rurales de l'Afrique de l'Ouest.",en_desc:"Measurable, concrete, human. GreenFCO acts to transform the lives of farmers and rural communities in West Africa."}];function wa(){var n;const{t:r,i18n:t}=D(),s=(n=t.language)!=null&&n.startsWith("fr")?"fr":"en";return b.useEffect(()=>{s==="fr"?Br("À Propos | GreenFCO — Notre Histoire et Mission Agro-Environnementale","Découvrez l'histoire, la mission et les fondateurs de GreenFCO. Elie et Elisée Dipama, experts agro-environnementaux, Mandela Washington Fellows et Humboldt Fellows, engagés pour une agriculture durable en Afrique de l'Ouest."):Br("About | GreenFCO — Our Story and Agro-Environmental Mission","Discover the story, mission, and founders of GreenFCO. Elie and Elisée Dipama, agro-environmental experts, Mandela Washington Fellows, and Humboldt Fellows, committed to sustainable agriculture in West Africa.")},[s]),e.jsxs("main",{className:"about-page",children:[e.jsxs("section",{className:"page-hero",children:[e.jsx("div",{className:"page-hero-bg"}),e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"eyebrow",children:r("about.title")}),e.jsx("h1",{children:s==="fr"?"Notre Histoire, Notre Mission":"Our Story, Our Mission"}),e.jsx("p",{children:r("about.subtitle")})]})]}),e.jsx("section",{className:"section mvv-section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"eyebrow",children:r("about.values")}),e.jsx("h2",{children:s==="fr"?"Ce qui nous guide":"What Guides Us"}),e.jsx("div",{className:"divider"})]}),e.jsxs("div",{className:"mvv-grid",children:[e.jsxs("div",{className:"mvv-card",children:[e.jsx("div",{className:"mvv-icon",children:"🌍"}),e.jsx("h3",{children:r("about.mission")}),e.jsx("p",{children:r("about.mission_text")})]}),e.jsxs("div",{className:"mvv-card mvv-card-featured",children:[e.jsx("div",{className:"mvv-icon",children:"🔭"}),e.jsx("h3",{children:r("about.vision")}),e.jsx("p",{children:r("about.vision_text")})]}),e.jsxs("div",{className:"mvv-card",children:[e.jsx("div",{className:"mvv-icon",children:"⚖️"}),e.jsx("h3",{children:r("about.values")}),e.jsxs("ul",{children:[e.jsxs("li",{children:["✦ ",r("about.values_durability")]}),e.jsxs("li",{children:["✦ ",r("about.values_innovation")]}),e.jsxs("li",{children:["✦ ",r("about.values_impact")]})]})]})]}),e.jsx("div",{className:"values-grid",style:{marginTop:"3rem"},children:Aa.map(a=>e.jsxs("div",{className:"value-card card",children:[e.jsx("div",{className:"value-icon",style:{background:a.color+"15",color:a.color},children:a.icon}),e.jsx("h4",{children:s==="fr"?a.fr_title:a.en_title}),e.jsx("p",{children:s==="fr"?a.fr_desc:a.en_desc})]},a.key))})]})}),e.jsx("section",{className:"section founders-section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"eyebrow",children:r("about.founders")}),e.jsx("h2",{children:s==="fr"?"Les Visages de GreenFCO":"The Faces of GreenFCO"}),e.jsx("div",{className:"divider"})]}),e.jsxs("div",{className:"founders-grid",children:[e.jsxs("div",{className:"founder-card card",children:[e.jsx("div",{className:"founder-photo",children:e.jsx("div",{className:"img-placeholder",style:{height:"320px"},children:e.jsx("span",{children:"Photo Elie Dipama — 400×400px"})})}),e.jsxs("div",{className:"founder-content",children:[e.jsx("h3",{children:"Wenmanegda Elie DIPAMA"}),e.jsx("p",{className:"founder-role",children:s==="fr"?"Co-fondateur & Expert Agro-Environnemental":"Co-founder & Agro-Environmental Expert"}),e.jsxs("div",{className:"founder-fellowships",children:[e.jsxs("div",{className:"fellowship-pill",children:[e.jsx("span",{children:"🏅"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Mandela Washington Fellow"}),e.jsx("span",{children:"YALI · Purdue University · 2023"})]})]}),e.jsxs("div",{className:"fellowship-pill fellowship-pill-humboldt",children:[e.jsx("span",{children:"🔬"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Alexander von Humboldt Fellow"}),e.jsx("span",{children:"International Climate Protection · 2025"})]})]}),e.jsxs("div",{className:"fellowship-pill",children:[e.jsx("span",{children:"🎓"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Research Associate"}),e.jsx("span",{children:"SLE · Humboldt Universität zu Berlin"})]})]})]}),e.jsxs("div",{className:"founder-bio",children:[e.jsx("p",{children:s==="fr"?"Agro-économiste et spécialiste en analyse des politiques agricoles et planification de projets, Elie Dipama est l'une des voix montantes de l'agriculture durable en Afrique de l'Ouest. Ses travaux portent sur l'agriculture climato-intelligente, l'agroécologie, la finance carbone et la méthodologie Formation de Formateurs (ToT).":"An agroeconomist and specialist in agricultural policy analysis and project planning, Elie Dipama is one of the rising voices in sustainable agriculture in West Africa. His work focuses on climate-smart agriculture, agroecology, carbon finance, and Training of Trainers (ToT) methodology."}),e.jsx("p",{children:s==="fr"?"Lauréat du prestigieux Fellowship Alexander von Humboldt pour la protection internationale du climat (2025) et ancien Mandela Washington Fellow — YALI (Purdue University, 2023), il incarne la nouvelle génération d'experts africains alliant rigueur académique et engagement de terrain.":"Recipient of the prestigious Alexander von Humboldt Fellowship for International Climate Protection (2025) and former Mandela Washington Fellow — YALI (Purdue University, 2023), he embodies the new generation of African experts combining academic rigor with field commitment."})]}),e.jsxs("div",{className:"founder-expertise",children:[e.jsx("strong",{children:s==="fr"?"Domaines d'expertise :":"Areas of expertise:"}),e.jsx("div",{className:"expertise-tags",children:["Agriculture climato-intelligente","Agroécologie","Finance carbone","Formation de Formateurs","Analyse des politiques agricoles"].map(a=>e.jsx("span",{className:"badge badge-green",children:a},a))})]}),e.jsx("a",{href:"mailto:info@greenfco.com",className:"btn btn-primary btn-sm",children:s==="fr"?"Contacter Elie":"Contact Elie"})]})]}),e.jsxs("div",{className:"founder-card card",children:[e.jsx("div",{className:"founder-photo",children:e.jsx("div",{className:"img-placeholder",style:{height:"320px"},children:e.jsx("span",{children:"Photo Elisée Dipama — 400×400px"})})}),e.jsxs("div",{className:"founder-content",children:[e.jsx("h3",{children:"Wesmanegda Elisée DIPAMA"}),e.jsx("p",{className:"founder-role",children:s==="fr"?"Co-fondateur & Responsable Opérations":"Co-founder & Operations Director"}),e.jsxs("div",{className:"founder-bio",children:[e.jsx("p",{children:s==="fr"?"Jumeau d'Elie et co-fondateur opérationnel de GreenFCO, Elisée Dipama apporte son expertise en agronomie et génie environnemental pour transformer les idées en actions concrètes sur le terrain.":"Elie's twin brother and operational co-founder of GreenFCO, Elisée Dipama brings his expertise in agronomy and environmental engineering to transform ideas into concrete actions in the field."}),e.jsx("p",{children:s==="fr"?"Sa maîtrise des aspects techniques et opérationnels — de la gestion des projets hydro-agricoles au développement des chaînes de valeur agricoles — fait de lui le pilier de l'exécution de la vision GreenFCO.":"His mastery of technical and operational aspects — from hydro-agricultural project management to agricultural value chain development — makes him the pillar of GreenFCO's vision execution."})]}),e.jsxs("div",{className:"founder-expertise",children:[e.jsx("strong",{children:s==="fr"?"Domaines d'expertise :":"Areas of expertise:"}),e.jsx("div",{className:"expertise-tags",children:["Agronomie","Génie Environnemental","Aménagements Hydro-Agricoles","Gestion de projets","Chaînes de valeur"].map(a=>e.jsx("span",{className:"badge badge-green",children:a},a))})]})]})]})]})]})}),e.jsx("section",{className:"section timeline-section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"eyebrow",children:r("about.timeline_title")}),e.jsx("h2",{children:s==="fr"?"Notre Chemin":"Our Path"}),e.jsx("div",{className:"divider"})]}),e.jsx("div",{className:"timeline",children:ja.map((a,i)=>e.jsxs("div",{className:`timeline-item ${i%2===0?"left":"right"}`,children:[e.jsx("div",{className:"timeline-year",children:e.jsx("span",{children:a.year})}),e.jsx("div",{className:"timeline-connector"}),e.jsxs("div",{className:"timeline-content card",children:[e.jsx("span",{className:"timeline-icon",children:a.icon}),e.jsx("p",{children:s==="fr"?a.fr:a.en})]})]},a.year))})]})})]})}function Mr(r,t){document.title=r;const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content",t)}const Na=[{key:"conseil",icon:"🤝",color:"#1B4332",fr_detail:"GreenFCO vous accompagne à chaque étape de la création et du développement de votre entreprise agricole ou agri-alimentaire. De l'étude de faisabilité à la mise en place des outils de gestion, notre équipe d'experts est à vos côtés. Linked to Koob Assist — notre application mobile d'assistance conseil (en développement).",en_detail:"GreenFCO supports you at every stage of creating and developing your agricultural or agri-food business. From feasibility studies to implementing management tools, our team of experts is by your side. Linked to Koob Assist — our mobile advisory app (in development).",tags_fr:["Business Plan","Étude de faisabilité","Accompagnement PME","Koob Assist App"],tags_en:["Business Plan","Feasibility Study","SME Support","Koob Assist App"]},{key:"negoce",icon:"🌾",color:"#2D6A4F",fr_detail:"Nous facilitons le commerce de produits agricoles et agri-alimentaires de qualité entre producteurs, acheteurs et marchés. Spécialité dans les produits maraichers : oignons, pommes de terre et autres cultures à haute valeur commerciale.",en_detail:"We facilitate the trade of quality agricultural and agri-food products between producers, buyers, and markets. Specializing in market garden products: onions, potatoes, and other high-value commercial crops.",tags_fr:["Oignons","Pommes de terre","Mise en marché","Commerce équitable"],tags_en:["Onions","Potatoes","Market access","Fair trade"]},{key:"formations",icon:"📚",color:"#52B788",fr_detail:"Des formations certifiantes animées par des experts reconnus, adaptées aux réalités du terrain africain. Trois filières : Agriculture Durable (pratiques agroécologiques), Agriculture Intelligente (smart farming, IoT, data), Agriculture Hors-sol (hydroponie, aquaponie). Formation de Formateurs (ToT) disponible.",en_detail:"Certified training led by recognized experts, adapted to African field realities. Three tracks: Sustainable Agriculture (agroecological practices), Smart Agriculture (smart farming, IoT, data), Soilless Agriculture (hydroponics, aquaponics). Training of Trainers (ToT) available.",tags_fr:["Agriculture Durable","Agriculture Intelligente","Agriculture Hors-sol","Formation de Formateurs"],tags_en:["Sustainable Agriculture","Smart Agriculture","Soilless Agriculture","Training of Trainers"]},{key:"etudes",icon:"🔬",color:"#8B5E3C",fr_detail:"Des études rigoureuses pour éclairer vos décisions. Études d'impact environnemental, études de marché sectorielles, analyses de filières agricoles. Basées sur des méthodes éprouvées et une connaissance approfondie du contexte west-africain.",en_detail:"Rigorous studies to inform your decisions. Environmental impact studies, sectoral market research, agricultural value chain analyses. Based on proven methods and deep knowledge of the West African context.",tags_fr:["Études environnementales","Études de marché","Analyse de filières","Rapports sectoriels"],tags_en:["Environmental studies","Market research","Value chain analysis","Sectoral reports"]},{key:"hydro",icon:"💧",color:"#2D6A4F",fr_detail:"Conception, planification et réalisation d'aménagements hydro-agricoles durables. Maîtrise de l'eau pour une agriculture productive même en période de sécheresse. Solutions adaptées aux zones sahéliennes et soudano-sahéliennes.",en_detail:"Design, planning, and implementation of sustainable hydro-agricultural developments. Water management for productive agriculture even in drought periods. Solutions adapted to Sahelian and Sudano-Sahelian zones.",tags_fr:["Périmètres irrigués","Gestion de l'eau","Zones sahéliennes","Infrastructures rurales"],tags_en:["Irrigated perimeters","Water management","Sahelian zones","Rural infrastructure"]},{key:"intrants",icon:"🌱",color:"#1B4332",fr_detail:"Fourniture d'intrants agricoles de qualité pour améliorer vos rendements de manière durable. Produit phare en développement : BioGrowth — bio-fertilisant liquide innovant formulé pour les sols ouest-africains. Solutions organiques en priorité, alignées avec notre vision agroécologique.",en_detail:"Supply of quality agricultural inputs to improve your yields sustainably. Flagship product in development: BioGrowth — innovative liquid bio-fertilizer formulated for West African soils. Organic solutions prioritized, aligned with our agroecological vision.",tags_fr:["BioGrowth bio-fertilisant","Semences sélectionnées","Intrants bio","Solutions organiques"],tags_en:["BioGrowth bio-fertilizer","Selected seeds","Bio inputs","Organic solutions"]},{key:"projets",icon:"📋",color:"#52B788",fr_detail:"Développement de projets agricoles et agro-environnementaux bancables, du concept à la mise en œuvre. Études de marché, montage financier, recherche de partenaires et accompagnement à la levée de fonds. Expertise en financement carbone et projets d'impact.",en_detail:"Development of bankable agricultural and agro-environmental projects, from concept to implementation. Market studies, financial structuring, partner research, and fundraising support. Expertise in carbon finance and impact projects.",tags_fr:["Montage de projets","Financement carbone","Partenariats","Levée de fonds"],tags_en:["Project structuring","Carbon finance","Partnerships","Fundraising"]}];function Ca(){var n;const{t:r,i18n:t}=D(),s=(n=t.language)!=null&&n.startsWith("fr")?"fr":"en";return b.useEffect(()=>{s==="fr"?Mr("Services | GreenFCO — 7 Lignes de Services Agro-Environnementaux","GreenFCO offre 7 services intégrés : conseil agricole, négoce de produits agricoles, formations certifiantes, études environnementales, aménagements hydro-agricoles, intrants bio et développement de projets. Burkina Faso, Afrique de l'Ouest."):Mr("Services | GreenFCO — 7 Integrated Agro-Environmental Service Lines","GreenFCO offers 7 integrated services: agricultural advisory, commodity trading, certified training, environmental studies, hydro-agricultural development, bio-inputs, and project development. Burkina Faso, West Africa.")},[s]),e.jsxs("main",{className:"services-page",children:[e.jsxs("section",{className:"page-hero",children:[e.jsx("div",{className:"page-hero-bg"}),e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"eyebrow",children:r("services.title")}),e.jsx("h1",{children:s==="fr"?"7 Lignes de Services Intégrés":"7 Integrated Service Lines"}),e.jsx("p",{children:r("services.subtitle")})]})]}),e.jsx("section",{className:"section",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"services-list",children:Na.map((a,i)=>e.jsx(Sa,{service:a,index:i,t:r,lang:s},a.key))})})}),e.jsx("section",{className:"section innovation-spotlight",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{className:"eyebrow",children:"Innovation en cours"}),e.jsx("h2",{children:s==="fr"?"Nos Produits en Développement":"Our Products in Development"}),e.jsx("div",{className:"divider"})]}),e.jsxs("div",{className:"grid-2",children:[e.jsxs("div",{className:"innovation-product-card card",children:[e.jsx("div",{className:"product-status",children:e.jsx("span",{className:"badge badge-earth",children:s==="fr"?"📱 App Mobile — Bientôt":"📱 Mobile App — Coming Soon"})}),e.jsx("h3",{children:"Koob Assist"}),e.jsx("p",{children:s==="fr"?"Application mobile d'assistance-conseil pour agripreneurs. Diagnostics, plans d'affaires, suivi de gestion — tout depuis votre téléphone. Connectée à notre réseau d'experts GreenFCO.":"Mobile advisory app for agripreneurs. Diagnostics, business plans, management tracking — all from your phone. Connected to our GreenFCO expert network."}),e.jsx("div",{className:"product-features",children:(s==="fr"?["Diagnostic entreprise","Plan d'affaires guidé","Suivi de gestion","Réseau d'experts"]:["Business diagnostic","Guided business plan","Management tracking","Expert network"]).map(a=>e.jsx("span",{className:"badge badge-green",children:a},a))})]}),e.jsxs("div",{className:"innovation-product-card card",children:[e.jsx("div",{className:"product-status",children:e.jsx("span",{className:"badge badge-earth",children:s==="fr"?"🌿 Produit — En développement":"🌿 Product — In Development"})}),e.jsx("h3",{children:"BioGrowth"}),e.jsx("p",{children:s==="fr"?"Bio-fertilisant liquide innovant formulé pour les sols et cultures de l'Afrique de l'Ouest. Solution organique performante pour améliorer la fertilité des sols et augmenter les rendements durablement.":"Innovative liquid bio-fertilizer formulated for West African soils and crops. High-performance organic solution to improve soil fertility and sustainably increase yields."}),e.jsx("div",{className:"product-features",children:(s==="fr"?["100% Organique","Adapté sols africains","Certifié agroécologie","Rendement +30%*"]:["100% Organic","Adapted for African soils","Agroecology certified","Yield +30%*"]).map(a=>e.jsx("span",{className:"badge badge-green",children:a},a))}),s==="fr"?e.jsx("p",{className:"product-disclaimer",children:"*Résultats préliminaires, en cours de validation."}):e.jsx("p",{className:"product-disclaimer",children:"*Preliminary results, under validation."})]})]})]})}),e.jsx("section",{className:"services-cta-section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"cta-box",children:[e.jsx("h2",{children:s==="fr"?"Prêt à travailler avec nous ?":"Ready to work with us?"}),e.jsx("p",{children:s==="fr"?"Discutons de votre projet. Notre équipe est disponible pour vous accompagner.":"Let's discuss your project. Our team is available to support you."}),e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"},children:[e.jsx(S,{to:"/consulting",className:"btn btn-primary btn-lg",children:s==="fr"?"Réserver une consultation":"Book a consultation"}),e.jsx("a",{href:"/contact",className:"btn btn-secondary btn-lg",children:s==="fr"?"Contactez-nous":"Contact us"}),e.jsx("a",{href:"https://wa.me/22600000000",target:"_blank",rel:"noreferrer",className:"btn btn-whatsapp btn-lg",children:"💬 WhatsApp"})]})]})})})]})}function Sa({service:r,index:t,t:s,lang:n}){const a=t%2===0;return e.jsxs("div",{className:`service-detail-card card ${a?"":"card-accent"}`,id:`service-${r.key}`,children:[e.jsxs("div",{className:"service-detail-number",children:["0",t+1]}),e.jsx("div",{className:"service-detail-icon",style:{background:r.color+"15",color:r.color},children:r.icon}),e.jsxs("div",{className:"service-detail-body",children:[e.jsx("h2",{children:s(`services.${r.key}.title`)}),e.jsx("p",{children:n==="fr"?r.fr_detail:r.en_detail}),e.jsx("div",{className:"service-detail-tags",children:(n==="fr"?r.tags_fr:r.tags_en).map(i=>e.jsx("span",{className:"badge badge-green",children:i},i))}),r.key==="conseil"?e.jsxs(S,{to:"/consulting",className:"btn btn-secondary btn-sm",style:{alignSelf:"flex-start"},children:[s(`services.${r.key}.cta`)," →"]}):e.jsxs("a",{href:"/contact",className:"btn btn-secondary btn-sm",style:{alignSelf:"flex-start"},children:[s(`services.${r.key}.cta`)," →"]})]})]})}const _a=["Bénin","Burkina Faso","Cameroun","Côte d'Ivoire","Gambie","Ghana","Guinée","Guinée-Bissau","Liberia","Mali","Mauritanie","Niger","Nigeria","Sénégal","Sierra Leone","Togo","Afrique du Sud","Kenya","Éthiopie","Tanzanie","Rwanda","France","Belgique","Canada","Autre / Other"],Ze=[{key:"sol",icon:"🌱",fr:"Analyse de sol & fertilité",en:"Soil & Fertility Analysis",duration:"30 min",price_fr:"Gratuit — 1ère session",price_en:"Free — 1st session",free:!0,desc_fr:"Évaluation complète de vos sols pour optimiser la fertilité et les rendements.",desc_en:"Complete evaluation of your soils to optimize fertility and yields."},{key:"business",icon:"📋",fr:"Plan d'affaires agricole",en:"Agricultural Business Plan",duration:"60 min",price_fr:"15 000 FCFA",price_en:"15,000 FCFA",free:!1,desc_fr:"Élaboration d'un plan d'affaires solide pour votre projet agro-entrepreneurial.",desc_en:"Development of a solid business plan for your agro-entrepreneurial project."},{key:"irrigation",icon:"💧",fr:"Stratégie d'irrigation",en:"Irrigation Strategy",duration:"45 min",price_fr:"10 000 FCFA",price_en:"10,000 FCFA",free:!1,desc_fr:"Conception de systèmes d'irrigation adaptés à votre contexte et à vos ressources.",desc_en:"Design of irrigation systems adapted to your context and resources."},{key:"cultures",icon:"🌾",fr:"Gestion des cultures",en:"Crop Management",duration:"45 min",price_fr:"12 000 FCFA",price_en:"12,000 FCFA",free:!1,desc_fr:"Stratégies de gestion pour maximiser vos rendements de manière durable.",desc_en:"Management strategies to maximize your yields sustainably."}],Fa=["08:00","09:00","10:00","11:00","14:00","15:00","16:00"],ka=[{icon:"🌍",fr_title:"Expertise locale",en_title:"Local expertise",fr_desc:"Nos experts connaissent les réalités agro-climatiques et économiques de l'Afrique de l'Ouest.",en_desc:"Our experts know the agro-climatic and economic realities of West Africa."},{icon:"📅",fr_title:"Disponibilité",en_title:"Availability",fr_desc:"Sessions disponibles 6 jours sur 7, en Français et en Anglais, en présentiel ou à distance.",en_desc:"Sessions available 6 days a week, in French and English, in person or remotely."},{icon:"✅",fr_title:"Résultats prouvés",en_title:"Proven results",fr_desc:"Des centaines d'agripreneurs accompagnés, avec des améliorations mesurables de rentabilité.",en_desc:"Hundreds of agripreneurs supported, with measurable profitability improvements."}],zr={name:"",email:"",phone:"",country:"",service:"",date:"",time:"",message:"",language:"fr"};function Ea(){var N;const{i18n:r}=D(),t=(N=r.language)!=null&&N.startsWith("fr")?"fr":"en",[s,n]=b.useState({...zr,language:t}),[a,i]=b.useState({}),[o,l]=b.useState(!1),[u,d]=b.useState(!1),[c,p]=b.useState(null),x=new Date().toISOString().split("T")[0];function f(h){const{name:y,value:_}=h.target;n(E=>({...E,[y]:_})),a[y]&&i(E=>({...E,[y]:""}))}function A(){const h={};return s.name.trim()||(h.name=t==="fr"?"Nom requis":"Name required"),s.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)||(h.email=t==="fr"?"Email invalide":"Invalid email"):h.email=t==="fr"?"Email requis":"Email required",s.phone.trim()||(h.phone=t==="fr"?"Téléphone requis":"Phone required"),s.country||(h.country=t==="fr"?"Pays requis":"Country required"),s.service||(h.service=t==="fr"?"Service requis":"Service required"),s.date||(h.date=t==="fr"?"Date requise":"Date required"),s.time||(h.time=t==="fr"?"Créneau requis":"Time slot required"),h}function v(h){h.preventDefault();const y=A();if(Object.keys(y).length>0){i(y);return}d(!0),setTimeout(()=>{const _={...s,id:`consult_${Date.now()}`,createdAt:new Date().toISOString(),status:"pending"};try{const E=JSON.parse(localStorage.getItem("greenfco_consulting_requests")||"[]");E.push(_),localStorage.setItem("greenfco_consulting_requests",JSON.stringify(E))}catch{}p(_),l(!0),d(!1)},600)}function g(){n({...zr,language:t}),i({}),l(!1),p(null)}const j=Ze.find(h=>h.key===s.service);return e.jsxs("main",{className:"consulting-page",children:[e.jsx("section",{className:"consulting-hero",children:e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"eyebrow",children:t==="fr"?"Consultation Agro-Environnementale":"Agro-Environmental Consulting"}),e.jsx("h1",{children:t==="fr"?"Réservez une Session avec nos Experts":"Book a Session with our Experts"}),e.jsx("p",{children:t==="fr"?"Réservez une session avec nos experts en agriculture durable et transformez votre projet agricole.":"Book a session with our sustainable agriculture experts and transform your agricultural project."}),e.jsxs("div",{className:"hero-badges",children:[e.jsxs("span",{className:"hero-badge",children:["🕐 ",t==="fr"?"Réponse sous 24h":"Response within 24h"]}),e.jsxs("span",{className:"hero-badge",children:["🌍 ",t==="fr"?"Français & Anglais":"French & English"]}),e.jsxs("span",{className:"hero-badge",children:["💻 ",t==="fr"?"En ligne ou présentiel":"Online or in-person"]})]})]})}),e.jsx("section",{className:"consulting-services-section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",style:{textAlign:"center"},children:[e.jsx("span",{className:"eyebrow",children:t==="fr"?"Nos services":"Our services"}),e.jsx("h2",{children:t==="fr"?"Choisissez votre type de consultation":"Choose your consultation type"}),e.jsx("div",{className:"divider"})]}),e.jsx("div",{className:"consulting-services-grid",children:Ze.map(h=>e.jsxs("div",{className:"consulting-service-card",onClick:()=>n(y=>({...y,service:h.key})),role:"button",tabIndex:0,onKeyDown:y=>{(y.key==="Enter"||y.key===" ")&&n(_=>({..._,service:h.key}))},style:s.service===h.key?{borderColor:"#1B4332",boxShadow:"0 8px 28px rgba(27,67,50,0.18)"}:{},children:[e.jsx("div",{className:"csc-icon",children:h.icon}),e.jsx("h3",{className:"csc-title",children:t==="fr"?h.fr:h.en}),e.jsxs("div",{className:"csc-duration",children:["⏱ ",h.duration]}),e.jsx("p",{className:"csc-desc",children:t==="fr"?h.desc_fr:h.desc_en}),e.jsx("span",{className:`csc-price${h.free?" free":""}`,children:t==="fr"?h.price_fr:h.price_en})]},h.key))})]})}),e.jsx("section",{className:"consulting-booking-section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"consulting-layout",children:[e.jsxs("div",{className:"consulting-info-col",children:[e.jsx("h2",{children:t==="fr"?"Comment ça marche ?":"How does it work?"}),e.jsx("p",{children:t==="fr"?"Remplissez le formulaire de réservation. Notre équipe examinera votre demande et vous contactera pour confirmer la date et les détails de la session.":"Fill in the booking form. Our team will review your request and contact you to confirm the date and session details."}),e.jsx("div",{className:"info-steps",children:(t==="fr"?["Remplissez le formulaire avec vos coordonnées et le service souhaité.","Notre équipe vous contacte sous 24 heures pour confirmer.","Participez à votre session de consultation personnalisée.","Recevez un rapport de recommandations et un plan d'action."]:["Fill in the form with your details and desired service.","Our team contacts you within 24 hours to confirm.","Participate in your personalized consultation session.","Receive a recommendations report and action plan."]).map((h,y)=>e.jsxs("div",{className:"info-step",children:[e.jsx("div",{className:"step-num",children:y+1}),e.jsx("p",{children:h})]},y))})]}),e.jsx("div",{className:"consulting-form-card",children:o?e.jsxs("div",{className:"success-message",children:[e.jsx("div",{className:"success-checkmark",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M4 12l6 6L20 6"})})}),e.jsx("h3",{children:t==="fr"?"Demande soumise avec succès !":"Request submitted successfully!"}),e.jsx("p",{children:t==="fr"?"Votre demande a été soumise ! Notre équipe vous contactera sous 24h pour confirmer votre rendez-vous.":"Your request has been submitted! Our team will contact you within 24h to confirm your appointment."}),c&&e.jsxs("div",{className:"success-meta",children:[e.jsxs("span",{children:["👤 ",c.name]}),e.jsxs("span",{children:["📧 ",c.email]}),j&&e.jsxs("span",{children:["🌿 ",t==="fr"?j.fr:j.en]}),e.jsxs("span",{children:["📅 ",c.date," — ",c.time]})]}),e.jsxs("div",{className:"success-actions",children:[e.jsx("button",{className:"btn-reset",onClick:g,children:t==="fr"?"Nouvelle réservation":"New booking"}),e.jsx(S,{to:"/services",className:"btn-outline-green",children:t==="fr"?"Voir nos services":"View our services"})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"form-card-title",children:["📅 ",t==="fr"?"Réserver une consultation":"Book a consultation"]}),e.jsxs("form",{className:"consulting-form",onSubmit:v,noValidate:!0,children:[e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[t==="fr"?"Nom complet":"Full name",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"text",name:"name",className:`form-input${a.name?" error":""}`,value:s.name,onChange:f,placeholder:"Jean Ouédraogo"}),a.name&&e.jsx("span",{className:"field-error",children:a.name})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Email",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"email",name:"email",className:`form-input${a.email?" error":""}`,value:s.email,onChange:f,placeholder:"jean@email.com"}),a.email&&e.jsx("span",{className:"field-error",children:a.email})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[t==="fr"?"Téléphone":"Phone number",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"tel",name:"phone",className:`form-input${a.phone?" error":""}`,value:s.phone,onChange:f,placeholder:"+226 70 00 00 00"}),a.phone&&e.jsx("span",{className:"field-error",children:a.phone})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[t==="fr"?"Pays":"Country",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("select",{name:"country",className:`form-select${a.country?" error":""}`,value:s.country,onChange:f,children:[e.jsx("option",{value:"",children:t==="fr"?"— Sélectionner —":"— Select —"}),_a.map(h=>e.jsx("option",{value:h,children:h},h))]}),a.country&&e.jsx("span",{className:"field-error",children:a.country})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[t==="fr"?"Type de consultation":"Consultation type",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("select",{name:"service",className:`form-select${a.service?" error":""}`,value:s.service,onChange:f,children:[e.jsx("option",{value:"",children:t==="fr"?"— Choisir un service —":"— Choose a service —"}),Ze.map(h=>e.jsxs("option",{value:h.key,children:[t==="fr"?h.fr:h.en," (",h.duration," — ",t==="fr"?h.price_fr:h.price_en,")"]},h.key))]}),a.service&&e.jsx("span",{className:"field-error",children:a.service})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[t==="fr"?"Date souhaitée":"Preferred date",e.jsx("span",{className:"req",children:"*"})]}),e.jsx("input",{type:"date",name:"date",className:`form-input${a.date?" error":""}`,value:s.date,min:x,onChange:f}),a.date&&e.jsx("span",{className:"field-error",children:a.date})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[t==="fr"?"Créneau horaire":"Time slot",e.jsx("span",{className:"req",children:"*"})]}),e.jsxs("select",{name:"time",className:`form-select${a.time?" error":""}`,value:s.time,onChange:f,children:[e.jsx("option",{value:"",children:t==="fr"?"— Choisir —":"— Choose —"}),Fa.map(h=>e.jsx("option",{value:h,children:h},h))]}),a.time&&e.jsx("span",{className:"field-error",children:a.time})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Description / Message"}),e.jsx("textarea",{name:"message",className:"form-textarea",value:s.message,onChange:f,placeholder:t==="fr"?"Décrivez votre situation, vos objectifs ou vos questions...":"Describe your situation, objectives, or questions...",rows:3})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:t==="fr"?"Langue préférée":"Language preference"}),e.jsxs("div",{className:"lang-toggle",children:[e.jsx("button",{type:"button",className:`lang-btn${s.language==="fr"?" active":""}`,onClick:()=>n(h=>({...h,language:"fr"})),children:"Français"}),e.jsx("button",{type:"button",className:`lang-btn${s.language==="en"?" active":""}`,onClick:()=>n(h=>({...h,language:"en"})),children:"English"})]})]}),e.jsx("button",{type:"submit",className:"submit-btn",disabled:u,children:u?t==="fr"?"Envoi en cours...":"Sending...":t==="fr"?"📅 Soumettre ma demande":"📅 Submit my request"})]})]})})]})})}),e.jsx("section",{className:"consulting-why-section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header",style:{textAlign:"center"},children:[e.jsx("span",{className:"eyebrow",style:{background:"rgba(255,255,255,0.15)",color:"#B7E4C7",border:"1px solid rgba(255,255,255,0.2)"},children:t==="fr"?"Pourquoi nous choisir":"Why choose us"}),e.jsx("h2",{style:{color:"#fff"},children:t==="fr"?"L'expertise GreenFCO à votre service":"GreenFCO expertise at your service"}),e.jsx("div",{className:"divider",style:{background:"rgba(255,255,255,0.3)"}})]}),e.jsx("div",{className:"why-grid",children:ka.map((h,y)=>e.jsxs("div",{className:"why-card",children:[e.jsx("span",{className:"why-icon",children:h.icon}),e.jsx("h3",{children:t==="fr"?h.fr_title:h.en_title}),e.jsx("p",{children:t==="fr"?h.fr_desc:h.en_desc})]},y))})]})})]})}function Gr(r,t){document.title=r;const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content",t)}const er=[{slug:"interview-elie-dipama-lefaso",title_fr:"L'Agriculture Intelligente au Burkina Faso : Vision et Ambition de GreenFCO",title_en:"Smart Agriculture in Burkina Faso: GreenFCO's Vision and Ambition",excerpt_fr:"Dans une interview accordée à Lefaso.net, Elie Dipama, co-fondateur de GreenFCO et Fellow Humboldt 2025, partage sa vision pour une agriculture durable et innovante en Afrique de l'Ouest, son parcours exceptionnel et les projets de GreenFCO.",excerpt_en:"In an interview given to Lefaso.net, Elie Dipama, co-founder of GreenFCO and 2025 Humboldt Fellow, shares his vision for sustainable and innovative agriculture in West Africa, his exceptional journey, and GreenFCO's projects.",category:"Actualités",author:"Wenmanegda Elie DIPAMA",date:"2024-03-15",featured:!0,readTime:"8 min"},{slug:"agroecologie-burkina-faso-enjeux",title_fr:"Agroécologie au Burkina Faso : Enjeux et Perspectives pour 2025",title_en:"Agroecology in Burkina Faso: Challenges and Prospects for 2025",excerpt_fr:"Le Burkina Faso fait face à des défis climatiques et sécuritaires sans précédent. L'agroécologie émerge comme une réponse adaptée aux réalités du terrain sahélien.",excerpt_en:"Burkina Faso faces unprecedented climate and security challenges. Agroecology is emerging as a response adapted to Sahelian field realities.",category:"Agriculture Durable",author:"GreenFCO Team",date:"2024-04-10",featured:!1,readTime:"6 min"},{slug:"finance-carbone-afrique-opportunites",title_fr:"Finance Carbone en Afrique de l'Ouest : Opportunités pour les Agriculteurs",title_en:"Carbon Finance in West Africa: Opportunities for Farmers",excerpt_fr:"Les marchés volontaires du carbone ouvrent de nouvelles sources de revenus pour les agriculteurs africains pratiquant l'agroforesterie et les pratiques régénératives.",excerpt_en:"Voluntary carbon markets open new revenue streams for African farmers practicing agroforestry and regenerative practices.",category:"Recherche & Innovation",author:"Wenmanegda Elie DIPAMA",date:"2024-05-22",featured:!1,readTime:"7 min"},{slug:"faidherbia-albida-sahel",title_fr:"Faidherbia Albida : L'Arbre du Sahel qui Nourrit les Champs",title_en:"Faidherbia Albida: The Sahel Tree that Feeds the Fields",excerpt_fr:"Cette espèce agroforestière emblématique du Sahel joue un rôle crucial dans la fertilité des sols et l'adaptation au changement climatique. Un guide pratique.",excerpt_en:"This emblematic Sahelian agroforestry species plays a crucial role in soil fertility and climate change adaptation. A practical guide.",category:"Environnement",author:"GreenFCO Team",date:"2024-06-08",featured:!1,readTime:"5 min"},{slug:"agroecologie-sahel-changement-climatique",title_fr:"L'agroécologie au Sahel : solutions face au changement climatique",title_en:"Agroecology in the Sahel: Solutions for Climate Change",excerpt_fr:"Face à des pluies de plus en plus imprévisibles et des sols dégradés, les techniques agroécologiques offrent aux agriculteurs sahéliens des réponses concrètes et abordables. Découvrez les pratiques qui transforment les exploitations de la région.",excerpt_en:"As rainfall becomes increasingly unpredictable and soils degrade, agroecological techniques offer Sahelian farmers concrete and affordable solutions. Discover the practices transforming farms across the region.",category:"Agroécologie",author:"Aminata Sawadogo",date:"2025-11-10",featured:!1,readTime:"6 min"},{slug:"prix-cereales-afrique-ouest-2026",title_fr:"Prix des céréales en Afrique de l'Ouest : analyse et perspectives 2026",title_en:"Cereal Prices in West Africa: Analysis and 2026 Outlook",excerpt_fr:"Le marché des céréales en Afrique de l'Ouest traverse une période de forte volatilité. Entre déficits pluviométriques, perturbations logistiques et demande urbaine croissante, les prix du mil, sorgho et maïs atteignent des niveaux préoccupants.",excerpt_en:"West Africa's cereal market is experiencing significant volatility. Between rainfall deficits, logistical disruptions, and growing urban demand, millet, sorghum, and maize prices are reaching concerning levels.",category:"Marché",author:"Oumarou Traoré",date:"2025-12-05",featured:!1,readTime:"7 min"},{slug:"drones-agricoles-surveillance-cultures",title_fr:"Les drones agricoles révolutionnent la surveillance des cultures",title_en:"Agricultural Drones Revolutionize Crop Monitoring",excerpt_fr:"En Afrique de l'Ouest, les drones agricoles commencent à transformer la gestion des exploitations. De la cartographie des parcelles à la détection précoce des maladies, cette technologie est désormais accessible aux coopératives et aux agripreneurs.",excerpt_en:"In West Africa, agricultural drones are starting to transform farm management. From plot mapping to early disease detection, this technology is now accessible to cooperatives and agripreneurs.",category:"Innovation",author:"Kofi Mensah",date:"2026-01-18",featured:!1,readTime:"5 min"},{slug:"financement-agricole-petits-exploitants",title_fr:"Financement agricole : nouvelles opportunités pour les petits exploitants",title_en:"Agricultural Financing: New Opportunities for Smallholder Farmers",excerpt_fr:"L'accès au crédit reste l'un des principaux freins au développement agricole en Afrique subsaharienne. Microfinance, fonds de garantie, financement participatif et crédit-carbone : un panorama des solutions qui émergent pour les petits producteurs.",excerpt_en:"Access to credit remains one of the main barriers to agricultural development in sub-Saharan Africa. Microfinance, guarantee funds, crowdfunding, and carbon credits: an overview of emerging solutions for smallholder farmers.",category:"Financement",author:"Fatoumata Diallo",date:"2026-02-07",featured:!1,readTime:"6 min"},{slug:"sesame-burkina-faso-chaine-valeur",title_fr:"La chaîne de valeur du sésame burkinabè : opportunités d'export",title_en:"The Burkinabe Sesame Value Chain: Export Opportunities",excerpt_fr:"Le Burkina Faso est l'un des premiers producteurs de sésame en Afrique de l'Ouest, avec plus de 400 000 tonnes par an. Pourtant, la majeure partie est exportée sans transformation. Analyse des opportunités pour créer plus de valeur localement.",excerpt_en:"Burkina Faso is one of West Africa's leading sesame producers, with over 400,000 tonnes per year. Yet most is exported unprocessed. Analysis of opportunities to create more value locally.",category:"Export",author:"Wendyam Compaoré",date:"2026-02-25",featured:!1,readTime:"7 min"},{slug:"irrigation-goutte-a-goutte-saison-seche",title_fr:"Irrigation goutte-à-goutte : économiser l'eau en saison sèche",title_en:"Drip Irrigation: Saving Water in the Dry Season",excerpt_fr:"Avec une saison sèche qui s'allonge et des ressources en eau qui se raréfient, l'irrigation goutte-à-goutte s'impose comme une solution incontournable pour les maraîchers de l'Afrique de l'Ouest. Guide technique et économique.",excerpt_en:"With a lengthening dry season and increasingly scarce water resources, drip irrigation is becoming an essential solution for West African market gardeners. A technical and economic guide.",category:"Irrigation",author:"Ibrahim Coulibaly",date:"2026-03-14",featured:!1,readTime:"5 min"},{slug:"marches-numeriques-agricoles-vendre-en-ligne",title_fr:"Marchés numériques agricoles : comment vendre en ligne",title_en:"Digital Agricultural Markets: How to Sell Online",excerpt_fr:"Les plateformes numériques agricoles se multiplient en Afrique de l'Ouest et offrent aux producteurs un accès direct aux acheteurs, sans intermédiaire. Présentation des outils disponibles et conseils pratiques pour se lancer.",excerpt_en:"Digital agricultural platforms are multiplying across West Africa, giving producers direct access to buyers without intermediaries. An overview of available tools and practical advice for getting started.",category:"Numérique",author:"Aicha Sow",date:"2026-04-02",featured:!1,readTime:"6 min"},{slug:"agroforesterie-arbres-rendements",title_fr:"Agroforesterie : planter des arbres pour améliorer les rendements",title_en:"Agroforestry: Planting Trees to Improve Yields",excerpt_fr:"L'intégration d'arbres dans les systèmes agricoles n'est pas une contrainte mais une opportunité : fertilité accrue, microclimats favorables, diversification des revenus. Retours d'expériences de producteurs au Sahel et en zone soudanienne.",excerpt_en:"Integrating trees into farming systems is not a constraint but an opportunity: improved fertility, favorable microclimates, and diversified income. Feedback from producers in the Sahel and Sudanian zone.",category:"Agroforesterie",author:"Seydou Ouédraogo",date:"2026-05-12",featured:!1,readTime:"6 min"}],Ur=["Tous","Actualités","Recherche & Innovation","Agriculture Durable","Environnement","Agroécologie","Marché","Innovation","Financement","Export","Irrigation","Numérique","Agroforesterie"];function Oa(){var x;const{t:r,i18n:t}=D(),s=(x=t.language)!=null&&x.startsWith("fr")?"fr":"en",[n,a]=b.useState("Tous"),[i,o]=b.useState(""),[l,u]=b.useState(!1);b.useEffect(()=>{s==="fr"?Gr("Blog | GreenFCO — Agriculture Durable, Agroécologie & Innovation en Afrique","Articles et analyses sur l'agriculture durable, l'agroécologie, la finance carbone, l'innovation agricole et le développement rural en Afrique de l'Ouest par les experts de GreenFCO."):Gr("Blog | GreenFCO — Sustainable Agriculture, Agroecology & Innovation in Africa","Articles and analysis on sustainable agriculture, agroecology, carbon finance, agricultural innovation, and rural development in West Africa by GreenFCO experts.")},[s]);const d=er.find(f=>f.featured),c=er.filter(f=>!f.featured&&(n==="Tous"||f.category===n));function p(f){f.preventDefault(),u(!0)}return e.jsxs("main",{className:"blog-page",children:[e.jsxs("section",{className:"page-hero",children:[e.jsx("div",{className:"page-hero-bg"}),e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"eyebrow",children:"Blog"}),e.jsx("h1",{children:r("blog.title")}),e.jsx("p",{children:r("blog.subtitle")})]})]}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container blog-layout",children:[e.jsxs("div",{className:"blog-main",children:[d&&e.jsxs("div",{className:"featured-article card",children:[e.jsx("div",{className:"featured-badge",children:e.jsxs("span",{children:["⭐ ",s==="fr"?"Article à la une":"Featured article"]})}),e.jsx("div",{className:"featured-image",children:e.jsx("div",{className:"img-placeholder",style:{height:"300px"},children:e.jsx("span",{children:s==="fr"?"Image article — 800×400px":"Article image — 800×400px"})})}),e.jsxs("div",{className:"featured-content",children:[e.jsxs("div",{className:"article-meta",children:[e.jsx("span",{className:"badge badge-green",children:d.category}),e.jsx("span",{className:"article-date",children:new Date(d.date).toLocaleDateString(s==="fr"?"fr-FR":"en-US",{year:"numeric",month:"long",day:"numeric"})}),e.jsxs("span",{className:"article-read-time",children:["⏱ ",d.readTime]})]}),e.jsx("h2",{children:d[`title_${s}`]}),e.jsx("p",{children:d[`excerpt_${s}`]}),e.jsxs("div",{className:"article-footer",children:[e.jsxs("div",{className:"article-author",children:[e.jsx("div",{className:"author-avatar",children:d.author.charAt(0)}),e.jsx("span",{children:d.author})]}),e.jsxs(S,{to:`/blog/${d.slug}`,className:"btn btn-primary btn-sm",children:[r("blog.read_more")," →"]})]})]})]}),e.jsx("div",{className:"category-filter",children:Ur.map(f=>e.jsx("button",{className:`filter-btn ${n===f?"active":""}`,onClick:()=>a(f),children:f==="Tous"?r("blog.categories.all"):f},f))}),e.jsx("div",{className:"articles-grid",children:c.map(f=>e.jsx(qa,{article:f,lang:s,t:r},f.slug))})]}),e.jsxs("aside",{className:"blog-sidebar",children:[e.jsxs("div",{className:"sidebar-widget card",children:[e.jsx("h3",{children:r("blog.newsletter_cta")}),e.jsx("p",{children:r("blog.newsletter_text")}),l?e.jsxs("p",{className:"success-msg",children:["✅ ",s==="fr"?"Merci !":"Thank you!"]}):e.jsxs("form",{onSubmit:p,children:[e.jsx("input",{type:"email",className:"form-input",placeholder:s==="fr"?"Votre e-mail":"Your email",value:i,onChange:f=>o(f.target.value),required:!0,style:{marginBottom:"0.75rem"}}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{width:"100%"},children:s==="fr"?"S'abonner":"Subscribe"})]})]}),e.jsxs("div",{className:"sidebar-widget card",children:[e.jsx("h3",{children:s==="fr"?"Catégories":"Categories"}),e.jsx("div",{className:"sidebar-categories",children:Ur.slice(1).map(f=>{const A=er.filter(v=>v.category===f).length;return e.jsxs("button",{className:"sidebar-cat-btn",onClick:()=>a(f),children:[e.jsx("span",{children:f}),e.jsx("span",{className:"cat-count",children:A})]},f)})})]}),e.jsxs("div",{className:"sidebar-widget expert-card",children:[e.jsx("div",{className:"expert-avatar",children:"E"}),e.jsx("h4",{children:"Wenmanegda Elie DIPAMA"}),e.jsx("p",{children:s==="fr"?"Co-fondateur & Expert Agro-Environnemental":"Co-founder & Agro-Environmental Expert"}),e.jsxs("div",{className:"expert-badges",children:[e.jsx("span",{className:"badge badge-green",children:"🏅 YALI Fellow 2023"}),e.jsx("span",{className:"badge badge-green",children:"🔬 Humboldt Fellow 2025"})]}),e.jsx("a",{href:"/about",className:"btn btn-secondary btn-sm",style:{width:"100%",textAlign:"center",marginTop:"0.5rem"},children:s==="fr"?"Voir profil":"View profile"})]})]})]})})]})}function qa({article:r,lang:t,t:s}){return e.jsxs("div",{className:"article-card card",children:[e.jsx("div",{className:"article-image",children:e.jsx("div",{className:"img-placeholder",style:{height:"180px"},children:e.jsx("span",{children:"Image — 400×200px"})})}),e.jsxs("div",{className:"article-card-content",children:[e.jsxs("div",{className:"article-meta",children:[e.jsx("span",{className:"badge badge-green",children:r.category}),e.jsx("span",{className:"article-date",children:new Date(r.date).toLocaleDateString(t==="fr"?"fr-FR":"en-US",{day:"numeric",month:"short",year:"numeric"})})]}),e.jsx("h3",{children:r[`title_${t}`]}),e.jsx("p",{children:r[`excerpt_${t}`]}),e.jsxs("div",{className:"article-footer",children:[e.jsx("span",{className:"article-author-sm",children:r.author.split(" ").slice(-1)[0]}),e.jsxs(S,{to:`/blog/${r.slug}`,className:"article-link",children:[s("blog.read_more")," →"]})]})]})]})}const Ra={"interview-elie-dipama-lefaso":{title_fr:"L'Agriculture Intelligente au Burkina Faso : Vision et Ambition de GreenFCO",title_en:"Smart Agriculture in Burkina Faso: GreenFCO's Vision and Ambition",author:"Wenmanegda Elie DIPAMA",date:"2024-03-15",category:"Actualités",readTime:"8 min",body_fr:`
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
    `,body_en:`
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
    `},"agroecologie-sahel-changement-climatique":{title_fr:"L'agroécologie au Sahel : solutions face au changement climatique",title_en:"Agroecology in the Sahel: Solutions for Climate Change",author:"Aminata Sawadogo",date:"2025-11-10",category:"Agroécologie",readTime:"6 min",body_fr:`
## L'urgence climatique au Sahel

Le Sahel est l'une des régions les plus exposées au changement climatique dans le monde. Selon le GIEC, la température moyenne de la zone a augmenté de 1,5°C depuis 1950, et les projections indiquent une hausse supplémentaire de 2 à 4°C d'ici 2100. Les saisons des pluies se raccourcissent et deviennent imprévisibles : au Burkina Faso, au Mali et au Niger, les agriculteurs observent une réduction de 15 à 20 % de la durée de la saison pluvieuse depuis les années 1970.

Face à cette réalité, l'agroécologie propose des réponses pratiques, fondées sur des processus naturels et adaptées aux conditions locales.

---

## Le zaï : récupérer les terres dégradées

Le zaï est une technique ancestrale du Burkina Faso qui consiste à creuser des micropuits (30 cm de diamètre, 15 cm de profondeur) dans lesquels on place du compost et les graines. Cette méthode concentre l'eau de pluie au niveau des racines et réduit le ruissellement.

Des études menées par l'INERA (Institut de l'Environnement et de Recherches Agricoles du Burkina Faso) montrent que le zaï peut augmenter les rendements de sorgho de 500 à 800 kg/ha sur des sols dégradés où les rendements conventionnels ne dépassent pas 100-200 kg/ha. Cette technique a permis la réhabilitation de plus de 200 000 hectares de terres dégradées au Burkina Faso depuis les années 1980.

---

## La cordons pierreux et la demi-lune

Les cordons pierreux (alignements de pierres suivant les courbes de niveau) ralentissent le ruissellement et favorisent l'infiltration de l'eau dans le sol. Associés aux demi-lunes — des cuvettes en forme de demi-cercle — ils permettent de capter l'eau des pluies et de restaurer la végétation naturelle.

Au Niger, le projet FIDA-PRAPS a démontré que ces aménagements peuvent augmenter la productivité des terres de 30 à 50 % et réduire de moitié le temps nécessaire pour constituer des réserves alimentaires pour une famille.

---

## La rotation culturale et les légumineuses

Intégrer des légumineuses (niébé, arachide, pois bambara) dans les rotations culturales est l'une des pratiques les plus simples et les plus efficaces pour améliorer la fertilité des sols. Ces plantes fixent l'azote atmosphérique grâce à des bactéries symbiotiques, réduisant ainsi le besoin en engrais chimiques.

La FAO estime que les légumineuses peuvent fixer entre 100 et 300 kg d'azote par hectare par an, l'équivalent de 200 à 600 kg d'urée. En Côte d'Ivoire et au Sénégal, des programmes de rotation maïs-niébé ont permis d'augmenter les rendements de maïs de 25 % sans intrant supplémentaire.

---

## Le mulching : protéger et nourrir le sol

Le paillage (mulching) consiste à couvrir le sol de résidus végétaux (paille, feuilles, tiges) pour réduire l'évaporation, protéger contre la chaleur et enrichir le sol en matière organique. En saison sèche, le mulching peut réduire les besoins en eau d'irrigation de 30 à 40 %.

---

## Conseils pratiques pour commencer

**Commencer petit :** Tester les techniques agroécologiques sur une parcelle de 0,5 ha avant de les étendre à l'ensemble de l'exploitation.

**Se former localement :** Des organisations comme l'INERA au Burkina Faso, l'IER au Mali ou l'ISRA au Sénégal proposent des formations pratiques gratuites ou à faible coût.

**Rejoindre un groupement :** Les techniques comme le zaï et les cordons pierreux sont plus efficaces quand elles sont appliquées collectivement sur un bassin versant.

L'agroécologie n'est pas une régression vers le passé, mais une adaptation intelligente aux défis du présent. Les agriculteurs du Sahel qui l'adoptent constatent généralement une amélioration de leurs rendements dès la première ou deuxième année.
    `,body_en:`
## The Climate Emergency in the Sahel

The Sahel is one of the world's most climate-exposed regions. According to the IPCC, the average temperature in the zone has risen by 1.5°C since 1950, with projections indicating an additional increase of 2 to 4°C by 2100. Rainy seasons are becoming shorter and more unpredictable: in Burkina Faso, Mali, and Niger, farmers have observed a 15 to 20% reduction in the duration of the rainy season since the 1970s.

In response to this reality, agroecology offers practical solutions grounded in natural processes and adapted to local conditions.

---

## Zaï: Reclaiming Degraded Land

Zaï is an ancestral technique from Burkina Faso involving the digging of micropits (30 cm diameter, 15 cm deep) in which compost and seeds are placed. This method concentrates rainwater at root level and reduces runoff.

Studies by INERA (Burkina Faso's Institute for Environment and Agricultural Research) show that zaï can increase sorghum yields from 500 to 800 kg/ha on degraded soils where conventional yields do not exceed 100-200 kg/ha. This technique has enabled the rehabilitation of over 200,000 hectares of degraded land in Burkina Faso since the 1980s.

---

## Stone Contour Lines and Half-Moons

Stone contour lines (alignments of stones following elevation curves) slow runoff and promote water infiltration into the soil. Combined with half-moons — semicircular basins — they capture rainwater and restore natural vegetation.

In Niger, the IFAD-PPRAPS project demonstrated that these measures can increase land productivity by 30 to 50% and halve the time needed to build food reserves for a family.

---

## Crop Rotation and Legumes

Integrating legumes (cowpea, peanut, bambara groundnut) into crop rotations is one of the simplest and most effective practices for improving soil fertility. These plants fix atmospheric nitrogen through symbiotic bacteria, reducing the need for chemical fertilizers.

The FAO estimates that legumes can fix between 100 and 300 kg of nitrogen per hectare per year, equivalent to 200 to 600 kg of urea. In Côte d'Ivoire and Senegal, maize-cowpea rotation programs have increased maize yields by 25% without additional inputs.

---

## Mulching: Protecting and Feeding the Soil

Mulching involves covering the soil with plant residues (straw, leaves, stems) to reduce evaporation, protect against heat, and enrich the soil with organic matter. In the dry season, mulching can reduce irrigation water needs by 30 to 40%.

---

## Practical Tips for Getting Started

**Start small:** Test agroecological techniques on a 0.5 ha plot before extending them to the entire farm.

**Train locally:** Organizations such as INERA in Burkina Faso, IER in Mali, or ISRA in Senegal offer free or low-cost practical training.

**Join a farmer group:** Techniques like zaï and stone contour lines are more effective when applied collectively across a watershed.

Agroecology is not a regression to the past but an intelligent adaptation to present challenges. Sahel farmers who adopt it generally see yield improvements in the first or second year.
    `},"prix-cereales-afrique-ouest-2026":{title_fr:"Prix des céréales en Afrique de l'Ouest : analyse et perspectives 2026",title_en:"Cereal Prices in West Africa: Analysis and 2026 Outlook",author:"Oumarou Traoré",date:"2025-12-05",category:"Marché",readTime:"7 min",body_fr:`
## Contexte : une volatilité structurelle

Les marchés céréaliers de l'Afrique de l'Ouest sont confrontés à une volatilité chronique, amplifiée depuis 2022 par les perturbations de la chaîne d'approvisionnement mondiale. Le Système d'Information sur les Marchés Agricoles (SIMA) du CILSS rapporte qu'au troisième trimestre 2025, le prix du mil sur les marchés de référence de Ouagadougou, Bamako et Niamey était en moyenne 35 % supérieur à la moyenne des cinq dernières années.

---

## Facteurs explicatifs de la hausse des prix

**Déficit pluviométrique :** La campagne agricole 2024-2025 a été marquée par des poches de sécheresse au Burkina Faso nord et au Sahel malien, réduisant la production nationale de mil de 12 % selon les estimations préliminaires du Ministère de l'Agriculture du Burkina Faso.

**Insécurité et perturbations logistiques :** Dans les zones affectées par les conflits, les routes d'approvisionnement sont perturbées. Les coûts de transport ont augmenté de 20 à 40 % sur certains corridors commerciaux au Burkina Faso.

**Demande urbaine croissante :** La population urbaine de l'Afrique de l'Ouest a doublé en 20 ans. Ouagadougou, Abidjan et Dakar concentrent une demande alimentaire en forte croissance, amplifiant la pression sur les prix.

**Effets de la crise ukrainienne :** Bien que l'Afrique de l'Ouest importe peu de blé ukrainien directement, la hausse des prix du blé sur les marchés mondiaux a réorienté une partie de la consommation vers les céréales locales (mil, sorgho), augmentant la demande et les prix.

---

## Situation par pays

Au **Burkina Faso**, le prix du sorgho blanc à Ouagadougou atteignait en novembre 2025 entre 350 et 400 FCFA/kg, contre une moyenne historique de 250-280 FCFA/kg. Le gouvernement a mis en place des ventes à prix modérés via le SONAGESS (Société Nationale de Gestion du Stock de Sécurité Alimentaire).

Au **Mali**, les marchés du nord (Mopti, Tombouctou) enregistrent les hausses les plus importantes, avec le mil à plus de 400 FCFA/kg. Les programmes du PAM (Programme Alimentaire Mondial) couvrent environ 400 000 personnes en situation de crise alimentaire.

Au **Sénégal**, la situation est plus stable grâce aux bonnes performances des bassins agricoles de Kaffrine et Kolda. Le maïs est disponible à 200-220 FCFA/kg sur les marchés de Dakar.

---

## Perspectives 2026

Les prévisions AGRHYMET pour la campagne 2025-2026 annoncent des précipitations conformes à la normale sur la majeure partie de l'Afrique de l'Ouest, ce qui devrait permettre une meilleure production. Cependant, plusieurs facteurs de risque persistent :

1. **Stocks initiaux faibles** : La mauvaise campagne 2024 a laissé peu de stocks de report.
2. **Coûts des intrants** : Les prix des engrais restent élevés malgré une légère détente en 2025.
3. **Accès aux marchés** : Les perturbations sécuritaires dans le Sahel limitent les flux commerciaux.

---

## Conseils pour les producteurs et commerçants

Les producteurs ont intérêt à stocker une partie de leur production (20 à 30 %) et à la commercialiser progressivement entre décembre et mars, période où les prix sont généralement les plus élevés. L'adhésion à des coopératives permet de mutualiser le stockage et d'accéder à de meilleures conditions de vente.

Pour les commerçants, la diversification des zones d'approvisionnement (s'approvisionner en Côte d'Ivoire quand le Burkina est déficitaire) est une stratégie de résilience de plus en plus pratiquée.
    `,body_en:`
## Context: Structural Volatility

West Africa's cereal markets face chronic volatility, amplified since 2022 by global supply chain disruptions. The CILSS Agricultural Market Information System (SIMA) reports that in the third quarter of 2025, millet prices at reference markets in Ouagadougou, Bamako, and Niamey were on average 35% above the five-year average.

---

## Factors Behind Price Increases

**Rainfall deficit:** The 2024-2025 agricultural campaign was marked by drought pockets in northern Burkina Faso and the Malian Sahel, reducing national millet production by 12% according to preliminary estimates from Burkina Faso's Ministry of Agriculture.

**Insecurity and logistical disruptions:** In conflict-affected areas, supply routes are disrupted. Transport costs have increased by 20 to 40% on some commercial corridors in Burkina Faso.

**Growing urban demand:** West Africa's urban population has doubled in 20 years. Ouagadougou, Abidjan, and Dakar concentrate strongly growing food demand, amplifying price pressure.

**Effects of the Ukraine crisis:** Although West Africa imports little Ukrainian wheat directly, rising global wheat prices have redirected some consumption toward local cereals (millet, sorghum), increasing demand and prices.

---

## Country-by-Country Situation

In **Burkina Faso**, white sorghum prices in Ouagadougou reached 350-400 FCFA/kg in November 2025, compared to a historical average of 250-280 FCFA/kg. The government has implemented subsidized sales through SONAGESS (National Food Security Stock Management Company).

In **Mali**, northern markets (Mopti, Timbuktu) are recording the largest increases, with millet above 400 FCFA/kg. WFP programs cover approximately 400,000 people in food crisis situations.

In **Senegal**, the situation is more stable thanks to the good performance of agricultural basins in Kaffrine and Kolda. Maize is available at 200-220 FCFA/kg in Dakar markets.

---

## 2026 Outlook

AGRHYMET forecasts for the 2025-2026 campaign predict normal rainfall across most of West Africa, which should enable better production. However, several risk factors persist:

1. **Low initial stocks:** The poor 2024 campaign left few carry-over stocks.
2. **Input costs:** Fertilizer prices remain high despite a slight easing in 2025.
3. **Market access:** Security disruptions in the Sahel limit trade flows.

---

## Advice for Producers and Traders

Producers are advised to store part of their production (20 to 30%) and sell it gradually between December and March, when prices are generally highest. Joining cooperatives allows pooling of storage and access to better selling conditions.

For traders, diversifying sourcing areas (sourcing from Côte d'Ivoire when Burkina Faso is in deficit) is an increasingly common resilience strategy.
    `},"drones-agricoles-surveillance-cultures":{title_fr:"Les drones agricoles révolutionnent la surveillance des cultures",title_en:"Agricultural Drones Revolutionize Crop Monitoring",author:"Kofi Mensah",date:"2026-01-18",category:"Innovation",readTime:"5 min",body_fr:`
## Une technologie en pleine démocratisation

Longtemps réservés aux grandes exploitations et aux projets pilotes financés par des ONG, les drones agricoles deviennent progressivement accessibles aux coopératives et aux agripreneurs en Afrique de l'Ouest. Le marché mondial des drones agricoles était évalué à 4,8 milliards de dollars en 2023 et devrait dépasser 20 milliards de dollars d'ici 2030, selon Markets and Markets Research.

En Afrique, des pays comme le Ghana, le Kenya et la Côte d'Ivoire sont en avance dans l'adoption, mais Burkina Faso, Mali et Sénégal voient émerger leurs premières utilisations commerciales régulières.

---

## Ce que les drones permettent de faire

**Cartographie des parcelles :** En moins d'une heure, un drone équipé d'une caméra RGB peut cartographier 50 à 100 hectares avec une précision centimétrique. Cette carte permet d'identifier les zones de compaction du sol, les inégalités de végétation et les zones à problèmes.

**Détection précoce des maladies et stress hydriques :** Les capteurs multispectraux (NDVI — Normalized Difference Vegetation Index) permettent de détecter le stress des plantes jusqu'à deux semaines avant que les symptômes ne soient visibles à l'œil nu. Une intervention précoce peut réduire les pertes de rendement de 15 à 30 %.

**Pulvérisation de précision :** Les drones de pulvérisation peuvent appliquer des pesticides ou des biostimulants avec une précision de 95 %, réduisant les quantités utilisées de 30 à 50 % par rapport à la pulvérisation conventionnelle. Cette réduction des intrants se traduit par des économies directes et une moindre contamination de l'environnement.

**Surveillance du bétail et des clôtures :** Dans les zones d'agropastoralisme, les drones permettent de localiser le bétail et de surveiller l'état des clôtures sur de grandes étendues.

---

## Exemples concrets en Afrique de l'Ouest

**Ghana :** La start-up Aerolens Ghana propose des services de cartographie à 15 USD/ha, un prix accessible pour les grandes coopératives cacaoyères. Depuis 2023, plus de 12 000 ha ont été cartographiés dans la Brong-Ahafo Region.

**Côte d'Ivoire :** Dans le cadre du programme PSAC (Projet de Soutien à l'Agriculture Commerciale), des drones de pulvérisation ont été testés sur 500 ha de plantations d'ananas, réduisant les coûts de traitement de 40 %.

**Sénégal :** La SAED (Société nationale d'Aménagement et d'Exploitation des terres du Delta) utilise des drones pour surveiller les aménagements hydro-agricoles de la Vallée du fleuve Sénégal depuis 2024.

---

## Comment accéder à cette technologie

Pour les petits producteurs, l'accès individuel reste difficile (un drone agricole de qualité coûte entre 5 000 et 50 000 dollars). Plusieurs modèles d'accès existent :

**Service à la demande :** Des prestataires locaux proposent des services de cartographie ou de pulvérisation à l'hectare. Ce modèle ne nécessite aucun investissement en matériel.

**Achat groupé en coopérative :** Plusieurs coopératives peuvent se regrouper pour acquérir un drone et partager les coûts.

**Location :** Quelques entrepreneurs proposent la location de drones à la journée (150 000 à 300 000 FCFA/jour au Burkina Faso).

---

## Réglementation : ce qu'il faut savoir

Au Burkina Faso, l'Autorité Nationale de l'Aviation Civile (ANAC) régule l'utilisation des drones. Les opérateurs commerciaux doivent obtenir un certificat d'opérateur de drone et déclarer leurs vols. La réglementation évolue rapidement ; il est conseillé de se renseigner auprès de l'ANAC avant tout projet.
    `,body_en:`
## A Technology Becoming Accessible

Long reserved for large farms and NGO-funded pilot projects, agricultural drones are gradually becoming accessible to cooperatives and agripreneurs in West Africa. The global agricultural drone market was valued at $4.8 billion in 2023 and is expected to exceed $20 billion by 2030, according to Markets and Markets Research.

In Africa, countries like Ghana, Kenya, and Côte d'Ivoire are ahead in adoption, but Burkina Faso, Mali, and Senegal are seeing their first regular commercial uses emerge.

---

## What Drones Make Possible

**Plot mapping:** In less than an hour, a drone equipped with an RGB camera can map 50 to 100 hectares with centimeter precision. This map identifies areas of soil compaction, vegetation inequality, and problem zones.

**Early detection of disease and water stress:** Multispectral sensors (NDVI — Normalized Difference Vegetation Index) detect plant stress up to two weeks before symptoms are visible to the naked eye. Early intervention can reduce yield losses by 15 to 30%.

**Precision spraying:** Spraying drones can apply pesticides or biostimulants with 95% precision, reducing quantities used by 30 to 50% compared to conventional spraying. This input reduction translates into direct savings and lower environmental contamination.

**Livestock and fence monitoring:** In agropastoral areas, drones allow livestock location and fence condition monitoring over large areas.

---

## Concrete Examples in West Africa

**Ghana:** The start-up Aerolens Ghana offers mapping services at $15/ha, an accessible price for large cocoa cooperatives. Since 2023, more than 12,000 ha have been mapped in the Brong-Ahafo Region.

**Côte d'Ivoire:** Under the PSAC program (Commercial Agriculture Support Project), spraying drones were tested on 500 ha of pineapple plantations, reducing treatment costs by 40%.

**Senegal:** SAED (National Society for Delta Land Development and Management) has been using drones to monitor hydro-agricultural developments in the Senegal River Valley since 2024.

---

## How to Access This Technology

For small producers, individual access remains difficult (a quality agricultural drone costs between $5,000 and $50,000). Several access models exist:

**On-demand service:** Local service providers offer mapping or spraying services per hectare. This model requires no equipment investment.

**Cooperative group purchase:** Several cooperatives can pool resources to acquire a drone and share costs.

**Rental:** Some entrepreneurs offer drone rental by the day (150,000 to 300,000 FCFA/day in Burkina Faso).

---

## Regulation: What You Need to Know

In Burkina Faso, the National Civil Aviation Authority (ANAC) regulates drone use. Commercial operators must obtain a drone operator certificate and declare their flights. Regulation is evolving rapidly; it is advisable to check with ANAC before any project.
    `},"financement-agricole-petits-exploitants":{title_fr:"Financement agricole : nouvelles opportunités pour les petits exploitants",title_en:"Agricultural Financing: New Opportunities for Smallholder Farmers",author:"Fatoumata Diallo",date:"2026-02-07",category:"Financement",readTime:"6 min",body_fr:`
## Le défi du financement agricole en Afrique subsaharienne

Selon la Banque Mondiale, seulement 6 % des ménages agricoles en Afrique subsaharienne ont accès à un crédit formel. Ce chiffre cache de profondes disparités : les femmes agricultrices et les jeunes agripreneurs sont particulièrement exclus du système financier. Pourtant, les besoins sont immenses : semences améliorées, intrants, équipements, irrigation — autant d'investissements qui nécessitent un financement externe.

---

## La microfinance agricole : un outil en pleine évolution

Les institutions de microfinance (IMF) ont longtemps boudé l'agriculture, jugée trop risquée (aléas climatiques, prix volatils). Mais le secteur évolue. Des institutions comme UEMOA-MEC au Burkina Faso, Baobab au Sénégal ou SORO YIRIWASO au Mali proposent désormais des produits spécifiquement conçus pour les agriculteurs :

**Crédit de campagne :** Prêt à court terme (3 à 6 mois) pour financer les intrants en début de campagne, remboursable après la récolte. Les taux varient de 12 à 24 % par an selon les institutions.

**Crédit de stockage :** Permet aux producteurs de stocker leur récolte et de la vendre plus tard à un meilleur prix, en utilisant la marchandise en stock comme garantie (récépissé d'entrepôt).

**Crédit-bail d'équipement :** Pour l'acquisition de motopompes, tracteurs ou équipements d'irrigation, remboursable sur 24 à 60 mois.

---

## Les fonds de garantie : lever les barrières au crédit bancaire

Les fonds de garantie permettent aux agriculteurs d'accéder aux prêts bancaires en prenant en charge une partie du risque à la place de l'emprunteur. En Afrique de l'Ouest, plusieurs mécanismes existent :

**Le FAGACE** (Fonds Africain de Garantie et de Coopération Économique) garantit jusqu'à 50 % des prêts accordés aux PME agro-alimentaires dans 11 pays membres.

**Le GARI** (Fonds de Garantie des Investissements Privés en Afrique de l'Ouest) propose des garanties pour les investissements privés dans la région UEMOA.

**Le Fonds de Garantie du FIDA** appuie les institutions financières rurales pour qu'elles accordent des prêts aux organisations paysannes.

---

## Le financement participatif (crowdfunding)

Des plateformes comme Hello Tractor (Nigeria), Crowdfarming et Farmcrowdy permettent à des investisseurs du monde entier de financer des exploitations agricoles africaines en échange d'un retour sur investissement ou de produits agricoles. Ces plateformes ont mobilisé plus de 200 millions de dollars pour l'agriculture africaine depuis 2016.

Pour les producteurs, ces plateformes offrent un accès au capital sans garanties physiques. Pour les investisseurs, elles permettent d'investir dans une agriculture durable avec des rendements de 10 à 25 %.

---

## Le crédit-carbone : une source de revenus complémentaire

Les agriculteurs qui adoptent des pratiques régénératives (agroforesterie, zaï, compostage) peuvent générer des crédits carbone vendables sur les marchés volontaires. Le prix d'une tonne de CO2 séquestré varie de 5 à 50 dollars selon le marché.

Au Burkina Faso, des projets pilotes menés par des organisations comme Forest Carbon et Althelia Ecosphere ont montré qu'un agriculteur pratiquant l'agroforesterie sur 2 ha peut générer entre 50 000 et 150 000 FCFA de revenus carbone supplémentaires par an.

---

## Conseils pratiques pour obtenir un financement

1. **Tenir une comptabilité simple :** Un cahier de recettes et de dépenses est souvent suffisant pour rassurer un prêteur.
2. **Rejoindre une coopérative :** Les emprunts groupés offrent de meilleures conditions et une garantie collective.
3. **Construire un historique bancaire :** Commencer par un petit prêt remboursé à temps améliore le profil de crédit.
4. **Se renseigner sur les subventions** : Les guichets FAARF (Fonds d'Appui aux Activités Rémunératrices des Femmes) et FASI (Fonds d'Appui au Secteur Informel) au Burkina Faso proposent des subventions aux femmes et jeunes agripreneurs.
    `,body_en:`
## The Agricultural Financing Challenge in Sub-Saharan Africa

According to the World Bank, only 6% of agricultural households in sub-Saharan Africa have access to formal credit. This figure hides deep disparities: women farmers and young agripreneurs are particularly excluded from the financial system. Yet the needs are immense: improved seeds, inputs, equipment, irrigation — all investments requiring external financing.

---

## Agricultural Microfinance: An Evolving Tool

Microfinance institutions (MFIs) long avoided agriculture, considered too risky (climate hazards, volatile prices). But the sector is evolving. Institutions such as UEMOA-MEC in Burkina Faso, Baobab in Senegal, or SORO YIRIWASO in Mali now offer products specifically designed for farmers:

**Campaign credit:** Short-term loans (3 to 6 months) to finance inputs at the start of the campaign, repayable after harvest. Rates range from 12 to 24% per year depending on the institution.

**Storage credit:** Allows producers to store their harvest and sell it later at a better price, using stored goods as collateral (warehouse receipt).

**Equipment leasing:** For the acquisition of motor pumps, tractors, or irrigation equipment, repayable over 24 to 60 months.

---

## Guarantee Funds: Removing Barriers to Bank Credit

Guarantee funds allow farmers to access bank loans by absorbing part of the risk in place of the borrower. In West Africa, several mechanisms exist:

**FAGACE** (African Guarantee and Economic Cooperation Fund) guarantees up to 50% of loans to agri-food SMEs in 11 member countries.

**GARI** (Private Investment Guarantee Fund for West Africa) offers guarantees for private investments in the UEMOA region.

**IFAD's Guarantee Fund** supports rural financial institutions to lend to farmer organizations.

---

## Crowdfunding

Platforms like Hello Tractor (Nigeria), Crowdfarming, and Farmcrowdy allow investors worldwide to finance African farms in exchange for a return on investment or agricultural products. These platforms have mobilized over $200 million for African agriculture since 2016.

For producers, these platforms provide capital access without physical collateral. For investors, they offer the opportunity to invest in sustainable agriculture with returns of 10 to 25%.

---

## Carbon Credits: A Supplementary Income Source

Farmers who adopt regenerative practices (agroforestry, zaï, composting) can generate carbon credits sellable on voluntary markets. The price of one tonne of sequestered CO2 ranges from $5 to $50 depending on the market.

In Burkina Faso, pilot projects by organizations like Forest Carbon and Althelia Ecosphere have shown that a farmer practicing agroforestry on 2 ha can generate between 50,000 and 150,000 FCFA in additional carbon income per year.

---

## Practical Tips for Securing Financing

1. **Keep simple accounts:** A basic income and expense notebook is often enough to reassure a lender.
2. **Join a cooperative:** Group loans offer better conditions and collective guarantees.
3. **Build a banking history:** Starting with a small loan repaid on time improves credit profile.
4. **Inquire about grants:** FAARF (Women's Income-Generating Activities Support Fund) and FASI (Informal Sector Support Fund) windows in Burkina Faso offer grants to women and young agripreneurs.
    `},"sesame-burkina-faso-chaine-valeur":{title_fr:"La chaîne de valeur du sésame burkinabè : opportunités d'export",title_en:"The Burkinabe Sesame Value Chain: Export Opportunities",author:"Wendyam Compaoré",date:"2026-02-25",category:"Export",readTime:"7 min",body_fr:`
## Le Burkina Faso, géant méconnu du sésame africain

Le Burkina Faso est le troisième producteur africain de sésame et l'un des dix premiers mondiaux. La production nationale dépasse 420 000 tonnes par an (campagne 2023-2024), avec des surfaces emblavées estimées à plus de 1,2 million d'hectares. Les régions du Centre-Ouest, des Cascades et du Sud-Ouest concentrent la majorité de la production.

Le sésame burkinabè est reconnu pour sa qualité : taux d'huile élevé (50-55 %), faible teneur en acide érucique, et couleur blanche ou crème prisée par les transformateurs japonais, indiens et chinois. C'est un avantage compétitif considérable sur le marché mondial.

---

## Structure de la chaîne de valeur

La filière sésame au Burkina Faso est organisée en plusieurs segments :

**Production :** 80 % réalisée par de petits producteurs sur des surfaces moyennes de 0,5 à 2 ha. Les rendements sont faibles (400 à 600 kg/ha) comparés au potentiel agronomique (1 000 à 1 500 kg/ha avec les bonnes pratiques).

**Collecte et agrégation :** Des collecteurs locaux (souvent des commerçants-pisteurs) achètent le sésame aux producteurs juste après la récolte à des prix bas (entre 300 et 400 FCFA/kg). Le manque d'organisation des producteurs affaiblit leur pouvoir de négociation.

**Transformation primaire :** Limitée au Burkina Faso — décorticage, triage, ensachage. Quelques unités industrielles existent à Bobo-Dioulasso, mais la capacité de transformation reste insuffisante.

**Export :** Plus de 90 % du sésame burkinabè est exporté en graines brutes vers l'Asie (Japon, Chine, Inde) et l'Europe. La valeur FOB à Lomé ou Abidjan (ports d'export habituels) oscille entre 800 et 1 200 USD/tonne.

---

## La transformation locale : le grand défi et la grande opportunité

Exporter du sésame brut, c'est laisser la valeur ajoutée à d'autres. Voici quelques produits transformés et leurs valeurs marchandes :

**Huile de sésame (semi-raffinée) :** 2 500 à 4 000 USD/tonne sur les marchés européens bio.
**Tahini (purée de sésame) :** 2 000 à 3 500 USD/tonne — fort potentiel d'export vers le Moyen-Orient et l'Europe.
**Sésame grillé et snacks :** Marché local et régional (UEMOA) en forte croissance.
**Tourteau de sésame :** Sous-produit riche en protéines (40-45 %) utilisable comme aliment du bétail.

Des entreprises comme Burkina Bio (Bobo-Dioulasso) et des coopératives féminines de la région des Cascades ont commencé à produire de l'huile de sésame pour l'export, mais les volumes restent marginaux.

---

## Accéder aux marchés d'export : mode d'emploi

**Certification biologique :** Le sésame burkinabè est quasi-naturellement biologique (peu d'intrants chimiques), mais l'absence de certification freine l'accès aux marchés bio premium. Les certifications Ecocert ou USDA Organic coûtent entre 500 000 et 1 500 000 FCFA/an.

**Commerce équitable :** Les labels Fairtrade ou Fair for Life permettent d'accéder à des marchés à prix garantis et des primes sociales. Plusieurs coopératives du Burkina Faso sont déjà certifiées.

**Exportation directe :** Pour vendre directement à des importateurs japonais ou européens, il faut obtenir un numéro d'exportateur, respecter les normes SPS (sanitaires et phytosanitaires) et trouver un transitaire fiable.

**Via les coopératives :** Les regroupements permettent d'atteindre les volumes minimum (généralement 1 conteneur = 20 à 25 tonnes) requis par les acheteurs internationaux.

---

## Perspectives et recommandations

La mise en place d'une zone de transformation agro-alimentaire à Bobo-Dioulasso — dans le cadre du Plan National de Développement Économique et Social (PNDES) — pourrait transformer la filière. Les investisseurs étrangers (Inde, Chine) montrent un intérêt croissant pour les unités de trituration de sésame au Burkina Faso.

Pour les producteurs, l'enjeu immédiat est d'améliorer les rendements via l'utilisation de variétés sélectionnées (INERA Burkina propose plusieurs variétés à haut rendement) et de se regrouper pour négocier de meilleurs prix.
    `,body_en:`
## Burkina Faso: An Unsung Giant of African Sesame

Burkina Faso is Africa's third largest sesame producer and one of the top ten globally. National production exceeds 420,000 tonnes per year (2023-2024 campaign), with planted areas estimated at over 1.2 million hectares. The Centre-Ouest, Cascades, and Sud-Ouest regions concentrate most of the production.

Burkinabe sesame is recognized for its quality: high oil content (50-55%), low erucic acid content, and white or cream color prized by Japanese, Indian, and Chinese processors. This represents a significant competitive advantage on the global market.

---

## Value Chain Structure

The sesame sector in Burkina Faso is organized into several segments:

**Production:** 80% carried out by smallholder farmers on average plots of 0.5 to 2 ha. Yields are low (400 to 600 kg/ha) compared to agronomic potential (1,000 to 1,500 kg/ha with good practices).

**Collection and aggregation:** Local collectors (often trader-scouts) buy sesame from producers just after harvest at low prices (between 300 and 400 FCFA/kg). The lack of producer organization weakens their bargaining power.

**Primary processing:** Limited in Burkina Faso — hulling, sorting, bagging. A few industrial units exist in Bobo-Dioulasso, but processing capacity remains insufficient.

**Export:** Over 90% of Burkinabe sesame is exported as raw seeds to Asia (Japan, China, India) and Europe. FOB value at Lomé or Abidjan (usual export ports) fluctuates between $800 and $1,200/tonne.

---

## Local Processing: The Big Challenge and the Big Opportunity

Exporting raw sesame means leaving value-added to others. Here are some processed products and their market values:

**Sesame oil (semi-refined):** $2,500 to $4,000/tonne on European organic markets.
**Tahini (sesame paste):** $2,000 to $3,500/tonne — strong export potential to the Middle East and Europe.
**Roasted sesame and snacks:** Local and regional (UEMOA) market growing strongly.
**Sesame meal:** Protein-rich by-product (40-45%) usable as animal feed.

Companies like Burkina Bio (Bobo-Dioulasso) and women's cooperatives in the Cascades region have begun producing sesame oil for export, but volumes remain marginal.

---

## Accessing Export Markets: A How-To Guide

**Organic certification:** Burkinabe sesame is nearly naturally organic (few chemical inputs), but the lack of certification restricts access to premium organic markets. Ecocert or USDA Organic certifications cost between 500,000 and 1,500,000 FCFA/year.

**Fair trade:** Fairtrade or Fair for Life labels provide access to guaranteed-price markets and social premiums. Several Burkina Faso cooperatives are already certified.

**Direct export:** To sell directly to Japanese or European importers, one must obtain an exporter number, comply with SPS (sanitary and phytosanitary) standards, and find a reliable freight forwarder.

**Through cooperatives:** Groupings make it possible to reach the minimum volumes (generally 1 container = 20 to 25 tonnes) required by international buyers.

---

## Outlook and Recommendations

The establishment of an agri-food processing zone in Bobo-Dioulasso — within the framework of the National Economic and Social Development Plan (PNDES) — could transform the sector. Foreign investors (India, China) are showing growing interest in sesame crushing units in Burkina Faso.

For producers, the immediate challenge is to improve yields through the use of improved varieties (INERA Burkina offers several high-yielding varieties) and to organize to negotiate better prices.
    `},"irrigation-goutte-a-goutte-saison-seche":{title_fr:"Irrigation goutte-à-goutte : économiser l'eau en saison sèche",title_en:"Drip Irrigation: Saving Water in the Dry Season",author:"Ibrahim Coulibaly",date:"2026-03-14",category:"Irrigation",readTime:"5 min",body_fr:`
## Pourquoi l'irrigation goutte-à-goutte est cruciale au Sahel

En Afrique de l'Ouest, la saison sèche dure entre 6 et 9 mois selon les zones. Durant cette période, le maraîchage est l'une des rares activités agricoles génératrices de revenus, mais elle est limitée par l'accès à l'eau. Les systèmes d'irrigation traditionnels (arrosage au seau ou par aspersion) gaspillent 50 à 70 % de l'eau par évaporation et ruissellement.

L'irrigation goutte-à-goutte — qui délivre l'eau directement à la zone racinaire de chaque plante — peut réduire la consommation d'eau de 30 à 60 % par rapport à l'arrosage traditionnel, tout en augmentant les rendements de 20 à 50 %.

---

## Comment fonctionne un système goutte-à-goutte

Un système d'irrigation goutte-à-goutte de base comprend :

**La source d'eau :** Puits, forage, retenue d'eau ou réseau. La pression minimale requise est de 0,5 à 1 bar (une tête d'eau de 5 à 10 mètres suffit souvent).

**Le filtre :** Essentiel pour éviter le colmatage des goutteurs. Un filtre à sable suivi d'un filtre à tamis protège efficacement le système.

**La tuyauterie principale et les rampes :** Des tuyaux en PNHE (polyéthylène haute densité) amènent l'eau depuis la source jusqu'aux rampes qui longent les rangs de culture.

**Les goutteurs :** De petits émetteurs placés tous les 20 à 50 cm délivrent l'eau goutte à goutte (débit de 2 à 4 litres par heure). Les goutteurs intégrés dans le tuyau (tuyaux goutteurs) sont les plus pratiques.

**Le système de fertilisation (fertigation) :** Un injecteur permet d'apporter les engrais directement avec l'eau d'irrigation, augmentant l'efficacité des fertilisants de 30 à 40 %.

---

## Coût d'un système goutte-à-goutte

Le coût varie selon la qualité et la source d'approvisionnement :

**Système d'entrée de gamme (kits locaux) :** 150 000 à 300 000 FCFA par hectare. Ces kits, souvent fabriqués en Chine et revendus localement, ont une durée de vie de 2 à 5 ans.

**Système de qualité moyenne (marques indiennes : Netafim India, Jain Irrigation) :** 400 000 à 700 000 FCFA/ha. Durée de vie de 8 à 12 ans.

**Systèmes premium (marques israéliennes : Netafim, NaanDanJain) :** 800 000 à 1 500 000 FCFA/ha. Durée de vie de 15 à 20 ans.

Pour un maraîcher sur 0,5 ha, un investissement de 150 000 à 350 000 FCFA est généralement récupéré en 1 à 2 saisons grâce aux économies d'eau et à l'augmentation des rendements.

---

## Cultures adaptées à l'irrigation goutte-à-goutte

Les cultures qui bénéficient le plus du goutte-à-goutte en Afrique de l'Ouest :

**Tomate :** Augmentation des rendements de 30 à 60 %, réduction des maladies fongiques (moins d'humidité foliaire).
**Oignon :** Excellents résultats, réduction du flétrissement bactérien.
**Poivron et piment :** Très bons résultats, revenus élevés à la vente.
**Laitue, chou, carotte :** Cultures à cycle court adaptées à la vente en circuits courts.
**Canne à sucre et banane :** Cultures pérennes bénéficiant d'économies d'eau importantes.

---

## Entretien et pièges à éviter

**Rinçage régulier :** Ouvrir les extrémités des rampes une fois par semaine pour purger les sédiments.
**Nettoyage des filtres :** À faire après chaque session d'irrigation en saison chargée.
**Vérification des goutteurs :** Détecter et remplacer les goutteurs bouchés (pression de sortie inégale).
**Qualité de l'eau :** En cas d'eau chargée en calcaire, ajouter de l'acide phosphorique (5 ml par m3) pour dissoudre les dépôts.

---

## Accès à l'équipement et formations

En Burkina Faso, des équipements goutte-à-goutte sont disponibles à Ouagadougou et Bobo-Dioulasso auprès d'agrofournisseurs comme Yiriwa Conseil, Fienta et diverses boutiques d'intrants. Le programme PICOFA (Projet d'Irrigation et de Gestion de l'Eau dans les Petites Exploitations Agricoles) a formé plus de 2 000 maraîchers au goutte-à-goutte depuis 2018.
    `,body_en:`
## Why Drip Irrigation is Crucial in the Sahel

In West Africa, the dry season lasts between 6 and 9 months depending on the zone. During this period, market gardening is one of the few income-generating agricultural activities, but it is limited by water access. Traditional irrigation systems (bucket watering or sprinkler irrigation) waste 50 to 70% of water through evaporation and runoff.

Drip irrigation — which delivers water directly to the root zone of each plant — can reduce water consumption by 30 to 60% compared to traditional watering, while increasing yields by 20 to 50%.

---

## How a Drip System Works

A basic drip irrigation system includes:

**Water source:** Well, borehole, reservoir, or network. The minimum pressure required is 0.5 to 1 bar (a water head of 5 to 10 meters is often sufficient).

**Filter:** Essential to prevent dripper clogging. A sand filter followed by a screen filter effectively protects the system.

**Main pipe and laterals:** HDPE (high-density polyethylene) pipes carry water from the source to laterals running along crop rows.

**Drippers:** Small emitters placed every 20 to 50 cm deliver water drop by drop (flow rate of 2 to 4 liters per hour). Drippers integrated into the pipe (drip tape) are the most practical.

**Fertigation system:** An injector allows fertilizers to be delivered directly with irrigation water, increasing fertilizer efficiency by 30 to 40%.

---

## Cost of a Drip System

Cost varies depending on quality and source:

**Entry-level system (local kits):** 150,000 to 300,000 FCFA per hectare. These kits, often manufactured in China and resold locally, have a lifespan of 2 to 5 years.

**Mid-range system (Indian brands: Netafim India, Jain Irrigation):** 400,000 to 700,000 FCFA/ha. Lifespan of 8 to 12 years.

**Premium systems (Israeli brands: Netafim, NaanDanJain):** 800,000 to 1,500,000 FCFA/ha. Lifespan of 15 to 20 years.

For a market gardener on 0.5 ha, an investment of 150,000 to 350,000 FCFA is typically recovered in 1 to 2 seasons through water savings and yield increases.

---

## Crops Well-Suited to Drip Irrigation

Crops that benefit most from drip irrigation in West Africa:

**Tomato:** Yield increases of 30 to 60%, reduced fungal diseases (less leaf humidity).
**Onion:** Excellent results, reduced bacterial wilt.
**Bell pepper and chili:** Very good results, high sale revenues.
**Lettuce, cabbage, carrot:** Short-cycle crops suited for short-supply-chain sales.
**Sugarcane and banana:** Perennial crops benefiting from significant water savings.

---

## Maintenance and Pitfalls to Avoid

**Regular flushing:** Open lateral ends once a week to purge sediments.
**Filter cleaning:** To be done after each irrigation session during the busy season.
**Dripper inspection:** Detect and replace clogged drippers (unequal outlet pressure).
**Water quality:** For calcium-rich water, add phosphoric acid (5 ml per m3) to dissolve deposits.

---

## Equipment Access and Training

In Burkina Faso, drip equipment is available in Ouagadougou and Bobo-Dioulasso from agricultural suppliers such as Yiriwa Conseil, Fienta, and various input shops. The PICOFA program (Irrigation and Water Management Project in Small Agricultural Holdings) has trained more than 2,000 market gardeners in drip irrigation since 2018.
    `},"marches-numeriques-agricoles-vendre-en-ligne":{title_fr:"Marchés numériques agricoles : comment vendre en ligne",title_en:"Digital Agricultural Markets: How to Sell Online",author:"Aicha Sow",date:"2026-04-02",category:"Numérique",readTime:"6 min",body_fr:`
## La révolution numérique dans les marchés agricoles africains

Le commerce agricole en Afrique de l'Ouest reste dominé par des circuits informels avec de nombreux intermédiaires, réduisant les marges des producteurs. Les plateformes numériques émergent comme une solution pour connecter directement acheteurs et vendeurs, réduire les coûts de transaction et améliorer la transparence des prix.

Selon la GSMA, 46 % des adultes en Afrique subsaharienne possèdent désormais un smartphone (2024), et 70 % des zones rurales sont couvertes par le réseau mobile 4G. Ces chiffres créent les conditions d'un décollage des agri-marketplaces.

---

## Les principales plateformes actives en Afrique de l'Ouest

**Esoko (Ghana/Burkina Faso/Côte d'Ivoire) :** Pionnier des services d'information sur les prix agricoles par SMS depuis 2005. La plateforme agrège les prix de plus de 200 marchés et les diffuse par SMS, USSD et application mobile. Environ 500 000 agriculteurs abonnés en Afrique de l'Ouest.

**Agri-Marketplace (Sénégal) :** Plateforme de mise en relation entre producteurs et acheteurs institutionnels (hôtels, restaurants, supermarchés). Lancée en 2022 par l'ANCAR (Agence Nationale de Conseil Agricole et Rural), elle compte plus de 3 000 producteurs inscrits.

**Cowrywise AgroMarket (Nigeria/extension UEMOA) :** Combinaison de marketplace et de financement, permettant aux acheteurs de pré-financer des commandes et aux producteurs de recevoir un acompte avant la récolte.

**GreenFCO Digital Market :** La plateforme en développement de GreenFCO vise à connecter les producteurs burkinabè aux acheteurs locaux et régionaux, avec des outils de gestion de ferme intégrés.

**TradeDepot (multi-pays) :** Cible les épiciers et petits commerçants, mais distribue également des produits agricoles transformés. Présent au Ghana, Nigeria, Côte d'Ivoire.

---

## Comment s'inscrire et vendre sur une plateforme numérique

**Étape 1 — Choisir la plateforme adaptée :** Selon votre production (légumes frais, céréales, produits transformés) et votre zone, certaines plateformes seront plus adaptées. Renseignez-vous auprès des associations de producteurs locales.

**Étape 2 — Créer un profil vendeur :** La plupart des plateformes demandent un numéro de téléphone mobile Money (Orange Money, Moov Money, Wave), une photo et une description de votre production.

**Étape 3 — Publier vos offres :** Indiquez clairement la quantité disponible, le prix demandé (au kg, au sac), le lieu de livraison ou de retrait, et la période de disponibilité.

**Étape 4 — Gérer les commandes :** Confirmez les commandes rapidement, respectez les quantités et la qualité promises. La réputation en ligne se construit sur la fiabilité.

**Étape 5 — Recevoir le paiement :** Privilégiez le paiement mobile (Orange Money, Wave, Moov) pour éviter les impayés.

---

## Les défis et comment les surmonter

**Confiance et qualité :** Les acheteurs en ligne ne peuvent pas inspecter les produits. Des photos de bonne qualité, une description précise et des certifications (si disponibles) rassurent les acheteurs.

**Logistique :** La livraison du dernier kilomètre reste le principal obstacle. Des solutions émergent : motos-livreurs, partenariats avec des agrégateurs logistiques comme Send (Ghana) ou Kobo360 (Nigeria).

**Connexion internet :** Dans les zones à faible couverture, les plateformes accessibles par USSD (sans internet) ou fonctionnant en mode hors-ligne sont préférables.

**Littératie numérique :** Des formations de base en utilisation des smartphones et des plateformes sont proposées par des organisations comme GreenFCO, Jokkolabs (Sénégal) ou CIPB (Burkina Faso).

---

## Témoignage

Mariam Kaboré, maraîchère à Koudougou (Burkina Faso) : *"Avant, je vendais ma tomate à 50 FCFA/kg au bord du champ parce que je ne connaissais pas les autres acheteurs. Depuis que je suis sur une plateforme numérique, je vends à 120-150 FCFA/kg directement à des restaurants de Ouagadougou. Ça a changé ma vie."*

Les marchés numériques ne remplacent pas les marchés physiques, mais ils offrent aux producteurs un canal supplémentaire et une meilleure information sur les prix. La clé est de commencer simplement et de se former progressivement.
    `,body_en:`
## The Digital Revolution in African Agricultural Markets

Agricultural trade in West Africa remains dominated by informal circuits with many intermediaries, reducing producers' margins. Digital platforms are emerging as a solution to directly connect buyers and sellers, reduce transaction costs, and improve price transparency.

According to GSMA, 46% of adults in sub-Saharan Africa now own a smartphone (2024), and 70% of rural areas are covered by 4G mobile networks. These figures create the conditions for a takeoff in agri-marketplaces.

---

## Main Active Platforms in West Africa

**Esoko (Ghana/Burkina Faso/Côte d'Ivoire):** Pioneer in agricultural price information services via SMS since 2005. The platform aggregates prices from more than 200 markets and disseminates them via SMS, USSD, and mobile app. Approximately 500,000 subscribed farmers in West Africa.

**Agri-Marketplace (Senegal):** A matchmaking platform connecting producers with institutional buyers (hotels, restaurants, supermarkets). Launched in 2022 by ANCAR (National Agricultural and Rural Advisory Agency), it has over 3,000 registered producers.

**Cowrywise AgroMarket (Nigeria/UEMOA extension):** A combination of marketplace and financing, allowing buyers to pre-finance orders and producers to receive an advance before harvest.

**GreenFCO Digital Market:** GreenFCO's platform under development aims to connect Burkinabe producers with local and regional buyers, with integrated farm management tools.

**TradeDepot (multi-country):** Targets grocers and small traders, but also distributes processed agricultural products. Present in Ghana, Nigeria, Côte d'Ivoire.

---

## How to Register and Sell on a Digital Platform

**Step 1 — Choose the right platform:** Depending on your production (fresh vegetables, cereals, processed products) and your area, some platforms will be more suitable. Check with local producer associations.

**Step 2 — Create a seller profile:** Most platforms require a mobile money phone number (Orange Money, Moov Money, Wave), a photo, and a description of your production.

**Step 3 — Post your offers:** Clearly indicate the available quantity, the asking price (per kg, per bag), the delivery or pickup location, and the period of availability.

**Step 4 — Manage orders:** Confirm orders quickly, respect promised quantities and quality. Online reputation is built on reliability.

**Step 5 — Receive payment:** Prefer mobile payment (Orange Money, Wave, Moov) to avoid non-payment.

---

## Challenges and How to Overcome Them

**Trust and quality:** Online buyers cannot inspect products. Good quality photos, accurate descriptions, and certifications (if available) reassure buyers.

**Logistics:** Last-mile delivery remains the main obstacle. Solutions are emerging: motorbike couriers, partnerships with logistics aggregators like Send (Ghana) or Kobo360 (Nigeria).

**Internet connection:** In areas with low coverage, platforms accessible via USSD (without internet) or operating offline are preferable.

**Digital literacy:** Basic training in smartphone and platform use is offered by organizations such as GreenFCO, Jokkolabs (Senegal), or CIPB (Burkina Faso).

---

## Testimonial

Mariam Kaboré, market gardener in Koudougou (Burkina Faso): *"Before, I sold my tomatoes at 50 FCFA/kg at the edge of the field because I didn't know other buyers. Since joining a digital platform, I sell at 120-150 FCFA/kg directly to restaurants in Ouagadougou. It has changed my life."*

Digital markets do not replace physical markets, but they offer producers an additional channel and better price information. The key is to start simply and learn progressively.
    `},"agroecologie-burkina-faso-enjeux":{title_fr:"Agroécologie au Burkina Faso : Enjeux et Perspectives pour 2025",title_en:"Agroecology in Burkina Faso: Challenges and Prospects for 2025",author:"GreenFCO Team",date:"2024-04-10",category:"Agriculture Durable",readTime:"6 min",body_fr:`
## Un contexte difficile mais porteur

Le Burkina Faso fait face à des défis climatiques et sécuritaires sans précédent. La dégradation des terres agricoles touche plus de 34 % du territoire national. Dans ce contexte, l'agroécologie émerge comme une réponse adaptée, conciliant productivité, résilience et durabilité.

---

## Les défis de l'agriculture burkinabè

**Dégradation des sols :** L'érosion hydrique et éolienne entraîne une perte annuelle estimée à 40 tonnes de sol par hectare dans les zones non protégées. La teneur en matière organique des sols burkinabè est parmi les plus faibles de la sous-région (< 0,5 % dans de nombreuses zones).

**Variabilité climatique :** Les pluviométries sont de plus en plus erratiques. La saison des pluies se raccourcit progressivement, passant de 5 mois dans les années 1970 à moins de 3,5 mois dans certaines zones sahéliennes aujourd'hui.

**Accès aux intrants :** Les engrais minéraux sont coûteux et peu accessibles aux petits producteurs. Le prix de l'urée a doublé depuis 2020, rendant les systèmes intensifs encore moins durables financièrement.

---

## Les pratiques agroécologiques adaptées

**Le compostage et la fumure organique :** En substituant partiellement les engrais chimiques par du compost, les agriculteurs peuvent maintenir leurs rendements tout en améliorant la structure du sol. Un hectare traité avec 5 tonnes de compost de qualité produit autant que 100 kg d'engrais NPK, à moindre coût.

**Les haies vives et brise-vent :** Les haies de Jatropha, Euphorbe ou Acacia protègent les cultures de l'érosion éolienne, fixent le sol et fournissent du bois de chauffe.

**L'association culturale :** Associer le maïs avec le niébé ou l'arachide améliore la fertilité du sol, diversifie la production et réduit les risques liés aux aléas climatiques.

---

## Perspectives 2025

Les institutions nationales (INERA, Ministère de l'Agriculture) et des ONG comme GreenFCO travaillent à la diffusion des bonnes pratiques agroécologiques. Les formations de terrain, les champs-école paysans et les plateformes numériques (comme GreenFCO) jouent un rôle crucial dans cette transition.

L'agroécologie n'est pas une contrainte mais une opportunité : elle permet aux agriculteurs burkinabè de produire mieux, à moindre coût, tout en préservant leur capital naturel pour les générations futures.
    `,body_en:`
## A Difficult But Promising Context

Burkina Faso faces unprecedented climate and security challenges. Agricultural land degradation affects more than 34% of the national territory. In this context, agroecology is emerging as an adapted response, reconciling productivity, resilience, and sustainability.

---

## Challenges Facing Burkinabe Agriculture

**Soil degradation:** Water and wind erosion causes an estimated annual loss of 40 tonnes of soil per hectare in unprotected areas. Burkina Faso's soil organic matter content is among the lowest in the sub-region (< 0.5% in many zones).

**Climate variability:** Rainfall patterns are increasingly erratic. The rainy season is progressively shortening, from 5 months in the 1970s to less than 3.5 months in some Sahelian zones today.

**Input access:** Mineral fertilizers are expensive and inaccessible to small producers. Urea prices have doubled since 2020, making intensive systems even less financially sustainable.

---

## Adapted Agroecological Practices

**Composting and organic manure:** By partially substituting chemical fertilizers with compost, farmers can maintain yields while improving soil structure. One hectare treated with 5 tonnes of quality compost produces as much as 100 kg of NPK fertilizer, at lower cost.

**Living hedges and windbreaks:** Jatropha, Euphorbia, or Acacia hedges protect crops from wind erosion, stabilize soil, and provide firewood.

**Intercropping:** Associating maize with cowpea or peanut improves soil fertility, diversifies production, and reduces risks related to climate variability.

---

## 2025 Outlook

National institutions (INERA, Ministry of Agriculture) and NGOs like GreenFCO are working to spread good agroecological practices. Field training, farmer field schools, and digital platforms (like GreenFCO) play a crucial role in this transition.

Agroecology is not a constraint but an opportunity: it allows Burkinabe farmers to produce better, at lower cost, while preserving their natural capital for future generations.
    `},"finance-carbone-afrique-opportunites":{title_fr:"Finance Carbone en Afrique de l'Ouest : Opportunités pour les Agriculteurs",title_en:"Carbon Finance in West Africa: Opportunities for Farmers",author:"Wenmanegda Elie DIPAMA",date:"2024-05-22",category:"Recherche & Innovation",readTime:"7 min",body_fr:`
## Qu'est-ce que la finance carbone ?

Les marchés volontaires du carbone permettent à des entreprises et des individus de compenser leurs émissions de gaz à effet de serre en achetant des crédits carbone. Chaque crédit représente une tonne de CO₂ équivalent séquestré ou évité. Pour les agriculteurs africains pratiquant des techniques comme l'agroforesterie, la régénération naturelle assistée ou la séquestration dans les sols, ces marchés représentent une source de revenus supplémentaire significative.

---

## Potentiel pour l'Afrique de l'Ouest

L'Afrique subsaharienne dispose d'un potentiel théorique de séquestration carbone estimé à 1,5 à 3 gigatonnes de CO₂ par an via la restauration des terres et les pratiques agricoles durables. Pourtant, moins de 5 % des crédits carbone échangés sur les marchés mondiaux proviennent d'Afrique, selon Verra et Gold Standard.

Les principales raisons de cette sous-représentation : les coûts de certification élevés, la complexité des procédures de MRV (Mesure, Reporting, Vérification), et le manque d'accès à l'information des producteurs africains.

---

## Pratiques génératrices de crédits carbone

**Agroforesterie (RNAAA) :** La régénération d'arbres sur les parcelles agricoles séquestre du carbone dans la biomasse et le sol. Au Sahel, chaque hectare pratiquant la RNAAA séquestre en moyenne 0,5 à 2 tonnes de CO₂ par an.

**Agriculture de conservation :** Le non-travail du sol (semis direct) réduit l'oxydation de la matière organique et maintient le carbone dans le sol. Des projets au Kenya et en Éthiopie ont démontré des séquestrations de 1 à 3 tonnes CO₂/ha/an.

**Biogaz agricole :** La valorisation des déchets animaux en biogaz réduit les émissions de méthane et remplace les combustibles fossiles.

---

## Comment accéder aux marchés carbone ?

**Via des agrégateurs de projets :** Des organisations comme Natural Capital Partners, South Pole ou des ONG locales agréées regroupent les petits producteurs pour atteindre les seuils de certification. GreenFCO travaille à devenir un agrégateur certifié pour les agriculteurs d'Afrique de l'Ouest.

**Programmes gouvernementaux :** Le Burkina Faso, le Sénégal et le Ghana ont lancé des programmes REDD+ (Réduction des Émissions dues à la Déforestation et à la Dégradation des forêts) qui permettent aux communautés rurales de bénéficier de paiements pour services environnementaux.

---

## Perspectives

Avec le renforcement de l'Accord de Paris et la montée en puissance des engagements de neutralité carbone des entreprises mondiales, la demande de crédits carbone de haute qualité devrait croître de 15 à 20 % par an jusqu'en 2030. L'Afrique de l'Ouest, avec ses vastes terres dégradées à restaurer, est idéalement positionnée pour saisir ces opportunités — à condition d'investir dans les capacités, la certification et les réseaux de distribution.
    `,body_en:`
## What is Carbon Finance?

Voluntary carbon markets allow companies and individuals to offset their greenhouse gas emissions by purchasing carbon credits. Each credit represents one tonne of CO₂ equivalent sequestered or avoided. For African farmers practicing techniques such as agroforestry, farmer-managed natural regeneration (FMNR), or soil sequestration, these markets represent a significant additional income source.

---

## Potential for West Africa

Sub-Saharan Africa has a theoretical carbon sequestration potential estimated at 1.5 to 3 gigatons of CO₂ per year through land restoration and sustainable agricultural practices. Yet less than 5% of carbon credits traded on global markets come from Africa, according to Verra and Gold Standard.

The main reasons for this under-representation: high certification costs, the complexity of MRV (Measurement, Reporting, Verification) procedures, and lack of access to information among African producers.

---

## Practices That Generate Carbon Credits

**Agroforestry (FMNR):** Tree regeneration on agricultural plots sequesters carbon in biomass and soil. In the Sahel, each hectare practicing FMNR sequesters on average 0.5 to 2 tonnes of CO₂ per year.

**Conservation agriculture:** No-till farming (direct seeding) reduces organic matter oxidation and maintains carbon in the soil. Projects in Kenya and Ethiopia have demonstrated sequestrations of 1 to 3 tonnes CO₂/ha/year.

**Agricultural biogas:** Converting animal waste into biogas reduces methane emissions and replaces fossil fuels.

---

## How to Access Carbon Markets?

**Via project aggregators:** Organizations such as Natural Capital Partners, South Pole, or certified local NGOs pool small producers to reach certification thresholds. GreenFCO is working to become a certified aggregator for West African farmers.

**Government programs:** Burkina Faso, Senegal, and Ghana have launched REDD+ programs (Reducing Emissions from Deforestation and Forest Degradation) that allow rural communities to benefit from payments for environmental services.

---

## Outlook

With the strengthening of the Paris Agreement and the rise of net-zero commitments from global companies, demand for high-quality carbon credits is expected to grow by 15 to 20% per year through 2030. West Africa, with its vast degraded lands to restore, is ideally positioned to seize these opportunities — provided it invests in capacity, certification, and distribution networks.
    `},"faidherbia-albida-sahel":{title_fr:"Faidherbia Albida : L'Arbre du Sahel qui Nourrit les Champs",title_en:"Faidherbia Albida: The Sahel Tree that Feeds the Fields",author:"GreenFCO Team",date:"2024-06-08",category:"Environnement",readTime:"5 min",body_fr:`
## L'arbre inversé du Sahel

Le Faidherbia albida (syn. Acacia albida), appelé "baobab inversé" ou "arbre à palabres" au Burkina Faso, est l'espèce agroforestière la plus stratégique du Sahel. Sa particularité remarquable : contrairement à presque tous les autres arbres, il perd ses feuilles en saison des pluies et les garde en saison sèche. Cette phénologie inversée en fait l'allié idéal des cultures céréalières.

---

## Bénéfices agronomiques prouvés

**Augmentation des rendements :** De nombreuses études ont documenté des augmentations de rendements spectaculaires sous les Faidherbia. Au Mali et au Niger, des gains de 30 à 100 % de rendement en mil et sorgho ont été mesurés sous la canopée des arbres par rapport aux zones sans arbres.

**Fixation de l'azote :** Comme toutes les légumineuses, le Faidherbia possède des nodosités racinaires fixant l'azote atmosphérique. Un arbre adulte peut fixer jusqu'à 30 à 50 kg d'azote par hectare et par an — l'équivalent de 65 à 110 kg d'urée.

**Amélioration de la structure du sol :** Ses racines pivotantes profondes (jusqu'à 40 mètres) remontrent les nutriments des couches profondes et améliorent la porosité du sol, favorisant l'infiltration de l'eau.

**Fourrage de qualité :** Les gousses et les feuilles sont une source précieuse de fourrage pour le bétail pendant la saison sèche, période de pénurie alimentaire animale.

---

## Le miracle du Niger : la RNAAA

Dans les années 1980, le Niger subissait une catastrophe écologique : les sécheresses successives et le défrichement avaient transformé des millions d'hectares en désert. Depuis 1985, grâce à la Régénération Naturelle Assistée des Arbres et Arbustes (RNAAA) initiée par Tony Rinaudo et les communautés locales, plus de 5 millions d'hectares ont été reverdis, principalement grâce au Faidherbia albida.

Résultat : les rendements agricoles ont augmenté, la sécurité alimentaire s'est améliorée pour plusieurs millions de familles, et des centaines de tonnes de carbone ont été séquestrées.

---

## Comment intégrer le Faidherbia dans son exploitation

**Régénération naturelle :** La méthode la plus simple et la moins coûteuse est de protéger les jeunes pousses naturelles de Faidherbia déjà présentes dans les champs et en bordure de parcelle, en évitant de les arracher lors du labour.

**Plantation en pépinière :** Pour les zones très dégradées, des plants peuvent être produits en pépinière (les graines nécessitent une scarification avant semis) et transplantés en début de saison des pluies.

**Densité recommandée :** Pour les cultures céréalières, une densité de 40 à 100 arbres par hectare est recommandée, avec un espacement de 10 à 15 mètres pour maintenir un bon accès à la lumière.

---

## Un symbole de l'espoir agroécologique

Le Faidherbia albida incarne la vision de GreenFCO : une agriculture qui travaille avec la nature plutôt que contre elle. Dans un contexte de changement climatique et de pression sur les ressources naturelles, cet arbre représente une solution à la fois ancestrale et scientifiquement validée pour la sécurité alimentaire de l'Afrique sahélienne.
    `,body_en:`
## The Inverted Tree of the Sahel

Faidherbia albida (syn. Acacia albida), called the "inverted baobab" or "palaver tree" in Burkina Faso, is the most strategic agroforestry species in the Sahel. Its remarkable characteristic: unlike almost all other trees, it loses its leaves during the rainy season and keeps them during the dry season. This inverted phenology makes it the ideal ally of cereal crops.

---

## Proven Agronomic Benefits

**Yield increases:** Many studies have documented spectacular yield increases under Faidherbia trees. In Mali and Niger, gains of 30 to 100% in millet and sorghum yields have been measured under tree canopies compared to treeless areas.

**Nitrogen fixation:** Like all legumes, Faidherbia has root nodules that fix atmospheric nitrogen. A mature tree can fix up to 30 to 50 kg of nitrogen per hectare per year — the equivalent of 65 to 110 kg of urea.

**Soil structure improvement:** Its deep taproot (up to 40 meters) brings nutrients from deep layers to the surface and improves soil porosity, promoting water infiltration.

**Quality fodder:** The pods and leaves are a valuable fodder source for livestock during the dry season, a period of animal food scarcity.

---

## The Niger Miracle: FMNR

In the 1980s, Niger was experiencing an ecological catastrophe: successive droughts and land clearing had turned millions of hectares into desert. Since 1985, thanks to Farmer-Managed Natural Regeneration (FMNR) initiated by Tony Rinaudo and local communities, more than 5 million hectares have been regreened, mainly through Faidherbia albida.

Result: agricultural yields have increased, food security has improved for several million families, and hundreds of tonnes of carbon have been sequestered.

---

## How to Integrate Faidherbia into Your Farm

**Natural regeneration:** The simplest and least expensive method is to protect young Faidherbia shoots already present in fields and field borders, avoiding uprooting them during tillage.

**Nursery planting:** For heavily degraded areas, seedlings can be produced in nurseries (seeds require scarification before sowing) and transplanted at the start of the rainy season.

**Recommended density:** For cereal crops, a density of 40 to 100 trees per hectare is recommended, with 10 to 15 meter spacing to maintain good light access.

---

## A Symbol of Agroecological Hope

Faidherbia albida embodies GreenFCO's vision: an agriculture that works with nature rather than against it. In a context of climate change and pressure on natural resources, this tree represents a solution that is both ancestral and scientifically validated for food security in Sahelian Africa.
    `},"agroforesterie-arbres-rendements":{title_fr:"Agroforesterie : planter des arbres pour améliorer les rendements",title_en:"Agroforestry: Planting Trees to Improve Yields",author:"Seydou Ouédraogo",date:"2026-05-12",category:"Agroforesterie",readTime:"6 min",body_fr:`
## L'agroforesterie, une solution ancestrale réinventée

L'association d'arbres et de cultures agricoles est une pratique millénaire en Afrique de l'Ouest. Longtemps marginalisée par les politiques agricoles modernes qui préconisaient le défrichement, elle connaît depuis les années 2000 un regain d'intérêt scientifique et pratique. Aujourd'hui, plus de 1,5 million d'agriculteurs au Sahel pratiquent la Régénération Naturelle Assistée des Arbres et Arbustes (RNAAA), selon le World Resources Institute.

Les résultats sont probants : dans les zones où la RNAAA est pratiquée (Niger, Burkina Faso, Mali), les rendements de mil et de sorgho sont en moyenne 20 à 85 % supérieurs à ceux des parcelles sans arbres.

---

## Les mécanismes par lesquels les arbres améliorent les rendements

**Fixation de l'azote atmosphérique :** Des espèces comme Faidherbia albida (appelé "arbre à palabres" au Burkina Faso), Acacia senegal et Piliostigma reticulatum fixent l'azote grâce à des bactéries symbiotiques dans leurs racines, enrichissant naturellement le sol.

**Amélioration de la structure du sol :** Les racines profondes des arbres brisent la compaction du sol, améliorent le drainage et remontent les nutriments des couches profondes vers la surface (pompage biologique).

**Effet brise-vent :** Les haies brise-vent réduisent la vitesse du vent de 30 à 70 %, diminuant l'évapotranspiration des cultures de 15 à 30 % et protégeant les jeunes plants contre l'érosion éolienne.

**Microclimat favorable :** L'ombrage partiel des arbres réduit les températures au niveau du sol de 2 à 5°C, ce qui est particulièrement bénéfique lors des pointes de chaleur en début de saison.

**Biomasse et matière organique :** Les feuilles tombées des arbres forment un mulch naturel qui augmente la teneur en matière organique du sol de 0,2 à 0,5 % par an — essentiel pour la rétention d'eau.

---

## Espèces agroforestières recommandées en Afrique de l'Ouest

**Faidherbia albida :** L'espèce phare de l'agroforesterie sahélienne. Sa particularité : elle garde ses feuilles en saison sèche et les perd en saison des pluies, évitant ainsi la compétition avec les cultures. Sous un Faidherbia, les rendements de céréales augmentent de 30 à 100 %.

**Moringa oleifera :** Croissance rapide, feuilles très nutritives (riches en vitamines A, C et en protéines), graines utilisées pour la purification de l'eau. Idéal en haie ou en bordure de parcelle.

**Jatropha curcas :** Utilisé en haie vive pour délimiter les parcelles et comme source de biocarburant. Résiste à la sécheresse et au feu.

**Vitellaria paradoxa (karité) :** Arbre multifonctionnel : ombre, beurre de karité (haute valeur marchande), bois. Espèce protégée et favorisée dans les parcs à karité du Burkina Faso.

**Parkia biglobosa (néré) :** Les graines fermentées (soumbala) sont un condiment de base en Afrique de l'Ouest. Les gousses sucrées servent d'aliment et de fourrage.

---

## Comment démarrer en agroforesterie

**Démarche progressive :** Commencer par protéger et régénérer les arbres existants sur la parcelle plutôt que de tout défricher. C'est le principe de la RNAAA (Régénération Naturelle Assistée).

**Planification de l'espacement :** En culture pluviale céréalière, un espacement de 10 à 20 mètres entre les arbres permet de maintenir 80 à 90 % de la lumière au niveau des cultures.

**Pépinières locales :** Des pépinières villageoises produisent des plants adaptés aux conditions locales. Au Burkina Faso, les DPAHRH (Directions Provinciales de l'Agriculture) et des ONG comme Treeaid proposent des plants à faible coût.

---

## Retours d'expérience de producteurs

Dramane Ouédraogo, agriculteur à Zorgho (Burkina Faso) : *"J'ai commencé la RNAAA en 2018. Aujourd'hui, j'ai 45 Faidherbia sur mes 3 hectares. Mes rendements de sorgho ont augmenté de 60 %, je n'ai plus besoin d'acheter autant d'engrais, et je vends le bois mort en saison sèche. L'arbre est mon allié."*

Kadiatou Bah, agricultrice à Ségou (Mali) : *"Le moringa que j'ai planté en bordure de mon jardin me donne des feuilles que je vends au marché à Ségou. C'est un revenu que je n'avais pas avant, sans que ça m'enlève de surface cultivable."*

L'agroforesterie est une des rares pratiques agricoles qui améliore simultanément la production, la résilience climatique, la biodiversité et les revenus des agriculteurs. Elle est au cœur de la vision de GreenFCO pour une agriculture durable en Afrique de l'Ouest.
    `,body_en:`
## Agroforestry: An Ancestral Solution Reinvented

The association of trees and food crops is a centuries-old practice in West Africa. Long marginalized by modern agricultural policies advocating for land clearing, it has experienced a resurgence of scientific and practical interest since the 2000s. Today, more than 1.5 million farmers in the Sahel practice Farmer-Managed Natural Regeneration (FMNR), according to the World Resources Institute.

The results are convincing: in areas where FMNR is practiced (Niger, Burkina Faso, Mali), millet and sorghum yields are on average 20 to 85% higher than on plots without trees.

---

## How Trees Improve Yields

**Atmospheric nitrogen fixation:** Species such as Faidherbia albida (called the "palaver tree" in Burkina Faso), Acacia senegal, and Piliostigma reticulatum fix nitrogen through symbiotic bacteria in their roots, naturally enriching the soil.

**Soil structure improvement:** Deep tree roots break up soil compaction, improve drainage, and bring nutrients from deep layers to the surface (biological pumping).

**Windbreak effect:** Windbreak hedges reduce wind speed by 30 to 70%, decreasing crop evapotranspiration by 15 to 30% and protecting young plants from wind erosion.

**Favorable microclimate:** Partial tree shade reduces ground-level temperatures by 2 to 5°C, which is particularly beneficial during heat peaks at the start of the season.

**Biomass and organic matter:** Fallen tree leaves form a natural mulch that increases soil organic matter content by 0.2 to 0.5% per year — essential for water retention.

---

## Recommended Agroforestry Species in West Africa

**Faidherbia albida:** The flagship species of Sahelian agroforestry. Its peculiarity: it retains its leaves during the dry season and sheds them during the rainy season, thus avoiding competition with crops. Under a Faidherbia, cereal yields increase by 30 to 100%.

**Moringa oleifera:** Fast-growing, highly nutritious leaves (rich in vitamins A, C, and protein), seeds used for water purification. Ideal as a hedge or field border.

**Jatropha curcas:** Used as a living hedge to delimit plots and as a biofuel source. Resistant to drought and fire.

**Vitellaria paradoxa (shea):** Multifunctional tree: shade, shea butter (high market value), wood. A protected species favored in Burkina Faso's shea parks.

**Parkia biglobosa (locust bean):** Fermented seeds (soumbala) are a staple condiment in West Africa. Sweet pods serve as food and fodder.

---

## How to Get Started in Agroforestry

**Progressive approach:** Start by protecting and regenerating existing trees on the plot rather than clearing everything. This is the principle of FMNR (Farmer-Managed Natural Regeneration).

**Spacing planning:** In rainfed cereal cultivation, a spacing of 10 to 20 meters between trees maintains 80 to 90% of light at crop level.

**Local nurseries:** Village nurseries produce plants adapted to local conditions. In Burkina Faso, DPAHRHs (Provincial Agricultural Directorates) and NGOs like Treeaid offer low-cost plants.

---

## Producer Feedback

Dramane Ouédraogo, farmer in Zorgho (Burkina Faso): *"I started FMNR in 2018. Today I have 45 Faidherbias on my 3 hectares. My sorghum yields have increased by 60%, I no longer need to buy as much fertilizer, and I sell dead wood in the dry season. The tree is my ally."*

Kadiatou Bah, farmer in Ségou (Mali): *"The moringa I planted at the edge of my garden gives me leaves that I sell at the market in Ségou. It is income I didn't have before, without taking away any cultivable area."*

Agroforestry is one of the rare agricultural practices that simultaneously improves production, climate resilience, biodiversity, and farmer income. It is at the heart of GreenFCO's vision for sustainable agriculture in West Africa.
    `}};function La(){var l;const{slug:r}=Ft(),{t,i18n:s}=D(),n=(l=s.language)!=null&&l.startsWith("fr")?"fr":"en",a=Ra[r];if(!a)return e.jsx("main",{className:"section",children:e.jsxs("div",{className:"container",style:{textAlign:"center"},children:[e.jsx("h2",{children:n==="fr"?"Article introuvable":"Article not found"}),e.jsx(S,{to:"/blog",className:"btn btn-primary",style:{marginTop:"1rem"},children:n==="fr"?"← Retour au blog":"← Back to blog"})]})});const i=typeof window<"u"?window.location.href:"",o=a[`title_${n}`];return e.jsxs("main",{className:"blog-post-page",children:[e.jsx("div",{className:"post-hero",children:e.jsxs("div",{className:"container",children:[e.jsx(S,{to:"/blog",className:"back-link",children:"← Blog"}),e.jsxs("div",{className:"post-meta",children:[e.jsx("span",{className:"badge badge-green",children:a.category}),e.jsx("span",{className:"post-date",children:new Date(a.date).toLocaleDateString(n==="fr"?"fr-FR":"en-US",{year:"numeric",month:"long",day:"numeric"})}),e.jsxs("span",{className:"post-read-time",children:["⏱ ",a.readTime]})]}),e.jsx("h1",{children:a[`title_${n}`]})]})}),e.jsxs("div",{className:"container post-layout",children:[e.jsxs("article",{className:"post-content",children:[e.jsx("div",{className:"post-image img-placeholder",style:{height:"400px",marginBottom:"2.5rem"},children:e.jsx("span",{children:n==="fr"?"Photo interview / GreenFCO — 1200×500px":"Interview photo / GreenFCO — 1200×500px"})}),e.jsx("div",{className:"prose",dangerouslySetInnerHTML:{__html:Pa(a[`body_${n}`])}})]}),e.jsxs("aside",{className:"post-sidebar",children:[e.jsxs("div",{className:"card author-bio-card",children:[e.jsx("div",{className:"author-avatar",style:{width:"64px",height:"64px",fontSize:"1.5rem",margin:"0 0 1rem"},children:a.author.charAt(0)}),e.jsx("h4",{children:a.author}),e.jsx("p",{children:n==="fr"?"Co-fondateur & Expert Agro-Environnemental, GreenFCO":"Co-founder & Agro-Environmental Expert, GreenFCO"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.4rem",marginTop:"0.75rem"},children:[e.jsx("span",{className:"badge badge-green",children:"🏅 Mandela Washington Fellow 2023"}),e.jsx("span",{className:"badge badge-green",children:"🔬 Humboldt Fellow 2025"})]}),e.jsx("a",{href:"mailto:info@greenfco.com",className:"btn btn-secondary btn-sm",style:{marginTop:"1rem",width:"100%",textAlign:"center"},children:n==="fr"?"Contacter l'auteur":"Contact author"})]}),e.jsxs("div",{className:"card share-card",children:[e.jsx("h4",{children:n==="fr"?"Partager cet article":"Share this article"}),e.jsxs("div",{className:"share-buttons",children:[e.jsx("a",{href:`https://wa.me/?text=${encodeURIComponent(o+" "+i)}`,target:"_blank",rel:"noreferrer",className:"btn btn-whatsapp btn-sm",children:"💬 WhatsApp"}),e.jsx("a",{href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(i)}`,target:"_blank",rel:"noreferrer",className:"btn btn-secondary btn-sm",children:"Facebook"}),e.jsx("a",{href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(o)}&url=${encodeURIComponent(i)}`,target:"_blank",rel:"noreferrer",className:"btn btn-secondary btn-sm",children:"Twitter/X"})]})]})]})]})]})}function Pa(r){return r?r.replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>").replace(/^---$/gm,'<hr style="border:none;border-top:1px solid var(--gray-light);margin:2rem 0">').replace(/^\d+\. \*\*(.+?)\*\* — (.+)$/gm,"<li><strong>$1</strong> — $2</li>").replace(/(<li>.*<\/li>\n?)+/g,"<ol>$&</ol>").replace(/\n\n/g,"</p><p>").replace(/^(?!<h|<bl|<hr|<ol|<li)(.+)$/gm,(t,s)=>s.startsWith("<")?t:`<p>${s}</p>`).replace(/<p><\/p>/g,""):""}const Wr=["Tout","Terrain","Formations","Événements","Ferme-École"],Ta=["All","Field","Training","Events","Farm School"],$r=[{id:1,cat:"Terrain",w:600,h:400,label_fr:"Visite terrain — Burkina Faso",label_en:"Field visit — Burkina Faso"},{id:2,cat:"Formations",w:600,h:600,label_fr:"Formation agriculture durable",label_en:"Sustainable agriculture training"},{id:3,cat:"Terrain",w:800,h:500,label_fr:"Parcelles maraîchères",label_en:"Market garden plots"},{id:4,cat:"Événements",w:600,h:400,label_fr:"Forum agro-environmental",label_en:"Agro-environmental forum"},{id:5,cat:"Ferme-École",w:600,h:800,label_fr:"Ferme-école — démonstration",label_en:"Farm school — demonstration"},{id:6,cat:"Formations",w:600,h:400,label_fr:"Agriculture hors-sol workshop",label_en:"Soilless agriculture workshop"},{id:7,cat:"Terrain",w:800,h:600,label_fr:"Aménagements hydro-agricoles",label_en:"Hydro-agricultural development"},{id:8,cat:"Événements",w:600,h:400,label_fr:"Rencontre avec partenaires",label_en:"Partner meeting"},{id:9,cat:"Ferme-École",w:600,h:600,label_fr:"Formation pratique — semences",label_en:"Practical training — seeds"}];function Da(){var d;const{t:r,i18n:t}=D(),s=(d=t.language)!=null&&d.startsWith("fr")?"fr":"en",[n,a]=b.useState(0),[i,o]=b.useState(null),l=s==="fr"?Wr:Ta,u=n===0?$r:$r.filter(c=>c.cat===Wr[n]);return e.jsxs("main",{className:"gallery-page",children:[e.jsxs("section",{className:"page-hero",children:[e.jsx("div",{className:"page-hero-bg"}),e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"eyebrow",children:s==="fr"?"Galerie":"Gallery"}),e.jsx("h1",{children:s==="fr"?"Nos Actions en Images":"Our Actions in Pictures"}),e.jsx("p",{children:s==="fr"?"Découvrez nos activités de terrain, formations, événements et ferme-école à travers ces témoignages visuels.":"Discover our field activities, training, events, and farm school through these visual testimonials."})]})]}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"gallery-filter",children:l.map((c,p)=>e.jsx("button",{className:`filter-btn ${n===p?"active":""}`,onClick:()=>a(p),children:c},c))}),e.jsx("div",{className:"masonry-grid",children:u.map((c,p)=>e.jsxs("div",{className:"masonry-item",style:{animationDelay:`${p*.05}s`},onClick:()=>o(c),children:[e.jsx("div",{className:"img-placeholder gallery-img",style:{paddingBottom:`${c.h/c.w*100}%`},children:e.jsx("span",{className:"gallery-label",children:s==="fr"?c.label_fr:c.label_en})}),e.jsxs("div",{className:"gallery-overlay",children:[e.jsx("span",{className:"gallery-zoom",children:"🔍"}),e.jsx("p",{children:s==="fr"?c.label_fr:c.label_en})]})]},c.id))}),e.jsxs("div",{className:"video-section",style:{marginTop:"4rem"},children:[e.jsx("h2",{style:{textAlign:"center",marginBottom:"2rem"},children:s==="fr"?"Vidéos":"Videos"}),e.jsxs("div",{className:"grid-2",children:[e.jsx("div",{className:"video-placeholder",children:e.jsx("div",{className:"img-placeholder",style:{height:"220px"},children:e.jsxs("span",{children:["🎬 ",s==="fr"?"Vidéo présentation GreenFCO — YouTube/Vimeo":"GreenFCO presentation video — YouTube/Vimeo"]})})}),e.jsx("div",{className:"video-placeholder",children:e.jsx("div",{className:"img-placeholder",style:{height:"220px"},children:e.jsxs("span",{children:["🎬 ",s==="fr"?"Vidéo terrain — Formation agroécologie":"Field video — Agroecology training"]})})})]})]})]})}),i&&e.jsx("div",{className:"lightbox",onClick:()=>o(null),children:e.jsxs("div",{className:"lightbox-content",onClick:c=>c.stopPropagation(),children:[e.jsx("button",{className:"lightbox-close",onClick:()=>o(null),children:"✕"}),e.jsx("div",{className:"img-placeholder",style:{width:"100%",height:"400px"},children:e.jsx("span",{children:s==="fr"?i.label_fr:i.label_en})}),e.jsx("p",{className:"lightbox-caption",children:s==="fr"?i.label_fr:i.label_en})]})})]})}function Hr(r,t){document.title=r;const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content",t)}function Ia(){var p;const{t:r,i18n:t}=D(),s=(p=t.language)!=null&&p.startsWith("fr")?"fr":"en",[n,a]=b.useState({name:"",email:"",subject:"",message:"",country:""}),[i,o]=b.useState(null),[l,u]=b.useState(!1);b.useEffect(()=>{s==="fr"?Hr("Contact | GreenFCO — Parlons de Votre Projet Agricole","Contactez GreenFCO pour discuter de votre projet agro-environnemental. Notre équipe d'experts est basée à Ouagadougou, Burkina Faso et disponible du lundi au vendredi."):Hr("Contact | GreenFCO — Let's Talk About Your Agricultural Project","Contact GreenFCO to discuss your agro-environmental project. Our team of experts is based in Ouagadougou, Burkina Faso and available Monday to Friday.")},[s]);function d(x){a(f=>({...f,[x.target.name]:x.target.value}))}async function c(x){x.preventDefault(),u(!0);try{await ie.post("/contact",n),o("success"),a({name:"",email:"",subject:"",message:"",country:""})}catch{o("error")}finally{u(!1)}}return e.jsxs("main",{className:"contact-page",children:[e.jsxs("section",{className:"page-hero",children:[e.jsx("div",{className:"page-hero-bg"}),e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"eyebrow",children:r("contact.title")}),e.jsx("h1",{children:s==="fr"?"Parlons de Votre Projet":"Let's Talk About Your Project"}),e.jsx("p",{children:r("contact.subtitle")})]})]}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container contact-layout",children:[e.jsxs("div",{className:"contact-info",children:[e.jsxs("div",{className:"info-block card",children:[e.jsx("div",{className:"info-icon",children:"📍"}),e.jsx("h3",{children:s==="fr"?"Adresse":"Address"}),e.jsx("p",{children:"Ouagadougou, Burkina Faso"}),e.jsx("p",{children:s==="fr"?"Afrique de l'Ouest":"West Africa"})]}),e.jsxs("div",{className:"info-block card",children:[e.jsx("div",{className:"info-icon",children:"✉️"}),e.jsx("h3",{children:"Email"}),e.jsx("a",{href:"mailto:info@greenfco.com",children:"info@greenfco.com"})]}),e.jsxs("div",{className:"info-block card whatsapp-block",children:[e.jsx("div",{className:"info-icon",children:"💬"}),e.jsx("h3",{children:"WhatsApp"}),e.jsx("p",{children:s==="fr"?"Canal de communication privilégié":"Preferred communication channel"}),e.jsxs("a",{href:"https://wa.me/22600000000",target:"_blank",rel:"noreferrer",className:"btn btn-whatsapp",children:["💬 ",r("contact.whatsapp")]})]}),e.jsxs("div",{className:"info-block card",children:[e.jsx("div",{className:"info-icon",children:"🕐"}),e.jsx("h3",{children:s==="fr"?"Disponibilité":"Availability"}),e.jsx("p",{children:s==="fr"?"Lundi – Vendredi : 8h00 – 18h00 (GMT+0)":"Monday – Friday: 8:00 AM – 6:00 PM (GMT+0)"})]}),e.jsxs("div",{className:"map-placeholder",children:[e.jsx("div",{className:"img-placeholder",style:{height:"250px",borderRadius:"var(--radius-lg)"},children:e.jsxs("span",{children:["🗺️ ",s==="fr"?"Carte — Ouagadougou, Burkina Faso":"Map — Ouagadougou, Burkina Faso"]})}),e.jsx("p",{style:{fontSize:"0.82rem",color:"var(--gray-mid)",marginTop:"0.5rem",textAlign:"center"},children:"Ouagadougou, Burkina Faso · +226 XX XX XX XX"})]})]}),e.jsx("div",{className:"contact-form-section",children:e.jsxs("div",{className:"card",style:{padding:"2.5rem"},children:[e.jsx("h2",{style:{marginBottom:"0.5rem"},children:s==="fr"?"Envoyez-nous un message":"Send us a message"}),e.jsx("p",{style:{color:"var(--gray-mid)",fontSize:"0.9rem",marginBottom:"2rem"},children:s==="fr"?"Nous vous répondons sous 24-48h (jours ouvrés).":"We respond within 24-48h (business days)."}),i==="success"&&e.jsxs("div",{className:"form-success",children:["✅ ",r("contact.success")]}),i==="error"&&e.jsxs("div",{className:"form-error",children:["❌ ",r("contact.error")]}),e.jsxs("form",{onSubmit:c,children:[e.jsxs("div",{className:"grid-2",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("contact.form_name")," *"]}),e.jsx("input",{type:"text",name:"name",className:"form-input",value:n.name,onChange:d,required:!0,placeholder:s==="fr"?"Votre nom complet":"Your full name"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:r("contact.form_country")}),e.jsx("input",{type:"text",name:"country",className:"form-input",value:n.country,onChange:d,placeholder:"Burkina Faso"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("contact.form_email")," *"]}),e.jsx("input",{type:"email",name:"email",className:"form-input",value:n.email,onChange:d,required:!0,placeholder:"example@email.com"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("contact.form_subject")," *"]}),e.jsx("input",{type:"text",name:"subject",className:"form-input",value:n.subject,onChange:d,required:!0,placeholder:s==="fr"?"Sujet de votre message":"Subject of your message"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("contact.form_message")," *"]}),e.jsx("textarea",{name:"message",className:"form-input",value:n.message,onChange:d,required:!0,rows:6,placeholder:s==="fr"?"Décrivez votre projet ou votre demande...":"Describe your project or request..."})]}),e.jsx("button",{type:"submit",className:"btn btn-primary",disabled:l,style:{width:"100%"},children:l?s==="fr"?"Envoi...":"Sending...":r("contact.form_submit")})]})]})})]})})]})}const Ba=r=>ie.post("/auth/login",r),Ma=r=>ie.post("/auth/register",r),za=r=>ie.post("/auth/forgot-password",{email:r});function Ga(){var x;const{t:r,i18n:t}=D(),s=(x=t.language)!=null&&x.startsWith("fr")?"fr":"en",n=Kr(),a=ue(f=>f.setAuth),[i,o]=b.useState({email:"",password:""}),[l,u]=b.useState(""),[d,c]=b.useState(!1);async function p(f){var A,v;f.preventDefault(),c(!0),u("");try{const g=await Ba(i);a(g.data.user,g.data.token),n("/dashboard")}catch(g){u(((v=(A=g.response)==null?void 0:A.data)==null?void 0:v.message)||(s==="fr"?"Identifiants incorrects.":"Invalid credentials."))}finally{c(!1)}}return e.jsxs("div",{className:"auth-page",children:[e.jsxs("div",{className:"auth-side auth-side-brand",children:[e.jsxs(S,{to:"/",className:"auth-logo",children:["🌿 ",e.jsx("span",{children:"Green"}),"FCO"]}),e.jsxs("div",{className:"auth-brand-content",children:[e.jsx("h2",{children:s==="fr"?"Bienvenue sur GreenFCO":"Welcome to GreenFCO"}),e.jsx("p",{children:s==="fr"?"Votre plateforme agro-environnementale pour une agriculture durable en Afrique francophone.":"Your agro-environmental platform for sustainable agriculture in Francophone Africa."}),e.jsx("div",{className:"auth-brand-features",children:["🌱 Gestion de cultures","💧 Irrigation intelligente","🤖 Conseiller IA","🛒 Marché numérique"].map(f=>e.jsx("div",{className:"auth-feature",children:f},f))})]}),e.jsx("p",{className:"auth-slogan",children:'"Cultiver un avenir durable, ensemble."'})]}),e.jsx("div",{className:"auth-side auth-side-form",children:e.jsxs("div",{className:"auth-form-container",children:[e.jsx("h1",{children:r("auth.login_title")}),e.jsxs("p",{className:"auth-subtitle",children:[r("auth.no_account")," ",e.jsx(S,{to:"/register",children:r("nav.register")})]}),l&&e.jsx("div",{className:"auth-error",children:l}),e.jsxs("form",{onSubmit:p,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:r("auth.email")}),e.jsx("input",{type:"email",className:"form-input",value:i.email,onChange:f=>o(A=>({...A,email:f.target.value})),required:!0,placeholder:"example@email.com"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:r("auth.password")}),e.jsx("input",{type:"password",className:"form-input",value:i.password,onChange:f=>o(A=>({...A,password:f.target.value})),required:!0,placeholder:"••••••••"})]}),e.jsx("div",{className:"auth-forgot",children:e.jsx(S,{to:"/forgot-password",children:r("auth.forgot_password")})}),e.jsx("button",{type:"submit",className:"btn btn-primary auth-submit",disabled:d,children:d?s==="fr"?"Connexion...":"Signing in...":r("auth.login_btn")})]})]})})]})}const Ua=["farmer","expert","investor","organization"];function Wa(){var j;const{t:r,i18n:t}=D(),s=(j=t.language)!=null&&j.startsWith("fr")?"fr":"en",n=Kr(),a=ue(N=>N.setAuth),[i,o]=b.useState({name:"",email:"",password:"",confirm_password:"",country:"",user_type:"farmer",language:s}),[l,u]=b.useState("buyer"),[d,c]=b.useState(""),[p,x]=b.useState(""),[f,A]=b.useState(!1);function v(N){o(h=>({...h,[N.target.name]:N.target.value}))}async function g(N){var h,y;if(N.preventDefault(),i.password!==i.confirm_password){x(s==="fr"?"Les mots de passe ne correspondent pas.":"Passwords do not match.");return}if(A(!0),x(""),l==="seller"){const E={...(()=>{try{return JSON.parse(localStorage.getItem("greenfco_seller_profile"))||{}}catch{return{}}})(),location:d,memberSince:new Date().getFullYear().toString()};localStorage.setItem("greenfco_seller_profile",JSON.stringify(E))}try{const _=await Ma({...i,market_role:l});a(_.data.user,_.data.token),n("/dashboard")}catch(_){x(((y=(h=_.response)==null?void 0:h.data)==null?void 0:y.message)||(s==="fr"?"Erreur lors de la création du compte.":"Account creation failed."))}finally{A(!1)}}return e.jsxs("div",{className:"auth-page",children:[e.jsxs("div",{className:"auth-side auth-side-brand",children:[e.jsxs(S,{to:"/",className:"auth-logo",children:["🌿 ",e.jsx("span",{children:"Green"}),"FCO"]}),e.jsxs("div",{className:"auth-brand-content",children:[e.jsx("h2",{children:s==="fr"?"Rejoignez la communauté":"Join the community"}),e.jsx("p",{children:s==="fr"?"Agriculteurs, experts, investisseurs, organisations — GreenFCO rassemble tous les acteurs de l'agro-environnement.":"Farmers, experts, investors, organizations — GreenFCO brings together all agro-environmental actors."}),e.jsx("div",{className:"auth-brand-features",children:(s==="fr"?["🌱 Agriculteur / Agripreneur","🔬 Expert / Consultant","💼 Investisseur","🏢 Organisation / ONG"]:["🌱 Farmer / Agripreneur","🔬 Expert / Consultant","💼 Investor","🏢 Organization / NGO"]).map(N=>e.jsx("div",{className:"auth-feature",children:N},N))})]}),e.jsx("p",{className:"auth-slogan",children:'"Cultiver un avenir durable, ensemble."'})]}),e.jsx("div",{className:"auth-side auth-side-form",children:e.jsxs("div",{className:"auth-form-container",children:[e.jsx("h1",{children:r("auth.register_title")}),e.jsxs("p",{className:"auth-subtitle",children:[r("auth.have_account")," ",e.jsx(S,{to:"/login",children:r("nav.login")})]}),p&&e.jsx("div",{className:"auth-error",children:p}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("auth.name")," *"]}),e.jsx("input",{type:"text",name:"name",className:"form-input",value:i.name,onChange:v,required:!0,placeholder:"Jean Ouédraogo"})]}),e.jsxs("div",{className:"grid-2",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("auth.email")," *"]}),e.jsx("input",{type:"email",name:"email",className:"form-input",value:i.email,onChange:v,required:!0,placeholder:"jean@email.com"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:r("auth.country")}),e.jsx("input",{type:"text",name:"country",className:"form-input",value:i.country,onChange:v,placeholder:"Burkina Faso"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("auth.user_type")," *"]}),e.jsx("select",{name:"user_type",className:"form-select",value:i.user_type,onChange:v,children:Ua.map(N=>e.jsx("option",{value:N,children:r(`auth.${N}`)},N))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[s==="fr"?"Je souhaite utiliser la plateforme comme":"I want to use the platform as"," *"]}),e.jsxs("select",{className:"form-select",value:l,onChange:N=>u(N.target.value),children:[e.jsx("option",{value:"buyer",children:s==="fr"?"Acheteur (je cherche des produits)":"Buyer (I look for products)"}),e.jsx("option",{value:"seller",children:s==="fr"?"Vendeur (je vends des produits)":"Seller (I sell products)"})]})]}),l==="seller"&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:s==="fr"?"Localisation (ville / région) *":"Location (city / region) *"}),e.jsx("input",{type:"text",className:"form-input",value:d,onChange:N=>c(N.target.value),placeholder:s==="fr"?"Ex : Ouagadougou, Plateau Central":"E.g. Ouagadougou, Plateau Central",required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:r("auth.language_pref")}),e.jsxs("select",{name:"language",className:"form-select",value:i.language,onChange:v,children:[e.jsx("option",{value:"fr",children:"Français"}),e.jsx("option",{value:"en",children:"English"})]})]}),e.jsxs("div",{className:"grid-2",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("auth.password")," *"]}),e.jsx("input",{type:"password",name:"password",className:"form-input",value:i.password,onChange:v,required:!0,placeholder:"••••••••",minLength:8})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[r("auth.confirm_password")," *"]}),e.jsx("input",{type:"password",name:"confirm_password",className:"form-input",value:i.confirm_password,onChange:v,required:!0,placeholder:"••••••••"})]})]}),e.jsx("button",{type:"submit",className:"btn btn-primary auth-submit",disabled:f,children:f?s==="fr"?"Création...":"Creating...":r("auth.register_btn")})]})]})})]})}function $a(){var d;const{i18n:r}=D(),t=(d=r.language)!=null&&d.startsWith("fr")?"fr":"en",[s,n]=b.useState(""),[a,i]=b.useState(!1),[o,l]=b.useState(!1);async function u(c){c.preventDefault(),l(!0);try{await za(s)}finally{i(!0),l(!1)}}return e.jsxs("div",{className:"auth-page",children:[e.jsxs("div",{className:"auth-side auth-side-brand",children:[e.jsxs(S,{to:"/",className:"auth-logo",children:["🌿 ",e.jsx("span",{children:"Green"}),"FCO"]}),e.jsxs("div",{className:"auth-brand-content",children:[e.jsx("h2",{children:t==="fr"?"Réinitialisation":"Password Reset"}),e.jsx("p",{children:t==="fr"?"Nous vous enverrons un lien de réinitialisation par e-mail.":"We'll send you a reset link by email."})]}),e.jsx("p",{className:"auth-slogan",children:'"Cultiver un avenir durable, ensemble."'})]}),e.jsx("div",{className:"auth-side auth-side-form",children:e.jsxs("div",{className:"auth-form-container",children:[e.jsx("h1",{children:t==="fr"?"Mot de passe oublié ?":"Forgot password?"}),e.jsx("p",{className:"auth-subtitle",children:e.jsxs(S,{to:"/login",children:["← ",t==="fr"?"Retour à la connexion":"Back to sign in"]})}),a?e.jsxs("div",{className:"form-success",style:{padding:"1.25rem",background:"var(--green-pale)",borderRadius:"var(--radius-md)",color:"var(--green-deep)"},children:["✅ ",t==="fr"?"Si un compte existe avec cet e-mail, vous recevrez un lien de réinitialisation sous peu.":"If an account exists with this email, you will receive a reset link shortly."]}):e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:t==="fr"?"Adresse e-mail":"Email address"}),e.jsx("input",{type:"email",className:"form-input",value:s,onChange:c=>n(c.target.value),required:!0,placeholder:"example@email.com"})]}),e.jsx("button",{type:"submit",className:"btn btn-primary auth-submit",disabled:o,children:o?"...":t==="fr"?"Envoyer le lien":"Send reset link"})]})]})})]})}const Ha=b.lazy(()=>F(()=>import("./AdminLayout-C-UWFfbZ.js"),__vite__mapDeps([0,1,2,3]))),Va=b.lazy(()=>F(()=>import("./AdminDashboard-D1syEoN8.js"),__vite__mapDeps([4,1]))),Ja=b.lazy(()=>F(()=>import("./AdminUsers-DzAAdsdn.js"),__vite__mapDeps([5,1]))),Ka=b.lazy(()=>F(()=>import("./AdminListings-DZVab4q6.js"),__vite__mapDeps([6,1]))),Ya=b.lazy(()=>F(()=>import("./AdminBlog-Bjd_qs6h.js"),__vite__mapDeps([7,1]))),Xa=b.lazy(()=>F(()=>import("./AdminConsulting-BY59QxaT.js"),__vite__mapDeps([8,1]))),_e=b.lazy(()=>F(()=>import("./DashboardLayout-0O4LiEn5.js"),__vite__mapDeps([9,1,10,11]))),Qa=b.lazy(()=>F(()=>import("./DashboardHome-B1QIQAeD.js"),__vite__mapDeps([12,1,10,13]))),Za=b.lazy(()=>F(()=>import("./CropManager-DbJF04MX.js"),__vite__mapDeps([14,1,10,15]))),ei=b.lazy(()=>F(()=>import("./IrrigationManager-DI5P_SJd.js"),__vite__mapDeps([16,1,10,17]))),ri=b.lazy(()=>F(()=>import("./FinanceManager-CU45JyGg.js"),__vite__mapDeps([18,1,10,19,20]))),ti=b.lazy(()=>F(()=>import("./WeatherHub-QLNfJU_p.js"),__vite__mapDeps([21,1,10,19,22]))),si=b.lazy(()=>F(()=>import("./SpeciesLibrary-atL8VbK0.js"),__vite__mapDeps([23,1,10,24]))),ni=b.lazy(()=>F(()=>import("./GreenBot-B8-UeTMK.js"),__vite__mapDeps([25,1,10,26]))),ai=b.lazy(()=>F(()=>import("./SoilAdvisor-BS8a70va.js"),__vite__mapDeps([27,1,10,28]))),ii=b.lazy(()=>F(()=>import("./KoobAssist-DwxQZKRy.js"),__vite__mapDeps([29,1,10,30]))),Vr=b.lazy(()=>F(()=>import("./MarketPage-CmvYBll2.js"),__vite__mapDeps([31,1,10,19,32]))),oi=b.lazy(()=>F(()=>import("./SellerProfilePage-BmKNdUgd.js"),__vite__mapDeps([33,1,10,34]))),li=b.lazy(()=>F(()=>import("./BuyerProfilePage-nu5M7cot.js"),__vite__mapDeps([35,1,10,36]))),ci=b.lazy(()=>F(()=>import("./NetworkPage-CbXt2YNK.js"),__vite__mapDeps([37,1,10,38]))),ui=b.lazy(()=>F(()=>import("./VerifyTransaction-BD0HF4eb.js"),__vite__mapDeps([39,1,40]))),di=b.lazy(()=>F(()=>import("./AdminTransactions-8i5QPySX.js"),__vite__mapDeps([41,1]))),mi=b.lazy(()=>F(()=>import("./AdminSettings-DVQUvBcU.js"),__vite__mapDeps([42,1,2]))),pi=b.lazy(()=>F(()=>import("./AdminProjects-ZfywTB01.js"),__vite__mapDeps([43,1]))),hi=b.lazy(()=>F(()=>import("./AdminActivity-DINJIIOp.js"),__vite__mapDeps([44,1]))),fi=b.lazy(()=>F(()=>import("./AdminTeamChat-UUjbVMGY.js"),__vite__mapDeps([45,1]))),gi=b.lazy(()=>F(()=>import("./AdminLogin-BzK-s_nM.js"),__vite__mapDeps([46,1,10])));function Fe({children:r}){const{isAuthenticated:t}=ue();return t?r:e.jsx(Le,{to:"/login",replace:!0})}function bi({children:r}){const t=(()=>{try{return JSON.parse(localStorage.getItem("greenfco_admin_session"))}catch{return null}})();return t!=null&&t.verified?r:e.jsx(Le,{to:"/admin/login",replace:!0})}function K({children:r}){return e.jsxs(e.Fragment,{children:[e.jsx(As,{}),e.jsx("div",{style:{minHeight:"calc(100vh - 70px)"},children:r}),e.jsx(ws,{})]})}function vi(){return e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh"},children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"2rem",marginBottom:"1rem"},children:"🌿"}),e.jsx("p",{style:{color:"var(--gray-mid)"},children:"Chargement..."})]})})}function xi({title:r,icon:t}){return e.jsxs("div",{style:{textAlign:"center",padding:"4rem 2rem",color:"var(--gray-mid)"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:t}),e.jsx("h2",{style:{color:"var(--black)",marginBottom:"0.5rem"},children:r}),e.jsx("p",{children:"Cette fonctionnalité arrive bientôt. / This feature is coming soon."})]})}function yi(){return e.jsx(kt,{children:e.jsx(ys,{children:e.jsx(b.Suspense,{fallback:e.jsx(vi,{}),children:e.jsxs(Et,{children:[e.jsx(C,{path:"/",element:e.jsx(K,{children:e.jsx(xa,{})})}),e.jsx(C,{path:"/about",element:e.jsx(K,{children:e.jsx(wa,{})})}),e.jsx(C,{path:"/services",element:e.jsx(K,{children:e.jsx(Ca,{})})}),e.jsx(C,{path:"/consulting",element:e.jsx(K,{children:e.jsx(Ea,{})})}),e.jsx(C,{path:"/blog",element:e.jsx(K,{children:e.jsx(Oa,{})})}),e.jsx(C,{path:"/blog/:slug",element:e.jsx(K,{children:e.jsx(La,{})})}),e.jsx(C,{path:"/gallery",element:e.jsx(K,{children:e.jsx(Da,{})})}),e.jsx(C,{path:"/contact",element:e.jsx(K,{children:e.jsx(Ia,{})})}),e.jsx(C,{path:"/login",element:e.jsx(Ga,{})}),e.jsx(C,{path:"/register",element:e.jsx(Wa,{})}),e.jsx(C,{path:"/forgot-password",element:e.jsx($a,{})}),e.jsxs(C,{path:"/dashboard",element:e.jsx(Fe,{children:e.jsx(_e,{})}),children:[e.jsx(C,{index:!0,element:e.jsx(Qa,{})}),e.jsx(C,{path:"crops",element:e.jsx(Za,{})}),e.jsx(C,{path:"irrigation",element:e.jsx(ei,{})}),e.jsx(C,{path:"finance",element:e.jsx(ri,{})}),e.jsx(C,{path:"weather",element:e.jsx(ti,{})}),e.jsx(C,{path:"species",element:e.jsx(si,{})}),e.jsx(C,{path:"greenbot",element:e.jsx(ni,{})}),e.jsx(C,{path:"soil-advisor",element:e.jsx(ai,{})}),e.jsx(C,{path:"koob-assist",element:e.jsx(ii,{})}),e.jsx(C,{path:"map",element:e.jsx(xi,{title:"Farm Map",icon:"🗺️"})})]}),e.jsxs(C,{path:"/marketplace",element:e.jsx(Fe,{children:e.jsx(_e,{})}),children:[e.jsx(C,{index:!0,element:e.jsx(Vr,{mode:"marketplace"},"marketplace")}),e.jsx(C,{path:"profile",element:e.jsx(li,{})})]}),e.jsxs(C,{path:"/agropro",element:e.jsx(Fe,{children:e.jsx(_e,{})}),children:[e.jsx(C,{index:!0,element:e.jsx(Vr,{mode:"agropro"},"agropro")}),e.jsx(C,{path:"profile",element:e.jsx(oi,{})})]}),e.jsx(C,{path:"/verify-transaction",element:e.jsx(ui,{})}),e.jsx(C,{path:"/market",element:e.jsx(Le,{to:"/marketplace",replace:!0})}),e.jsx(C,{path:"/network",element:e.jsx(Fe,{children:e.jsx(_e,{})}),children:e.jsx(C,{index:!0,element:e.jsx(ci,{})})}),e.jsx(C,{path:"/admin/login",element:e.jsx(gi,{})}),e.jsxs(C,{path:"/admin",element:e.jsx(bi,{children:e.jsx(Ha,{})}),children:[e.jsx(C,{index:!0,element:e.jsx(Va,{})}),e.jsx(C,{path:"users",element:e.jsx(Ja,{})}),e.jsx(C,{path:"listings",element:e.jsx(Ka,{})}),e.jsx(C,{path:"blog",element:e.jsx(Ya,{})}),e.jsx(C,{path:"consulting",element:e.jsx(Xa,{})}),e.jsx(C,{path:"transactions",element:e.jsx(di,{})}),e.jsx(C,{path:"settings",element:e.jsx(mi,{})}),e.jsx(C,{path:"projects",element:e.jsx(pi,{})}),e.jsx(C,{path:"activity",element:e.jsx(hi,{})}),e.jsx(C,{path:"messages",element:e.jsx(fi,{})})]}),e.jsx(C,{path:"*",element:e.jsx(Le,{to:"/",replace:!0})})]})})})})}let ji={data:""},Ai=r=>{if(typeof window=="object"){let t=(r?r.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(r||document.head).appendChild(t),t.firstChild}return r||ji},wi=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ni=/\/\*[^]*?\*\/|  +/g,Jr=/\n+/g,X=(r,t)=>{let s="",n="",a="";for(let i in r){let o=r[i];i[0]=="@"?i[1]=="i"?s=i+" "+o+";":n+=i[1]=="f"?X(o,i):i+"{"+X(o,i[1]=="k"?"":t)+"}":typeof o=="object"?n+=X(o,t?t.replace(/([^,])+/g,l=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,l):l?l+" "+u:u)):i):o!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=X.p?X.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+n},Y={},vt=r=>{if(typeof r=="object"){let t="";for(let s in r)t+=s+vt(r[s]);return t}return r},Ci=(r,t,s,n,a)=>{let i=vt(r),o=Y[i]||(Y[i]=(u=>{let d=0,c=11;for(;d<u.length;)c=101*c+u.charCodeAt(d++)>>>0;return"go"+c})(i));if(!Y[o]){let u=i!==r?r:(d=>{let c,p,x=[{}];for(;c=wi.exec(d.replace(Ni,""));)c[4]?x.shift():c[3]?(p=c[3].replace(Jr," ").trim(),x.unshift(x[0][p]=x[0][p]||{})):x[0][c[1]]=c[2].replace(Jr," ").trim();return x[0]})(r);Y[o]=X(a?{["@keyframes "+o]:u}:u,s?"":"."+o)}let l=s&&Y.g;return s&&(Y.g=Y[o]),((u,d,c,p)=>{p?d.data=d.data.replace(p,u):d.data.indexOf(u)===-1&&(d.data=c?u+d.data:d.data+u)})(Y[o],t,n,l),o},Si=(r,t,s)=>r.reduce((n,a,i)=>{let o=t[i];if(o&&o.call){let l=o(s),u=l&&l.props&&l.props.className||/^go/.test(l)&&l;o=u?"."+u:l&&typeof l=="object"?l.props?"":X(l,""):l===!1?"":l}return n+a+(o??"")},"");function Ue(r){let t=this||{},s=r.call?r(t.p):r;return Ci(s.unshift?s.raw?Si(s,[].slice.call(arguments,1),t.p):s.reduce((n,a)=>Object.assign(n,a&&a.call?a(t.p):a),{}):s,Ai(t.target),t.g,t.o,t.k)}let xt,or,lr;Ue.bind({g:1});let $=Ue.bind({k:1});function _i(r,t,s,n){X.p=t,xt=r,or=s,lr=n}function Q(r,t){let s=this||{};return function(){let n=arguments;function a(i,o){let l=Object.assign({},i),u=l.className||a.className;s.p=Object.assign({theme:or&&or()},l),s.o=/go\d/.test(u),l.className=Ue.apply(s,n)+(u?" "+u:"");let d=r;return r[0]&&(d=l.as||r,delete l.as),lr&&d[0]&&lr(l),xt(d,l)}return a}}var Fi=r=>typeof r=="function",Te=(r,t)=>Fi(r)?r(t):r,ki=(()=>{let r=0;return()=>(++r).toString()})(),yt=(()=>{let r;return()=>{if(r===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");r=!t||t.matches}return r}})(),Ei=20,fr="default",jt=(r,t)=>{let{toastLimit:s}=r.settings;switch(t.type){case 0:return{...r,toasts:[t.toast,...r.toasts].slice(0,s)};case 1:return{...r,toasts:r.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:n}=t;return jt(r,{type:r.toasts.find(o=>o.id===n.id)?1:0,toast:n});case 3:let{toastId:a}=t;return{...r,toasts:r.toasts.map(o=>o.id===a||a===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...r,toasts:[]}:{...r,toasts:r.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...r,pausedAt:t.time};case 6:let i=t.time-(r.pausedAt||0);return{...r,pausedAt:void 0,toasts:r.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+i}))}}},Re=[],At={toasts:[],pausedAt:void 0,settings:{toastLimit:Ei}},U={},wt=(r,t=fr)=>{U[t]=jt(U[t]||At,r),Re.forEach(([s,n])=>{s===t&&n(U[t])})},Nt=r=>Object.keys(U).forEach(t=>wt(r,t)),Oi=r=>Object.keys(U).find(t=>U[t].toasts.some(s=>s.id===r)),We=(r=fr)=>t=>{wt(t,r)},qi={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ri=(r={},t=fr)=>{let[s,n]=b.useState(U[t]||At),a=b.useRef(U[t]);b.useEffect(()=>(a.current!==U[t]&&n(U[t]),Re.push([t,n]),()=>{let o=Re.findIndex(([l])=>l===t);o>-1&&Re.splice(o,1)}),[t]);let i=s.toasts.map(o=>{var l,u,d;return{...r,...r[o.type],...o,removeDelay:o.removeDelay||((l=r[o.type])==null?void 0:l.removeDelay)||(r==null?void 0:r.removeDelay),duration:o.duration||((u=r[o.type])==null?void 0:u.duration)||(r==null?void 0:r.duration)||qi[o.type],style:{...r.style,...(d=r[o.type])==null?void 0:d.style,...o.style}}});return{...s,toasts:i}},Li=(r,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:r,pauseDuration:0,...s,id:(s==null?void 0:s.id)||ki()}),je=r=>(t,s)=>{let n=Li(t,r,s);return We(n.toasterId||Oi(n.id))({type:2,toast:n}),n.id},q=(r,t)=>je("blank")(r,t);q.error=je("error");q.success=je("success");q.loading=je("loading");q.custom=je("custom");q.dismiss=(r,t)=>{let s={type:3,toastId:r};t?We(t)(s):Nt(s)};q.dismissAll=r=>q.dismiss(void 0,r);q.remove=(r,t)=>{let s={type:4,toastId:r};t?We(t)(s):Nt(s)};q.removeAll=r=>q.remove(void 0,r);q.promise=(r,t,s)=>{let n=q.loading(t.loading,{...s,...s==null?void 0:s.loading});return typeof r=="function"&&(r=r()),r.then(a=>{let i=t.success?Te(t.success,a):void 0;return i?q.success(i,{id:n,...s,...s==null?void 0:s.success}):q.dismiss(n),a}).catch(a=>{let i=t.error?Te(t.error,a):void 0;i?q.error(i,{id:n,...s,...s==null?void 0:s.error}):q.dismiss(n)}),r};var Pi=1e3,Ti=(r,t="default")=>{let{toasts:s,pausedAt:n}=Ri(r,t),a=b.useRef(new Map).current,i=b.useCallback((p,x=Pi)=>{if(a.has(p))return;let f=setTimeout(()=>{a.delete(p),o({type:4,toastId:p})},x);a.set(p,f)},[]);b.useEffect(()=>{if(n)return;let p=Date.now(),x=s.map(f=>{if(f.duration===1/0)return;let A=(f.duration||0)+f.pauseDuration-(p-f.createdAt);if(A<0){f.visible&&q.dismiss(f.id);return}return setTimeout(()=>q.dismiss(f.id,t),A)});return()=>{x.forEach(f=>f&&clearTimeout(f))}},[s,n,t]);let o=b.useCallback(We(t),[t]),l=b.useCallback(()=>{o({type:5,time:Date.now()})},[o]),u=b.useCallback((p,x)=>{o({type:1,toast:{id:p,height:x}})},[o]),d=b.useCallback(()=>{n&&o({type:6,time:Date.now()})},[n,o]),c=b.useCallback((p,x)=>{let{reverseOrder:f=!1,gutter:A=8,defaultPosition:v}=x||{},g=s.filter(h=>(h.position||v)===(p.position||v)&&h.height),j=g.findIndex(h=>h.id===p.id),N=g.filter((h,y)=>y<j&&h.visible).length;return g.filter(h=>h.visible).slice(...f?[N+1]:[0,N]).reduce((h,y)=>h+(y.height||0)+A,0)},[s]);return b.useEffect(()=>{s.forEach(p=>{if(p.dismissed)i(p.id,p.removeDelay);else{let x=a.get(p.id);x&&(clearTimeout(x),a.delete(p.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:u,startPause:l,endPause:d,calculateOffset:c}}},Di=$`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ii=$`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Bi=$`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Mi=Q("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${r=>r.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Di} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ii} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${r=>r.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Bi} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,zi=$`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Gi=Q("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${r=>r.secondary||"#e0e0e0"};
  border-right-color: ${r=>r.primary||"#616161"};
  animation: ${zi} 1s linear infinite;
`,Ui=$`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Wi=$`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,$i=Q("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${r=>r.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ui} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Wi} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${r=>r.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Hi=Q("div")`
  position: absolute;
`,Vi=Q("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ji=$`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ki=Q("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ji} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Yi=({toast:r})=>{let{icon:t,type:s,iconTheme:n}=r;return t!==void 0?typeof t=="string"?b.createElement(Ki,null,t):t:s==="blank"?null:b.createElement(Vi,null,b.createElement(Gi,{...n}),s!=="loading"&&b.createElement(Hi,null,s==="error"?b.createElement(Mi,{...n}):b.createElement($i,{...n})))},Xi=r=>`
0% {transform: translate3d(0,${r*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Qi=r=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${r*-150}%,-1px) scale(.6); opacity:0;}
`,Zi="0%{opacity:0;} 100%{opacity:1;}",eo="0%{opacity:1;} 100%{opacity:0;}",ro=Q("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,to=Q("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,so=(r,t)=>{let s=r.includes("top")?1:-1,[n,a]=yt()?[Zi,eo]:[Xi(s),Qi(s)];return{animation:t?`${$(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${$(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},no=b.memo(({toast:r,position:t,style:s,children:n})=>{let a=r.height?so(r.position||t||"top-center",r.visible):{opacity:0},i=b.createElement(Yi,{toast:r}),o=b.createElement(to,{...r.ariaProps},Te(r.message,r));return b.createElement(ro,{className:r.className,style:{...a,...s,...r.style}},typeof n=="function"?n({icon:i,message:o}):b.createElement(b.Fragment,null,i,o))});_i(b.createElement);var ao=({id:r,className:t,style:s,onHeightUpdate:n,children:a})=>{let i=b.useCallback(o=>{if(o){let l=()=>{let u=o.getBoundingClientRect().height;n(r,u)};l(),new MutationObserver(l).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[r,n]);return b.createElement("div",{ref:i,className:t,style:s},a)},io=(r,t)=>{let s=r.includes("top"),n=s?{top:0}:{bottom:0},a=r.includes("center")?{justifyContent:"center"}:r.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:yt()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...n,...a}},oo=Ue`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ke=16,lo=({reverseOrder:r,position:t="top-center",toastOptions:s,gutter:n,children:a,toasterId:i,containerStyle:o,containerClassName:l})=>{let{toasts:u,handlers:d}=Ti(s,i);return b.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:ke,left:ke,right:ke,bottom:ke,pointerEvents:"none",...o},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},u.map(c=>{let p=c.position||t,x=d.calculateOffset(c,{reverseOrder:r,gutter:n,defaultPosition:t}),f=io(p,x);return b.createElement(ao,{id:c.id,key:c.id,onHeightUpdate:d.updateHeight,className:c.visible?oo:"",style:f},c.type==="custom"?Te(c.message,c):a?a(c):b.createElement(no,{toast:c,position:p}))}))};Ot.createRoot(document.getElementById("root")).render(e.jsxs(fe.StrictMode,{children:[e.jsx(yi,{}),e.jsx(lo,{position:"bottom-right",toastOptions:{style:{fontFamily:"var(--font-body)",borderRadius:"var(--radius-md)"},success:{iconTheme:{primary:"#52B788",secondary:"white"}}}})]}));export{js as L,ie as a,ue as u};
