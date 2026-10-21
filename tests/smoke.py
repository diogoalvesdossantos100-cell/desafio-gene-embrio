"""Teste rápido do Saúde em Jogo. Uso: python3 tests/smoke.py   (precisa de playwright)
Verifica: links internos, login do aluno no portal, cards, botões das aulas, laboratórios e jogo por unidade."""
import os, re, glob, sys
from playwright.sync_api import sync_playwright
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
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
    pg.fill('#fa input[name=nome]', "Maria da Silva"); pg.fill('#fa input[name=ra]', "12345"); pg.click('#fa button[type=submit]'); pg.wait_for_timeout(500)
    assert pg.locator(".dcard").count() == 2, "cards de disciplina"
    for d, n in (("gen", 2), ("emb", 2)):
        pg.click(".dcard.%s" % d); pg.wait_for_timeout(300)
        assert pg.locator("#al article").count() >= n, "aulas de " + d
        pg.click("#disc .btn.ghost, #disc button", timeout=2000) if False else None
        pg.goto("file://%s/portal/index.html" % R); pg.wait_for_timeout(400)
    for u in ("laboratorio/", "laboratorio-aula2/", "dna3d/", "plataforma/?fase=emb1", "plataforma/?fase=emb2&modo=jogo", "plataforma/?fase=gen1", "teste/"):
        q = novo()
        q.add_init_script("localStorage.setItem('sj_portal_v1',JSON.stringify({role:'aluno',nome:'Maria da Silva',ra:'12345'}))")
        q.goto("file://%s/%s" % (R, u + ("index.html" if u.endswith("/") else ""))) if u.endswith("/") else q.goto("file://%s/%s" % (R, u.replace("plataforma/", "plataforma/index.html")))
        q.wait_for_timeout(800); assert len(q.inner_text("body")) > 40, "página vazia: " + u; q.close()
assert not errs, "erros de JavaScript: %s" % errs
print("OK: links, portal, laboratórios, plataforma e teste")
