/* SQL practice worker: a small in-memory SQLite database that is rebuilt on every Run, so nothing can be broken. */
importScripts('../vendor/sqljs/sql-wasm.js');
var SQLP = null;
function seed(db) {
  var counties = ['Meru', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
  var names = ['Amina', 'Brian', 'Cynthia', 'David', 'Esther', 'Felix', 'Grace', 'Hassan', 'Irene', 'James', 'Kevin', 'Lucy'];
  var products = [['Tea 500g', 'Grocery', 250], ['Sugar 2kg', 'Grocery', 320], ['Bread', 'Grocery', 65], ['Notebook', 'Stationery', 90], ['Pen box', 'Stationery', 300], ['Phone charger', 'Electronics', 650], ['Earphones', 'Electronics', 800], ['Soap bar', 'Household', 120]];
  db.run('CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, county TEXT);');
  db.run('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL);');
  db.run('CREATE TABLE sales (id INTEGER PRIMARY KEY, sale_date TEXT, customer_id INTEGER, product_id INTEGER, qty INTEGER);');
  names.forEach(function (n, i) { db.run('INSERT INTO customers VALUES (?,?,?)', [i + 1, n, counties[i % counties.length]]); });
  products.forEach(function (p, i) { db.run('INSERT INTO products VALUES (?,?,?,?)', [i + 1, p[0], p[1], p[2]]); });
  var seedv = 7;
  function rnd(n) { seedv = (Math.imul(seedv, 1664525) + 1013904223) >>> 0; return (seedv >>> 8) % n; }
  for (var i = 1; i <= 80; i++) {
    var m = 1 + rnd(6), d = 1 + rnd(28);
    db.run('INSERT INTO sales VALUES (?,?,?,?,?)', [i, '2026-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d, 1 + rnd(12), 1 + rnd(8), 1 + rnd(5)]);
  }
}
onmessage = function (e) {
  var m = e.data;
  var go = function () {
    var db = new SQLP.Database();
    try {
      seed(db);
      var res = db.exec(m.sql);
      postMessage({ type: 'done', ok: true, results: res.slice(0, 20).map(function (r) { return { columns: r.columns, values: r.values.slice(0, 200), total: r.values.length }; }) });
    } catch (err) {
      postMessage({ type: 'done', ok: false, error: String(err && err.message || err) });
    } finally { db.close(); }
  };
  if (SQLP) return go();
  initSqlJs({ locateFile: function (f) { return new URL('../vendor/sqljs/' + f, self.location.href).href; } }).then(function (S) { SQLP = S; go(); }, function (err) { postMessage({ type: 'done', ok: false, error: 'Could not start SQL: ' + err }); });
};
