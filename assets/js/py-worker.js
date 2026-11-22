/* Runs learner Python code in a Web Worker so the page never freezes and "Stop" always works.
   Python (Pyodide) is served from this site (assets/vendor/pyodide), so nothing is sent anywhere
   and the code can only touch this browser tab's own sandbox.
   Loaded as a module worker: new Worker(url, { type: 'module' }). */
import { loadPyodide } from '../vendor/pyodide/pyodide.mjs';

var pyodide = null;

function post(m) { self.postMessage(m); }

self.onmessage = function (e) {
  var m = e.data;
  if (m && m.type === 'run') run(m);
};

async function init(indexURL) {
  pyodide = await loadPyodide({ indexURL: indexURL });
}

function cleanError(msg) {
  var lines = String(msg).split('\n');
  var i = -1;
  for (var k = 0; k < lines.length; k++) { if (lines[k].indexOf('File "<exec>"') !== -1) { i = k; break; } }
  var out = i === -1 ? lines : ['Traceback (most recent call last):'].concat(lines.slice(i));
  return out.join('\n').replace(/File "<exec>"/g, 'File "your_program.py"').trim();
}

async function run(m) {
  try {
    if (!pyodide) { post({ type: 'status', s: 'loading' }); await init(m.indexURL); }
    post({ type: 'started' });
    var lines = (m.stdin || []).slice();
    var dec = new TextDecoder();
    pyodide.setStdout({ write: function (buf) { post({ type: 'out', text: dec.decode(buf) }); return buf.length; } });
    pyodide.setStderr({ write: function (buf) { post({ type: 'out', text: dec.decode(buf), err: true }); return buf.length; } });
    pyodide.setStdin({
      stdin: function () {
        if (!lines.length) return undefined; // end of input -> Python raises EOFError
        var l = lines.shift();
        post({ type: 'out', text: l + '\n' }); // show the typed answer, like a real terminal
        return l;
      }
    });
    var globals = pyodide.globals.get('dict')();
    try {
      await pyodide.runPythonAsync(m.code, { globals: globals });
      post({ type: 'done', ok: true });
    } finally {
      globals.destroy();
    }
  } catch (err) {
    post({ type: 'done', ok: false, error: cleanError(err && err.message ? err.message : err) });
  }
}
