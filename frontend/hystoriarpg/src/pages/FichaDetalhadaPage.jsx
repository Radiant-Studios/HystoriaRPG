import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useParams, Link } from "react-router-dom";
import styles from "./FichaDetalhadaPage.module.css";
import axios from "axios";
import EditableField from "../components/EditableField";
import { FaShieldAlt, FaShoePrints, FaUserFriends } from "react-icons/fa";

// Importa react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "../components/CustomToast";

const LISTA_PERICIAS_COMPLETA = {
  Acrobacia: {
    atributo_base: "destreza",
    descricao:
      "Usada para se equilibrar, cair sem se machucar e fazer acrobacias.",
  },
  Adestramento: {
    atributo_base: "carisma",
    descricao: "Comandar animais e montarias.",
  },
  Atletismo: {
    atributo_base: "forca",
    descricao: "Para testes de força física como saltar, nadar e escalar.",
  },
  Atuação: {
    atributo_base: "carisma",
    descricao: "Para entreter uma audiência com música, dança, teatro, etc.",
  },
  Cavalgar: {
    atributo_base: "destreza",
    descricao: "Conduzir uma montaria em situações difíceis.",
  },
  Conhecimento: {
    atributo_base: "inteligencia",
    descricao: "Testes de conhecimento geral sobre o mundo, história, etc.",
  },
  Cura: {
    atributo_base: "sabedoria",
    descricao: "Cuidar de ferimentos e doenças.",
  },
  Diplomacia: {
    atributo_base: "carisma",
    descricao: "Influenciar pessoas de forma positiva, negociar e socializar.",
  },
  Enganação: {
    atributo_base: "carisma",
    descricao: "Mentir, disfarçar-se e enganar os outros.",
  },
  Fortitude: {
    atributo_base: "constituicao",
    descricao: "Testes de resistência física contra venenos, doenças e fadiga.",
  },
  Furtividade: {
    atributo_base: "destreza",
    descricao: "Mover-se em silêncio e se esconder.",
  },
  Guerra: {
    atributo_base: "inteligencia",
    descricao: "Conhecimento sobre táticas militares, armas e estratégias.",
  },
  Iniciativa: {
    atributo_base: "destreza",
    descricao: "Determina a ordem de ação em combate.",
  },
  Intimidação: {
    atributo_base: "carisma",
    descricao: "Amedrontar e coagir outros.",
  },
  Intuição: {
    atributo_base: "sabedoria",
    descricao: "Perceber se alguém está mentindo e sentir se algo está errado.",
  },
  Investigação: {
    atributo_base: "inteligencia",
    descricao: "Procurar por pistas e resolver mistérios.",
  },
  Jogatina: {
    atributo_base: "carisma",
    descricao: "Jogar e trapacear em jogos de azar.",
  },
  Ladinagem: {
    atributo_base: "destreza",
    descricao: "Abrir fechaduras, desarmar armadilhas e bater carteiras.",
  },
  Luta: { atributo_base: "forca", descricao: "Para ataques corpo a corpo." },
  Misticismo: {
    atributo_base: "inteligencia",
    descricao: "Conhecimento sobre magias, criaturas mágicas e planos.",
  },
  Nobreza: {
    atributo_base: "inteligencia",
    descricao: "Conhecimento sobre a estrutura social da nobreza e reinos.",
  },
  Ofício: {
    atributo_base: "inteligencia",
    descricao: "Fabricar ou consertar itens.",
  },
  Percepção: {
    atributo_base: "sabedoria",
    descricao: "Notar coisas escondidas e perceber detalhes no ambiente.",
  },
  Pilotagem: {
    atributo_base: "destreza",
    descricao: "Conduzir veículos como carroças, barcos ou balões.",
  },
  Pontaria: {
    atributo_base: "destreza",
    descricao: "Para ataques à distância.",
  },
  Reflexos: {
    atributo_base: "destreza",
    descricao: "Testes para desviar de perigos e armadilhas.",
  },
  Religião: {
    atributo_base: "sabedoria",
    descricao: "Conhecimento sobre deuses, seus dogmas e rituais.",
  },
  Sobrevivência: {
    atributo_base: "sabedoria",
    descricao: "Orientar-se e encontrar comida em ambientes selvagens.",
  },
  Vontade: {
    atributo_base: "sabedoria",
    descricao: "Testes de resistência mental contra magias e efeitos de medo.",
  },
};

