import styled from 'styled-components';
import { LuClock4 } from 'react-icons/lu';
import { MdPlace } from 'react-icons/md';

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #dedede;
  border-radius: 4px;
  padding: 14px 6px;
  //max-width: 700px;
  width: 100%;
  span {
    color: #686868;
  }
`;

export const DivClock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  span {
    color: #686868;
    font-weight: 700;
  }
  background-color: #dedede;
`;

export const DivRelogio = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 4px;
`;

export const DivDataEsquecida = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border-radius: 4px;
  padding: 4px;
  background-color: #ac0000;
  color: #ffb4b4;
`;

export const ClockIcon = styled(LuClock4)`
  width: 20px;
  height: 20px;
  color: #686868;
`;

export const DivInfoVisita = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  align-items: center;

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;

export const DivNomeCPf = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  span:first-child {
    color: #001f41;
    font-weight: 600;
  }

  span:last-child {
    color: #686868;
  }
`;

export const DivSetorDestino = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;

  div {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const IconSetor = styled(MdPlace)`
  width: 40px;
  height: 40px;
  color: #686868;
`;

export const DivMotivoVisita = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    font-weight: 500;
  }
`;

export const DivStatusVisita = styled.div`
  width: 100%;

  p {
    white-space: nowrap;
  }
`;

export const DivStatusPendentes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  P {
    width: 100%;
    background-color: red;
    border: 2px solid #fdcd30;
    background-color: rgba(255, 195, 0, 0.35);
    border-radius: 10px;
    padding: 10px 0;
    text-align: center;
    font-weight: 500;
  }
`;

export const DivButtonsRecusarAutorizar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ButtonAutorizar = styled.button`
  background-color: rgba(150, 255, 157, 0.35);
  color: #006503;
  border: 2px solid #006503;
  padding: 4px 34px;
  border-radius: 18px;
`;

export const ButtonRecusar = styled.button`
  background-color: #ffb4b4;
  border: 2px solid #ac0000;
  color: #ac0000;
  padding: 4px 34px;
  border-radius: 18px;
`;

export const ButtonFinalizar = styled.button`
  background-color: #2b69ad;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 4px;
  border: 2px solid #2b69ad;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #006503;
    background-color: rgba(150, 255, 157, 1);
    border-color: rgba(150, 255, 157, 1);
  }
`;
