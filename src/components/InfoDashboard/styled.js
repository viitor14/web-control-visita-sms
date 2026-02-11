import styled from 'styled-components';

export const DivBoxInfoDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  gap: 10px;
  max-height: 140px;
  min-height: 100px;
  width: fit-content;
  border: 2px solid;
  border-radius: 8px;
  background: ${(props) => props.backgroundcolor};
  border-color: ${(props) => props.bordercolor};
  span {
    color: #001f41;
    font-weight: 700;
    font-size: 30px;
  }
  flex: 1;
  min-width: 200px;
  padding: 10px 6px;
`;
