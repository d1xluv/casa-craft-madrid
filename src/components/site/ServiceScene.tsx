import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * Ilustraciones animadas de cada servicio (SVG propio, sin librerías).
 * Las piezas aparecen en secuencia al entrar en pantalla; los tipos de
 * animación (rise, drop, pop…) están definidos en styles.css.
 * Para añadir una escena: crear una función como las de abajo y registrarla
 * en `scenes` con el mismo id que el servicio en src/content/services.ts.
 */

const C = {
  navy: "#1f3a7a",
  deep: "#152a5c",
  blue: "#2f6fe0",
  light: "#a9c6f2",
  pale: "#e3ecfa",
  white: "#fbfcfe",
  ground: "#d3dae6",
  sun: "#d9e6fb",
  tree: "#a9bba4",
  trunk: "#8c7b66",
  brick: "#c46c48",
  brick2: "#b25d3c",
  mortar: "#e7e1d6",
  wood: "#d29d61",
  wood2: "#bd8750",
  old: "#e4ded2",
  stain: "#b7ad99",
};

type Anim =
  | "rise"
  | "drop"
  | "pop"
  | "grow"
  | "growx"
  | "fade"
  | "slide"
  | "draw"
  | "roll"
  | "flash";

/** Props de animación: tipo + retardo (ms) + estilos extra. */
function a(type: Anim, delay = 0, style: CSSProperties = {}) {
  return { "data-a": type, style: { "--d": `${delay}ms`, ...style } as CSSProperties };
}

/* ---------- Piezas comunes ---------- */

function Ground({ d = 0 }: { d?: number }) {
  return <rect x={160} y={600} width={1280} height={8} rx={4} fill={C.ground} {...a("growx", d)} />;
}

function Sun({ x = 1340, y = 150, d = 0 }: { x?: number; y?: number; d?: number }) {
  return <circle cx={x} cy={y} r={70} fill={C.sun} {...a("pop", d)} />;
}

function Tree({ x, d = 0, s = 1 }: { x: number; d?: number; s?: number }) {
  return (
    <g {...a("grow", d)}>
      <rect x={x - 5 * s} y={600 - 70 * s} width={10 * s} height={70 * s} fill={C.trunk} />
      <circle cx={x} cy={600 - 95 * s} r={44 * s} fill={C.tree} />
    </g>
  );
}

function Plant({ x, d = 0 }: { x: number; d?: number }) {
  return (
    <g {...a("pop", d)}>
      <path d={`M${x - 22} 560 h44 l-6 40 h-32 z`} fill={C.navy} />
      <ellipse
        cx={x - 14}
        cy={540}
        rx={12}
        ry={24}
        fill={C.tree}
        transform={`rotate(-25 ${x - 14} 540)`}
      />
      <ellipse
        cx={x + 14}
        cy={540}
        rx={12}
        ry={24}
        fill={C.tree}
        transform={`rotate(25 ${x + 14} 540)`}
      />
      <ellipse cx={x} cy={530} rx={12} ry={28} fill={C.tree} />
    </g>
  );
}

