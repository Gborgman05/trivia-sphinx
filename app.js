// Beat the Geek study app — vanilla JS, no build step, no dependencies.

const STORAGE_KEY = 'btg-progress-v1';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
let progress = loadProgress();

function itemKey(catId, idx) {
  return `${catId}:${idx}`;
}
function isKnown(catId, idx) {
  return !!progress[itemKey(catId, idx)];
}
function toggleKnown(catId, idx) {
  const key = itemKey(catId, idx);
  progress[key] = !progress[key];
  saveProgress(progress);
}
function resetCategory(catId, itemCount) {
  for (let i = 0; i < itemCount; i++) delete progress[itemKey(catId, i)];
  saveProgress(progress);
}

let activeCategoryId = CATEGORIES[0].id;
let shuffledOrder = {}; // catId -> array of indices
let hideKnown = {}; // catId -> bool
let stopCurrentTrack = null; // stops whichever music card is currently playing

function baseOrder(cat) {
  return cat.items.map((_, i) => i);
}
function getOrder(cat) {
  if (!shuffledOrder[cat.id]) shuffledOrder[cat.id] = baseOrder(cat);
  return shuffledOrder[cat.id];
}
function shuffleOrder(cat) {
  const arr = baseOrder(cat);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  shuffledOrder[cat.id] = arr;
}

function activateCategory(id, opts = {}) {
  activeCategoryId = id;
  render();
  if (opts.focusTab !== false) {
    const btn = document.getElementById(`tab-${id}`);
    if (btn) btn.focus();
  }
}

function handleTabsKeydown(e) {
  const idx = CATEGORIES.findIndex(c => c.id === activeCategoryId);
  let nextIdx = null;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (idx + 1) % CATEGORIES.length;
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (idx - 1 + CATEGORIES.length) % CATEGORIES.length;
  else if (e.key === 'Home') nextIdx = 0;
  else if (e.key === 'End') nextIdx = CATEGORIES.length - 1;
  if (nextIdx !== null) {
    e.preventDefault();
    activateCategory(CATEGORIES[nextIdx].id);
  }
}

function renderTabs() {
  const tabs = document.getElementById('tabs');
  tabs.innerHTML = '';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Trivia categories');
  tabs.onkeydown = handleTabsKeydown;
  CATEGORIES.forEach(cat => {
    const isActive = cat.id === activeCategoryId;
    const btn = document.createElement('button');
    btn.id = `tab-${cat.id}`;
    btn.className = 'tab-btn' + (isActive ? ' active' : '');
    btn.textContent = cat.shortName || cat.name;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('aria-controls', 'main');
    btn.tabIndex = isActive ? 0 : -1;
    btn.addEventListener('click', () => activateCategory(cat.id, { focusTab: false }));
    tabs.appendChild(btn);
  });
}

function difficultyLabel(level) {
  const map = {
    'easy-medium': 'Easier',
    medium: 'Moderate',
    'medium-hard': 'Challenge'
  };
  return map[level] || level;
}

function appendExternalLinkText(link, icon, label) {
  const iconSpan = document.createElement('span');
  iconSpan.setAttribute('aria-hidden', 'true');
  iconSpan.textContent = icon;
  link.appendChild(iconSpan);
  link.appendChild(document.createTextNode(` ${label} (opens in new tab)`));
}

function renderToolbar(cat) {
  const wrap = document.createElement('div');
  wrap.className = 'toolbar';

  const total = cat.items.length;
  const knownCount = cat.items.filter((_, i) => isKnown(cat.id, i)).length;

  const progressWrap = document.createElement('div');
  progressWrap.className = 'progress-wrap';
  const bg = document.createElement('div');
  bg.className = 'progress-bar-bg';
  const fill = document.createElement('div');
  fill.className = 'progress-bar-fill';
  fill.style.width = total ? `${Math.round((knownCount / total) * 100)}%` : '0%';
  bg.appendChild(fill);
  const label = document.createElement('div');
  label.className = 'progress-label';
  label.textContent = `${knownCount} / ${total} marked known`;
  progressWrap.appendChild(bg);
  progressWrap.appendChild(label);
  wrap.appendChild(progressWrap);

  const shuffleBtn = document.createElement('button');
  shuffleBtn.textContent = '🔀 Shuffle';
  shuffleBtn.addEventListener('click', () => { shuffleOrder(cat); render(); });
  wrap.appendChild(shuffleBtn);

  const hideBtn = document.createElement('button');
  hideBtn.textContent = hideKnown[cat.id] ? '👁 Show all' : '🙈 Hide known';
  hideBtn.addEventListener('click', () => {
    hideKnown[cat.id] = !hideKnown[cat.id];
    render();
  });
  wrap.appendChild(hideBtn);

  const resetBtn = document.createElement('button');
  resetBtn.className = 'danger';
  resetBtn.textContent = '↺ Reset progress';
  resetBtn.addEventListener('click', () => {
    if (confirm(`Reset progress for "${cat.name}"?`)) {
      resetCategory(cat.id, cat.items.length);
      render();
    }
  });
  wrap.appendChild(resetBtn);

  return wrap;
}

