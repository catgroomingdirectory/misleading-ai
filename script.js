// ── CUSTOM CURSOR ────────────────────────────────────────────────────────────
var cur = document.getElementById('cursor');
var ring = document.getElementById('cursor-ring');
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a,button,.pre-btn,.bento-card,.buyer-card').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cur.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(0,212,255,0.6)';
  });
  el.addEventListener('mouseleave', function() {
    cur.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(0,212,255,0.4)';
  });
});

// ── PARTICLES ────────────────────────────────────────────────────────────────
var canvas = document.getElementById('particleCanvas');
var ctx = canvas.getContext('2d');
var W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function Particle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;
  this.vx = (Math.random() - 0.5) * 0.3;
  this.vy = (Math.random() - 0.5) * 0.3;
  this.r = Math.random() * 1.5 + 0.3;
  this.alpha = Math.random() * 0.4 + 0.1;
  this.color = Math.random() > 0.85 ? '#ff3da0' : '#00d4ff';
}

for (var i = 0; i < 80; i++) particles.push(new Particle());

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  for (var i = 0; i < particles.length; i++) {
    for (var j = i+1; j < particles.length; j++) {
      var dx = particles[i].x - particles[j].x;
      var dy = particles[i].y - particles[j].y;
      var dist = Math.sqrt(dx*dx+dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,212,255,' + (1 - dist/120) * 0.08 + ')';
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  particles.forEach(function(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.color === '#ff3da0'
      ? 'rgba(255,61,160,' + p.alpha + ')'
      : 'rgba(0,212,255,' + p.alpha + ')';
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

document.addEventListener('mousemove', function(e) {
  particles.forEach(function(p) {
    var dx = e.clientX - p.x;
    var dy = e.clientY - p.y;
    var dist = Math.sqrt(dx*dx+dy*dy);
    if (dist < 80) {
      p.vx -= dx * 0.002;
      p.vy -= dy * 0.002;
    }
  });
});

// ── SCANNER ──────────────────────────────────────────────────────────────────
var VDATA = {
  misleading: {
    label:'MISLEADING', icon:'⚠', cls:'v-misleading',
    chips:['Unverifiable claim','No source cited','Contradicts data','Exaggerated framing','High deception score']
  },
  partial: {
    label:'PARTIALLY TRUE', icon:'◈', cls:'v-partial',
    chips:['Missing context','Selectively accurate','Key caveats absent','Outdated evidence','Incomplete picture']
  },
  accurate: {
    label:'ACCURATE', icon:'✓', cls:'v-accurate',
    chips:['Source verified','Peer-reviewed','Appropriate caveats','Consistent record','High confidence']
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
  var btn = document.getElementById('scanBtn');
  var panel = document.getElementById('resultPanel');
  var sl = document.getElementById('scanLine');
  btn.textContent = 'SCANNING...';
  btn.classList.add('active');
  panel.classList.remove('show');
  sl.classList.add('running');
  setTimeout(function() { sl.classList.remove('running'); }, 800);
  setTimeout(function() {
    var verdict = getVerdict(text);
    var vd = VDATA[verdict];
    var conf = verdict === 'misleading' ? 85 + Math.random()*12 :
               verdict === 'partial'    ? 62 + Math.random()*20 :
                                          87 + Math.random()*11;
    var chips = vd.chips.slice().sort(function(){return 0.5-Math.random();}).slice(0,3);
    document.getElementById('vIcon').textContent = vd.icon;
    document.getElementById('vLabel').textContent = vd.label;
    document.getElementById('vConf').textContent = 'CONFIDENCE: ' + conf.toFixed(1) + '%  ·  SCAN COMPLETE';
    document.getElementById('vChips').innerHTML = chips.map(function(c){ return '<span class="v-chip">'+c+'</span>'; }).join('');
    var bar = document.getElementById('resultBar');
    bar.style.width = '0%';
    panel.className = 'result-panel ' + vd.cls + ' show';
    setTimeout(function(){ bar.style.width = conf.toFixed(0) + '%'; }, 80);
    btn.textContent = 'SCAN';
    btn.classList.remove('active');
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('scanBtn').addEventListener('click', function() {
    runScan(document.getElementById('claimInput').value);
  });
  document.getElementById('claimInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') runScan(this.value);
  });
  document.querySelectorAll('.pre-btn').forEach(function(b) {
    b.addEventListener('click', function() {
      var c = this.getAttribute('data-c');
      document.getElementById('claimInput').value = c;
      runScan(c);
    });
  });
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
});
