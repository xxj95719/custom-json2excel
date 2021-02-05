!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).customJson2excel=e()}(this,function(){"use strict";function t(t){var e=t.data,o=void 0===e?[]:e,n=t.orderedKey,r=void 0===n?[]:n,i=t.filters,a=void 0===i?[]:i,s=t.title,l=void 0===s?[]:s,c=t.footer,e=void 0===c?[]:c,n=t.keyMap,i=void 0===n?{}:n,s=t.name,c=void 0===s?"excel":s,n=t.type,s=void 0===n?"xls":n,n=t.onStart,n=void 0===n?function(){}:n,t=t.onSuccess,t=void 0===t?function(){}:t;this.data=o,this.filters=a,this.footer=e,this.orderedKey=r,this.keyMap=i,this.name=c,this.title=l,this.type=s,this.onStart=n,this.onSuccess=t}return t.prototype.toChsKeys=function(t,s){var l=this,c={};return t.map(function(t){if(l.orderedKey.length)for(var e=0,o=l.orderedKey;e<o.length;e++){var n=o[e];s.hasOwnProperty(n)?c[s[n]]=t[n]:c[n]=t[n]}else if(l.filters.length)for(var r=0,i=l.filters;r<i.length;r++)for(a in delete t[i[r]],t)s.hasOwnProperty(a)?c[s[a]]=t[a]:c[a]=t[a];else for(var a in t)s.hasOwnProperty(a)?c[s[a]]=t[a]:c[a]=t[a];return c})},t.prototype.generate=function(){if(this.data.length){this.onStart();var t=this.getProcessedJson(this.data),t=this.toChsKeys(t,this.keyMap);return"csv"==this.type?this.export(this.jsonToCSV(t),this.name+"."+this.type,"application/csv"):this.export(this.jsonToXLS(t),this.name+"."+this.type,"application/vnd.ms-excel")}},t.prototype.download=function(t,e){var o;window.navigator.msSaveOrOpenBlob?navigator.msSaveOrOpenBlob(t,e):(o=document.createElement("a"),t=window.URL.createObjectURL(t),o.href=t,o.setAttribute("download",e),o.innerHTML="downloading...",o.style.display="none",document.body.appendChild(o),setTimeout(function(){o.click(),document.body.removeChild(o),setTimeout(function(){self.URL.revokeObjectURL(o.href)},250)},66))},t.prototype.export=function(o,n,r){var i=this;new Promise(function(t){var e=i.base64ToBlob(o,r);t(i.download(e,n))}).then(function(){i.onSuccess()}).catch(function(){})},t.prototype.jsonToXLS=function(t){var e,n="<thead><tr>";if(this.title.length){for(var o=0,r=this.title;o<r.length;o++){var i=r[o];n+="<th colspan="+i.colspan+">"+i.name}n+="<th></tr>"}for(e in t[0])n+="<th>"+e+"</th>";if(n+="</tr></thead>",n+="<tbody>",t.map(function(t,e){for(var o in n+="<tbody><tr>",t)n+="<td>"+t[o]+"</td>";n+="</tr></tbody>"}),0!=this.footer.length){n+="<tfooter><tr>";for(var a=0,s=this.footer;a<s.length;a++){i=s[a];n+="<th colspan="+i.colspan+">"+i.name}n+="<th></tr></tr></tfooter>"}return'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>${table}</table></body></html>'.replace("${table}",n)},t.prototype.jsonToCSV=function(t){var e,n="";if(0!=this.title.length){for(var o=0,r=this.title;o<r.length;o++){var i=r[o];n+=""+i.name}n+="\r\n"}for(e in t[0])n+=e+",";if(n=n.slice(0,n.length-1),n+="\r\n",t.map(function(t){for(var e in t){var o=t[e]+"";o.match(/[,"\n]/)&&(o='"'+o.replace(/\"/g,'""')+'"'),n+=o+","}n=n.slice(0,n.length-1),n+="\r\n"}),0!=this.footer.length){for(var a=0,s=this.footer;a<s.length;a++){i=s[a];n+=""+i.name}n+="\r\n"}return n},t.prototype.getProcessedJson=function(t){var r=this,i=this.getKeys(t),a=[];return t.map(function(t){var e,o={};for(e in i){var n=i[e];o[e]=r.getNestedData(n,t)}a.push(o)}),a},t.prototype.getKeys=function(t){var e,o={};for(e in t[0])o[e]=e;return o},t.prototype.parseExtraData=function(t,e){var o="";if(Array.isArray(t))for(var n=0;n<t.length;n++)o+=e.replace("${data}",t[n]);else o+=e.replace("${data}",t);return o},t.prototype.callItemCallback=function(t,e){return"object"==typeof t&&"function"==typeof t.callback?t.callback(e):e},t.prototype.getNestedData=function(t,e){for(var o=null,n=("object"==typeof t?t.field:t).split("."),o=e[n[0]],r=1;r<n.length;r++)o=o[n[r]];return o=null==(o=this.callItemCallback(t,o))?"":o},t.prototype.base64ToBlob=function(t,e){for(var t=window.btoa(window.unescape(encodeURIComponent(t))),o=atob(t),n=o.length,r=new Uint8ClampedArray(n);n--;)r[n]=o.charCodeAt(n);return new Blob([r],{type:e})},t});
