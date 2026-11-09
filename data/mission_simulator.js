// Genera los días de misión simulados de cada escenario.
const SCEN=[
  {id:"nom",name:"Misión nominal"},
  {id:"car",name:"Deterioro cardiovascular"},
  {id:"bon",name:"Ejercicio abandonado"},
  {id:"str",name:"Aislamiento y estrés"}
];

const rnd=(i,k)=>{const x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x)-.5};

function simulateDay(s,d){
  let hrv=54+rnd(d,1)*5, rhr=59+rnd(d,2)*3, sleep=6.9+rnd(d,3)*.8, eff=88+rnd(d,4)*5,
      ex=.92+rnd(d,5)*.1, sent=.25+rnd(d,6)*.3, gap=d%6;
  if(s==="car"){const k=Math.max(0,d-40);hrv-=Math.min(k*.3,22);rhr+=Math.min(k*.12,9);}
  if(s==="bon"&&d>30)ex=.45+rnd(d,5)*.3;
  if(s==="str"&&d>50){const k=d-50;sleep-=Math.min(k*.04,1.8);eff-=Math.min(k*.3,16);sent-=Math.min(k*.012,.8);gap=6+Math.floor(k*.4);hrv-=Math.min(k*.12,10);}
  return {hrv,rhr,sleep,eff,ex,sent,gap};
}

// Serie completa desde el día 1 hasta el día d.
function simulateMission(s,d){
  const S=[];for(let i=1;i<=d;i++)S.push(simulateDay(s,i));
  return S;
}
