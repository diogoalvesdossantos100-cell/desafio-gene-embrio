# Saúde em Jogo · Fisioterapia (AlfaUnipac GV)

Portal de aulas, pré/pós-testes, laboratórios 2D/3D e jogo avaliativo (Genética e Embriologia; também Psicologia Aplicada e Saúde Coletiva).
Site estático (GitHub Pages) + planilha Google com Apps Script (`planilha-apps-script.gs`) que recebe as notas.

## Estrutura
- `portal/` entrada do aluno e do professor · `teste/` pré/pós-teste e painel · `plataforma/` jogo por unidade e painel
- `laboratorio*/`, `dna3d/` laboratórios · `aulas/` PDFs das aulas · `vendor/` (`liberacao.js` datas de liberação, `ra.js` conferência de nome + RA)
- `tests/smoke.py` teste rápido · `tools/bump_ver.py` troca a versão do portal (cache)

## Rotina de publicação
1. `python3 tools/bump_ver.py`  2. `SJ_TESTE_NOME="..." SJ_TESTE_RA=... python3 tests/smoke.py`  3. commit e push.
(No GitHub, o teste roda sozinho se os segredos `SJ_TESTE_NOME` e `SJ_TESTE_RA` estiverem cadastrados.)

## Segurança: o que o site protege e o que não protege
- **Nome + RA:** conferidos no navegador contra a lista da turma, guardada só em forma embaralhada (sem nomes em texto, RA com hash esticado).
- **Pós-teste:** sem palavra-chave. As aulas 1 a 4 têm pós-teste sempre aberto; a partir da aula 5 (e a Genética 04 no dia 29/10) o pós-teste abre sozinho no horário de `POS_AUTO` em `vendor/liberacao.js` (21h do dia da aula). As datas das aulas ficam em `LIB` no mesmo arquivo.
- **Painel do professor:** exige PIN conferido pelo Apps Script (5 erros = 15 min de bloqueio). A sessão dura 8 h neste aparelho.
- **Nota dos pré e pós-testes:** calculada no Apps Script. O gabarito (`GAB` em `planilha-apps-script.gs`) não está no site; o navegador só envia as respostas marcadas (`det`) e o servidor ignora qualquer nota enviada. Ao trocar uma questão, atualize o `GAB` junto.
- **Limite conhecido:** o jogo (`plataforma/`) ainda corrige no navegador, então quem entende de programação consegue ler o gabarito dele ou forjar nota. As travas por data também são visuais: os PDFs abrem se alguém souber o endereço.
- **Dados de alunos:** nunca commitar nomes, RAs ou CPFs. O histórico antigo do Git ainda contém a lista anterior (ver `README` de manutenção com o professor).

## Planilha (Apps Script)
Abas: `Resultados` (jogo antigo), `MVP` (testes e jogo), `USO` (acessos). A função `notasFinais` gera a aba **Notas finais** (uma linha por aluno, maior nota por unidade e média). Para publicar mudanças: editar o script, trocar `__PIN__` pelo PIN real **só no editor**, e Implantar > Gerenciar implantações > nova versão.
