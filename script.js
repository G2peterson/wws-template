const track = document.getElementById('track');
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
