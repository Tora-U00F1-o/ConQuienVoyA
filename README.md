# ¿Con quién voy a...?

Consulta las personas de los grupos y el horario de la EII.

https://tora-u00f1-o.github.io/ConQuienVoyA/

## Actualizar los datos

Edita `ACADEMIC_YEAR` y `SEMESTER` en `js/magic/schedule_config.py` al cambiar de curso o semestre. Después ejecuta `ActualizarPlanificacion.bat`: actualizará tanto `js/salida.js` (matrículas) como `js/planificacion.js` (horario). También puedes ejecutar los scripts por separado: `prepareAuto.py` y `prepareSchedule.py`.

La página es estática: `js/planificacion.js` se publica junto a la aplicación, por lo que Mi horario funciona sin hacer peticiones desde el navegador.
