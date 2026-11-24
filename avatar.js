/* TrueMirror – 3D avatar drawn as measuring rings on a <canvas>.
   No libraries: a tiny orthographic projection with a slight downward camera tilt.
   Body units are centimetres, y measured from the floor. */
(() => {
  "use strict";

  // Keypoint: [y, cx, cz, rx, rz, roll°, kind]  (cz > 0 = towards the viewer, kind "p" = prosthesis)
  const BASE = {
    torso: [
      [168.5,0,0,.5,.5],[166,0,.3,5.4,6.2],[162,0,.5,7.4,9],[157,0,.6,8,9.8],[152,0,.8,7.6,9.4],
      [148,0,1.4,6.4,8],[145,0,1.2,4.9,6.2],[141,0,-.2,4.8,5.2],[138,0,-.6,6.5,6.2],
      [136,0,-1,12.5,7.2],[133,0,-.6,16.6,9],[128.5,0,0,15.2,10.2],[123,0,1.2,15.8,11.6],
      [117,0,1,14.6,10.8],[111,0,0,13.4,9.4],[105,0,0,12.4,8.8],[99,0,.4,13.8,9.8],
      [93,0,-.4,16.2,11],[87,0,-1.6,17.4,12],[82,0,-1.2,17,11.2],[79,0,-.6,15.2,10],
    ],
    armL: [
      [137,19.6,-.8,2.2,3],[134,21.2,-.6,5.4,5.8],[128,22.4,-.4,5,5.2],[119,23.4,0,4.3,4.5],
      [109,24.4,.2,3.7,3.9],[101,25.2,.8,3.6,4],[92,25.9,1.2,3.1,3.5],[85,26.3,1.4,2.5,2.9],
      [80,26.6,1.8,2.1,4.2],[74,26.8,2,1.7,3.8],[69.5,26.8,2,.5,1],
    ],
    legL: [
      [80,8.6,-.4,8.4,9.2],[72,8.6,0,8.2,8.8],[62,8.2,.4,7.2,7.8],[54,7.8,.6,5.9,6.4],
      [48,7.6,.4,5.3,5.9],[42,7.5,-.6,5.6,6.6],[33,7.4,-.4,4.8,5.6],[22,7.2,0,3.6,4.1],
      [12,7.1,0,3,3.4],[7,7.1,2,3.2,5],[3,7.1,4,3.6,8.6],[.6,7.1,4.4,3.3,9.2],
    ],
  };
  const PARTS = ["torso", "armL", "armR", "legL", "legR"];
  const mirror = (pts) => pts.map(([y, x, z, rx, rz, r = 0, k]) => [y, -x, z, rx, rz, -r, k]);
  const clone = (o) => JSON.parse(JSON.stringify(o));

  function shapeFor(preset) {
    const s = clone(BASE);
    s.armR = mirror(s.armL);
    s.legR = mirror(s.legL);
    const T = (y) => s.torso.findIndex((p) => p[0] === y);
    const set = (arr, i, vals) => { arr[i] = vals; };
    if (preset === "gravidanza") {
      set(s.torso, T(123), [123,0,2,16.2,13.2]);
      set(s.torso, T(117), [117,0,3.4,15.4,14.6]);
      set(s.torso, T(111), [111,0,6.6,15.6,17.6]);
      set(s.torso, T(105), [105,0,8.4,16.2,19.4]);
      set(s.torso, T(99),  [99,0,6.8,16.4,17.2]);
      set(s.torso, T(93),  [93,0,1.6,16.8,12.6]);
    }
    if (preset === "arto") {
      // the avatar's left arm ends a little below the shoulder
      s.armL = s.armL.map((p, i) => {
        if (i < 2) return p;
        if (i === 2) return [127,22.4,-.4,4.6,4.8];
        if (i === 3) return [123,22.6,-.2,3.2,3.4];
        return [122,22.6,-.2,0,0];
      });
    }
    if (preset === "protesi") {
      // below-knee prosthesis on the avatar's right leg: socket, pylon, foot
      s.legR = mirror(s.legL.map((p, i) => {
        if (i < 4) return p;
        if (i === 4) return [48,7.6,.4,4.8,5.2,0,"p"];
        if (i === 5) return [42,7.5,0,1.6,1.6,0,"p"];
        if (i === 6) return [33,7.4,0,1.4,1.4,0,"p"];
        if (i === 7) return [22,7.2,0,1.4,1.4,0,"p"];
        if (i === 8) return [12,7.1,0,1.6,1.6,0,"p"];
        return [p[0], p[1], p[2], p[3], p[4], 0, "p"];
      }));
    }
    if (preset === "asimmetria") {
      // right shoulder lower, spine slightly curved, pelvis tilted the other way
      const roll = { 136: 5, 133: 5, 128.5: 3.5, 123: 2, 117: 1, 111: 0, 105: -1, 99: -2.5, 93: -3.5, 87: -4, 82: -3 };
      const drift = { 128.5: .6, 123: 1.2, 117: 1.6, 111: 1.6, 105: 1.2, 99: .6 };
      s.torso = s.torso.map((p) => {
        const q = p.slice();
        if (roll[q[0]] !== undefined) q[5] = roll[q[0]];
        if (drift[q[0]] !== undefined) q[1] = drift[q[0]];
        return q;
      });
      s.armR = s.armR.map(([y, x, z, rx, rz, r, k]) => [y - 2.6, x, z, rx, rz, r, k]);
    }
    return s;
  }

  // Default measurements (cm) per preset; sliders scale the body relative to these.
  const DEFAULTS = {
    standard:   { height: 168, chest: 92, waist: 74, hips: 98 },
    gravidanza: { height: 168, chest: 98, waist: 104, hips: 104 },
    arto:       { height: 168, chest: 92, waist: 74, hips: 98 },
    protesi:    { height: 168, chest: 92, waist: 74, hips: 98 },
    asimmetria: { height: 168, chest: 93, waist: 76, hips: 99 },
  };
  const ZONES = { chest: [123, 7], waist: [105, 6], hips: [88, 7] };

  // Ring subdivisions come from the base shape so every preset has the same ring count.
  const baseFull = shapeFor("standard");
  const SUBS = {};
  PARTS.forEach((part) => {
    const pts = baseFull[part];
    SUBS[part] = pts.slice(1).map((p, i) => Math.max(1, Math.round(Math.abs(pts[i][0] - p[0]) / 2.1)));
  });

  const catmull = (p0, p1, p2, p3, t) => {
    const t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  };

  function ringsFrom(shape) {
    const out = [];
    PARTS.forEach((part) => {
      const pts = shape[part];
      const n = pts.length;
      for (let i = 0; i < n - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
        const subs = SUBS[part][i];
        for (let s = 0; s < subs; s++) {
          const t = s / subs;
          const v = [0, 1, 2, 3, 4, 5].map((k) => {
            const val = catmull(p0[k] || 0, p1[k] || 0, p2[k] || 0, p3[k] || 0, t);
            return k === 3 || k === 4 ? Math.max(0, val) : val;
          });
          // a radius that is zero at either end stays zero (missing limb)
          const dead = (p1[3] === 0 && p2[3] === 0) || (p2[3] === 0 && t > 0.5);
          out.push({ part, y: v[0], x: v[1], z: v[2], rx: dead ? 0 : v[3], rz: dead ? 0 : v[4], roll: v[5], k: (t < 0.5 ? p1[6] : p2[6]) || "" });
        }
      }
      const l = pts[n - 1];
      out.push({ part, y: l[0], x: l[1], z: l[2], rx: l[3], rz: l[4], roll: l[5] || 0, k: l[6] || "" });
    });
    return out;
  }

  function applyMeasures(rings, preset, m) {
    const d = DEFAULTS[preset];
    const hs = m.height / d.height;
    const f = { chest: m.chest / d.chest, waist: m.waist / d.waist, hips: m.hips / d.hips };
    return rings.map((r) => {
      let sx = 1;
      if (r.part === "torso") {
        Object.entries(ZONES).forEach(([key, [yc, sig]]) => {
          const w = Math.exp(-(((r.y - yc) / sig) ** 2));
          sx *= 1 + (f[key] - 1) * w;
        });
      }
      let x = r.x;
      if (r.part.startsWith("leg")) {
        const w = Math.exp(-(((r.y - 82) / 10) ** 2));
        sx *= 1 + (f.hips - 1) * w * 0.8;
        x *= 1 + (f.hips - 1) * Math.exp(-(((r.y - 80) / 22) ** 2)) * 0.9;
      }
      if (r.part.startsWith("arm")) {
        // arms follow the chest width
        x *= 1 + (f.chest - 1) * 0.55;
      }
      return { ...r, x, y: r.y * hs, rx: r.rx * sx, rz: r.rz * sx };
    });
  }

  /* ---------------------------------------------------------------- */

  function createAvatar(canvas, opts) {
    const ctx = canvas.getContext("2d");
    const reduce = opts.reduceMotion;
    const SEG = 44;
    const COS = [], SIN = [];
    for (let i = 0; i <= SEG; i++) { COS.push(Math.cos((i / SEG) * Math.PI * 2)); SIN.push(Math.sin((i / SEG) * Math.PI * 2)); }

    const st = {
      preset: "standard",
      measures: { ...DEFAULTS.standard },
      shape: shapeFor("standard"),
      yaw: -0.35, vel: 0,
      auto: !reduce, paused: reduce, dragging: false, idleUntil: 0,
      reveal: reduce ? 1 : 0, morph: null, visible: true,
      labels: opts.labels(),
    };
    let rings = [];
    let W = 0, H = 0, DPR = 1, raf = 0, last = 0;

    function rebuild(shape) { rings = applyMeasures(ringsFrom(shape), st.preset, st.measures); }
    rebuild(st.shape);

    function resize() {
      const r = canvas.getBoundingClientRect();
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      draw();
    }

    function draw() {
      if (!W) return;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const floor = H * 0.875;
      const scale = (floor - H * 0.13) / 172;
      const cx = W * 0.43;
      const tilt = 0.26, cy = Math.cos(0.26);
      const c = Math.cos(st.yaw), s = Math.sin(st.yaw);
      const revealY = 205 - st.reveal * 210; // reveal from the head down

      const back = new Path2D(), front = new Path2D(), pBack = new Path2D(), pFront = new Path2D();
      const proj = (px, py, pz) => {
        const x = px * c + pz * s;
        const z = -px * s + pz * c;
        return [cx + x * scale, floor - py * scale * cy + z * scale * tilt, z];
      };
      const anchors = {};
      const want = { chest: 123 * st.measures.height / DEFAULTS[st.preset].height, waist: 105 * st.measures.height / DEFAULTS[st.preset].height, hips: 88 * st.measures.height / DEFAULTS[st.preset].height };

      for (const r of rings) {
        if (r.rx < 0.15 || r.y < revealY) continue;
        const tr = Math.tan((r.roll * Math.PI) / 180);
        const isP = r.k === "p";
        const bp = isP ? pBack : back, fp = isP ? pFront : front;
        let prev = null, prevFront = false;
        for (let i = 0; i <= SEG; i++) {
          const lx = r.rx * COS[i], lz = r.rz * SIN[i];
          const p = proj(r.x + lx, r.y + lx * tr, r.z + lz);
          const zr = -lx * s + lz * c;
          const isFront = zr >= 0;
          if (prev) {
            const path = (isFront && prevFront) || (isFront !== prevFront && zr > 0) ? fp : bp;
            path.moveTo(prev[0], prev[1]); path.lineTo(p[0], p[1]);
          }
          prev = p; prevFront = isFront;
        }
        // callout anchors: the right-most point of the ring nearest each measured level
        if (r.part === "torso") {
          for (const key of Object.keys(want)) {
            const dy = Math.abs(r.y - want[key]);
            if (!anchors[key] || dy < anchors[key].dy) {
              let best = null;
              for (let i = 0; i < SEG; i += 2) {
                const lx = r.rx * COS[i], lz = r.rz * SIN[i];
                const p = proj(r.x + lx, r.y + lx * tr, r.z + lz);
                if (!best || p[0] > best[0]) best = p;
              }
              anchors[key] = { dy, p: best };
            }
          }
        }
      }
      ctx.lineCap = "round";
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(61,219,180,0.2)";
      ctx.stroke(back);
      ctx.setLineDash([3, 3]); ctx.stroke(pBack); ctx.setLineDash([]);
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = "#3DDBB4";
      ctx.stroke(front);
      ctx.setLineDash([3, 2.5]); ctx.stroke(pFront); ctx.setLineDash([]);

      // scan line during the intro
      if (st.reveal < 1) {
        const y = floor - revealY * scale * cy;
        const g = ctx.createLinearGradient(0, 0, W, 0);
        g.addColorStop(0, "rgba(61,219,180,0)"); g.addColorStop(0.5, "rgba(61,219,180,0.9)"); g.addColorStop(1, "rgba(61,219,180,0)");
        ctx.fillStyle = g; ctx.fillRect(W * 0.06, y - 1, W * 0.88, 2);
        return;
      }

      // callouts
      const L = st.labels, labelX = W * 0.75;
      ctx.textBaseline = "alphabetic";
      for (const key of ["chest", "waist", "hips"]) {
        const a = anchors[key];
        if (!a) continue;
        const [ax, ay] = a.p;
        const tx = labelX - 6;
        ctx.strokeStyle = "rgba(157,176,170,0.7)"; ctx.lineWidth = 0.75; ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(ax + 5, ay); ctx.lineTo(tx, ay); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "#3DDBB4"; ctx.beginPath(); ctx.arc(ax + 1, ay, 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#9db0aa"; ctx.font = "500 12px 'DM Sans', system-ui, sans-serif";
        ctx.fillText(L[key], labelX, ay - 5);
        ctx.fillStyle = "#e7efec"; ctx.font = "600 16px 'DM Sans', system-ui, sans-serif";
        ctx.fillText(`${Math.round(st.measures[key])} cm`, labelX, ay + 13);
      }
      // height marker on the left
      const topY = floor - 168.5 * (st.measures.height / DEFAULTS[st.preset].height) * scale * cy;
      const hx = W * 0.085;
      ctx.strokeStyle = "rgba(157,176,170,0.45)"; ctx.lineWidth = 0.75;
      ctx.beginPath(); ctx.moveTo(hx, topY); ctx.lineTo(hx, floor); ctx.moveTo(hx - 4, topY); ctx.lineTo(hx + 4, topY); ctx.moveTo(hx - 4, floor); ctx.lineTo(hx + 4, floor); ctx.stroke();
      ctx.save(); ctx.translate(hx + 14, (topY + floor) / 2); ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center"; ctx.fillStyle = "#9db0aa"; ctx.font = "500 12px 'DM Sans', system-ui, sans-serif";
      ctx.fillText(`${L.height} ${Math.round(st.measures.height)} cm`, 0, 0);
      ctx.restore(); ctx.textAlign = "start";
    }

    function needsLoop() {
      return st.visible && (st.dragging || Math.abs(st.vel) > 0.0004 || st.morph || st.reveal < 1 || (st.auto && !st.paused));
    }
    function tick(now) {
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      if (st.reveal < 1) st.reveal = Math.min(1, st.reveal + dt / 1.7);
      if (!st.dragging) {
        if (Math.abs(st.vel) > 0.0004) { st.yaw += st.vel; st.vel *= 0.94; }
        else if (st.auto && !st.paused && now > st.idleUntil) st.yaw += dt * 0.32;
      }
      if (st.morph) {
        const m = st.morph, t = Math.min(1, (now - m.start) / 650);
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const mid = {};
        PARTS.forEach((part) => {
          mid[part] = m.from[part].map((a, i) => {
            const b = m.to[part][i];
            return [0, 1, 2, 3, 4, 5].map((k) => (a[k] || 0) + ((b[k] || 0) - (a[k] || 0)) * e).concat([e < 0.5 ? a[6] : b[6]]);
          });
        });
        Object.keys(st.measures).forEach((k) => { st.measures[k] = m.mFrom[k] + (m.mTo[k] - m.mFrom[k]) * e; });
        st.shape = mid;
        if (t >= 1) { st.shape = m.to; st.measures = { ...m.mTo }; st.morph = null; }
        rebuild(st.shape);
      }
      draw();
      raf = needsLoop() ? requestAnimationFrame(tick) : 0;
    }
    function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(tick); } }

    // Pointer: horizontal drag rotates, vertical drag still scrolls the page (touch-action: pan-y)
    let px = 0;
    canvas.addEventListener("pointerdown", (e) => {
      st.dragging = true; px = e.clientX; st.vel = 0;
      canvas.setPointerCapture(e.pointerId); canvas.classList.add("is-dragging"); kick();
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!st.dragging) return;
      const dx = e.clientX - px; px = e.clientX;
      st.yaw += dx * 0.011; st.vel = dx * 0.011;
      if (!raf) draw();
    });
    const end = () => {
      if (!st.dragging) return;
      st.dragging = false; st.idleUntil = performance.now() + 2500; canvas.classList.remove("is-dragging");
      if (reduce) st.vel = 0;
      kick();
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? Math.PI / 2 : Math.PI / 12;
      if (e.key === "ArrowLeft") st.yaw -= step;
      else if (e.key === "ArrowRight") st.yaw += step;
      else if (e.key === "Home") st.yaw = 0;
      else return;
      e.preventDefault(); st.vel = 0; st.idleUntil = performance.now() + 4000; draw(); opts.onChange && opts.onChange();
    });

    new ResizeObserver(resize).observe(canvas);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => { st.visible = es[0].isIntersecting; if (st.visible) kick(); }).observe(canvas);
    }
    document.addEventListener("visibilitychange", () => { st.visible = !document.hidden; if (st.visible) kick(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    resize(); kick();

    return {
      setPreset(name) {
        const to = shapeFor(name);
        const mFrom = { ...st.measures }, mTo = { ...DEFAULTS[name] };
        st.preset = name;
        if (reduce) { st.shape = to; st.measures = mTo; rebuild(to); draw(); return; }
        st.morph = { from: clone(st.shape), to, mFrom, mTo, start: performance.now() };
        kick();
      },
      setMeasure(key, value) { st.measures[key] = value; rebuild(st.shape); if (!raf) draw(); },
      getMeasures() { return { ...st.measures }; },
      getPreset() { return st.preset; },
      setPaused(p) { st.paused = p; if (!p) { st.idleUntil = 0; kick(); } },
      isPaused() { return st.paused; },
      setLabels(l) { st.labels = l; draw(); },
      facing() { // rough description of the current view for screen readers
        const a = ((st.yaw % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        return a < Math.PI / 4 || a > 7 * Math.PI / 4 ? "front" : a < 3 * Math.PI / 4 ? "side" : a < 5 * Math.PI / 4 ? "back" : "side";
      },
      DEFAULTS,
    };
  }

  window.TrueMirrorAvatar = { create: createAvatar, DEFAULTS };
})();
