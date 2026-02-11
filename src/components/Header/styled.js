import styled from 'styled-components';
import { primaryColor } from '../../config/colors';
export const Nav = styled.nav`
  //position: fixed;
  background-color: #ffc812;
  padding: 4px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 90px;
`;

export const Tittle = styled.p`
  font-family: 'Figtree', sans-serif;
  letter-spacing: 20px;
  color: #2b69ad;
  font-size: 20px;
  font-weight: 700;
`;

export const DivUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;

  p {
    font-size: 18px;
    text-transform: capitalize;
  }

  span {
    color: #838383;
    font-size: 12px;
    text-transform: lowercase;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;
