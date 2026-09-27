/* Independent ES5 startup guard: remains usable if the game script cannot parse. */
(function () {
  var errors = [], failed = false, ready = false;
  var safe = /[?&]safe=1(?:&|$)/.test(location.search);
  function el(id) { return document.getElementById(id); }
  function report(stage) { try { if (window.WissNative && window.WissNative.bootStage) window.WissNative.bootStage(stage); } catch (_) {} }
  function stage(name, percent) {
    if (failed) return;
    el('bootStatus').textContent = name;
    el('bootProgress').style.width = percent + '%';
    report(name);
  }
  function fail(reason) {
    failed = true; clearTimeout(watchdog);
    var message = String(reason && reason.message || reason || 'Unknown startup error');
    errors.push(message); if (errors.length > 50) errors.shift();
    console.error('[SuperWissBoot] ' + message);
    el('bootScreen').hidden = false;
    el('bootStatus').textContent = ready ? 'The adventure was interrupted.' : 'Startup could not finish.';
    el('bootError').textContent = message;
    el('bootRecovery').hidden = false;
    el('bootEnter').hidden = true;
    report('Startup error');
  }
  var watchdog = setTimeout(function () { fail('Startup timed out. Try again, or choose Safe Mode. Your saved progress will be kept.'); }, 40000);
  window.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'SCRIPT') fail('Missing game script: ' + e.target.src);
    else if (e.message) fail(e.message + ' (' + (e.filename || 'game') + ':' + e.lineno + ')');
  }, true);
  window.addEventListener('unhandledrejection', function (e) { fail(e.reason || 'Unhandled startup failure'); });
  el('bootRetry').onclick = function () { location.reload(); };
  el('bootSafe').onclick = function () { location.href = location.pathname + '?safe=1'; };
  window.SuperWissBoot = {
    safe: safe, errors: errors, stage: stage, fail: fail,
    get failed() { return failed; },
    finish: function () {
      if (failed) return;
      ready = true; clearTimeout(watchdog);
      stage('Home screen', 100);
      el('bootStatus').textContent = safe ? 'Safe Mode · reduced graphics, sound off, saves read-only' : 'Ready · offline adventure';
      el('bootEnter').hidden = false;
      el('bootEnter').onclick = function () { el('bootScreen').hidden = true; window.dispatchEvent(new Event('boot-enter')); };
    }
  };
  stage('Boot', 3);
}());