function Check({ x, y, d = 0 }: { x: number; y: number; d?: number }) {
  return (
    <g data-loop="bob" style={{ "--d": `${d}ms` } as CSSProperties} data-a="pop">
      <circle cx={x} cy={y} r={34} fill={C.blue} />
      <path
        d={`M${x - 14} ${y} l10 10 l18 -20`}
        fill="none"
        stroke={C.white}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ---------- Escenas ---------- */

function ReformaScene() {
  return (
    <>
      <Sun d={0} />
      <Ground d={0} />
      <Tree x={380} d={150} />
      <Tree x={1230} d={250} s={0.8} />
      {/* Estructura */}
      <rect
        x={520}
        y={300}
        width={560}
        height={300}
        fill={C.white}
        stroke={C.navy}
        strokeWidth={6}
        {...a("rise", 250)}
      />
      <polygon points="490,306 800,150 1110,306" fill={C.navy} {...a("drop", 650)} />
      <rect x={520} y={442} width={560} height={12} fill={C.navy} {...a("growx", 500)} />
      <rect x={796} y={300} width={10} height={300} fill={C.navy} {...a("grow", 600)} />
      {/* Dormitorio */}
      <g {...a("pop", 1000)}>
        <rect x={552} y={372} width={12} height={68} rx={3} fill={C.navy} />
        <rect x={560} y={402} width={160} height={38} rx={8} fill={C.light} />
        <rect
          x={570}
          y={388}
          width={46}
          height={18}
          rx={6}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={3}
        />
      </g>
      {/* Baño */}
      <g {...a("pop", 1150)}>
        <rect
          x={900}
          y={326}
          width={64}
          height={74}
          rx={32}
          fill={C.pale}
          stroke={C.navy}
          strokeWidth={4}
        />
        <rect
          x={888}
          y={404}
          width={88}
          height={36}
          rx={6}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={4}
        />
      </g>
      {/* Salón */}
      <g {...a("pop", 1300)}>
        <rect x={556} y={518} width={176} height={34} rx={12} fill={C.navy} />
        <rect x={548} y={544} width={192} height={44} rx={12} fill={C.blue} />
        <line x1={766} y1={500} x2={766} y2={590} stroke={C.navy} strokeWidth={5} />
        <polygon points="744,500 788,500 778,474 754,474" fill={C.light} />
      </g>
      {/* Cocina */}
      <g {...a("pop", 1450)}>
        <rect
          x={834}
          y={472}
          width={190}
          height={42}
          fill={C.pale}
          stroke={C.navy}
          strokeWidth={4}
        />
        <rect x={826} y={524} width={236} height={12} fill={C.navy} />
        <rect
          x={834}
          y={536}
          width={220}
          height={60}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={4}
        />
        <line x1={907} y1={536} x2={907} y2={596} stroke={C.navy} strokeWidth={3} />
        <line x1={980} y1={536} x2={980} y2={596} stroke={C.navy} strokeWidth={3} />
      </g>
      <Check x={1095} y={215} d={1800} />
    </>
  );
}

function AlbanileriaScene() {
  const bw = 72;
  const bh = 34;
  const left = 520;
  const width = 7 * (bw + 6);
  const rows = 6;
  const bricks: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const y = 600 - (r + 1) * (bh + 6);
    const offset = r % 2 ? -(bw + 6) / 2 : 0;
    const count = r === rows - 1 ? 4 : 8;
    for (let i = 0; i < count; i++) {
      const x = left + offset + i * (bw + 6);
      bricks.push(
        <rect
          key={`${r}-${i}`}
          x={x}
          y={y}
          width={bw}
          height={bh}
          rx={3}
          fill={(r + i) % 3 === 0 ? C.brick2 : C.brick}
          {...a("drop", 300 + r * 260 + i * 40)}
        />,
      );
    }
  }
  return (
    <>
      <Sun d={0} />
      <Ground d={0} />
      <Tree x={1360} d={200} s={0.85} />
      <defs>
        <clipPath id="wall-clip">
          <rect x={left} y={300} width={width} height={300} />
        </clipPath>
      </defs>
      <rect
        x={left}
        y={600 - (rows - 1) * (bh + 6)}
        width={width}
        height={(rows - 1) * (bh + 6)}
        fill={C.mortar}
        {...a("fade", 200)}
      />
      <g clipPath="url(#wall-clip)">{bricks}</g>
      {/* Ladrillo en la mano */}
      <rect
        x={left + 4 * (bw + 6) + 30}
        y={300}
        width={bw}
        height={bh}
        rx={3}
        fill={C.brick}
        data-loop="bob"
        data-a="pop"
        style={{ "--d": "2100ms" } as CSSProperties}
      />
      {/* Palé */}
      <g {...a("rise", 150)}>
        <rect x={250} y={584} width={190} height={16} fill={C.trunk} />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`${row}${col}`}
              x={258 + col * 88}
              y={548 - row * 38}
              width={84}
              height={34}
              rx={3}
              fill={col % 2 ? C.brick2 : C.brick}
            />
          )),
        )}
      </g>
      {/* Paleta y cubo */}
      <g {...a("pop", 1900)}>
        <path d="M1150 560 h90 l-12 40 h-66 z" fill={C.navy} />
        <ellipse cx={1195} cy={560} rx={45} ry={9} fill={C.light} />
      </g>
      <g {...a("pop", 2050)}>
        <polygon
          points="1150,470 1215,500 1150,530"
          fill={C.light}
          stroke={C.navy}
          strokeWidth={4}
        />
        <rect x={1212} y={492} width={50} height={14} rx={7} fill={C.navy} />
      </g>
    </>
  );
}

