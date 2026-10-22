# 🌐 Guía de estudio: Compatibilidad entre navegadores en CSS

> **Curso:** Hojas de Estilo en Cascada Avanzado · UTP · Semana 11
> **Tecnologías:** HTML5 · CSS3 · JavaScript ES5 (sin librerías ni dependencias)
> **Objetivo:** aprender a crear interfaces que **se vean y funcionen igual** en Chrome, Edge, Opera, Brave, Vivaldi, Comet, Firefox, Zen, Tor Browser, Safari y otros.

---

## 📑 Índice

1. [Descripción](#1-descripción)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [Cómo usarlo](#3-cómo-usarlo)
4. [Mapa de comentarios PASO / ESTUDIO](#4-mapa-de-comentarios-paso--estudio)
5. [Teoría: navegadores y motores](#5-teoría-navegadores-y-motores)
6. [Teoría: qué es la compatibilidad](#6-teoría-qué-es-la-compatibilidad)
7. [Beneficios](#7-beneficios)
8. [Los 9 problemas comunes y sus soluciones](#8-los-9-problemas-comunes-y-sus-soluciones)
9. [Prueba y depuración](#9-prueba-y-depuración)
10. [Técnicas aplicadas en este proyecto](#10-técnicas-aplicadas-en-este-proyecto)
11. [Repaso: transiciones y transformaciones](#11-repaso-transiciones-y-transformaciones)
12. [Práctica de clase (proyecto PrjSemana11_CSS)](#12-práctica-de-clase-proyecto-prjsemana11_css)
13. [Preguntas del cierre con respuestas](#13-preguntas-del-cierre-con-respuestas)
14. [Autoevaluación](#14-autoevaluación)
15. [Correcciones y buenas prácticas actuales](#15-correcciones-y-buenas-prácticas-actuales)
16. [Glosario](#16-glosario)
17. [Plan de estudio paso a paso](#17-plan-de-estudio-paso-a-paso)
18. [Recursos](#18-recursos)

---

## 1. Descripción

Este proyecto es una **página web interactiva de estudio** que resume el contenido de la sesión *Compatibilidad entre navegadores*. Sirve para dos cosas a la vez:

- **Aprender la teoría**: motores de renderizado, beneficios, 9 problemas comunes y herramientas de prueba.
- **Ver la práctica**: el propio código aplica las técnicas de compatibilidad y las explica con comentarios.

La página incluye:

| Sección | Contenido |
|---|---|
| 1. Tu navegador | Detección del navegador y motor, y prueba de 10 características CSS con `CSS.supports()`. |
| 2. Motores | Tabla Blink, Gecko, WebKit y navegadores que usa cada uno. |
| 3. Beneficios | Alcance, experiencia consistente y SEO. |
| 4. Problemas | Los 9 problemas con su solución y código. |
| 5. Demo | Transición, transformación, `calc()` con respaldo y `@supports not`. |
| 6. Pruebas | Checklist con avance guardado en el navegador. |
| 7. Quiz | 6 preguntas con retroalimentación y barra de progreso. |

---

## 2. Estructura del proyecto

```
guia-compatibilidad-navegadores/
├── index.html        ← estructura (HTML semántico)
├── css/
│   └── estilo.css    ← estilos, fallbacks, prefijos, @supports
├── js/
│   └── app.js        ← detección, checklist y quiz (ES5)
├── LEEME.txt         ← instrucciones rápidas
└── README.md         ← este documento
```

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Contenido y estructura. Enlaza el CSS en el `<head>` y el JS al final del `<body>`. |
| `css/estilo.css` | Apariencia, modo oscuro, layout flex/grid, prefijos y fallbacks. |
| `js/app.js` | Tema claro/oscuro, detección de características, checklist y quiz. |

> 💡 **Por qué se separan:** facilita el mantenimiento y permite que el navegador guarde CSS y JS en caché.

---

## 3. Cómo usarlo

1. **Descomprime** la carpeta completa, manteniendo las subcarpetas `css/` y `js/`.
2. **Abre** `index.html` con doble clic. No necesita servidor ni instalación.
3. **Abre los tres archivos en un editor** (VS Code, NetBeans, etc.) y lee los comentarios en orden.
4. **Pruébala en varios navegadores** y compara resultados.

Opcional, con servidor local (por ejemplo, Live Server en VS Code):

```
http://127.0.0.1:5500/index.html
```

---

## 4. Mapa de comentarios PASO / ESTUDIO

Cada bloque del código lleva un comentario `PASO n` y notas `ESTUDIO` que explican el porqué.

| Archivo | Pasos | Temas |
|---|---|---|
| `index.html` | 1, 11 a 18 | DOCTYPE, `lang`, `meta viewport`, HTML semántico, secciones. |
| `css/estilo.css` | 2 a 10 | Variables con fallback, reset, tarjetas, flex + `@supports` grid, tablas, botones, demo, media queries. |
| `js/app.js` | 19 a 25 | IIFE, ES5, `localStorage` con `try/catch`, tema, detección, `CSS.supports()`, checklist, quiz. |

---

## 5. Teoría: navegadores y motores

El **motor de renderizado** interpreta HTML y CSS y dibuja la página. Como cada motor implementa los estándares a su ritmo, **la misma página puede verse distinta**.

| Motor | Navegadores | Prefijo antiguo |
|---|---|---|
| **Blink** (Chromium) | Chrome, Edge, Opera, Brave, Vivaldi, Comet | `-webkit-` |
| **Gecko** | Firefox, Zen, Tor Browser | `-moz-` |
| **WebKit** | Safari (y todos los navegadores en iOS) | `-webkit-` |
| **Trident** | Internet Explorer (retirado en 2022) | `-ms-` |

### Navegadores principales

| Navegador | Empresa | Sistemas |
|---|---|---|
| Safari | Apple | macOS, iOS |
| Firefox | Mozilla | macOS, Windows, Linux, Android |
| Chrome | Google | macOS, Windows, Linux, Android, Chrome OS |
| Edge | Microsoft | Windows, macOS, iOS, Android |
| Opera | Opera Software | macOS, Windows, Linux, Android |

### Notas sobre navegadores alternativos

- **Zen y Tor Browser** están basados en Firefox, así que se identifican como Gecko.
- **Tor** reduce la información que expone (huella digital) y puede bloquear `localStorage`, por eso el código usa `try/catch`.
- **Brave, Vivaldi, Comet, Opera y Edge** se basan en Chromium (Blink). Algunos ocultan su nombre en el *user agent*.
- Por eso **no conviene detectar por nombre**: se detecta por **características**.

---

## 6. Teoría: qué es la compatibilidad

> Garantizar que un sitio web ofrezca una **experiencia consistente y de primer nivel** a todos los usuarios, independientemente del navegador que elijan.

Ideas clave:

- Los navegadores usan **motores distintos**, así que por defecto **representan los sitios de forma diferente**.
- Para lograr el mismo aspecto y funcionamiento hay que **conocer las capacidades de cada navegador**.
- Idealmente, el sitio se ve y funciona igual en Blink, Gecko y WebKit.

### Estrategias generales

| Estrategia | Descripción |
|---|---|
| **Mejora progresiva** | Se parte de una base funcional para todos y se añaden mejoras para navegadores modernos. |
| **Degradación elegante** | Se diseña para navegadores modernos y se asegura que en los antiguos siga siendo usable. |
| **Prefijos de proveedor** | `-webkit-`, `-moz-`, `-ms-`, `-o-` para propiedades experimentales. |
| **Consultas de características** | `@supports` (CSS) y `CSS.supports()` (JS). |
| **Reset / Normalize** | Igualan los estilos por defecto de cada navegador. |
| **Consultar documentación** | Can I Use y MDN antes de usar una propiedad nueva. |

---

## 7. Beneficios

| Beneficio | Explicación |
|---|---|
| 🌍 **Alcance más amplio** | El sitio es accesible para más usuarios, sin importar su navegador. |
| 🎯 **Experiencia consistente** | Apariencia y funcionalidad uniformes en todas las plataformas. |
| 🔎 **Mejor SEO** | Un sitio más fácil de usar obtiene mejores clasificaciones. |

---

## 8. Los 9 problemas comunes y sus soluciones

| # | Tema | Problema | Solución |
|---|---|---|---|
| 1 | **Flexbox** | Implementación distinta (sobre todo IE antiguo). | Prefijos, revisar Can I Use y fallback `block` / `inline-block`. |
| 2 | **Grid** | Soporte limitado en navegadores antiguos. | Prefijos y layout alternativo con flex o floats. |
| 3 | **Color** | `rgba()` / `hsla()` en navegadores viejos. | Hexadecimal o color sólido **antes** de la versión moderna. |
| 4 | **Sombras y bordes** | `box-shadow` / `border-radius`. | Prefijos o imágenes de fondo. |
| 5 | **Fuentes** | La carga varía entre navegadores. | WOFF y WOFF2 en `@font-face`. |
| 6 | **Pseudoclases** | `:nth-child`, `:last-child` en navegadores viejos. | Estilos alternativos (clases) o JavaScript. |
| 7 | **Transiciones y animaciones** | Implementación distinta. | Prefijos y estado inicial definido. |
| 8 | **`calc()`** | Comportamiento variable. | Probar y dar valor alternativo antes. |
| 9 | **Margen y espaciado** | Colapso de márgenes inconsistente. | `overflow: auto` en el contenedor o usar `padding`. |

### Ejemplos de código

```css
/* 1. Flexbox con fallback (el estándar va al final) */
.contenedor {
  display: block;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

/* 2. Grid con layout alternativo */
.galeria { display: flex; flex-wrap: wrap; }
@supports (display: grid) {
  .galeria { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
}

/* 3. Color con fallback */
.caja { background-color: #333; background-color: rgba(0, 0, 0, 0.8); }

/* 5. Fuentes en varios formatos */
@font-face {
  font-family: "MiFuente";
  src: url("fuentes/mifuente.woff2") format("woff2"),
       url("fuentes/mifuente.woff") format("woff");
  font-display: swap;
}

/* 8. calc() con alternativa */
.columna { width: 90%; width: calc(100% - 40px); }
```

> ⚠️ **Regla de oro:** la propiedad **estándar va siempre al final**, después de las prefijadas, para que prevalezca donde ya está soportada.

---

## 9. Prueba y depuración

Es esencial **probar el CSS en múltiples navegadores y versiones**.

| Herramienta | Uso |
|---|---|
| **BrowserStack** | Pruebas en navegadores y dispositivos reales en la nube. |
| **Sauce Labs** | Pruebas automatizadas en múltiples entornos. |
| **Can I Use** | Consulta qué navegadores soportan cada propiedad. |
| **DevTools (F12)** | Inspección y depuración dentro del navegador. |
| **MDN Web Docs** | Tablas de compatibilidad (*browser compatibility*). |
| **Autoprefixer** | Agrega prefijos automáticamente según los navegadores objetivo. |

### Checklist

- [ ] Chrome, Firefox, Edge y Safari
- [ ] Versiones recientes y anteriores
- [ ] Móvil (Android / iOS) y escritorio
- [ ] Distintos tamaños de pantalla
- [ ] Fallbacks funcionando al desactivar propiedades modernas

---

## 10. Técnicas aplicadas en este proyecto

| Técnica | Dónde | Qué logra |
|---|---|---|
| `<!DOCTYPE html>` y `lang="es"` | `index.html` | Evita el *quirks mode* y mejora accesibilidad y SEO. |
| `meta viewport` + `viewport-fit=cover` | `index.html` | Diseño responsive y soporte de pantallas con notch. |
| HTML semántico | `index.html` | `header`, `nav`, `main`, `section`, `footer`. |
| Valor fijo **antes** de `var()` | `estilo.css` | Navegadores sin variables CSS usan el fallback. |
| Reset con `box-sizing` prefijado | `estilo.css` | Igualar el modelo de caja. |
| Flexbox base + `@supports (display: grid)` | `estilo.css` | Mejora progresiva del layout. |
| Prefijos `-webkit-`, `-moz-`, `-ms-` | `estilo.css` | Compatibilidad con motores antiguos. |
| `rgba()` con color hexadecimal previo | `estilo.css` | Fallback de color. |
| `calc()` con ancho alternativo | `estilo.css` | Fallback de medida. |
| `@supports not (box-shadow: 0 0 0)` | `estilo.css` | Alternativa si falta la sombra. |
| `prefers-color-scheme` + `data-theme` | `estilo.css` / `app.js` | Modo oscuro automático y manual. |
| `prefers-reduced-motion` | `estilo.css` | Respeta a quien pide menos animación. |
| `env(safe-area-inset-*)` | `estilo.css` | Evita que las barras del móvil tapen el contenido. |
| Media query `max-width: 500px` | `estilo.css` | Ajustes para móviles. |
| IIFE + `'use strict'` | `app.js` | No contamina el ámbito global. |
| JavaScript ES5 (`var`, `function`, `for`) | `app.js` | Corre incluso en navegadores antiguos. |
| `try/catch` en `localStorage` | `app.js` | Funciona en Tor y en modo privado. |
| `CSS.supports()` | `app.js` | Detección de características. |
| `textContent` en lugar de `innerHTML` | `app.js` | Evita inyección de HTML. |
| `<noscript>` | `index.html` | Mensaje si JavaScript está desactivado. |

---

## 11. Repaso: transiciones y transformaciones

| Concepto | Qué hace | Ejemplo |
|---|---|---|
| **Transición** | Cambia una propiedad de forma **gradual**. | `transition: all 0.3s ease;` |
| **Transformación** | Modifica visualmente un elemento. | `transform: translateY(-5px);` |

Funciones de `transform`:

| Función | Efecto |
|---|---|
| `translate()` | Mueve |
| `rotate()` | Gira |
| `scale()` | Agranda o reduce |
| `skew()` | Inclina |

```css
.btn { transition: all .3s ease; }
.btn:hover { transform: translateY(-3px); }
```

---

## 12. Práctica de clase (proyecto PrjSemana11_CSS)

**Objetivo:** construir una página web considerando la compatibilidad entre navegadores.

```
PrjSemana11_CSS/
├── Site Root/
│   ├── css/estilo.css
│   └── index.html
└── Unit Tests/
```

### Pasos

| Paso | Acción |
|---|---|
| 1 | Crear el proyecto con la carpeta `css/` y `index.html`. |
| 2 | Crear `css/estilo.css` y enlazarlo en el `<head>`. |
| 3 | Escribir estilos de `body`, `header, footer` y `button`. |
| 4 | Añadir `button:hover` con sombra y `transform`. |
| 5 | Añadir `@media (max-width: 500px)`. |
| 6 | Abrir en Chrome, Firefox y Edge y comparar. |
| 7 | Reducir la ventana a menos de 500 px y comprobar el cambio. |
| 8 | Usar DevTools (F12) para inspeccionar el botón y `:hover`. |

### CSS de la práctica (versión actual, sin prefijos innecesarios)

```css
body {
    font-family: Arial, sans-serif;
    margin: 10px;
    padding: 0;
    background-color: grey;
    color: white;
}

header, footer {
    background-color: green;
    color: white;
    text-align: center;
    padding: 1em;
    position: relative;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: 1px solid #007bff;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px;
}

button:hover {
    background-color: blue;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}

@media (max-width: 500px) {
    body { background-color: red; }
    header, footer { padding: 0.5em; }
    button { padding: 7px 16px; }
}
```

### Resultado esperado

- Encabezado verde con el título en blanco.
- Párrafo y botón azul redondeado sobre fondo gris.
- Pie verde con "© 2024 Compatibilidad Web".
- En pantallas de 500 px o menos, el fondo cambia a **rojo** (solo demostración visual).

### Ejemplo de `@supports`

```css
.caja {
    border: 2px solid #3498db;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Fallback si el navegador no soporta box-shadow */
@supports not (box-shadow: 0 0 0) {
    .caja {
        background-color: #e7e7e7;
        border: 2px dashed #3498db;
    }
}
```

---

## 13. Preguntas del cierre con respuestas

**1. ¿En qué consiste la compatibilidad entre navegadores?**
En asegurar que un sitio **se vea y funcione de forma consistente** en todos los navegadores, versiones y dispositivos, entendiendo las diferencias entre motores (Blink, Gecko, WebKit) y aplicando prefijos, fallbacks, `@supports` y pruebas.

**2. ¿Cuáles son los beneficios?**
Alcance más amplio, experiencia de usuario consistente y mejor SEO.

**3. ¿Cómo aporta a la formación de un especialista en diseño y desarrollo web?**
- Permite entregar **interfaces profesionales** que funcionan en cualquier entorno.
- Desarrolla el hábito de **probar y depurar**.
- Enseña a **consultar documentación** (Can I Use, MDN).
- Mejora la **accesibilidad e inclusión**.
- Es una competencia **exigida en proyectos reales**.

**Saberes previos: ¿en qué consiste la compatibilidad?**
En lograr que una página funcione igual en distintos navegadores, versiones y dispositivos.

**Utilidad: ¿por qué conocer la compatibilidad de CSS?**
Porque el sitio debe verse y comportarse de forma similar en todos los navegadores. Si no, se rompen diseños, se pierden usuarios, baja la calidad percibida y aumentan los costos de corrección.

---

## 14. Autoevaluación

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | ¿Qué motor usa Firefox? | **Gecko** |
| 2 | ¿Qué regla aplica estilos solo si hay soporte de una propiedad? | **`@supports`** |
| 3 | ¿Qué formatos de fuente se recomiendan? | **WOFF y WOFF2** |
| 4 | ¿Cómo se evita el colapso de márgenes? | **`overflow: auto`** (o usar `padding`) |
| 5 | ¿Qué herramienta prueba en múltiples navegadores en la nube? | **BrowserStack** (también Sauce Labs) |
| 6 | ¿Dónde se consulta el soporte de una propiedad? | **Can I Use** (y MDN) |
| 7 | ¿El Edge actual usa Blink? | **Verdadero** (se basa en Chromium) |
| 8 | ¿Para qué declarar `#333` antes de `rgba()`? | **Fallback**: si no entiende `rgba()`, usa el hexadecimal. |
| 9 | ¿Qué prefijo corresponde a Firefox? | **`-moz-`** |
| 10 | ¿En qué orden van las declaraciones con prefijo? | **Prefijadas primero, estándar al final.** |
| 11 | ¿Qué diferencia hay entre `@media` y `@supports`? | `@media` evalúa el **dispositivo**; `@supports` evalúa el **soporte de CSS**. |
| 12 | ¿Qué diferencia hay entre mejora progresiva y degradación elegante? | La primera parte de lo básico y añade mejoras; la segunda parte de lo moderno y garantiza que lo antiguo siga siendo usable. |
| 13 | ¿Qué hace `translateY(-5px)`? | Mueve el elemento 5 px hacia arriba. |
| 14 | ¿Por qué incluir varios formatos en `@font-face`? | Porque no todos los navegadores soportan todos; usa el primero que entiende. |
| 15 | ¿Qué herramienta agrega prefijos automáticamente? | **Autoprefixer** (con PostCSS y Browserslist). |

---

## 15. Correcciones y buenas prácticas actuales

| Tema | Aclaración |
|---|---|
| **Typo "CCS"** | En la diapositiva de Utilidad debe decir **CSS**. |
| **Internet Explorer** | Fue **retirado en junio de 2022**. Se estudia por razones históricas. |
| **Edge** | El Edge actual usa **Chromium (Blink)**. Solo el Edge antiguo usaba EdgeHTML. |
| **`-ms-border-radius`** | **No existe**. IE9+ soportaba `border-radius` sin prefijo. |
| **Prefijos en `border-radius` y `box-shadow`** | Ya **no son necesarios** en navegadores modernos. |
| **Declaraciones repetidas** | En la práctica aparecen duplicadas `-webkit-border-radius` y `-moz-border-radius`; con una vez basta. |
| **`<title>` por defecto** | "TODO supply a title" es texto de NetBeans: cámbialo. |
| **Prefijos hoy** | Se usan **Autoprefixer** y **Browserslist** en lugar de escribirlos a mano. |
| **Grid con `-ms-`** | Era una implementación antigua y distinta. Hoy Grid funciona en todos los navegadores modernos. |
| **Fondo rojo en móvil** | Es solo demostración. En un proyecto real se ajusta el diseño. |
| **User agent** | Cambia o se oculta en varios navegadores; usa detección de características. |

---

## 16. Glosario

| Término | Definición |
|---|---|
| **Navegador** | Programa que interpreta HTML, CSS y JS y muestra páginas web. |
| **Motor de renderizado** | Componente que convierte el código en la página visible (Blink, Gecko, WebKit). |
| **Chromium** | Proyecto base de Chrome, Edge, Opera, Brave, Vivaldi y Comet. |
| **Prefijo de proveedor** | Texto (`-webkit-`, `-moz-`, `-ms-`, `-o-`) que se añade a propiedades experimentales. |
| **Fallback** | Valor o estilo alternativo si el principal no es soportado. |
| **`@supports`** | Regla CSS que aplica estilos solo si el navegador soporta una característica. |
| **`CSS.supports()`** | Equivalente de `@supports` en JavaScript. |
| **Mejora progresiva** | Parte de lo básico y agrega mejoras para navegadores modernos. |
| **Degradación elegante** | Parte de lo moderno y garantiza que lo antiguo siga siendo usable. |
| **Colapso de márgenes** | Fusión de márgenes verticales adyacentes en un solo valor. |
| **Reset / Normalize** | Hojas de estilo que igualan los valores por defecto de los navegadores. |
| **IIFE** | Función que se ejecuta inmediatamente para aislar variables. |
| **ES5** | Versión de JavaScript compatible con navegadores antiguos. |
| **Can I Use** | Sitio que muestra qué navegadores soportan cada propiedad. |
| **Autoprefixer** | Herramienta que agrega prefijos CSS automáticamente. |
| **DevTools** | Herramientas del navegador para inspeccionar y depurar (F12). |

---

## 17. Plan de estudio paso a paso

| Paso | Qué hacer | Tiempo sugerido |
|---|---|---|
| 1 | Leer las secciones 5 a 7 de este README (teoría). | 15 min |
| 2 | Abrir `index.html` y recorrer la página en tu navegador. | 10 min |
| 3 | Leer `index.html` siguiendo los comentarios PASO 1, 11 a 18. | 10 min |
| 4 | Leer `css/estilo.css` (PASO 2 a 10) y relacionar cada técnica con la tabla de problemas. | 25 min |
| 5 | Leer `js/app.js` (PASO 19 a 25). | 20 min |
| 6 | Abrir DevTools (F12), desactivar propiedades y observar los fallbacks. | 15 min |
| 7 | Probar la página en al menos 2 o 3 navegadores distintos. | 15 min |
| 8 | Responder el quiz de la página y la autoevaluación (sección 14) sin mirar las respuestas. | 15 min |
| 9 | Repetir la práctica de la sección 12 desde cero. | 30 min |
| 10 | Repasar solo lo que fallaste. | 15 min |

### Ejercicios extra

1. Añade un décimo problema al acordeón (por ejemplo, `position: sticky`) con su solución.
2. Agrega una nueva característica a la lista de detección (por ejemplo, `:has()` o `aspect-ratio`).
3. Añade tres preguntas más al arreglo `preguntas` de `app.js`.
4. Cambia la paleta de colores modificando solo las variables de `:root`.
5. Busca en Can I Use el soporte de `backdrop-filter` y compáralo con lo que muestra la página en tu navegador.

---

## 18. Recursos

| Recurso | Para qué sirve |
|---|---|
| [Can I Use](https://caniuse.com) | Soporte de propiedades por navegador. |
| [MDN Web Docs](https://developer.mozilla.org) | Documentación y tablas de compatibilidad. |
| [BrowserStack](https://www.browserstack.com) | Pruebas en navegadores y dispositivos reales. |
| [Sauce Labs](https://saucelabs.com) | Pruebas automatizadas en múltiples entornos. |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | Prefijos automáticos. |
| [Browserslist](https://browsersl.ist) | Define qué navegadores quieres soportar. |

---

📌 **Resumen en una frase:** cada navegador usa un motor distinto, así que hay que **probar en varios, usar fallbacks, detectar características (no nombres) y dejar la propiedad estándar al final**.
