function error(msg) {
  var version = "3.0.1c";
  var now = new Date();
  var dUrl = '';
  if (top === self) dUrl = window.location.href;
  else dUrl = document.referrer;
  if (dUrl === "") dUrl = parent.document.location.href;
  var content = [now, version, msg, dUrl].join('|');
  content += '|' + navigator.userAgent;
  var errorUrl = "//its.tradelab.fr/?type=debug&content=" + encodeURIComponent(content);
  var img = new Image();
  img.src = errorUrl;
  if ( typeof console != "undefined" ) console.log(content);
}
try { 
(function(){

var hasTM = true;
if (typeof tldc == 'undefined') {
  window.tldc = {};
  hasTM = false;
}
if ( typeof tldc.lSc == 'undefined') {
  tldc.wSc=window.document.getElementsByTagName('script'); 
  tldc.lSc=tldc.wSc[tldc.wSc.length-1];
}
if ( typeof tldc.params == 'undefined') tldc.params = {};
if ( typeof tldc.params.fsegs == 'undefined') tldc.params.fsegs = {};
if ( typeof tldc.advid == 'undefined' ) tldc.advid = '296753';
if ( typeof tldc.funnelSegments == 'undefined' ) tldc.funnelSegments = {};
if ( typeof tldc.funnelSegments['932'] == 'undefined' ) {
  tldc.funnelSegments['932'] = [];
  var n=0;
	tldc.funnelSegments['932'][n++] = { 'seg':'4944630', 	'step':1, 'ievs':'0', 'conv':'694963' };
	tldc.funnelSegments['932'][n++] = { 'seg':'4944637', 	'step':2, 'ievs':'0', 'conv':'694964' };
	tldc.funnelSegments['932'][n++] = { 'seg':'4944638', 	'step':3, 'ievs':'0', 'conv':'694965' };
	tldc.funnelSegments['932'][n++] = { 'seg':'5581880', 	'step':4, 'ievs':'5581809', 'conv':'732523' };
	tldc.funnelSegments['932'][n++] = { 'seg':'5581887', 	'step':5, 'ievs':'5581811', 'conv':'732524' };
	tldc.funnelSegments['932'][n++] = { 'seg':'5276693', 	'step':6, 'ievs':'5581812', 'conv':'0' };

}

tl_async_loader=function(a){function d(b,c){var d=a.createElement(b),e;for(e in c)c.hasOwnProperty(e)&&d.setAttribute(e,c[e]);return d}function e(){var b=navigator.userAgent;f={async:!0===a.createElement("script").async};(f.webkit=/AppleWebKit\//.test(b))||(f.ie=/MSIE|Trident/.test(b))||(f.opera=/Opera/.test(b))||(f.gecko=/Gecko\//.test(b))||(f.unknown=!0)}function b(k,m,q,t,u){var v=function(){var a=h[k],c,d;a&&(c=a.callback,d=a.urls,d.shift(),pollCount=0,d.length||(c&&c.call(a.context,a.obj),h[k]=
null,n[k].length&&b(k)))},r=[],g,p,l,w;f||e();if(m)if(m="string"===typeof m?[m]:m.concat(),f.async||f.gecko||f.opera)n[k].push({urls:m,callback:q,obj:t,context:u});else for(g=0,p=m.length;g<p;++g)n[k].push({urls:[m[g]],callback:g===p-1?q:null,obj:t,context:u});if(!h[k]&&(w=h[k]=n[k].shift())){c||(c=a.head||a.getElementsByTagName("head")[0]);m=w.urls.concat();g=0;for(p=m.length;g<p;++g)q=m[g],l=d("script",{src:q}),l.async=!1,l.className="lazyload",l.setAttribute("charset","utf-8"),f.ie&&"onreadystatechange"in
l&&!("draggable"in l)?l.onreadystatechange=function(){/loaded|complete/.test(l.readyState)&&(l.onreadystatechange=null,v())}:l.onload=l.onerror=v,r.push(l);g=0;for(p=r.length;g<p;++g)"object"==typeof tldc.lSc&&"object"==tldc.lSc.parentNode&&"function"==tldc.lSc.parentNode.insertBefore?tldc.lSc.parentNode.insertBefore(r[g],tldc.lSc):c.appendChild(r[g])}}var f,c,h={},n={js:[]};return{js:function(a,c,d,e){b("js",a,c,d,e)}}}(this.document);
function tl_getStoredStep(a){return"undefined"==typeof tldc.params.fsegs?0:"undefined"==typeof tldc.params.fsegs[a]?0:tldc.params.fsegs[a]}function tl_storeStep(a,d){tldc.params.fsegs[d]=a;"function"===typeof tldc.tl_setParamsCookie&&tldc.tl_setParamsCookie(tldc.params)}function getFunnelStepData(a,d){for(var e={},b=0;b<d.length;b++){var f=d[b];if(f.seg==a)return e.step=f.step,e.i=b,e}return{step:!1,i:!1}}
function insertInDom(a){var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(a,d)}function firePixel(a,d){var e=document.createElement("img"),b;e.style.position="absolute";e.style.height=0;e.style.width=0;b=document.location.protocol;b="https:"===b?b+"//secure.adnxs.com/":b+"//ib.adnxs.com/";e.src="undefined"==typeof d?b+"seg?add="+a+"&t=2":b+"seg?add="+a+":"+d+"&t=2";insertInDom(e)}function contains(a,d){for(var e=a.length;e--;)if(a[e]===d)return!0;return!1}
function tl_getLocation(){var a;a=top===self?window.location.href:document.referrer;""===a&&(a=parent.document.location.href);return a}
function fireFSEGVal(a,d,e,b,f,c){var h=document.createElement("img"),n=navigator.userAgent,k=tl_getLocation();"undefined"===typeof tldc.tl_getAnalyticsData&&"function"===typeof tl_getAnalyticsData&&(tldc.tl_getAnalyticsData=tl_getAnalyticsData);c=c?"&isregen=1&ua="+encodeURIComponent(encodeURIComponent(n))+"&ur="+encodeURIComponent(encodeURIComponent(k)):"&isregen=0&ua="+encodeURIComponent(encodeURIComponent(n))+"&ur="+encodeURIComponent(encodeURIComponent(k));"function"===typeof tldc.tl_getAnalyticsData&&
(c+="&adata="+tldc.tl_getAnalyticsData());h.style.position="absolute";h.style.height=0;h.style.width=0;a="object"==typeof tldc.ses&&"string"==typeof tldc.ses.uuid2&&""!=tldc.ses.uuid2?"//its.tradelab.fr/?type=fseg&uuid2="+tldc.ses.uuid2+"&sid="+a+"&val="+d+"&fun="+f+"&step="+b+"&siev="+e+"&fp="+fingerprint+"&advid="+tldc.advid+c:"//ib.adnxs.com/getuid?//its.tradelab.fr/?type=fseg&uuid2=$UID&sid="+a+"&val="+d+"&fun="+f+"&step="+b+"&siev="+e+"&fp="+fingerprint+"&advid="+tldc.advid+c;"undefined"!==typeof tldc.uuid&&
"0"!==tldc.uuid&&(a+="&uuid="+tldc.uuid);h.src=a;insertInDom(h)}
function processFunnelSegVal(a,d,e,b){if(!1===hasTM)void 0!==a&&firePixel(a,d);else{var f=getFunnelStepData(a,b),c=f.i,f=f.step;if(!1===f)return firePixel(a,d),hasTM&&fireFSEGVal(a,d,0,0,e,!1),!0;var h=getFunnelStepData(tl_getStoredStep(e),b).step;!1===h||h<f?("0"!=b[c].conv?tl_async_loader.js("//cdn.tradelab.fr/conv/"+b[c].conv+".js",function(){"undefined"!=typeof b[c].seg&&(firePixel(b[c].seg,d),hasTM&&fireFSEGVal(b[c].seg,d,b[c].ievs,b[c].step,e,!1))}):"undefined"!=typeof b[c].seg&&(firePixel(b[c].seg,
d),hasTM&&fireFSEGVal(b[c].seg,d,b[c].ievs,b[c].step,e,!1)),tl_storeStep(a,e)):"0"!=b[c].conv?tl_async_loader.js("//cdn.tradelab.fr/conv/"+b[c].conv+".js",function(){"undefined"!=typeof b[c].seg&&(firePixel(b[c].seg,d),hasTM&&fireFSEGVal(b[c].seg,d,b[c].ievs,b[c].step,e,!1))}):"undefined"!=typeof b[c].seg&&(firePixel(b[c].seg,d),hasTM&&fireFSEGVal(b[c].seg,d,b[c].ievs,b[c].step,e,!1));return!0}}
tldc.tl_getCookie=function(a){return(a=(new RegExp("(^|;)[ ]*"+a+"=([^;]*)")).exec(document.cookie))?a[2]:0};tldc.tl_loadUUIDCookie=function(){var a=tldc.tl_getCookie("_tli");return a?a:"0"};"undefined"!=typeof document.cookie&&(tldc.uuid=tldc.tl_loadUUIDCookie());

var qs = {}, fingerprint = '0';
if (typeof tldc.tlfseg == 'undefined') tldc.tlfseg = {};
var scriptTags = document.getElementsByTagName("script");
for (var i = 0; i < scriptTags.length; i++) {
  var scriptTag = scriptTags[i],
      ssrc = scriptTag.getAttribute("src");
  //console.log('src:'+scriptTag.getAttribute("src"));
  if (undefined !== ssrc && null !== ssrc && ssrc.indexOf('fseg') !== -1 && ssrc.indexOf('932.js') !== -1) {  	
  	ssrc.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) {
	    qs[$1] = $3;
	  });
	  //console.log('qs.add:'+qs.add);
    if ( typeof qs.add != 'undefined' ) {
    //console.log('tlfseg:'+JSON.stringify(tldc.tlfseg));
    	if ( typeof tldc.tlfseg[qs.add] === 'undefined' ) {	    		  		
    		if ( processFunnelSegVal(qs.add,qs.val,'932',tldc.funnelSegments['932']) ) tldc.tlfseg[qs.add] = 1;  
    	}
    }
  }
}

})();

} catch(err) { error('fseg3c|'+err.message); }