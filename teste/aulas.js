/* Pré-teste e pós-teste de cada aula. Mesmo teste nos dois momentos.
   A nota é calculada no servidor (Apps Script); este arquivo não tem o gabarito. */
(function () {
  var T = {};
  window.TESTE_QS = function (b, m) { return m === "pre" ? (b.qpre || b.q) : (b.qpos || b.q); };
  window.POS_DESDE = "2026-10-28T04:00:00Z"; /* pós feitos antes disso usaram o teste antigo */
  T["gen-01"] = { titulo: "Genética · Aula 01 · Revisão", palavra: "", pre: "teste-pre", pos: "teste-pos", q: window.TESTE };
  function add(id, titulo, palavra, q) { T[id] = { titulo: titulo, palavra: palavra, pre: "pre-" + id, pos: "pos-" + id, q: q }; }

  add("gen-02", "Genética · Aula 02 · Dogma Central e Erros Inatos", "", [
    { q: "No DNA, qual base se encaixa com a adenina (A)?", o: ["Citosina (C)", "Guanina (G)", "Timina (T)", "Uracila (U)"] },
    { q: "Qual é o caminho correto da informação genética?", o: ["Proteína → RNA → DNA", "RNA → DNA → proteína", "DNA → proteína → RNA", "DNA → RNA → proteína"] },
    { q: "Na cópia do DNA, qual enzima monta a fita nova?", o: ["Helicase", "DNA polimerase", "DNA ligase", "Lipase"] },
    { q: "O que é um erro inato do metabolismo?", o: ["Uma infecção pega depois do nascimento", "Uma lesão causada por esforço", "Uma doença genética em que o gene de uma enzima está com defeito", "Uma falta de vitamina na dieta"] },
    { q: "Na fenilcetonúria (PKU), qual substância se acumula no sangue?", o: ["Fenilalanina", "Tirosina", "Glicose", "Oxigênio"] },
    { q: "Por que o teste do pezinho é importante?", o: ["Mede a altura do bebê", "Serve só para saber o tipo de sangue", "Descobre doenças como a PKU antes dos sintomas, e o cuidado começa cedo", "Substitui as vacinas"] }
  ]);

  add("gen-03", "Genética · Aula 03 · Tradução e Herança", "", [
    { q: "Como se chama cada grupo de 3 letras do RNA?", o: ["Íntron", "Códon", "Gene", "Cromátide"] },
    { q: "Onde a proteína é montada?", o: ["No núcleo", "Na membrana da célula", "No ribossomo", "No lisossomo"] },
    { q: "O que é genótipo?", o: ["O que a gente vê, como a cor dos olhos", "Os genes que a pessoa tem, como Aa", "O ambiente onde a pessoa vive", "O número de cromossomos"] },
    { q: "Dois pais portadores (Aa × Aa) de uma doença autossômica recessiva: qual a chance de cada filho ter a doença?", o: ["0%", "50%", "100%", "25%"] },
    { q: "Na herança ligada ao X recessiva, por que os meninos são mais afetados?", o: ["Porque têm só um X, sem outro X para compensar", "Porque têm dois Y", "Porque o pai passa o X para o filho homem", "Porque o gene fica no Y"] },
    { q: "Qual proteína falta na distrofia muscular de Duchenne?", o: ["Hemoglobina", "Insulina", "Fenilalanina", "Distrofina"] }
  ]);

  add("gen-04", "Genética · Aula 04 · Sangue e Mutações", "", [
    { q: "Uma pessoa do tipo sanguíneo O:", o: ["Tem o antígeno A", "Não tem antígeno A nem B", "Tem o antígeno B", "Tem os antígenos A e B"] },
    { q: "Um pai do tipo A (AO) e uma mãe do tipo B (BO) podem ter filhos de qual tipo?", o: ["Só A", "Só B", "Só AB", "A, B, AB ou O"] },
    { q: "Mãe Rh negativo com bebê Rh positivo. Quando o risco é maior?", o: ["Na 1ª gravidez, sempre", "Nas gravidezes seguintes, porque os anticorpos podem atacar as hemácias do bebê", "Nunca há risco", "Só se o bebê for menina"] },
    { q: "O que é uma mutação de troca (de ponto)?", o: ["Um cromossomo inteiro some", "O RNA é cortado em pedaços", "Uma letra do DNA vira outra", "A célula para de se dividir"] },
    { q: "A anemia falciforme é uma herança:", o: ["Ligada ao Y", "Autossômica dominante", "Ligada ao X dominante", "Autossômica recessiva"] },
    { q: "Por que a pessoa com anemia falciforme sente dor nas crises?", o: ["Faltam cálcio e vitamina D", "Hemácias em foice entopem vasos pequenos e falta oxigênio", "Há glóbulos brancos demais", "As hemácias ficam grandes demais"] }
  ]);

  add("emb-01", "Embriologia · Aula 01 · Aparelho Reprodutor e Ciclo Menstrual", "", [
    { q: "Em um ciclo de 28 dias, a ovulação costuma acontecer por volta de qual dia?", o: ["Dia 1", "Dia 7", "Dia 14", "Dia 28"] },
    { q: "Em que parte do corpo da mulher costuma acontecer a fecundação?", o: ["No ovário", "Na vagina", "No colo do útero", "Na tuba uterina"] },
    { q: "Qual camada do útero descama na menstruação?", o: ["Perimétrio", "Miométrio", "Endométrio", "Colo do útero"] },
    { q: "Quantos cromossomos tem cada gameta (óvulo ou espermatozoide)?", o: ["46", "23", "44", "92"] },
    { q: "Qual é a ordem do comando hormonal do ciclo?", o: ["Ovário → hipófise → hipotálamo", "Hipófise → ovário → hipotálamo", "Hipotálamo → hipófise → ovário", "Ovário → hipotálamo → hipófise"] },
    { q: "Qual hormônio tem um pico que desencadeia a ovulação?", o: ["Progesterona", "LH", "Testosterona", "hCG"] }
  ]);

  /* Aula 02: o pré-teste (feito antes da divisão do deck) mantém as questões antigas em qpre; o pós usa as questões da fecundação. */
  add("emb-02", "Embriologia · Aula 02 · Fecundação", "", [
    { q: "Para que serve a capacitação do espermatozoide?", o: ["Para o espermatozoide perder a capa de proteínas e bater o flagelo em “modo turbo”", "Para formar o zigoto", "Para digerir a placenta", "Para fabricar o hCG"] },
    { q: "Onde acontece habitualmente a fecundação?", o: ["No útero", "Na ampola da tuba uterina", "Na vagina", "No colo do útero"] },
    { q: "Qual enzima do espermatozoide digere o ácido hialurônico do cumulus?", o: ["Lipase", "Amilase", "PH-20", "Helicase"] },
    { q: "Quantos cromossomos tem o zigoto?", o: ["23", "46", "69", "92"] },
    { q: "Por que as mitocôndrias do bebê vêm da mãe?", o: ["As do pai se desfazem depois da entrada no ovócito", "O espermatozoide não tem mitocôndrias", "As do pai são rejeitadas pelo útero", "O ovócito troca as mitocôndrias do pai por novas"] },
    { q: "Quem “decide” o sexo do bebê?", o: ["O ovócito, que pode trazer X ou Y", "O espermatozoide, que pode trazer X ou Y", "A placenta", "O útero"] }
  ]);
  T["emb-02"].qpre = [
    { q: "Por que só um espermatozoide entra no óvulo?", o: ["O óvulo só tem uma porta", "Os outros morrem na vagina", "A reação cortical endurece a zona pelúcida e fecha a porta", "O óvulo é pequeno demais"] },
    { q: "Qual é a ordem correta do desenvolvimento na primeira semana?", o: ["Zigoto → mórula → blastocisto → nidação", "Blastocisto → zigoto → mórula → nidação", "Mórula → zigoto → nidação → blastocisto", "Nidação → zigoto → mórula → blastocisto"] },
    { q: "Qual hormônio o teste de gravidez de farmácia detecta?", o: ["Estrogênio", "LH", "FSH", "hCG"] },
    { q: "Do blastocisto, o embrioblasto vira:", o: ["A placenta", "O embrião", "O cordão umbilical", "O líquido amniótico"] },
    { q: "O cordão umbilical tem:", o: ["2 veias e 1 artéria", "3 artérias", "2 artérias e 1 veia", "3 veias"] },
    { q: "Qual é o papel da placenta?", o: ["Só proteger o bebê de impactos", "Fazer as trocas entre mãe e bebê e produzir hormônios", "Produzir os óvulos", "Formar o cérebro do bebê"] }
  ];

  add("emb-03", "Embriologia · Aula 03 · Primeira Semana, Anexos e Placenta", "", [
    { q: "Qual é a ordem correta do desenvolvimento na primeira semana?", o: ["Zigoto → mórula → blastocisto → nidação", "Blastocisto → zigoto → mórula → nidação", "Mórula → zigoto → nidação → blastocisto", "Nidação → zigoto → mórula → blastocisto"] },
    { q: "No blastocisto, o trofoblasto vira:", o: ["O embrião", "A placenta e parte dos anexos", "O coração", "O sistema nervoso"] },
    { q: "Qual estrutura produz o hCG na nidação?", o: ["O corpo lúteo", "O ovário", "O sinciciotrofoblasto", "O saco vitelino"] },
    { q: "O cordão umbilical tem:", o: ["2 veias e 1 artéria", "3 artérias", "2 artérias e 1 veia", "3 veias"] },
    { q: "Pouquíssimo líquido amniótico (oligoidrâmnio) pode causar:", o: ["Excesso de movimento do bebê", "Articulações rígidas, como a artrogripose", "Mais líquido na bexiga", "Nada, o bebê não se mexe mesmo"] },
    { q: "No 3º trimestre, por que a gestante deve evitar ficar muito tempo de barriga para cima?", o: ["O útero comprime a veia cava e cai o fluxo para a placenta", "O bebê fica sem espaço para respirar", "A placenta descola sozinha", "O líquido amniótico escorre"] }
  ]);

  add("emb-04", "Embriologia · Aula 04 · Organogênese e Teratogênese", "", [
    { q: "Qual folheto do embrião forma os músculos e os ossos?", o: ["Ectoderma", "Mesoderma", "Endoderma", "Trofoblasto"] },
    { q: "O sistema nervoso vem de qual folheto?", o: ["Ectoderma", "Mesoderma", "Endoderma", "Córion"] },
    { q: "O que acontece quando o tubo neural não fecha direito?", o: ["Anemia falciforme", "Fenilcetonúria", "Distrofia de Duchenne", "Espinha bífida ou anencefalia"] },
    { q: "Qual substância ajuda a prevenir os defeitos do tubo neural?", o: ["Ácido fólico", "Vitamina K", "Ferro", "Cálcio"] },
    { q: "Os somitos dão origem a:", o: ["Pulmões e fígado", "Placenta e cordão", "Vértebras e músculos do tronco", "Apenas a pele da mão"] },
    { q: "Quando o embrião é mais sensível a remédios e vírus (período crítico)?", o: ["Só no 9º mês", "Antes da fecundação", "Depois do parto", "Da 3ª à 8ª semana"] }
  ]);

  window.TESTES = T;

  add("emb-05", "Embriologia · Aula 05 · Infecções Congênitas e IST", "", [
    { q: "Quais são os três caminhos da transmissão vertical (da mãe para o bebê)?", o: ["Pele, ar e água", "Placenta, parto e amamentação", "Só pela placenta", "Só pelo parto"] },
    { q: "A síndrome congênita do Zika está associada a:", o: ["Focomelia", "Microcefalia com espasticidade e artrogripose", "Catarata isolada", "Escoliose idiopática"] },
    { q: "A tríade clássica da toxoplasmose congênita é:", o: ["Surdez, catarata e cardiopatia", "Coriorretinite, hidrocefalia e calcificações", "Tíbia em sabre, dentes e surdez", "Microcefalia, febre e manchas"] },
    { q: "Qual é a infecção congênita mais comum do mundo, com surdez progressiva?", o: ["Rubéola", "Sífilis", "Citomegalovírus", "Zika"] },
    { q: "Catarata, surdez e cardiopatia no recém-nascido lembram qual infecção, que tem vacina?", o: ["Toxoplasmose", "Rubéola", "Sífilis", "Citomegalovírus"] },
    { q: "Qual é o papel do fisioterapeuta com uma criança com síndrome congênita do Zika?", o: ["Esperar o bebê crescer para começar", "Só tratar a família", "Estimulação precoce, posicionamento e orientação da família", "Nenhum, é só caso médico"] }
  ]);

  add("emb-06", "Embriologia · Aula 06 · Métodos Anticoncepcionais", "", [
    { q: "Qual é o único método que também protege contra IST?", o: ["Pílula combinada", "DIU hormonal", "Preservativo", "Laqueadura"] },
    { q: "Como os métodos hormonais evitam a gravidez?", o: ["Matam o espermatozoide na vagina", "Inibem a ovulação e espessam o muco do colo do útero", "Fecham as tubas uterinas", "Impedem a ereção"] },
    { q: "Por que a minipílula é preferida na lactação?", o: ["Tem muito estrogênio", "Não tem estrogênio, que pode reduzir o leite", "É espermicida", "Impede a espermatogênese"] },
    { q: "Como o DIU de cobre age?", o: ["Inibe a ovulação", "Reação inflamatória local, tóxica ao espermatozoide", "Bloqueia o hipotálamo", "Engrossa a parede do útero"] },
    { q: "Na vasectomia:", o: ["Cessa a produção de testosterona", "O ejaculado sai sem espermatozoides", "Acaba a ereção", "As tubas uterinas são ligadas"] },
    { q: "Por que os métodos comportamentais falham mais que os hormonais?", o: ["Dependem de prever a ovulação, que varia de ciclo para ciclo", "Têm hormônio demais", "Só funcionam em mulheres tabagistas", "Impedem a menstruação"] }
  ]);

  add("emb-07", "Embriologia · Aula 07 · Mudanças no Corpo da Mulher", "", [
    { q: "A hiperlordose lombar na gestação resulta de:", o: ["Aumento da massa óssea", "Centro de gravidade deslocado e frouxidão ligamentar pela relaxina", "Redução do volume plasmático", "Hipotensão supina"] },
    { q: "Por que se evita o decúbito dorsal prolongado na gestação avançada?", o: ["O útero comprime a veia cava e cai o retorno venoso", "O bebê não consegue respirar", "A placenta descola", "Aumenta o leite"] },
    { q: "A diástase dos retos do abdome é:", o: ["O afastamento das costelas", "O afastamento dos retos na linha alba", "A ruptura do diafragma", "A hérnia do umbigo"] },
    { q: "Qual hormônio aumenta a frouxidão dos ligamentos e prepara a pelve para o parto?", o: ["Ocitocina", "Prolactina", "Relaxina", "Insulina"] },
    { q: "O tratamento da incontinência urinária de esforço na gestação e no pós-parto inclui:", o: ["Repouso total", "Kegel, biofeedback e orientação da pressão abdominal", "Abdominais tradicionais", "Cinta apertada o dia todo"] },
    { q: "Qual é a principal causa de hemorragia no quarto período do parto?", o: ["Febre", "Atonia uterina", "Diástase", "Hipotensão supina"] }
  ]);

  add("emb-08", "Embriologia · Aula 08 · Revisão Geral", "", [
    { q: "O que dispara a ovulação?", o: ["Pico de FSH", "Pico de LH", "Pico de progesterona", "Queda de estrogênio"] },
    { q: "Qual estrutura é formada por massa celular interna e trofoblasto?", o: ["Mórula", "Blastocisto", "Zigoto", "Âmnio"] },
    { q: "Falha do fechamento do tubo neural com herniação de meninges e medula:", o: ["Anencefalia", "Mielomeningocele", "Microcefalia", "Hidrocefalia"] },
    { q: "Qual fármaco causa focomelia?", o: ["Ácido fólico", "Talidomida", "Penicilina", "Levonorgestrel"] },
    { q: "A tríade coriorretinite, hidrocefalia e calcificações é de qual infecção?", o: ["Rubéola", "Toxoplasmose", "Sífilis", "Zika"] },
    { q: "Por que a minipílula é preferida na lactação?", o: ["Tem alto teor de estrogênio", "Impede a espermatogênese", "Não tem estrogênio, que pode reduzir o leite", "É espermicida"] }
  ]);

  /* Pós-testes com perguntas diferentes das do pré (28/10/2026). O pré de cada aula continua o mesmo. */
  T["gen-01"].qpos = [
    { q: "Qual base nitrogenada existe no RNA no lugar da timina?", o: ["Citosina", "Guanina", "Adenina", "Uracila"] },
    { q: "Qual processo copia o DNA antes de a célula se dividir?", o: ["Transcrição", "Tradução", "Replicação", "Mutação"] },
    { q: "A meiose produz:", o: ["Duas células com 46 cromossomos, iguais entre si", "Quatro células com 23 cromossomos, diferentes entre si", "Uma célula com 92 cromossomos", "Duas células com 23 cromossomos, iguais entre si"] },
    { q: "Quantos cromossomos tem uma célula do corpo (somática) humana?", o: ["23", "44", "46", "92"] },
    { q: "Uma pessoa com genótipo aa é chamada de:", o: ["Heterozigota", "Homozigota dominante", "Hemizigota", "Homozigota recessiva"] },
    { q: "Em um casal Aa × Aa, qual a chance de um filho ter o fenótipo dominante?", o: ["25%", "50%", "75%", "100%"] },
    { q: "Dois pais afetados têm um filho sem a doença. O tipo de herança mais provável é:", o: ["Autossômica dominante", "Autossômica recessiva", "Ligada ao Y", "Mitocondrial"] },
    { q: "Um homem daltônico e uma mulher sem o gene do daltonismo (XDXD) terão filhos homens:", o: ["Todos daltônicos", "50% daltônicos", "Nenhum daltônico", "Só as meninas serão normais"] },
    { q: "O crossing-over (troca de pedaços entre cromossomos) acontece na:", o: ["Mitose", "Meiose", "Replicação", "Tradução"] },
    { q: "Qual é o cariótipo normal de uma mulher?", o: ["46,XY", "47,XX", "45,X", "46,XX"] }
  ];
  T["gen-02"].qpos = [
    { q: "No DNA, qual base se encaixa com a guanina (G)?", o: ["Timina", "Adenina", "Citosina", "Uracila"] },
    { q: "Qual enzima abre a escada do DNA, como um zíper?", o: ["DNA ligase", "Helicase", "DNA polimerase", "Amilase"] },
    { q: "Qual enzima cola os pedacinhos da fita nova de DNA?", o: ["DNA ligase", "Helicase", "Lipase", "Hemoglobina"] },
    { q: "Na fenilcetonúria, o corpo não consegue transformar a fenilalanina em:", o: ["Glicose", "Insulina", "Hemoglobina", "Tirosina"] },
    { q: "Quando o teste do pezinho é feito?", o: ["Aos 5 anos de idade", "Nos primeiros dias de vida, com uma gotinha de sangue do calcanhar", "Só na gravidez", "Só quando aparecem sintomas"] },
    { q: "Qual é o tratamento da fenilcetonúria?", o: ["Cirurgia no cérebro", "Vacina", "Dieta com pouca fenilalanina, começando cedo", "Antibiótico por 10 dias"] }
  ];
  T["gen-03"].qpos = [
    { q: "Qual tipo de herança costuma aparecer em todas as gerações, bastando uma cópia alterada do gene?", o: ["Autossômica recessiva", "Autossômica dominante", "Ligada ao Y", "Mitocondrial"] },
    { q: "Pais portadores (Aa) de uma doença autossômica recessiva são:", o: ["Sempre doentes", "Sempre sem nenhum gene alterado", "Saudáveis, mas podem ter um filho doente", "Impossibilitados de ter filhos"] },
    { q: "Pai com uma doença autossômica dominante (Aa) e mãe sem a doença (aa): qual a chance de cada filho ter a doença?", o: ["25%", "75%", "50%", "0%"] },
    { q: "Qual destas doenças tem herança autossômica recessiva?", o: ["Doença de Huntington", "Acondroplasia", "Fenilcetonúria", "Distrofia de Duchenne"] },
    { q: "O pai pode passar o cromossomo X para o filho homem?", o: ["Sim, sempre", "Não: ele passa o Y", "Só se for portador", "Só nas doenças dominantes"] },
    { q: "Qual é um cuidado da fisioterapia na distrofia de Duchenne?", o: ["Exercícios intensos até a exaustão", "Repouso absoluto na cama", "Evitar qualquer acompanhamento da respiração", "Exercícios leves, sem exagero, mantendo a amplitude das articulações"] }
  ];
  /* Respostas de Genética 03 apagadas em 28/10: fases novas; as linhas antigas da planilha ficam de fora. */
  T["gen-03"].pre = "pre2-gen-03"; T["gen-03"].pos = "pos2-gen-03";
  T["gen-04"].qpos = [
    { q: "Uma pessoa do tipo AB tem:", o: ["Só o antígeno A", "Só o antígeno B", "Os antígenos A e B", "Nenhum antígeno"] },
    { q: "Por que não se pode dar sangue de qualquer tipo para qualquer pessoa?", o: ["Porque o sangue acaba rápido", "Porque os anticorpos de quem recebe podem atacar as hemácias com antígeno que ele não tem", "Porque o volume é diferente", "Porque só importa o Rh"] },
    { q: "Mãe Rh negativo com bebê Rh positivo: o corpo dela pode:", o: ["Criar anticorpos contra as hemácias do bebê", "Ficar Rh positivo", "Parar de produzir sangue", "Transformar o bebê em Rh negativo"] },
    { q: "Quando um cromossomo inteiro, ou um pedaço grande dele, muda de número ou de forma, a mutação é:", o: ["De troca (de ponto)", "De perda ou ganho de letras", "Silenciosa", "Cromossômica"] },
    { q: "Na anemia falciforme, o que muda no gene da hemoglobina?", o: ["O gene inteiro some", "Uma troca de uma letra", "O cromossomo X é perdido", "Um cromossomo a mais aparece"] },
    { q: "Quem tem só uma cópia do gene da anemia falciforme (traço falciforme) em geral:", o: ["Tem crises todos os meses", "Precisa de transfusão toda semana", "Não tem sintomas importantes, mas pode passar o gene", "Não pode ter filhos"] }
  ];
  T["emb-01"].qpos = [
    { q: "Qual hormônio da hipófise estimula o crescimento do folículo no ovário?", o: ["FSH", "Progesterona", "hCG", "Testosterona"] },
    { q: "Qual estrutura produz progesterona depois da ovulação?", o: ["O endométrio", "A tuba uterina", "O corpo lúteo", "O colo do útero"] },
    { q: "Se não houver fecundação, o que acontece com o corpo lúteo?", o: ["Vira o embrião", "Degenera, a progesterona cai e vem a menstruação", "Cresce até o fim do mês", "Passa para a tuba"] },
    { q: "Qual célula é liberada na ovulação?", o: ["O óvulo", "O zigoto", "O espermatozoide", "O ovócito II"] },
    { q: "Onde os espermatozoides são produzidos?", o: ["Nos testículos", "Na próstata", "Na uretra", "Nas vesículas seminais"] },
    { q: "Qual hormônio do hipotálamo comanda a hipófise no ciclo?", o: ["LH", "FSH", "GnRH", "Estrogênio"] }
  ];
  T["emb-03"].qpos = [
    { q: "No blastocisto, qual parte vira o embrião?", o: ["Trofoblasto", "Embrioblasto", "Zona pelúcida", "Cavidade"] },
    { q: "Uma mórula tem aproximadamente quantas células?", o: ["2 a 4", "16 a 32", "Mais de 500", "Uma só"] },
    { q: "Para que serve o hCG nas primeiras semanas?", o: ["Fabricar leite", "Mantém o corpo lúteo e a progesterona alta", "Formar os ossos", "Parar a menstruação do bebê"] },
    { q: "Qual estrutura guarda o líquido amniótico?", o: ["Córion", "Saco vitelino", "Alantoide", "Âmnio"] },
    { q: "Na placenta, o sangue da mãe e o do bebê:", o: ["Passam lado a lado, sem se misturar", "Se misturam completamente", "Nunca chegam perto", "Só se misturam no parto"] },
    { q: "Para que serve a geleia de Wharton no cordão umbilical?", o: ["Produzir hormônios", "Proteger os vasos contra compressão", "Fazer o bebê crescer", "Produzir sangue"] }
  ];
  T["emb-04"].qpos = [
    { q: "Qual folheto origina o fígado e o pâncreas?", o: ["Ectoderma", "Mesoderma", "Endoderma", "Trofoblasto"] },
    { q: "A gastrulação (3ª semana) forma:", o: ["A placenta", "O disco trilaminar, com os três folhetos", "O coração pronto", "Os membros"] },
    { q: "O que é a mielomeningocele?", o: ["Falta do cérebro", "Uma infecção da pele", "Espinha bífida com meninges e tecido neural expostos numa bolsa nas costas", "Excesso de líquido no abdome"] },
    { q: "A talidomida na gestação causa:", o: ["Focomelia, com membros rudimentares ou ausentes", "Catarata", "Surdez progressiva", "Anemia falciforme"] },
    { q: "O miótomo (dos somitos) origina:", o: ["As vértebras", "A derme do dorso", "A musculatura esquelética axial", "O fígado"] },
    { q: "Por que o ácido fólico deve ser tomado antes da concepção?", o: ["O tubo neural fecha por volta da 4ª semana, quando muita mulher ainda não sabe que está grávida", "Para formar o leite", "Para evitar enjoo", "Para o bebê nascer mais cedo"] }
  ];
  T["emb-05"].qpos = [
    { q: "Qual infecção congênita tem vacina tríplice viral, que deve ser tomada antes da gestação?", o: ["Zika", "Rubéola", "Sífilis", "Toxoplasmose"] },
    { q: "Como o Zika é transmitido?", o: ["Pela picada do Aedes aegypti", "Pela água suja", "Por carne crua", "Pelo ar"] },
    { q: "Na sífilis congênita tardia, a curvatura da tíbia para frente é chamada de:", o: ["Sinal de Gowers", "Tíbia em sabre", "Tríade de Hutchinson", "Pé torto"] },
    { q: "Qual infecção está ligada a carne crua, verduras mal lavadas e fezes de gato?", o: ["Rubéola", "Citomegalovírus", "Sífilis", "Toxoplasmose"] },
    { q: "Por que a criança com Zika precisa de fisioterapia desde os primeiros meses?", o: ["Para aproveitar a plasticidade neural e prevenir contraturas", "Porque a fisioterapia cura o vírus", "Porque o bebê não precisa de família", "Porque não existe outro tratamento"] },
    { q: "Qual infecção pode passar da mãe para o bebê durante o parto?", o: ["Zika", "Herpes genital", "Rubéola", "Toxoplasmose"] }
  ];
  T["emb-06"].qpos = [
    { q: "O feedback negativo dos hormonais sobre o hipotálamo e a hipófise resulta em:", o: ["Mais ovulação", "Sem pico de LH e, portanto, sem ovulação", "Gravidez garantida", "Menstruação todo dia"] },
    { q: "A tabelinha (Ogino-Knaus) é um método:", o: ["De barreira", "Hormonal", "Definitivo", "Comportamental"] },
    { q: "Em qual situação se deve evitar o estrogênio?", o: ["Mulher de 20 anos sem doenças", "Tabagista acima de 35 anos", "Mulher com cólica", "Atleta"] },
    { q: "A pílula do dia seguinte (levonorgestrel) age principalmente:", o: ["Interrompendo uma gestação já implantada", "Retardando ou inibindo a ovulação", "Fechando as tubas", "Matando o espermatozoide na vagina"] },
    { q: "O DIU hormonal libera:", o: ["Estrogênio", "Insulina", "Levonorgestrel", "Testosterona"] },
    { q: "Qual destes métodos tem eficácia muito alta?", o: ["Tabelinha", "DIU", "Coito interrompido", "Muco cervical"] }
  ];
  T["emb-07"].qpos = [
    { q: "O volume plasmático da gestante aumenta cerca de:", o: ["5%", "10%", "50%", "200%"] },
    { q: "Na hipotensão supina, qual é a conduta?", o: ["Deitar de barriga para cima", "Lateralizar, de preferência para a esquerda", "Ficar de pé parada", "Dar água gelada"] },
    { q: "Qual é a queixa mais comum da postura na gestação?", o: ["Dor lombar", "Dor de ouvido", "Dor no peito do pé", "Dor de cabeça"] },
    { q: "Quais são os quatro períodos do parto?", o: ["Dilatação, expulsão, dequitação e quarto período", "Fecundação, nidação, parto e alta", "Pré-parto, parto, pós e revisão", "Contração, pausa, descanso e alta"] },
    { q: "O puerpério dura cerca de:", o: ["1 dia", "1 semana", "6 semanas", "1 ano"] },
    { q: "Na diástase dos retos do abdome, o que se evita nos exercícios?", o: ["Respirar fundo", "Caminhar", "Ativar o transverso", "Abdominal tradicional"] }
  ];
  T["emb-08"].qpos = [
    { q: "Qual hormônio o teste de gravidez de farmácia detecta?", o: ["LH", "hCG", "FSH", "Progesterona"] },
    { q: "Em qual parte da tuba uterina acontece a fecundação?", o: ["Na ampola", "Na fímbria", "No istmo", "No útero"] },
    { q: "Qual folheto origina músculos e ossos?", o: ["Endoderma", "Ectoderma", "Mesoderma", "Córion"] },
    { q: "Qual é a infecção congênita mais comum no mundo, com surdez progressiva?", o: ["Rubéola", "Citomegalovírus", "Zika", "Sífilis"] },
    { q: "Qual hormônio afrouxa articulações e pelve na gestação?", o: ["Insulina", "Ocitocina", "Relaxina", "Tiroxina"] },
    { q: "Qual é o único método anticoncepcional que também protege contra IST?", o: ["DIU de cobre", "Pílula", "Laqueadura", "Preservativo"] }
  ];

  add("gen-05", "Genética · Aula 05 · Mutações Cromossômicas e Cariótipo", "", [
    { q: "Quantos cromossomos tem uma pessoa sem alteração?", o: ["23", "44", "46", "48"] },
    { q: "Ter 3 cópias de um mesmo cromossomo se chama:", o: ["Monossomia", "Trissomia", "Deleção", "Inversão"] },
    { q: "A síndrome de Down acontece por trissomia de qual cromossomo?", o: ["13", "18", "21", "X"] },
    { q: "A síndrome de Turner é representada por:", o: ["47,XXY", "47,+21", "45,X", "46,XX"] },
    { q: "Qual exame mostra os cromossomos organizados em pares?", o: ["Hemograma", "Cariótipo", "Ultrassom", "Eletrocardiograma"] },
    { q: "Uma característica comum do bebê com síndrome de Down é:", o: ["Hipotonia (corpo molinho)", "Músculos muito rígidos", "Ossos de vidro", "Pele azulada"] }
  ]);
  T["gen-05"].qpos = [
    { q: "A notação 47,XX,+21 corresponde a:", o: ["Turner", "Klinefelter", "Down em uma menina", "Edwards"] },
    { q: "O erro na meiose em que o par de cromossomos não se separa se chama:", o: ["Não disjunção", "Transcrição", "Replicação", "Tradução"] },
    { q: "Por que a instabilidade atlantoaxial exige cuidado na síndrome de Down?", o: ["Porque os ligamentos frouxos podem deixar as vértebras do pescoço instáveis", "Porque os ossos do pé são curtos", "Porque o coração para", "Porque os músculos são muito fortes"] },
    { q: "A síndrome de Klinefelter é representada por:", o: ["45,X", "47,XXY", "47,+21", "46,XY"] },
    { q: "A coleta de material da placenta entre 10 e 13 semanas é a:", o: ["Amniocentese", "Biópsia de vilo corial", "NIPT", "Ultrassom morfológico"] },
    { q: "Quando um pedaço de cromossomo some, como no cri-du-chat (cromossomo 5), a mutação é uma:", o: ["Trissomia", "Duplicação", "Deleção", "Inversão"] }
  ];
  add("gen-06", "Genética · Aula 06 · Teratologia e Farmacogenética", "", [
    { q: "Teratógeno é um agente que:", o: ["Cura malformações", "Atrapalha a formação do embrião ou do feto", "Aumenta a altura", "Gera energia"] },
    { q: "A talidomida causa:", o: ["Focomelia (membros curtos)", "Daltonismo", "Anemia falciforme", "Diabetes"] },
    { q: "O que a farmacogenética estuda?", o: ["A cor dos olhos", "Como os genes mudam a resposta aos remédios", "A estrutura do osso", "O ciclo menstrual"] },
    { q: "O álcool na gravidez pode causar:", o: ["Síndrome alcoólica fetal", "Tipo sanguíneo O", "Síndrome de Turner", "Nada"] },
    { q: "O Zika vírus na gravidez é conhecido por causar:", o: ["Microcefalia", "Cabelo branco", "Calvície", "Miopia"] },
    { q: "Período crítico é:", o: ["A semana de provas", "O momento em que o órgão está se formando e fica mais vulnerável", "O dia do parto", "O último mês da gestação"] }
  ]);
  T["gen-06"].qpos = [
    { q: "Como a radiação ionizante em altas doses pode ser teratogênica?", o: ["Quebrando o DNA de células que se dividem rápido", "Bloqueando o folato", "Fechando os vasos da placenta", "Aumentando a gordura"] },
    { q: "O efeito de um teratógeno depende de:", o: ["Só da dose", "Do agente, do genótipo do bebê e do período crítico", "Só da cor da pele", "Só do sexo do bebê"] },
    { q: "O ácido valproico está ligado a:", o: ["Defeitos do tubo neural", "Daltonismo", "Síndrome de Down", "Pé torto por esporte"] },
    { q: "O gene COL5A1 está relacionado a qual tecido ou proteína?", o: ["Hemoglobina", "Colágeno", "Insulina", "Sistema nervoso central"] },
    { q: "Dois pacientes têm alívio diferente com o mesmo analgésico. Uma explicação possível é:", o: ["Polimorfismos genéticos diferentes", "Cor do cabelo", "Altura", "Tipo de sapato"] },
    { q: "Uma atleta em idade fértil usa isotretinoína. O fisioterapeuta deve:", o: ["Ignorar", "Comunicar a equipe e orientar o treino com cuidado, pois o remédio é teratogênico", "Aumentar a carga", "Proibir qualquer exercício"] }
  ];
  add("gen-07", "Genética · Aula 07 · Doenças Genéticas, Aconselhamento e Ética", "", [
    { q: "Doença presente ao nascer, por qualquer causa, é:", o: ["Congênita", "Só hereditária", "Só cromossômica", "Só infecciosa"] },
    { q: "A síndrome de Down é uma doença:", o: ["Cromossômica", "Monogênica ligada ao X", "Autossômica dominante", "Causada por vírus"] },
    { q: "A distrofia muscular de Duchenne é uma doença:", o: ["Cromossômica", "Monogênica ligada ao X", "Multifatorial", "Infecciosa"] },
    { q: "Quem conduz o aconselhamento genético?", o: ["O geneticista clínico", "O motorista", "O professor de educação física", "O farmacêutico, sempre"] },
    { q: "A mielomeningocele é um exemplo de doença:", o: ["Multifatorial", "Só por um gene", "Só infecciosa", "Sem causa conhecida"] },
    { q: "A anemia falciforme é uma doença:", o: ["Autossômica recessiva", "Ligada ao Y", "Causada por bactéria", "Cromossômica"] }
  ]);
  T["gen-07"].qpos = [
    { q: "Doença hereditária é aquela que:", o: ["Passa dos pais aos filhos pelos gametas", "Só aparece em idosos", "É sempre causada por vírus", "Aparece só em atletas"] },
    { q: "A edição gênica somática:", o: ["Altera só as células do paciente e não passa aos filhos", "Altera os óvulos e os espermatozoides", "É proibida em qualquer caso", "Altera todos os parentes"] },
    { q: "Qual é o papel do fisioterapeuta no aconselhamento genético?", o: ["Integrar a equipe e informar sobre prognóstico funcional", "Decidir pela família", "Fazer o cariótipo", "Nenhum"] },
    { q: "Por que as novas terapias gênicas (AME e Duchenne) levantam um debate ético?", o: ["O custo é muito alto e há questão de acesso", "Elas são baratas demais", "Todas passam aos descendentes", "Ninguém quer usar"] },
    { q: "O transplante de células-tronco hematopoéticas é:", o: ["Uma aplicação clínica consolidada", "Só um sonho", "Proibido", "Usado para trocar os ossos"] },
    { q: "Uma doença pode ser congênita sem ser genética?", o: ["Sim, como a causada por teratógenos ou pelo Zika", "Não, nunca", "Só em animais", "Só em adultos"] }
  ];
  add("gen-08", "Genética · Aula 08 · Revisão Geral", "", [
    { q: "Quem tem 47,XY,+21 tem qual síndrome?", o: ["Turner", "Klinefelter", "Down", "Patau"] },
    { q: "Aa × Aa em uma doença autossômica recessiva: qual a chance de um filho afetado?", o: ["0%", "25%", "50%", "100%"] },
    { q: "Qual proteína falta na distrofia de Duchenne?", o: ["Hemoglobina", "Distrofina", "Insulina", "Colágeno"] },
    { q: "Mãe Rh negativo com bebê Rh positivo: qual a prevenção?", o: ["Vacina da gripe", "Imunoglobulina anti-D", "Antibiótico", "Nada"] },
    { q: "O agente que causa focomelia é:", o: ["Álcool", "Talidomida", "Isotretinoína", "Cafeína"] },
    { q: "As terapias gênicas aprovadas hoje para AME e Duchenne são:", o: ["Germinativas", "Somáticas", "Placentárias", "Hereditárias"] }
  ]);
  T["gen-08"].qpos = [
    { q: "A mutação de um gene que troca uma letra do DNA é chamada de:", o: ["Mutação de ponto", "Trissomia", "Deleção de cromossomo", "Cariótipo"] },
    { q: "A não disjunção acontece na:", o: ["Meiose", "Digestão", "Respiração", "Transcrição"] },
    { q: "O que é um códon?", o: ["Um grupo de 3 letras do RNA", "Uma proteína", "Um cromossomo", "Uma hemácia"] },
    { q: "Doença congênita é:", o: ["Presente ao nascer, por qualquer causa", "Sempre hereditária", "Sempre cromossômica", "Aparece só na velhice"] },
    { q: "O efeito de um teratógeno depende do:", o: ["Agente, do genótipo e do período crítico", "Só do remédio", "Só da mãe", "Só da idade do pai"] },
    { q: "O gene COL5A1 se relaciona ao:", o: ["Colágeno", "Sangue", "Sono", "Hormônio sexual"] }
  ];

})();
