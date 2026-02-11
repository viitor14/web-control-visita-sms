import { Overlay, Spinner, TextoCarregando } from './styled';

export default function Loading() {
  return (
    <Overlay>
      <Spinner />
      <TextoCarregando>Acessando o sistema...</TextoCarregando>
    </Overlay>
  );
}
