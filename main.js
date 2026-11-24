/* TrueMirror – GitHub Pages script. No dependencies. */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SVG_NS = "http://www.w3.org/2000/svg";

  /* ------------------------------------------------------------------ */
  /* Language                                                            */
  /* ------------------------------------------------------------------ */

  // Italian lives in the HTML; this dictionary holds the English versions.
  const EN = {
    skip: "Skip to content",
    wordmarkLabel: "TrueMirror, back to top",
    navLabel: "Sections",
    navProblem: "The problem",
    navHow: "How it works",
    navInclusive: "Inclusivity",
    navMarket: "Market",
    navNumbers: "Numbers",
    navRoadmap: "Roadmap",
    navFaq: "FAQ",
    heroTitle: "Your avatar. Your outfits.",
    heroLead: "A 3D fitting room where you try complete outfits on your real body, even when your body isn’t standard. Before you buy, you see the price, the brand and the nearest shop.",
    heroCta: "See how it works",
    heroCta2: "See the numbers",
    heroNote: "School project for GPOI 2026/27 by team Foxtrot. The product is being designed.",
    avatarRole: "3D avatar",
    pause: "Stop rotating",
    hint: "Drag the avatar or use the arrow keys to turn it.",
    measLegend: "Your measurements",
    mHeight: "Height",
    mChest: "Chest",
    mWaist: "Waist",
    mHips: "Hips",
    presetLegend: "Choose a body",
    pStandard: "Standard",
    pPregnancy: "Pregnancy",
    pLimb: "Missing limb",
    pProsthesis: "Prosthesis",
    pAsym: "Asymmetry",
    mirrorFine: "Illustration with example measurements, not the finished product.",
    probTitle: "Every return starts with a doubt",
    probQuote: "“I don’t know if this will fit my real body, especially when my body isn’t standard.”",
    fact1Label: "spent on fashion online in Italy in 2026",
    fact1Value: "€6.6bn",
    fact2Label: "of clothes bought online are sent back",
    fact3Label: "a year: estimated cost of handling those returns",
    fact3Value: "€110–225m",
    probSource: "Sources: Netcomm – Politecnico di Milano B2c eCommerce Observatory (2026), Eurostat. The cost of returns is an estimate from the project’s market analysis.",
    howTitle: "How it works",
    howLead: "You create the avatar once. Then you reuse it every time you shop.",
    step1Title: "Create your avatar",
    step1Text: "Enter your height, shoulders, chest, waist, hips, torso, arms and legs, or start from a photo and then adjust the measurements. The photo is deleted straight away.",
    step2Title: "Try on complete outfits",
    step2Text: "Tops, trousers and accessories together, seen in 360°. Compare two sizes on the same body and get a size recommendation.",
    step3Title: "Choose where to buy",
    step3Text: "For each item you see the name, brand, price, material and fit, plus the nearest physical shop to your town or postcode.",
    inclTitle: "Made for the bodies online fitting rooms forget",
    inclLead: "Inclusive presets are the starting point, not an add-on. None of the competitors we analysed offers them.",
    v1Quote: "“Help me see if this will still fit me in two months.”",
    v1Who: "During pregnancy: presets for the first, second and third trimester.",
    v2Quote: "“Show me how it looks on me, not on a body that isn’t mine.”",
    v2Who: "With a disability or a prosthesis: presets for a missing arm or leg, prostheses and asymmetries.",
    v3Quote: "“Help me get the size right without ordering two.”",
    v3Who: "Anyone tired of returns: size comparison and recommendations based on your measurements.",
    v4Quote: "“Let me shop comfortably from home, without hassle.”",
    v4Who: "Over-65s: 14.82 million people in Italy, 25.1% of the population (ISTAT).",
    inclLink: "Try the presets in the mirror at the top of the page",
    privTitle: "Your body measurements stay yours",
    privLead: "TrueMirror handles very personal data. That’s why privacy has been a project requirement from day one.",
    priv1: "Photos used to create the avatar are deleted straight away.",
    priv2: "We only collect the measurements we need.",
    priv3: "Body data is never sold to third parties.",
    priv4: "You can delete your avatar and all your data at any time.",
    priv5: "Data is encrypted, and your profile is kept apart from your measurements.",
    priv6: "GDPR compliant, with a data protection impact assessment before launch.",
    whoTitle: "Free for people trying on clothes. A subscription for shops.",
    b2cTitle: "People",
    b2cPrice: "Free",
    b2c1: "Pregnant and post-partum women",
    b2c2: "People with motor disabilities, prostheses or adaptive needs",
    b2c3: "Online shoppers tired of returns",
    b2c4: "Anyone looking for an outfit for a specific occasion",
    b2bTitle: "Fashion shops and brands",
    b2bPrice: "€100 a month per shop",
    b2b1: "€200 one-off activation fee",
    b2b2: "A widget for the website and a Shopify plugin",
    b2b3: "Goal: 15–20% fewer returns caused by size and fit",
    b2b4: "An inclusive experience competitors don’t offer",
    mktTitle: "A space nobody has taken yet",
    mktLead: "Virtual try-on is worth $5–10 billion in 2026 and grows 16–20% a year. Yet no service combines an inclusive avatar, complete outfits and the physical shop.",
    cmpCaption: "Features compared with the main competitors (public information, October 2026)",
    cmpFeature: "Feature",
    cmpNote: "“Partly” means the feature is limited or not fully documented. Google is the strongest competitor, but trying clothes on your own photo isn’t available in Italy: the analysis estimates a 12–24 month window.",
    numTitle: "A plan that starts from €3,000",
    numLead: "The model is bootstrapped: the founders build the product, and costs grow only as client shops grow. The horizon is 5 years after the development year.",
    k1: "Initial investment",
    k2: "Capital needed, including losses in the first 3 years",
    k3: "ROI over 5 years",
    k4: "NPV at 12%",
    k5: "IRR",
    k6: "Payback period",
    k6v: "4 years 1 month",
    c1Title: "Cumulative cash flow",
    c1Sub: "Euros, from year 0 (development) to year 5. The lowest point is <span class='nb'>−€13,900</span>, at the end of year 3.",
    c2Title: "Client shops at year end",
    c2Sub: "39 shops are needed to cover operating costs: break-even comes between year 3 and year 4.",
    showTable: "Show the data as a table",
    numSource: "Source: the project’s feasibility study and profitability indicators document (v1.1.0). These are projections, not results. The IRR is recalculated from the document’s cash flows.",
    rmTitle: "Roadmap",
    rmLead: "Today: market analysis and feasibility study complete (November 2026). The next step is the MVP.",
    ph1Title: "Foundation (MVP)",
    ph1a: "Avatar from measurements, with the inclusive presets",
    ph1b: "Avatar from a photo, basic version",
    ph1c: "Complete outfits on the avatar, with price, brand and details",
    ph1d: "Nearest shop, user accounts and a responsive web interface",
    ph2Title: "Integration and validation",
    ph2a: "Widget and Shopify plugin",
    ph2b: "Automatic size recommendation",
    ph2c: "Tests with real users, especially during pregnancy and with adaptive needs",
    ph3Title: "Expansion",
    ph3a: "Better 3D quality and fabric physics",
    ph3b: "Analytics dashboard for shops",
    ph3c: "More brands and larger catalogues",
    ph4Title: "Scale",
    ph4a: "Public APIs and more e-commerce integrations",
    ph4b: "More countries and languages",
    ph4c: "A native mobile app, if needed",
    docTitle: "Read the project documents",
    d1: "Goals, features, architecture and roadmap",
    d2n: "Market analysis",
    d2: "PESTEL, segments, competitors, Porter and SWOT",
    d3n: "Feasibility study",
    d3: "Technical, economic, organisational and risk analysis",
    d4n: "Profitability indicators",
    d4: "ROI, payback, NPV and IRR over 5 years",
    d5n: "Requirements questionnaire",
    d5: "The questions for end users",
    d6: "Every version of the project",
    footTag: "Your avatar. Your outfits. Time saved, confident choices.",
    footText: "TrueMirror is a school project for Project Management and Business Organisation (GPOI), 2026/27, by team Foxtrot.",
    footRepo: "Site code on GitHub",
    faqTitle: "Questions",
    q1: "Do I have to pay to use TrueMirror?",
    a1: "No. It’s free for people trying on clothes. Shops that add TrueMirror to their website pay a monthly subscription.",
    q2: "What happens to my photos?",
    a2: "They’re only used to create the avatar and are deleted straight away. Only your measurements are kept, and you can delete them whenever you like.",
    q3: "Do I need to install an app?",
    a3: "No. TrueMirror works in the browser, on your phone too. A native app will come only if it’s needed.",
    q4: "My body isn’t “standard”. Will it work for me?",
    a4: "That’s the starting point: presets for pregnancy, missing limbs, prostheses and asymmetries, plus every measurement you can adjust by hand.",
    q5: "When will it be available?",
    a5: "The project has finished its market analysis and feasibility study. The next step is a prototype, to be tested with real users and the first shops.",
  };

  // Strings used only by the script.
  const T = {
    it: {
      title: "TrueMirror – Il tuo avatar. I tuoi outfit.",
      langBtn: "EN", langBtnLang: "en", langLabel: "Switch to English",
      chest: "Petto", waist: "Vita", hips: "Fianchi", height: "Altezza", cm: "cm",
      pause: "Ferma la rotazione", play: "Fai ruotare",
      year: "Anno", shops: "negozi", breakEven: "Pareggio: 39",
      cashCol: "Flusso cumulato (€)", shopsCol: "Negozi clienti",
      yes: "Sì", no: "No",
      notes: {
        standard: "Un corpo di riferimento, costruito con le misure inserite.",
        gravidanza: "Terzo trimestre: la vita passa da 74 a 104 cm. L’avatar segue la pancia, non una taglia standard.",
        arto: "Un braccio assente: i capi si provano sul corpo vero, senza un arto aggiunto.",
        protesi: "Protesi sotto il ginocchio, segnata in tratteggio: vedi come cadono pantaloni e scarpe.",
        asimmetria: "Spalle e fianchi non allineati: il confronto delle taglie tiene conto dei due lati.",
      },
    },
    en: {
      title: "TrueMirror – Your avatar. Your outfits.",
      langBtn: "IT", langBtnLang: "it", langLabel: "Passa all’italiano",
      chest: "Chest", waist: "Waist", hips: "Hips", height: "Height", cm: "cm",
      pause: "Stop rotating", play: "Start rotating",
      year: "Year", shops: "shops", breakEven: "Break-even: 39",
      cashCol: "Cumulative cash flow (€)", shopsCol: "Client shops",
      yes: "Yes", no: "No",
      notes: {
        standard: "A reference body, built from the measurements entered.",
        gravidanza: "Third trimester: the waist goes from 74 to 104 cm. The avatar follows the bump, not a standard size.",
        arto: "A missing arm: clothes are tried on the real body, with no limb added.",
        protesi: "A below-knee prosthesis, shown dashed: see how trousers and shoes fall.",
        asimmetria: "Shoulders and hips that aren’t level: size comparison takes both sides into account.",
      },
    },
  };

  let lang = "it";
  const originals = new Map();
  const originalAttrs = new Map();

  function storeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function storeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* storage unavailable */ } }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      const key = el.dataset.i18n;
      el.innerHTML = lang === "en" && EN[key] ? EN[key] : originals.get(el);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const [attr, key] = el.dataset.i18nAttr.split(":");
      if (!originalAttrs.has(el)) originalAttrs.set(el, el.getAttribute(attr));
      el.setAttribute(attr, lang === "en" && EN[key] ? EN[key] : originalAttrs.get(el));
    });
    const t = T[lang];
    document.title = t.title;
    const btn = document.getElementById("lang-toggle");
    btn.textContent = t.langBtn;
    btn.setAttribute("lang", t.langBtnLang);
    btn.setAttribute("aria-label", t.langLabel);

    setKpis();
    renderCompare();
    renderCharts();
    updateCallouts();
    updateNote();
  }

  // Formats with grouping even for 4-digit numbers (it-IT would print 3000, the docs use 3.000).
  const nf = () => ({
    format(v) {
      const [int, dec] = (Math.round(v * 10) / 10).toString().split(".");
      const g = lang === "en" ? "," : ".", d = lang === "en" ? "." : ",";
      return int.replace(/\B(?=(\d{3})+(?!\d))/g, g) + (dec ? d + dec : "");
    },
  });
  function euro(v, sign = false) {
    const s = nf().format(Math.abs(v));
    const pre = v < 0 ? "−" : sign && v > 0 ? "+" : "";
    return lang === "en" ? `${pre}€${s}` : `${pre}${s} €`;
  }
  function num(v) { return (v < 0 ? "−" : "") + nf().format(Math.abs(v)); }

  function setKpis() {
    document.getElementById("k1v").textContent = euro(3000);
    document.getElementById("k2v").textContent = euro(13900);
    document.getElementById("k3v").textContent = nf().format(205.8) + "%";
    document.getElementById("k4v").textContent = euro(12717, true);
    document.getElementById("k5v").textContent = "≈ 36%";
  }

  /* ------------------------------------------------------------------ */
  /* The mirror: 3D avatar (assets/avatar.js)                            */
  /* ------------------------------------------------------------------ */
  const canvas = document.getElementById("avatar");
  const avatar = window.TrueMirrorAvatar && canvas
    ? window.TrueMirrorAvatar.create(canvas, {
        reduceMotion,
        labels: () => avatarLabels(),
        onChange: () => describeAvatar(),
      })
    : null;
  function avatarLabels() {
    const t = T[lang];
    return { chest: t.chest, waist: t.waist, hips: t.hips, height: t.height };
  }
  const PRESET_NAMES = {
    it: { standard: "standard", gravidanza: "in gravidanza", arto: "con un braccio assente", protesi: "con una protesi alla gamba", asimmetria: "con spalle e fianchi asimmetrici" },
    en: { standard: "standard", gravidanza: "pregnant", arto: "with a missing arm", protesi: "with a leg prosthesis", asimmetria: "with asymmetric shoulders and hips" },
  };
  function describeAvatar() {
    if (!avatar) return;
    const m = avatar.getMeasures(), t = T[lang], r = Math.round;
    const view = { it: { front: "di fronte", side: "di lato", back: "di spalle" }, en: { front: "from the front", side: "from the side", back: "from behind" } }[lang][avatar.facing()];
    const who = PRESET_NAMES[lang][avatar.getPreset()];
    canvas.setAttribute("aria-label", lang === "en"
      ? `3D avatar, ${who} body, seen ${view}. Height ${r(m.height)} cm, chest ${r(m.chest)} cm, waist ${r(m.waist)} cm, hips ${r(m.hips)} cm.`
      : `Avatar 3D, corpo ${who}, visto ${view}. Altezza ${r(m.height)} cm, petto ${r(m.chest)} cm, vita ${r(m.waist)} cm, fianchi ${r(m.hips)} cm.`);
  }
  function syncSliders() {
    if (!avatar) return;
    const m = avatar.getMeasures();
    document.querySelectorAll(".measures input[type=range]").forEach((inp) => {
      const v = Math.round(m[inp.dataset.key]);
      inp.value = v;
      document.getElementById(`o-${inp.dataset.key}`).textContent = `${v} cm`;
    });
  }
  function updateNote() {
    const el = document.getElementById("preset-note");
    if (el && avatar) el.textContent = T[lang].notes[avatar.getPreset()];
  }
  function updatePauseLabel() {
    const btn = document.getElementById("avatar-pause");
    if (!btn || !avatar) return;
    const paused = avatar.isPaused();
    btn.setAttribute("aria-pressed", String(paused));
    btn.classList.toggle("is-paused", paused);
    document.getElementById("avatar-pause-label").textContent = paused ? T[lang].play : T[lang].pause;
  }
  function updateCallouts() {
    if (!avatar) return;
    avatar.setLabels(avatarLabels());
    updatePauseLabel();
    describeAvatar();
  }

  /* ------------------------------------------------------------------ */
  /* Comparison table                                                    */
  /* ------------------------------------------------------------------ */
  // [kind, it, en] where kind is y (yes), p (partly), n (no)
  const Y = ["y", "Sì", "Yes"], N = ["n", "No", "No"];
  const P = (it, en) => ["p", it, en];
  const YS = (it, en) => ["y", it, en];
  const COMPARE = [
    [["Avatar da misure", "Avatar from measurements"], [Y, N, YS("Sì (altezza, peso, sesso)", "Yes (height, weight, sex)"), Y, P("In parte", "Partly"), N]],
    [["Avatar da foto", "Avatar from a photo"], [Y, YS("Sì (selfie)", "Yes (selfie)"), N, YS("Sì (2 foto)", "Yes (2 photos)"), N, Y]],
    [["Preset gravidanza", "Pregnancy presets"], [Y, N, N, N, N, N]],
    [["Preset per assenza di arti, protesi, asimmetrie", "Presets for missing limbs, prostheses, asymmetries"], [Y, N, N, N, N, N]],
    [["Outfit completi", "Complete outfits"], [Y, ["n", "No (un capo alla volta)", "No (one item at a time)"], N, P("In parte", "Partly"), N, P("In parte", "Partly")]],
    [["Vista a 360°", "360° view"], [Y, N, P("In parte", "Partly"), Y, N, N]],
    [["Confronto taglie", "Size comparison"], [Y, N, YS("Sì (mappa di calore)", "Yes (heat map)"), Y, Y, N]],
    [["Negozio fisico più vicino", "Nearest physical shop"], [Y, P("In parte", "Partly"), N, N, N, N]],
    [["Uso su più marchi", "Works across brands"], [P("Obiettivo futuro", "Future goal"), P("Solo dentro Google", "Only within Google"), N, N, YS("Sì (rete True Fit)", "Yes (True Fit network)"), N]],
  ];
  function renderCompare() {
    const body = document.getElementById("cmp-body");
    if (!body) return;
    const li = lang === "en" ? 2 : 1;
    body.textContent = "";
    COMPARE.forEach(([label, cells]) => {
      const tr = document.createElement("tr");
      const th = document.createElement("th"); th.scope = "row"; th.textContent = label[li - 1]; tr.appendChild(th);
      cells.forEach((c, i) => {
        const td = document.createElement("td");
        if (i === 0) td.className = "us";
        const span = document.createElement("span");
        span.className = `v v-${c[0] === "y" ? "yes" : c[0] === "p" ? "part" : "no"}`;
        span.textContent = c[li];
        td.appendChild(span); tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Charts (hand-made SVG, hover + keyboard tooltips, table view)       */
  /* ------------------------------------------------------------------ */
  const CASH = [-3000, -8400, -13100, -13900, -3200, 28600];   // years 0–5
  const SHOPS = [5, 15, 35, 60, 95];                            // years 1–5
  const BREAK_EVEN = 39;
  const tooltip = document.getElementById("tooltip");

  function el(name, attrs = {}, parent) {
    const n = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (parent) parent.appendChild(n);
    return n;
  }
  function showTip(html, x, y) {
    tooltip.innerHTML = html;
    tooltip.hidden = false;
    const r = tooltip.getBoundingClientRect();
    let left = x + 14, top = y - r.height - 12;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
    if (top < 8) top = y + 16;
    tooltip.style.left = `${left}px`; tooltip.style.top = `${top}px`;
  }
  function hideTip() { tooltip.hidden = true; }
  function bindHit(hit, html, onEnter, onLeave) {
    hit.setAttribute("tabindex", "0");
    hit.setAttribute("role", "img");
    hit.setAttribute("aria-label", html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    hit.addEventListener("pointermove", (e) => { onEnter(); showTip(html, e.clientX, e.clientY); });
    hit.addEventListener("pointerleave", () => { onLeave(); hideTip(); });
    hit.addEventListener("focus", () => { onEnter(); const r = hit.getBoundingClientRect(); showTip(html, r.left + r.width / 2, r.top + 20); });
    hit.addEventListener("blur", () => { onLeave(); hideTip(); });
  }

  function renderCash() {
    const fig = document.getElementById("chart-cash");
    const plot = fig.querySelector(".chart-plot");
    plot.textContent = "";
    const W = 520, H = 300, m = { t: 20, r: 16, b: 34, l: 56 };
    const svgc = el("svg", { viewBox: `0 0 ${W} ${H}`, "aria-hidden": "false" }, plot);
    const min = -16000, max = 32000, ticks = [-16000, -8000, 0, 8000, 16000, 24000, 32000];
    const x = (i) => m.l + (i / (CASH.length - 1)) * (W - m.l - m.r);
    const y = (v) => m.t + ((max - v) / (max - min)) * (H - m.t - m.b);
    ticks.forEach((t) => {
      el("line", { x1: m.l, x2: W - m.r, y1: y(t), y2: y(t), class: t === 0 ? "zero" : "grid" }, svgc);
      el("text", { x: m.l - 10, y: y(t) + 4, "text-anchor": "end", class: "axis-label" }, svgc).textContent = num(t);
    });
    CASH.forEach((_, i) => {
      el("text", { x: x(i), y: H - 10, "text-anchor": "middle", class: "axis-label" }, svgc).textContent = `${T[lang].year} ${i}`;
    });
    // shade the part below zero
    const clipId = "neg-clip";
    const defs = el("defs", {}, svgc);
    const cp = el("clipPath", { id: clipId }, defs);
    el("rect", { x: 0, y: y(0), width: W, height: H }, cp);
    const linePts = CASH.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
    el("path", { d: `M${x(0)},${y(0)}L${linePts.join("L")}L${x(CASH.length - 1)},${y(0)}Z`, class: "area-neg", "clip-path": `url(#${clipId})` }, svgc);
    el("path", { d: `M${linePts.join("L")}`, class: "line" }, svgc);
    const guide = el("line", { y1: m.t, y2: H - m.b, class: "hover-guide", opacity: 0 }, svgc);
    CASH.forEach((v, i) => el("circle", { cx: x(i), cy: y(v), r: 4.5, class: "dot" }, svgc));
    // selective labels: lowest point and end point
    el("text", { x: x(3) + 10, y: y(CASH[3]) - 10, "text-anchor": "start", class: "value-label" }, svgc).textContent = euro(CASH[3]);
    el("text", { x: x(5) - 8, y: y(CASH[5]) - 12, "text-anchor": "end", class: "value-label" }, svgc).textContent = euro(CASH[5], true);
    // hit areas wider than the marks
    const band = (W - m.l - m.r) / (CASH.length - 1);
    CASH.forEach((v, i) => {
      const hit = el("rect", { x: x(i) - band / 2, y: m.t, width: band, height: H - m.t - m.b, class: "hit" }, svgc);
      bindHit(hit, `<strong>${T[lang].year} ${i}</strong>${euro(v, true)}`,
        () => { guide.setAttribute("x1", x(i)); guide.setAttribute("x2", x(i)); guide.setAttribute("opacity", 1); },
        () => guide.setAttribute("opacity", 0));
    });
    // table view
    fig.querySelector(".chart-table-body").innerHTML =
      `<table><thead><tr><th>${T[lang].year}</th><th>${T[lang].cashCol}</th></tr></thead><tbody>` +
      CASH.map((v, i) => `<tr><td>${i}</td><td>${euro(v, true)}</td></tr>`).join("") + "</tbody></table>";
  }

  function renderShops() {
    const fig = document.getElementById("chart-shops");
    const plot = fig.querySelector(".chart-plot");
    plot.textContent = "";
    const W = 520, H = 300, m = { t: 20, r: 16, b: 34, l: 40 };
    const svgc = el("svg", { viewBox: `0 0 ${W} ${H}` }, plot);
    const max = 100, ticks = [0, 25, 50, 75, 100];
    const y = (v) => m.t + ((max - v) / max) * (H - m.t - m.b);
    const bandW = (W - m.l - m.r) / SHOPS.length;
    const barW = Math.min(44, bandW * 0.5);
    ticks.forEach((t) => {
      el("line", { x1: m.l, x2: W - m.r, y1: y(t), y2: y(t), class: t === 0 ? "zero" : "grid" }, svgc);
      el("text", { x: m.l - 10, y: y(t) + 4, "text-anchor": "end", class: "axis-label" }, svgc).textContent = num(t);
    });
    SHOPS.forEach((v, i) => {
      const cx = m.l + bandW * (i + 0.5);
      const x0 = cx - barW / 2, top = y(v), bottom = y(0), r = 4;
      el("path", {
        d: `M${x0},${bottom}V${top + r}Q${x0},${top} ${x0 + r},${top}H${x0 + barW - r}Q${x0 + barW},${top} ${x0 + barW},${top + r}V${bottom}Z`,
        class: "bar",
      }, svgc);
      el("text", { x: cx, y: top - 8, "text-anchor": "middle", class: "value-label" }, svgc).textContent = num(v);
      el("text", { x: cx, y: H - 10, "text-anchor": "middle", class: "axis-label" }, svgc).textContent = `${T[lang].year} ${i + 1}`;
      const hit = el("rect", { x: cx - bandW / 2, y: m.t, width: bandW, height: H - m.t - m.b, class: "hit" }, svgc);
      bindHit(hit, `<strong>${T[lang].year} ${i + 1}</strong>${num(v)} ${T[lang].shops}`, () => {}, () => {});
    });
    el("line", { x1: m.l, x2: W - m.r, y1: y(BREAK_EVEN), y2: y(BREAK_EVEN), class: "ref" }, svgc);
    el("text", { x: m.l + 4, y: y(BREAK_EVEN) - 8, class: "ref-label" }, svgc).textContent = T[lang].breakEven;
    fig.querySelector(".chart-table-body").innerHTML =
      `<table><thead><tr><th>${T[lang].year}</th><th>${T[lang].shopsCol}</th></tr></thead><tbody>` +
      SHOPS.map((v, i) => `<tr><td>${i + 1}</td><td>${num(v)}</td></tr>`).join("") + "</tbody></table>";
  }

  function renderCharts() { renderCash(); renderShops(); }

  /* ------------------------------------------------------------------ */
  /* Start                                                               */
  /* ------------------------------------------------------------------ */
  const params = new URLSearchParams(location.search);
  const startLang = params.get("lang") === "en" || params.get("lang") === "it"
    ? params.get("lang")
    : storeGet("tm-lang") || ((navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en");
  applyLang(startLang);

  document.getElementById("lang-toggle").addEventListener("click", () => {
    const next = lang === "it" ? "en" : "it";
    storeSet("tm-lang", next);
    applyLang(next);
  });
  if (avatar) {
    document.getElementById("preset-list").addEventListener("change", (e) => {
      if (e.target.name !== "preset") return;
      avatar.setPreset(e.target.value);
      updateNote();
      // sliders follow the preset's default measurements once the shape has changed
      const target = avatar.DEFAULTS[e.target.value];
      document.querySelectorAll(".measures input[type=range]").forEach((inp) => {
        inp.value = target[inp.dataset.key];
        document.getElementById(`o-${inp.dataset.key}`).textContent = `${target[inp.dataset.key]} cm`;
      });
      setTimeout(describeAvatar, 700);
    });
    document.querySelectorAll(".measures input[type=range]").forEach((inp) => {
      inp.addEventListener("input", () => {
        avatar.setMeasure(inp.dataset.key, Number(inp.value));
        document.getElementById(`o-${inp.dataset.key}`).textContent = `${inp.value} cm`;
      });
      inp.addEventListener("change", describeAvatar);
    });
    document.getElementById("avatar-pause").addEventListener("click", () => {
      avatar.setPaused(!avatar.isPaused());
      updatePauseLabel();
    });
    syncSliders();
    updatePauseLabel();
  } else {
    document.getElementById("avatar-pause").hidden = true;
  }
  window.addEventListener("scroll", hideTip, { passive: true });

})();
