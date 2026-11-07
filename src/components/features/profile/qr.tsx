// Static, decorative QR-style graphic (not a scannable code). Deterministic per seed.

const N = 21;

function buildModules(seed: number): boolean[][] {
  let s = (seed * 2654435761) >>> 0;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const grid: boolean[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => rnd() > 0.74));
  const clearFinder = (r0: number, c0: number) => {
    for (let r = -1; r <= 7; r++)
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r;
        const cc = c0 + c;
        if (rr >= 0 && rr < N && cc >= 0 && cc < N) grid[rr][cc] = false;
      }
  };
  clearFinder(0, 0);
  clearFinder(0, N - 7);
  clearFinder(N - 7, 0);
  // timing patterns
  for (let i = 8; i < N - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }
  return grid;
}

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={7} height={7} rx={1.2} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={0.6} fill="#ffffff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.5} fill="currentColor" />
    </g>
  );
}

export function QrGraphic({ seed = 1, size = 160 }: { seed?: number; size?: number }) {
  const m = buildModules(seed);
  return (
    <svg
      role="img"
      aria-label="Decorative QR code for SPIT Mobile Pair"
      width={size}
      height={size}
      viewBox={`-1 -1 ${N + 2} ${N + 2}`}
      className="text-[#0b1c30]"
      shapeRendering="crispEdges"
    >
      <rect x={-1} y={-1} width={N + 2} height={N + 2} fill="#ffffff" />
      {m.flatMap((row, r) =>
        row.map((on, c) => (on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="currentColor" /> : null)),
      )}
      <Finder x={0} y={0} />
      <Finder x={N - 7} y={0} />
      <Finder x={0} y={N - 7} />
    </svg>
  );
}
