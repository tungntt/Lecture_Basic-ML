if (self.CavalryLogger) { CavalryLogger.start_js(["W5zCI"]); }

__d('AbstractErrorSignal',['invariant','BanzaiODS','ScriptPath','SessionName','SiteData'],(function a(b,c,d,e,f,g,h){'use strict';var i=true;function j(){this.constructor!==j||h(0)}j.prototype.logJSError=function(k,l){l=l||{};l.svn_rev=c('SiteData').client_revision;l.push_phase=c('SiteData').push_phase;l.script_path=c('ScriptPath').getScriptPath();l.extra=l.extra||{};l.extra.hrm=c('SiteData').be_mode;var m=l.extra.type||'error';if(i&&k==='onerror'&&m==='error'){l.extra.extra=l.extra.extra||[];l.extra.extra.push('first_error');i=false}var n=(c('SessionName').getName()||'-')+'/-';this.sendErrorSignal('javascript_error',JSON.stringify({c:k,a:n,m:l}))};j.prototype.sendBeaconErrorSignal=function(){var k='beacon_error',l=(c('SessionName').getName()||'-')+'/-',m={};m.error=k;m.svn_rev=c('SiteData').client_revision;m.push_phase=c('SiteData').push_phase;m.script_path=c('ScriptPath').getScriptPath();m.extra={message:k,type:'info'};this.sendErrorSignal(k,JSON.stringify({c:k,a:l,m:m}))};j.prototype.sendErrorSignal=function(k,l){this.performCounterLogging(k);switch(k){case 'async_error':var m=JSON.parse(l),n=m.err_code,o=m.path;if(n in {'1004':1,'12029':1,'12031':1,'12152':1}&&o.indexOf('scribe_endpoint.php')==-1)this.performSignalLogging(k,l);break;default:this.performSignalLogging(k,l);}};j.prototype.performCounterLogging=function(k){c('BanzaiODS').bumpEntityKey('js_error_reporting','error_signal.category.'+k);switch(k){case 'beacon_error':c('BanzaiODS').bumpEntityKey('js_error_reporting','beacon_error_signal.sent');break;case 'javascript_error':c('BanzaiODS').bumpEntityKey('js_error_reporting','error_signal.sent');break;}};j.prototype.performSignalLogging=function(k,l){h(0)};f.exports=j}),null);
__d("XJavaScriptLogviewSiteCategory",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({MBASIC:"m_basic",MTOUCH:"m_touch",WWW:"www"})}),null);
__d('ErrorSignal',['AbstractErrorSignal','AsyncRequest','AsyncSignal','BanzaiODS','ErrorSignalConfig','XJavaScriptLogviewSiteCategory','emptyFunction'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('AbstractErrorSignal'));i=h&&h.prototype;j.prototype.performCounterLogging=function(l){'use strict';i.performCounterLogging.call(this,l);switch(l){case 'javascript_error':c('BanzaiODS').bumpEntityKey('js_error_reporting','error_signal.'+c('XJavaScriptLogviewSiteCategory').WWW+'.sent');break;}};j.prototype.performSignalLogging=function(l,m){'use strict';switch(l){case 'async_error':new (c('AsyncRequest'))().setURI(c('ErrorSignalConfig').uri).setData({c:'async_error',m:m}).setMethod('GET').setReadOnly(true).setOption('suppressEvaluation',true).setOption('suppressErrorAlerts',true).setHandler(c('emptyFunction')).setErrorHandler(c('emptyFunction')).send(true);break;default:new (c('AsyncSignal'))(c('ErrorSignalConfig').uri,{c:l,m:m}).send();break;}};function j(){'use strict';h.apply(this,arguments)}var k=new j();f.exports=k;b.ErrorSignal=k}),null);
__d('ErrorLogging',['ErrorSignal','ErrorUtils','JSErrorExtra','JSErrorLoggingConfig','JSErrorPlatformColumns','throttle'],(function a(b,c,d,e,f,g){function h(n){var o=n.extra||{},p={};Object.keys(c('JSErrorExtra')).forEach(function(q){if(c('JSErrorExtra')[q])p[q]=true;});Object.keys(o).forEach(function(q){if(o[q]){p[q]=true}else if(p[q])delete p[q];});n.extra=Object.keys(p)}function i(n){if(c('JSErrorPlatformColumns').app_id!==undefined)n.app_id=c('JSErrorPlatformColumns').app_id;if(c('JSErrorPlatformColumns').access_token!==undefined)n.access_token=c('JSErrorPlatformColumns').access_token;}function j(n){h(n);i(n);var o=n.category||'onerror';c('ErrorSignal').logJSError(o,{error:n.name||n.message,extra:n})}var k=c('JSErrorLoggingConfig').reportInterval,l=k>0?c('throttle')(j,k,null):j;function m(n){if(n.message&&n.message.toLowerCase().startsWith('script error'))return;l(n)}c('ErrorUtils').addListener(m);f.exports={defaultJSErrorHandler:m}}),null);