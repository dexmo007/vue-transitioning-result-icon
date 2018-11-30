export function times(x, l) {
    const c = l/Math.sqrt(2);
    const x2 = x/2;
    const ps = [
      [x/4-c/2,x/4+c/2],//tll
      [x/4+c/2,x/4-c/2],//tlr
      [x2, x2-c],//ct
      [3*x/4-c/2,x/4-c/2],//trl
      [3*x/4+c/2,x/4+c/2],//trr
      [x2+c, x2],//cr
      [3*x/4+c/2,3*x/4-c/2],//brr
      [3*x/4-c/2,3*x/4+c/2],//brl
      [x2, x2+c],//cb
      [x/4+c/2,3*x/4+c/2],//blr
      [x/4-c/2,3*x/4-c/2],//bll
      [x2-c, x2],//cl
    ];
    const points =  ps.map(p => `${p[0]},${p[1]}`).join(' ');
    return points;
  }
  
  export function check(x, l, deltaY) {
    const h = l / Math.sqrt(2);
    const t = x/6;
    const u = x/Math.sqrt(8);
    const phi = 55 * Math.PI/180;
    const L = u*Math.tan(phi);
    const deltaL = L/Math.sqrt(2);
    const cb = [x/4+t,x/2+t+Math.sqrt(2)*l]
    const cr = [cb[0]+h,cb[1]-h];
    const cl = [cb[0]-h,cb[1]-h];
    const cll = [cl[0]-h,cl[1]-h];
    const ps = [
      [x/4-h,x/2+h],//ll
      [x/4,x/2],//lr
      [x/4+t,x/2+t],//ct
      [x/4+t+deltaL,x/2+t-deltaL],//rt
      [x/4+t+deltaL+h,x/2+t-deltaL+h],//rb
      cr,cr,
      cb,
      cl,cl,
     cll,cll,
    ];
    const points =  ps
      .map(p => [p[0],p[1]+deltaY])
      .map(p => `${p[0]},${p[1]}`).join(' ');
    return points;
  }