import styled from 'styled-components';

export const DivContainer = styled.div`
  padding: 0 20px;
  height: 100%;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(43, 105, 173, 0.36);
  border-radius: 4px;
  padding: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #001f41;
`;

export const GridTemplate = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.layout || '1fr 1fr 1fr'};
  align-items: center;
  gap: 10px;
`;

export const HeaderRow = styled(GridTemplate)`
  margin-bottom: 15px;
`;

export const HeaderItem = styled.div`
  background-color: #ffffff;
  padding: 8px 0;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:last-child {
    background: transparent;
    border: none;
  }
`;

export const DataRow = styled(GridTemplate)`
  background-color: #dedede;
  padding: 6px 0;
  border-bottom: 2px solid #2b69ad; /* Linha horizontal sutil entre itens */
  margin-bottom: 6px;
  &:last-child {
    border-bottom: none;
  }
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  //padding: 0 10px;
  height: 100%;
  font-weight: 500;
  color: #334e68;
  justify-content: center;

  /* Lógica para as linhas verticais separando colunas */
  border-right: 2px solid #2b69ad;

  &:last-child {
    border-right: none;
    justify-content: center;
  }

  /* Ajuste para a coluna ID */
  &:first-child {
    font-weight: bold;
    justify-content: center;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    //border: 2px solid #fff;
  }

  span {
    font-size: 16px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #004480;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #001f41;
    transform: scale(1.1);
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;

  button {
    background-color: #ffffff;
    border: none;
    border-radius: 6px;
    color: #2b69ad;
    cursor: pointer;
    font-weight: 400;
    padding: 8px 12px;
    font-weight: 700;

    &:disabled {
      background-color: #c0c0c0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      color: #001f41;
    }

    &:hover:not(.active) {
      cursor: pointer;
    }
  }
`;

export const InfoPage = styled.span`
  font-size: 12px;
  margin: 0 10px;
  font-weight: bold;
`;
