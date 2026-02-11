import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { SectionLogin, DivLogo, DivH1, Form, DivLabelInput, DivInput } from './styled';
import Loading from '../../components/Loading/Index';
import logo from '/assets/image/brasao-ipojuca.png';

import * as actions from '../../store/modules/auth/actions';

export default function Login() {
  const dispatch = useDispatch();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.auth.isLoading);
  function handleSubmitForm(e) {
    e.preventDefault();
    let formErrors = false;

    if (!cpf.trim() || !password.trim()) {
      toast.error('Digite CPF e senha');
      formErrors = true;
      return;
    }

    if (!formErrors) {
      dispatch(actions.loginRequest({ cpf, password }));
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Container>
        <SectionLogin>
          <DivLogo>
            <img src={logo} alt="" width="140px" />
            <DivH1>
              <h1>Sistema de Controle de Visitas</h1>
            </DivH1>
          </DivLogo>
          <Form onSubmit={handleSubmitForm}>
            <DivLabelInput>
              <label htmlFor="">CPF</label>
              <DivInput>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </DivInput>
            </DivLabelInput>
            <DivLabelInput>
              <label htmlFor="">Senha</label>
              <DivInput>
                <input
                  type="password"
                  placeholder="***********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </DivInput>
            </DivLabelInput>
            <button type="submit">Login</button>
          </Form>
        </SectionLogin>
      </Container>
    </>
  );
}
