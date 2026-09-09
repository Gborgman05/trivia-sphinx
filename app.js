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

function renderTabs() {
  const tabs = document.getElementById('tabs');
  tabs.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (cat.id === activeCategoryId ? ' active' : '');
    btn.textContent = cat.shortName || cat.name;
    btn.addEventListener('click', () => {
      activeCategoryId = cat.id;
      render();
    });
    tabs.appendChild(btn);
  });
}

function likelihoodLabel(level) {
  const map = { high: 'Likely to appear', medium: 'Possible', low: 'Long shot' };
  return map[level] || level;
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
  if (item.likelihood) {
    const tag = document.createElement('span');
    tag.className = `likelihood ${item.likelihood}`;
    tag.textContent = likelihoodLabel(item.likelihood);
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
  q.innerHTML = `Track ${idx + 1}: <span class="music-hidden">song &amp; artist hidden — press play to reveal</span>`;
  top.appendChild(q);
  if (item.likelihood) {
    const tag = document.createElement('span');
    tag.className = `likelihood ${item.likelihood}`;
    tag.textContent = likelihoodLabel(item.likelihood);
    top.appendChild(tag);
  }
  card.appendChild(top);

  const revealArea = document.createElement('div');
  revealArea.className = 'music-reveal';

  const playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.textContent = '▶ Play & Reveal';

  const details = document.createElement('div');
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

  const playerWrap = document.createElement('div');
  playerWrap.className = 'player-wrap';
  playerWrap.style.display = 'none';

  playBtn.addEventListener('click', () => {
    details.style.display = 'block';
    playerWrap.style.display = 'block';
    if (!playerWrap.dataset.loaded) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`;
      iframe.title = `${item.title} - ${item.artist}`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      playerWrap.appendChild(iframe);
      playerWrap.dataset.loaded = '1';
    }
    playBtn.style.display = 'none';
  });

  revealArea.appendChild(playBtn);
  revealArea.appendChild(details);
  revealArea.appendChild(playerWrap);
  card.appendChild(revealArea);

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  actions.appendChild(makeKnownButton(cat, idx));
  card.appendChild(actions);

  return card;
}

function renderPictureCard(cat, idx) {
  const item = cat.items[idx];
  const card = document.createElement('div');
  card.className = 'card' + (isKnown(cat.id, idx) ? ' known' : '');

  const top = document.createElement('div');
  top.className = 'card-top';
  const q = document.createElement('div');
  q.className = 'card-question';
  q.textContent = `Practice ${idx + 1}: what does this line-art depict?`;
  top.appendChild(q);
  if (item.likelihood) {
    const tag = document.createElement('span');
    tag.className = `likelihood ${item.likelihood}`;
    tag.textContent = likelihoodLabel(item.likelihood);
    top.appendChild(tag);
  }
  card.appendChild(top);

  const svgWrap = document.createElement('div');
  svgWrap.className = 'svg-wrap';
  svgWrap.innerHTML = item.svg;
  card.appendChild(svgWrap);

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

function render() {
  renderTabs();
  const main = document.getElementById('main');
  main.innerHTML = '';

  const cat = CATEGORIES.find(c => c.id === activeCategoryId);

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
    else if (cat.type === 'pictures') cardEl = renderPictureCard(cat, idx);
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
