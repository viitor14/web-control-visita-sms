import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format, isToday, parseISO } from 'date-fns';
import socketio from 'socket.io-client';
import { toast } from 'react-toastify';

import MenuAside from '../../components/MenuBar/Index';
import Header from '../../components/Header/Index';
import InfoDashboard from '../../components/InfoDashboard/Index';
import CardVisita from '../../components/CardVisita/Index';
import TitlePage from '../../components/TitlePage/Index';
import notificationSound from '../../assets/sounds/ttsmaker-file-2026-2-10-12-37-12.mp3';

import axios from '../../services/axios';

import {
  SectionMain,
  DivCards,
  DivCardsVisitas,
  CardsVisitas,
  Pagination,
  DivVisitas,
  InfoPage
} from './styled';

import { MainDashboard } from '../../styles/GlobalStyles';

const formatarGeral = (item) => ({
  id: item.id,
  setor: item.setor?.nome,
  status: item.status,
  created_at: item.created_at
});

const formatarPendentes = (item) => ({
  id: item.id,
  foto: item.foto_url || `https://www.gravatar.com/avatar/?d=mp`,
  nome: item.visitante?.nome,
  cpf: item.visitante?.cpf,
  setor: item.setor?.nome,
  motivo: item.obs,
  status: item.status,
  hora: item.data_entrada
    ? new Date(item.data_entrada).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '--:--',
  data_completa: item.data_entrada || item.created_at
});
const baseURL = import.meta.env.VITE_SOCKET_URL;
export default function Visitas() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const audioAlert = useMemo(() => new Audio(notificationSound), []);
  const containerRef = useRef(null);
  const [visitas, setVisitas] = useState([]);
  const [visitasPendentes, setVisitasPendentes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [limiteDinamico, setLimiteDinamico] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    pendente: 0,
    autorizado: 0,
    finalizado: 0,
    recusado: 0
  });

  /*
  const calcularItensPorPagina = useCallback(() => {
    if (containerRef.current) {
      const larguraTotal = containerRef.current.offsetWidth;
      const larguraCard = 250; // Largura do Card (240px) + Gap (20px) estimado

      const qtdQueCabe = Math.floor(larguraTotal / larguraCard);

      const novoLimite = qtdQueCabe > 0 ? qtdQueCabe : 1;
      setLimiteDinamico(novoLimite);
      if (larguraTotal > 2501) {
        setLimiteDinamico(6);
      }
    }
  }, []);
  */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Pegamos a largura exata da DIV (descontando padding se usar contentRect)
        // entry.contentRect.width é a largura do conteúdo interno
        const larguraDisponivel = entry.contentRect.width;

        // CONFIGURAÇÃO DO SEU CARD
        const larguraCard = 250; // Tamanho fixo do card (ex: min-width)
        const gap = 20; // O gap que você definiu no CSS Grid/Flex

        // CÁLCULO MAIS SEGURO
        // Somamos o gap na largura do card para a divisão ser realista
        // Ex: Cada card "ocupa" na verdade 270px (250 dele + 20 de espaço)
        const cardReal = larguraCard + gap;

        // Adicionamos um 'gap' extra na largura disponível para compensar o último item
        // Matemática: (LarguraDiv + Gap) / (LarguraCard + Gap)
        const qtdPorLinha = Math.floor((larguraDisponivel + gap) / cardReal);

        // Garante pelo menos 1 item e define um máximo se quiser
        let novoLimite = qtdPorLinha > 0 ? qtdPorLinha : 1;

        // Opcional: Se sua tela for gigante, trava em 6
        if (novoLimite > 6) novoLimite = 6;

        // Só atualiza o estado se o valor mudou (para evitar re-render infinito)
        setLimiteDinamico((prevLimit) => {
          if (prevLimit !== novoLimite) {
            return novoLimite;
          }
          return prevLimit;
        });
      }
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get('/visita', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVisitas(response.data.lista.map(formatarGeral));
      setStats(response.data.estatisticas);
    } catch (error) {
      console.error('Erro ao buscar visitas:', error);
    }
  }, [token]);

  const loadVisitasPendentesHoje = useCallback(async () => {
    try {
      const response = await axios.get('/visita', {
        params: {
          status: 'PENDENTE,AUTORIZADO',
          //data: dataHoje,
          page: page,
          limit: limiteDinamico
        }
      });

      setVisitasPendentes(response.data.lista.map(formatarPendentes));
      const totalRegistros = response.headers['x-total-count'] || 0;
      const totalNumerico = parseInt(totalRegistros, 10);
      setTotalRegistros(totalNumerico);
    } catch (error) {
      console.error('Erro pendentes:', error);
    }
  }, [page, limiteDinamico]);

  useEffect(() => {
    if (limiteDinamico > 0) {
      const novasPaginas = Math.ceil(totalRegistros / limiteDinamico);
      setTotalPages(novasPaginas);
    }
  }, [totalRegistros, limiteDinamico]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (limiteDinamico > 0) {
      loadVisitasPendentesHoje();
    }
  }, [loadVisitasPendentesHoje, limiteDinamico]);

  useEffect(() => {
    const socket = socketio(baseURL);

    socket.on('nova_visita', (dadoBruto) => {
      const itemGeral = formatarGeral(dadoBruto);
      setVisitas((old) => [itemGeral, ...old]);
      const isPendente = dadoBruto.status === 'PENDENTE';
      const isDeHoje = isToday(parseISO(dadoBruto.created_at || dadoBruto.data_entrada));
      setStats((prev) => ({ ...prev, total: prev.total + 1, pendente: prev.pendente + 1 }));
      if (isPendente && isDeHoje) {
        const itemPendente = formatarPendentes(dadoBruto);
        setTotalRegistros((prevTotal) => prevTotal + 1);
        if (page === 1) {
          setVisitasPendentes((old) => {
            const novaLista = [itemPendente, ...old];
            if (novaLista.length > limiteDinamico) {
              return novaLista.slice(0, limiteDinamico);
            }
            return novaLista;
          });
        }
      }

      const isParaMeuSetor = Number(dadoBruto.setor_id) === Number(user.setor_id);
      const isAdmin = user.cargo === 'ADMIN' || user.cargo === 'RECEPCAO';
      if (isParaMeuSetor || isAdmin) {
        audioAlert.play().catch((error) => {
          // Navegadores bloqueiam som se o usuário não interagiu com a página ainda.
          console.warn('O navegador bloqueou o som automático:', error);
        });
        if (Notification.permission === 'granted') {
          new Notification('Nova Visita!', {
            body: `Visitante: ${itemGeral.nome} chegou.`,
            icon: '/icone-do-sistema.png' // Caminho da logo na pasta public
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission();
        }
        toast.info(`🔔 Nova visita para: ${itemGeral.setor}!`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        });
      }
    });

    socket.on('update_visita', (dadoBruto) => {
      const statusNovoUpper = dadoBruto.status;
      const keyNova = statusNovoUpper.toLowerCase();

      setVisitas((listaAtual) => {
        const itemAntigo = listaAtual.find((v) => v.id === dadoBruto.id);

        if (itemAntigo && itemAntigo.status !== statusNovoUpper) {
          const statusVelhoUpper = itemAntigo.status;
          const keyVelha = statusVelhoUpper.toLowerCase();

          setStats((prevStats) => {
            const statsAtualizados = { ...prevStats };

            if (statsAtualizados[keyVelha] > 0) {
              statsAtualizados[keyVelha] -= 1;
            }

            if (statsAtualizados[keyNova] !== undefined) {
              statsAtualizados[keyNova] += 1;
            }
            return statsAtualizados;
          });
        }
        return listaAtual.map((item) =>
          item.id === dadoBruto.id ? { ...item, ...formatarGeral(dadoBruto) } : item
        );
      });

      setVisitasPendentes((listaAtual) => {
        if (statusNovoUpper === 'FINALIZADO' || statusNovoUpper === 'RECUSADO') {
          return listaAtual.filter((item) => item.id !== dadoBruto.id);
        }
        return listaAtual.map((item) =>
          item.id === dadoBruto.id ? { ...item, status: statusNovoUpper } : item
        );
      });
    });

    return () => socket.disconnect();
  }, [limiteDinamico, page]);

  useEffect(() => {
    if (visitasPendentes.length === 0 && page > 1) {
      setPage((paginaAtual) => paginaAtual - 1);
    }
  }, [visitasPendentes, page]);

  return (
    <>
      <Header />
      <MainDashboard>
        <MenuAside />
        <SectionMain>
          <TitlePage
            title="Aprovações pendentes"
            description="Analisar e aprovar solicitações de acesso de visitantes"
          />

          {/* Cards de informações do dashboard */}

          <DivCards>
            <InfoDashboard
              backgroundColor="rgba(255,195,0,0.35)"
              borderColor="#FDCD30"
              title="Pendentes"
              value={stats.pendente}
            />
            <InfoDashboard
              backgroundColor="rgba(43, 105, 173, 0.35)"
              borderColor="#2B69AD"
              title="Autorizadas"
              value={stats.autorizado}
            />
            <InfoDashboard
              backgroundColor="rgba(150, 255, 157, 0.35)"
              borderColor="#96FF9D"
              title="Finalizadas"
              value={stats.finalizado}
            />
          </DivCards>

          {/* CARDS DE VISITAS PARA APROVAÇÃO */}

          <DivCardsVisitas>
            <CardsVisitas>
              <DivVisitas ref={containerRef}>
                {visitasPendentes.map((visitante) => (
                  <CardVisita key={visitante.id} item={visitante} />
                ))}
              </DivVisitas>
              {totalPages > 0 && (
                <Pagination>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    style={{
                      opacity: page === 1 ? 0.5 : 1,
                      cursor: page === 1 ? 'not-allowed' : 'pointer'
                    }}>
                    Anterior
                  </button>

                  <InfoPage>
                    {page} de {totalPages}
                  </InfoPage>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    style={{
                      opacity: page >= totalPages ? 0.5 : 1,
                      cursor: page >= totalPages ? 'not-allowed' : 'pointer'
                    }}>
                    Próximo
                  </button>
                </Pagination>
              )}
            </CardsVisitas>
          </DivCardsVisitas>
        </SectionMain>
      </MainDashboard>
    </>
  );
}
