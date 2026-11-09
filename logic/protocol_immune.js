// Inmune: factores combinados (sueño, variabilidad cardiaca y aislamiento)
function evaluateImmune(S,base,profile){
  const gap=S[S.length-1].gap;
  const im=[[last(S,3,"sleep")<6,`sueño de ${f(last(S,3,"sleep"))} h en las últimas 3 noches`],[hrvRecentZ(S,base,profile)>=1,"variabilidad cardiaca baja"],[gap>=10,`${gap} días sin contacto social`]].filter(x=>x[0]);
  return {id:"imm",score:factorScore(im.length),reason:im.length?`Factores presentes: ${im.map(x=>x[1]).join("; ")}.`:"Sin factores combinados de riesgo inmunitario."};
}
