// Cardiovascular: tendencia (EWMA) y últimos 3 días frente a línea base personal
function evaluateCardio(S,base,profile){
  let e=S[0].hrv;S.forEach(x=>e=.3*x.hrv+.7*e);
  const zr=hrvRecentZ(S,base,profile), ze=(base.hrv-e)/profile.sd.hrv, z=Math.max(zr,ze), rz=(last(S,3,"rhr")-base.rhr)/profile.sd.rhr;
  let xc=z; if(z>=1.5&&rz>=1.5)xc=Math.max(xc,2.5);
  return {id:"car",score:Math.max(0,scaleRisk(Math.max(xc,0),1.5,2.5)),
    reason:`Variabilidad cardiaca de ${f(last(S,3,"hrv"))} ms frente a su línea base de ${f(base.hrv)} ms (${f(Math.max(z,0))} desviaciones por debajo). Pulso en reposo ${f(last(S,3,"rhr"))} lpm.`};
}
