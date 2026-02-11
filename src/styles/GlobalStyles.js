import { styled, createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
  :root{
    --toastify-icon-color-success: white;
    --toastify-icon-color-error: white;
  }

  * {
    margin:0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body{
    font-family: 'Quicksand', sans-serif;
    background-color: #F9F9F9;
    color: #001F41;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root{
    height: 100%;
  }


  button {
    cursor: pointer;
    background: #FDCD30;
    border: none;
    color: #2B69AD;
    padding: 10px 20px;
    border-radius: 10px ;
    font-weight: 700;
    font-family: 'Quicksand', sans-serif;
  }

  a{
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  //Mudar css do Toastify
  body .Toastify .Toastify__toast-container .Toastify__toast--success{
    background: ${colors.succesColor};
    color: #fff;
  }

  .Toastify__progress-bar--success {
  background: white;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error{
    background: ${colors.errorColor};
  }

  .Toastify__progress-bar--error {
    background: white;
  }
`;

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
`;

export const MainDashboard = styled.main`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 60px);
`;

export const SectionMain = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;
`;
