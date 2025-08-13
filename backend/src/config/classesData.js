// backend/src/config/classesData.js

const classesData = {
    "Alquimista": {
        nome: "Alquimista",
        basePV: 12,
        basePM: 4,
        pericias: ["Ofício (Alquimia)", "Vontade"],
        proficiencias: [],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um Alquimista começa com 12 pontos de vida + Constituição e ganha 3 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 PM por nível",
            "<span>Atributo-Chave:</span> Inteligência.",
            "<span>Perícias:</span> Ofício(Alquimia) e Vontade, mais 4.",
        ]
    },
    "Arcanista": {
        nome: "Arcanista",
        basePV: 8,
        basePM: 6,
        pericias: ["Misticismo", "Vontade"],
        proficiencias: [],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um arcanista começa com 8 pontos de vida (+ Constituição) e ganha 2 PV (+ Constituição) por nível.",
            "<span>Pontos de Mana:</span> 6 por nível.",
            "<span>Atributo-Chave:</span> Inteligência ou Carisma.",
            "<span>Perícias:</span> Misticismo e Vontade, mais 2."
        ]
    },
    "Atleta": {
        nome: "Atleta",
        basePV: 20,
        basePM: 3,
        pericias: ["Atletismo", "Luta"],
        proficiencias: ["Armas marciais", "Armaduras leves", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um atleta começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 PM por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Atletismo e Luta, mais 4."
        ]
    },
    "Bárbaro": {
        nome: "Bárbaro",
        basePV: 24,
        basePM: 3,
        pericias: ["Fortitude", "Luta"],
        proficiencias: ["Armas marciais", "Armaduras leves", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um bárbaro começa com 24 pontos de vida + Constituição e ganha 6 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 PM por nível.",
            "<span>Atributo-Chave:</span> Força.",
            "<span>Perícias:</span> Fortitude e Luta, mais 4."
        ]
    },
    "Bardo": {
        nome: "Bardo",
        basePV: 12,
        basePM: 4,
        pericias: ["Atuação", "Reflexos"],
        proficiencias: ["Armas simples", "Armaduras leves", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um bardo começa com 12 pontos de vida + Constituição e ganha 3 PV + Con por nível.",
            "<span>Pontos de Mana:</span> 4 por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Atuação e Reflexos, mais 6."
        ]
    },
    "Bucaneiro": {
        nome: "Bucaneiro",
        basePV: 16,
        basePM: 3,
        pericias: ["Luta", "Pontaria", "Reflexos"],
        proficiencias: ["Armas marciais", "Armaduras leves"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um bucaneiro começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Luta ou Pontaria, Reflexos, mais 4."
        ]
    },
    "Burguês": {
        nome: "Burguês",
        basePV: 12,
        basePM: 4,
        pericias: ["Diplomacia", "Vontade"],
        proficiencias: ["Armas simples"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um burguês começa com 12 pontos de vida + Constituição e ganha 3 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 PM por nível.",
            "<span>Perícias:</span> Diplomacia e Vontade, mais 6."
        ]
    },
    "Caçador": {
        nome: "Caçador",
        basePV: 16,
        basePM: 6,
        pericias: ["Luta", "Pontaria", "Sobrevivência"],
        proficiencias: ["Armas marciais", "Armaduras leves", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um caçador começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 6 por nível.",
            "<span>Atributo-Chave:</span> Força ou Destreza.",
            "<span>Perícias:</span> Luta ou Pontaria, Sobrevivência, mais 4."
        ]
    },
    "Cavaleiro": {
        nome: "Cavaleiro",
        basePV: 20,
        basePM: 3,
        pericias: ["Fortitude", "Luta"],
        proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um cavaleiro começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 por nível.",
            "<span>Atributo-Chave:</span> Força.",
            "<span>Perícias:</span> Fortitude e Luta, mais 2."
        ]
    },
    "Clérigo": {
        nome: "Clérigo",
        basePV: 16,
        basePM: 5,
        pericias: ["Religião", "Vontade"],
        proficiencias: ["Armas simples", "Armaduras pesadas", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um clérigo começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 5 por nível.",
            "<span>Atributo-Chave:</span> Sabedoria.",
            "<span>Perícias:</span> Religião e Vontade, mais 2."
        ]
    },
    "Druida": {
        nome: "Druida",
        basePV: 16,
        basePM: 4,
        pericias: ["Sobrevivência", "Vontade"],
        proficiencias: ["Armas simples", "Armaduras leves", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um druida começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 por nível.",
            "<span>Atributo-Chave:</span> Sabedoria.",
            "<span>Perícias:</span> Sobrevivência e Vontade, mais 4."
        ]
    },
    "Duelista": {
        nome: "Duelista",
        basePV: 16,
        basePM: 3,
        pericias: ["Luta", "Pontaria", "Reflexos"],
        proficiencias: ["Armas marciais", "Armaduras leves"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um duelista começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 PM por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Luta ou Pontaria, Reflexos, mais 2."
        ]
    },
    "Ermitão": {
        nome: "Ermitão",
        basePV: 12,
        basePM: 4,
        pericias: ["Sobrevivência", "Vontade"],
        proficiencias: ["Armas simples"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um ermitão começa com 12 pontos de vida + Constituição e ganha 3 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 PM por nível.",
            "<span>Atributo-Chave:</span> Sabedoria.",
            "<span>Perícias:</span> Sobrevivência e Vontade, mais 2."
        ]
    },
    "Guerreiro": {
        nome: "Guerreiro",
        basePV: 20,
        basePM: 3,
        pericias: ["Luta", "Pontaria", "Fortitude"],
        proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um guerreiro começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 por nível.",
            "<span>Atributo-Chave:</span> Força ou Destreza.",
            "<span>Perícias:</span> Luta ou Pontaria, Fortitude, mais 2."
        ]
    },
    "Inovador": {
        nome: "Inovador",
        basePV: 20,
        basePM: 3,
        pericias: ["Luta", "Pontaria", "Acrobacia"],
        proficiencias: ["Armas marciais", "Armaduras leves", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um inovador começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 PM por nível.",
            "<span>Atributo-Chave:</span> Força ou Destreza.",
            "<span>Perícias:</span> Luta ou Pontaria e Acrobacia, mais 2.",
        ]
    },
    "Inventor": {
        nome: "Inventor",
        basePV: 12,
        basePM: 4,
        pericias: ["Ofício", "Vontade"],
        proficiencias: ["Armas simples", "Armaduras leves"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um inventor começa com 12 pontos de vida + Constituição e ganha 3 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 por nível.",
            "<span>Atributo-Chave:</span> Inteligência.",
            "<span>Perícias:</span> Ofício e Vontade, mais 4."
        ]
    },
    "Ladino": {
        nome: "Ladino",
        basePV: 12,
        basePM: 4,
        pericias: ["Ladinagem", "Reflexos"],
        proficiencias: ["Armas simples", "Armaduras leves"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um ladino começa com 12 pontos de vida + Constituição e ganha 3 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 por nível.",
            "<span>Atributo-Chave:</span> Destreza ou Inteligência.",
            "<span>Perícias:</span> Ladinagem e Reflexos, mais 8."
        ]
    },
    "Lutador": {
        nome: "Lutador",
        basePV: 20,
        basePM: 3,
        pericias: ["Fortitude", "Luta"],
        proficiencias: ["Armas simples"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um lutador começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 por nível.",
            "<span>Atributo-Chave:</span> Força.",
            "<span>Perícias:</span> Fortitude e Luta, mais 4."
        ]
    },
    "Machado de Pedra": {
        nome: "Machado de Pedra",
        basePV: 24,
        basePM: 3,
        pericias: ["Fortitude", "Luta"],
        proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um machado de pedra começa com 24 pontos de vida + Constituição e ganha 6 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 PM por nível.",
            "<span>Atributo-Chave:</span> Força.",
            "<span>Perícias:</span> Fortitude e Luta, mais 2."
        ]
    },
    "Magimarcialista": {
        nome: "Magimarcialista",
        basePV: 16,
        basePM: 4,
        pericias: ["Atuação", "Luta"],
        proficiencias: ["Armas marciais", "Armaduras leves"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um magimarcialista começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 PM por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Atuação e Luta, mais 6."
        ]
    },
    "Necromante": {
        nome: "Necromante",
        basePV: 8,
        basePM: 6,
        pericias: ["Misticismo", "Vontade"],
        proficiencias: [],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um necromante começa com 8 pontos de vida (+ Constituição) e ganha 2 PV (+ Constituição) por nível.",
            "<span>Pontos de Mana:</span> 6 PM por nível.",
            "<span>Atributo-Chave:</span> Inteligência.",
            "<span>Perícias:</span> Misticismo e Vontade, mais 2."
        ]
    },
    "Nobre": {
        nome: "Nobre",
        basePV: 16,
        basePM: 4,
        pericias: ["Diplomacia", "Intimidação", "Vontade"],
        proficiencias: ["Armas marciais", "Armaduras leves", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um nobre começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Diplomacia ou Intimidação, Vontade, mais 4."
        ]
    },
    "Paladino": {
        nome: "Paladino",
        basePV: 20,
        basePM: 3,
        pericias: ["Luta", "Vontade"],
        proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um paladino começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 por nível.",
            "<span>Atributo-Chave:</span> Força e Carisma.",
            "<span>Perícias:</span> Luta e Vontade, mais 2."
        ]
    },
    "Santo": {
        nome: "Santo",
        basePV: 20,
        basePM: 4,
        pericias: ["Religião", "Vontade"],
        proficiencias: ["Armas simples", "Armaduras pesadas", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um santo começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 PM por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Religião e Vontade, mais 2."
        ]
    },
    "Seteiro": {
        nome: "Seteiro",
        basePV: 16,
        basePM: 4,
        pericias: ["Pontaria", "Sobrevivência"], // Assumido com base no Caçador
        proficiencias: ["Armas marciais", "Armaduras leves", "Escudos"], // Assumido com base no Caçador
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um seteiro começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 PM por nível.",
            "<span>Atributo-Chave:</span> Destreza.",
            "<span>Perícias:</span> Como o caçador básico.",
        ]
    },
    "Treinador": {
        nome: "Treinador",
        basePV: 12,
        basePM: 4,
        pericias: ["Adestramento", "Vontade"],
        proficiencias: ["Armas simples", "Armaduras leves"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um treinador começa com 12 pontos de vida + Constituição e ganha 3 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 por nível.",
            "<span>Atributo-Chave:</span>Carisma.",
            "<span>Perícias:</span> Adestramento e Vontade, mais 4.",
        ]
    },
    "Usurpador": {
        nome: "Usurpador",
        basePV: 16,
        basePM: 5,
        pericias: ["Religião", "Vontade"],
        proficiencias: ["Armas simples", "Armaduras pesadas", "Escudos"], // Assumido com base em classes divinas
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um usurpador começa com 16 pontos de vida + Constituição e ganha 4 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 5 PM por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Religião e Vontade, mais 2."
        ]
    },
    "Vassalo": {
        nome: "Vassalo",
        basePV: 20,
        basePM: 3,
        pericias: ["Fortitude", "Luta"],
        proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um vassalo começa com 20 pontos de vida + Constituição e ganha 5 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 3 PM por nível.",
            "<span>Atributo-Chave:</span> Força.",
            "<span>Perícias:</span> Fortitude e Luta, mais 2."
        ]
    },
    "Ventanista": {
        nome: "Ventanista",
        basePV: 12,
        basePM: 4,
        pericias: ["Ladinagem", "Reflexos"],
        proficiencias: ["Armas simples", "Armaduras leves"],
        habilidades_descricao: [
            "<span>Pontos de Vida:</span> Um ventanista começa com 12 pontos de vida + Constituição e ganha 3 PV + Constituição por nível.",
            "<span>Pontos de Mana:</span> 4 PM por nível.",
            "<span>Atributo-Chave:</span> Carisma.",
            "<span>Perícias:</span> Ladinagem e Reflexos, mais 8."
        ]
    }
};

module.exports = classesData;