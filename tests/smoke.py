"""Teste rápido do Saúde em Jogo. Uso: python3 tests/smoke.py   (precisa de playwright)
Verifica: links internos, login do aluno no portal, cards, botões das aulas, laboratórios e jogo por unidade."""
import os, re, glob, sys
from playwright.sync_api import sync_playwright
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Dados de um aluno REAL não ficam no repositório: informe por variável de ambiente (SJ_TESTE_NOME e SJ_TESTE_RA).
NOME = os.environ.get("SJ_TESTE_NOME", ""); RAT = os.environ.get("SJ_TESTE_RA", "")
def nk(n):
    import unicodedata
    n = "".join(c for c in unicodedata.normalize("NFD", n) if unicodedata.category(c) != "Mn").lower()
    n = re.sub(r"[^a-z]", "", n); h = 5381
    for c in n: h = ((h * 33) ^ ord(c)) & 0xFFFFFFFF
    out = ""
    while True:
        out = "0123456789abcdefghijklmnopqrstuvwxyz"[h % 36] + out; h //= 36
        if h == 0: return out
KEY = RAT + "~" + nk(NOME) if NOME else ""
if not NOME or not RAT:
    print("Defina SJ_TESTE_NOME e SJ_TESTE_RA (um aluno da lista) para rodar o teste de login."); sys.exit(2)
bad = []
for f in glob.glob(R + "/**/*.html", recursive=True):
    s = open(f).read()
    for h in re.findall(r'(?:href|src)="([^"#?]+)', s) + re.findall(r'(?:lab|jogo|pdf):"([^"#?]+)', s):
        if h.startswith(("http", "data:", "mailto", "javascript", "//")) or "${" in h: continue
        p = os.path.normpath(os.path.join(os.path.dirname(f), h))
        if not (os.path.exists(p) or os.path.exists(p + "/index.html")): bad.append((os.path.relpath(f, R), h))
assert not bad, "links quebrados: %s" % bad
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"])
    def novo():
        pg = b.new_page(viewport={"width": 420, "height": 900})
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.route("**/fonts.*/**", lambda r: r.abort()); pg.route("**/script.google.com/**", lambda r: r.abort())
        return pg
    pg = novo(); pg.goto("file://%s/portal/index.html" % R); pg.wait_for_timeout(500)
    pg.fill('#fa input[name=nome]', NOME); pg.fill('#fa input[name=ra]', RAT); pg.click('#fa button[type=submit]'); pg.wait_for_timeout(500)
    assert pg.locator(".dcard").count() == 4, "cards de disciplina"
    for d, n in (("gen", 2), ("emb", 2)):
        pg.click(".dcard.%s" % d); pg.wait_for_timeout(300)
        assert pg.locator("#al article").count() >= n, "aulas de " + d
        pg.click("#disc .btn.ghost, #disc button", timeout=2000) if False else None
        pg.goto("file://%s/portal/index.html" % R); pg.wait_for_timeout(400)
    # pré e pós-teste: todas as aulas de Genética e Embriologia têm os dois botões; a página do teste abre
    for d in ("gen", "emb"):
        pg.goto("file://%s/portal/index.html" % R); pg.wait_for_timeout(300); pg.click(".dcard.%s" % d); pg.wait_for_timeout(300)
        assert pg.locator("a[data-u=pre-teste]").count() == pg.locator("a[data-u=pos-teste]").count() >= 1, "botões de pré/pós-teste em " + d
    for aid in ("gen-01", "gen-02", "emb-01", "emb-02"):  # emb-03 a emb-08 abrem só depois da data de liberação
        q = novo(); q.add_init_script("if(!localStorage.getItem('sj_teste_gen_v2'))localStorage.setItem('sj_teste_gen_v2',JSON.stringify({aluno:{nome:'"+NOME+"',mat:'"+RAT+"',key:'"+KEY+"'},unl:false,unlk:{},done:{},pend:[]}))")
        q.goto("file://%s/teste/index.html?aula=%s&m=pre" % (R, aid)); q.wait_for_timeout(500)
        assert "questões" in q.inner_text("body"), "teste não abriu: " + aid + " :: " + q.inner_text("body")[:200]; q.close()
    for u in ("laboratorio/", "laboratorio-aula2/", "laboratorio-aula3/", "laboratorio-aula4/", "laboratorio-emb3/", "dna3d/", "plataforma/?fase=emb1", "plataforma/?fase=emb2&modo=jogo", "plataforma/?fase=gen1", "plataforma/?fase=gen2&modo=jogo", "plataforma/?fase=gen3", "plataforma/?fase=emb3", "teste/"):
        q = novo()
        q.add_init_script("sessionStorage.setItem('sj_portal_prof','1');localStorage.setItem('sj_portal_v1',JSON.stringify({role:'aluno',nome:'"+NOME+"',ra:'"+RAT+"'}))")
        q.goto("file://%s/%s" % (R, u + ("index.html" if u.endswith("/") else ""))) if u.endswith("/") else q.goto("file://%s/%s" % (R, u.replace("plataforma/", "plataforma/index.html")))
        q.wait_for_timeout(800); assert len(q.inner_text("body")) > 40, "página vazia: " + u; q.close()
    # aluno antes da hora: páginas travadas
    for u in ("teste/index.html?aula=emb-05&m=pre",):
        q = novo(); q.goto("file://%s/%s" % (R, u)); q.wait_for_timeout(900)
        assert "abre em" in q.inner_text("body"), "deveria estar travada: " + u; q.close()
assert not errs, "erros de JavaScript: %s" % errs
print("OK: links, portal, laboratórios, plataforma e teste")
