// Importa os dados brutos
import { RACAS as rawRacas } from './racasData';
import { CLASSES as rawClasses } from './classesData';
import { ORIGENS as rawOrigens } from './origensData';

// FUNÇÃO CORRIGIDA: Agora lê os atributos das raças corretamente
const parseAtributos = (habilidades) => {
    const atributos = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 };
    
    // Concatena todas as habilidades em uma única string para análise
    const attrString = habilidades.join(' ');

    // Regex para encontrar pares como <span>+2</span> <span>Força</span> ou <span>Força</span> <span>+2</span>
    const regex = /<span>([A-Za-zçã]+)<\/span>\s*<span>([+\-–]\d+)<\/span>|<span>([+\-–]\d+)<\/span>\s*<span>([A-Za-zçã]+)<\/span>/g;
    
    let match;
    while ((match = regex.exec(attrString)) !== null) {
        // match[1] e match[2] pegam o padrão "Nome Atributo"
        // match[3] e match[4] pegam o padrão "Atributo Nome"
        const nomeBruto = match[1] || match[4];
        const valorBruto = match[2] || match[3];

        if (nomeBruto && valorBruto) {
            const valor = parseInt(valorBruto.replace('–', '-'));
            const nomeAttr = nomeBruto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos

            if (nomeAttr in atributos) {
                atributos[nomeAttr] += valor;
            }
        }
    }
    return atributos;
};

// FUNÇÃO MELHORADA: Mais precisa para extrair perícias de origens
const parsePericiasOrigem = (habilidades) => {
    const pericias = new Set();
    // Procura pela frase "treinado em" e captura o que vem depois, até o próximo poder ou ponto final.
    const beneficioRegex = /treinado em ([\w\s,()e]+?)(, e recebe o poder|, e pode usar| e pode gastar|\.)/;

    for (const hab of habilidades) {
        const match = hab.match(beneficioRegex);
        if (match && match[1]) {
            // Limpa a string de palavras extras e a divide em perícias individuais
            match[1].replace(' e ', ', ').split(',').forEach(p => {
                const periciaLimpa = p.trim();
                if (periciaLimpa) {
                    pericias.add(periciaLimpa);
                }
            });
        }
    }
    return Array.from(pericias);
};

// Função para extrair itens iniciais de uma origem
const parseItensOrigem = (habilidades) => {
    const itens = [];
    const itensRegex = /<span>Itens:<\/span> (.*)/;

    for (const hab of habilidades) {
        const match = hab.match(itensRegex);
        if (match) {
            return match[1].split(', ').map(item => item.replace('.', '').trim());
        }
    }
    return itens;
}

// Processa as Raças
export const RACAS = rawRacas.map(raca => ({
    ...raca,
    atributos: parseAtributos(raca.habilidades),
}));

// Processa as Classes
// Substitua esta seção inteira no seu arquivo

// Processa as Classes
export const CLASSES = rawClasses.map(classe => {
    const data = { ...classe, pvInicial: 0, pvPorNivel: 0, pmPorNivel: 0, pericias: [], periciasExtras: 0 };
    
    // Concatena as habilidades para facilitar a busca
    const textoCompleto = classe.habilidades.join(' ');

    // --- PONTOS DE VIDA (PV) - REGRA MELHORADA ---
    // Procura pelos números antes de "pontos de vida" e "PV"
    let matchPv = textoCompleto.match(/(\d+)\s*pontos de vida.*?ganha\s*(\d+)\s*PV/i);
    if (matchPv) {
        data.pvInicial = parseInt(matchPv[1]);
        data.pvPorNivel = parseInt(matchPv[2]);
    }

    // --- PONTOS DE MANA (PM) - REGRA CORRIGIDA ---
    // Procura por "X PM por nível" ou "X por nível". O "(?:PM )?" torna o "PM " opcional.
    let matchPm = textoCompleto.match(/(\d+)\s*(?:PM )?por nível/i);
    if (matchPm) {
        data.pmPorNivel = parseInt(matchPm[1]);
    }

    // --- PERÍCIAS - REGRA MELHORADA ---
    // Procura por "Perícias:", captura o texto até "mais X" ou até um ponto final.
    const periciasMatch = textoCompleto.match(/Per[íi]cias:<\/span>\s*([\w\s(),\/ ou]+?)(?:, mais (\d+))?\./i);
    if (periciasMatch) {
        // periciasMatch[1] contém a lista de perícias
        // periciasMatch[2] contém o número de perícias extras (pode ser undefined)
        data.pericias = periciasMatch[1].split(/ e | ou |,/g).map(p => p.trim()).filter(p => p); // Limpa e filtra perícias vazias
        data.periciasExtras = periciasMatch[2] ? parseInt(periciasMatch[2]) : 0;
    }

    return data;
});

// Processa as Origens
export const ORIGENS = rawOrigens.map(origem => ({
    ...origem,
    pericias: parsePericiasOrigem(origem.habilidades),
    itens: parseItensOrigem(origem.habilidades),
}));

// Use estas linhas para verificar o resultado no console do navegador (F12)
console.log("--- DADOS PROCESSADOS (VERSÃO CORRIGIDA) ---");
console.log("RAÇAS:", RACAS);
console.log("CLASSES:", CLASSES);
console.log("ORIGENS:", ORIGENS);