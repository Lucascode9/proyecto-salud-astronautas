// Conecta los datos y la lógica con la página: estado, dibujo y controles.
let scen="car", timer=null;
const $=id=>document.getElementById(id);

function render(){
  const d=+$("day").value, r=evaluate(simulateMission(scen,d),SIM_PARAMS.preflight), o=overall(r.cards);
  $("dayLbl").textContent=`Día de misión ${d} de 180`;
  $("base").textContent=r.base.nb<7?`Línea base: calibrando, día ${r.base.nb} de 7. Parte del perfil preflight y gana peso con los datos en vuelo.`:`Línea base calibrada: variabilidad cardiaca ${f(r.base.hrv)} ms y pulso en reposo ${f(r.base.rhr)} lpm (perfil preflight más primeros 7 días en vuelo).`;
  $("banner").className="banner "+o.level;
  $("watch").className="watch "+o.level;
  $("watch").innerHTML=watchFaceHTML(o);
  $("banner").innerHTML=bannerHTML(o);
  $("cards").innerHTML=r.cards.map(protocolCardHTML).join("");
}
function drawScen(){
  $("scen").innerHTML=scenarioButtonsHTML(SCEN,scen);
}
$("scen").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;scen=b.dataset.id;drawScen();render();});
$("day").addEventListener("input",render);
$("play").addEventListener("click",()=>{
  if(timer){clearInterval(timer);timer=null;$("play").textContent="Reproducir misión";return;}
  if(+$("day").value>=180)$("day").value=1;
  $("play").textContent="Pausar";
  timer=setInterval(()=>{const v=+$("day").value;if(v>=180){clearInterval(timer);timer=null;$("play").textContent="Reproducir misión";return;}$("day").value=v+1;render();},120);
});
function setWatch(on){
  $("app").hidden=on;$("foot").hidden=on;$("watchwrap").hidden=!on;
  $("watchBtn").textContent=on?"Volver al panel":"Vista reloj";
}
$("watchBtn").addEventListener("click",()=>setWatch($("app").hidden===false));
$("back").addEventListener("click",()=>setWatch(false));
drawScen();render();
