// Perfil preflight simulado del astronauta: punto de partida de la línea base.
// Es .js y no .json porque un navegador no puede leer un .json con fetch() al abrir
// la página con doble clic (file://), y la aplicación debe funcionar sin servidor.
const PREFLIGHT_PROFILE = {
  hrv: 55,                  // variabilidad cardiaca, ms
  rhr: 58,                  // pulso en reposo, lpm
  weight: 6,                // peso del perfil preflight frente a los días en vuelo
  sd: { hrv: 4, rhr: 2.5 }  // desviación típica personal de cada señal
};