const ATRIBUTOS_LISTA = [
  "forca",
  "destreza",
  "constituicao",
  "inteligencia",
  "sabedoria",
  "carisma",
];
const ATRIBUTO_IMAGENS = {
  forca: "/images/atributos/forca.png",
  destreza: "/images/atributos/destreza.png",
  constituicao: "/images/atributos/constituicao.png",
  inteligencia: "/images/atributos/inteligencia.png",
  sabedoria: "/images/atributos/sabedoria.png",
  carisma: "/images/atributos/carisma.png",
};

const TAMANHOS_DISPONIVEIS = [
  "Mínimo",
  "Minúsculo",
  "Pequeno",
  "Médio",
  "Grande",
  "Enorme",
  "Colossal",
];

function FichaDetalhadaPage() {
  const { id } = useParams();
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalPericiaAberta, setModalPericiaAberta] = useState(false);
  const [periciaSelecionada, setPericiaSelecionada] = useState(null);
  const [proficienciasTexto, setProficienciasTexto] = useState("");
  const saveTimeoutRef = useRef(null); // useRef para guardar o timeout

  useEffect(() => {
    const fetchFicha = async () => {
      if (!id) return;
      try {
        const API_URL = "http://localhost:5000";
        const response = await axios.get(`${API_URL}/api/fichas/${id}`, {
          withCredentials: true,
        });
        setFicha(response.data);
      } catch (err) {
        setError("Não foi possível carregar a ficha.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFicha();
  }, [id]);

  useEffect(() => {
    if (ficha && ficha.proficiencias && Array.isArray(ficha.proficiencias)) {
      // Converte o array do banco de dados em uma string com quebras de linha
      setProficienciasTexto(ficha.proficiencias.join("\n"));
    }
  }, [ficha]);

  const handlePontosChange = async (tipo, valor) => {
    if (!ficha) return;
    const campoAtual =
      tipo === "pv" ? "pontos_de_vida_atual" : "pontos_de_mana_atual";
    const campoMax =
      tipo === "pv" ? "pontos_de_vida_max" : "pontos_de_mana_max";
    const valorAtual = ficha[campoAtual];
    const valorMaximo = ficha[campoMax];
    const novoValor = Math.max(0, Math.min(valorAtual + valor, valorMaximo));
    if (novoValor === valorAtual) return;
    const fichaAtualizada = { ...ficha, [campoAtual]: novoValor };
    setFicha(fichaAtualizada);
    try {
      const API_URL = "http://localhost:5000";
      await axios.post(
        `${API_URL}/api/fichas/${id}/pontos`,
        { tipo: tipo, valor: novoValor - valorAtual },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Falha ao atualizar pontos:", err);
      setFicha(ficha);
      setError("Não foi possível salvar a alteração.");
    }
  };

  const handleAttributeSave = async (attributeName, newValue) => {
    const valorNumerico = parseInt(newValue, 10);
    if (isNaN(valorNumerico) || !ficha) return;
    const atributosAtualizados = {
      ...ficha.atributos,
      [attributeName]: valorNumerico,
    };
    setFicha({ ...ficha, atributos: atributosAtualizados });
    try {
      const API_URL = "http://localhost:5000";
      await axios.post(
        `${API_URL}/api/fichas/${id}/atributos`,
        atributosAtualizados,
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Falha ao atualizar atributo:", err);
      setFicha(ficha);
      setError("Não foi possível salvar a alteração do atributo.");
    }
  };

  const handleNomeSave = async (novoNome) => {
    if (!ficha || novoNome === ficha.nome) return;
    const fichaAntiga = { ...ficha };
    setFicha({ ...ficha, nome: novoNome });
    try {
      const API_URL = "http://localhost:5000";
      const dadosParaEnviar = {
        identidade: { nomePersonagem: novoNome, historia: ficha.historia },
        raca: ficha.raca,
        classes: ficha.classes,
        origem: ficha.origem,
      };
      await axios.post(`${API_URL}/api/fichas/${id}/info`, dadosParaEnviar, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Falha ao atualizar nome:", err);
      setFicha(fichaAntiga);
      setError("Não foi possível salvar a alteração do nome.");
    }
  };

  const handlePontosSave = async (tipo, campo, novoValor) => {
    const valorNumerico = parseInt(novoValor, 10);
    if (isNaN(valorNumerico) || !ficha) return;
    const campoAlvo =
      campo === "max"
        ? tipo === "pv"
          ? "pontos_de_vida_max"
          : "pontos_de_mana_max"
        : tipo === "pv"
        ? "pontos_de_vida_atual"
        : "pontos_de_mana_atual";
    const fichaAntiga = { ...ficha };
    setFicha({ ...ficha, [campoAlvo]: valorNumerico });
    try {
      const API_URL = "http://localhost:5000";
      const dadosParaEnviar = {
        tipo: tipo,
        ...(campo === "max" && tipo === "pv" && { pvMaximo: valorNumerico }),
        ...(campo === "max" && tipo === "pm" && { pmMaximo: valorNumerico }),
        valor: campo === "atual" ? valorNumerico - ficha[campoAlvo] : 0,
      };
      await axios.post(`${API_URL}/api/fichas/${id}/pontos`, dadosParaEnviar, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(`Falha ao atualizar ${campoAlvo}:`, err);
      setFicha(fichaAntiga);
      setError("Não foi possível salvar a alteração.");
    }
  };

  const handlePericiaSave = async (nomePericia, campo, newValue) => {
    if (!ficha) return;
    let valorFinal = newValue;
    if (campo === "outros_bonus") {
      valorFinal = parseInt(newValue, 10);
      if (isNaN(valorFinal)) return;
    }
    const periciasAtualizadas = {
      ...ficha.pericias,
      [nomePericia]: {
        ...(ficha.pericias?.[nomePericia] ||
          LISTA_PERICIAS_COMPLETA[nomePericia]),
        [campo]: valorFinal,
      },
    };
    const fichaAntiga = { ...ficha };
    setFicha({ ...ficha, pericias: periciasAtualizadas });
    try {
      const API_URL = "http://localhost:5000";
      await axios.post(
        `${API_URL}/api/fichas/${id}/pericias`,
        { pericias: periciasAtualizadas },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Falha ao atualizar perícia:", err);
      setFicha(fichaAntiga);
      setError("Não foi possível salvar a alteração da perícia.");
    }
  };

  const handleTreinoChange = async (nomePericia, novoEstado) => {
    if (!ficha) return;
    const periciasAtualizadas = {
      ...ficha.pericias,
      [nomePericia]: {
        ...(ficha.pericias?.[nomePericia] ||
          LISTA_PERICIAS_COMPLETA[nomePericia]),
        treinada: novoEstado,
      },
    };
    const fichaAntiga = { ...ficha };
    setFicha({ ...ficha, pericias: periciasAtualizadas });
    try {
      const API_URL = "http://localhost:5000";
      await axios.post(
        `${API_URL}/api/fichas/${id}/pericias`,
        { pericias: periciasAtualizadas },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Falha ao atualizar treino da perícia:", err);
      setFicha(fichaAntiga);
      setError("Não foi possível salvar a alteração da perícia.");
    }
  };

  const handleRolarPericia = (nomePericia, totalBonus) => {
    const dado = Math.floor(Math.random() * 20) + 1;
    const resultadoFinal = dado + totalBonus;

    let critStatus = "normal";
    if (dado === 20) {
      critStatus = "critical";
    } else if (dado === 1) {
      critStatus = "fumble";
    }

    // Lógica para escolher a classe do container do toast
    let toastClassName = styles.customToast;
    if (critStatus === "critical") {
      toastClassName = `${styles.customToast} ${styles.critSuccessToast}`;
    } else if (critStatus === "fumble") {
      toastClassName = `${styles.customToast} ${styles.critFumbleToast}`;
    }

    toast(
      <CustomToast
        title={`Teste de ${nomePericia}`}
        diceValue={dado}
        bonus={totalBonus}
        total={resultadoFinal}
        critStatus={critStatus}
      />,
      {
        className: toastClassName,
        autoClose: 10000,
        position: "bottom-right",
        hideProgressBar: true,
      }
    );
  };

  const abrirModalPericia = (nomePericia) => {
    setPericiaSelecionada(nomePericia);
    setModalPericiaAberta(true);
  };

  const fecharModalPericia = () => {
    setModalPericiaAberta(false);
    setPericiaSelecionada(null);
  };

  const handleDefesaSave = async (campo, newValue) => {
    const valorNumerico = parseInt(newValue, 10);
    if (isNaN(valorNumerico) || !ficha) return;

    const fichaAntiga = { ...ficha };
    const novaFicha = { ...ficha };
    novaFicha[`defesa_${campo}_bonus`] = valorNumerico;
    setFicha(novaFicha);

    try {
      const API_URL = "http://localhost:5000";
      const dadosParaEnviar = {
        armadura:
          campo === "armadura"
            ? valorNumerico
            : ficha.defesa_armadura_bonus || 0,
        escudo:
          campo === "escudo" ? valorNumerico : ficha.defesa_escudo_bonus || 0,
        outros:
          campo === "outros" ? valorNumerico : ficha.defesa_outros_bonus || 0,
      };
      await axios.post(`${API_URL}/api/fichas/${id}/defesa`, dadosParaEnviar, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Falha ao atualizar bônus de defesa:", err);
      setFicha(fichaAntiga);
      setError("Não foi possível salvar a alteração da defesa.");
    }
  };

  const handleArmaduraEscudoSave = async (tipoItem, campoValor, newValue) => {
    const valorNumerico = parseInt(newValue, 10);
    if (isNaN(valorNumerico) || !ficha) {
      toast.error("Valor inválido para armadura/escudo.");
      return;
    }

    const fichaAntiga = { ...ficha };
    const novaFicha = { ...ficha };

    // Atualiza o estado localmente
    if (tipoItem === "armadura") {
      novaFicha[`armadura_${campoValor}`] = valorNumerico;
    } else if (tipoItem === "escudo") {
      novaFicha[`escudo_${campoValor}`] = valorNumerico;
    }
    setFicha(novaFicha);

    try {
      const API_URL = "http://localhost:5000";
      const dadosParaEnviar = {
        tipo: tipoItem, // 'armadura' ou 'escudo'
        campo: campoValor, // 'defesa' ou 'penalidade'
        valor: valorNumerico,
      };
      await axios.post(
        `${API_URL}/api/fichas/${id}/armadura-escudo`,
        dadosParaEnviar,
        { withCredentials: true }
      );
      // toast.success(`${tipoItem} ${campoValor} atualizado!`); // Opcional: feedback de sucesso
    } catch (err) {
      console.error(`Falha ao atualizar ${tipoItem} ${campoValor}:`, err);
      setFicha(fichaAntiga); // Reverte o estado em caso de erro
      toast.error(
        `Não foi possível salvar a alteração de ${tipoItem} ${campoValor}.`
      );
    }
  };

  const handleStatSave = async (statName, newValue) => {
    if (!ficha) return;
    let valorFinal =
      statName === "deslocamento" ? parseInt(newValue, 10) : newValue;
    if (statName === "deslocamento" && isNaN(valorFinal)) return;

    const fichaAntiga = { ...ficha };
    setFicha({ ...ficha, [statName]: valorFinal });

    try {
      const API_URL = "http://localhost:5000";
      const proficienciasArray = proficienciasTexto.split("\n"); // Pega o texto atual das proficiências

      const dadosParaEnviar = {
        deslocamento:
          statName === "deslocamento" ? valorFinal : ficha.deslocamento,
        tamanho: statName === "tamanho" ? valorFinal : ficha.tamanho,
        proficiencias: proficienciasArray, // Inclui as proficiências para não serem apagadas
      };

      await axios.post(
        `${API_URL}/api/fichas/${id}/statsgerais`,
        dadosParaEnviar,
        { withCredentials: true }
      );
    } catch (err) {
      console.error(`Falha ao atualizar ${statName}:`, err);
      setFicha(fichaAntiga);
      setError(`Não foi possível salvar a alteração de ${statName}.`);
    }
  };

  const handleProficienciasChange = (e) => {
    const novoTexto = e.target.value;
    setProficienciasTexto(novoTexto);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const API_URL = "http://localhost:5000";
        const proficienciasArray = novoTexto.split("\n");

        const dadosParaEnviar = {
          deslocamento: ficha.deslocamento,
          tamanho: ficha.tamanho,
          proficiencias: proficienciasArray,
        };

        await axios.post(
          `${API_URL}/api/fichas/${id}/statsgerais`,
          dadosParaEnviar,
          { withCredentials: true }
        );
        toast.success("Anotações salvas!");
      } catch (err) {
        console.error("Falha ao salvar proficiências:", err);
        toast.error("Não foi possível salvar as anotações.");
      }
    }, 1500);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Carregando ficha...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }
  if (!ficha) {
    return (
      <div className={styles.container}>
        <p>Ficha não encontrada.</p>
      </div>
    );
  }

  const defesa = 10 + (ficha.atributos?.destreza || 0);

  const bonusDestreza = ficha.atributos?.destreza || 0;
  const bonusArmadura = ficha.defesa_armadura_bonus || 0;
  const bonusEscudo = ficha.defesa_escudo_bonus || 0;
  const bonusOutros = ficha.defesa_outros_bonus || 0;
  const defesaTotal =
    10 + bonusDestreza + bonusArmadura + bonusEscudo + bonusOutros;

  const vidaPercent =
    ficha.pontos_de_vida_max > 0
      ? (ficha.pontos_de_vida_atual / ficha.pontos_de_vida_max) * 100
      : 0;
  const manaPercent =
    ficha.pontos_de_mana_max > 0
      ? (ficha.pontos_de_mana_atual / ficha.pontos_de_mana_max) * 100
      : 0;

  return (
    <div className={styles.container}>
      <Link to="/fichas" className={styles.backLink}>
        &larr; Voltar para Meus Personagens
      </Link>

      <div className={styles.sheet}>
        <div className={styles.leftColumn}>
          <header className={styles.header}>
            <img
              src={ficha.foto_personagem || "/images/default-avatar.jpg"}
              alt={`Retrato de ${ficha.nome}`}
              className={styles.portrait}
            />
            <div className={styles.headerInfo}>
              <div className={styles.charName}>
                <EditableField
                  initialValue={ficha.nome}
                  onSave={handleNomeSave}
                  isTitle={true}
                />
              </div>
              <p className={styles.charSubtitle}>
                {ficha.raca.nome} {ficha.classes[0].nome.nome} Nível{" "}
                {ficha.nivel}
              </p>
            </div>
          </header>

          <section className={styles.mainStats}>
            <div className={styles.statBox}>
              <span>Vida</span>
              <div className={styles.resourceBarContainer}>
                <div
                  className={`${styles.resourceBarFill} ${styles.vidaBar}`}
                  style={{ width: `${vidaPercent}%` }}
                ></div>
                <div className={styles.resourceControl}>
                  <button
                    onClick={() => handlePontosChange("pv", -1)}
                    disabled={ficha.pontos_de_vida_atual <= 0}
                  >
                    -
                  </button>
                  <strong>
                    <EditableField
                      initialValue={ficha.pontos_de_vida_atual}
                      onSave={(newValue) =>
                        handlePontosSave("pv", "atual", newValue)
                      }
                    />
                    {" / "}
                    <EditableField
                      initialValue={ficha.pontos_de_vida_max}
                      onSave={(newValue) =>
                        handlePontosSave("pv", "max", newValue)
                      }
                    />
                  </strong>
                  <button
                    onClick={() => handlePontosChange("pv", 1)}
                    disabled={
                      ficha.pontos_de_vida_atual >= ficha.pontos_de_vida_max
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.statBox}>
              <span>Mana</span>
              <div className={styles.resourceBarContainer}>
                <div
                  className={`${styles.resourceBarFill} ${styles.manaBar}`}
                  style={{ width: `${manaPercent}%` }}
                ></div>
                <div className={styles.resourceControl}>
                  <button
                    onClick={() => handlePontosChange("pm", -1)}
                    disabled={ficha.pontos_de_mana_atual <= 0}
                  >
                    -
                  </button>
                  <strong>
                    <EditableField
                      initialValue={ficha.pontos_de_mana_atual}
                      onSave={(newValue) =>
                        handlePontosSave("pm", "atual", newValue)
                      }
                    />
                    {" / "}
                    <EditableField
                      initialValue={ficha.pontos_de_mana_max}
                      onSave={(newValue) =>
                        handlePontosSave("pm", "max", newValue)
                      }
                    />
                  </strong>
                  <button
                    onClick={() => handlePontosChange("pm", 1)}
                    disabled={
                      ficha.pontos_de_mana_atual >= ficha.pontos_de_mana_max
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Atributos</h2>
            <div className={styles.attributesGrid}>
              {ATRIBUTOS_LISTA.map((attr) => (
                <div
                  key={attr}
                  className={styles.attribute}
                  style={{ backgroundImage: `url(${ATRIBUTO_IMAGENS[attr]})` }}
                >
                  <EditableField
                    initialValue={ficha.atributos?.[attr] ?? 0}
                    onSave={(newValue) => handleAttributeSave(attr, newValue)}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.infoBar}>
            <div className={styles.statItem}>
              <FaShieldAlt className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statValue}>{defesaTotal}</span>
                <span className={styles.statLabel}>Defesa</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <FaShoePrints className={styles.statIcon} />
              <div className={styles.statContent}>
                <span className={styles.statValue}>
                  <EditableField
                    initialValue={ficha.deslocamento || 9}
                    onSave={(val) => handleStatSave("deslocamento", val)}
                  />
                  <small>m</small>
                </span>
                <span className={styles.statLabel}>Deslocamento</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <FaUserFriends className={styles.statIcon} />
              <div className={styles.statContent}>
                {/* --- EditableField SUBSTITUÍDO POR SELECT --- */}
                <span className={styles.statValue}>
                  <select
                    className={styles.statSelect}
                    value={ficha.tamanho || "Médio"}
                    onChange={(e) => handleStatSave("tamanho", e.target.value)}
                  >
                    {TAMANHOS_DISPONIVEIS.map((tamanho) => (
                      <option key={tamanho} value={tamanho}>
                        {tamanho}
                      </option>
                    ))}
                  </select>
                </span>
                <span className={styles.statLabel}>Tamanho</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Proficiências & Características
            </h2>
            <textarea
              className={styles.notesTextarea}
              value={proficienciasTexto}
              onChange={handleProficienciasChange}
              placeholder="Anote suas proficiências, imunidades, resistências..."
            />
          </section>

          {/* ... resto do seu código ... */}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Poderes e Magias</h2>
            <p className={styles.list}>
              <strong>Poderes:</strong>{" "}
              {ficha.poderes && ficha.poderes.length > 0
                ? ficha.poderes.map((p) => p.nome).join(", ")
                : "Nenhum"}
              <br />
              <strong>Magias:</strong>{" "}
              {ficha.magias && ficha.magias.length > 0
                ? ficha.magias.map((m) => m.nome).join(", ")
                : "Nenhuma"}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>História</h2>
            <p className={styles.historyText}>
              {ficha.historia ||
                "Nenhuma história foi escrita para este personagem."}
            </p>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={`${styles.section} ${styles.periciasSection}`}>
            <h2 className={styles.sectionTitle}>Perícias</h2>
            <div className={styles.periciasGrid}>
              <div className={styles.periciaHeader}>Treino</div>
              <div className={styles.periciaHeader}>Perícia</div>
              <div className={styles.periciaHeader}>Atributo</div>
              <div className={styles.periciaHeader}>Total</div>
              <div className={styles.periciaHeader}>Outros</div>

              {Object.keys(LISTA_PERICIAS_COMPLETA).map((nomePericia) => {
                const dadosPericia =
                  typeof ficha.pericias === "object" &&
                  ficha.pericias !== null &&
                  !Array.isArray(ficha.pericias)
                    ? ficha.pericias[nomePericia]
                    : {
                        treinada: false,
                        outros_bonus: 0,
                        atributo_base:
                          LISTA_PERICIAS_COMPLETA[nomePericia].atributo_base,
                      };

                if (!dadosPericia) return null;

                const atributoBaseNome = dadosPericia.atributo_base;
                const atributoValor = ficha.atributos?.[atributoBaseNome] ?? 0;
                const bonusAtributo = atributoValor;

                let bonusTreino = 0;
                if (dadosPericia.treinada) {
                  if (ficha.nivel < 7) bonusTreino = 2;
                  else if (ficha.nivel < 14) bonusTreino = 4;
                  else bonusTreino = 6;
                }
                const bonusOutros = dadosPericia.outros_bonus || 0;
                const totalBonus = bonusAtributo + bonusTreino + bonusOutros;

                return (
                  <React.Fragment key={nomePericia}>
                    <div className={styles.periciaCellTreino}>
                      <input
                        type="checkbox"
                        checked={dadosPericia.treinada}
                        onChange={(e) =>
                          handleTreinoChange(nomePericia, e.target.checked)
                        }
                        title={
                          dadosPericia.treinada ? "Treinado" : "Não Treinado"
                        }
                      />
                    </div>
                    <div
                      className={`${styles.periciaCellNome} ${
                        dadosPericia.treinada ? styles.treinada : ""
                      }`}
                      onClick={() => abrirModalPericia(nomePericia)}
                      title="Ver descrição"
                    >
                      <span
                        className={styles.diceIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRolarPericia(nomePericia, totalBonus);
                        }}
                        title={`Rolar ${nomePericia} (1d20 + ${totalBonus})`}
                      >
                        🎲
                      </span>
                      {nomePericia}
                    </div>
                    <div className={styles.periciaCell}>
                      <select
                        className={styles.atributoSelect}
                        value={atributoBaseNome}
                        onChange={(e) =>
                          handlePericiaSave(
                            nomePericia,
                            "atributo_base",
                            e.target.value
                          )
                        }
                      >
                        {ATRIBUTOS_LISTA.map((attr) => (
                          <option key={attr} value={attr}>
                            {attr.substring(0, 3).toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className={`${styles.periciaCell} ${styles.totalBonus}`}
                    >
                      {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
                    </div>
                    <div className={styles.periciaCell}>
                      <EditableField
                        initialValue={bonusOutros}
                        onSave={(newValue) =>
                          handlePericiaSave(
                            nomePericia,
                            "outros_bonus",
                            newValue
                          )
                        }
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Este é o container para todos os toasts/notificações */}
      <ToastContainer />

      {modalPericiaAberta &&
        periciaSelecionada &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay} onClick={fecharModalPericia}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{periciaSelecionada}</h3>
              <p className={styles.modalDescription}>
                {LISTA_PERICIAS_COMPLETA[periciaSelecionada]?.descricao ||
                  "Descrição não disponível."}
              </p>
              <button
                className={styles.modalCloseButton}
                onClick={fecharModalPericia}
              >
                Fechar
              </button>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
      <div className={styles.container}>
        {/* --- 4. ADICIONAR O TOASTCONTAINER --- */}
        <ToastContainer theme="dark" />

        {modalPericiaAberta &&
          periciaSelecionada &&
          ReactDOM.createPortal(
            <div className={styles.modalOverlay} onClick={fecharModalPericia}>
              {/* ... (conteúdo do modal de perícia) ... */}
            </div>,
            document.getElementById("modal-root")
          )}
      </div>
    </div>
  );
}

export default FichaDetalhadaPage;
