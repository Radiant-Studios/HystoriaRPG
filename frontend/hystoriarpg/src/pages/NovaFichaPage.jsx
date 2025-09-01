import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // <-- CORREÇÃO 1: Importar o hook
import styles from "./NovaFicha.module.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  FreeMode,
  Scrollbar,
  Mousewheel,
} from "swiper/modules";

// Imports do CSS do Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// Lista de todas as perícias de Tormenta20
const LISTA_DE_PERICIAS = [
  "Acrobacia",
  "Adestramento",
  "Atletismo",
  "Atuação",
  "Cavalgar",
  "Conhecimento",
  "Cura",
  "Diplomacia",
  "Enganação",
  "Fortitude",
  "Furtividade",
  "Guerra",
  "Iniciativa",
  "Intimidação",
  "Intuição",
  "Investigação",
  "Jogatina",
  "Ladinagem",
  "Luta",
  "Misticismo",
  "Nobreza",
  "Ofício",
  "Percepção",
  "Pilotagem",
  "Pontaria",
  "Reflexos",
  "Religião",
  "Sobrevivência",
  "Vontade",
];

const CardSelector = ({ items, onSelect, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return <h1 className={styles.title}>Carregando {title}...</h1>;
  }

  const activeItem = items[activeIndex];

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className={styles.swiperContainer}
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id || item.nome}
            className={styles.swiperSlide}
          >
            <img
              src={item.imagem || "/images/default-card.jpg"}
              alt={item.nome}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.selectionDetails}>
        <h2>{activeItem.nome}</h2>
        <div className={styles.detailsContent}>
          <p>{activeItem.descricao}</p>
          <ul>
            {(activeItem.habilidades_texto || []).map((hab, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: hab }} />
            ))}
          </ul>
        </div>
        <div className={styles.buttonContainerCenter}>
          <button
            className={styles.btnSelect}
            onClick={() => onSelect(activeItem)}
          >
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
};