function PinturaScene() {
  const x0 = 440;
  const x1 = 1160;
  const roll = 1900;
  return (
    <>
      <Ground d={0} />
      {/* Pared vieja con manchas */}
      <rect x={x0} y={220} width={x1 - x0} height={380} fill={C.old} {...a("fade", 100)} />
      <g {...a("fade", 300)}>
        <ellipse cx={560} cy={330} rx={60} ry={34} fill={C.stain} opacity={0.5} />
        <ellipse cx={820} cy={460} rx={80} ry={40} fill={C.stain} opacity={0.4} />
        <ellipse cx={1040} cy={300} rx={50} ry={28} fill={C.stain} opacity={0.45} />
        <path d="M680 520 l20 -30 l-10 -30 l24 -26" fill="none" stroke={C.stain} strokeWidth={5} />
      </g>
      {/* Pintura nueva avanzando */}
      <rect
        x={x0}
        y={220}
        width={x1 - x0}
        height={380}
        fill={C.pale}
        {...a("growx", 700, {
          animationDuration: `${roll}ms`,
          animationTimingFunction: "ease-in-out",
        })}
      />
      {/* Rodillo (posición final a la derecha; la animación lo trae desde la izquierda) */}
      <g
        {...a("roll", 700, {
          animationDuration: `${roll}ms`,
          animationTimingFunction: "ease-in-out",
          "--dx": `${x0 - x1}px`,
        } as CSSProperties)}
      >
        <rect
          x={x1 - 16}
          y={300}
          width={32}
          height={170}
          rx={14}
          fill={C.light}
          stroke={C.navy}
          strokeWidth={5}
        />
        <path
          d={`M${x1 + 16} 385 h40 v130`}
          fill="none"
          stroke={C.navy}
          strokeWidth={8}
          strokeLinejoin="round"
        />
        <rect x={x1 + 44} y={505} width={24} height={70} rx={10} fill={C.blue} />
      </g>
      <rect
        x={x0}
        y={220}
        width={x1 - x0}
        height={380}
        fill="none"
        stroke={C.navy}
        strokeWidth={5}
        {...a("fade", 100)}
      />
      <rect
        x={x0}
        y={584}
        width={x1 - x0}
        height={16}
        fill={C.white}
        stroke={C.navy}
        strokeWidth={4}
        {...a("growx", 2600)}
      />
      <g {...a("drop", 2650)}>
        <line x1={720} y1={300} x2={800} y2={262} stroke={C.navy} strokeWidth={3} />
        <line x1={880} y1={300} x2={800} y2={262} stroke={C.navy} strokeWidth={3} />
        <rect
          x={700}
          y={300}
          width={200}
          height={130}
          rx={4}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={6}
        />
        <polygon points="720,410 780,340 820,385 845,360 880,410" fill={C.light} />
        <circle cx={850} cy={330} r={14} fill={C.sun} />
      </g>
      {/* Escalera */}
      <g {...a("rise", 200)}>
        <line
          x1={300}
          y1={600}
          x2={340}
          y2={330}
          stroke={C.navy}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <line
          x1={390}
          y1={600}
          x2={350}
          y2={330}
          stroke={C.navy}
          strokeWidth={8}
          strokeLinecap="round"
        />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={305 + i * 8}
            y1={560 - i * 60}
            x2={385 - i * 8}
            y2={560 - i * 60}
            stroke={C.navy}
            strokeWidth={6}
          />
        ))}
      </g>
      {/* Bote y bandeja */}
      <g {...a("pop", 2700)}>
        <rect
          x={1250}
          y={520}
          width={80}
          height={80}
          rx={8}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={5}
        />
        <rect x={1250} y={545} width={80} height={26} fill={C.blue} />
        <path d="M1255 520 q35 -40 70 0" fill="none" stroke={C.navy} strokeWidth={4} />
      </g>
      <g {...a("pop", 2850)}>
        <polygon
          points="1350,600 1360,570 1440,570 1430,600"
          fill={C.light}
          stroke={C.navy}
          strokeWidth={4}
        />
      </g>
      <Check x={1160} y={180} d={2900} />
    </>
  );
}

