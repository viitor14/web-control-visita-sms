import {
  AsideDashboard,
  DivIconNavAside,
  DivItensNavsAside,
  DashboardIcon,
  PlaceIcon,
  PeopleIcon,
  DivButtonDesconectar,
  LogOutIcon,
  Olas
} from './styled';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

export default function MenuAside() {
  const dispatch = useDispatch();

  function handleLogout(e) {
    e.preventDefault();
    dispatch(actions.loginLogout());
  }

  return (
    <Olas>
      <AsideDashboard>
        <DivItensNavsAside>
          <DivIconNavAside to="/dashboard">
            <DashboardIcon />
            <span>Dashboard</span>
          </DivIconNavAside>
          <DivIconNavAside to="/visitas">
            <PlaceIcon />
            <span>Visitas</span>
          </DivIconNavAside>
          {/**
          <DivIconNavAside to="/usuarios">
            <PeopleIcon />
            <span>Usuarios</span>
          </DivIconNavAside>
           */}
        </DivItensNavsAside>

        <DivButtonDesconectar onClick={handleLogout}>
          <LogOutIcon />
          <p>Desconectar</p>
        </DivButtonDesconectar>
      </AsideDashboard>
    </Olas>
  );
}
