* { margin:0; padding:0; box-sizing:border-box; }
html, body { height:100%; backgroconst track = document.getElementById('track');
const dotsWrap = document.getElementById('swipeDots');
let panelCount = 0;

function addDot() {
  const dot = document.createElement('div');
  dot.className = 'dot' + (panelCount === 1 ? ' active' : '');
  dotsWrap.appendChild(dot);
}

function buildUtilityPanel(data) {
  const panel = document.createElement('div');
  panel.className = 'panel panel-utility';
  panel.innerHTML = `
    <div class="panel-label">Tools</div>
    <div class="qr-box">[ QR CODE ]<br>${data.brand.domain}</div>
    <div class="util-list">
      <a href="${data.utility.contactCardUrl}">Contact Card / Download</a><br>
      <a href="${data.utility.blinkKeyUrl}">BlinkKey Connect</a><br>
      <a href="${data.utility.legalUrl}">Privacy &amp; Cookies</a><br>
      <a href="${data.utility.legalUrl}">Terms &amp; Legal</a><br>
      <a href="${data.utility.settingsUrl}">Settings</a>
    </div>
  `;
  track.appendChild(panel);
  panelCount++; addDot();
}

function buildCenterPanel(data) {
  const panel = document.createElement('div');
  panel.className = 'panel panel-center';
  const dockHtml = data.dock.map(slot =>
    `<a class="slot" href="${slot.url || '#'}">${slot.label}</a>`
  ).join('');
  const socialsHtml = data.socials.map(s =>
    `<a class="icon" href="${s.url || '#'}">${s.label}</a>`
  ).join('');
  panel.innerHTML = `
    <div class="panel-label">Me</div>
    <div class="contact-block" style="margin-top:36px;">
      <div class="brand-name">${data.brand.name}</div>
      <div class="line">${data.brand.phone}</div>
      <div class="line">${data.brand.email}</div>
      <div class="line">${data.brand.domain}</div>
    </div>
    <div class="avatar-zone">
      <img src="${data.hero.avatarImage}" alt="${data.brand.name} avatar" onerror="this.style.display='none'">
      <div class="hero-headline">${data.hero.headline}</div>
      <div class="hero-subline">${data.hero.subheadline}</div>
    </div>
    <div class="dock">${dockHtml}</div>
    <div class="socials">${socialsHtml}</div>
  `;
  track.appendChild(panel);
  panelCount++; addDot();
}

function buildCardPanel(card) {
  const panel = document.createElement('div');
  panel.className = 'panel panel-card';
  const promptsHtml = card.prompts.map(p => `
    <div class="prompt-block">
      <div class="question">${p.question}</div>
      <div class="answer-box">${p.answer || 'Your answer here...'}</div>
    </div>
  `).join('');
  panel.innerHTML = `
    <div class="panel-label">My World</div>
    <div class="card-title">${card.title}</div>
    <div class="card-rule"></div>
    ${promptsHtml}
  `;
  track.appendChild(panel);
  panelCount++; addDot();
}

function buildExpandPanel(page) {
  const panel = document.createElement('div');
  panel.className = 'panel panel-expand';
  panel.innerHTML = `
    <div class="panel-label">My World</div>
    <div class="expand-title">${page.title}</div>
    <div class="expand-rule"></div>
    <div class="expand-body">${page.body}</div>
  `;
  track.appendChild(panel);
  panelCount++; addDot();
}

function buildSite(data) {
  buildUtilityPanel(data);
  buildCenterPanel(data);
  data.cards.forEach(buildCardPanel);
  data.pages.forEach(buildExpandPanel);
  requestAnimationFrame(() => {
    const centerPanel = document.querySelector('.panel-center');
    if (centerPanel) track.scrollLeft = centerPanel.offsetLeft;
  });
}

buildSite(wwsData);
und:#222; font-family:'Segoe UI', Arial, sans-serif; }

.stage {
  display:flex; align-items:center; justify-content:center;
  min-height:100vh; padding:20px;
}

.frame {
  width:1080px; height:1920px;
  transform: scale(0.35); transform-origin:center center;
  background:#f7f3ec; border-radius:36px;
  box-shadow:0 0 60px rgba(0,0,0,0.5);
  overflow:hidden; position:relative;
}

.track {
  height:1920px; display:flex;
  overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;
}

.panel {
  min-width:1080px; height:1920px;
  scroll-snap-align:center; position:relative;
}

.panel-label {
  position:absolute; top:36px; left:50%; transform:translateX(-50%);
  font-size:20px; letter-spacing:3px; color:#8a8270; text-transform:uppercase;
  z-index:5;
}

/* ===== CENTER: HERO / "ME" PAGE ===== */
.panel-center {
  display:flex; flex-direction:column; align-items:center; background:#f7f3ec;
}
.contact-block {
  width:100%; padding:50px 60px 24px; text-align:center;
  border-bottom:2px solid #ddd6c8;
}
.contact-block .brand-name { font-size:44px; font-weight:800; color:#1b2a4a; margin-bottom:14px; }
.contact-block .line { font-size:24px; color:#5a5a5a; margin-bottom:4px; }
.avatar-zone {
  flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  width:100%; padding:10px;
}
.avatar-zone img { height:760px; width:auto; }
.hero-headline { font-size:48px; font-weight:800; color:#1b2a4a; text-align:center; margin-top:20px; }
.hero-subline { font-size:28px; color:#7a7260; text-align:center; margin-top:10px; }
.dock {
  width:100%; padding:22px 40px; display:flex; justify-content:center; gap:20px;
  border-top:2px solid #ddd6c8;
}
.dock .slot {
  width:84px; height:84px; border-radius:20px; background:#e8e2d3;
  border:2px dashed #cbbf9f; display:flex; align-items:center; justify-content:center;
  font-size:14px; color:#a89f86; text-align:center; text-decoration:none;
}
.socials {
  width:100%; padding:22px 40px 36px; display:flex; justify-content:center; gap:22px;
  border-top:2px solid #ddd6c8;
}
.socials .icon {
  width:64px; height:64px; border-radius:50%; background:#1b2a4a; color:#fff;
  display:flex; align-items:center; justify-content:center; font-size:14px; text-decoration:none;
}

/* ===== LEFT: UTILITY (fixed structure, per-customer links) ===== */
.panel-utility {
  background:#efe9dc; display:flex; flex-direction:column;
  align-items:center; justify-content:center; padding:60px;
}
.panel-utility .qr-box {
  width:360px; height:360px; background:#fff; border:3px solid #1b2a4a; border-radius:16px;
  display:flex; align-items:center; justify-content:center; font-size:20px; color:#999;
  text-align:center; margin-bottom:50px;
}
.panel-utility .util-list { font-size:28px; color:#1b2a4a; line-height:2.4; text-align:center; }
.panel-utility .util-list a { color:#1b2a4a; text-decoration:underline; }

/* ===== RIGHT: PROMPT CARDS ===== */
.panel-card {
  background:#fbf9f4; overflow-y:auto; padding:80px 60px;
  display:flex; flex-direction:column; align-items:center;
}
.panel-card .card-title { font-size:52px; font-weight:800; color:#1b2a4a; text-align:center; margin-bottom:16px; margin-top:60px; }
.panel-card .card-rule { width:160px; height:3px; background:#c9a24a; margin:0 auto 50px; }
.prompt-block { width:100%; max-width:850px; margin-bottom:40px; }
.prompt-block .question { font-size:26px; font-weight:700; color:#1b2a4a; margin-bottom:10px; }
.prompt-block .answer-box {
  min-height:100px; border:3px dashed #cfc6ac; border-radius:16px; padding:24px;
  font-size:24px; color:#a89f86;
}

/* ===== RIGHT: FREE-FORM PAGES ===== */
.panel-expand {
  background:#fbf9f4; overflow-y:auto; padding:80px 60px;
}
.panel-expand .expand-title { font-size:52px; font-weight:800; color:#1b2a4a; text-align:center; margin-bottom:16px; margin-top:60px; }
.panel-expand .expand-rule { width:160px; height:3px; background:#c9a24a; margin:0 auto 50px; }
.panel-expand .expand-body { font-size:28px; color:#4a4438; line-height:1.7; max-width:900px; margin:0 auto; text-align:center; }

.swipe-dots {
  position:absolute; bottom:16px; left:50%; transform:translateX(-50%);
  display:flex; gap:16px; z-index:5;
}
.swipe-dots .dot { width:14px; height:14px; border-radius:50%; background:#ccc2ab; }
.swipe-dots .dot.active { background:#1b2a4a; }
