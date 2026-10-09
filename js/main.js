/* Plau am See · Interaktionen */

// ── Header: transparent → solide beim Scrollen ──
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile Navigation ──
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.main-nav a').forEach(link =>
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  })
);

// ── Scroll-Reveal ──
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Statistik-Zähler ──
const formatDE = n => n.toLocaleString('de-DE');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const plain = el.dataset.plain === 'true';
    const duration = 1600;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = (plain ? String(val) : formatDE(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat strong').forEach(el => countObserver.observe(el));

// ── Seen-Kompass ──
// Hinweis: Kennzahlen/Badestellen sind Platzhalter für den Entwurf,
// die Seeformen stilisierte Silhouetten (keine exakten Umrisse).
const LAKES = [
  {
    name: 'Plauer See',
    loc: 'Plau am See · das Hausrevier',
    area: '38,4 km²', depth: '25,5 m', dist: '0 km',
    desc: 'Der drittgrößte See Mecklenburgs liegt direkt vor der Haustür: weites Wasser für Segler, klare Badebuchten und abends der beste Sonnenuntergang der Stadt.',
    baths: ['Strandbad Plau', 'Badewiese am Ufer', 'Hundestrand'],
    maps: 'Plauer See',
    shape: 'M48 6c12-4 22 6 24 18 2 10-6 16-4 26s10 14 6 24c-4 11-18 16-28 12S30 74 28 62c-2-10-8-16-6-28C24 22 36 10 48 6z'
  },
  {
    name: 'Fleesensee',
    loc: 'Malchow · Untergöhren',
    area: 'ca. 11 km²', depth: 'ca. 26 m', dist: '18 km',
    desc: 'Zwischen Malchow und Waren gelegen, verbindet der Fleesensee die Seenkette Richtung Müritz – beliebt bei Hausbootkapitänen und Golfern.',
    baths: ['Badestelle Untergöhren', 'Seebrücke Silz'],
    maps: 'Fleesensee',
    shape: 'M20 40c8-14 30-22 46-16s18 22 12 34-22 22-38 18S12 54 20 40z'
  },
  {
    name: 'Kölpinsee',
    loc: 'Zwischen Fleesensee und Müritz',
    area: 'ca. 20 km²', depth: 'ca. 30 m', dist: '28 km',
    desc: 'Ruhig, naturnah und von Schilfgürteln gesäumt – der Kölpinsee ist die stille Etappe der Seenkette mit viel Platz für Paddler und Angler.',
    baths: ['Badestelle Klink', 'Naturufer Süd'],
    maps: 'Kölpinsee Mecklenburg',
    shape: 'M14 52c2-16 18-28 36-28s38 8 36 24-16 30-36 30S12 68 14 52z'
  },
  {
    name: 'Müritz',
    loc: 'Waren (Müritz) · Nationalpark',
    area: 'ca. 117 km²', depth: 'ca. 31 m', dist: '35 km',
    desc: 'Das „kleine Meer“ der Seenplatte: Deutschlands größter Binnensee ganz im Landesinneren, mit Nationalpark, Kranichen und weitem Horizont.',
    baths: ['Volksbad Waren', 'Badestelle Klink', 'Strand Rechlin'],
    maps: 'Müritz',
    shape: 'M42 4c14 0 26 10 28 24 2 12-6 18-4 30 2 10 8 14 4 24-4 11-16 16-28 14-12-2-20-12-22-24-2-10 4-16 2-28C20 30 16 18 24 10c6-6 12-6 18-6z'
  },
  {
    name: 'Drewitzer See',
    loc: 'Nossentiner/Schwinzer Heide',
    area: 'ca. 7 km²', depth: 'ca. 35 m', dist: '15 km',
    desc: 'Glasklares Wasser mitten im Naturpark: Der Drewitzer See gilt als einer der saubersten Seen des Landes – perfekt zum Schnorcheln und Baden.',
    baths: ['Badestelle Alt Schwerin', 'Naturbad Drewitz'],
    maps: 'Drewitzer See',
    shape: 'M50 8c10 6 12 20 10 32s2 20-4 30-18 14-28 8-14-20-10-32 2-22 8-30S40 2 50 8z'
  }
];

const lxWheel = document.getElementById('lxWheel');
if (lxWheel) {
  const RADIUS = 300, STEP = 30;
  const lxInfo = document.getElementById('lxInfo');
  const lxTabs = document.getElementById('lxTabs');
  let active = 0, switchTimer = null;

  const items = LAKES.map((lake, i) => {
    const btn = document.createElement('button');
    btn.className = 'lx-item';
    btn.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${lake.shape}"/></svg>
      <span><strong>${lake.name}</strong><small>${lake.dist} ab Plau</small></span>`;
    btn.addEventListener('click', () => go(i));
    lxWheel.appendChild(btn);
    return btn;
  });

  const tabs = LAKES.map((lake, i) => {
    const tab = document.createElement('button');
    tab.className = 'lx-tab';
    tab.textContent = lake.name;
    tab.addEventListener('click', () => go(i));
    lxTabs.appendChild(tab);
    return tab;
  });

  // Mobil sitzt der Kreismittelpunkt über der Sektion: aktiver See zeigt
  // nach unten (90°), Nachbarn links/rechts am Bogen
  const mobileMq = window.matchMedia('(max-width: 900px)');
  // Mobil: step negativ, damit der vorige See links, der nächste rechts
  // am Bogen sitzt – passend zu den Pfeilen und der Wischrichtung
  const dialConf = () => mobileMq.matches
    ? { base: 90, radius: 185, step: -40, end: 'translate(-50%, -50%)' }
    : { base: 0, radius: RADIUS, step: STEP, end: 'translateY(-50%)' };

  function layout() {
    const N = LAKES.length;
    const { base, radius, step, end } = dialConf();
    items.forEach((btn, i) => {
      // kürzester zirkulärer Abstand, damit das Rad zu beiden Seiten Nachbarn zeigt
      const d = ((i - active + N + Math.floor(N / 2)) % N) - Math.floor(N / 2);
      const angle = base + d * step;
      btn.style.transform = `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg) ${end}`;
      btn.classList.toggle('active', d === 0);
      btn.classList.toggle('hidden', Math.abs(d) > 1);
    });
    tabs.forEach((tab, i) => tab.classList.toggle('active', i === active));
  }
  mobileMq.addEventListener('change', layout);

  function renderInfo() {
    const lake = LAKES[active];
    document.getElementById('lxCounter').textContent =
      String(active + 1).padStart(2, '0') + ' / ' + String(LAKES.length).padStart(2, '0');
    document.getElementById('lxName').textContent = lake.name;
    document.getElementById('lxLoc').textContent = lake.loc;
    document.getElementById('lxArea').textContent = lake.area;
    document.getElementById('lxDepth').textContent = lake.depth;
    document.getElementById('lxDist').textContent = lake.dist;
    document.getElementById('lxDesc').textContent = lake.desc;
    document.getElementById('lxBaths').innerHTML =
      lake.baths.map(b => `<li>${b}</li>`).join('');
    document.getElementById('lxRoute').href =
      'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(lake.maps);
  }

  function go(i) {
    active = (i + LAKES.length) % LAKES.length;
    layout();
    lxInfo.classList.add('switching');
    clearTimeout(switchTimer);
    switchTimer = setTimeout(() => {
      renderInfo();
      lxInfo.classList.remove('switching');
    }, 300);
  }

  document.getElementById('lxPrev').addEventListener('click', () => go(active - 1));
  document.getElementById('lxNext').addEventListener('click', () => go(active + 1));

  // Wischgeste (mobil): horizontal wischen dreht das Rad
  const lxSection = document.getElementById('seen');
  let touchX = null, touchY = null;
  lxSection.addEventListener('touchstart', e => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  lxSection.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1));
    touchX = touchY = null;
  }, { passive: true });

  renderInfo();
  layout();
}

// ── Entdeckerkarte (Leaflet) ──
// Hinweis: POIs und Koordinaten sind Entwurfs-Platzhalter – vor Launch
// durch geprüfte Orte/Geodaten und echte Komoot-Tour-Links ersetzen.
const mapEl = document.getElementById('plauMap');
if (mapEl && window.L) {
  const CAT = {
    erleben: { label: 'Plau erleben', color: '#2F7FC2' },
    gastro:  { label: 'Gastro Guide', color: '#E0953C' },
    schiff:  { label: 'Schiff fahren', color: '#159AA6' },
    komoot:  { label: 'Komoot-Touren', color: '#6AA64E' }
  };
  const POIS = [
    { cat: 'erleben', name: 'Burgturm & Museum', desc: 'Wahrzeichen der Altstadt mit Aussicht über den See.', ll: [53.4588, 12.2583] },
    { cat: 'erleben', name: 'Hubbrücke über die Elde', desc: 'Historische Zugbrücke mitten in der Stadt.', ll: [53.4593, 12.2627] },
    { cat: 'erleben', name: 'Marktplatz & Altstadt', desc: 'Fachwerk, Geschäfte und Cafés im Zentrum.', ll: [53.4576, 12.2601] },
    { cat: 'erleben', name: 'Strandbad Plau', desc: 'Flach abfallender Badestrand mit Liegewiese.', ll: [53.4536, 12.2694] },
    { cat: 'erleben', name: 'Klüschenberg', desc: 'Aussichtspunkt und Waldwege über der Stadt.', ll: [53.4603, 12.2521] },
    { cat: 'gastro',  name: 'Restaurant am Hafen', desc: 'Regionale Küche mit Blick auf die Boote.', ll: [53.4566, 12.2651] },
    { cat: 'gastro',  name: 'Altstadt-Café', desc: 'Selbstgebackener Kuchen in der Fußgängerzone.', ll: [53.4581, 12.2597] },
    { cat: 'gastro',  name: 'Fischräucherei am See', desc: 'Frischer Räucherfisch direkt vom Kutter.', ll: [53.4551, 12.2668] },
    { cat: 'schiff',  name: 'Fahrgastschiff-Anleger', desc: 'Start für Rundfahrten über den Plauer See.', ll: [53.4561, 12.2657] },
    { cat: 'schiff',  name: 'Marina & Bootsverleih', desc: 'Tret-, Ruder- und Motorboote mieten.', ll: [53.4546, 12.2688] },
    { cat: 'komoot',  name: 'Elderadweg', desc: 'Flache Radtour am Wasser entlang.', ll: [53.4596, 12.2612], komoot: 'https://www.komoot.com/discover/Plau+am+See' },
    { cat: 'komoot',  name: 'Seerundweg Plauer See', desc: 'Wanderrunde rund um den See.', ll: [53.4515, 12.2585], komoot: 'https://www.komoot.com/discover/Plau+am+See' }
  ];

  const map = L.map(mapEl, { scrollWheelZoom: false }).setView([53.4568, 12.2605], 14);
  // Freie OSM-Standard-Tiles (kein API-Key). Für das Finale kann ein
  // gestylter Basemap-Layer (z. B. MapTiler/CARTO mit Key) im Blau-Look rein.
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
    maxZoom: 19
  }).addTo(map);

  const groups = {};
  Object.keys(CAT).forEach(c => { groups[c] = L.layerGroup().addTo(map); });

  POIS.forEach(poi => {
    const { color, label } = CAT[poi.cat];
    const icon = L.divIcon({
      className: '',
      html: `<div class="map-pin" style="background:${color}"><span></span></div>`,
      iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -24]
    });
    const link = poi.komoot
      ? `<a class="map-pop-link" href="${poi.komoot}" target="_blank" rel="noopener">Tour in Komoot öffnen →</a>` : '';
    L.marker(poi.ll, { icon })
      .bindPopup(`<span class="map-pop-cat" style="--dot:${color}">${label}</span>
        <div class="map-pop-title">${poi.name}</div>
        <div class="map-pop-desc">${poi.desc}</div>${link}`)
      .addTo(groups[poi.cat]);
  });

  setTimeout(() => map.invalidateSize(), 200);

  // Filter-Buttons + Legende
  const counts = {};
  POIS.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
  Object.keys(CAT).forEach(c => {
    const el = document.getElementById('mlCount-' + c);
    if (el) el.textContent = '(' + (counts[c] || 0) + ')';
  });

  document.querySelectorAll('.map-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.cat;
      const on = btn.classList.toggle('is-active');
      btn.setAttribute('aria-pressed', on);
      if (on) groups[c].addTo(map); else map.removeLayer(groups[c]);
      const leg = document.querySelector('.ml-item[data-cat="' + c + '"]');
      if (leg) leg.classList.toggle('is-off', !on);
    });
  });
}

// ── Kulinarik-Scroller ──
const scroller = document.getElementById('foodScroller');
document.querySelectorAll('.scroll-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    const card = scroller.querySelector('.food-card');
    const step = card ? card.offsetWidth + 24 : 380;
    scroller.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
  })
);
