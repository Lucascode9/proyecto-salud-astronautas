// Genera los días de misión simulados de cada escenario.
// Todos los valores numéricos están en data/simulation_params.js.
const SCEN=[
  {id:"nom",name:"Misión nominal"},
  {id:"car",name:"Deterioro cardiovascular"},
  {id:"bon",name:"Ejercicio abandonado"},
  {id:"str",name:"Aislamiento y estrés"}
];

const rnd=(i,k)=>{const x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x)-.5};
const noisy=(p,d,k)=>p.mean+rnd(d,k)*p.range;

function simulateDay(s,d){
  const P=SIM_PARAMS.daily, C=SIM_PARAMS.scenarios;
  let hrv=noisy(P.hrv,d,1), rhr=noisy(P.rhr,d,2), sleep=noisy(P.sleep,d,3), eff=noisy(P.eff,d,4),
      ex=noisy(P.ex,d,5), sent=noisy(P.sent,d,6), gap=d%SIM_PARAMS.contactCycleDays;
  if(s==="car"){const k=Math.max(0,d-C.car.startDay);hrv-=Math.min(k*C.car.hrvPerDay,C.car.hrvMax);rhr+=Math.min(k*C.car.rhrPerDay,C.car.rhrMax);}
  if(s==="bon"&&d>C.bon.startDay)ex=noisy(C.bon.ex,d,5);
  if(s==="str"&&d>C.str.startDay){const k=d-C.str.startDay;sleep-=Math.min(k*C.str.sleepPerDay,C.str.sleepMax);eff-=Math.min(k*C.str.effPerDay,C.str.effMax);sent-=Math.min(k*C.str.sentPerDay,C.str.sentMax);gap=C.str.gapStart+Math.floor(k*C.str.gapPerDay);hrv-=Math.min(k*C.str.hrvPerDay,C.str.hrvMax);}
  return {hrv,rhr,sleep,eff,ex,sent,gap};
}

// Serie completa desde el día 1 hasta el día d.
function simulateMission(s,d){
  const S=[];for(let i=1;i<=d;i++)S.push(simulateDay(s,i));
  return S;
}
