/* =====================================================================
   OAHIDUL ISLAM — PORTFOLIO  ·  app.js  (vanilla, no dependencies)
   ===================================================================== */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- THEME ------------------------------------------------ */
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const stored = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  // default: stored choice → else system preference → else dark
  root.setAttribute('data-theme', stored || (prefersLight ? 'light' : 'dark'));

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- YEAR ------------------------------------------------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- MOBILE NAV ------------------------------------------ */
  const navMenu = $('#navMenu'), navToggle = $('#navToggle'), navClose = $('#navClose');
  const openNav  = () => navMenu?.classList.add('is-open');
  const closeNav = () => navMenu?.classList.remove('is-open');
  navToggle?.addEventListener('click', openNav);
  navClose?.addEventListener('click', closeNav);
  $$('.nav__link').forEach(l => l.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  /* ---------- HEADER SCROLL + PROGRESS ---------------------------- */
  const header = $('#header'), progress = $('#scrollProgress');
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- ACTIVE NAV LINK (scroll spy) ------------------------ */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.id;
        navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- CURSOR GLOW ----------------------------------------- */
  const glow = $('.cursor-glow');
  if (glow && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    window.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- TYPED ROLES ----------------------------------------- */
  const typed = $('#typed');
  const roles = ['AI Engineer @ iXora Solution', 'Deep Learning Researcher', 'LLM & Generative AI Developer', 'Explainable-AI Practitioner'];
  if (typed) {
    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = roles[ri];
      typed.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(tick, 70); }
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1600); }
      else if (deleting && ci > 0) { ci--; setTimeout(tick, 35); }
      else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 350); }
    };
    tick();
  }

  /* ---------- COUNT-UP STATS -------------------------------------- */
  const countEls = $$('.stat__num');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count, suffix = el.textContent.includes('+') ? '+' : '';
      let n = 0; const step = Math.max(1, Math.round(target / 40));
      const run = () => { n = Math.min(target, n + step); el.textContent = n + suffix; if (n < target) requestAnimationFrame(run); };
      run(); countObs.unobserve(el);
    });
  }, { threshold: .6 });
  countEls.forEach(el => countObs.observe(el));

  /* ---------- REVEAL ON SCROLL ------------------------------------ */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
  }, { threshold: .12 });
  const observeReveals = () => $$('.reveal:not(.in)').forEach(el => revealObs.observe(el));

  /* ---------- SKILL BARS ANIMATE ---------------------------------- */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); barObs.unobserve(en.target); } });
  }, { threshold: .4 });
  const observeBars = () => $$('.bar').forEach(b => barObs.observe(b));

  /* ---------- EXPERIENCE TABS ------------------------------------- */
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('is-active'));
      $$('.timeline').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      $('#tab-' + tab.dataset.tab)?.classList.add('is-active');
      observeReveals();
    });
  });

  /* ---------- DATA: PROJECTS -------------------------------------- */
  const projects = [
    { img:'p1.jpg', cat:'health ai', badge:'Healthcare AI', year:'2025', title:'AmarCare — AI Health Assistant',
      desc:'ML disease prediction (diabetes, heart, kidney) plus a Gemini-powered medical assistant for instant health information.',
      tags:['Python','ML','Gemini','Flask'], code:'https://github.com/wahidpanda/AmarCare' },
    { img:'p3.jpg', cat:'health ai', badge:'Medical AI', year:'2025', title:'AI-Doctor-Alert',
      desc:'Transcribes medical conversations, scores urgency and auto-alerts doctors for critical cases.',
      tags:['Python','Streamlit','NLP','Speech'], code:'https://github.com/wahidpanda/AI-Doctor-Alert' },
    { img:'p2.jpg', cat:'research ai', badge:'Research Tool', year:'2025', title:'ScholarSnap — Research Summarizer',
      desc:'Chrome extension that simplifies paper analysis, citation formatting and multi-document processing.',
      tags:['JavaScript','AI','Chrome'], code:'https://github.com/wahidpanda/ScholarSnap--Research-Summarizer' },
    { img:'p8.jpg', cat:'ai', badge:'AI Application', year:'2025', title:'MusicLLM — Music Therapy Platform',
      desc:'Audio analysis, virality prediction and expert recommendations for autism therapy using LLMs.',
      tags:['Python','LLM','Audio','Streamlit'], code:'https://github.com/wahidpanda/AI_Engineer_Assesment_Test', demo:'https://musicllm.streamlit.app/' },
    { img:'p4.jpg', cat:'ai web', badge:'Web AI', year:'2024', title:'CourseCat — Recommender',
      desc:'Course recommendation engine using collaborative filtering and ML to match learners to courses.',
      tags:['Python','ML','Flask'], code:'https://github.com/wahidpanda/CourseCat---Your-Ultimate-Course-Recommendation-System' },
    { img:'p5.jpg', cat:'research ai', badge:'Research Tool', year:'2024', title:'AI Research Assistant',
      desc:'Generates insights, trends and sourced summaries on any topic with customizable output.',
      tags:['Python','AI','Scraping'], code:'https://github.com/wahidpanda/Research-Agent' },
    { img:'p6.jpg', cat:'data ai', badge:'Data Analysis', year:'2024', title:'querry.ai',
      desc:'Interactive data-analysis platform with chatbot querying, custom dashboards and advanced analytics.',
      tags:['Python','Data','Dashboards'], code:'https://github.com/wahidpanda/querry.ai' },
    { img:'p7.jpg', cat:'ai web', badge:'Career AI', year:'2024', title:'Dreamjob.AI',
      desc:'AI career platform with personalized job-candidate matching — built for the Google AI Hackathon 2024.',
      tags:['Python','ML','Gemini'], code:'https://github.com/wahidpanda/Dreamjob-AI' },
    { img:'p9.jpg', cat:'ai', badge:'Collection', year:'2024', title:'AI Applications Collection',
      desc:'A collection of ML/AI apps — disease detection, recommenders, chatbots and more.',
      tags:['Python','ML','AI'], code:'https://github.com/wahidpanda?tab=repositories' },
  ];

  const workGrid = $('#workGrid');
  if (workGrid) {
    workGrid.innerHTML = projects.map(p => `
      <article class="pcard reveal" data-cat="${p.cat}">
        <div class="pcard__media">
          <img src="images/${p.img}" alt="${p.title}" loading="lazy">
          <span class="pcard__badge">${p.badge}</span>
          <span class="pcard__year">${p.year}</span>
        </div>
        <div class="pcard__body">
          <h3 class="pcard__title">${p.title}</h3>
          <p class="pcard__desc">${p.desc}</p>
          <div class="pcard__tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
          <div class="pcard__links">
            <a class="pcard__link" href="${p.code}" target="_blank" rel="noopener"><i class="uil uil-github"></i> Code</a>
            ${p.demo ? `<a class="pcard__link pcard__link--solid" href="${p.demo}" target="_blank" rel="noopener"><i class="uil uil-external-link-alt"></i> Live</a>` : ''}
          </div>
        </div>
      </article>`).join('');
  }

  /* ---------- DATA: PUBLICATIONS ---------------------------------- */
  const pubs = [
    { featured:true, cat:'journal', badge:'Journal', year:'2026',
      title:'Enhanced Cervical Cancer Diagnosis Using a Novel Bayesian Fusion Ensemble Method with Explainable AI',
      authors:'<b>Oahidul Islam</b>, Md. Assaduzzaman, Sumaia Akter, Nafiz Fahad & Md. Jakir Hossen',
      venue:'Scientific Reports, Nature · Vol. 16, Art. 12306', vicon:'uil-award',
      metrics:[['uil-chart-pie','99.88% Accuracy'],['uil-eye','SHAP & LIME'],['uil-heart-medical','Cervical Cancer']],
      link:'https://doi.org/10.1038/s41598-026-35334-7' },
    { cat:'journal', badge:'Dataset', year:'2025',
      title:'Maternal Health Risk Factors Dataset: Clinical Parameters from Rural Bangladesh',
      authors:'M. U. Mojumdar, D. Sarker, Md Assaduzzaman, …, <b>Oahidul Islam</b>, …',
      venue:'Data in Brief, Elsevier', vicon:'uil-database',
      metrics:[['uil-chart-line','Statistical Analysis'],['uil-users-alt','1206 Patients']],
      link:'https://www.sciencedirect.com/science/article/pii/S2352340925000952' },
    { cat:'conference', badge:'Conference', year:'2024',
      title:'Transformer with Explainable AI: A Synergistic Approach to Smart Grid Stability Analysis',
      authors:'S. Akter, <b>Oahidul Islam</b>, T. Ahmed, M. S. Ahamed, M. H. Talukdar',
      venue:'IEEE International Conference', vicon:'uil-presentation-play',
      metrics:[['uil-bolt','Smart Grid'],['uil-brain','99.40% Accuracy']],
      link:'https://ieeexplore.ieee.org/abstract/document/11013447/' },
    { cat:'journal', badge:'Journal', year:'2024',
      title:'Explainable AI-based Blood Cell Classification using an Optimized CNN',
      authors:'<b>Oahidul Islam</b>, Md Assaduzzaman, Md Zahid Hasan',
      venue:'Journal of Pathology Informatics, Elsevier', vicon:'uil-book-open',
      metrics:[['uil-chart-pie','99.12% Accuracy'],['uil-heart-medical','Medical AI']],
      link:'https://www.sciencedirect.com/science/article/pii/S2153353924000282' },
    { cat:'dataset', badge:'Dataset', year:'2024',
      title:'A Benchmark Dataset for Hematological Responses to Dengue Fever in Bangladesh',
      authors:'Md. Assaduzzaman, <b>Oahidul Islam</b>, Md. A. S. Nirob, …',
      venue:'Data in Brief, Elsevier', vicon:'uil-database',
      metrics:[['uil-medkit','Dengue'],['uil-chart-growth','1003 Patients']],
      link:'https://www.sciencedirect.com/science/article/pii/S2352340924009922' },
    { cat:'conference', badge:'Conference', year:'2024',
      title:'Multi-Head Self-Attention in Vision Transformers for Retinal Image Classification',
      authors:'<b>Oahidul Islam</b>, K. Kumer, S. Akter, M. M. Uddin',
      venue:'IEEE Conference', vicon:'uil-presentation-play',
      metrics:[['uil-eye','Retinal'],['uil-analytics','96.13% Accuracy']],
      link:'https://ieeexplore.ieee.org/abstract/document/10795956' },
    { cat:'conference', badge:'Conference', year:'2024',
      title:'Tuberculosis Detection from Chest X-rays Using Deep Learning',
      authors:'M. H. Rabby, <b>Oahidul Islam</b>, Md. Assaduzzaman, M. Dutta',
      venue:'IEEE International Conference', vicon:'uil-presentation-play',
      metrics:[['uil-lungs','TB Detection'],['uil-check-circle','98.93% Accuracy']],
      link:'https://ieeexplore.ieee.org/abstract/document/10441031/' },
  ];

  const pubGrid = $('#pubGrid');
  if (pubGrid) {
    pubGrid.innerHTML = pubs.map(p => `
      <article class="pub ${p.featured ? 'pub--featured' : ''} reveal" data-cat="${p.cat}">
        ${p.featured ? '<span class="pub__new">New</span>' : ''}
        <div class="pub__top"><span class="pub__badge">${p.badge}</span><span class="pub__year">${p.year}</span></div>
        <h3 class="pub__title">${p.title}</h3>
        <p class="pub__authors">${p.authors}</p>
        <p class="pub__venue"><i class="uil ${p.vicon}"></i> ${p.venue}</p>
        <div class="pub__metrics">${p.metrics.map(m => `<span><i class="uil ${m[0]}"></i>${m[1]}</span>`).join('')}</div>
        <div class="pub__links"><a class="pub__link" href="${p.link}" target="_blank" rel="noopener"><i class="uil uil-external-link-alt"></i> View paper</a></div>
      </article>`).join('');
  }

  /* ---------- DATA: AWARDS ---------------------------------------- */
  const awards = [
    { img:'as1.png', t:'2025 Research Award', d:'Recognised for research contributions supporting DIU\'s rise as a top Scopus-indexed research university in Bangladesh.' },
    { img:'as2.png', t:'Google AI Hackathon — Dreamjob.AI', d:'Built an AI job-matching platform using Gemini and ML for personalised candidate matching.' },
    { img:'as3.jpg', t:'Dean\'s List (8×)', d:'Eight consecutive Dean\'s List awards for a perfect 4.00 CGPA through undergraduate studies.' },
    { img:'as4.png', t:'Rank 1st — Undergraduate', d:'Held 1st position throughout 2019–2023 in Electrical & Electronic Engineering.' },
    { img:'as5.jpeg', t:'ClimateScience Olympiad 2023', d:'Bronze medal among 50,600+ global participants in climate solutions and sustainability.' },
    { img:'as6.jpeg', t:'IoT Fest 2023 Champion', d:'Team Octopus won with an indoor navigation & wayfinding IoT project. Served as adviser.' },
    { img:'as9.jpeg', t:'4IR Competition Winner (IoT)', d:'Won the IoT segment organised by GrameenPhone & CISCO Network Academy.' },
    { img:'as8.jpeg', t:'Cyber Security Competition 2022', d:'1st runner-up with an AI-based risk assessment and real-time threat analysis system.' },
    { img:'asrr.jpg', t:'Robot Nokshar Ashor 2021', d:'Built a Smart Wheelchair with autonomous navigation and voice-controlled operation.' },
    { img:'as10.jpeg', t:'Business & System Innovation 2023', d:'As team advisor, guided students to success in an international challenge by BINUS University.' },
  ];
  const awardsGrid = $('#awardsGrid');
  if (awardsGrid) {
    awardsGrid.innerHTML = awards.map(a => `
      <article class="award reveal">
        <div class="award__media"><img src="images/${a.img}" alt="${a.t}" loading="lazy"></div>
        <div class="award__body"><h3>${a.t}</h3><p>${a.d}</p></div>
      </article>`).join('');
  }

  /* ---------- FILTERS --------------------------------------------- */
  function wireFilter(filterSel, cardSel) {
    const wrap = $(filterSel); if (!wrap) return;
    wrap.addEventListener('click', e => {
      const btn = e.target.closest('.filter'); if (!btn) return;
      $$('.filter', wrap).forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      $$(cardSel).forEach(card => {
        const match = f === 'all' || card.dataset.cat.split(' ').includes(f);
        card.classList.toggle('hide', !match);
      });
    });
  }
  wireFilter('#workFilters', '.pcard');
  wireFilter('#pubFilters', '.pub');

  /* ---------- MAP GRATICULE --------------------------------------- */
  const grat = $('#grat');
  if (grat) {
    let lines = '';
    for (let yy = 100; yy < 500; yy += 100) lines += `<line x1="0" y1="${yy}" x2="1010" y2="${yy}"/>`;
    for (let xx = 168; xx < 1010; xx += 168) lines += `<line x1="${xx}" y1="0" x2="${xx}" y2="500"/>`;
    grat.innerHTML = lines;
  }

  /* ---------- CONTACT FORM (front-end only) ----------------------- */
  const form = $('#contactForm'), note = $('#formNote');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#cName').value.trim(), email = $('#cEmail').value.trim(), msg = $('#cMsg').value.trim();
    if (!name || !email || !msg) { if (note) { note.hidden = false; note.style.color = 'var(--pink)'; note.textContent = 'Please fill in your name, email and message.'; } return; }
    const subject = encodeURIComponent($('#cSubject').value.trim() || `Portfolio message from ${name}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
    window.location.href = `mailto:oahidul.islam01@gmail.com?subject=${subject}&body=${body}`;
    if (note) { note.hidden = false; note.style.color = 'var(--cyan)'; note.textContent = 'Opening your email app…'; }
  });

  /* ---------- BACK TO TOP ----------------------------------------- */
  $('#toTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- LATEST NEWS ----------------------------------------- */
  const news = [
    { date:'2026', tag:'Publication', cls:'pub', title:'Published in Nature — Scientific Reports',
      text:'Lead-author paper on a Bayesian Fusion Ensemble for explainable cervical-cancer diagnosis (Vol. 16, Art. 12306).',
      url:'https://doi.org/10.1038/s41598-026-35334-7' },
    { date:'2025', tag:'New Role', cls:'job', title:'Joined iXora Solution Ltd as AI Engineer',
      text:'Full-time role building LLM products, medical computer-vision models and production ML systems.',
      url:'https://ixorasolution.com/' },
    { date:'2025', tag:'Research', cls:'', title:'Research Assistant, Deep Health Research Lab',
      text:'Working on health-data analytics and ML for clinical decision support.', url:'#experience' },
    { date:'2025', tag:'Award', cls:'', title:'2025 Research Award',
      text:"Recognised for research contributions supporting DIU's rise as a top Scopus-indexed research university.", url:'#awards' },
  ];
  const newsList = $('#newsList');
  if (newsList) {
    newsList.innerHTML = news.map(n => `
      <a class="news__item reveal" href="${n.url}" ${n.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
        <span class="news__date">${n.date}</span>
        <div class="news__body"><h3>${n.title}</h3><p>${n.text}</p></div>
        <span class="news__tag ${n.cls}">${n.tag}</span>
        <i class="uil uil-arrow-up-right news__arrow"></i>
      </a>`).join('');
  }

  /* ---------- MENTORSHIP ------------------------------------------ */
  const mentors = [
    { img:'images/delia.png', name:'Delia Lazarescu', sub:'Software Engineer @ Google', text:'Social-media growth and content-strategy collaboration.' },
    { img:'images/su.png', name:'Sumaia Akter Farha', sub:'Software Engineering @ DIU', text:'NASA Space Apps 2024 & a Climate-AI system using LLMs for global data insight.' },
    { img:'images/ya.png', name:'Yasin Mia Palash', sub:'Software Engineer @ NeosCoder', text:'CSE thesis on Hepatitis-B detection with ML and XAI for trustworthy decisions.' },
  ];
  const mentorList = $('#mentorList');
  if (mentorList) {
    mentorList.innerHTML = mentors.map(m => `
      <div class="mentor">
        <img class="mentor__img" src="${m.img}" alt="${m.name}" loading="lazy">
        <div class="mentor__body"><h4>${m.name}</h4><span>${m.sub}</span><p>${m.text}</p></div>
      </div>`).join('');
  }

  /* ---------- COMMUNITY ------------------------------------------- */
  const community = $('#community');
  if (community) {
    community.innerHTML = `
      <img class="community__logo" src="images/ap.jpg" alt="Team Apex" loading="lazy">
      <div class="community__body">
        <h4>Team Apex — STEM Community</h4>
        <p>My own STEM community teaching students worldwide about robotics, AI, hackathons, scientific research and hands-on engineering. I run workshops, mentor young innovators, and prepare students for global competitions.</p>
      </div>`;
  }

  /* ---------- SPORTS / VOLUNTEERING ------------------------------- */
  const sports = [
    { img:'images/cr.png', title:'Cricket', text:'Batch cricket captain and EEE departmental-team player; a key bowler across several tournaments.' },
    { img:'images/logo.jpg', title:'Volunteer Work', text:'Executive Member, DIU EEE Club — organised EEE Fest, career seminars, AI workshops and tech meetups.' },
  ];
  const sportsList = $('#sportsList');
  if (sportsList) {
    sportsList.innerHTML = sports.map(s => `
      <div class="sport">
        <img class="sport__img" src="${s.img}" alt="${s.title}" loading="lazy">
        <div class="sport__body"><h4>${s.title}</h4><p>${s.text}</p></div>
      </div>`).join('');
  }

  /* ---------- COURSES --------------------------------------------- */
  const courses = [
    'LLM Engineering: Master AI, LLMs & Agents — Ed Donner',
    'Introduction to Probability and Data with R, 2024 — Duke University, USA',
    'Data Analytics with R Bootcamp, 2024 — Interactive Cares',
    'SQL Vendor DUMP 1Z0-051, 2023 — Oracle',
    'Machine Learning Bootcamp, 2021 — DIU NLP & ML Research Lab',
    'Machine Learning Crash Course — Google DSC, 2021',
    'Introduction to ML in Production — Coursera, 2022',
    'Intro to Programming · Intro to ML — Kaggle, 2022',
    'Deploying ML Models in Production — Coursera, 2022',
    'ML Modeling Pipelines & Data Lifecycle in Production — Coursera, 2022',
    'Data Visualization & Data Analysis with Python — Coursera, 2022',
    'Professional Web Design, 2019 — ITsors Training Institute',
  ];
  const courseList = $('#courseList');
  if (courseList) {
    courseList.innerHTML = courses.map(c => `<li class="course"><i class="uil uil-check-circle"></i><span>${c}</span></li>`).join('');
  }

  /* ---------- INIT ------------------------------------------------- */
  observeReveals();
  observeBars();
})();
