// Guardado local de historial de puntajes y línea base (sección 7 de la especificación).
// TODAVÍA NO SE USA: el prototipo no guarda nada entre sesiones y esta reorganización
// no cambia ese comportamiento. Queda listo para conectarlo más adelante.
const LocalStore={
  save(key,value){
    try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){return false;}
  },
  load(key,fallback=null){
    try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw);}catch(e){return fallback;}
  }
};
