"""Atualiza o número de versão (VER) do portal, para o aluno não ficar com página antiga em cache.
Uso: python3 tools/bump_ver.py   (rode antes de cada publicação)"""
import re, time, os
p = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "portal", "index.html")
s = open(p, encoding="utf-8").read()
v = time.strftime("%Y%m%d%H%M")
s2 = re.sub(r'const VER="[^"]*"', 'const VER="%s"' % v, s, count=1)
assert s2 != s or ('VER="%s"' % v) in s, "VER não encontrado"
open(p, "w", encoding="utf-8").write(s2); print("VER =", v)
