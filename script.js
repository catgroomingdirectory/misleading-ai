// ── Mobile menu ──────────────────────────────────────────────────
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') navLinks.classList.remove('open');
  });
}

// ── Scroll reveal ────────────────────────────────────────────────
var obs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

// ── Truth engine demo (homepage only) ────────────────────────────
var scanBtn = document.getElementById('scanBtn');
if (scanBtn) {
  var VDATA = {
    misleading: {
      label: 'MISLEADING', cls: 'v-bad',
      chips: ['Unverifiable claim', 'No source cited', 'Contradicts data', 'Exaggerated framing', 'High deception score']
    },
    partial: {
      label: 'PARTIALLY TRUE', cls: 'v-warn',
      chips: ['Missing context', 'Selectively accurate', 'Key caveats absent', 'Outdated evidence', 'Incomplete picture']
    },
    accurate: {
      label: 'ACCURATE', cls: 'v-good',
      chips: ['Source verified', 'Peer-reviewed', 'Appropriate caveats', 'Consistent record', 'High confidence']
    }
  };

  function getVerdict(t) {
    t = t.toLowerCase();
    if (/never|100%|always|cure|guaranteed|completely|real.*unedited|unaltered/.test(t)) return 'misleading';
    if (/study|research|suggests|evidence|may|might|could|some/.test(t)) return 'partial';
    if (/verified|peer.review|multiple source|confirmed|established/.test(t)) return 'accurate';
    var r = Math.random();
    return r < 0.5 ? 'misleading' : r < 0.8 ? 'partial' : 'accurate';
  }

  function runScan(text) {
    if (!text.trim()) return;
    var panel = document.getElementById('resultPanel');
    scanBtn.textContent = 'Scanning…';
    scanBtn.disabled = true;
    panel.classList.remove('show');
    setTimeout(function () {
      var verdict = getVerdict(text);
      var vd = VDATA[verdict];
      var conf = verdict === 'misleading' ? 85 + Math.random() * 12 :
                 verdict === 'partial'    ? 62 + Math.random() * 20 :
                                            87 + Math.random() * 11;
      var chips = vd.chips.slice().sort(function () { return 0.5 - Math.random(); }).slice(0, 3);
      document.getElementById('vLabel').textContent = vd.label;
      document.getElementById('vConf').textContent = 'Confidence ' + conf.toFixed(1) + '% · scan complete';
      document.getElementById('vChips').innerHTML = chips.map(function (c) {
        return '<span class="chip">' + c + '</span>';
      }).join('');
      var bar = document.getElementById('resultBar');
      bar.style.width = '0%';
      panel.className = 'result ' + vd.cls + ' show';
      setTimeout(function () { bar.style.width = conf.toFixed(0) + '%'; }, 80);
      scanBtn.textContent = 'Scan';
      scanBtn.disabled = false;
    }, 900);
  }

  scanBtn.addEventListener('click', function () {
    runScan(document.getElementById('claimInput').value);
  });
  document.getElementById('claimInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') runScan(this.value);
  });
  document.querySelectorAll('.preset').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = this.getAttribute('data-c');
      document.getElementById('claimInput').value = c;
      runScan(c);
    });
  });
}
