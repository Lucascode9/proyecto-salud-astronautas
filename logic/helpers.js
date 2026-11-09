// Utilidades compartidas por los protocolos. /logic no conoce HTML ni sensores:
// recibe números y devuelve puntajes.
const f=(x,d=1)=>x.toLocaleString("es",{maximumFractionDigits:d});
const lvl=s=>s>=70?"bad":s>=40?"warn":"ok";
// Convierte un valor en puntaje 0-100: a = umbral de amarillo (40), r = umbral de rojo (70).
const scaleRisk=(x,a,r)=>x<a?40*x/a:x<r?40+30*(x-a)/(r-a):Math.min(100,70+30*(x-r)/(.3*r));
const mean=(a,k)=>a.reduce((t,x)=>t+x[k],0)/a.length;
// Media de la señal k en los últimos n días de la serie S.
const last=(S,n,k)=>mean(S.slice(-n),k);
// Puntaje según cuántos factores de riesgo coinciden (0 a 3).
const factorScore=n=>[0,20,50,80][n];
