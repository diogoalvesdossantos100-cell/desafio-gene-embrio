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
const SS_ID = "14DMPH6aj__1NNtLSON0sHHh_7hwaKDMurTO23AI7Uzg";
const ABA = "Resultados";
const ABA_MELHOR = "Melhor nota";
const JOGO_PADRAO = "gene-embrio";
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

function mvpPost_(d){
  const sh = abaMvp_(), rows = mvpRows_(), mat = norm_(d.matricula), fase = String(d.fase || "").trim();
  if (!mat || !fase) return {ok:false, err:"dados"};
  const uid = String(d.uid || "");
  let n = 0;
  for (const r of rows) {
    if (uid && String(r[13]) === uid) return {ok:true, dup:true, tentativa:Number(r[5])};   // reenvio: já gravado
    if (norm_(r[1]) === mat && String(r[4]) === fase) n++;
  }
  if (n >= MAX_TENT) return {ok:false, err:"limite", tentativas:n};
  const ac = Number(d.acertos) || 0, tot = Number(d.total) || 10;
  if (ac < 0 || tot < 1 || tot > 60 || ac > tot) return {ok:false, err:"dados"};            // nota impossível
  if (!/^[A-Za-z0-9_.\-]{1,40}$/.test(fase) || String(d.nome || "").length > 120) return {ok:false, err:"dados"};
  sh.appendRow([new Date(d.ts || Date.now()), String(d.matricula), d.nome, d.turma, fase, n + 1, ac, tot, Math.round(ac / tot * 100) / 10, Number(d.seg) || 0, Number(d.pontos) || 0, String(d.det || ""), Number(d.uso) || 0, uid]);
  return {ok:true, tentativa:n + 1};
}

function mvpStatus_(matricula){
  const mat = norm_(matricula), fases = {};
  mvpRows_().forEach(r => {
    if (norm_(r[1]) !== mat) return;
    const f = String(r[4]); fases[f] = fases[f] || {tent:0, melhor:-1, vistas:[]};
    fases[f].tent++; fases[f].melhor = Math.max(fases[f].melhor, Number(r[6]) || 0);
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
  return {ok:true, rows:mvpRows_().map(r => ({ts:r[0] instanceof Date ? r[0].toISOString() : String(r[0]), mat:String(r[1]), nome:r[2], turma:r[3], fase:String(r[4]), tent:Number(r[5]), ac:Number(r[6]), total:Number(r[7]), seg:Number(r[9]), pts:Number(r[10]), det:String(r[11]), uso:Number(r[12])}))};
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

function doPost(e){
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.tipo === "mvp") return json_(mvpPost_(d));
    if (d.tipo === "uso") return json_(usoPost_(d));
    if (d.tipo === "aulas") return json_(aulasSet_(d));
    const sh = aba_();
    sh.appendRow([new Date(), d.nome, String(d.matricula), d.turma, d.disciplina, d.tentativa, d.acertos, d.total, d.pontos, d.nota, d.erradas, d.jogo || JOGO_PADRAO]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

function doGet(e){
  const acao = String(e.parameter.acao || "");
  if (acao === "status") return json_(mvpStatus_(e.parameter.matricula));
  if (acao === "painel") return json_(mvpPainel_(e.parameter.pin));
  if (acao === "aulas") return json_(aulasGet_());
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
