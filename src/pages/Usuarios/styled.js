import styled from 'styled-components';

export const DivCards = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
  padding: 0px 20px;
`;

export const DivNomeFoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const ButtonAction = styled.button`
  background-color: transparent;
`;
