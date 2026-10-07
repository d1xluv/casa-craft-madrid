/**
 * Casa animada en 3D (canvas 2D, sin librerías ni recursos externos).
 * Adaptado de la maqueta "Casa animada" de Reformas HZ: tres vistas
 * (fachada, cocina y baño) que se construyen y pintan en bucle.
 *
 * createHouseScene() devuelve controles para manejarla desde React.
 */

type V = number[];
type Face = { p: number[][]; z: number; color: string; alpha: number };

export const HOUSE_SCENES = 3;

export type HouseSceneState = { scene: number; playing: boolean };

export function createHouseScene(canvas: HTMLCanvasElement, onState: (s: HouseSceneState) => void) {
  const ctx = canvas.getContext("2d")!;
  const wrap = canvas.parentElement!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  let playing = !reduced.matches;
  let visible = true;
  let scene = 0;
  let elapsed = reduced.matches ? 3.8 : 0;
  let last = 0;
  let W = 600;
  let H = 540;
  let faces: Face[] = [];
  let yaw = 0.68;
  let pitch = 0.55;
  let px = 0;
  let py = 0;
  let previous = -1;
  let transition = 1;
  let mapper: ((v: V) => V) | null = null;
  let raf = 0;
  const duration = 4.5;
  const YAW = [0.68, 0.2, 0.75];
  const PITCH = [0.5, 0.66, 0.61];

  const clamp = (x: number) => Math.max(0, Math.min(1, x));
  const ease = (x: number) => {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  };
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const blend = (a: V, b: V, t: number) => {
    t = clamp(t);
    return a.map((v, i) => Math.round(lerp(v, b[i], t)));
  };
  const paint = [249, 252, 255];
  const raw = [174, 186, 199];
  const green = [35, 103, 182];
  const wood = [59, 119, 185];
  const stone = [233, 241, 249];

  const emit = () => onState({ scene, playing });

  function project(v: V) {
    const c = Math.cos(yaw);
    const s = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const x = v[0] * c - v[2] * s;
    const z = v[0] * s + v[2] * c;
    // Escala: algo más pequeña en pantallas anchas para dejar aire al texto.
    const k = Math.min(W / 6.9, H / 5.9) * (W < 700 ? 0.95 : 0.7);
    return [W * 0.5 + x * k, H * 0.6 + (-v[1] * cp + z * sp) * k, v[1] * sp + z * cp];
  }
  function face(v: V[], color: V, shade = 1, alpha = 1) {
    const p = v.map((q) => project(mapper ? mapper(q) : q));
    faces.push({
      p,
      z: p.reduce((s, a) => s + a[2], 0) / p.length,
      color: `rgb(${color.map((c) => Math.min(255, Math.round(c * shade))).join(",")})`,
      alpha,
    });
  }
  function box(
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    color: V,
    alpha = 1,
  ) {
    if (h <= 0 || w <= 0 || d <= 0) return;
    const X = x + w;
    const Y = y + h;
    const Z = z + d;
    face(
      [
        [x, Y, z],
        [X, Y, z],
        [X, Y, Z],
        [x, Y, Z],
      ],
      color,
      1.06,
      alpha,
    );
    face(
      [
        [x, y, Z],
        [X, y, Z],
        [X, Y, Z],
        [x, Y, Z],
      ],
      color,
      0.92,
      alpha,
    );
    face(
      [
        [X, y, z],
        [X, y, Z],
        [X, Y, Z],
        [X, Y, z],
      ],
      color,
      0.83,
      alpha,
    );
    face(
      [
        [x, y, z],
        [x, Y, z],
        [x, Y, Z],
        [x, y, Z],
      ],
      color,
      0.9,
      alpha,
    );
    face(
      [
        [x, y, z],
        [X, y, z],
        [X, Y, z],
        [x, Y, z],
      ],
      color,
      0.98,
      alpha,
    );
  }
  function cylinder(x: number, y: number, z: number, r: number, h: number, color: V) {
    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI) / 12;
      const b = ((i + 1) * Math.PI) / 12;
      face(
        [
          [x + Math.cos(a) * r, y, z + Math.sin(a) * r],
          [x + Math.cos(b) * r, y, z + Math.sin(b) * r],
          [x + Math.cos(b) * r, y + h, z + Math.sin(b) * r],
          [x + Math.cos(a) * r, y + h, z + Math.sin(a) * r],
        ],
        color,
        0.83 + 0.13 * Math.sin(a),
      );
    }
    face(
      Array.from({ length: 24 }, (_, i) => [
        x + Math.cos((i * Math.PI) / 12) * r,
        y + h,
        z + Math.sin((i * Math.PI) / 12) * r,
      ]),
      color,
      1.05,
    );
  }
  function plant(x: number, z: number, scale = 1) {
    cylinder(x, 0, z, 0.18 * scale, 0.35 * scale, [220, 232, 244]);
    box(x - 0.025, 0.3 * scale, z - 0.025, 0.05, 0.6 * scale, 0.05, [100, 104, 72]);
    for (let i = 0; i < 6; i++) {
      const a = i * 2.4;
      box(
        x + Math.sin(a) * 0.15 * scale - 0.11 * scale,
        (0.5 + i * 0.06) * scale,
        z + Math.cos(a) * 0.14 * scale - 0.08 * scale,
        0.22 * scale,
        0.15 * scale,
        0.16 * scale,
        [89 + i * 3, 116 + i * 2, 77],
      );
    }
  }
  function roller(x: number, y: number, z: number) {
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      const b = ((i + 1) * Math.PI) / 8;
      face(
        [
          [x, y + 0.075 + Math.sin(a) * 0.085, z + 0.08 + Math.cos(a) * 0.085],
          [x + 0.45, y + 0.075 + Math.sin(a) * 0.085, z + 0.08 + Math.cos(a) * 0.085],
          [x + 0.45, y + 0.075 + Math.sin(b) * 0.085, z + 0.08 + Math.cos(b) * 0.085],
          [x, y + 0.075 + Math.sin(b) * 0.085, z + 0.08 + Math.cos(b) * 0.085],
        ],
        [239, 246, 250],
        0.9 + 0.08 * Math.cos(a),
      );
    }
    box(x + 0.45, y + 0.06, z + 0.06, 0.065, 0.027, 0.027, [151, 173, 194]);
    box(x + 0.49, y - 0.18, z + 0.06, 0.027, 0.25, 0.027, [151, 173, 194]);
    box(x + 0.22, y - 0.2, z + 0.06, 0.29, 0.027, 0.027, [151, 173, 194]);
    box(x + 0.22, y - 0.36, z + 0.06, 0.027, 0.17, 0.027, [151, 173, 194]);
    box(x + 0.19, y - 0.66, z + 0.035, 0.085, 0.33, 0.075, [30, 95, 172]);
    for (let j = 0; j < 4; j++)
      box(x + 0.185, y - 0.62 + j * 0.055, z + 0.11, 0.095, 0.016, 0.012, [53, 125, 204]);
  }
  function floor(t: number, type: number) {
    box(-2, -0.25, -1.65, 4, 0.25, 3.3, [178, 190, 203]);
    const cols = 8;
    const rows = 6;
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        const n = (i * rows + j) / (cols * rows);
        const q = ease((t - n * 0.42) * 5);
        const lift = (1 - q) * 0.38;
        const color =
          type === 1
            ? i % 2
              ? [223, 233, 244]
              : [207, 222, 238]
            : (i + j) % 2
              ? [244, 248, 253]
              : [207, 225, 243];
        box(
          -2 + i * 0.5,
          lift,
          -1.65 + j * 0.55,
          0.492,
          0.04,
          0.542,
          blend(raw, color, q),
          0.35 + 0.65 * q,
        );
        if (q > 0.9) {
          const x = -1.96 + i * 0.5;
          const z = -1.6 + j * 0.55;
          face(
            [
              [x, lift + 0.041, z],
              [x + 0.018, lift + 0.041, z],
              [x + 0.34, lift + 0.041, z + 0.37],
              [x + 0.33, lift + 0.041, z + 0.38],
            ],
            [176, 195, 213],
            1,
            0.22,
          );
        }
      }
  }
  // Yeso desgastado determinista, recortado a la parte aún sin pintar.
  function wornBand(x: number, y: number, z: number, w: number, h: number, progress: number) {
    const edge = x + w * clamp(progress);
    box(x, y, z, w, h, 0.012, [143, 139, 128]);
    for (let i = 0; i < 24; i++) {
      const left = x + (((i * 37) % 97) / 100) * w;
      const right = Math.min(x + w, left + 0.045 + (i % 4) * 0.024);
      const start = Math.max(left, edge);
      if (right <= start) continue;
      const bottom = y + 0.025 + ((i * 13) % 17) / 100;
      box(
        start,
        bottom,
        z + 0.018,
        right - start,
        Math.min(0.045 + (i % 3) * 0.025, y + h - bottom),
        0.006,
        i % 2 ? [108, 111, 109] : [184, 174, 153],
      );
    }
    for (let i = 0; i < 5; i++)
      for (let j = 0; j < 5; j++) {
        const left = x + 0.18 + (i * w) / 5 + (j % 2) * 0.016;
        const right = left + 0.013;
        const start = Math.max(left, edge);
        if (right > start && right < x + w)
          box(start, y + 0.018 + j * 0.039, z + 0.027, right - start, 0.043, 0.004, [91, 98, 101]);
      }
    if (edge > x) box(x, y, z + 0.04, edge - x, h, 0.012, paint);
  }
  function wallPaint(t: number) {
    box(-2, 0, -1.7, 4, 2.38, 0.12, paint);
    box(-2.1, 0, -1.7, 0.12, 2.85, 3.4, paint);
    box(-2, 2.38, -1.7, 4, 0.47, 0.12, raw);
    const width = 4 * clamp(t);
    wornBand(-2, 2.38, -1.56, 4, 0.47, t);
    box(-2, 0, -1.54, 4, 0.09, 0.05, [250, 253, 255]);
    if (t > 0 && t < 1) roller(-2 + Math.max(0, width - 0.45), 2.54, -1.48);
    mapper = (v) => [-1.965 + v[2], v[1], v[0]];
    for (let row = 0; row < 8; row++)
      wornBand(-1.48, 0.1 + row * 0.33, 0, 3.02, 0.33, clamp(t * 8 - row));
    if (t > 0 && t < 1) {
      const row = Math.min(7, Math.floor(t * 8));
      const fraction = t * 8 - row;
      roller(-1.48 + Math.max(0, 3.02 * fraction - 0.45), 0.18 + row * 0.33, 0.07);
    }
    mapper = null;
  }
  function exterior(t: number) {
    const progress = clamp(t / 6);
    const blue = [32, 99, 183];
    const frame = [43, 67, 93];
    const glass = [144, 192, 226];
    box(-2.17, -0.24, -1.7, 4.34, 0.2, 3.4, stone);
    box(-1.85, 0, -1.35, 3.7, 2.32, 0.08, blend(raw, paint, ease(progress * 1.8)));
    box(-1.85, 0, -1.35, 0.08, 2.32, 2.7, paint);
    const sideColor = blend(raw, paint, ease(progress * 1.8));
    box(1.78, 0, -1.35, 0.07, 0.55, 2.7, sideColor);
    box(1.78, 2, -1.35, 0.07, 0.32, 2.7, sideColor);
    box(1.78, 0.55, -1.35, 0.07, 1.45, 0.36, sideColor);
    box(1.78, 0.55, 0.36, 0.07, 1.45, 0.99, sideColor);
    box(-1.85, 0, 1.352, 3.7, 0.18, 0.025, paint);
    wornBand(-1.85, 2.01, 1.382, 2.49, 0.27, progress);
    box(0.64, 2.01, 1.352, 1.21, 0.31, 0.025, paint);
    box(-1.85, 0.18, 1.352, 0.22, 1.83, 0.025, blend(raw, paint, ease(progress * 2)));
    box(0.53, 0.18, 1.352, 0.34, 1.83, 0.025, blend(raw, paint, ease(progress * 2 - 0.8)));
    box(-2.02, 2.32, -1.51, 4.04, 0.16, 3.04, paint);
    box(-1.87, 2.49, -1.36, 3.74, 0.04, 2.74, [206, 218, 231]);
    box(-2.02, 2.29, 1.43, 4.04, 0.035, 0.09, blue);
    box(0.87, 0, 0.8, 0.98, 2.77, 0.57, blue);
    box(0.82, 2.77, 0.75, 1.08, 0.09, 0.67, paint);
    box(1.07, 0.03, 1.39, 0.61, 2.06, 0.055, frame);
    box(1.12, 0.12, 1.45, 0.1, 1.85, 0.018, [106, 166, 213]);
    box(1.56, 0.89, 1.46, 0.028, 0.36, 0.035, [223, 234, 244]);
    box(0.64, 2.13, 1.4, 1.38, 0.1, 0.68, paint);
    box(-1.63, 0.18, 1.39, 0.06, 1.83, 0.07, frame);
    box(0.47, 0.18, 1.39, 0.06, 1.83, 0.07, frame);
    box(-1.63, 0.18, 1.39, 2.16, 0.06, 0.07, frame);
    box(-1.63, 1.95, 1.39, 2.16, 0.06, 0.07, frame);
    for (let j = 0; j < 14; j++)
      box(
        -1.57,
        0.24 + (j * 1.71) / 14,
        1.47,
        2.04,
        1.71 / 14,
        0.025,
        blend([102, 150, 189], [208, 230, 244], j / 14),
      );
    box(-1.6, 0.18, 1.53, 2.1, 0.045, 0.045, [184, 205, 224]);
    for (const x of [-0.91, -0.22]) box(x, 0.23, 1.51, 0.035, 1.73, 0.02, frame);
    face(
      [
        [-1.48, 0.32, 1.504],
        [-1.28, 0.32, 1.504],
        [-0.62, 1.86, 1.504],
        [-0.82, 1.86, 1.504],
      ],
      [220, 239, 253],
      1,
      0.5,
    );
    box(1.87, 0.55, -0.99, 0.04, 1.45, 1.35, frame);
    box(1.92, 0.61, -0.93, 0.012, 1.33, 1.23, glass);
    box(1.94, 0.6, -0.33, 0.02, 1.34, 0.035, frame);
    box(0.68, -0.05, 1.42, 1.35, 0.1, 0.61, stone);
    box(0.75, -0.17, 1.96, 1.2, 0.09, 0.3, stone);
    plant(-2.07, 1.22, 0.75);
    plant(2.08, 0.8, 0.85);
    for (let i = 0; i < 6; i++)
      box(-1.9 + i * 0.43, -0.2, 1.65, 0.4, 0.035, 0.55, [213 + (i % 2) * 8, 226, 239]);
    for (let j = 0; j < 8; j++)
      box(0.89, 0.15 + j * 0.28, 1.386, 0.14, 0.012, 0.015, [23, 79, 150]);
    box(1.73, 1.73, 1.41, 0.085, 0.23, 0.07, [46, 64, 85]);
    box(1.742, 1.74, 1.485, 0.06, 0.2, 0.006, [245, 237, 206]);
    cylinder(0.35, 0, 1.83, 0.16, 0.24, blue);
    cylinder(0.35, 0.24, 1.83, 0.15, 0.025, paint);
    if (t > 0 && t < 6) roller(-1.85 + Math.max(0, 2.49 * progress - 0.45), 2.08, 1.49);
  }
  function kitchen(t: number) {
    const f = ease((t - 1) / 3);
    floor(t / 4, 1);
    wallPaint((t - 4) / 3);
    for (let i = 0; i < 5; i++) {
      const q = ease((t - 1.4 - i * 0.25) / 1.2);
      const y = (1 - q) * 1.2;
      box(-1.86 + i * 0.74, y, -1.52, 0.7, 0.95, 0.64, blend(raw, green, q), q);
      box(-1.8 + i * 0.74, y + 0.65, -0.86, 0.2, 0.025, 0.035, [189, 208, 226], q);
      box(-1.87 + i * 0.74, y + 0.96, -1.55, 0.74, 0.09, 0.73, stone, q);
    }
    box(-1.78, 0.99, -1.43, 0.64, 0.06, 0.51, [35, 49, 65], f);
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++)
        cylinder(-1.62 + i * 0.29, 1.05, -1.3 + j * 0.22, 0.075, 0.006, [113, 137, 161]);
    box(-1.76, 0.18, -0.865, 0.52, 0.44, 0.03, [35, 49, 65], f);
    box(-1.72, 0.63, -0.82, 0.43, 0.025, 0.03, [205, 221, 237], f);
    box(0.55, 1.055, -1.37, 0.57, 0.012, 0.4, [126, 157, 185], f);
    box(0.79, 1.08, -1.44, 0.035, 0.37, 0.035, [182, 203, 224], f);
    box(0.79, 1.43, -1.44, 0.035, 0.035, 0.19, [182, 203, 224], f);
    for (let i = 0; i < 3; i++) {
      box(-1.87 + i * 0.75, 1.63 + (1 - f) * 0.6, -1.53, 0.7, 0.65, 0.38, [249, 252, 255], f);
      box(-1.78 + i * 0.75, 1.67, -1.13, 0.22, 0.022, 0.02, [142, 166, 190], f);
    }
    box(-0.58, 0, 0.24, 1.78, 0.91, 0.78, wood, f);
    box(-0.64, 0.91, 0.18, 1.9, 0.095, 0.91, stone, f);
    for (const x of [-0.2, 0.65]) {
      for (const a of [-0.13, 0.13])
        for (const b of [-0.12, 0.12])
          box(x + a, 0, 1.34 + b, 0.045, 0.55, 0.045, [46, 74, 110], f);
      cylinder(x, 0.55, 1.34, 0.23, 0.08, wood);
    }
    box(0.18, 2.14, 0.43, 0.022, 0.62, 0.022, [63, 90, 118]);
    cylinder(0.19, 2.02, 0.44, 0.23, 0.12, [38, 102, 179]);
    plant(1.65, 1.13, 0.85);
    if (f > 0.92) {
      for (let i = 0; i < 9; i++)
        box(-0.52 + i * 0.18, 0.1, 1.025, 0.012, 0.71, 0.009, [41, 98, 162]);
      box(-0.51, 0.998, 0.32, 0.39, 0.025, 0.29, [200, 184, 153]);
      cylinder(0.92, 1.01, 0.58, 0.105, 0.17, [249, 250, 253]);
      box(-1.82, 1.6, -1.11, 2.14, 0.017, 0.025, [241, 231, 199]);
    }
  }
  function bath(t: number) {
    floor(t / 4, 2);
    wallPaint((t - 4.8) / 2.2);
    const q = ease((t - 1.4) / 2);
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 5; j++) {
        const a = ease((t - 2 - i * 0.18 - j * 0.1) * 2);
        box(
          -1.97 + i * 0.47,
          0.1 + j * 0.48,
          -1.54,
          0.455,
          0.46,
          0.03,
          blend(raw, [115, 173, 221], a),
        );
      }
    box(-1.91, 0.045, -1.46, 1.62, 0.095, 1.4, [249, 252, 255], q);
    box(-0.27, 0.14, -1.48, 0.035, 2.15, 1.48, [180, 213, 238], q * 0.24);
    box(-0.29, 0.14, -0.015, 0.025, 2.15, 0.025, [173, 196, 220], q);
    box(-1.27, 0.65, -1.47, 0.035, 1.4, 0.04, [173, 196, 220], q);
    box(-1.27, 2.05, -1.47, 0.035, 0.035, 0.38, [173, 196, 220], q);
    box(-1.44, 2.04, -1.18, 0.38, 0.035, 0.28, [173, 196, 220], q);
    box(0.15, 0.43, -1.42, 1.57, 0.52, 0.68, wood, q);
    box(0.1, 0.95, -1.45, 1.67, 0.085, 0.77, stone, q);
    box(0.46, 1.035, -1.3, 0.9, 0.12, 0.49, [249, 252, 255], q);
    box(0.55, 1.15, -1.23, 0.71, 0.008, 0.32, [173, 203, 230], q);
    box(1.08, 1.06, -1.39, 0.035, 0.31, 0.035, [173, 196, 220], q);
    box(1.08, 1.34, -1.39, 0.035, 0.03, 0.17, [173, 196, 220], q);
    box(0.27, 1.48, -1.49, 1.35, 0.93, 0.055, [46, 102, 170], q);
    box(0.32, 1.53, -1.42, 1.25, 0.83, 0.02, [178, 214, 238], q);
    box(0.26, 0.65, -0.72, 1.35, 0.025, 0.03, [38, 86, 145], q);
    box(0.05, 0.052, 0.25, 1.5, 0.025, 0.88, [130, 173, 214], q);
    box(-1.92, 1.22, 0.57, 0.09, 0.045, 0.68, [173, 196, 220], q);
    box(-1.84, 0.67, 0.73, 0.04, 0.59, 0.39, [245, 250, 255], q);
    plant(1.63, 1.12, 0.9);
    if (q > 0.95) {
      cylinder(1.45, 1.04, -1.1, 0.065, 0.19, [228, 240, 250]);
      box(1.425, 1.23, -1.12, 0.05, 0.035, 0.045, [70, 102, 139]);
      for (let i = 0; i < 3; i++)
        box(0.3, 0.09 + i * 0.06, 0.49, 0.47, 0.045, 0.29, [239 - i * 4, 245 - i * 3, 252]);
      face(
        [
          [0.39, 1.62, -1.388],
          [0.53, 1.62, -1.388],
          [1.15, 2.28, -1.388],
          [1.01, 2.28, -1.388],
        ],
        [237, 249, 255],
        1,
        0.42,
      );
    }
  }

  const layer = document.createElement("canvas");
  const layerCtx = layer.getContext("2d")!;
  const models = [exterior, kitchen, bath];

  function drawModel(which: number, time: number, opacity: number) {
    faces = [];
    box(-2.4, -0.42, -1.95, 4.8, 0.16, 4.05, [231, 239, 248]);
    models[which](time);
    faces.sort((a, b) => a.z - b.z);
    layerCtx.clearRect(0, 0, W, H);
    for (const f of faces) {
      layerCtx.globalAlpha = f.alpha;
      layerCtx.beginPath();
      f.p.forEach((p, i) => (i ? layerCtx.lineTo(p[0], p[1]) : layerCtx.moveTo(p[0], p[1])));
      layerCtx.closePath();
      layerCtx.fillStyle = f.color;
      layerCtx.fill();
      layerCtx.strokeStyle = f.color;
      layerCtx.lineWidth = 0.35;
      layerCtx.stroke();
    }
    layerCtx.globalAlpha = 1;
    ctx.globalAlpha = opacity;
    ctx.drawImage(layer, 0, 0, W, H);
    ctx.globalAlpha = 1;
  }

  function render(dt = 0) {
    ctx.clearRect(0, 0, W, H);
    const drift = reduced.matches ? 0 : Math.sin((elapsed / duration) * Math.PI) * 0.075;
    const smoothing = 1 - Math.exp(-dt * 4);
    yaw = lerp(yaw, YAW[scene] + px * 0.16 + drift, smoothing);
    pitch = lerp(pitch, PITCH[scene] + py * 0.06, smoothing);
    // Sombra suave bajo la maqueta.
    ctx.save();
    ctx.translate(W * 0.5, H * 0.7);
    ctx.scale(1, 0.26);
    const g = ctx.createRadialGradient(0, 0, 5, 0, 0, W * 0.4);
    g.addColorStop(0, "#00000055");
    g.addColorStop(0.6, "#0000001f");
    g.addColorStop(1, "#00000000");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, W * 0.41, 0, 7);
    ctx.fill();
    ctx.restore();
    if (previous >= 0 && transition < 1) {
      const t = ease(transition);
      drawModel(previous, 10.5, 1 - t);
      drawModel(scene, (elapsed * 10.5) / duration, t);
    } else drawModel(scene, (elapsed * 10.5) / duration, 1);
  }

  function select(i: number) {
    previous = scene;
    scene = (i + HOUSE_SCENES) % HOUSE_SCENES;
    elapsed = playing ? 0 : 3.8;
    transition = reduced.matches || !playing ? 1 : 0;
    if (!playing) {
      yaw = YAW[scene];
      pitch = PITCH[scene];
    }
    render(0.016);
    emit();
  }

  function setPlaying(next: boolean) {
    playing = next;
    render();
    emit();
  }

  const onReduced = (e: MediaQueryListEvent) => {
    playing = !e.matches;
    if (e.matches) elapsed = 3.8;
    render();
    emit();
  };
  const onMove = (e: PointerEvent) => {
    if (reduced.matches || e.pointerType !== "mouse") return;
    const r = wrap.getBoundingClientRect();
    px = (e.clientX - r.left) / r.width - 0.5;
    py = (e.clientY - r.top) / r.height - 0.5;
  };
  const onLeave = () => {
    px = 0;
    py = 0;
  };
  reduced.addEventListener("change", onReduced);
  wrap.addEventListener("pointermove", onMove);
  wrap.addEventListener("pointerleave", onLeave);

  const ro = new ResizeObserver(() => {
    const r = wrap.getBoundingClientRect();
    W = r.width;
    H = r.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layer.width = canvas.width;
    layer.height = canvas.height;
    layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  });
  ro.observe(wrap);
  const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting), { threshold: 0.05 });
  io.observe(wrap);

  function tick(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (visible && !document.hidden) {
      if (playing) {
        elapsed += dt;
        transition = Math.min(1, transition + dt / 0.65);
        if (elapsed >= duration) select(scene + 1);
        render(dt);
      } else if (!reduced.matches && Math.abs(yaw - (YAW[scene] + px * 0.16)) > 0.001) render(dt);
    }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  emit();

  return {
    select,
    next: () => select(scene + 1),
    prev: () => select(scene - 1),
    toggle: () => setPlaying(!playing),
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      reduced.removeEventListener("change", onReduced);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    },
  };
}
