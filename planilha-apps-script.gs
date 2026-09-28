/**
 * Recebe os resultados do jogo e grava na planilha.
 * Cole este código em: Planilha Google > Extensões > Apps Script.
 * Depois: Implantar > Nova implantação > Tipo "App da Web"
 *   Executar como: Eu | Quem tem acesso: Qualquer pessoa
 * Copie a URL gerada e cole em CONFIG.URL_PLANILHA no jogo.html.
 */
const ABA = "Resultados";
const CABECALHO = ["Data/hora","Nome","Matrícula","Turma","Disciplina","Tentativa","Acertos","Total","Pontos","Nota","Questões erradas"];

function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.appendRow(CABECALHO);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  aba_().appendRow([
    new Date(), d.nome, String(d.matricula), d.turma, d.disciplina, d.tentativa,
    d.acertos, d.total, d.pontos, d.nota, d.erradas
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// O jogo consulta quantas tentativas o aluno já fez (evita burlar limpando o navegador)
function doGet(e) {
  const mat = String((e.parameter && e.parameter.matricula) || "").trim().toLowerCase();
  const dados = aba_().getDataRange().getValues();
  let n = 0;
  for (let i = 1; i < dados.length; i++) {
    if (String(dados[i][2]).trim().toLowerCase() === mat) n++;
  }
  return ContentService.createTextOutput(JSON.stringify({ tentativas: n }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Aba "Melhor nota" (crie uma nova aba e cole esta fórmula na célula A1):
=QUERY(Resultados!A:K; "select C, B, max(J) where C is not null group by C, B order by B label C 'Matrícula', B 'Nome', max(J) 'Melhor nota'"; 1)
*/
