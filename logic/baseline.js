// Línea base personal: perfil preflight más los primeros 7 días en vuelo.
function computeBaseline(S,profile){
  const nb=Math.min(S.length,7), first=S.slice(0,nb), w=profile.weight;
  return {
    hrv:(w*profile.hrv+nb*mean(first,"hrv"))/(w+nb),
    rhr:(w*profile.rhr+nb*mean(first,"rhr"))/(w+nb),
    nb
  };
}

// Desviaciones de los últimos 3 días de variabilidad cardiaca por debajo de la línea base.
function hrvRecentZ(S,base,profile){
  return (base.hrv-last(S,3,"hrv"))/profile.sd.hrv;
}
