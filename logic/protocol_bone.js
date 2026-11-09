// Óseo: días seguidos con adherencia semanal por debajo del 80 %
function evaluateBone(S){
  let c=0;S.forEach((x,i)=>{const w=S.slice(Math.max(0,i-6),i+1);c=mean(w,"ex")<.8?c+1:0;});
  const proj=c/30*1.25;
  return {id:"bon",score:scaleRisk(c,14,48),
    reason:c>0?`Adherencia semanal bajo el 80 % durante ${c} días seguidos. Pérdida ósea proyectada: cerca de ${f(proj)} % (1 a 1,5 % mensual sin contramedidas).`:`Adherencia al ejercicio de ${f(last(S,7,"ex")*100,0)} % en la última semana.`};
}
