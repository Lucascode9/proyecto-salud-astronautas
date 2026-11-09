// PARÁMETROS DE INGENIERÍA ESTIMADOS, NO MEDICIONES.
// Todos los valores de este archivo son estimaciones propias para la simulación.
// No provienen de datos medidos en astronautas ni de ningún conjunto de datos externo.
//
// Es .js y no .json porque un navegador no puede leer un .json con fetch() al abrir
// la página con doble clic (file://), y la aplicación debe funcionar sin servidor.
const SIM_PARAMS = {
  // Perfil preflight simulado: punto de partida de la línea base personal.
  preflight: {
    // Línea base promedio: coincide con la media diaria en vuelo de "daily".
    hrv: 54,                  // variabilidad cardiaca, ms
    rhr: 59,                  // pulso en reposo, lpm
    weight: 6,                // peso del perfil preflight frente a los días en vuelo
    // Desviación estándar usada en los umbrales. Parte del ruido diario de abajo
    // (sd = range / raíz de 12, que da 3,9 y 4,3) más un margen del 20 % elegido a propósito:
    // sin él, la misión nominal da falsas alertas. Es un ajuste de ingeniería, no una medición.
    sd: { hrv: 4.7, rhr: 5.2 }
  },

  // Valor diario = mean + ruido, con ruido repartido por igual en un ancho total "range"
  // (de -range/2 a +range/2).
  daily: {
    hrv:   { mean: 54,   range: 13.5 },  // ms; variación de +-12,5 % sobre el valor base
    rhr:   { mean: 59,   range: 14.75 }, // lpm; variación de +-12,5 % sobre el valor base
    sleep: { mean: 6.9,  range: 0.8 }, // horas
    eff:   { mean: 88,   range: 5 },   // eficiencia de sueño, %
    ex:    { mean: 0.92, range: 0.1 }, // adherencia al ejercicio, 0 a 1
    sent:  { mean: 0.25, range: 0.3 }  // ánimo en la bitácora, -1 a 1
  },

  // Días sin contacto social: ciclo normal de la tripulación.
  contactCycleDays: 6,

  // Factores de deterioro de cada escenario. startDay = último día sin deterioro.
  // "PerDay" = cuánto empeora cada día; "Max" = límite del empeoramiento.
  scenarios: {
    car: { startDay: 40, hrvPerDay: 0.3, hrvMax: 22, rhrPerDay: 0.12, rhrMax: 9 },
    bon: { startDay: 30, ex: { mean: 0.45, range: 0.3 } },
    str: {
      startDay: 50,
      sleepPerDay: 0.04, sleepMax: 1.8,
      effPerDay: 0.3, effMax: 16,
      sentPerDay: 0.012, sentMax: 0.8,
      gapStart: 6, gapPerDay: 0.4,
      hrvPerDay: 0.12, hrvMax: 10
    }
  }
};
