import Header from '../../components/Header/Index';
import MenuAside from '../../components/MenuBar/Index';
import InfoDashboard from '../../components/InfoDashboard/Index';
import TitlePage from '../../components/TitlePage/Index';
import TabelaVisitas from '../../components/Table/Index';

import { FiEye } from 'react-icons/fi';

import { DivCards, DivNomeFoto, ButtonAction } from './styled';
import { MainDashboard, SectionMain } from '../../styles/GlobalStyles';

export default function Usuarios() {
  const LAYOUT_GRID = '2.5fr 2.5fr 1.5fr 2fr 0.6fr ';

  const colunasConfig = [
    /*
      {
        titulo: 'ID',
        campo: 'id',
        render: (item) => `Nº ${item.id}` // Exemplo: Formatando texto
      },
      */
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
      titulo: 'E-mail',
      campo: 'email'
    },
    {
      titulo: 'CPF',
      campo: 'cpf'
    },
    {
      titulo: 'Setor/Visitante',
      campo: 'setor'
    },
    {
      titulo: '', // Coluna sem título (Botão)
      campo: 'acoes',
      render: (item) => (
        <ButtonAction onClick={() => alert(`Ver visita ${item.id}`)}>
          <FiEye />
        </ButtonAction>
      )
    }
  ];

  const visitasDaApi = [
    {
      id: 1,
      nome: 'Maria',
      cpf: '123.456.789-00',
      foto: 'https://i.pravatar.cc/150?img=10',
      email: 'maria@gmail.com',
      setor: 'Visitante'
    }
  ];
  return (
    <>
      <Header />
      <MainDashboard>
        <MenuAside />
        <SectionMain>
          <TitlePage
            title="Gerenciamento de usuários"
            description="Gerencie os usuários do sistema e suas permissões."
          />

          {/* Cards de informações de usuarios */}

          <DivCards>
            <InfoDashboard
              backgroundColor="rgba(222,222,222,0.35)"
              borderColor="#2B69AD"
              title="Todos Usuários"
              value={8}
            />
            <InfoDashboard
              backgroundColor="rgba(222,222,222,0.35)"
              borderColor="#2B69AD"
              title="Servidores"
              value={8}
            />
            <InfoDashboard
              backgroundColor="rgba(222,222,222,0.35)"
              borderColor="#2B69AD"
              title="Visitantes"
              value={8}
            />
          </DivCards>

          {/* Cards de informações de usuarios */}

          <TabelaVisitas layoutGrid={LAYOUT_GRID} colunas={colunasConfig} dados={visitasDaApi} />
        </SectionMain>
      </MainDashboard>
    </>
  );
}
