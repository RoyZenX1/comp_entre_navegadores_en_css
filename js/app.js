/* ARCHIVO: js/app.js · JavaScript ES5 para máxima compatibilidad.
   Los comentarios PASO 19 a PASO 25 explican cada bloque. */
/* PASO 19 · JAVASCRIPT ES5.
   ESTUDIO: se usa var, function y bucles for (sin flechas, let ni const) para que corra también en navegadores viejos.
   Todo va en una función autoejecutable (IIFE) para no ensuciar el ámbito global. */
(function () {
  'use strict';

  /* Utilidad: crear elementos con texto (textContent evita inyección de HTML) */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (text) { e.textContent = text; }
    return e;
  }

  /* PASO 20 · Almacenamiento seguro. ESTUDIO: modo privado/Tor pueden bloquear localStorage → try/catch siempre. */
  function guardar(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function leer(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }

  /* PASO 21 · Tema claro/oscuro */
  var root = document.documentElement;
  var t = leer('tema');
  if (t) { root.setAttribute('data-theme', t); }
  document.getElementById('tema').addEventListener('click', function () {
    var oscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var actual = root.getAttribute('data-theme') || (oscuro ? 'dark' : 'light');
    var nuevo = actual === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nuevo);
    guardar('tema', nuevo);
  });

  /* PASO 22 · Detección aproximada del navegador y motor (solo informativa) */
  function detectar() {
    var ua = navigator.userAgent, n = 'Desconocido', m = 'Desconocido';
    if (/Edg\//.test(ua)) { n = 'Edge'; m = 'Blink'; }
    else if (/OPR\//.test(ua)) { n = 'Opera'; m = 'Blink'; }
    else if (/Vivaldi/.test(ua)) { n = 'Vivaldi'; m = 'Blink'; }
    else if (/Firefox\//.test(ua)) { n = 'Firefox / Zen / Tor'; m = 'Gecko'; }
    else if (/Chrome\/|Chromium\//.test(ua)) { n = 'Chrome / Brave / Comet'; m = 'Blink'; }
    else if (/Safari\//.test(ua)) { n = 'Safari'; m = 'WebKit'; }
    else if (/Trident|MSIE/.test(ua)) { n = 'Internet Explorer'; m = 'Trident'; }
    /* Brave expone navigator.brave */
    if (navigator.brave && typeof navigator.brave.isBrave === 'function') { n = 'Brave'; m = 'Blink'; }
    return { nombre: n, motor: m };
  }
  var d = detectar();
  document.getElementById('info').textContent =
    'Detectado: ' + d.nombre + ' · motor ' + d.motor + ' · ancho ' + window.innerWidth + 'px';

  /* PASO 23 · Detección de características (la forma correcta).
     ESTUDIO: CSS.supports() es el equivalente en JS de @supports. Si no existe, se indica "sin dato". */
  function soporta(p, v) {
    if (window.CSS && typeof window.CSS.supports === 'function') { return window.CSS.supports(p, v); }
    return null;
  }
  var pruebas = [
    ['Flexbox', 'display', 'flex'],
    ['Grid', 'display', 'grid'],
    ['Variables CSS', '--x', '0'],
    ['calc()', 'width', 'calc(1px + 1px)'],
    ['rgba()', 'color', 'rgba(0,0,0,.5)'],
    ['box-shadow', 'box-shadow', '0 0 1px #000'],
    ['border-radius', 'border-radius', '4px'],
    ['transform', 'transform', 'translateY(1px)'],
    ['transition', 'transition', 'all 1s'],
    ['backdrop-filter', 'backdrop-filter', 'blur(2px)']
  ];
  var cont = document.getElementById('feat');
  for (var i = 0; i < pruebas.length; i++) {
    var r = soporta(pruebas[i][1], pruebas[i][2]);
    var item = el('div', 'item');
    item.appendChild(el('strong', '', pruebas[i][0] + ' '));
    item.appendChild(el('span', 'tag ' + (r ? 'ok' : 'no'), r === null ? 'sin dato' : (r ? 'soportado' : 'no soportado')));
    cont.appendChild(item);
  }

  /* PASO 24 · Checklist de pruebas (con memoria de avance) */
  var tareas = ['Probar en Chrome, Firefox, Edge y Safari', 'Probar versiones recientes y anteriores',
    'Probar en móvil (Android/iOS) y escritorio', 'Probar distintos tamaños de pantalla',
    'Desactivar propiedades en DevTools y comprobar los fallbacks', 'Consultar Can I Use antes de usar una propiedad nueva'];
  var lista = document.getElementById('lista');
  tareas.forEach(function (txt, idx) {
    var li = el('li'), lb = el('label'), cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = leer('tarea' + idx) === '1';
    cb.addEventListener('change', function () { guardar('tarea' + idx, cb.checked ? '1' : '0'); });
    lb.appendChild(cb);
    lb.appendChild(document.createTextNode(' ' + txt));
    li.appendChild(lb);
    lista.appendChild(li);
  });

  /* PASO 25 · Quiz. ESTUDIO: cada pregunta repasa un concepto de la guía. */
  var preguntas = [
    { q: '¿Qué motor de renderizado usa Firefox (y Zen)?', o: ['Blink', 'Gecko', 'WebKit'], a: 1, e: 'Gecko. Blink es de Chromium y WebKit de Safari.' },
    { q: '¿Qué regla aplica estilos solo si el navegador soporta una propiedad?', o: ['@media', '@import', '@supports'], a: 2, e: '@supports evalúa soporte; @media evalúa el dispositivo.' },
    { q: '¿Dónde va la propiedad estándar respecto a las prefijadas?', o: ['Al final', 'Al principio', 'No importa'], a: 0, e: 'Al final, para que prevalezca donde ya está soportada.' },
    { q: '¿Qué formatos de fuente se recomiendan en @font-face?', o: ['PNG y JPG', 'WOFF y WOFF2', 'MP3 y WAV'], a: 1, e: 'Son formatos web comprimidos y muy soportados.' },
    { q: '¿Cómo se evita el colapso de márgenes?', o: ['overflow: auto', 'display: none', 'z-index: 1'], a: 0, e: 'overflow:auto en el contenedor (o usar padding).' },
    { q: 'Brave, Vivaldi, Opera y Comet comparten motor con…', o: ['Chrome (Blink)', 'Safari (WebKit)', 'Firefox (Gecko)'], a: 0, e: 'Todos se basan en Chromium, por eso se comportan casi igual.' }
  ];
  var quiz = document.getElementById('quiz'), prog = document.getElementById('prog');
  var pos = 0, aciertos = 0;

  function mostrar() {
    quiz.innerHTML = '';
    prog.style.width = Math.round((pos / preguntas.length) * 100) + '%';
    if (pos >= preguntas.length) {
      quiz.appendChild(el('p', '', 'Resultado: ' + aciertos + ' de ' + preguntas.length + ' correctas.'));
      var b = el('button', 'btn', 'Repetir');
      b.type = 'button';
      b.addEventListener('click', function () { pos = 0; aciertos = 0; mostrar(); });
      quiz.appendChild(b);
      return;
    }
    var p = preguntas[pos], fb = el('p', 'muted'), bloqueado = false;
    quiz.appendChild(el('p', '', (pos + 1) + '/' + preguntas.length + ' · ' + p.q));
    p.o.forEach(function (txt, k) {
      var btn = el('button', 'opt', txt);
      btn.type = 'button';
      btn.addEventListener('click', function () {
        if (bloqueado) { return; }
        bloqueado = true;
        if (k === p.a) { aciertos++; btn.className = 'opt good'; fb.textContent = '✔ Correcto. ' + p.e; }
        else { btn.className = 'opt bad'; fb.textContent = '✘ Incorrecto. ' + p.e; }
        var sig = el('button', 'btn', 'Siguiente');
        sig.type = 'button';
        sig.addEventListener('click', function () { pos++; mostrar(); });
        quiz.appendChild(sig);
      });
      quiz.appendChild(btn);
    });
    quiz.appendChild(fb);
  }
  mostrar();
})();
