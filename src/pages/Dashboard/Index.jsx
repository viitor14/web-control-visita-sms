import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import socketio from 'socket.io-client';
import { toast } from 'react-toastify';

import Header from '../../components/Header/Index';
import InfoDashboard from '../../components/InfoDashboard/Index';
import TabelaVisitas from '../../components/Table/Index';
import MenuAside from '../../components/MenuBar/Index';
import ModalNovaVisita from '../../components/ModalNovaVisita/Index';
import ModalVerVisita from '../../components/ModalVerVisita/Index';
import Loading from '../../components/Loading/Index';
import notificationSound from '../../assets/sounds/alert.mp3';

import axios from '../../services/axios';

import { FiEye } from 'react-icons/fi';

import {
  SectionMain,
  DivMain,
  DivFilter,
  DivFilterAndButtonVisit,
  CalendarIcon,
  DivFilterDate,
  DivSelectStatus,
  Select,
  Option,
  FilterIcon,
  DivButtonRegisterVisit,
  DivCards,
  DivNomeFoto,
  ButtonAction,
  StatusBadge,
  Teste
} from './styled';

import { MainDashboard } from '../../styles/GlobalStyles';

const formatarVisita = (item) => {
  return {
    id: item.id,
    foto:
      item.foto_url ||
      `https://ui-avatars.com/api/?name=${item.visitante?.nome || 'Visitante'}&background=2B69AD&size=150&color=FDCD30&bold=true`,
    nome: item.visitante?.nome,
    cpf: item.visitante?.cpf,
    telefone: item.visitante?.telefone,
    setor: item.setor?.nome || 'Sem setor',
    motivo: item.obs,
    status: item.status,
    created_at: item.created_at
  };
};

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const audioAlert = useMemo(() => new Audio(notificationSound), []);
  const [visitas, setVisitas] = useState([]);
  const [filtroData, setFiltroData] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVerVisita, setModalVerVisita] = useState(false);
  const [visitaSelecionada, setVisitaSelecionada] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    pendente: 0,
    autorizado: 0,
    finalizado: 0,
    recusado: 0
  });

  const LAYOUT_GRID = '0.6fr 2.2fr 1.5fr 2fr 1.2fr 0.5fr';

  function handleAbrirModalVisita(visita) {
    setVisitaSelecionada(visita);
    setModalVerVisita(true);
  }

  const colunasConfig = [
    {
      titulo: 'ID',
      campo: 'id',
      render: (item) => `Nº ${item.id}` // Exemplo: Formatando texto
    },

    {
      titulo: 'Visitante',
      campo: 'nome',
      // Render customizado para Foto + Nome
      render: (item) => (
        <DivNomeFoto>
          <img src={item.foto} alt={item.nome} />
          <span>{item.nome}</span>
        </DivNomeFoto>
      )
    },

    {
      titulo: 'Setor',
      campo: 'setor'
    },

    {
      titulo: 'Motivo',
      campo: 'motivo'
    },

    {
      titulo: 'Status',
      campo: 'status',
      render: (item) => <StatusBadge status={item.status}>{item.status}</StatusBadge>
    },

    {
      titulo: '',
      campo: 'acoes',
      render: (item) => (
        <ButtonAction onClick={() => handleAbrirModalVisita(item)}>
          <FiEye />
        </ButtonAction>
      )
    }
  ];

  const fetchData = useCallback(async () => {
    if (!token) return;

    const params = {
      page: page
    };

    if (filtroData) {
      params.data = filtroData;
    }

    if (filtroStatus && filtroStatus !== 'todos') {
      params.status = filtroStatus;
    }

    try {
      setLoading(true);
      const response = await axios.get('/visita', {
        headers: { Authorization: `Bearer ${token}` },
        params: params
      });

      const dadosTratados = response.data.lista.map(formatarVisita);
      setVisitas(dadosTratados);
      setStats(response.data.estatisticas);

      const totalRegistros = response.headers['x-total-count'] || 0;

      // IMPORTANTE: Esse número 20 deve ser IGUAL ao 'limit' do seu Backend
      const limitePorPagina = 8;
      setTotalPages(Math.ceil(totalRegistros / limitePorPagina));
    } catch (error) {
      console.error('Erro ao buscar visitas:', error);
    } finally {
      setLoading(false);
    }
  }, [token, filtroData, filtroStatus, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const socket = socketio('http://192.168.60.181:3000');
    socket.on('nova_visita', (novaVisitaBruta) => {
      const novaVisitaFormatada = formatarVisita(novaVisitaBruta);

      if (
        novaVisitaBruta.setor_id !== Number(user.setor_id) &&
        user.cargo !== 'MASTER' &&
        user.cargo !== 'RECEPCAO'
      ) {
        return;
      }
      setVisitas((listaAtual) => [novaVisitaFormatada, ...listaAtual]);
      setStats((prev) => ({ ...prev, total: prev.total + 1, pendente: prev.pendente + 1 }));

      const isParaMeuSetor = Number(novaVisitaBruta.setor_id) === Number(user.setor_id);
      const isAdmin = user.cargo === 'ADMIN' || user.cargo === 'RECEPCAO';
      console.log(isParaMeuSetor, isAdmin);

      if (isParaMeuSetor || isAdmin) {
        audioAlert.play().catch((error) => {
          // Navegadores bloqueiam som se o usuário não interagiu com a página ainda.
          console.warn('O navegador bloqueou o som automático:', error);
        });
        if (Notification.permission === 'granted') {
          new Notification('Nova Visita!', {
            body: `Visitante: ${novaVisitaFormatada.nome} chegou.`,
            icon: '/assets/image/brasao-ipojuca.png' // Caminho da logo na pasta public
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission();
        }

        // 2. Mostra um Toast visual (Notificação na tela)
        toast.info(`Nova visita para: ${novaVisitaFormatada.setor}!`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored' // Fica azulzinho chamativo
        });
      }
    });

    socket.on('update_visita', (visitaAtualizadaBruta) => {
      const isParaMeuSetor = Number(visitaAtualizadaBruta.setor_id) === Number(user.setor_id);
      const isAdmin = user.cargo === 'ADMIN' || user.cargo === 'RECEPCAO';

      if (!isParaMeuSetor && !isAdmin) {
        return; // Ignora se não for pra mim
      }

      const visitaAtualizada = formatarVisita(visitaAtualizadaBruta);

      setVisitas((listaAtual) => {
        const itemAntigo = listaAtual.find((item) => item.id === visitaAtualizada.id);

        if (!itemAntigo) return listaAtual;
        return listaAtual.map((item) =>
          item.id === visitaAtualizada.id ? visitaAtualizada : item
        );
      });
      setStats((prevStats) => {
        const novoStatus = visitaAtualizada.status; // ex: 'AUTORIZADO'
        if (novoStatus !== 'PENDENTE') {
          return {
            ...prevStats,
            pendente: Math.max(0, prevStats.pendente - 1), // Tira 1 do pendente
            [novoStatus.toLowerCase()]: (prevStats[novoStatus.toLowerCase()] || 0) + 1
          };
        }

        return prevStats;
      });

      audioAlert.play().catch(console.warn);
      toast.info(`🔄 Status atualizado: ${visitaAtualizada.nome} -> ${visitaAtualizada.status}`, {
        theme: 'colored',
        autoClose: 4000
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [user, audioAlert]);

  return (
    <>
      {loading && <Loading />}
      <Header></Header>
      <MainDashboard>
        <MenuAside />
        <SectionMain>
          {/* Cards de filtro do dashboard */}

          {modalOpen && <ModalNovaVisita onClose={() => setModalOpen(false)} />}
          {modalVerVisita && (
            <ModalVerVisita
              dadosVisita={visitaSelecionada}
              onClose={() => setModalVerVisita(false)}
            />
          )}

          {/* Cards de informações do dashboard */}

          <DivCards>
            <InfoDashboard
              backgroundColor="#FDCD30"
              borderColor="#2B69AD"
              title="Total de Visitas"
              value={stats.total}
            />
            <InfoDashboard
              backgroundColor="rgba(255, 193, 0, 0.2)"
              borderColor="#FFC300"
              title="Pendentes"
              value={stats.pendente}
            />
            <InfoDashboard
              backgroundColor="rgba(43,105,173,0.35)"
              borderColor="#2B69AD"
              title="Autorizados"
              value={stats.autorizado}
            />
            <InfoDashboard
              backgroundColor="rgba(150,255,157,0.3)"
              borderColor="#96FF9D"
              title="Finalizados"
              value={stats.finalizado}
            />
          </DivCards>

          <DivMain>
            <DivFilterAndButtonVisit>
              <p>Filtrar por data:</p>
              <div>
                <DivFilter>
                  <DivFilterDate>
                    <CalendarIcon />
                    <input
                      type="date"
                      value={filtroData}
                      onChange={(e) => {
                        setFiltroData(e.target.value);
                        setPage(1);
                      }}
                    />
                  </DivFilterDate>

                  <DivSelectStatus>
                    <FilterIcon />
                    <Select
                      name="status"
                      value={filtroStatus}
                      onChange={(e) => {
                        setFiltroStatus(e.target.value);
                        setPage(1);
                      }}>
                      <Option value="todos">Todos</Option>
                      <Option value="PENDENTE">Pendentes</Option>
                      <Option value="AUTORIZADO">Autorizados</Option>
                      <Option value="RECUSADO">Recusado</Option>
                    </Select>
                  </DivSelectStatus>
                </DivFilter>
              </div>
            </DivFilterAndButtonVisit>
            {user.cargo === 'MASTER' || user.cargo === 'RECEPCAO' ? (
              <DivButtonRegisterVisit>
                <button onClick={() => setModalOpen(true)}>Registrar visita</button>
              </DivButtonRegisterVisit>
            ) : null}
          </DivMain>

          {/* Tabela de visitas */}

          <TabelaVisitas
            layoutGrid={LAYOUT_GRID}
            colunas={colunasConfig}
            dados={visitas}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </SectionMain>
      </MainDashboard>
    </>
  );
}
