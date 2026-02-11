import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav, DivUser, Tittle } from './styled';
import { RxAvatar } from 'react-icons/rx';
import Logo from '/assets/image/brasao-ipojuca.png';
export default function Header() {
  const usuario = useSelector((state) => state.auth.user);

  return (
    <Nav>
      <img src={Logo} alt="" width="100px" />
      <Tittle>CONTROLE DE VISITA</Tittle>
      <DivUser>
        <RxAvatar size={60} />
        <div>
          <p>{usuario?.nome}</p>
          <span>{usuario?.cargo}</span>
        </div>
      </DivUser>
    </Nav>
  );
}