function BanosCocinasScene() {
  const tiles: ReactNode[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 6; c++) {
      tiles.push(
        <rect
          key={`${r}-${c}`}
          x={360 + c * 64}
          y={250 + r * 64}
          width={60}
          height={60}
          rx={3}
          fill={(r + c) % 2 ? C.pale : C.white}
          stroke={C.light}
          strokeWidth={2}
          {...a("pop", 150 + (r + c) * 70)}
        />,
      );
    }
  }
  return (
    <>
      <Ground d={0} />
      {/* Baño */}
      {tiles}
      <rect
        x={370}
        y={572}
        width={250}
        height={26}
        rx={6}
        fill={C.white}
        stroke={C.navy}
        strokeWidth={5}
        {...a("rise", 900)}
      />
      <g {...a("drop", 1000)}>
        <line x1={420} y1={260} x2={420} y2={572} stroke={C.navy} strokeWidth={8} />
        <rect x={420} y={270} width={70} height={16} rx={8} fill={C.navy} />
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={445 + (i % 3) * 18}
          cy={310 + i * 26}
          rx={4}
          ry={9}
          fill={C.blue}
          data-loop="blink"
          style={{ "--d": `${1300 + i * 120}ms` } as CSSProperties}
          data-a="fade"
        />
      ))}
      <rect
        x={560}
        y={320}
        width={110}
        height={130}
        rx={55}
        fill={C.pale}
        stroke={C.navy}
        strokeWidth={5}
        {...a("pop", 1150)}
      />
      {/* Cocina */}
      <g {...a("rise", 600)}>
        <rect
          x={860}
          y={500}
          width={420}
          height={100}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={5}
        />
        <line x1={1000} y1={500} x2={1000} y2={600} stroke={C.navy} strokeWidth={4} />
        <line x1={1140} y1={500} x2={1140} y2={600} stroke={C.navy} strokeWidth={4} />
        <rect x={1020} y={520} width={100} height={60} rx={6} fill={C.deep} />
      </g>
      <rect x={850} y={488} width={440} height={16} fill={C.navy} {...a("growx", 1000)} />
      <rect
        x={880}
        y={300}
        width={380}
        height={90}
        fill={C.pale}
        stroke={C.navy}
        strokeWidth={5}
        {...a("drop", 1200)}
      />
      <polygon points="1040,240 1100,240 1130,300 1010,300" fill={C.navy} {...a("drop", 1350)} />
      <path
        d="M930 488 v-40 h30 v14"
        fill="none"
        stroke={C.navy}
        strokeWidth={7}
        strokeLinecap="round"
        {...a("pop", 1500)}
      />
      <Plant x={1215} d={1650} />
    </>
  );
}

