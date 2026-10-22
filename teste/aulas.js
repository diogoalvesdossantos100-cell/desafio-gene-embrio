/* Pré-teste e pós-teste de cada aula. Mesmo teste nos dois momentos.
   c = índice da alternativa correta. palavra = senha que o professor diz depois da aula para liberar o pós-teste. */
(function () {
  var T = {};
  T["gen-01"] = { titulo: "Genética · Aula 01 · Revisão", palavra: "GENETICA", pre: "teste-pre", pos: "teste-pos", q: window.TESTE };
  function add(id, titulo, palavra, q) { T[id] = { titulo: titulo, palavra: palavra, pre: "pre-" + id, pos: "pos-" + id, q: q }; }

  add("gen-02", "Genética · Aula 02 · Dogma Central e Erros Inatos", "PEZINHO", [
    { q: "No DNA, qual base se encaixa com a adenina (A)?", o: ["Citosina (C)", "Guanina (G)", "Timina (T)", "Uracila (U)"], c: 2 },
    { q: "Qual é o caminho correto da informação genética?", o: ["Proteína → RNA → DNA", "RNA → DNA → proteína", "DNA → proteína → RNA", "DNA → RNA → proteína"], c: 3 },
    { q: "Na cópia do DNA, qual enzima monta a fita nova?", o: ["Helicase", "DNA polimerase", "DNA ligase", "Lipase"], c: 1 },
    { q: "O que é um erro inato do metabolismo?", o: ["Uma infecção pega depois do nascimento", "Uma lesão causada por esforço", "Uma doença genética em que o gene de uma enzima está com defeito", "Uma falta de vitamina na dieta"], c: 2 },
    { q: "Na fenilcetonúria (PKU), qual substância se acumula no sangue?", o: ["Fenilalanina", "Tirosina", "Glicose", "Oxigênio"], c: 0 },
    { q: "Por que o teste do pezinho é importante?", o: ["Mede a altura do bebê", "Serve só para saber o tipo de sangue", "Descobre doenças como a PKU antes dos sintomas, e o cuidado começa cedo", "Substitui as vacinas"], c: 2 }
  ]);

  add("gen-03", "Genética · Aula 03 · Tradução e Herança", "DUCHENNE", [
    { q: "Como se chama cada grupo de 3 letras do RNA?", o: ["Íntron", "Códon", "Gene", "Cromátide"], c: 1 },
    { q: "Onde a proteína é montada?", o: ["No núcleo", "Na membrana da célula", "No ribossomo", "No lisossomo"], c: 2 },
    { q: "O que é genótipo?", o: ["O que a gente vê, como a cor dos olhos", "Os genes que a pessoa tem, como Aa", "O ambiente onde a pessoa vive", "O número de cromossomos"], c: 1 },
    { q: "Dois pais portadores (Aa × Aa) de uma doença autossômica recessiva: qual a chance de cada filho ter a doença?", o: ["0%", "50%", "100%", "25%"], c: 3 },
    { q: "Na herança ligada ao X recessiva, por que os meninos são mais afetados?", o: ["Porque têm só um X, sem outro X para compensar", "Porque têm dois Y", "Porque o pai passa o X para o filho homem", "Porque o gene fica no Y"], c: 0 },
    { q: "Qual proteína falta na distrofia muscular de Duchenne?", o: ["Hemoglobina", "Insulina", "Fenilalanina", "Distrofina"], c: 3 }
  ]);

  add("gen-04", "Genética · Aula 04 · Sangue e Mutações", "FALCIFORME", [
    { q: "Uma pessoa do tipo sanguíneo O:", o: ["Tem o antígeno A", "Não tem antígeno A nem B", "Tem o antígeno B", "Tem os antígenos A e B"], c: 1 },
    { q: "Um pai do tipo A (AO) e uma mãe do tipo B (BO) podem ter filhos de qual tipo?", o: ["Só A", "Só B", "Só AB", "A, B, AB ou O"], c: 3 },
    { q: "Mãe Rh negativo com bebê Rh positivo. Quando o risco é maior?", o: ["Na 1ª gravidez, sempre", "Nas gravidezes seguintes, porque os anticorpos podem atacar as hemácias do bebê", "Nunca há risco", "Só se o bebê for menina"], c: 1 },
    { q: "O que é uma mutação de troca (de ponto)?", o: ["Um cromossomo inteiro some", "O RNA é cortado em pedaços", "Uma letra do DNA vira outra", "A célula para de se dividir"], c: 2 },
    { q: "A anemia falciforme é uma herança:", o: ["Ligada ao Y", "Autossômica dominante", "Ligada ao X dominante", "Autossômica recessiva"], c: 3 },
    { q: "Por que a pessoa com anemia falciforme sente dor nas crises?", o: ["Faltam cálcio e vitamina D", "Hemácias em foice entopem vasos pequenos e falta oxigênio", "Há glóbulos brancos demais", "As hemácias ficam grandes demais"], c: 1 }
  ]);

  add("emb-01", "Embriologia · Aula 01 · Aparelho Reprodutor e Ciclo Menstrual", "OVULACAO", [
    { q: "Em um ciclo de 28 dias, a ovulação costuma acontecer por volta de qual dia?", o: ["Dia 1", "Dia 7", "Dia 14", "Dia 28"], c: 2 },
    { q: "Em que parte do corpo da mulher costuma acontecer a fecundação?", o: ["No ovário", "Na vagina", "No colo do útero", "Na tuba uterina"], c: 3 },
    { q: "Qual camada do útero descama na menstruação?", o: ["Perimétrio", "Miométrio", "Endométrio", "Colo do útero"], c: 2 },
    { q: "Quantos cromossomos tem cada gameta (óvulo ou espermatozoide)?", o: ["46", "23", "44", "92"], c: 1 },
    { q: "Qual é a ordem do comando hormonal do ciclo?", o: ["Ovário → hipófise → hipotálamo", "Hipófise → ovário → hipotálamo", "Hipotálamo → hipófise → ovário", "Ovário → hipotálamo → hipófise"], c: 2 },
    { q: "Qual hormônio tem um pico que desencadeia a ovulação?", o: ["Progesterona", "LH", "Testosterona", "hCG"], c: 1 }
  ]);

  add("emb-02", "Embriologia · Aula 02 · Fecundação, Implantação e Placenta", "PLACENTA", [
    { q: "Por que só um espermatozoide entra no óvulo?", o: ["O óvulo só tem uma porta", "Os outros morrem na vagina", "A reação cortical endurece a zona pelúcida e fecha a porta", "O óvulo é pequeno demais"], c: 2 },
    { q: "Qual é a ordem correta do desenvolvimento na primeira semana?", o: ["Zigoto → mórula → blastocisto → nidação", "Blastocisto → zigoto → mórula → nidação", "Mórula → zigoto → nidação → blastocisto", "Nidação → zigoto → mórula → blastocisto"], c: 0 },
    { q: "Qual hormônio o teste de gravidez de farmácia detecta?", o: ["Estrogênio", "LH", "FSH", "hCG"], c: 3 },
    { q: "Do blastocisto, o embrioblasto vira:", o: ["A placenta", "O embrião", "O cordão umbilical", "O líquido amniótico"], c: 1 },
    { q: "O cordão umbilical tem:", o: ["2 veias e 1 artéria", "3 artérias", "2 artérias e 1 veia", "3 veias"], c: 2 },
    { q: "Qual é o papel da placenta?", o: ["Só proteger o bebê de impactos", "Fazer as trocas entre mãe e bebê e produzir hormônios", "Produzir os óvulos", "Formar o cérebro do bebê"], c: 1 }
  ]);

  add("emb-03", "Embriologia · Aula 03 · Organogênese e Teratogênese", "TUBONEURAL", [
    { q: "Qual folheto do embrião forma os músculos e os ossos?", o: ["Ectoderma", "Mesoderma", "Endoderma", "Trofoblasto"], c: 1 },
    { q: "O sistema nervoso vem de qual folheto?", o: ["Ectoderma", "Mesoderma", "Endoderma", "Córion"], c: 0 },
    { q: "O que acontece quando o tubo neural não fecha direito?", o: ["Anemia falciforme", "Fenilcetonúria", "Distrofia de Duchenne", "Espinha bífida ou anencefalia"], c: 3 },
    { q: "Qual substância ajuda a prevenir os defeitos do tubo neural?", o: ["Ácido fólico", "Vitamina K", "Ferro", "Cálcio"], c: 0 },
    { q: "Os somitos dão origem a:", o: ["Pulmões e fígado", "Placenta e cordão", "Vértebras e músculos do tronco", "Apenas a pele da mão"], c: 2 },
    { q: "Quando o embrião é mais sensível a remédios e vírus (período crítico)?", o: ["Só no 9º mês", "Antes da fecundação", "Depois do parto", "Da 3ª à 8ª semana"], c: 3 }
  ]);

  window.TESTES = T;
})();
