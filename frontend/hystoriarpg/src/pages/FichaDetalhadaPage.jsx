import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./FichaDetalhadaPage.module.css";
import axios from "axios";
import EditableField from "../components/EditableField";

const ATRIBUTOS_LISTA = [
  "forca",
  "destreza",
  "constituicao",
  "inteligencia",
  "sabedoria",
  "carisma",
];

// Mapeamento das imagens dos atributos
const ATRIBUTO_IMAGENS = {
  forca: "/images/atributos/forca.png",
  destreza: "/images/atributos/destreza.png",
  constituicao: "/images/atributos/constituicao.png",
  inteligencia: "/images/atributos/inteligencia.png",
  sabedoria: "/images/atributos/sabedoria.png",
  carisma: "/images/atributos/carisma.png",
};

function FichaDetalhadaPage() {
  const { id } = useParams();
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        {
          tipo: tipo,
          valor: novoValor - valorAtual,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Falha ao atualizar pontos:", err);
      setFicha(ficha);
      setError("Não foi possível salvar a alteração. Verifique sua conexão.");
    }
  };

  const handleAttributeSave = async (attributeName, newValue) => {
    const valorNumerico = parseInt(newValue, 10);
    if (isNaN(valorNumerico) || !ficha) return;

    const atributosAtualizados = {
      ...ficha.atributos,
      [attributeName]: valorNumerico,
    };

    // Atualização otimista da UI
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

  // Calcula a defesa dinamicamente. Atualiza se a destreza mudar.
  const defesa = 10 + (ficha.atributos?.destreza || 0);

  return (
    <div className={styles.container}>
      <Link to="/fichas" className={styles.backLink}>
        &larr; Voltar para Meus Personagens
      </Link>

      <div className={styles.sheet}>
        <header className={styles.header}>
          <img
            src={ficha.foto_personagem || "/images/default-avatar.jpg"}
            alt={`Retrato de ${ficha.nome}`}
            className={styles.portrait}
          />
          <div className={styles.headerInfo}>
            <h1 className={styles.charName}>{ficha.nome}</h1>
            <p className={styles.charSubtitle}>
              {ficha.raca.nome} {ficha.classes[0].nome.nome} Nível {ficha.nivel}
            </p>
          </div>
        </header>

        <section className={styles.mainStats}>
          <div className={styles.statBox}>
            <span>Pontos de Vida</span>
            <div className={styles.resourceControl}>
              <button
                onClick={() => handlePontosChange("pv", -1)}
                disabled={ficha.pontos_de_vida_atual <= 0}
              >
                -
              </button>
              <strong>
                {ficha.pontos_de_vida_atual} / {ficha.pontos_de_vida_max}
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
          <div className={styles.statBox}>
            <span>Defesa</span>
            <strong>{defesa}</strong>
          </div>
          <div className={styles.statBox}>
            <span>Pontos de Mana</span>
            <div className={styles.resourceControl}>
              <button
                onClick={() => handlePontosChange("pm", -1)}
                disabled={ficha.pontos_de_mana_atual <= 0}
              >
                -
              </button>
              <strong>
                {ficha.pontos_de_mana_atual} / {ficha.pontos_de_mana_max}
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
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Atributos</h2>
          <div className={styles.attributesGrid}>
            {ATRIBUTOS_LISTA.map((attr) => (
              <div
                key={attr}
                className={styles.attribute}
                style={{
                  backgroundImage: `url(${ATRIBUTO_IMAGENS[attr]})`,
                }}
              >
                <EditableField
                  initialValue={ficha.atributos?.[attr] ?? 0}
                  onSave={(newValue) => handleAttributeSave(attr, newValue)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Perícias Treinadas</h2>
          <p className={styles.list}>
            {ficha.pericias && ficha.pericias.length > 0
              ? ficha.pericias.join(", ")
              : "Nenhuma perícia treinada."}
          </p>
        </section>

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
    </div>
  );
}

export default FichaDetalhadaPage;