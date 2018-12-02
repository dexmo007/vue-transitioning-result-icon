export function times(x, l) {
  const c = l / Math.sqrt(2);
  const ps = [
    [x / 4 - c / 2, x / 4 + c / 2], // tll
    [x / 4 + c / 2, x / 4 - c / 2], // tlr
    [3 * x / 4 + c / 2, 3 * x / 4 - c / 2], // brr
    [3 * x / 4 - c / 2, 3 * x / 4 + c / 2], // brl
  ];
  const ps2 = [
    [3 * x / 4 - c / 2, x / 4 - c / 2], // trl
    [3 * x / 4 + c / 2, x / 4 + c / 2], // trr
    [x / 4 + c / 2, 3 * x / 4 + c / 2], // blr
    [x / 4 - c / 2, 3 * x / 4 - c / 2], // bll
  ];
  const points = ps.map(p => `${p[0]},${p[1]}`).join(' ');
  const points2 = ps2.map(p => `${p[0]},${p[1]}`).join(' ');
  return [points, points2];
}

export function check(x, l, deltaY) {
  const h = l / Math.sqrt(2);
  const t = x / 6;
  const u = x / Math.sqrt(8);
  const phi = 55 * Math.PI / 180;
  const L = u * Math.tan(phi);
  const deltaL = L / Math.sqrt(2);
  const cb = [x / 4 + t, x / 2 + t + Math.sqrt(2) * l];
  const cr = [cb[0] + h, cb[1] - h];
  const cl = [cb[0] - h, cb[1] - h];
  const ps = [
    [x / 4 - h, x / 2 + h], // ll
    [x / 4, x / 2], // lr
    cr,
    cb,
  ];
  const ps2 = [
    [x / 4 + t + deltaL, x / 2 + t - deltaL], // rt
    [x / 4 + t + deltaL + h, x / 2 + t - deltaL + h], // rb
    cb,
    cl,
  ];
  const points = ps
    .map(p => [p[0], p[1] + deltaY])
    .map(p => `${p[0]},${p[1]}`).join(' ');

  const points2 = ps2
    .map(p => [p[0], p[1] + deltaY])
    .map(p => `${p[0]},${p[1]}`).join(' ');
  return [points, points2];
}
