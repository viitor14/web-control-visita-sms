import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); // Fundo escuro transparente
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    button {
      padding: 10px;
      margin-top: 10px;
      background: '#FDCD30';
      color: '#2B69AD';
      border: 'none';
      cursor: 'pointer';
      border-radius: 4px;
      font-size: 14px;
    }
  }
`;

export const DivHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  align-items: center;

  h2 {
    color: #000000;
  }
`;

export const IconCLoseModal = styled(IoIosClose)`
  cursor: pointer;
  font-size: 40px;
  color: #686868;
`;

export const DivLabelInput = styled.div`
  p {
    color: #000;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  select,
  input {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: none;
    background-color: rgba(212, 212, 212, 0.25);
    font-family: 'QuickSand', sans-serif;
  }

  textarea {
    width: 100%;
    min-height: 100px;
    padding: 12px;
    border-radius: 6px;
    border: none;
    background-color: rgba(212, 212, 212, 0.25);
    font-family: 'QuickSand', sans-serif;
  }

  option {
    color: #333;
    background-color: white;
    font-family: 'QuickSand', sans-serif;
    border: none !important;

    /* Exemplo: Deixar a primeira opção cinza */
    &:disabled {
      color: #999;
    }
  }
`;
