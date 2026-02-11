import { Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import MyRoute from './MyRoute';
import Login from '../pages/Login/Index';
import Dashboard from '../pages/Dashboard/Index';
import Visitas from '../pages/Visitas/Index';
import Usuarios from '../pages/Usuarios/Index';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute exact path="/dashboard" component={Dashboard} isClosed />
      <MyRoute exact path="/visitas" component={Visitas} isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
