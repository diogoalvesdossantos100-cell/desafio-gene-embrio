/* sessão do professor dura 30 dias neste aparelho */
(function(){try{var k=JSON.parse(localStorage.getItem("sj_prof_keep")||"null");if(k&&k.exp>Date.now()&&k.pin){sessionStorage.setItem("sj_portal_prof","1");sessionStorage.setItem("sj_teste_pin",k.pin);sessionStorage.setItem("sj_ge_pin",k.pin)}else if(k)localStorage.removeItem("sj_prof_keep")}catch(e){}})();
/* Liberação das aulas por data/hora (horário de Brasília). Aulas que não estão na lista ficam sempre abertas. */
(function(){
 var LIB={"gen-02":"2026-10-21T13:00:00-03:00","emb-02":"2026-10-22T13:00:00-03:00","gen-03":"2026-10-27T13:00:00-03:00","emb-03":"2026-10-27T13:00:00-03:00","emb-04":"2026-10-27T13:00:00-03:00","emb-05":"2026-11-05T13:00:00-03:00","emb-06":"2026-11-12T13:00:00-03:00","emb-07":"2026-11-19T13:00:00-03:00","emb-08":"2026-11-26T13:00:00-03:00","gen-04":"2026-10-29T13:00:00-03:00","gen-05":"2026-11-03T13:00:00-03:00","gen-06":"2026-11-10T13:00:00-03:00","gen-07":"2026-11-17T13:00:00-03:00","gen-08":"2026-11-24T13:00:00-03:00"};
 var POS_AUTO={"gen-04":"2026-10-29T20:30:00-03:00","gen-05":"2026-11-03T21:00:00-03:00","gen-06":"2026-11-10T21:00:00-03:00","gen-07":"2026-11-17T21:00:00-03:00","gen-08":"2026-11-24T21:00:00-03:00","emb-05":"2026-11-05T21:00:00-03:00","emb-06":"2026-11-12T21:00:00-03:00","emb-07":"2026-11-19T21:00:00-03:00","emb-08":"2026-11-26T21:00:00-03:00"};
 var FASE2AULA={emb1:"emb-01",emb2:"emb-02",emb3:"emb-04",gen1:"gen-02",gen2:"gen-03",gen3:"gen-04"};
 var prof=false;try{prof=sessionStorage.getItem("sj_portal_prof")==="1"}catch(e){}
 /* hora do servidor (cabeçalho Date da resposta); se falhar, usa o relógio do aparelho */
 var T=null;function agora(){if(T)return T;T=fetch(location.pathname+(location.search||"?")+"&_t="+Date.now(),{method:"HEAD",cache:"no-store"}).then(function(r){var d=r.headers.get("date");return d?new Date(d):new Date()}).catch(function(){return new Date()});return T}
 function quando(id){var d=new Date(LIB[id]);return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",timeZone:"America/Sao_Paulo"})+" às "+d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",timeZone:"America/Sao_Paulo"})}
 function liberado(id){if(!id||!LIB[id]||prof)return Promise.resolve(true);return agora().then(function(n){return n>=new Date(LIB[id])})}
 /* bloqueia uma página inteira até a hora da aula */
 function guard(id){if(!id||!LIB[id]||prof)return;var st=document.createElement("style");st.id="lib-st";st.textContent="body{visibility:hidden}";document.head.appendChild(st);
  liberado(id).then(function(ok){if(ok){st.remove();return}
   var done=false;function f(){if(done)return;done=true;document.body.innerHTML='<div style="visibility:visible;max-width:560px;margin:18vh auto;padding:0 22px;font:600 1.25rem/1.5 system-ui;color:#eaf1f8;text-align:center"><p style="font-size:2.4rem;margin:0">🔒</p><p>Esta aula abre em <b>'+quando(id)+'</b>.</p><p style="font-weight:400;color:#9db4d4">Volte ao portal nesse horário.</p><a href="../portal/" style="display:inline-block;margin-top:8px;padding:14px 26px;border-radius:14px;background:#3ddc84;color:#04140d;font-weight:700;text-decoration:none">Voltar ao portal</a></div>';st.textContent="body{visibility:visible;background:#09100d}"}if(document.body)f();else document.addEventListener("DOMContentLoaded",f)})}
 function posAberto(id){if(!id||!POS_AUTO[id])return Promise.resolve(false);return agora().then(function(n){return n>=new Date(POS_AUTO[id])})}
 function quandoPos(id){var d=new Date(POS_AUTO[id]);return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',timeZone:'America/Sao_Paulo'})+' às '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'})}
 window.LIB={quandoPos:quandoPos,prof:prof,posAberto:posAberto,posAuto:POS_AUTO,mapa:LIB,fase2aula:FASE2AULA,liberado:liberado,quando:quando,guard:guard};
})();