function makeKnownButton(cat, idx) {
  const btn = document.createElement('button');
  btn.className = 'known-btn' + (isKnown(cat.id, idx) ? ' active' : '');
  btn.textContent = isKnown(cat.id, idx) ? '✓ Known' : 'Mark known';
  btn.addEventListener('click', () => {
    toggleKnown(cat.id, idx);
    render();
  });
  return btn;
}

function renderQuizCard(cat, idx) {
  const item = cat.items[idx];
  const card = document.createElement('div');
  card.className = 'card' + (isKnown(cat.id, idx) ? ' known' : '');

  const top = document.createElement('div');
  top.className = 'card-top';
  const q = document.createElement('div');
  q.className = 'card-question';
  q.textContent = item.q;
  top.appendChild(q);
  if (item.difficulty) {
    const tag = document.createElement('span');
    tag.className = `difficulty ${item.difficulty}`;
    tag.textContent = difficultyLabel(item.difficulty);
    top.appendChild(tag);
  }
  card.appendChild(top);

  const answerBox = document.createElement('div');
  answerBox.className = 'card-answer';
  answerBox.style.display = 'none';
  const answerLabel = document.createElement('span');
  answerLabel.className = 'answer-label';
  answerLabel.textContent = 'Answer';
  answerBox.appendChild(answerLabel);
  const answerText = document.createElement('div');
  answerText.textContent = item.a;
  answerBox.appendChild(answerText);
  if (item.notes) {
    const notes = document.createElement('div');
    notes.className = 'card-notes';
    notes.textContent = item.notes;
    answerBox.appendChild(notes);
  }
  card.appendChild(answerBox);

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  const revealBtn = document.createElement('button');
  revealBtn.className = 'reveal-btn';
  revealBtn.textContent = 'Reveal answer';
  revealBtn.addEventListener('click', () => {
    const showing = answerBox.style.display !== 'none';
    answerBox.style.display = showing ? 'none' : 'block';
    revealBtn.textContent = showing ? 'Reveal answer' : 'Hide answer';
  });
  actions.appendChild(revealBtn);
  actions.appendChild(makeKnownButton(cat, idx));
  card.appendChild(actions);

  return card;
}

