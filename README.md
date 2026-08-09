# Municipio al Límite

Juego educativo estático en HTML, CSS y JavaScript puro sobre la transición del SGP, la descentralización y el Proyecto de Ley de Competencias.

## Propósito

La experiencia busca que la persona jugadora entienda, por juego y no solo por explicación, qué ocurre cuando llegan más recursos pero también crecen las responsabilidades y la presión institucional.

## Cómo ejecutar localmente

Usa cualquier servidor estático. Por ejemplo:

```bash
python3 -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

También puedes servirlo con:

```bash
npx serve .
```

## Cómo desplegarlo

### GitHub Pages

1. Sube `index.html`, `styles.css`, `app.js`, `README.md` y `GAME_SPEC.md` a un repositorio.
2. Activa GitHub Pages desde la rama principal o la rama que uses para publicar.
3. Abre la URL pública y úsala como destino del QR.

### Otro hosting estático

Puedes publicarlo en Netlify, Cloudflare Pages, Vercel, Firebase Hosting o cualquier hosting estático similar. Solo necesitas servir estos archivos tal como están.

## Cómo jugar

1. Pulsa `Comenzar`.
2. Lee el briefing y pulsa `Gobernar el municipio`.
3. En cada ronda, selecciona una de las tres tarjetas y confirma.
4. Lee la consecuencia visible.
5. Repite hasta llegar al final y, si quieres, usa `Jugar otra vez`.

La partida dura tres decisiones y está pensada para completarse en 2 a 3 minutos.

## Indicadores

El juego muestra cuatro indicadores:

- `wellbeing`: bienestar de servicios.
- `capacity`: capacidad institucional.
- `fiscalMargin`: margen fiscal.
- `competencyLoad`: carga de competencias.

La carga de competencias no es una recompensa. Se muestra como presión o demanda institucional.

## Sobre los valores

Todos los números son unidades abstractas de simulación. No representan pesos colombianos ni una distribución legal exacta. El recorrido visual del SGP es una simplificación pedagógica de la transición:

`29,5 % → 32,8 % → 36,2 % → 39,5 %`

## Fuente de verdad

`GAME_SPEC.md` es la especificación normativa del producto. Si este README o el código de apoyo entran en conflicto con la especificación, debe prevalecer `GAME_SPEC.md`.

## Limitaciones del MVP

- Solo hay una municipalidad ficticia.
- Hay exactamente tres rondas y tres decisiones por partida.
- No hay backend, cuentas, base de datos, API ni conexión externa.
- No hay aleatoriedad.
- No hay multijugador ni ranking.
- No hay persistencia local entre recargas.
- No hay editor de escenarios.
- No hay audio, video ni imágenes externas.
# mision-39-5