function SuelosScene() {
  const planks: ReactNode[] = [];
  const left = 360;
  const right = 1240;
  for (let r = 0; r < 4; r++) {
    const y = 474 + r * 32;
    const offset = (r * 90) % 220;
    let i = 0;
    for (let x = left - offset; x < right; x += 220) {
      planks.push(
        <rect
          key={`${r}-${i}`}
          x={x + 2}
          y={y}
          width={216}
          height={29}
          rx={2}
          fill={(r + i) % 2 ? C.wood2 : C.wood}
          {...a("slide", 700 + r * 380 + i * 70)}
        />,
      );
      i++;
    }
  }
  return (
    <>
      <Sun x={1380} y={140} d={0} />
      {/* Pared y ventanas */}
      <rect
        x={left}
        y={190}
        width={right - left}
        height={282}
        fill={C.white}
        stroke={C.navy}
        strokeWidth={5}
        {...a("rise", 100)}
      />
      {[560, 840].map((x, i) => (
        <g key={x} {...a("pop", 350 + i * 120)}>
          <rect
            x={x}
            y={230}
            width={200}
            height={190}
            rx={4}
            fill={C.pale}
            stroke={C.navy}
            strokeWidth={6}
          />
          <line x1={x + 100} y1={230} x2={x + 100} y2={420} stroke={C.navy} strokeWidth={5} />
        </g>
      ))}
      <g {...a("rise", 550)}>
        <rect
          x={420}
          y={410}
          width={90}
          height={46}
          rx={6}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={4}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={432 + i * 16}
            y1={414}
            x2={432 + i * 16}
            y2={452}
            stroke={C.navy}
            strokeWidth={3}
          />
        ))}
      </g>
      {/* Suelo */}
      <defs>
        <clipPath id="floor-clip">
          <rect x={left} y={472} width={right - left} height={128} />
        </clipPath>
      </defs>
      <rect
        x={left}
        y={472}
        width={right - left}
        height={128}
        fill={C.mortar}
        {...a("fade", 500)}
      />
      <g clipPath="url(#floor-clip)">{planks}</g>
      <rect
        x={left}
        y={464}
        width={right - left}
        height={10}
        fill={C.white}
        stroke={C.navy}
        strokeWidth={3}
        {...a("growx", 2400)}
      />
      <g {...a("fade", 2700)} opacity={0.35}>
        <polygon points="600,480 720,480 780,600 640,600" fill={C.white} />
        <polygon points="880,480 1000,480 1080,600 940,600" fill={C.white} />
      </g>
      <Plant x={1180} d={2800} />
      <Check x={1240} y={170} d={3000} />
    </>
  );
}

function PladurScene() {
  return (
    <>
      <Ground d={0} />
      {/* Perfiles del techo */}
      <g {...a("fade", 100)}>
        {[620, 800, 980, 1160, 1320].map((x) => (
          <line key={x} x1={x} y1={140} x2={x} y2={210} stroke={C.navy} strokeWidth={5} />
        ))}
      </g>
      <line
        x1={600}
        y1={210}
        x2={1340}
        y2={210}
        stroke={C.navy}
        strokeWidth={8}
        pathLength={1}
        {...a("draw", 200)}
      />
      {/* Placas del falso techo */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={600 + i * 185}
          y={214}
          width={181}
          height={34}
          fill={C.white}
          stroke={C.light}
          strokeWidth={3}
          {...a("drop", 700 + i * 180)}
        />
      ))}
      {/* Focos y luz */}
      {[692, 877, 1062, 1247].map((x, i) => (
        <g key={x}>
          <rect
            x={x - 18}
            y={248}
            width={36}
            height={10}
            rx={5}
            fill={C.navy}
            {...a("pop", 1500 + i * 120)}
          />
          <polygon
            points={`${x - 16},258 ${x + 16},258 ${x + 70},590 ${x - 70},590`}
            fill={C.sun}
            data-loop="blink"
            data-a="fade"
            style={{ "--d": `${1700 + i * 120}ms` } as CSSProperties}
          />
        </g>
      ))}
      {/* Tabique: montantes, aislamiento y placas */}
      <g {...a("grow", 300)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={240 + i * 70} y={300} width={12} height={300} fill={C.navy} />
        ))}
      </g>
      <path
        d="M258 310 l40 25 l-40 25 l40 25 l-40 25 l40 25 l-40 25 l40 25 l-40 25 l40 25 l-40 25 l40 25"
        fill="none"
        stroke={C.light}
        strokeWidth={8}
        pathLength={1}
        {...a("draw", 900)}
      />
      {[0, 1].map((i) => (
        <rect
          key={i}
          x={320 + i * 70}
          y={300}
          width={70}
          height={300}
          fill={C.white}
          stroke={C.light}
          strokeWidth={3}
          {...a("slide", 1300 + i * 200)}
        />
      ))}
      <Check x={1400} y={150} d={2200} />
    </>
  );
}

