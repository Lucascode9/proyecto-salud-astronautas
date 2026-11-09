// Salud mental: factores combinados (ánimo en la bitácora, calidad de sueño y aislamiento)
function evaluateMental(S){
  const gap=S[S.length-1].gap;
  const me=[[last(S,7,"sent")<-.2,"ánimo negativo sostenido en la bitácora"],[last(S,7,"eff")<80,`eficiencia de sueño de ${f(last(S,7,"eff"),0)} %`],[gap>=10,`${gap} días sin contacto social`]].filter(x=>x[0]);
  return {id:"men",score:factorScore(me.length),reason:me.length?`Factores presentes: ${me.map(x=>x[1]).join("; ")}.`:"Ánimo, sueño y contacto social dentro de lo esperado."};
}
