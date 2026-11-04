/**
 * Saúde em Jogo - recebe os resultados dos jogos e grava na planilha.
 * Vale para todos os jogos (gene-embrio, psicologia-aplicada, saude-coletiva).
 * A coluna "Jogo" separa as tentativas de cada jogo.
 * Regra: valem no máximo 2 tentativas por jogo e conta a MAIOR nota (aba "Melhor nota").
 *
 * v2: a plataforma "Desafio Gene & Embrio" (12 unidades) grava na aba "MVP" (uma linha por tentativa),
 * o servidor recusa a 3ª tentativa de uma unidade, e o painel do professor lê a aba via PIN.
 * Trocar __PIN__ pelo PIN do professor ao publicar (não commitar o PIN real).
 */
const PIN_PROF = "__PIN__";
const ABA_MVP = "MVP";
const CAB_MVP = ["Data/hora","Matrícula","Nome","Turma","Unidade","Tentativa","Acertos","Total","Nota","Segundos","Pontos","Detalhe","Uso (s)","UID"];
const MAX_TENT = 2;
// Gabarito dos pré e pós-testes (índice da alternativa certa). A nota dessas fases é calculada AQUI, a partir de d.det.
const GAB = {
  "teste-pre":[1,3,0,2,1,3,2,0,3,1],
  "teste-pos":[3,2,1,2,3,2,0,2,1,3],
  "pre-gen-02":[2,3,1,2,0,2],
  "pos-gen-02":[2,1,0,3,1,2],
  "pre2-gen-03":[1,2,1,3,0,3],
  "pos2-gen-03":[1,2,2,2,1,3],
  "pre-gen-04":[1,3,1,2,3,1],
  "pos-gen-04":[2,1,0,3,1,2],
  "pre-emb-01":[2,3,2,1,2,1],
  "pos-emb-01":[0,2,1,3,0,2],
  "pre-emb-02":[2,0,3,1,2,1],
  "pos-emb-02":[0,1,2,1,0,1],
  "pre-emb-03":[0,1,2,2,1,0],
  "pos-emb-03":[1,1,1,3,0,1],
  "pre-emb-04":[1,0,3,0,2,3],
  "pos-emb-04":[2,1,2,0,2,0],
  "pre-emb-05":[1,1,1,2,1,2],
  "pos-emb-05":[1,0,1,3,0,1],
  "pre-emb-06":[2,1,1,1,1,0],
  "pos-emb-06":[1,3,1,1,2,1],
  "pre-emb-07":[1,0,1,2,1,1],
  "pos-emb-07":[2,1,0,0,2,3],
  "pre-emb-08":[1,1,1,1,1,2],
  "pos-emb-08":[1,0,2,1,2,3],
  "pre-gen-05":[2,1,2,2,1,0],
  "pos-gen-05":[2,0,0,1,1,2],
  "pre-gen-06":[1,0,1,0,0,1],
  "pos-gen-06":[0,1,0,1,0,1],
  "pre-gen-07":[0,0,1,0,0,0],
  "pos-gen-07":[0,0,0,0,0,0],
  "pre-gen-08":[2,1,1,1,1,1],
  "pos-gen-08":[0,0,0,0,0,0]
};
// <GAB_JOGOS>
// Gabaritos dos jogos (gerado por tools/gerar_gabaritos.js; não edite à mão).
const GAB_PLAT = {"emb1":[0,3,1,2,1,2,0,3,1,2,0,3,1,2,0,3,0,2],"emb2":[2,1,3,0,2,1,3,1,2,0,1,3,0,2,3,1,2,0],"emb3":[1,0,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,2],"emb4":[1,0,3,2,1,0,3,2,1,0,3,2,1,0,3,2,1,0],"emb5":[2,0,3,0,2,1,0,3,2,1,3,2,1,3,1,0,2,1],"emb6":[1,3,0,2,1,2,0,3,1,2,0,3,3,0,2,3,1,0],"gen1":[1,3,0,2,1,0,2,3,0,1,2,3,0,2,1,3,0,2],"gen2":[1,2,3,0,1,0,2,3,0,1,2,3,2,0,3,1,0,2],"gen3":[2,1,3,0,3,0,2,1,3,0,0,2,2,1,0,1,3,2],"gen4":[1,2,0,3,0,2,1,3,2,0,3,1,2,0,3,1,0,1],"gen5":[1,3,0,2,1,0,2,3,1,0,2,3,1,0,3,2,0,1],"gen6":[2,1,3,0,1,0,3,1,2,0,3,2,0,1,3,2,1,2]};
const GAB_ARC = {"genetica":{"G01":1,"G02":1,"G03":3,"G04":1,"G05":1,"G06":1,"G07":2,"G08":1,"G09":1,"G10":1,"G11":2,"G12":1,"G13":1,"G14":1,"G15":1,"G16":2,"G17":1,"G18":2,"G19":1,"G20":0},"embriologia":{"E01":1,"E02":2,"E03":1,"E04":1,"E05":1,"E06":2,"E07":1,"E08":0,"E09":1,"E10":1,"E11":1,"E12":1,"E13":2,"E14":1,"E15":1,"E16":1,"E17":1,"E18":3,"E19":0,"E20":0},"psicologia-aplicada":{"PP01":3,"PP02":2,"PP03":1,"PP04":1,"PP05":1,"PP06":0,"PP07":3,"PP08":2,"PP09":3,"PP10":0,"PP11":2,"PP12":0,"PP13":2,"PP14":2,"PP15":3,"PP16":0,"PP17":1,"PP18":2,"PM01":3,"PM02":1,"PM03":0,"PM04":0,"PM05":0,"PM06":3,"PM07":1,"PM08":3,"PM09":3,"PM10":0,"PM11":2,"PM12":0,"PM13":0,"PM14":2,"PM15":0,"PM16":2,"PM17":1,"PM18":1},"saude-coletiva":{"SS01":3,"SS02":0,"SS03":2,"SS04":2,"SS05":2,"SS06":2,"SS07":0,"SS08":0,"SS09":0,"SS10":2,"SS11":0,"SS12":1,"SS13":1,"SS14":2,"SS15":3,"SS16":2,"SS17":2,"SS18":2,"SS19":2,"SS20":2,"SS21":0,"SS22":3,"SS23":3,"SU01":2,"SU02":2,"SU03":3,"SU04":0,"SU05":1,"SU06":1,"SU07":0,"SU08":3,"SU09":3,"SU10":1,"SU11":1,"SU12":1,"SU13":0,"SU14":1,"SU15":1,"SU16":1,"SU17":0,"SU18":0,"SU19":3,"SU20":0}};
// </GAB_JOGOS>
const SS_ID = "14DMPH6aj__1NNtLSON0sHHh_7hwaKDMurTO23AI7Uzg";
const ABA = "Resultados";
const ABA_MELHOR = "Melhor nota";
const JOGO_PADRAO = "gene-embrio";
const NOTA_ARCADE = 2.0;   // valor da atividade dos jogos de fliperama (igual a CONFIG.NOTA_MAXIMA nas páginas)
const CAB = ["Data/hora","Nome","Matrícula","Turma","Disciplina","Tentativa","Acertos","Total","Pontos","Nota","Questões erradas","Jogo"];