function FachadasScene() {
  const x0 = 520;
  const x1 = 1080;
  return (
    <>
      <Sun d={0} />
      <Ground d={0} />
      <Tree x={380} d={150} />
      <defs>
        <clipPath id="facade-clip">
          <rect x={x0} y={180} width={x1 - x0} height={420} />
        </clipPath>
      </defs>
      {/* Fachada antigua y pintura nueva */}
      <rect
        x={x0}
        y={180}
        width={x1 - x0}
        height={420}
        fill={C.old}
        stroke={C.navy}
        strokeWidth={6}
        {...a("rise", 200)}
      />
      <g clipPath="url(#facade-clip)">
        <rect
          x={x0}
          y={180}
          width={x1 - x0}
          height={420}
          fill={C.white}
          {...a("growx", 1500, {
            animationDuration: "1800ms",
            animationTimingFunction: "ease-in-out",
          })}
        />
      </g>
      <rect
        x={x0 - 14}
        y={168}
        width={x1 - x0 + 28}
        height={18}
        fill={C.navy}
        {...a("drop", 450)}
      />
      {/* Ventanas y puerta */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) =>
          r === 2 && c === 1 ? null : (
            <rect
              key={`${r}${c}`}
              x={570 + c * 175}
              y={220 + r * 125}
              width={110}
              height={80}
              rx={4}
              fill={C.light}
              stroke={C.navy}
              strokeWidth={5}
              {...a("pop", 600 + (r * 3 + c) * 70)}
            />
          ),
        ),
      )}
      <rect x={750} y={480} width={100} height={120} rx={4} fill={C.navy} {...a("rise", 1200)} />
      {/* Andamio */}
      <g {...a("grow", 900)}>
        {[490, 700, 900, 1110].map((x) => (
          <rect key={x} x={x} y={200} width={8} height={400} fill={C.blue} />
        ))}
      </g>
      {[320, 450].map((y, i) => (
        <rect
          key={y}
          x={480}
          y={y}
          width={640}
          height={10}
          fill={C.blue}
          {...a("growx", 1100 + i * 150)}
        />
      ))}
      <g {...a("pop", 3300)}>
        <rect
          x={1180}
          y={530}
          width={70}
          height={70}
          rx={8}
          fill={C.white}
          stroke={C.navy}
          strokeWidth={5}
        />
        <rect x={1180} y={552} width={70} height={22} fill={C.blue} />
      </g>
      <Check x={1120} y={140} d={3400} />
    </>
  );
}

