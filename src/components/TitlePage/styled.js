import styled from 'styled-components';
import { SiStagetimer } from 'react-icons/si';

export const DivTitle = styled.div`
  padding: 26px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const DivIconTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const DivInfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  p {
    font-size: 16px;
    font-weight: 700;
    color: #ffc300;
  }

  span {
    color: #929292;
    font-weight: 400;
    font-size: 12px;
  }
`;

export const TimerIcon = styled(SiStagetimer)`
  width: 40px;
  height: 40px;
  color: #2b69ad;
`;