const ListSelector = ({ items, onSelect, title }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (items && items.length > 0) {
      setExpandedItem(items[0]);
    }
  }, [items]);

  if (!items || items.length === 0) {
    return <h1 className={styles.title}>Carregando {title}...</h1>;
  }

  const handleToggle = (item) => {
    if (expandedItem?.nome === item.nome) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.listSelectorContainer}>
        <Swiper
          direction={"vertical"}
          slidesPerView={"auto"}
          freeMode={true}
          scrollbar={true}
          mousewheel={true}
          modules={[FreeMode, Scrollbar, Mousewheel]}
          className={styles.listSwiper}
        >
          {items.map((item) => {
            const isExpanded = expandedItem?.nome === item.nome;
            return (
              <SwiperSlide
                key={item.id || item.nome}
                className={styles.listItemWrapper}
              >
                <div
                  className={`${styles.listItem} ${
                    isExpanded ? styles.listItemSelected : ""
                  }`}
                  onClick={() => handleToggle(item)}
                >
                  <span>{item.nome}</span>
                  <button className={styles.setaExpansao}>▼</button>
                </div>

                <div
                  className={`${styles.listItemDetails} ${
                    isExpanded ? styles.expanded : ""
                  }`}
                >
                  <div className={styles.detailsContent}>
                    <h4>Descrição</h4>
                    <p>{item.descricao}</p>

                    <h4>Benefícios</h4>
                    <ul>
                      {(item.habilidades_texto || []).map((hab, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: hab }}
                        />
                      ))}
                    </ul>
                  </div>
                  <div
                    className={styles.buttonContainerCenter}
                    style={{ marginTop: "20px" }}
                  >
                    <button
                      className={styles.btnSelect}
                      onClick={() => onSelect(item)}
                    >
                      Selecionar {item.nome}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

function NovaFichaPage() {
  const navigate = useNavigate(); // <-- CORREÇÃO 1: Inicializar o hook
  const [currentStep, setCurrentStep] = useState(1);
  const [racas, setRacas] = useState([]);
  const [classes, setClasses] = useState([]);
  const [origens, setOrigens] = useState([]);
  const [poderesGerais, setPoderesGerais] = useState([]);
  const [magiasDisponiveis, setMagiasDisponiveis] = useState([]);
  const [maravilhasMecanicas, setMaravilhasMecanicas] = useState([]);
  const [selections, setSelections] = useState({});
  const [atributosBase, setAtributosBase] = useState({
    forca: 0,
    destreza: 0,
    constituicao: 0,
    inteligencia: 0,
    sabedoria: 0,
    carisma: 0,
  });
  const [personagem, setPersonagem] = useState({
    raca: "",
    classe: "",
    origem: "",
    nomePersonagem: "",
    historia: "",
    poderes: [], // Array para guardar os objetos COMPLETOS de poderes selecionados
    magias: [], // Array para guardar os objetos COMPLETOS de magias selecionadas
  });
  const [nomePersonagem, setNomePersonagem] = useState("");
  const [historia, setHistoria] = useState("");
  const [escolhasRaciais, setEscolhasRaciais] = useState({
    atributos: [],
    versatil: [
      { tipo: "pericia", valor: "" },
      { tipo: "pericia", valor: "" },
    ],
  });
  const [periciasDeClasseEscolhidas, setPericiasDeClasseEscolhidas] = useState(
    []
  );
  const [
    periciasDeInteligenciaEscolhidas,
    setPericiasDeInteligenciaEscolhidas,
  ] = useState([]);
  const [escolhasDePericiasDeClasse, setEscolhasDePericiasDeClasse] = useState(
    []
  );
  const [magiasEscolhidas, setMagiasEscolhidas] = useState([]);
  const [atributoChaveMagia, setAtributoChaveMagia] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [creationError, setCreationError] = useState("");
  const [magiaExpandida, setMagiaExpandida] = useState(null);
  const [escolhasDeOrigem, setEscolhasDeOrigem] = useState([]);
  const [chassiEscolhido, setChassiEscolhido] = useState(null);
  const [escolhaModoKallyanach, setEscolhaModoKallyanach] = useState(null);
  const [atributosKallyanach, setAtributosKallyanach] = useState([]);
  const [atributosMashin, setAtributosMashin] = useState([]);
  const [escolhasVersateisMashin, setEscolhasVersateisMashin] = useState([
    { tipo: "pericia", valor: "" },
    { tipo: "pericia", valor: "" },
  ]);
  const [subracaEscolhida, setSubracaEscolhida] = useState(null);
  const [sexoEscolhido, setSexoEscolhido] = useState(null);
  const [herancaEscolhida, setHerancaEscolhida] = useState(null);
  const [atributosHeranca, setAtributosHeranca] = useState([]);
  const [todosOsPoderes, setTodosOsPoderes] = useState([]);

  const handlePoderSelect = (poder) => {
    setPersonagem((prev) => ({
      ...prev,
      poderes: [...prev.poderes, poder],
    }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/api/fichas",
        personagem,
        { withCredentials: true }
      );
      if (result.data.id) {
        navigate(`/ficha/${result.data.id}`); // Agora 'navigate' está definido
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const API_URL = "http://localhost:5000";
    async function fetchInitialData() {
      try {
        const [
          racasRes,
          classesRes,
          origensRes,
          poderesRes,
          magiasRes,
          maravilhasRes,
        ] = await Promise.all([
          axios.get(`${API_URL}/api/jogo/racas`),
          axios.get(`${API_URL}/api/jogo/classes`),
          axios.get(`${API_URL}/api/jogo/origens`),
          axios.get(
            `${API_URL}/api/jogo/poderes?categoria=combate,destino,magia,concedido`
          ),
          axios.get(`${API_URL}/api/jogo/magias?circulo=1`),
          axios.get(`${API_URL}/api/jogo/poderes?categoria=maravilha_mecanica`),
        ]);
        setRacas(racasRes.data);
        setClasses(classesRes.data);
        setOrigens(origensRes.data);
        setPoderesGerais(poderesRes.data);
        setMagiasDisponiveis(magiasRes.data);
        setMaravilhasMecanicas(maravilhasRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados do jogo:", error);
        setCreationError(
          "Não foi possível carregar os dados do jogo. Verifique se o servidor backend está rodando."
        );
      }
    }
    fetchInitialData();
  }, []);

  const todosOsPoderesDisponiveis = useMemo(() => {
    const allPoderes = [...poderesGerais, ...maravilhasMecanicas];
    return [...new Map(allPoderes.map((item) => [item.id, item])).values()];
  }, [poderesGerais, maravilhasMecanicas]);

  useEffect(() => {
    const { raca, classe, origem } = selections;
    const novosAtributosRaciais = {
      forca: 0,
      destreza: 0,
      constituicao: 0,
      inteligencia: 0,
      sabedoria: 0,
      carisma: 0,
    };
    if (raca) {
      if (raca.atributos) {
        Object.entries(raca.atributos).forEach(([attr, val]) => {
          novosAtributosRaciais[attr] += val;
        });
      }
      if (raca.habilidades?.atributos_base) {
        Object.entries(raca.habilidades.atributos_base).forEach(
          ([attr, val]) => {
            novosAtributosRaciais[attr] += val;
          }
        );
      }
      if (chassiEscolhido?.atributos) {
        Object.entries(chassiEscolhido.atributos).forEach(([attr, val]) => {
          novosAtributosRaciais[attr] += val;
        });
      }
      if (subracaEscolhida?.atributos) {
        Object.entries(subracaEscolhida.atributos).forEach(([attr, val]) => {
          novosAtributosRaciais[attr] += val;
        });
      }
      const regraEscolha =
        raca.habilidades?.escolha_atributos ||
        chassiEscolhido?.escolha_atributos;
      if (regraEscolha) {
        const bonus = regraEscolha.valor;
        escolhasRaciais.atributos.forEach((attr) => {
          novosAtributosRaciais[attr] += bonus;
        });
      }
      if (herancaEscolhida?.atributos_fixos) {
        Object.entries(herancaEscolhida.atributos_fixos).forEach(
          ([attr, val]) => {
            novosAtributosRaciais[attr] += val;
          }
        );
      }
      if (herancaEscolhida?.escolha_atributos) {
        const bonus = herancaEscolhida.escolha_atributos.valor;
        atributosHeranca.forEach((attr) => {
          novosAtributosRaciais[attr] += bonus;
        });
      }
      if (raca.habilidades?.escolha_kallyanach && escolhaModoKallyanach) {
        const bonus = escolhaModoKallyanach.valor;
        atributosKallyanach.forEach((attr) => {
          novosAtributosRaciais[attr] += bonus;
        });
      }

      if (raca.habilidades?.escolha_por_sexo && sexoEscolhido) {
        const opcao = raca.habilidades.escolha_por_sexo.opcoes.find(
          (opt) => opt.sexo === sexoEscolhido
        );
        if (opcao?.atributos) {
          Object.entries(opcao.atributos).forEach(([attr, val]) => {
            novosAtributosRaciais[attr] += val;
          });
        }
      }

      if (raca.habilidades?.escolha_mashin?.escolha_atributos) {
        const bonus = raca.habilidades.escolha_mashin.escolha_atributos.valor;
        atributosMashin.forEach((attr) => {
          novosAtributosRaciais[attr] += bonus;
        });
      }
    }
    let pvInicial = classe?.habilidades?.pv_inicial || 0;
    let pmInicial = classe?.habilidades?.pm_por_nivel || 0;
    if (raca?.habilidades?.pv_extra_inicial) {
      pvInicial += raca.habilidades.pv_extra_inicial;
    }
    const periciasSet = new Set();
    if (classe?.habilidades?.pericias_fixas) {
      classe.habilidades.pericias_fixas.forEach((p) => periciasSet.add(p));
    }
    if (origem?.habilidades?.pericias) {
      (origem.habilidades.pericias || []).forEach((p) => periciasSet.add(p));
    }
    setPersonagem((prev) => ({
      ...prev,
      atributosRaciais: novosAtributosRaciais,
      pv: pvInicial,
      pm: pmInicial,
      pericias: Array.from(periciasSet).sort(),
    }));
  }, [
    selections,
    escolhasRaciais.atributos,
    chassiEscolhido,
    escolhaModoKallyanach,
    atributosKallyanach,
    atributosMashin,
    subracaEscolhida,
    sexoEscolhido,
    herancaEscolhida,
    atributosHeranca,
  ]);

  const handleSelectRaca = (racaObjeto) => {
    setEscolhasRaciais({
      atributos: [],
      versatil: [
        { tipo: "pericia", valor: "" },
        { tipo: "pericia", valor: "" },
      ],
    });
    setChassiEscolhido(null);
    setEscolhaModoKallyanach(null);
    setAtributosKallyanach([]);
    setAtributosMashin([]);
    setEscolhasVersateisMashin([
      { tipo: "pericia", valor: "" },
      { tipo: "pericia", valor: "" },
    ]);
    setSexoEscolhido(
      racaObjeto.habilidades?.escolha_por_sexo?.opcoes?.[0]?.sexo || null
    );
    setSubracaEscolhida(
      racaObjeto.habilidades?.escolha_subraca?.opcoes?.[0] || null
    );
    setHerancaEscolhida(
      racaObjeto.habilidades?.escolha_heranca?.opcoes?.[0] || null
    );
    setSelections((prev) => ({ ...prev, raca: racaObjeto }));
    setCurrentStep(2);
  };

  // CORREÇÃO 2: A função foi comentada pois o componente 'PoderesStep' não está definido.
  /* const renderPoderesStep = () => (
        <PoderesStep 
            title="Escolha um Poder Geral"
            onSelect={handlePoderSelect}
            // ... outras props
        />
    );
  */

  const handleSelectClasse = (classeObjeto) => {
    setEscolhasDePericiasDeClasse([]);
    setPericiasDeClasseEscolhidas([]);
    const novoAtributoChave =
      classeObjeto.habilidades?.magias_iniciais?.atributo_chave?.opcoes?.[0] ||
      null;
    setAtributoChaveMagia(novoAtributoChave);
    setSelections((prev) => ({ ...prev, classe: classeObjeto }));
    setCurrentStep(3);
  };
  const handleSelectOrigem = (origemObjeto) => {
    setEscolhasDeOrigem([]);
    setSelections((prev) => ({ ...prev, origem: origemObjeto }));
    setCurrentStep(4);
  };

  const PONTO_CUSTO = { "-1": -1, 0: 0, 1: 1, 2: 2, 3: 4, 4: 7 };
  const ATRIBUTOS_LISTA = [
    "forca",
    "destreza",
    "constituicao",
    "inteligencia",
    "sabedoria",
    "carisma",
  ];
  const existeAtributoNegativo = Object.values(atributosBase).some(
    (v) => v === -1
  );
  const pontosIniciais = existeAtributoNegativo ? 11 : 10;
  const custoAtual = ATRIBUTOS_LISTA.reduce(
    (total, attr) => total + PONTO_CUSTO[atributosBase[attr]],
    0
  );
  const pontosGastos = existeAtributoNegativo ? custoAtual + 1 : custoAtual;
  const pontosDisponiveis = pontosIniciais - pontosGastos;

  const handleMudancaAtributo = (attr, delta) => {
    const valorAtual = atributosBase[attr];
    const novoValor = valorAtual + delta;
    if (novoValor < -1 || novoValor > 4) return;
    if (novoValor === -1) {
      const outroAtributoJaNegativo = Object.entries(atributosBase).some(
        ([key, value]) => key !== attr && value === -1
      );
      if (outroAtributoJaNegativo) return;
    }
    const novosAtributos = { ...atributosBase, [attr]: novoValor };
    const novoCustoTotal = ATRIBUTOS_LISTA.reduce(
      (total, a) => total + PONTO_CUSTO[novosAtributos[a]],
      0
    );
    if (novoCustoTotal <= 10) {
      setAtributosBase(novosAtributos);
    }
  };

  const handleConfirmarAtributos = () => {
    const atributosFinais = {};
    ATRIBUTOS_LISTA.forEach((attr) => {
      const total =
        atributosBase[attr] + (personagem.atributosRaciais[attr] || 0);
      atributosFinais[attr] = total;
    });
    const pvBaseDaClasse = selections.classe?.habilidades?.pv_inicial || 0;
    const pvExtraRacial = selections.raca?.habilidades?.pv_extra_inicial || 0;
    const pvFinal =
      pvBaseDaClasse + atributosFinais.constituicao + pvExtraRacial;
    setPersonagem((prev) => ({ ...prev, atributosFinais, pv: pvFinal }));
    setCurrentStep(5);
  };

  const handleConfirmarPericias = () => {
    const periciasFixas = personagem.pericias;

    const periciasDaVersatilidade = escolhasRaciais.versatil
      .filter((e) => e.tipo === "pericia" && e.valor)
      .map((e) => e.valor);
    const nomesPoderesDaVersatilidade = escolhasRaciais.versatil
      .filter((e) => e.tipo === "poder" && e.valor)
      .map((e) => e.valor);

    const periciasDoMashin = escolhasVersateisMashin
      .filter((e) => e.tipo === "pericia" && e.valor)
      .map((e) => e.valor);
    const nomesPoderesDoMashin = escolhasVersateisMashin
      .filter((e) => e.tipo === "poder" && e.valor)
      .map((e) => e.valor);

    const periciasDaOrigem = escolhasDeOrigem
      .filter((e) => e.tipo === "pericia")
      .map((e) => e.nome);
    const nomesPoderesDaOrigem = escolhasDeOrigem
      .filter((e) => e.tipo === "poder")
      .map((e) => e.nome);

    const periciasFinais = [
      ...new Set([
        ...periciasFixas,
        ...periciasDaVersatilidade,
        ...periciasDoMashin,
        ...periciasDaOrigem,
        ...escolhasDePericiasDeClasse,
        ...periciasDeClasseEscolhidas,
        ...periciasDeInteligenciaEscolhidas,
      ]),
    ];

    const todosOsNomesDePoderes = [
      ...new Set([
        ...nomesPoderesDaVersatilidade,
        ...nomesPoderesDoMashin,
        ...nomesPoderesDaOrigem,
      ]),
    ];

    const objetosDePoderFinais = todosOsPoderesDisponiveis.filter((poder) =>
      todosOsNomesDePoderes.includes(poder.nome)
    );

    setPersonagem((prev) => ({
      ...prev,
      pericias: periciasFinais.sort(),
      poderes: objetosDePoderFinais,
    }));

    if (selections.classe?.habilidades?.magias_iniciais) {
      setCurrentStep(6);
    } else {
      setCurrentStep(7);
    }
  };

  const handleConfirmarMagias = () => {
    setPersonagem((prev) => ({ ...prev, magias: magiasEscolhidas }));
    setCurrentStep(7);
  };

  const handleCriarFicha = async () => {
    if (!nomePersonagem) {
      setCreationError("O nome do personagem é obrigatório.");
      return;
    }
    setIsCreating(true);
    setCreationError("");
    try {
      const fichaData = {
        nomePersonagem,
        historia,
        raca: selections.raca,
        classe: selections.classe,
        origem: selections.origem,
        atributosFinais: personagem.atributosFinais,
        pv: personagem.pv,
        pm: personagem.pm,
        pericias: personagem.pericias,
        poderes: personagem.poderes,
        magias: personagem.magias,
        atributoChaveMagia: atributoChaveMagia,
      };
      const API_URL = "http://localhost:5000";
      await axios.post(`${API_URL}/api/fichas`, fichaData, {
        withCredentials: true,
      });
      // A navegação que estava aqui foi movida para a função `handleSubmit`
      // para seguir o padrão do seu código original, mas o ideal seria chamar essa
      // `handleCriarFicha` dentro de um `handleSubmit` que previne o default do formulário.
      // E então, fazer a navegação aqui.
      window.location.href = "/fichas";
    } catch (error) {
      console.error("Erro ao criar ficha:", error);
      setCreationError(
        error.response?.data?.erro ||
          "Não foi possível criar a ficha. Tente novamente."
      );
      setIsCreating(false);
    }
  };

  let periciasCalculadasAoVivo = 0;
  if (currentStep === 4 && selections.classe) {
    const bonusRacialInt = personagem.atributosRaciais?.inteligencia || 0;
    const baseInt = atributosBase.inteligencia;
    const totalIntAtual = baseInt + bonusRacialInt;
    const periciasExtrasDaClasse =
      selections.classe?.habilidades?.pericias_extras?.quantidade || 0;
    const periciasPorInteligencia = totalIntAtual > 0 ? totalIntAtual : 0;
    periciasCalculadasAoVivo = periciasExtrasDaClasse + periciasPorInteligencia;
  }

  const periciasExtrasClasse = selections.classe?.habilidades?.pericias_extras;
  let periciasPorInteligencia = 0;
  if (currentStep === 5) {
    const valorFinalInteligencia = personagem.atributosFinais.inteligencia || 0;
    periciasPorInteligencia =
      valorFinalInteligencia > 0 ? valorFinalInteligencia : 0;
  }

  return (
    <div className={styles.mainContainer}>
      {currentStep === 1 && (
        <CardSelector
          items={racas}
          onSelect={handleSelectRaca}
          title="Escolha sua Raça"
        />
      )}
      {currentStep === 2 && (
        <CardSelector
          items={classes}
          onSelect={handleSelectClasse}
          title="Escolha sua Classe"
        />
      )}
      {currentStep === 3 && (
        <ListSelector
          items={origens}
          onSelect={handleSelectOrigem}
          title="Escolha sua Origem"
        />
      )}

      {currentStep === 4 &&
        (() => {
          let regraDeEscolhaDeAtributo = null;
          if (selections.raca?.habilidades?.escolha_atributos) {
            regraDeEscolhaDeAtributo =
              selections.raca.habilidades.escolha_atributos;
          } else if (chassiEscolhido?.escolha_atributos) {
            regraDeEscolhaDeAtributo = chassiEscolhido.escolha_atributos;
          }

          const regraKallyanach =
            selections.raca?.habilidades?.escolha_kallyanach;
          const regraMashin =
            selections.raca?.habilidades?.escolha_mashin?.escolha_atributos;
          const regraMoreau = selections.raca?.habilidades?.escolha_heranca;

          return (
            <div>
              <h1 className={styles.title}>Escolha seus atributos</h1>

              {selections.raca?.habilidades?.escolha_chassi && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Escolha de Chassi ({selections.raca.nome})</h3>
                  <p>
                    {
                      selections.raca.habilidades.escolha_chassi
                        .texto_explicativo
                    }
                  </p>
                  <div className={styles.radioGrid}>
                    {selections.raca.habilidades.escolha_chassi.opcoes.map(
                      (opcao) => (
                        <label key={opcao.nome}>
                          <input
                            type="radio"
                            name="chassi"
                            value={opcao.nome}
                            checked={chassiEscolhido?.nome === opcao.nome}
                            onChange={() => {
                              setEscolhasRaciais((prev) => ({
                                ...prev,
                                atributos: [],
                              }));
                              setChassiEscolhido(opcao);
                            }}
                          />{" "}
                          {opcao.nome}
                        </label>
                      )
                    )}
                  </div>
                  {chassiEscolhido && (
                    <div className={styles.detalhesChassi}>
                      <ul>
                        {(chassiEscolhido.habilidades_texto || []).map(
                          (hab, index) => (
                            <li
                              key={index}
                              dangerouslySetInnerHTML={{ __html: hab }}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {regraMoreau && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Herança Animal ({selections.raca.nome})</h3>
                  <p>{regraMoreau.texto_explicativo}</p>
                  <div className={styles.radioGrid}>
                    {regraMoreau.opcoes.map((opcao) => (
                      <label key={opcao.nome}>
                        <input
                          type="radio"
                          name="heranca"
                          value={opcao.nome}
                          checked={herancaEscolhida?.nome === opcao.nome}
                          onChange={() => {
                            setHerancaEscolhida(opcao);
                            setAtributosHeranca([]);
                          }}
                        />
                        {opcao.nome}
                      </label>
                    ))}
                  </div>
                  {herancaEscolhida && (
                    <div className={styles.detalhesChassi}>
                      <h4>Habilidades da {herancaEscolhida.nome}:</h4>
                      <ul>
                        {(herancaEscolhida.habilidades_texto || []).map(
                          (hab, index) => (
                            <li
                              key={index}
                              dangerouslySetInnerHTML={{ __html: hab }}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {herancaEscolhida?.escolha_atributos && (
                    <div
                      className={styles.escolhaGrupo}
                      style={{ marginTop: "20px" }}
                    >
                      <p>
                        Escolha {herancaEscolhida.escolha_atributos.quantidade}{" "}
                        atributos para receber +
                        {herancaEscolhida.escolha_atributos.valor}:
                      </p>
                      <div className={styles.checkboxGrid}>
                        {ATRIBUTOS_LISTA.map((attr) => (
                          <label key={attr}>
                            <input
                              type="checkbox"
                              checked={atributosHeranca.includes(attr)}
                              disabled={
                                !atributosHeranca.includes(attr) &&
                                atributosHeranca.length >=
                                  herancaEscolhida.escolha_atributos.quantidade
                              }
                              onChange={() => {
                                const novasEscolhas = atributosHeranca.includes(
                                  attr
                                )
                                  ? atributosHeranca.filter((a) => a !== attr)
                                  : [...atributosHeranca, attr];
                                setAtributosHeranca(novasEscolhas);
                              }}
                            />
                            {attr.toUpperCase().substring(0, 3)}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selections.raca?.habilidades?.escolha_subraca && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Herança Divina ({selections.raca.nome})</h3>
                  <p>
                    {
                      selections.raca.habilidades.escolha_subraca
                        .texto_explicativo
                    }
                  </p>
                  <div
                    className={styles.radioGrid}
                    style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                  >
                    {selections.raca.habilidades.escolha_subraca.opcoes.map(
                      (opcao) => (
                        <label key={opcao.nome}>
                          <input
                            type="radio"
                            name="subraca"
                            value={opcao.nome}
                            checked={subracaEscolhida?.nome === opcao.nome}
                            onChange={() => setSubracaEscolhida(opcao)}
                          />
                          {opcao.nome}
                        </label>
                      )
                    )}
                  </div>
                  {subracaEscolhida && (
                    <div className={styles.detalhesChassi}>
                      <ul>
                        {(subracaEscolhida.habilidades_texto || []).map(
                          (hab, index) => (
                            <li
                              key={index}
                              dangerouslySetInnerHTML={{ __html: hab }}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {regraKallyanach && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Herança Dracônica ({selections.raca.nome})</h3>
                  <p>{regraKallyanach.texto_explicativo}</p>
                  <div
                    className={styles.radioGrid}
                    style={{ marginBottom: "20px" }}
                  >
                    {regraKallyanach.opcoes.map((opcao) => (
                      <label key={opcao.id}>
                        <input
                          type="radio"
                          name="modoKallyanach"
                          checked={escolhaModoKallyanach?.id === opcao.id}
                          onChange={() => {
                            setEscolhaModoKallyanach(opcao);
                            setAtributosKallyanach([]);
                          }}
                        />
                        {opcao.texto}
                      </label>
                    ))}
                  </div>
                  {escolhaModoKallyanach && (
                    <div className={styles.escolhaGrupo}>
                      <div className={styles.checkboxGrid}>
                        {ATRIBUTOS_LISTA.map((attr) => (
                          <label key={attr}>
                            <input
                              type="checkbox"
                              checked={atributosKallyanach.includes(attr)}
                              disabled={
                                !atributosKallyanach.includes(attr) &&
                                atributosKallyanach.length >=
                                  escolhaModoKallyanach.quantidade
                              }
                              onChange={() => {
                                const novasEscolhas =
                                  atributosKallyanach.includes(attr)
                                    ? atributosKallyanach.filter(
                                        (a) => a !== attr
                                      )
                                    : [...atributosKallyanach, attr];
                                setAtributosKallyanach(novasEscolhas);
                              }}
                            />
                            {attr.toUpperCase().substring(0, 3)}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {regraMashin && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Atributos de Chassi ({selections.raca.nome})</h3>
                  <p>
                    Escolha {regraMashin.quantidade} atributos para receber +
                    {regraMashin.valor}.
                  </p>
                  <div className={styles.checkboxGrid}>
                    {ATRIBUTOS_LISTA.map((attr) => (
                      <label key={attr}>
                        <input
                          type="checkbox"
                          checked={atributosMashin.includes(attr)}
                          disabled={
                            !atributosMashin.includes(attr) &&
                            atributosMashin.length >= regraMashin.quantidade
                          }
                          onChange={() => {
                            const novasEscolhas = atributosMashin.includes(attr)
                              ? atributosMashin.filter((a) => a !== attr)
                              : [...atributosMashin, attr];
                            setAtributosMashin(novasEscolhas);
                          }}
                        />
                        {attr.toUpperCase().substring(0, 3)}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {regraDeEscolhaDeAtributo && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Escolhas Adicionais de Atributos</h3>
                  <div className={styles.escolhaGrupo}>
                    <p>
                      {regraDeEscolhaDeAtributo.texto_explicativo ||
                        `Escolha ${regraDeEscolhaDeAtributo.quantidade} atributos para receber +${regraDeEscolhaDeAtributo.valor}.`}
                    </p>
                    <div className={styles.checkboxGrid}>
                      {ATRIBUTOS_LISTA.map((attr) => (
                        <label key={attr}>
                          <input
                            type="checkbox"
                            checked={escolhasRaciais.atributos.includes(attr)}
                            disabled={
                              !escolhasRaciais.atributos.includes(attr) &&
                              escolhasRaciais.atributos.length >=
                                regraDeEscolhaDeAtributo.quantidade
                            }
                            onChange={() => {
                              const novosAtributos =
                                escolhasRaciais.atributos.includes(attr)
                                  ? escolhasRaciais.atributos.filter(
                                      (a) => a !== attr
                                    )
                                  : [...escolhasRaciais.atributos, attr];
                              setEscolhasRaciais((prev) => ({
                                ...prev,
                                atributos: novosAtributos,
                              }));
                            }}
                          />{" "}
                          {attr.toUpperCase().substring(0, 3)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selections.raca?.habilidades?.escolha_por_sexo && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Herança de Sszzaas ({selections.raca.nome})</h3>
                  <p>
                    {
                      selections.raca.habilidades.escolha_por_sexo
                        .texto_explicativo
                    }
                  </p>
                  <div
                    className={styles.radioGrid}
                    style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                  >
                    {selections.raca.habilidades.escolha_por_sexo.opcoes.map(
                      (opcao) => (
                        <label key={opcao.sexo}>
                          <input
                            type="radio"
                            name="sexo"
                            value={opcao.sexo}
                            checked={sexoEscolhido === opcao.sexo}
                            onChange={(e) => setSexoEscolhido(e.target.value)}
                          />
                          {opcao.sexo}
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}

              {selections.classe?.habilidades?.magias_iniciais?.atributo_chave
                ?.escolha && (
                <div className={styles.escolhasRaciaisContainer}>
                  <h3>Atributo-Chave de Magia ({selections.classe.nome})</h3>
                  <p>
                    Escolha o atributo que você usará para lançar suas magias.
                  </p>
                  <div className={styles.escolhaGrupo}>
                    <div
                      className={styles.checkboxGrid}
                      style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                    >
                      {selections.classe.habilidades.magias_iniciais.atributo_chave.opcoes.map(
                        (opcao) => (
                          <label key={opcao}>
                            <input
                              type="radio"
                              name="atributoChaveMagia"
                              value={opcao}
                              checked={atributoChaveMagia === opcao}
                              onChange={(e) =>
                                setAtributoChaveMagia(e.target.value)
                              }
                            />
                            {opcao}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.infoContainer}>
                <div className={styles.pontosInfo}>
                  Pontos Disponíveis:{" "}
                  <span>
                    {pontosDisponiveis} / {pontosIniciais}
                  </span>
                </div>
                <div className={styles.pontosInfo}>
                  Perícias a Escolher (Classe + INT):{" "}
                  <span>{periciasCalculadasAoVivo}</span>
                </div>
              </div>
              <div className={styles.atributosContainer}>
                {ATRIBUTOS_LISTA.map((attr) => {
                  const bonusRacial = personagem.atributosRaciais[attr] || 0;
                  const valorBase = atributosBase[attr];
                  const valorTotal = valorBase + bonusRacial;
                  const custoProximoPonto =
                    PONTO_CUSTO[valorBase + 1] - PONTO_CUSTO[valorBase];
                  const desabilitarDiminuir =
                    valorBase <= -1 ||
                    (valorBase === 0 &&
                      existeAtributoNegativo &&
                      atributosBase[attr] !== -1);
                  return (
                    <div
                      key={attr}
                      className={styles.atributoBox}
                      style={{
                        backgroundImage: `url(/images/atributos/${attr}.png)`,
                      }}
                    >
                      <div className={styles.valoresContainer}>
                        <div className={styles.bonusRacial}>
                          {bonusRacial !== 0
                            ? `Racial: ${
                                bonusRacial > 0 ? "+" : ""
                              }${bonusRacial}`
                            : ""}
                        </div>
                        <div className={styles.valorTotal}>{valorTotal}</div>
                      </div>
                      <div className={styles.controlesBase}>
                        <button
                          onClick={() => handleMudancaAtributo(attr, -1)}
                          disabled={desabilitarDiminuir}
                        >
                          -
                        </button>
                        <span className={styles.valorBase}>{valorBase}</span>
                        <button
                          onClick={() => handleMudancaAtributo(attr, 1)}
                          disabled={
                            valorBase >= 4 ||
                            pontosDisponiveis < custoProximoPonto
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.buttonContainerCenter}>
                <button
                  className={styles.btnSelect}
                  onClick={handleConfirmarAtributos}
                  disabled={pontosDisponiveis !== 0}
                >
                  {pontosDisponiveis > 0
                    ? `Faltam ${pontosDisponiveis} pontos`
                    : "Confirmar Atributos"}
                </button>
              </div>
            </div>
          );
        })()}

      {currentStep === 5 && (
        <div>
          <h1 className={styles.title}>Escolha suas Perícias e Poderes</h1>
          <div className={styles.periciasContainer}>
            {selections.origem?.habilidades?.beneficios && (
              <div
                className={styles.escolhaGrupo}
                style={{
                  marginBottom: "30px",
                  borderBottom: "1px solid var(--border-color)",
                  paddingBottom: "20px",
                }}
              >
                <h3>Benefícios de Origem ({selections.origem.nome})</h3>
                <p>
                  {selections.origem.habilidades.beneficios.texto_explicativo}
                </p>
                <p>
                  Escolhidos: {escolhasDeOrigem.length} de{" "}
                  {selections.origem.habilidades.beneficios.escolher}
                </p>
                <div className={styles.periciasGrid}>
                  {selections.origem.habilidades.beneficios.opcoes.map(
                    (opcao) => {
                      const isChecked = escolhasDeOrigem.some(
                        (e) => e.nome === opcao.nome
                      );
                      const isLimiteAtingido =
                        escolhasDeOrigem.length >=
                        selections.origem.habilidades.beneficios.escolher;
                      return (
                        <label
                          key={opcao.nome}
                          className={`${styles.periciaItem} ${
                            isChecked ? styles.checked : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={!isChecked && isLimiteAtingido}
                            onChange={() => {
                              const novasEscolhas = isChecked
                                ? escolhasDeOrigem.filter(
                                    (e) => e.nome !== opcao.nome
                                  )
                                : [...escolhasDeOrigem, opcao];
                              setEscolhasDeOrigem(novasEscolhas);
                            }}
                          />
                          {opcao.nome} ({opcao.tipo})
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {selections.raca?.habilidades?.escolha_versatil && (
              <div
                className={styles.escolhaGrupo}
                style={{
                  marginBottom: "30px",
                  borderBottom: "1px solid var(--border-color)",
                  paddingBottom: "20px",
                }}
              >
                <h3>Habilidade Racial: Versátil</h3>
                <p>
                  {
                    selections.raca.habilidades.escolha_versatil
                      .texto_explicativo
                  }
                </p>
                {escolhasRaciais.versatil.map((escolha, index) => {
                  const podeVirarPoder =
                    escolhasRaciais.versatil.filter((e) => e.tipo === "poder")
                      .length <
                    selections.raca.habilidades.escolha_versatil
                      .pode_trocar_por_poder;
                  return (
                    <div key={index} className={styles.versatilSlot}>
                      <select
                        value={escolha.tipo}
                        onChange={(e) => {
                          const novoArray = [...escolhasRaciais.versatil];
                          novoArray[index] = {
                            tipo: e.target.value,
                            valor: "",
                          };
                          setEscolhasRaciais((prev) => ({
                            ...prev,
                            versatil: novoArray,
                          }));
                        }}
                      >
                        <option value="pericia">Perícia</option>
                        {(podeVirarPoder || escolha.tipo === "poder") && (
                          <option value="poder">Poder Geral</option>
                        )}
                      </select>
                      {escolha.tipo === "pericia" && (
                        <select
                          value={escolha.valor}
                          onChange={(e) => {
                            const novoArray = [...escolhasRaciais.versatil];
                            novoArray[index].valor = e.target.value;
                            setEscolhasRaciais((prev) => ({
                              ...prev,
                              versatil: novoArray,
                            }));
                          }}
                        >
                          <option value="">-- Selecione uma Perícia --</option>
                          {LISTA_DE_PERICIAS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      )}
                      {escolha.tipo === "poder" && (
                        <select
                          value={escolha.valor}
                          onChange={(e) => {
                            const novoArray = [...escolhasRaciais.versatil];
                            novoArray[index].valor = e.target.value;
                            setEscolhasRaciais((prev) => ({
                              ...prev,
                              versatil: novoArray,
                            }));
                          }}
                        >
                          <option value="">-- Selecione um Poder --</option>
                          {poderesGerais.map((p) => (
                            <option key={p.nome} value={p.nome}>
                              {p.nome} ({p.categoria})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {selections.raca?.habilidades?.escolha_mashin
              ?.escolha_pericias_e_poderes &&
              (() => {
                const regra =
                  selections.raca.habilidades.escolha_mashin
                    .escolha_pericias_e_poderes;
                return (
                  <div
                    className={styles.escolhaGrupo}
                    style={{
                      marginBottom: "30px",
                      borderBottom: "1px solid var(--border-color)",
                      paddingBottom: "20px",
                    }}
                  >
                    <h3>Habilidades de Chassi ({selections.raca.nome})</h3>
                    <p>
                      Escolha {regra.quantidade_total} opções. Você pode trocar
                      até {regra.pode_trocar_por_poder} perícia por uma
                      Maravilha Mecânica.
                    </p>
                    {escolhasVersateisMashin.map((escolha, index) => {
                      const podeVirarPoder =
                        escolhasVersateisMashin.filter(
                          (e) => e.tipo === "poder"
                        ).length < regra.pode_trocar_por_poder;
                      return (
                        <div key={index} className={styles.versatilSlot}>
                          <select
                            value={escolha.tipo}
                            onChange={(e) => {
                              const novoArray = [...escolhasVersateisMashin];
                              novoArray[index] = {
                                tipo: e.target.value,
                                valor: "",
                              };
                              setEscolhasVersateisMashin(novoArray);
                            }}
                          >
                            <option value="pericia">Perícia</option>
                            {(podeVirarPoder || escolha.tipo === "poder") && (
                              <option value="poder">Maravilha Mecânica</option>
                            )}
                          </select>
                          {escolha.tipo === "pericia" && (
                            <select
                              value={escolha.valor}
                              onChange={(e) => {
                                const novoArray = [...escolhasVersateisMashin];
                                novoArray[index].valor = e.target.value;
                                setEscolhasVersateisMashin(novoArray);
                              }}
                            >
                              <option value="">
                                -- Selecione uma Perícia --
                              </option>
                              {LISTA_DE_PERICIAS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                          )}
                          {escolha.tipo === "poder" && (
                            <select
                              value={escolha.valor}
                              onChange={(e) => {
                                const novoArray = [...escolhasVersateisMashin];
                                novoArray[index].valor = e.target.value;
                                setEscolhasVersateisMashin(novoArray);
                              }}
                            >
                              <option value="">
                                -- Selecione uma Maravilha --
                              </option>
                              {maravilhasMecanicas.map((p) => (
                                <option key={p.nome} value={p.nome}>
                                  {p.nome}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

            {selections.classe?.habilidades?.pericias_escolha && (
              <div
                className={styles.escolhaGrupo}
                style={{
                  marginBottom: "30px",
                  borderBottom: "1px solid var(--border-color)",
                  paddingBottom: "20px",
                }}
              >
                <p>
                  Sua classe permite escolher{" "}
                  <strong>
                    {selections.classe.habilidades.pericias_escolha.quantidade}
                  </strong>{" "}
                  das perícias abaixo:
                </p>
                <div className={styles.checkboxGrid}>
                  {selections.classe.habilidades.pericias_escolha.opcoes.map(
                    (opcao) => (
                      <label key={opcao}>
                        <input
                          type="radio"
                          name="periciaDeClasse"
                          value={opcao}
                          checked={escolhasDePericiasDeClasse.includes(opcao)}
                          onChange={(e) =>
                            setEscolhasDePericiasDeClasse([e.target.value])
                          }
                        />
                        {opcao}
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            {periciasExtrasClasse && (
              <div
                className={styles.escolhaGrupo}
                style={{
                  marginBottom: "30px",
                  borderBottom: "1px solid var(--border-color)",
                  paddingBottom: "20px",
                }}
              >
                <h3>Perícias de Classe</h3>
                <p>
                  Escolha <strong>{periciasExtrasClasse.quantidade}</strong>{" "}
                  perícias da lista abaixo:
                </p>
                <p>
                  Escolhidas: {periciasDeClasseEscolhidas.length} de{" "}
                  {periciasExtrasClasse.quantidade}
                </p>
                <div className={styles.periciasGrid}>
                  {periciasExtrasClasse.lista.map((pericia) => {
                    const isJaAdquirida =
                      personagem.pericias.includes(pericia) ||
                      escolhasRaciais.versatil.some((e) => e.valor === pericia);
                    const isChecked =
                      periciasDeClasseEscolhidas.includes(pericia);
                    const isLimiteAtingido =
                      periciasDeClasseEscolhidas.length >=
                      periciasExtrasClasse.quantidade;
                    return (
                      <label
                        key={pericia}
                        className={`${styles.periciaItem} ${
                          isJaAdquirida ? styles.disabled : ""
                        } ${isChecked ? styles.checked : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked || isJaAdquirida}
                          disabled={
                            isJaAdquirida || (!isChecked && isLimiteAtingido)
                          }
                          onChange={() => {
                            const novasPericias = isChecked
                              ? periciasDeClasseEscolhidas.filter(
                                  (p) => p !== pericia
                                )
                              : [...periciasDeClasseEscolhidas, pericia];
                            setPericiasDeClasseEscolhidas(novasPericias);
                          }}
                        />{" "}
                        {pericia}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {periciasPorInteligencia > 0 && (
              <div className={styles.escolhaGrupo}>
                <h3>Perícias por Inteligência</h3>
                <p>
                  Seu bônus de Inteligência permite que você escolha{" "}
                  <strong>{periciasPorInteligencia}</strong> perícias de
                  qualquer tipo:
                </p>
                <p>
                  Escolhidas: {periciasDeInteligenciaEscolhidas.length} de{" "}
                  {periciasPorInteligencia}
                </p>
                <div className={styles.periciasGrid}>
                  {LISTA_DE_PERICIAS.map((pericia) => {
                    const isJaAdquirida =
                      personagem.pericias.includes(pericia) ||
                      escolhasRaciais.versatil.some(
                        (e) => e.valor === pericia
                      ) ||
                      periciasDeClasseEscolhidas.includes(pericia) ||
                      escolhasDePericiasDeClasse.includes(pericia);
                    const isChecked =
                      periciasDeInteligenciaEscolhidas.includes(pericia);
                    const isLimiteAtingido =
                      periciasDeInteligenciaEscolhidas.length >=
                      periciasPorInteligencia;
                    return (
                      <label
                        key={pericia}
                        className={`${styles.periciaItem} ${
                          isJaAdquirida ? styles.disabled : ""
                        } ${isChecked ? styles.checked : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked || isJaAdquirida}
                          disabled={
                            isJaAdquirida || (!isChecked && isLimiteAtingido)
                          }
                          onChange={() => {
                            const novasPericias = isChecked
                              ? periciasDeInteligenciaEscolhidas.filter(
                                  (p) => p !== pericia
                                )
                              : [...periciasDeInteligenciaEscolhidas, pericia];
                            setPericiasDeInteligenciaEscolhidas(novasPericias);
                          }}
                        />{" "}
                        {pericia}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className={styles.buttonContainerCenter}>
            <button
              className={styles.btnSelect}
              onClick={handleConfirmarPericias}
            >
              Confirmar Perícias e Poderes
            </button>
          </div>
        </div>
      )}

      {currentStep === 6 && (
        <div>
          <h1 className={styles.title}>Escolha suas Magias Iniciais</h1>
          <div className={styles.periciasContainer}>
            <div className={styles.periciasInfo}>
              <p>
                Sua classe permite escolher{" "}
                <strong>
                  {selections.classe.habilidades.magias_iniciais.quantidade}
                </strong>{" "}
                magias de 1º Círculo.
              </p>
              <p>
                Escolhidas: {magiasEscolhidas.length} de{" "}
                {selections.classe.habilidades.magias_iniciais.quantidade}
              </p>
            </div>
            <div className={styles.magiasGrid}>
              {magiasDisponiveis
                .filter(
                  (magia) =>
                    magia.tipo ===
                    selections.classe.habilidades.magias_iniciais.tipo
                )
                .map((magia) => {
                  const isChecked = magiasEscolhidas.some(
                    (m) => m.id === magia.id
                  );
                  const isLimiteAtingido =
                    magiasEscolhidas.length >=
                    selections.classe.habilidades.magias_iniciais.quantidade;
                  const isExpanded = magiaExpandida === magia.nome;

                  return (
                    <div
                      key={magia.id}
                      className={`${styles.magiaItemContainer} ${
                        isExpanded ? styles.expanded : ""
                      }`}
                    >
                      <div className={styles.magiaItemHeader}>
                        <label className={styles.magiaLabel}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={!isChecked && isLimiteAtingido}
                            onChange={() => {
                              const novasMagias = isChecked
                                ? magiasEscolhidas.filter(
                                    (m) => m.id !== magia.id
                                  )
                                : [...magiasEscolhidas, magia];
                              setMagiasEscolhidas(novasMagias);
                            }}
                          />
                          <span>{magia.nome}</span>
                        </label>
                        <button
                          className={styles.setaExpansao}
                          onClick={() =>
                            setMagiaExpandida(isExpanded ? null : magia.nome)
                          }
                        >
                          ▼
                        </button>
                      </div>

                      {isExpanded && (
                        <div className={styles.magiaDetalhes}>
                          <p>
                            <strong>
                              {magia.escola} de Círculo {magia.circulo}
                            </strong>
                          </p>
                          <p>{magia.descricao}</p>
                          <ul>
                            <li>
                              <strong>Execução:</strong> {magia.execucao}
                            </li>
                            <li>
                              <strong>Alcance:</strong> {magia.alcance}
                            </li>
                            <li>
                              <strong>Alvo/Área:</strong> {magia.alvo_area}
                            </li>
                            <li>
                              <strong>Duração:</strong> {magia.duracao}
                            </li>
                            {magia.resistencia && (
                              <li>
                                <strong>Resistência:</strong>{" "}
                                {magia.resistencia}
                              </li>
                            )}
                          </ul>
                          {magia.aprimoramentos && (
                            <>
                              <strong>Aprimoramentos:</strong>
                              <ul>
                                {magia.aprimoramentos.map((aprim, index) => (
                                  <li key={index}>
                                    <strong>
                                      {aprim.tipo} (
                                      {aprim.custo_pm
                                        ? `+${aprim.custo_pm} PM`
                                        : ""}
                                      ):
                                    </strong>{" "}
                                    {aprim.efeito}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.buttonContainerCenter}>
            <button
              className={styles.btnSelect}
              onClick={handleConfirmarMagias}
            >
              Confirmar Magias
            </button>
          </div>
        </div>
      )}

      {currentStep === 7 && (
        <div>
          <h1 className={styles.title}>Finalize seu Personagem</h1>
          <p
            style={{
              color: "var(--text-secondary)",
              textAlign: "center",
              fontSize: "1.2rem",
              marginBottom: "40px",
            }}
          >
            {selections.raca?.nome} / {selections.classe?.nome} /{" "}
            {selections.origem?.nome}
          </p>
          <div className={styles.finalFormContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="nomePersonagem">Nome do Personagem</label>
              <input
                type="text"
                id="nomePersonagem"
                value={nomePersonagem}
                onChange={(e) => setNomePersonagem(e.target.value)}
                placeholder="Ex: Renji Sato, A Sombra Sanguinaria"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="historia">História (Opcional)</label>
              <textarea
                id="historia"
                value={historia}
                onChange={(e) => setHistoria(e.target.value)}
                rows="4"
                placeholder="Descreva o passado, as motivações ou a aparência do seu personagem..."
              ></textarea>
            </div>
            <button
              className={styles.btnSelect}
              onClick={handleCriarFicha}
              disabled={isCreating}
              style={{ width: "100%", marginTop: "20px" }}
            >
              {isCreating ? "Criando..." : "Criar Ficha e Salvar"}
            </button>
            {creationError && (
              <p className={styles.errorMessage}>{creationError}</p>
            )}
          </div>
          <details className={styles.resumoDetails}>
            <summary>Ver Resumo da Ficha</summary>
            <div className={styles.resumoFinalContainer}>
              <h3>Atributos Finais</h3>
              <div className={styles.atributosContainer}>
                {ATRIBUTOS_LISTA.map((attr) => (
                  <div key={attr} style={{ textAlign: "center" }}>
                    <strong>{attr.toUpperCase().substring(0, 3)}:</strong>{" "}
                    {personagem.atributosFinais[attr]}
                  </div>
                ))}
              </div>
              <hr
                style={{ borderColor: "var(--border-color)", margin: "20px 0" }}
              />
              <h3>Pontos de Vida e Mana (Nível 1)</h3>
              <p>Pontos de Vida (PV): {personagem.pv}</p>
              <p>Pontos de Mana (PM): {personagem.pm}</p>
              <hr
                style={{ borderColor: "var(--border-color)", margin: "20px 0" }}
              />
              <h3>Perícias Treinadas e Poderes</h3>
              <p>
                <strong>Perícias:</strong>{" "}
                {personagem.pericias.join(", ") || "Nenhuma"}
              </p>
              <p>
                <strong>Poderes:</strong>{" "}
                {personagem.poderes.map((p) => p.nome).join(", ") || "Nenhum"}
              </p>
              <p>
                <strong>Magias:</strong>{" "}
                {personagem.magias.map((m) => m.nome).join(", ") || "Nenhuma"}
              </p>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

export default NovaFichaPage;