function ReparacionesScene() {
  return (
    <>
      <Ground d={0} />
      <rect
        x={480}
        y={200}
        width={640}
        height={400}
        fill={C.white}
        stroke={C.navy}
        strokeWidth={6}
        {...a("rise", 100)}
      />
      {/* Tubería con gota */}
      <g {...a("slide", 300)}>
        <rect
          x={480}
          y={240}
          width={420}
          height={22}
          fill={C.light}
          stroke={C.navy}
          strokeWidth={4}
        />
        <rect x={880} y={230} width={30} height={42} rx={4} fill={C.navy} />
      </g>
      <ellipse
        cx={895}
        cy={300}
        rx={8}
        ry={13}
        fill={C.blue}
        {...a("flash", 600, { opacity: 0 })}
      />
      {/* Humedad que desaparece */}
      <ellipse
        cx={720}
        cy={430}
        rx={110}
        ry={60}
        fill={C.stain}
        {...a("flash", 700, { opacity: 0 })}
      />
      {/* Grieta y reparación */}
      <path
        d="M980 320 l-30 50 l24 30 l-40 60 l18 40"
        fill="none"
        stroke={C.navy}
        strokeWidth={6}
        strokeLinecap="round"
        pathLength={1}
        {...a("draw", 500)}
      />
      <rect
        x={915}
        y={310}
        width={96}
        height={204}
        rx={20}
        fill={C.white}
        {...a("fade", 1800, { animationDuration: "900ms" })}
      />
      <g {...a("slide", 1600)}>
        <rect
          x={1010}
          y={400}
          width={70}
          height={46}
          rx={6}
          fill={C.light}
          stroke={C.navy}
          strokeWidth={4}
        />
        <rect x={1076} y={414} width={60} height={16} rx={8} fill={C.navy} />
      </g>
      {/* Caja de herramientas */}
      <g {...a("rise", 1300)}>
        <rect x={1180} y={520} width={150} height={80} rx={8} fill={C.blue} />
        <rect x={1180} y={540} width={150} height={10} fill={C.navy} />
        <path d="M1225 520 v-22 h60 v22" fill="none" stroke={C.navy} strokeWidth={8} />
      </g>
      <g data-loop="bob" data-a="pop" style={{ "--d": "1500ms" } as CSSProperties}>
        <path
          d="M1260 380 l-60 60 a18 18 0 1 0 14 14 l60 -60 a26 26 0 0 0 30 -36 l-18 18 l-16 -4 l-4 -16 l18 -18 a26 26 0 0 0 -36 30 z"
          fill={C.navy}
        />
      </g>
      <Plant x={380} d={2000} />
      <Check x={1060} y={160} d={2300} />
    </>
  );
}

const scenes: Record<string, () => ReactNode> = {
  "reforma-integral": ReformaScene,
  albanileria: AlbanileriaScene,
  pintura: PinturaScene,
  "banos-cocinas": BanosCocinasScene,
  suelos: SuelosScene,
  pladur: PladurScene,
  fachadas: FachadasScene,
  reparaciones: ReparacionesScene,
};

export function hasScene(id: string) {
  return id in scenes;
}

/** Panel con la escena animada del servicio y una etiqueta inferior. */
export function ServiceScene({ id, label }: { id: string; label: string }) {
  const { t } = useLang();
  const ref = useRef<SVGSVGElement>(null);
  const [run, setRun] = useState(0);
  const Scene = scenes[id];

  // La escena está siempre cerca del principio de la página: se reproduce al
  // cargar (tras una breve pausa) sin depender de observadores de scroll.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = window.setTimeout(() => el.setAttribute("data-play", ""), 250);
    return () => window.clearTimeout(id);
  }, [run]);

  if (!Scene) return null;

  return (
    <figure className="relative overflow-hidden rounded-2xl bg-sand/70 ring-1 ring-border">
      <svg
        key={run}
        ref={ref}
        viewBox="150 70 1300 560"
        role="img"
        aria-label={label}
        className="scene block h-auto w-full"
      >
        <Scene />
      </svg>
      <figcaption className="flex justify-center pb-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-sm font-semibold text-navy shadow-soft md:text-base">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
          {label}
        </span>
      </figcaption>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-navy shadow-soft transition-colors hover:bg-background motion-reduce:hidden"
        aria-label={t("services.replay")}
        title={t("services.replay")}
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
      </button>
    </figure>
  );
}
