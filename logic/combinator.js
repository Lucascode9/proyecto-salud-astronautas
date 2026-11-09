// Reúne los 4 protocolos y decide el estado general: "el más crítico manda", sin promediar.
const NAMES={car:"Cardiovascular",bon:"Óseo",imm:"Inmune",men:"Salud mental"};
const LV={ok:"Verde",warn:"Amarillo",bad:"Rojo"};
const ACT={
 car:{warn:"Iniciar la contramedida de resistencia (LBNP) y aumentar líquidos y sodio antes de esfuerzos intensos.",bad:"Suspender actividad extravehicular, mantener reposo, reevaluar en 24 h y avisar al médico de vuelo."},
 bon:{warn:"Reajustar el plan de ejercicio con sesiones más cortas y frecuentes, y revisar calcio y vitamina D.",bad:"Restablecer hoy el protocolo completo de ejercicio y programar una revisión de densidad ósea."},
 imm:{warn:"Reducir la carga de trabajo, proteger el descanso y priorizar el contacto con la familia.",bad:"Descanso obligatorio, vigilar síntomas infecciosos y notificar al equipo médico."},
 men:{warn:"Programar una pausa, reorganizar los turnos y abrir una conversación con el psicólogo de vuelo.",bad:"Contactar hoy al psicólogo de vuelo y retirar al astronauta de tareas críticas."}
};
const SHORT={
 car:{warn:"Contramedida LBNP y más líquidos",bad:"Reposo y avisar al médico"},
 bon:{warn:"Ajustar el ejercicio hoy",bad:"Retomar el ejercicio completo"},
 imm:{warn:"Reducir carga y descansar",bad:"Descanso obligatorio"},
 men:{warn:"Pausa y hablar con psicología",bad:"Contactar a psicología hoy"}
};

// Evalúa una serie de días: devuelve el puntaje de cada protocolo y la línea base.
function evaluate(S,profile){
  const base=computeBaseline(S,profile);
  const results=[evaluateCardio(S,base,profile),evaluateBone(S),evaluateImmune(S,base,profile),evaluateMental(S)];
  const cards=results.map(x=>({...x,score:Math.round(x.score),level:lvl(x.score)}));
  return {cards,base};
}

function overall(cards){
  const reds=cards.filter(c=>c.level==="bad"), ambers=cards.filter(c=>c.level==="warn");
  const top=[...cards].sort((a,b)=>b.score-a.score)[0];
  if(reds.length)return {level:"bad",title:`Causa principal: ${NAMES[top.id]}`,why:top.reason,act:ACT[top.id].bad,sys:NAMES[top.id],short:SHORT[top.id].bad};
  if(ambers.length>=2)return {level:"bad",title:`Dos sistemas en amarillo a la vez: ${ambers.map(c=>NAMES[c.id]).join(" y ")}`,why:"La combinación de alertas moderadas se trata como riesgo mayor.",act:ACT[top.id].warn,sys:ambers.map(c=>NAMES[c.id]).join(" y "),short:SHORT[top.id].warn};
  if(ambers.length===1)return {level:"warn",title:`Atención a: ${NAMES[top.id]}`,why:top.reason,act:ACT[top.id].warn,sys:NAMES[top.id],short:SHORT[top.id].warn};
  return {level:"ok",title:"Todos los sistemas dentro de su rango",why:"Ningún sistema se aleja de la línea base personal del astronauta.",act:"Sin acción requerida. Mantener la rutina de ejercicio y descanso.",sys:"Todos los sistemas",short:"Sin acción requerida"};
}
