"use strict";function ln(t){return limitedEval("log("+t+")/log(e)")}function degrees(t){return limitedEval(t+"deg")}function lev(t){return limitedEval(t+"!")}function calculator(t){if(console.log("Calculating: "+t),"INVALID"==t)return"INVALID";t=t.replace(/π/g,"pi");try{if(""==t)return"";var e=limitedEval(t);if("NaN"==e)throw"Error!";return(e+"").length>=17?e.toPrecision(15)+"":e+""}catch(t){return alert("What you typed in is not a valid formula, please try again"),"INVALID"}}function clearInfo(){2*$("#info").height()+600>window.innerHeight?$("#info").hasClass("animeIn")&&$("#info").removeClass("animeIn").addClass("animeOut"):$("#info").hasClass("animeOut")&&$("#info").removeClass("animeOut").addClass("animeIn")}math.config({number:"BigNumber"});var limitedEval=math.eval;math.import({ln:ln,degrees:degrees,lev:lev}),math.import({import:function(){throw new Error("Function import is disabled")},createUnit:function(){throw new Error("Function createUnit is disabled")},eval:function(){throw new Error("Function eval is disabled")},parse:function(){throw new Error("Function parse is disabled")},simplify:function(){throw new Error("Function simplify is disabled")},derivative:function(){throw new Error("Function derivative is disabled")}},{override:!0}),$(document).ready(function(){function t(){o=0}function e(){for(;o>0;--o)r.textContent+=")"}function n(t){++o,r.textContent+=t+"("}function a(t){r.textContent+=t}function i(t){$("#equation").removeClass("animation").removeClass("s0").addClass("s1"),$("#result").removeClass("animation").removeClass("s1").addClass("s0"),void 0!=t&&setTimeout(t,50)}clearInfo(),$(window).resize(clearInfo);var o=0,s=!1,r=document.getElementById("equation"),l=document.getElementById("result");$("#result").addClass("s0").addClass("animation"),$("#equation").addClass("s1").addClass("animation");var c=function(){$("#equation").removeClass("s1").addClass("animation").addClass("s0"),$("#result").removeClass("s0").addClass("animation").addClass("s1")};$(".button").click(function(){if(i(void 0),isNaN(this.textContent))switch(s&&("INVALID"==l.textContent||"Del"==this.textContent||-1!=l.textContent.indexOf("Infinity")?r.textContent="":r.textContent=l.textContent,s=!1),this.textContent){case"---":break;case"CE":r.textContent="",t();break;case"(":++o,r.textContent+="(";break;case")":o>0&&(--o,r.textContent+=")");break;case"Del":""!=r.textContent&&("("==r.textContent.charAt(r.textContent.length-1)&&--o,r.textContent=r.textContent.substr(0,r.textContent.length-1));break;case"n!":n("lev");break;case"deg":n("degrees");break;case"sin":case"cos":case"tan":case"asin":case"acos":case"atan":case"ln":case"log":n(this.textContent);break;case"x^y":a("^");break;case"π":r.textContent+="π";break;case"e":r.textContent+="e";break;case"=":e(),t(),l.textContent=calculator(r.textContent),i(c),s=!0;break;default:a(this.textContent)}else s&&(r.textContent="",s=!1),r.textContent+=this.textContent})});
//# sourceMappingURL=calculator.js.map
