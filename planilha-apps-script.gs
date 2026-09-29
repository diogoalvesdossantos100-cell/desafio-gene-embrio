/**
 * Saúde em Jogo - recebe os resultados dos jogos e grava na planilha.
 * Vale para todos os jogos (gene-embrio, psicologia-aplicada, saude-coletiva).
 * A coluna "Jogo" separa as tentativas de cada jogo.
 * Regra: valem no máximo 2 tentativas por jogo e conta a MAIOR nota (aba "Melhor nota").
 */
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

function doPost(e){
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents), sh = aba_();
    sh.appendRow([new Date(), d.nome, String(d.matricula), d.turma, d.disciplina, d.tentativa, d.acertos, d.total, d.pontos, d.nota, d.erradas, d.jogo || JOGO_PADRAO]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}

function doGet(e){
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
