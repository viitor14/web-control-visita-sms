import styled from 'styled-components';

export const SectionMain = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const DivCards = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
  padding: 0px 20px;
`;

export const DivCardsVisitas = styled.div`
  padding: 6px 20px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

export const CardsVisitas = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(43, 105, 173, 0.36);
  //display: grid;
  //grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  padding: 6px 12px;
  border-radius: 4px;
`;

export const DivVisitas = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 60px;

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
