import styled, { keyframes } from 'styled-components';

// Animação de rotação
const girar = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// O Fundo Escuro que cobre a tela toda
export const Overlay = styled.div`
  position: fixed; /* Fixa na tela, independente do scroll */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7); /* Fundo branco semi-transparente */
  backdrop-filter: blur(5px); /* Efeito de desfoque no fundo (moderno) */
  z-index: 9999; /* Garante que fique acima de TUDO */

  display: flex;
  flex-direction: column; /* Para o texto ficar embaixo do spinner */
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3; /* Cor cinza claro de fundo do aro */
  border-top: 5px solid #2b69ad; /* Cor Azul principal girando */
  border-radius: 50%;
  animation: ${girar} 1s linear infinite;
  margin-bottom: 20px;
`;

export const TextoCarregando = styled.p`
  color: #2b69ad;
  font-weight: bold;
  font-size: 18px;
  font-family: sans-serif;
`;
