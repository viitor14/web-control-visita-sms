import styled from 'styled-components';

export const SectionLogin = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  gap: 20px;
  max-width: 30%;
  background-color: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const DivLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const DivH1 = styled.div`
  display: flex;
  background-color: #fdcd30;
  border-radius: 4px;
  white-space: nowrap; //Colocar media queries

  h1 {
    padding: 2px 8px;
    text-align: center;
    font-size: 18px;
    color: #2b69ad;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  button {
    margin: auto;
    margin-top: 40px;
    width: 60%;
  }
`;

export const DivLabelInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  label {
    font-size: 14px;
  }
`;

export const DivInput = styled.div`
  border-radius: 6px;
  padding: 6px 20px;
  background-color: #d4d4d4;

  input {
    height: 26px;
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 16px;
    outline: none;
    color: #939393;
  }
`;
