// Gera os gabaritos do servidor a partir dos bancos de questões dos jogos e grava em planilha-apps-script.gs
// (entre as marcas // <GAB_JOGOS> e // </GAB_JOGOS>). Rode: node tools/gerar_gabaritos.js
const fs = require("fs"), path = require("path"), raiz = path.join(__dirname, "..");
const ler = p => fs.readFileSync(path.join(raiz, p), "utf8");
const plat = JSON.parse(ler("plataforma/index.html").match(/^const FASES = (\[.*\]);?\s*$/m)[1]);
const GAB_PLAT = {}; plat.forEach(f => { GAB_PLAT[f.id] = f.q.map(q => q.c); });
const GAB_ARC = {};
for (const j of ["genetica", "embriologia", "psicologia-aplicada", "saude-coletiva"]) {
  const s = ler(j + "/index.html"), i = s.indexOf("const BANK = ["), fim = s.indexOf("\n];", i);
  const banco = new Function("return " + s.slice(i + "const BANK = ".length, fim + 2))();
  const g = {}; banco.forEach(q => { g[q.id] = q.c; }); GAB_ARC[j] = g;
}
const bloco = "// <GAB_JOGOS>\n// Gabaritos dos jogos (gerado por tools/gerar_gabaritos.js; não edite à mão).\nconst GAB_PLAT = " + JSON.stringify(GAB_PLAT) + ";\nconst GAB_ARC = " + JSON.stringify(GAB_ARC) + ";\n// </GAB_JOGOS>";
const gs = path.join(raiz, "planilha-apps-script.gs"); let t = fs.readFileSync(gs, "utf8");
if (t.includes("// <GAB_JOGOS>")) t = t.replace(/\/\/ <GAB_JOGOS>[\s\S]*?\/\/ <\/GAB_JOGOS>/, () => bloco);
else t = t.replace("const SS_ID =", () => bloco + "\nconst SS_ID =");
fs.writeFileSync(gs, t);
console.log("fases:", Object.keys(GAB_PLAT).length, "arcade:", Object.keys(GAB_ARC).map(k => k + "=" + Object.keys(GAB_ARC[k]).length).join(" "));
