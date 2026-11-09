# Monitor de salud para misiones largas

Proyecto para el reto de NASA Space Apps Challenge 2026 "Crear software de monitorización de la salud para astronautas en misiones espaciales".

Evalúa cuatro sistemas del cuerpo (cardiovascular, óseo, inmune y salud mental) frente a la línea base de cada astronauta y recomienda qué hacer, sin conexión con la Tierra. Todo se calcula en el navegador, con datos simulados.

Es una herramienta de apoyo a la decisión, no un dispositivo médico.

## Cómo abrirlo

Abre `index.html` en el navegador con doble clic. No hace falta instalar nada ni usar un servidor.

## Estructura

```
index.html                  Página principal
data/
  simulation_params.js      Parámetros de la simulación (estimados, no mediciones)
  mission_simulator.js      Días de misión de cada escenario
logic/                      Reglas de evaluación (sin HTML ni sensores)
  helpers.js                Utilidades compartidas
  baseline.js               Línea base personal
  protocol_cardio.js        Protocolo cardiovascular
  protocol_bone.js          Protocolo óseo
  protocol_immune.js        Protocolo inmune
  protocol_mental.js        Protocolo de salud mental
  combinator.js             Estado general: el más crítico manda
storage/
  local_store.js            Guardado local (aún sin conectar)
ui/
  dashboard.js              Estado de la página y controles
  components/               Piezas de la interfaz
  styles.css                Estilos
```
