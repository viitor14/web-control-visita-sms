import PropTypes from 'prop-types';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { format, isToday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  Cards,
  DivClock,
  ClockIcon,
  DivInfoVisita,
  DivNomeCPf,
  DivSetorDestino,
  IconSetor,
  DivStatusVisita,
  DivStatusPendentes,
  DivButtonsRecusarAutorizar,
  ButtonRecusar,
  ButtonAutorizar,
  ButtonFinalizar,
  DivMotivoVisita,
  DivDataEsquecida,
  DivRelogio
} from './styled';

export default function CardVisita({ item }) {
  const cargoUser = useSelector((state) => state.auth.user.cargo);
  const dataObjeto = parseISO(item.data_completa);
  const isVisitaAntiga = !isToday(dataObjeto);
  async function handleChangeStatus(id, novoStatus) {
    try {
      await axios.put(`/visita/${id}`, {
        status: novoStatus
      });

      toast.success(`Visita ${novoStatus.toLowerCase()} com sucesso!`);
    } catch (error) {
      toast.error('Erro ao atualizar status da visita.');
      console.error(error);
    }
  }

  return (
    <Cards key={item.id} className="cards">
      <DivClock className="Relogio">
        {isVisitaAntiga && (
          <DivDataEsquecida>
            <p>⚠️ Data: {format(dataObjeto, 'dd/MM')} (Visita esquecida)</p>
          </DivDataEsquecida>
        )}
        <DivRelogio>
          <ClockIcon />
          <span>{item.hora}</span>
        </DivRelogio>
      </DivClock>
      <DivInfoVisita className="fotoNomeCPF">
        <img src={item.foto} alt={item.nome} />
        <DivNomeCPf>
          <span>{item.nome}</span>
          <span>{item.cpf}</span>
        </DivNomeCPf>
      </DivInfoVisita>

      <DivSetorDestino className="Setor de destino">
        <IconSetor />
        <div>
          <p>Setor</p>
          <span>{item.setor}</span>
        </div>
      </DivSetorDestino>
      <DivMotivoVisita>
        <p>Motivo da visita:</p>
        <span>{item.motivo || 'Sem motivo registrado'}</span>
      </DivMotivoVisita>

      <DivStatusVisita className="Status da visita">
        {/* --- LÓGICA DA RECEPÇÃO --- */}
        {cargoUser === 'RECEPCAO' ? (
          <>
            {item.status === 'AUTORIZADO' ? (
              <ButtonFinalizar onClick={() => handleChangeStatus(item.id, 'FINALIZADO')}>
                Registrar Saída
              </ButtonFinalizar>
            ) : (
              <DivStatusPendentes>
                <p>Aguardando aprovação do setor...</p>
              </DivStatusPendentes>
            )}
          </>
        ) : (
          /* --- LÓGICA DO SETOR / GERENTE --- */
          <>
            {item.status === 'PENDENTE' ? (
              <DivButtonsRecusarAutorizar>
                <ButtonRecusar onClick={() => handleChangeStatus(item.id, 'RECUSADO')}>
                  Recusar
                </ButtonRecusar>

                <ButtonAutorizar onClick={() => handleChangeStatus(item.id, 'AUTORIZADO')}>
                  Autorizar
                </ButtonAutorizar>
              </DivButtonsRecusarAutorizar>
            ) : (
              <DivStatusPendentes>
                <p
                  style={{
                    borderColor: '#2b69ad',
                    background: '#2b69ad',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '6px'
                  }}>
                  Autorizado
                </p>
              </DivStatusPendentes>
            )}
          </>
        )}
      </DivStatusVisita>
    </Cards>
  );
}

CardVisita.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    hora: PropTypes.string,
    foto: PropTypes.string,
    nome: PropTypes.string,
    cpf: PropTypes.string,
    setor: PropTypes.string,
    status: PropTypes.string
  }).isRequired
};
