(function(){
function _uuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){d += performance.now();}
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
window.isOK = function(msg){ console.log(msg); };
window.sessionId = _uuid();
with(document)[0][getElementsByTagName('script')[0].parentNode.appendChild(createElement('script')).src='//pws.tongfudun.com/did/js/dp.js?appId=5282868&sessionId='+sessionId+'&ts='+new Date().getTime()+'&callback=isOK',0];
})();

