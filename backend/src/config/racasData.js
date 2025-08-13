// backend/src/config/racasData.js

const racasData = {
   "Abomena": {
        nome: "Abomena",
        atributos: {}, 
        habilidades_descricao: [
            "<span>+2</span> <span>Força</span>, <span>+1</span> <span>Carisma</span>, <span>-1</span> <span>Inteligência</span> ou <span>Sabedoria</span>.",
            "<span>+2</span> <span>Força</span>, <span>+1</span> <span>Constituição</span>, <span>-1</span> <span>Carisma</span> ou <span>Sabedoria</span>.",
            "<span>Marca da Maldição(Fidelitus):</span> Você pode trocar o atributo-chave de Misticismo para <span>Constituição</span>...",
            "<span>Marca da Maldição(Ingenius):</span> Você pode trocar o atributo-chave de Misticismo para <span>Constituição</span>...",
            "<span>Fé Inabalável (Fidelitus):</span> Você recebe um Poder Concedido de Deus Fidus...",
            "<span>Força Indomável (Ingenius):</span>Você recebe +2 em testes de Luta e +1 em rolagens de ataque com uma arma corpo a corpo."
        ]
    },
    "Anão": {
        nome: "Anão",
        atributos: { CON: 2, SAB: 1, DES: -1 },
        habilidades_descricao: [
            "<span>+2</span> <span>Constituição</span>, <span>+1</span> <span>Sabedoria</span>, <span>-1</span> <span>Destreza</span>.",
            "<span>Conhecimento das Rochas:</span> Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.",
            "<span>Devagar e Sempre:</span> Seu deslocamento é 6m(em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.",
            "<span>Duro como Pedra:</span> Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.",
            "<span>Tradição de Heredrimm:</span>Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas."
        ]
    },
    "Bugbear": {
        nome: "Bugbear",
        atributos: { CAR: -2 }, // +1 em três outros atributos é uma escolha do jogador
        habilidades_descricao: [
            "<span>+1</span> em Três Atributos Diferentes(Exceto <span>Carisma</span>), <span>-2</span> <span>Carisma</span>.",
            "<span>Híbrido Mecânico:</span> Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a cansaço, efeitos metabolícos e veneno...",
            "<span>Natureza Orgânica:</span> Você se torna treinado em uma perícia(que não precisa ser da sua classe) ou recebe um poder geral a sua escolha...",
            "<span>Peças Metálicas:</span> As partes mecânicas que complementam seu corpo fornecem +2 na Defesa, mas impõem uma penalidade de armadura de -2."
        ]
    },
    "Centauro": {
        nome: "Centauro",
        atributos: { SAB: 2, FOR: 1, INT: -1 },
        habilidades_descricao: [
            "<span>Sabedoria</span> <span>+2</span>, <span>Força</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>",
            "<span>Cascos:</span> Você possui uma arma natural de cascos(dano 1d8, crítico x2, impacto)...",
            "<span>Ginete Natural:</span>Você é considerado montado para efeito de fazer investidas...",
            "<span>Medo de Altura:</span> Se estiver adjacente a uma queda de 3m ou mais(como um buraco ou penhasco), você fica abalado."
        ]
    },
    "Ceratops": {
        nome: "Ceratops",
        atributos: { CON: 2, FOR: 1, DES: -1, INT: -1 },
        habilidades_descricao: [
            "<span>Constituição</span> <span>+2</span>, <span>Força</span> <span>+1</span>, <span>Destreza</span> <span>-1</span>, <span>Inteligência</span> <span>-1</span>",
            "<span>Chifres:</span> Você possui uma arma natural de chifres (dano 1d8, crítico x2, perfuração)...",
            "<span>Papel Tribal:</span>Você é treinado em uma perícia a sua escolha entre Cura, Intimidação, Ofício ou Sobrevivência.",
            "<span>Paquidérmico:</span> Seu tamanho é Grande. Você recebe +1 em Defesa e pode usar <span>Força</span> como atributo-chave de Intimidação.",
            "<span>Medo de Altura:</span> Se estiver adjacente a uma queda de 3m ou mais, você fica abalado."
        ]
    },
    "Dahllan": {
        nome: "Dahllan",
        atributos: { SAB: 2, DES: 1, INT: -1 },
        habilidades_descricao: [
            "<span>Sabedoria</span> <span>+2</span>, <span>Destreza</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>",
            "<span>Armadura de Allihanna:</span> Você pode gastar uma ação de movimento e 1PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa...",
            "<span>Amiga das Plantas</span> Você pode lançar a magia Controlar plantas...",
            "<span>Empatia Selvagem:</span> Você pode se comunicar com animais..."
        ]
    },
    "Eiradaan": {
        nome: "Eiradaan",
        atributos: { SAB: 2, CAR: 1, FOR: -1 },
        habilidades_descricao: [
            "<span>Sabedoria</span> <span>+2</span>, <span>Carisma</span> <span>+1</span>, <span>Força</span> <span>-1</span>",
            "<span>Essência Feérica:</span> Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.",
            "<span>Magia Instintiva:</span> Você pode usar <span>Sabedoria</span> no lugar de <span>Inteligência</span> como atributo-chave de Misticismo...",
            "<span>Canção da Melancolia:</span> Quando faz um teste de Vontade contra efeitos mentais, você rola dois dados e usa o pior."
        ]
    },
    "Elfo": {
        nome: "Elfo",
        atributos: { INT: 2, DES: 1, CON: -1 },
        habilidades_descricao: [
            "<span>Inteligência</span> <span>+2</span>, <span>Destreza</span> <span>+1</span>, <span>Constituição</span> <span>-1</span>",
            "<span>Graça de Glórienn:</span> Seu deslocamento é 12m(em vez de 9m).",
            "<span>Sangue Mágico:</span> Você recebe +1 ponto de mana por nível.",
            "<span>Sentidos Élficos:</span> Você recebe visão na penumbra e +2 em Misticismo e Percepção."
        ]
    },
    "Elfo-do-mar": {
        nome: "Elfo-do-mar",
        atributos: { DES: 2, CON: 1, INT: -1 },
        habilidades_descricao: [
            "<span>Destreza</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>",
            "<span>Arsenal do Oceano:</span> Você recebe proficiência em arpão, rede e tridente e +2 em testes de ataque com essas armas.",
            "<span>Cria das Águas:</span> Você possui deslocamento de natação igual a seu deslocamento em terra e visão na penumbra...",
            "<span>Dependência de Água</span> Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso..."
        ]
    },
    "Finntroll": {
        nome: "Finntroll",
        atributos: { INT: 2, CON: 1, FOR: -1 },
        habilidades_descricao: [
            "<span>Inteligência</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Força</span> <span>-1</span>.",
            "<span>Corpo Vegetal:</span> Você é uma criatura do tipo monstro e recebe natureza vegetal e visão no escuro.",
            "<span>Presença Arcana:</span> Você recebe +2 em Misticismo e resistência a magia +2",
            "<span>Regeneração Vegetal:</span> Uma vez por rodada, você pode gastar 1PM para recuperar 5PV. Esta habilidade não cura dano de ácido ou fogo.",
            "<span>Intolerância a Luz:</span> Você recebe sensibilidade a luz e, quando exposto à luz do sol, não consegue ativar sua Regeneração Vegetal."
        ]
    },
    "Galokk": {
        nome: "Galokk",
        atributos: { FOR: 1, CON: 1, CAR: -1 }, // +1 em outro atributo é escolha do jogador
        habilidades_descricao: [
            "<span>Força</span> <span>+1</span>, <span>Constituição</span> <span>+1</span>, <span>+1</span> em um Atributo, <span>Carisma</span> <span>-1</span>.",
            "<span>Força dos Titãs:</span> Quando faz um ataque corpo a corpo ou de arremesso, você pode gastar 1PM para rolar mais uma vez qualquer resultado máximo...",
            "<span>Grandão:</span> Seu tamanho é Grande e você pode usar <span>Força</span> como atributo-chave de Intimidação.",
            "<span>Infância Entre os Pequenos:</span> Você se torna treinado em uma perícia a sua escolha."
        ]
    },
    "Goblin": {
        nome: "Goblin",
        atributos: { DES: 2, INT: 1, CAR: -1 },
        habilidades_descricao: [
            "<span>Destreza</span> <span>+2</span>, <span>Inteligência</span> <span>+1</span>, <span>Carisma</span> <span>-1</span>",
            "<span>Engenhoso:</span> Você não sofre penalidades em testes de perícia por não usar ferramentas...",
            "<span>Espelunqueiro:</span> Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.",
            "<span>Peste Esguia:</span> Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m.",
            "<span>Rato das Ruas:</span> Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível."
        ]
    },
    "Golem": {
        nome: "Golem",
        atributos: { FOR: 2, CON: 1, CAR: -1 },
        habilidades_descricao: [
            "<span>Força</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Carisma</span> <span>-1</span>",
            "<span>Chassi:</span> Seu deslocamento é 6m, mas não é reduzido por uso de armadura ou excesso de carga...",
            "<span>Criatura Artificial:</span> Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a efeitos de cansaço...",
            "<span>Fonte Elemental:</span> Você possui um espírito elemental preso em seu corpo. Escolha entre água(frio), ar(eletricidade), fogo(fogo), terra(ácido)...",
            "<span>Propósito de Criação:</span> Você não tem direito a escolher uma origem, mas recebe um poder geral a sua escolha."
        ]
    },
  "Golem Despertado": {
    nome: "Golem Despertado",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+1</span>, <span>Carisma</span> <span>-1</span>(cumulativo com Chassi e Tamanho)",
      "<span>Chassi:</span> Você leva um dia para vestir ou remover uma armadura(pois precisa acoplar as peças dela a seu chassi). Entretanto, por ser acoplada, sua armadura não conta no limite de itens que você pode usar(mas você só pode usar uma armadura). Além disso, escolha um material para seu chassi entre os abaixo(Selecione <span>Golem Despertado</span> para ver as opções)."
    ]
  },
  "Gnoll": {
        nome: "Gnoll",
        atributos: { CON: 2, SAB: 1, INT: -1 },
        habilidades_descricao: [
            "<span>Constituição</span> <span>+2</span>, <span>Sabedoria</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>",
            "<span>Faro:</span> Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido...",
            "<span>Mordida:</span> Você possui uma arma natural de mordida(dano 1d6, crítico x2, perfuração)...",
            "<span>Oportunista:</span> Você recebe +2 nas rolagens de dano contra criaturas que tenham sofrido dano de outras criaturas...",
            "<span>Rendição:</span> Quando um inimigo se rende, você recebe 1d4 PM temporários cumulativos..."
        ]
    },
    "Harpia": {
        nome: "Harpia",
        atributos: { DES: 2, CAR: 1, INT: -1 },
        habilidades_descricao: [
            "<span>Destreza</span> <span>+2</span>, <span>Carisma</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>.",
            "<span>Asas de Abutre:</span> Você possui asas no lugar dos braços e das mãos. Você pode pairar a 1,5m do chão com deslocamento 12m...",
            "<span>Cria de Masmorra:</span> Você é uma criatura do tipo monstro e recebe visão no escuro...",
            "<span>Grito Aterrorizante:</span> Você pode gastar uma ação padrão e 1 PM para emitir um grito estridente...",
            "<span>Pés Rapinantes:</span> Seus pés podem ser usados como mãos ou como duas armas naturais de garras..."
        ]
    },
    "Hobgoblin": {
        nome: "Hobgoblin",
        atributos: { CON: 2, DES: 1, CAR: -1 },
        habilidades_descricao: [
            "<span>Constituição</span> <span>+2</span>, <span>Destreza</span> <span>+1</span>, <span>Carisma</span> <span>-1</span>",
            "<span>Arte da Guerra:</span> Você é treinado em Guerra e recebe proficiência em armas marciais...",
            "<span>Metalurgia Hobgoblin:</span> Você recebe +2 em Ofício(armeiro)...",
            "<span>Táticas de Guerrilha:</span> Você recebe visão no escuro e +2 em Furtividade."
        ]
    },
    "Humano": {
        nome: "Humano",
        atributos: {}, // +1 em três atributos é escolha do jogador
        habilidades_descricao: [
            "<span>+1</span> em Três Atributos Diferentes.",
            "<span>Versátil:</span> Você se torna treinado em duas perícias a sua escolha(não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha."
        ]
    },
    "Hynne": {
        nome: "Hynne",
        atributos: { DES: 2, CAR: 1, FOR: -1 },
        habilidades_descricao: [
            "<span>Destreza</span> <span>+2</span>, <span>Carisma</span> <span>+1</span>, <span>Força</span> <span>-1</span>",
            "<span>Arremessador:</span> Quando faz um ataque à distância com uma funda ou uma arma de arremesso, seu dano aumenta em um passo.",
            "<span>Pequeno e Rechonchudo:</span> Seu tamanho é Pequeno e seu deslocamento é 6m. Você recebe +2 em Enganação...",
            "<span>Sorte Salvadora:</span> Quando faz um teste de resistência, você pode gastar +1PM para rolar este teste novamente."
        ]
    },
    "Kaijin": {
        nome: "Kaijin",
        atributos: { FOR: 2, CON: 1, CAR: -2 },
        habilidades_descricao: [
            "<span>Força</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Carisma</span> <span>-2</span>",
            "<span>Couraça Rubra:</span> Você recebe redução de dano 2...",
            "<span>Cria da Tormenta</span> Você é uma criatura do tipo monstro e recebe +5 em testes de resistência...",
            "<span>Disforme:</span> Por sua anatomia anômala, você não pode empunhar nem vestir itens...",
            "<span>Terror Vivo:</span> Você pode usar <span>Força</span> como atributo-chave de Intimidação e recebe um poder da Tormenta..."
        ]
    },
    "Kallyanach": {
        nome: "Kallyanach",
        atributos: {}, // Escolha do jogador
        habilidades_descricao: [
            "<span>+2</span> em um Atributo a sua Escolha ou <span>+1</span> em Dois Atributos a sua Escolha.",
            "<span>Herança Dracônica:</span> Você é uma criatura do tipo monstro e recebe redução 5 contra um tipo de dano...",
            "<span>Benção de Kallyadranoch:</span> Escolha dois dos poderes a seguir..."
        ]
    },
  "Kappa": {
    nome: "Kappa",
    atributos: {},
    habilidades_descricao: [
      "<span>Destreza</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Carisma</span> <span>-1</span>.",
      "<span>Alma de Água:</span> Você é uma criatura do tipo espírito e tem deslocamento de natação igual ao seu deslocamento terrestre.",
      "<span>Carapaça Kappa:</span> Você não pode ser flanqueado e recebe cobertura leve se estiver submerso ou caído. Você soma sua <span>Constituição</span> na Defesa, limitado pelo seu nível, mas apenas se não estiver usando armaduras pesadas (se já faz isso, como pelo habilidade Casca Grossa, em vez disso, você recebe +2 na Defesa).",
      "<span>Cura das Águas:</span> Você pode lançar a magia Curar Ferimentos (atributo-chave <span>Sabedoria</span>). Caso aprenda novamente essa magia, seu custo diminui em -1 PM. Você não pode usar esta habilidade se a água de sua cabeça estiver derramada.",
      "<span>Tigela D'água:</span> Sempre que falhar por 5 ou mais em um teste para evitar ser agarrado, derrubado ou empurrado, você derrama a água de sua cabeça. Você fica enjoado até encher a tigela novamente(o que exige uma fonte de água e uma ação padrão)."
    ]
  },
  "Kliren": {
    nome: "Kliren",
    atributos: {},
    habilidades_descricao: [
      "<span>Inteligência</span> <span>+2</span>, <span>Carisma</span> <span>+1</span>, <span>Força</span> <span>-1</span>.",
      "<span>Híbrido:</span> Sua natureza multifacetada fez com que você aprendesse conhecimentos variados. Você se torna treinado em sua perícia a sua escolha(não precisa ser da sua classe).",
      "<span>Engenhosidade:</span> Quando faz um teste de perícia, você pode gastar 2 PM para somar sua <span>Inteligência</span> no teste. Você não pode usar esta habilidade em testes de ataque. Caso receba esta habilidade novamente, seu custo é reduzido em -1 PM.",
      "<span>Ossos Frágeis:</span> Você sofre 1 ponto de dano adiciona por dado de dano de impacto. Por exemplo, se for atingido por uma clava(1d6), sofre 1d6+1 pontos de dano. Se cair de 3m de altura(dano 2d6), sofre 2d6+2 pontos de dano.",
      "<span>Vanguardista:</span> Você recebe proficiência em armas de fogo e +2 em Ofício(um qualquer, a sua escolha)."
    ]
  },
  "Kobolds": {
    nome: "Kobolds",
    atributos: {},
    habilidades_descricao: [
      "<span>Destreza</span> <span>+2</span>, <span>Força</span> <span>-1</span>.",
      "<span>Ajuntamento Escamoso:</span> Embora sejam um grupo de kobolds, para todos os efeitos vocês são uma única criatura Média com dois braços. Entretanto, contam como Pequenos para efeitos dos espaços por onde podem passar e, quando fazem um teste de resistência contra um efeito que afeta apenas uma criatura e não causa dano, rolam dois dados e usam o melhor resultado. Por fim, têm vulnerabilidade a dano de área.",
      "<span>Praga Monstruosa:</span> Vocês são criaturas do tipo monstro e recebem visão no escuro e +2 em Sobrevivência.",
      "<span>Sensibilidade a Luz:</span> Quando expostos à luz do sol ou similar, vocês ficam ofuscados.",
      "<span>Talentos do Bando:</span> Escolham dois dos poderes a seguir. Uma vez por patamar, vocês pode escolher outro desses poderes no lugar de um poder de classe(Selecione <span>Kobolds</span> para ver as opções)."
    ]
  },
  "Lefou": {
    nome: "Lefou",
    atributos: {},
    habilidades_descricao: [
      "<span>+1</span> em Três Atributos Diferentes(Exceto <span>Carisma</span>), <span>Carisma</span> <span>-1</span>",
      "<span>Cria da Tormenta:</span> Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos por lefeu e pela Tormenta.",
      "<span>Deformidade:</span> Todo lefou possui defeitos físicos que, embora desagradáveis, conferem certas vantagens. Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta(exceto para perda de <span>Carisma</span>). Você pode trocar um desses bônus por um poder da Tormenta a sua escolha(ele também não conta para perda de <span>Carisma</span>)."
    ]
  },
  "Mashin": {
    nome: "Mashin",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+1</span>, <span>Carisma</span> <span>-1</span>, mais especial",
      "<span>Mashin(Chassi):</span> <span>+1</span> em dois atributos a sua escolha. Você se torna treinado em duas perícias a sua escolha e pode substituir uma dessas períciais por uma maravilha mecânica. Entretanto, você é sempre Médio.",
      "<span>Maravilha Mecânica:</span> Se escolher uma maravilha mecânica, você recebe um dos poderes a seguir. Uma vez por patamar, você pode escolher uma maravilha mecâninca no lugar de um poder de classe(Selecione <span>Mashin</span> para ver as opções)."
    ]
  },
  "Medusa": {
    nome: "Medusa",
    atributos: {},
    habilidades_descricao: [
      "<span>Destreza</span> <span>+2</span>, <span>Carisma</span> <span>+1</span>",
      "<span>Cria de Megalokk:</span> Você é uma criatura do tipo monstro e recebe visão no escuro.",
      "<span>Natureza Venenosa:</span> Você recebe resistência a veneno +5 e pode gastar uma ação de movimento e 1 PM para envenenar uma arma que esteja usando. A arma causa perda de 1d12 pontos de vida. O veneno dura até você acertar um ataque ou até o fim da cena(o que acontecer primeiro). Veneno.",
      "<span>Olhar Atordoante:</span> Você pode gastar uma ação de movimento e 1PM para forçar uma craitura em alcance curto a fazer um teste de Fortitude (CD <span>Carisma</span>). Se a criatura falhar, fica atordoada por uma rodada (apenas uma vez por cena)."
    ]
  },
  "Meio-Elfo": {
    nome: "Meio-Elfo",
    atributos: {},
    habilidades_descricao: [
      "<span>+1</span> em Três Atributos Diferentes, exceto <span>Constituição</span>.",
      "<span>Ambição Herdada:</span> Você recebe um poder geral ou poder único de origem à sua escolha.",
      "<span>Entre Dois Mundos:</span> Você tera +1 em testes de <span>Carisma</span> e de perícias baseadas neste atributo.",
      "<span>Sangue Élfico:</span> Você recebe visão na penumbra e +1 ponto de mana no 1º nível e a cada dois níveis. Além disso, é considerado um elfo para efeitos relacionados à raça."
    ]
  },
  "Meio-Orc": {
    nome: "Meio-Orc",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+2</span>, <span>+1</span> em outro atributo(Exceto <span>Carisma</span>).",
      "<span>Adaptável:</span> Você recebe +2 em Intimidação e se torna treinado em uma perícia a sua escolha.",
      "<span>Criatura das Profundezas:</span> Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.",
      "<span>Sangue Orc:</span> Você recebe +1 em rolagens de dano com armas corpo a corpo e de arremesso e é considerado um orc para efeitos relacionados a raça."
    ]
  },
  "Minauro": {
    nome: "Minauro",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+1</span>, <span>+1</span> em Dois Atributos.",
      "<span>Faro:</span> Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.",
      "<span>Mente Aberta:</span> Você recebe +2 em Diplomacia e Investigação.",
      "<span>Plurivalente:</span> Você recebe um poder geral a sua escolha."
    ]
  },
  "Minotauro": {
    nome: "Minotauro",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Sabedoria</span> <span>-1</span>",
      "<span>Chifres:</span> Você possui uma arma natural de chifres(dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, poder gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.",
      "<span>Couro Rígido:</span> Sua pele é dura como a de um touro. Você recebe +1 na Defesa.",
      "<span>Faro:</span> Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.",
      "<span>Medo de Altura:</span> Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), você fica abalado."
    ]
  },
  "Moreau": {
    nome: "Moreau",
    atributos: {},
    habilidades_descricao: [
      "<span>Herança:</span> Escolha uma das heranças descritas a seguir. Ela representa sua ascendência e determina suas demais habilidades de raça. Além disso, você é considerado também um humano para quaisquer fins(Selecione <span>Moreau</span> para ver as opções)."
    ]
  },
  "Nagah": {
    nome: "Nagah",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+1</span>, <span>Destreza</span> <span>+1</span>, <span>Constituição</span> <span>+1</span>(Macho).",
      "<span>Inteligência</span> <span>+1</span>, <span>Sabedoria</span> <span>+1</span>, <span>Carisma</span> <span>+1</span> (Fêmea).",
      "<span>Cauda:</span> Você possui uma arma natural de cauda(dano 1d6, crítico x2, impacto). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a cauda.",
      "<span>Inocência Dissumulada:</span> Você recebe +2 em Enganação e pode gastar 2 PM para substituir um teste de perícia originalmente baseada em <span>Inteligência</span>, <span>Sabedoria</span> ou <span>Carisma</span> por Enganação.",
      "<span>Presentes de Sszzaas:</span> Você recebe visão na penumbra, +1 na Defesa e resistência a veneno +5.",
      "<span>Fraquezas Ofídicas:</span> Você sofre 1 ponto de dano adicional para cada dado de dano de frio e -5 em testes de resistência contra Músicas de bardo."
    ]
  },
  "Nezumi": {
    nome: "Nezumi",
    atributos: {},
    habilidades_descricao: [
      "<span>Constituição</span> <span>+2</span>, <span>Destreza</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>.",
      "<span>Empunhadura Poderosa:</span> Ao usar uma arma feita para uma categoria de tamanho maior que a sua (por exemplo, uma arma aumentada para uma criatura Pequena ou Média), a penalidade que você sofre nos testes de ataque diminui para -2. Caso receba esta habilidade novamente, a penalidade diminui para 0.",
      "<span>Pequeno, Mas Não Metade:</span> Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m e você recebe resistência a medo +5 contra criaturas maiores que você e +2 em Intimidação.",
      "<span>Roedor:</span> Você possui uma arma natural de mordida (dano 1d6, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Além disso, quando faz um acerto crítico com sua mordida, você deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico.",
      "<span>Sentidos Murídeos:</span> Você recebe faro e visão na penumbra."
    ]
  },
  "Ogro": {
    nome: "Ogro",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+3</span>, <span>Constituição</span> <span>+2</span>, <span>Inteligência</span> <span>-1</span>, <span>Carisma</span> <span>-1</span>.",
      "<span>Quanto Maior o Tamanho...:</span> Você é um humanoide do subtipo gigante; seu tamanho é Grande e você recebe visão na penumbra.",
      "<span>...Maior a Porrada!:</span> Quando acerta um ataque corpo a corpo, você pode gastar 1 PM para causar +1d8 pontos de dano do mesmo tipo.",
      "<span>Camada de Ingenuidade:</span> Você sofre -5 em Intuição e Vontade."
    ]
  },
  "Orc": {
    nome: "Orc",
    atributos: {},
    habilidades_descricao: [
      "<span>Força</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>.",
      "<span>Feroz:</span> Você recebe +2 em rolagens de dano com armas corpo a corpo e de arremesso. Quando sofre dano de um inimigo, esse bônus se torna +4 até o final de seu próximo turno.",
      "<span>Habitante das Cavernas:</span> Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo. Entretanto, recebe sensibilidade a luz.",
      "<span>Vigor Brutal:</span> Você recebe +2 em Fortitude e soma sua <span>Força</span> em seu total de pontos de vida."
    ]
  },
  "Osteon": {
    nome: "Osteon",
    atributos: {},
    habilidades_descricao: [
      "<span>+1</span> em Três Atributos Diferentes(Exceto <span>Constituição</span>), <span>Constituição</span> <span>-1</span>.",
      "<span>Armadura Óssea:</span>Você recebe redução de corte, frio e perfuração 5.",
      "<span>Memória Póstuma:</span> Você se torna treinado em uma perícia (não precisa ser da sua Classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um osteon de outra raça humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.",
      "<span>Natureza Esquelética:</span> Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, efeitos mágicos de cura de luz causam dano a você e você não se beneficia de itens da categoria alimentação, mas dano de trevas recupera seus PV.",
      "<span>Preço da Não Vida:</span>Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais(Osteons não são afetados por condições boas ou ruins de descanso). Caso contrário, sofre os efeitos de fome."
    ]
  },
  "Pteros": {
    nome: "Pteros",
    atributos: {},
    habilidades_descricao: [
      "<span>Sabedoria</span> <span>+2</span>, <span>Destreza</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>.",
      "<span>Ligação Natural:</span> Você possui uma ligação mental com uma criatura inteligente (<span>Inteligência</span> -3 ou mais). Vocês podem se comunicar mentalmente em alcance longo e sempre sabem em que direção e distância podem encontrar o outro. Você pode trocar a criatura com a qual mantém o vínculo no início de cada aventura.",
      "<span>Mãos Rudimentares:</span> Suas mãos não permitem que você empunhe itens, a menos que sejam mágicos ou especialmente adaptados para você(o que demora um dia e custa 50% do preço do item, sem contar melhorias). Seus itens iniciais, e aqueles recebidos por sua origem ou habilidades, são adaptados por você.",
      "<span>Pés Rapinantes:</span> Seus pés são duas armas naturais de garras (dano 1d6 cada, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar neste turno. Como alternativa, se tiver habilidades que exijam uma arma secundária(como Estilo de Duas Armas), voc~e pode usá-las com suas garras.",
      "<span>Senhor dos Céus:</span> Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda(a menos que esteja inconsciente). Se não estiver usando armadura pesada, você pode gastar 1 PM por rodada para voar com deslocamento de 12m. Quando abre suas asas para pairar ou voar, você ocupa o espaço de uma criatura de uma categoria de tamanho maior que a sua.",
      "<span>Sentidos Rapinantes:</span> Você recebe visão na penumbra e +2 em Percepção e Sobrevivência."
    ]
  },
  "Qareen": {
    nome: "Qareen",
    atributos: {},
    habilidades_descricao: [
      "<span>Carisma</span> <span>+2</span>, <span>Inteligência</span> <span>+1</span>, <span>Sabedoria</span> <span>-1</span>.",
      "<span>Desejos:</span> Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em -1 PM. Fazer um desejo ao qareen é uma ação livre.",
      "<span>Resistência Elemental:</span> Conforme sua ascendência, você recebe redução 10 a um tipo de dano. Escolha uma: frio(qareen da água), eletricidade(do ar), fogo(do fogo), ácido(da terra), luz(da luz) ou trevas(qareen das trevas).",
      "<span>Tatuagem Mística:</span> Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave <span>Carisma</span>). Caso aprenda novamente essa magia, seu custo dimunui em -1 PM."
    ]
  },
  "Sátiro": {
    nome: "Sátiro",
    atributos: {},
    habilidades_descricao: [
      "<span>Carisma</span> <span>+2</span>, <span>Destreza</span> <span>+1</span>, <span>Sabedoria</span> <span>-1</span>.",
      "<span>Chifres:</span> Você possui uma arma natural de chifres(dano 1d6, crítico x2, impacto). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.",
      "<span>Festeiro Feérico:</span> Você é uma criatura do tipo espírito e recebe visão na penumbra e +2 em Atuação e Fortitude.",
      "<span>Instrumentista Mágica:</span> Se estiver empunhando um instrumento musical, você pode lançar as magias Amendrontar, Enfeitiçar, Hipnotismo e Sono(atributo-chave <span>Carisma</span>). Caso aprenda novamente uma dessas magias, seu custo diminui em -1 PM.",
      "<span>Pernas Caprinas:</span> Seu deslocamento é 12m e você pode usar <span>Destreza</span> como atributo-chave de Atletismo(em vez de <span>Força</span>)."
    ]
  },
  "Sereia/Tritão": {
    nome: "Sereia/Tritão",
    atributos: {},
    habilidades_descricao: [
      "<span>+1</span> em Três Atributos Diferentes.",
      "<span>Canção dos Mares:</span> Você pode lançar duas das magias a seguir: Amendrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono(atributo-chave <span>Carisma</span>). Caso aprenda novamente uma dessas magias, seu custo diminui em -1 PM.",
      "<span>Mestre do Tridente:</span> Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.",
      "<span>Transformação Anfíbia:</span> Você pode respirar debaixo d'água e possui uma cauda que fornece deslocamento de natação 12m. Quando fora d'água, sua cauda desaparece e dá lugar a pernas (deslocamento 9m). Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água (ou, pelo menos, tomar um bom banho!)."
    ]
  },
  "Sílfide": {
    nome: "Sílfide",
    atributos: {},
    habilidades_descricao: [
      "<span>Carisma</span> <span>+2</span>, <span>Destreza</span> <span>+1</span>, <span>Força</span> <span>-2</span>.",
      "<span>Asas de Borboleta:</span> Seu tamanho é Minúsculo. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Você pode gastar 1 PM por rodada para voar com deslocamento de 12m.",
      "<span>Espírito da Natureza:</span> Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.",
      "<span>Magia das Fadas:</span> Você pode lançar duas das magias a seguir(atributo-chave <span>Carisma</span>): Criar Ilusão, Enfeitiçar, Luz(como uma magia arcana) e Sono. Caso aprenda novamente uma dessas magias, seu custo diminui em -1 PM."
    ]
  },
  "Soterrado": {
    nome: "Soterrado",
    atributos: {},
    habilidades_descricao: [
      "<span>+1</span> em Três Atributos Diferentes(Exceto <span>Constituição</span>), <span>Constituição</span> <span>-1</span>.",
      "<span>Abraço Gélido:</span> Você recebe +2 em testes para agarrar. Além disso, seus ataques desarmados e com armas naturais causam 2 pontos de dano de frio extras.",
      "<span>Esquife de Gelo:</span> Você recebe redução de corte e perfuração 5 e redução de frio 10. Entretanto, sofre 1 ponto de dano adicional por dado de dano de fogo.",
      "<span>Natureza Esquelética:</span> Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, efeitos mágicos de cura de luz causam dano a você e você não se beneficia de itens da categoria alimentação, mas dano de trevas recupera seus PV.",
      "<span>Preço da Não Vida:</span>Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais(Osteons não são afetados por condições boas ou ruins de descanso). Caso contrário, sofre os efeitos de fome."
    ]
  },
  "Suraggel": {
    nome: "Suraggel",
    atributos: {},
    habilidades_descricao: [
      "<span>Sabedoria</span> <span>+2</span>, <span>Carisma</span> <span>+1</span>(Aggelus).",
      "<span>Destreza</span> <span>+2</span>, <span>Inteligência</span> <span>+1</span>(Sulfure).",
      "<span>Herança Divina:</span> Você é uma criatura do tipo espírito e recebe visão no escuro.",
      "<span>Luz Sagrada(Aggelus):</span> Você recebe +2 em Diplomacia e Intuiçaõ. Além disso, pode lançar Luz(como uma magia divina; atributo-chave <span>Carisma</span>). Caso aprenda novamente essa magia, seu custo diminui em -1 PM.",
      "<span>Sombras Profanas(Sulfure):</span> Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão(como uma magia divina; atributo-chave <span>Inteligência</span>). Caso aprenda novamente essa magia, seu custo diminui em -1 PM."
    ]
  },
  "Tabrachi": {
    nome: "Tabrachi",
    atributos: {},
    habilidades_descricao: [
      "<span>Constituição</span> <span>+2</span>, <span>Força</span> <span>+1</span>, <span>Carisma</span> <span>-1</span>.",
      "<span>Batráqui:</span> Você recebe visão na penumbra e deslocamento de natação igual ao seu deslocamento terrestre.",
      "<span>Linguarudo:</span> Sua língua é uma arma natural que pode atacar inimigos a até 3m(dano 1d4, crítico x2, impacto). Ela é uma arma versátil, fornecendo +2 em testes para desarmar e derrubar. Uma vez por rodada, quando usa a ação agredir com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a língua.",
      "<span>Saltador:</span> Você recebe +10 em testes de Atletismo para saltar."
    ]
  },
  "Tengu": {
    nome: "Tengu",
    atributos: {},
    habilidades_descricao: [
      "<span>Destreza</span> <span>+2</span>, <span>Inteligência</span> <span>+1</span>.",
      "<span>Asas Desorientadoras:</span> Quando estão livres, suas asas podem ser usadas para distrair seus oponentes. Se não estiver usando-as para voar, você recebe os benefícios de Finta Aprimorada. Se tiver esse poder, em vez disso o bônus em Enganação para fintar aumenta para +5.",
      "<span>Caminhante do Céu:</span> Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno díficil e o torna imune a dano por queda(a menos que esteja inconsciente). Você pode gastar 1 PM por rodada para voar com deslocamento de 12m. Você precisa de espaço para abrir suas asas; quando paira ou voa, ocupa o espaço de uma criatura de uma categoria de tamanho maior que a sua.",
      "<span>Espírito Corvino:</span> Você é uma criatura do tipo espírito e recebe visão no escuro e +2 em Percepção."
    ]
  },
  "Trog": {
    nome: "Trog",
    atributos: {},
    habilidades_descricao: [
      "<span>Constituição</span> <span>+2</span>, <span>Força</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>.",
      "<span>Mau Cheiro:</span> Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno(CD <span>Constituição</span>) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.",
      "<span>Mordida:</span> Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.",
      "<span>Reptiliano:</span> Você é uma criatura do tipo monstro e recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.",
      "<span>Sangue Frio:</span> Você sofre 1 ponto de dano adicional por dado de dano de frio."
    ]
  },
  "Trog anão": {
    nome: "Trog anão",
    atributos: {},
    habilidades_descricao: [
      "<span>Constituição</span> <span>+2</span>, <span>Força</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>, <span>Destreza</span> <span>-1</span>",
      "<span>Mau Cheiro:</span> Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno(CD <span>Constituição</span>) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.",
      "<span>Mordida:</span> Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.",
      "<span>Quase Anão:</span> Você é uma criatura do tipo monstro e recebe visão no escuro e +1 PV por nível. Além disso, seu deslocamento é 6m(em vez de 9m), mas não é reduzido por uso de armadura ou excesso de carga.",
      "<span>Sangue Frio:</span> Você sofre 1 ponto de dano adicional por dado de dano de frio."
    ]
  },
  "Velocis": {
    nome: "Velocis",
    atributos: {},
    habilidades_descricao: [
      "<span>Destreza</span> <span>+2</span>, <span>Sabedoria</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>.",
      "<span>Atráves de Espinheiros:</span> Você recebe redução de corte e perfuração 2 e não sofre redução em seu deslocamento por terreno difícil natural.",
      "<span>Sentidos Selvagens:</span> Você recebe +2 em Sobrevivência, visão na penumbra e faro(contra inimigios em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha).",
      "<span>Velocista da Planície:</span> Seu deslocamento é 12m Você pode usar <span>Destreza</span> como atributo-chave de Atletismo(em vez de <span>Força</span>) e, quando faz testes de Atletismo para correr ou saltar, pode rolar dois dados e usar o melhor resultado."
    ]
  },
  "Voracis": {
    nome: "Voracis",
    atributos: {},
    habilidades_descricao: [
      "<span>Destreza</span> <span>+2</span>, <span>Constituição</span> <span>+1</span>, <span>Inteligência</span> <span>-1</span>",
      "<span>Garras:</span> Suas mãos são duas armas naturais de garras(dano 1d6 cada, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar neste turno. Como alternativa, se tiver habilidades que exijam uma arma secundária(como Estilo de Duas Armas), você pode usá-las com suas garras.",
      "<span>Rainha da Selva:</span> Você recebe deslocamento de escalada 9m, +2 em Atletismo e recupera +1 PV por nível quando descansa.",
      "<span>Sentidos Selvagens:</span> Você recebe +2 em Sobrevivência, visão na penumbra e faro (contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha)."
    ]
  },
  "Yidishan": {
    nome: "Yidishan",
    atributos: {},
    habilidades_descricao: [
      "<span>+1</span> em Três Atributos Diferentes(Exceto <span>Carisma</span>), <span>Carisma</span> <span>-2</span>.",
      "<span>Híbrido Mecânico:</span> Você é uma criatura do tipo construto. Recebe visãono escuro e imunidade a cansaço, efeitos metabólicos e veneno. Além disso, não precisa respirar, alimentar-se ou dormir, mas não se beneficia de itens da categoria alimentação e efeitos de cura mundana são reduzidos pela metade em você. Você precisa ficar inerte por 8 horas por dia para recarregar suas forças. Se fizer isso, recupera PV e PM por descanso em condições normais(Yidishan não são afetados por condições boas ou ruins de descanso).",
      "<span>Natureza Orgânica:</span> Você se torna treinado em uma perícia (que não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um Yidishan de outra raça humanoide além de humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.",
      "<span>Peças Metálicas:</span> As partes mecânicas que complementam seu corpo fornecem +2 na Defesa, mas impõem uma penalidade de armadura de -2."
    ]
  }
};

module.exports = racasData;