/* CTF 101 — slide engine + interactive widgets (vanilla JS, no dependencies) */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const stage = $('#stage');
  const slides = $$('#stage > .slide');
  const total = slides.length;
  const pad = n => String(n).padStart(2, '0');
  let cur = 0;

  /* ---------- scale the 1600×900 canvas to the window ---------- */
  const fit = () => document.documentElement.style.setProperty('--scale', Math.min(innerWidth / 1600, innerHeight / 900));
  addEventListener('resize', fit);
  document.addEventListener('fullscreenchange', () => { fit(); syncFsButton(); });
  fit();

  /* ---------- links to the Markdown guides in docs/ ----------
     Relative paths work when the repo is opened locally. When the deck is served from a web host,
     point them at the GitHub repository (set in <body data-docs-base>) so the Markdown renders. */
  const docsBase = document.body.dataset.docsBase;
  if (docsBase && !/^(file:|https?:\/\/(localhost|127\.0\.0\.1)[:/])/.test(location.href))
    $$('a[data-doc]').forEach(a => { a.href = docsBase + a.getAttribute('href'); });

  /* ---------- navigation ---------- */
  function go(n) {
    n = Math.max(0, Math.min(total - 1, n));
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
      s.classList.toggle('past', i < n);
      s.setAttribute('aria-hidden', i === n ? 'false' : 'true');
      s.inert = i !== n;
    });
    cur = n;
    $('#counter').innerHTML = `<b>${pad(n + 1)}</b> / ${pad(total)}`;
    $('#progress').style.width = `${((n + 1) / total) * 100}%`;
    $('#brand-section').textContent = slides[n].dataset.section || '';
    $('#prev').disabled = n === 0;
    $('#next').disabled = n === total - 1;
    renderNotes();
    if (location.hash !== `#${n + 1}`) history.replaceState(null, '', `#${n + 1}`);
    document.title = `${pad(n + 1)} · ${slides[n].dataset.title || 'CTF 101'} — CTF 101`;
  }
  const next = () => go(cur + 1);
  const prev = () => go(cur - 1);
  const fromHash = () => { const n = parseInt(location.hash.slice(1), 10); return Number.isFinite(n) ? n - 1 : 0; };
  addEventListener('hashchange', () => { const n = fromHash(); if (n !== cur) go(n); });

  $('#next').addEventListener('click', next);
  $('#prev').addEventListener('click', prev);

  /* ---------- fullscreen ---------- */
  const fsBtn = $('#fs');
  function toggleFs() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }
  function syncFsButton() { fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement)); }
  fsBtn.addEventListener('click', toggleFs);

  /* ---------- overview grid ---------- */
  const overview = $('#overview');
  const thumbs = $('#thumbs');
  let thumbsBuilt = false;
  function buildThumbs() {
    slides.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'thumb';
      b.type = 'button';
      b.dataset.goto = i + 1;
      const mini = document.createElement('div');
      mini.className = 'mini';
      const clone = s.cloneNode(true);
      clone.classList.add('active');
      clone.classList.remove('past');
      clone.removeAttribute('id');
      clone.inert = true;
      $$('[id]', clone).forEach(el => el.removeAttribute('id'));
      mini.appendChild(clone);
      b.appendChild(mini);
      b.insertAdjacentHTML('beforeend', `<span><b>${pad(i + 1)}</b>${s.dataset.title || ''}</span>`);
      thumbs.appendChild(b);
    });
    thumbsBuilt = true;
  }
  function sizeThumbs() {
    $$('.thumb .mini', thumbs).forEach(m => { m.firstChild.style.transform = `scale(${m.clientWidth / 1600})`; });
  }
  function openOverview() {
    if (!thumbsBuilt) buildThumbs();
    overview.classList.add('open');
    $('#ov').setAttribute('aria-pressed', 'true');
    sizeThumbs();
    $$('.thumb', thumbs).forEach((t, i) => t.classList.toggle('current', i === cur));
    const t = $$('.thumb', thumbs)[cur];
    t.scrollIntoView({ block: 'center' });
    t.focus({ preventScroll: true });
  }
  function closeOverview() {
    overview.classList.remove('open');
    $('#ov').setAttribute('aria-pressed', 'false');
  }
  const toggleOverview = () => (overview.classList.contains('open') ? closeOverview() : openOverview());
  $('#ov').addEventListener('click', toggleOverview);
  $('#ov-close').addEventListener('click', closeOverview);
  addEventListener('resize', () => overview.classList.contains('open') && sizeThumbs());

  /* any element with data-goto="N" jumps to slide N (overview thumbs, category map cards) */
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-goto]');
    if (!g) return;
    e.preventDefault();
    go(parseInt(g.dataset.goto, 10) - 1);
    closeOverview();
  });

  /* ---------- speaker notes ---------- */
  const notes = $('#notes');
  function renderNotes() {
    const n = slides[cur].querySelector('.notes');
    notes.innerHTML = `<h5>Speaker notes · ${pad(cur + 1)}</h5>` + (n ? n.innerHTML : '<p>No notes for this slide.</p>');
  }
  const toggleNotes = () => {
    const open = notes.classList.toggle('open');
    $('#nt').setAttribute('aria-pressed', String(open));
  };
  $('#nt').addEventListener('click', toggleNotes);

  /* ---------- help ---------- */
  const help = $('#help');
  const toggleHelp = () => help.classList.toggle('open');
  $('#hp').addEventListener('click', toggleHelp);
  help.addEventListener('click', e => { if (e.target === help) toggleHelp(); });

  /* ---------- keyboard ---------- */
  const typing = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (typing(e.target)) { if (e.key === 'Escape') e.target.blur(); return; }
    const k = e.key;

    if (overview.classList.contains('open')) {
      const ts = $$('.thumb', thumbs);
      const i = ts.indexOf(document.activeElement);
      const cols = Math.max(1, Math.round(thumbs.clientWidth / (ts[0].clientWidth + 18)));
      const move = d => { e.preventDefault(); ts[Math.max(0, Math.min(ts.length - 1, (i < 0 ? cur : i) + d))].focus(); };
      if (k === 'Escape' || k === 'o' || k === 'g') { e.preventDefault(); closeOverview(); }
      else if (k === 'ArrowRight') move(1);
      else if (k === 'ArrowLeft') move(-1);
      else if (k === 'ArrowDown') move(cols);
      else if (k === 'ArrowUp') move(-cols);
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); (document.activeElement.closest('.thumb') || ts[cur]).click(); }
      return;
    }

    switch (k) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown':
        e.preventDefault(); next(); break;
      case ' ':
        e.preventDefault(); e.shiftKey ? prev() : next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(total - 1); break;
      case 'f': case 'F': toggleFs(); break;
      case 'o': case 'O': case 'g': case 'G': openOverview(); break;
      case 'n': case 'N': toggleNotes(); break;
      case '?': case 'h': case 'H': toggleHelp(); break;
      case 'Escape':
        if (help.classList.contains('open')) toggleHelp();
        else if (notes.classList.contains('open')) toggleNotes();
        break;
    }
  });

  /* ---------- touch swipe ---------- */
  let tx = null;
  stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
    tx = null;
  });

  /* ---------- hide chrome when idle (clean audience view) ---------- */
  let idleT;
  const wake = () => { document.body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add('idle'), 2800); };
  ['mousemove', 'mousedown', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, wake, { passive: true }));
  wake();

  /* ---------- editable presenter fields remember their text ---------- */
  $$('[data-store]').forEach(el => {
    const key = `ctf101:${el.dataset.store}`;
    try { const v = localStorage.getItem(key); if (v) el.textContent = v; } catch { /* storage unavailable */ }
    el.addEventListener('input', () => { try { localStorage.setItem(key, el.textContent); } catch { /* ignore */ } });
  });

  /* =========================================================
     Interactive widgets
     ========================================================= */

  /* data-reveal="#id": toggles a .reveal panel */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-reveal]');
    if (!b) return;
    const t = $(b.dataset.reveal);
    const shown = t.classList.toggle('shown');
    b.setAttribute('aria-expanded', String(shown));
    if (b.dataset.labelShown) {
      b.dataset.labelHidden ??= b.querySelector('.lbl').textContent;
      b.querySelector('.lbl').textContent = shown ? b.dataset.labelShown : b.dataset.labelHidden;
    }
  });

  /* quizzes: .quiz-opt[data-choice] shows matching .feedback[data-for] in the same .quiz */
  $$('.quiz').forEach(q => {
    q.addEventListener('click', e => {
      const o = e.target.closest('.quiz-opt');
      if (!o) return;
      $$('.quiz-opt', q).forEach(x => x.classList.toggle('picked', x === o));
      $$('.feedback', q).forEach(f => f.classList.toggle('shown', f.dataset.for === o.dataset.choice));
      $$('[data-after-pick]', q).forEach(x => x.classList.add('shown'));
    });
  });

  /* Caesar / ROT shift (crypto) */
  const shiftText = (s, k) => s.replace(/[a-z]/gi, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + k) % 26 + 26) % 26 + base);
  });
  const cIn = $('#caesar-in'), cK = $('#caesar-k'), cOut = $('#caesar-out'), cKv = $('#caesar-kv');
  if (cIn) {
    const upd = () => {
      const k = +cK.value;
      cKv.textContent = k;
      const out = shiftText(cIn.value, k);
      cOut.textContent = out;
      cOut.classList.toggle('accent', /FLAG\{/.test(out));
    };
    cIn.addEventListener('input', upd); cK.addEventListener('input', upd); upd();
  }

  /* encoder playground (crypto): Base64 / hex / binary of any text */
  const eIn = $('#enc-in');
  if (eIn) {
    const bytes = s => new TextEncoder().encode(s);
    const upd = () => {
      const b = bytes(eIn.value);
      $('#enc-b64').textContent = btoa(String.fromCharCode(...b)) || '—';
      $('#enc-hex').textContent = [...b].map(x => x.toString(16).padStart(2, '0')).join(' ') || '—';
      $('#enc-bin').textContent = [...b].slice(0, 6).map(x => x.toString(2).padStart(8, '0')).join(' ') + (b.length > 6 ? ' …' : '') || '—';
    };
    eIn.addEventListener('input', upd); upd();
  }

  /* LSB steganography pixel demo */
  const px = $('#lsb-grid');
  if (px) {
    // 5×7 pixel font for the hidden word
    const font = {
      F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
      L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
      A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
      G: ['01110', '10001', '10000', '10111', '10001', '10001', '01111'],
    };
    const W = 29, H = 11, word = 'FLAG';
    const mask = Array.from({ length: H }, () => Array(W).fill(0));
    [...word].forEach((ch, n) => font[ch].forEach((row, y) => [...row].forEach((bit, x) => { mask[y + 2][x + 2 + n * 7] = +bit; })));
    px.style.gridTemplateColumns = `repeat(${W}, 1fr)`;
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const cells = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      // a soft sky→sea gradient "photo"; the hidden bit only changes the blue value by 1 (invisible)
      const r = 20 + Math.round(40 * rnd()), g = 110 + Math.round(70 * (y / H)) + Math.round(30 * rnd()), b = 150 + Math.round(60 * rnd());
      const blue = (b & ~1) | mask[y][x];
      const i = document.createElement('i');
      i.dataset.c = `rgb(${r},${g},${blue})`;
      i.dataset.lsb = mask[y][x];
      i.style.backgroundColor = i.dataset.c;
      px.appendChild(i);
      cells.push(i);
    }
    const sw = $('#lsb-toggle');
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-pressed') !== 'true';
      sw.setAttribute('aria-pressed', String(on));
      sw.querySelector('.lbl').textContent = on ? 'Back to the normal image' : 'Show only the last bit of each pixel';
      cells.forEach((c, n) => setTimeout(() => {
        c.style.backgroundColor = on ? (c.dataset.lsb === '1' ? '#ffffff' : '#000000') : c.dataset.c;
      }, on ? (n % W) * 14 : 0));
      $('#lsb-caption').textContent = on
        ? 'Bit plane 0: each pixel shows only its last bit (1 = white, 0 = black). The hidden message appears.'
        : 'Normal view: the hidden bits change each colour by at most 1 out of 256, which the eye cannot see.';
    });
  }

  /* buffer overflow memory demo (pwn) */
  const bIn = $('#bof-in');
  if (bIn) {
    const BUF = 8, RET = 4;
    const mem = $('#bof-mem');
    const status = $('#bof-status');
    const upd = () => {
      const v = bIn.value.slice(0, BUF + RET + 2);
      $$('.cell', mem).forEach((c, i) => {
        const ch = v[i];
        const isRet = i >= BUF;
        c.classList.toggle('used', !!ch && !isRet);
        c.classList.toggle('smash', !!ch && isRet);
        c.textContent = ch ?? (isRet ? c.dataset.orig : '');
      });
      const over = bIn.value.length - BUF;
      if (over <= 0) {
        status.innerHTML = `<b class="accent">${bIn.value.length} / ${BUF} boxes used.</b> Everything fits, so the program carries on normally.`;
      } else {
        status.innerHTML = `<b style="color:var(--bad)">${over} character${over > 1 ? 's' : ''} spilled over</b> into the neighbouring "return address". When the function finishes, the program jumps to a garbage address and crashes with a <span class="term">Segmentation fault</span>.`;
      }
    };
    bIn.addEventListener('input', upd); upd();
  }

  /* live Base64 decode (interactive challenge 1) */
  const dBtn = $('#decode-run');
  if (dBtn) {
    dBtn.addEventListener('click', () => {
      const out = $('#decode-out');
      const plain = atob($('#decode-src').textContent.trim());
      out.textContent = '';
      $('#decode-box').classList.add('shown');
      let i = 0;
      const t = setInterval(() => { out.textContent = plain.slice(0, ++i); if (i >= plain.length) clearInterval(t); }, 45);
    });
  }

  go(fromHash());
})();