function norm_(x){ return String(x == null ? "" : x).trim().toLowerCase().replace(/^0+/, ""); }

function aba_(){
  const ss = SpreadsheetApp.openById(SS_ID);
  let sh = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
  if (sh.getLastRow() === 0) {
    sh.getRange(1,1,1,CAB.length).setValues([CAB]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  if (sh.getRange(1,12).getValue() !== "Jogo") {           // migração da versão antiga (11 colunas)
    sh.getRange(1,12).setValue("Jogo").setFontWeight("bold");
    const n = sh.getLastRow() - 1;
    if (n > 0) {
      const l = sh.getRange(2,12,n,1), v = l.getValues().map(r => [r[0] || JOGO_PADRAO]);
      l.setValues(v);
      const c = sh.getRange(2,3,n,1), cv = c.getValues().map(r => [String(r[0])]);
      c.setNumberFormat("@").setValues(cv);
    }
  }
  sh.getRange("C2:C").setNumberFormat("@");                 // matrícula sempre como texto
  melhor_(ss);
  return sh;
}

function melhor_(ss){
  let m = ss.getSheetByName(ABA_MELHOR);
  if (!m) m = ss.insertSheet(ABA_MELHOR);
  if (m.getRange("A1").getFormula() === "") {
    m.getRange("A1").setFormula('=QUERY(' + ABA + '!A:L,"select L, C, B, count(C), max(J) where C is not null group by L, C, B order by L, C label L \'Jogo\', C \'Matrícula\', B \'Nome\', count(C) \'Tentativas\', max(J) \'Maior nota (vale)\'",1)');
  }
}

function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function abaMvp_(){
  const ss = SpreadsheetApp.openById(SS_ID);
  let sh = ss.getSheetByName(ABA_MVP);
  if (!sh) { sh = ss.insertSheet(ABA_MVP); sh.getRange(1,1,1,CAB_MVP.length).setValues([CAB_MVP]).setFontWeight("bold"); sh.setFrozenRows(1); sh.getRange("B2:B").setNumberFormat("@"); sh.getRange("L2:L").setNumberFormat("@"); }
  return sh;
}

function mvpRows_(){
  const sh = abaMvp_(), n = sh.getLastRow() - 1;
  return n > 0 ? sh.getRange(2,1,n,CAB_MVP.length).getValues() : [];
}

// Correção no servidor dos jogos. O navegador manda só as alternativas marcadas (índice ORIGINAL da alternativa, -1 = sem resposta).
function corrigeEsc_(esc, gab, porId){
  const partes = String(esc || "").split(",").filter(x => x !== "");
  if (partes.length < 5 || partes.length > 30) return null;
  const vistos = {}; let ac = 0; const det = [], erradas = [];
  for (const p of partes) {
    const m = /^([A-Za-z0-9_.\-]{1,12}):(-?\d)$/.exec(p); if (!m) return null;
    const chave = m[1], op = Number(m[2]);
    if (vistos[chave] || op < -1 || op > 5) return null; vistos[chave] = 1;
    let c;
    if (porId) { if (!(chave in gab)) return null; c = gab[chave]; }
    else { const qi = Number(chave); if (!(qi >= 0 && qi < gab.length) || String(qi) !== chave) return null; c = gab[qi]; }
    const ok = op === c; if (ok) ac++; else erradas.push(chave);
    det.push(chave + ":" + (ok ? 1 : 0));
  }
  return {ac:ac, tot:partes.length, det:det.join(","), erradas:erradas.join(", ")};
}

function mvpPost_(d){
  const sh = abaMvp_(), rows = mvpRows_(), mat = norm_(d.matricula), fase = String(d.fase || "").trim();
  if (!mat || !fase) return {ok:false, err:"dados"};
  const uid = String(d.uid || "");
  let n = 0;
  for (const r of rows) {
    if (uid && String(r[13]) === uid) return {ok:true, dup:true, tentativa:Number(r[5]), ac:Number(r[6]), total:Number(r[7])};   // reenvio: já gravado
    if (norm_(r[1]) === mat && String(r[4]) === fase) n++;
  }
  if (n >= MAX_TENT) return {ok:false, err:"limite", tentativas:n};
  let ac = Number(d.acertos) || 0, tot = Number(d.total) || 10, pts = Number(d.pontos) || 0;
  const gab = GAB[fase];
  if (gab) {                                                                                  // teste com gabarito no servidor: ignora a nota enviada pelo navegador
    const resp = String(d.det || "").split(",");
    if (resp.length !== gab.length) return {ok:false, err:"dados"};
    tot = gab.length; ac = 0; resp.forEach((x, i) => { if (x !== "" && Number(x) === gab[i]) ac++; }); pts = ac * 10;
  }
  let det = String(d.det || "");
  const gj = GAB_PLAT[fase];
  if (gj) {                                                                                   // jogo: nota calculada AQUI a partir das alternativas marcadas (d.esc)
    const c = corrigeEsc_(d.esc, gj, false);
    if (!c || c.tot !== 10) return {ok:false, err:"esc"};
    ac = c.ac; tot = c.tot; det = c.det;
    pts = ac === 0 ? 0 : Math.max(100 * ac, Math.min(Number(d.pontos) || 0, 150 * ac));    // pontos (bônus de tempo) só podem variar dentro do limite possível
  }
  if (ac < 0 || tot < 1 || tot > 60 || ac > tot) return {ok:false, err:"dados"};            // nota impossível
  if (!/^[A-Za-z0-9_.\-]{1,40}$/.test(fase) || String(d.nome || "").length > 120) return {ok:false, err:"dados"};
  sh.appendRow([new Date(d.ts || Date.now()), String(d.matricula), d.nome, d.turma, fase, n + 1, ac, tot, Math.round(ac / tot * 100) / 10, Number(d.seg) || 0, pts, det, Number(d.uso) || 0, uid]);
  return {ok:true, tentativa:n + 1, ac:ac, total:tot};
}

function mvpStatus_(matricula){
  const mat = norm_(matricula), fases = {};
  mvpRows_().forEach(r => {
    if (norm_(r[1]) !== mat) return;
    const f = String(r[4]); fases[f] = fases[f] || {tent:0, melhor:-1, nota:-1, vistas:[]};
    fases[f].tent++; fases[f].melhor = Math.max(fases[f].melhor, Number(r[6]) || 0);
    fases[f].nota = Math.max(fases[f].nota, Number(String(r[8]).replace(",", ".")) || 0);
    String(r[11] || "").split(",").forEach(x => { const i = parseInt(x, 10); if (!isNaN(i) && fases[f].vistas.indexOf(i) < 0) fases[f].vistas.push(i); });
  });
  return {ok:true, fases:fases};
}

// Limite de tentativas de PIN: 5 erros seguidos bloqueiam por 15 minutos (vale para o painel e para "aula dada").
function pinOk_(pin){
  const cache = CacheService.getScriptCache();
  if (Number(cache.get("pin_fail") || 0) >= 5) return {ok:false, err:"bloqueado"};
  if (String(pin) === PIN_PROF && PIN_PROF !== "__PIN__") { cache.remove("pin_fail"); return {ok:true}; }
  cache.put("pin_fail", String(Number(cache.get("pin_fail") || 0) + 1), 900);
  return {ok:false, err:"pin"};
}

function mvpPainel_(pin){
  const pk = pinOk_(pin); if (!pk.ok) return pk;
  return {ok:true, gab:GAB, rows:mvpRows_().map(r => ({ts:r[0] instanceof Date ? r[0].toISOString() : String(r[0]), mat:String(r[1]), nome:r[2], turma:r[3], fase:String(r[4]), tent:Number(r[5]), ac:Number(r[6]), total:Number(r[7]), seg:Number(r[9]), pts:Number(r[10]), det:String(r[11]), uso:Number(r[12])}))};
}

/* ---- Registro de uso (aula / PDF / laboratório / jogo abertos) ---- */
function usoPost_(d){
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName("USO");
  if (!sh) { sh = ss.insertSheet("USO"); sh.appendRow(["quando","matricula","nome","evento","aula"]); sh.setFrozenRows(1); }
  sh.appendRow([new Date(d.ts || Date.now()), String(d.matricula || ""), String(d.nome || ""), String(d.ev || ""), String(d.aula || "")]);
  return {ok:true};
}

// Aulas marcadas como "dadas" pelo professor (selo ✔ no portal). Guardadas nas propriedades do script.
function aulasGet_(){ const v = PropertiesService.getScriptProperties().getProperty("AULAS_DADAS"); return {ok:true, dadas: v ? JSON.parse(v) : null}; }
function aulasSet_(d){
  const pk = pinOk_(d.pin); if (!pk.ok) return pk;
  const l = (d.dadas || []).map(String).filter(x => /^(gen|emb)-\d\d$/.test(x));
  PropertiesService.getScriptProperties().setProperty("AULAS_DADAS", JSON.stringify(l));
  return {ok:true, dadas:l};
}


// ===== Recados e mensagens (portal novo) =====
// Abas "Recados" (professor -> turma ou aluno) e "Mensagens" (aluno -> professor, com resposta).
function abaRec_(){
  const ss = SpreadsheetApp.openById(SS_ID);
  let sh = ss.getSheetByName("Recados");
  if (!sh) { sh = ss.insertSheet("Recados"); sh.getRange(1,1,1,5).setValues([["ts","id","alvo","texto","apagado"]]).setFontWeight("bold"); sh.setFrozenRows(1); sh.getRange("C2:C").setNumberFormat("@"); }
  return sh;
}
function abaMsg_(){
  const ss = SpreadsheetApp.openById(SS_ID);
  let sh = ss.getSheetByName("Mensagens");
  if (!sh) { sh = ss.insertSheet("Mensagens"); sh.getRange(1,1,1,7).setValues([["ts","id","matricula","nome","texto","resposta","tsResposta"]]).setFontWeight("bold"); sh.setFrozenRows(1); sh.getRange("C2:C").setNumberFormat("@"); }
  return sh;
}
function iso_(v){ return v instanceof Date ? v.toISOString() : String(v || ""); }
function recRows_(){ const sh = abaRec_(), n = sh.getLastRow() - 1; return n > 0 ? sh.getRange(2,1,n,5).getValues().filter(r => String(r[4]) !== "1") : []; }
function msgRows_(){ const sh = abaMsg_(), n = sh.getLastRow() - 1; return n > 0 ? sh.getRange(2,1,n,7).getValues() : []; }
function alunoGet_(matricula){
  const mat = norm_(matricula); if (!mat) return {ok:false, err:"matricula"};
  const rec = recRows_().filter(r => String(r[2]) === "turma" || norm_(r[2]) === mat)
    .map(r => ({id:String(r[1]), ts:iso_(r[0]), alvo:String(r[2]) === "turma" ? "turma" : "aluno", texto:String(r[3])})).slice(-20).reverse();
  const msgs = msgRows_().filter(r => norm_(r[2]) === mat)
    .map(r => ({id:String(r[1]), ts:iso_(r[0]), texto:String(r[4]), resp:String(r[5] || ""), tsResp:iso_(r[6])})).slice(-20).reverse();
  return {ok:true, v:2, recados:rec, msgs:msgs, pendente: msgs.some(m => !m.resp)};
}
function profInbox_(pin){
  const pk = pinOk_(pin); if (!pk.ok) return pk;
  return {ok:true, v:2,
    recados: recRows_().map(r => ({id:String(r[1]), ts:iso_(r[0]), alvo:String(r[2]), texto:String(r[3])})).reverse().slice(0, 60),
    msgs: msgRows_().map(r => ({id:String(r[1]), ts:iso_(r[0]), mat:String(r[2]), nome:String(r[3]), texto:String(r[4]), resp:String(r[5] || ""), tsResp:iso_(r[6])})).reverse().slice(0, 80)};
}
function msgPost_(d){
  const mat = norm_(d.matricula), texto = String(d.texto || "").trim().slice(0, 800);
  if (!mat || !texto) return {ok:false, err:"vazio"};
  if (msgRows_().some(r => norm_(r[2]) === mat && !String(r[5] || ""))) return {ok:false, err:"pendente"};
  abaMsg_().appendRow([new Date(), Utilities.getUuid().slice(0,8), mat, String(d.nome || "").slice(0,80), texto, "", ""]);
  return {ok:true};
}
function recadoPost_(d){
  const pk = pinOk_(d.pin); if (!pk.ok) return pk;
  const texto = String(d.texto || "").trim().slice(0, 600), alvo = String(d.alvo || "turma") === "turma" ? "turma" : norm_(d.alvo);
  if (!texto || !alvo) return {ok:false, err:"vazio"};
  abaRec_().appendRow([new Date(), Utilities.getUuid().slice(0,8), alvo, texto, ""]);
  return {ok:true};
}
function respPost_(d){
  const pk = pinOk_(d.pin); if (!pk.ok) return pk;
  const texto = String(d.texto || "").trim().slice(0, 800); if (!texto) return {ok:false, err:"vazio"};
  const sh = abaMsg_(), rows = msgRows_();
  for (let i = 0; i < rows.length; i++) if (String(rows[i][1]) === String(d.id)) { sh.getRange(i + 2, 6, 1, 2).setValues([[texto, new Date()]]); return {ok:true}; }
  return {ok:false, err:"nao_achou"};
}
function recadoDel_(d){
  const pk = pinOk_(d.pin); if (!pk.ok) return pk;
  const sh = abaRec_(), n = sh.getLastRow() - 1; if (n < 1) return {ok:false, err:"nao_achou"};
  const rows = sh.getRange(2,1,n,5).getValues();
  for (let i = 0; i < rows.length; i++) if (String(rows[i][1]) === String(d.id)) { sh.getRange(i + 2, 5).setValue("1"); return {ok:true}; }
  return {ok:false, err:"nao_achou"};
}

function doPost(e){
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.tipo === "mvp") return json_(mvpPost_(d));
    if (d.tipo === "uso") return json_(usoPost_(d));
    if (d.tipo === "aulas") return json_(aulasSet_(d));
    if (d.tipo === "msg") return json_(msgPost_(d));
    if (d.tipo === "recado") return json_(recadoPost_(d));
    if (d.tipo === "resp") return json_(respPost_(d));
    if (d.tipo === "recado_del") return json_(recadoDel_(d));
    if (d.tipo) return json_({ok:false, err:"tipo"});
    const sh = aba_();
    const ga = GAB_ARC[String(d.jogo || "")];
    if (ga) {                                                                                 // jogos de fliperama: nota calculada no servidor
      const c = corrigeEsc_(d.esc, ga, true);
      if (!c) return json_({ok:false, err:"esc"});
      d.acertos = c.ac; d.total = c.tot; d.erradas = c.erradas;
      d.nota = Math.round(c.ac / c.tot * NOTA_ARCADE * 100) / 100;
      d.pontos = c.ac === 0 ? 0 : Math.max(100 * c.ac, Math.min(Number(d.pontos) || 0, 200 * c.tot + 200));
    }
    sh.appendRow([new Date(), d.nome, String(d.matricula), d.turma, d.disciplina, d.tentativa, d.acertos, d.total, d.pontos, d.nota, d.erradas, d.jogo || JOGO_PADRAO]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

function doGet(e){
  const acao = String(e.parameter.acao || "");
  if (acao === "status") return json_(mvpStatus_(e.parameter.matricula));
  if (acao === "painel") return json_(mvpPainel_(e.parameter.pin));
  if (acao === "aulas") return json_(aulasGet_());
  if (acao === "aluno") return json_(alunoGet_(e.parameter.matricula));
  if (acao === "prof_inbox") return json_(profInbox_(e.parameter.pin));
  const mat = norm_(e.parameter.matricula), jogo = String(e.parameter.jogo || JOGO_PADRAO).trim().toLowerCase();
  const sh = aba_(), n = sh.getLastRow() - 1;
  let tent = 0, melhor = 0;
  if (mat && n > 0) {
    sh.getRange(2,1,n,12).getValues().forEach(r => {
      if (norm_(r[2]) === mat && String(r[11] || JOGO_PADRAO).trim().toLowerCase() === jogo) { tent++; melhor = Math.max(melhor, Number(r[9]) || 0); }
    });
  }
  return ContentService.createTextOutput(JSON.stringify({tentativas: tent, melhor: melhor})).setMimeType(ContentService.MimeType.JSON);
}


/**
 * Gera/atualiza a aba "Notas finais": uma linha por aluno, uma coluna por unidade (maior nota das tentativas)
 * e a média. Rode "notasFinais" no editor do Apps Script (Executar) sempre que quiser a visão consolidada.
 * Ignora linhas de teste (nome ou matrícula contendo "teste").
 */
function notasFinais(){
  const rows = mvpRows_(), alunos = {}, fases = {};
  rows.forEach(r => {
    const mat = norm_(r[1]), nome = String(r[2] || ""), fase = String(r[4] || ""), nota = Number(r[8]) || 0;
    if (!mat || /teste/i.test(nome) || /teste/i.test(mat)) return;
    fases[fase] = 1;
    const a = alunos[mat] || (alunos[mat] = {nome:nome, mat:String(r[1]), n:{}});
    a.n[fase] = Math.max(a.n[fase] || 0, nota);
  });
  const cols = Object.keys(fases).sort();
  const out = [["Aluno","Matrícula"].concat(cols, ["Média das unidades feitas"])];
  Object.keys(alunos).sort((x, y) => alunos[x].nome.localeCompare(alunos[y].nome)).forEach(k => {
    const a = alunos[k], vals = cols.map(c => a.n[c] == null ? "" : a.n[c]), f = vals.filter(v => v !== "");
    out.push([a.nome, a.mat].concat(vals, [f.length ? Math.round(f.reduce((x, y) => x + y, 0) / f.length * 10) / 10 : ""]));
  });
  const ss = SpreadsheetApp.openById(SS_ID);
  let sh = ss.getSheetByName("Notas finais"); if (!sh) sh = ss.insertSheet("Notas finais");
  sh.clear(); sh.getRange(1, 1, out.length, out[0].length).setValues(out);
  sh.getRange(1, 1, 1, out[0].length).setFontWeight("bold"); sh.setFrozenRows(1); sh.setFrozenColumns(1);
  return out.length - 1;
}