function renderMusicCard(cat, idx) {
  const item = cat.items[idx];
  const card = document.createElement('div');
  card.className = 'card music-card' + (isKnown(cat.id, idx) ? ' known' : '');

  const top = document.createElement('div');
  top.className = 'card-top';
  const q = document.createElement('div');
  q.className = 'card-question';
  q.innerHTML = `Track ${idx + 1}: <span class="music-hidden">song &amp; artist hidden</span>`;
  top.appendChild(q);
  if (item.difficulty) {
    const tag = document.createElement('span');
    tag.className = `difficulty ${item.difficulty}`;
    tag.textContent = difficultyLabel(item.difficulty);
    top.appendChild(tag);
  }
  card.appendChild(top);

  const revealArea = document.createElement('div');
  revealArea.className = 'music-reveal';

  const controls = document.createElement('div');
  controls.className = 'music-controls';

  const playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.textContent = '▶ Play song';

  const showBtn = document.createElement('button');
  showBtn.className = 'reveal-btn';
  showBtn.textContent = '🔎 Show title & artist';

  controls.appendChild(playBtn);
  controls.appendChild(showBtn);

  const details = document.createElement('div');
  details.className = 'card-answer';
  details.style.display = 'none';
  const titleLine = document.createElement('div');
  titleLine.className = 'music-title-artist';
  titleLine.textContent = `"${item.title}"`;
  const artistLine = document.createElement('div');
  artistLine.className = 'music-artist';
  artistLine.textContent = item.artist;
  details.appendChild(titleLine);
  details.appendChild(artistLine);
  if (item.notes) {
    const notes = document.createElement('div');
    notes.className = 'card-notes';
    notes.textContent = item.notes;
    details.appendChild(notes);
  }
  const hasSpotifyTrackUrl = /^https:\/\/open\.spotify\.com\/track\/[A-Za-z0-9]+$/.test(item.spotifyUrl || '');
  if (item.youtubeId || hasSpotifyTrackUrl) {
    const links = document.createElement('div');
    links.className = 'music-links';
    if (item.youtubeId) {
      const yt = document.createElement('a');
      yt.href = `https://www.youtube.com/watch?v=${item.youtubeId}`;
      yt.target = '_blank';
      yt.rel = 'noopener noreferrer';
      appendExternalLinkText(yt, '▶', 'Open in YouTube');
      links.appendChild(yt);
    }
    if (hasSpotifyTrackUrl) {
      const sp = document.createElement('a');
      sp.href = item.spotifyUrl;
      sp.target = '_blank';
      sp.rel = 'noopener noreferrer';
      appendExternalLinkText(sp, '🎧', 'Open in Spotify');
      links.appendChild(sp);
    }
    details.appendChild(links);
  }

  const playerWrap = document.createElement('div');
  playerWrap.className = 'player-wrap';
  playerWrap.style.display = 'none';

  const mask = document.createElement('div');
  mask.className = 'player-mask';
  mask.textContent = '🎧 Playing — name the song and artist before revealing';
  playerWrap.appendChild(mask);

  function stopTrack() {
    const iframe = playerWrap.querySelector('iframe');
    if (iframe) iframe.remove();
    delete playerWrap.dataset.loaded;
    playerWrap.style.display = 'none';
    mask.style.display = 'flex';
    playBtn.disabled = false;
    playBtn.textContent = '▶ Play song';
    details.style.display = 'none';
    showBtn.textContent = '🔎 Show title & artist';
  }

  playBtn.addEventListener('click', () => {
    if (stopCurrentTrack && stopCurrentTrack !== stopTrack) stopCurrentTrack();
    stopCurrentTrack = stopTrack;

    playerWrap.style.display = 'block';
    if (!playerWrap.dataset.loaded) {
      const iframe = document.createElement('iframe');
      const startSeconds = item.startSeconds || 0;
      iframe.src = `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&start=${startSeconds}`;
      iframe.title = `Track ${idx + 1} audio player`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      playerWrap.appendChild(iframe);
      playerWrap.dataset.loaded = '1';
    }
    playBtn.disabled = true;
    playBtn.textContent = '▶ Playing…';
  });

  showBtn.addEventListener('click', () => {
    const showing = details.style.display !== 'none';
    details.style.display = showing ? 'none' : 'block';
    mask.style.display = showing ? 'flex' : 'none';
    showBtn.textContent = showing ? '🔎 Show title & artist' : '🙈 Hide title & artist';
  });

  revealArea.appendChild(controls);
  revealArea.appendChild(playerWrap);
  revealArea.appendChild(details);
  card.appendChild(revealArea);

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  actions.appendChild(makeKnownButton(cat, idx));
  card.appendChild(actions);

  return card;
}

function render() {
  renderTabs();
  const main = document.getElementById('main');
  main.innerHTML = '';
  stopCurrentTrack = null;

  const cat = CATEGORIES.find(c => c.id === activeCategoryId);
  main.setAttribute('role', 'tabpanel');
  main.setAttribute('aria-labelledby', `tab-${cat.id}`);
  main.tabIndex = 0;

  const header = document.createElement('div');
  header.className = 'category-header';
  const h2 = document.createElement('h2');
  h2.textContent = cat.name;
  header.appendChild(h2);
  const p = document.createElement('p');
  p.textContent = cat.blurb;
  header.appendChild(p);
  main.appendChild(header);

  if (cat.infoBox) {
    const info = document.createElement('div');
    info.className = 'info-box';
    info.innerHTML = cat.infoBox;
    main.appendChild(info);
  }

  main.appendChild(renderToolbar(cat));

  const grid = document.createElement('div');
  grid.className = 'card-grid';

  const order = getOrder(cat);
  order.forEach(idx => {
    if (hideKnown[cat.id] && isKnown(cat.id, idx)) return;
    let cardEl;
    if (cat.type === 'music') cardEl = renderMusicCard(cat, idx);
    else cardEl = renderQuizCard(cat, idx);
    grid.appendChild(cardEl);
  });

  if (!grid.children.length) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--muted)';
    empty.textContent = 'Everything here is marked known. Toggle "Show all" to review again.';
    main.appendChild(empty);
  }

  main.appendChild(grid);
}

render();
