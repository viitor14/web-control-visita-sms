import styled from 'styled-components';

import { IoCalendarOutline } from 'react-icons/io5';
import { LuFilter } from 'react-icons/lu';

export const Teste = styled.div`
  display: flex;
`;

export const SectionMain = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  padding: 26px 0px 10px 0px;
`;

export const DivMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const DivFilterAndButtonVisit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

export const DivFilter = styled.div`
  display: flex;
  gap: 30px;
`;

export const CalendarIcon = styled(IoCalendarOutline)`
  width: 20px;
  height: 20px;
  color: #2b69ad;
`;

export const DivFilterDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  input {
    background: #eaeaea;
    border: none;
    padding: 8px;
    border-radius: 6px;
    color: #001f41;
  }
`;

export const DivSelectStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Select = styled.select`
  background: #eaeaea;
  border: none;
  padding: 8px;
  border-radius: 6px;
  color: #001f41;
`;

export const Option = styled.option`
  border-radius: 4px;
  padding: 4px;
`;

export const FilterIcon = styled(LuFilter)`
  width: 20px;
  height: 20px;
  color: #2b69ad;
`;

export const DivButtonRegisterVisit = styled.div`
  display: flex;
  background-color: #2b69ad;
  border-radius: 4px;
  align-items: center;
  padding: 8px;
  button {
    background-color: transparent;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
  }
`;

export const DivCards = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 20px;
`;

export const DivNomeFoto = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  span {
    text-transform: capitalize;
  }
`;

export const ButtonAction = styled.button`
  background-color: transparent;
`;

const CORES_STATUS = {
  // Use as strings exatas que vêm do banco/API (maiúsculo ou minúsculo)
  FINALIZADO: { bg: '#96FF9D', color: '#006503' }, // Azul
  PENDENTE: { bg: '#F5F5F5', color: '#000000' }, // Amarelo
  RECUSADO: { bg: '#FFB4B4', color: '#AC0000' }, // Vermelho

  AUTORIZADO: { bg: '#8FC5FF', color: '#001F41' }, // Verde
  default: { bg: '#E2E3E5', color: '#383D41' } // Cinza padrão
};

export const StatusBadge = styled.div`
  padding: 6px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  width: fit-content;
  text-transform: capitalize;
  background-color: ${(props) => (CORES_STATUS[props.status] || CORES_STATUS.default).bg};
  color: ${(props) => (CORES_STATUS[props.status] || CORES_STATUS.default).color};
`;
