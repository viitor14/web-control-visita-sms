import { call, put, all, takeLatest } from 'redux-saga/effects';
//call - chama função assicrona
//put - disparar uma action
//all - Permite colocar mais de uma action
//takeLatest - Caso o usúario clique varias vezes no botão, só vai pegar o ultimo click

import { get } from 'lodash';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import history from '../../../services/history';
import * as actions from './actions';
import * as types from '../types';

const requisicao = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* loginRequest({ payload }) {
  try {
    yield call(requisicao);
    const response = yield call(axios.post, '/tokens', payload);
    const { token, user } = response.data;

    yield put(actions.loginSuccess({ token, user }));
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    toast.success('Login realizado com sucesso!');

    history.push('/dashboard');
  } catch (e) {
    // MELHORIA 2: Tratamento de erro mais robusto
    const status = get(e, 'response.status', 0);
    const backendErrors = get(e, 'response.data.errors', []);
    const backendMessage = get(e, 'response.data.error', 'Usuário ou senha inválidos');

    if (status === 0 || e.code === 'ERR_NETWORK') {
      console.log(e);
      toast.error('Erro de conexão. Verifique sua internet ou tente mais tarde.', {
        autoClose: 5000
      });
    } else if (status === 401) {
      toast.error(backendMessage);
    } else {
      // MELHORIA 3: Mostrar erro específico se o backend mandar
      // Se o backend mandou uma lista de erros (ex: validação), mostre o primeiro
      if (backendErrors.length > 0) {
        toast.error(backendErrors[0]);
      } else {
        toast.error('Erro desconhecido ao realizar login');
      }
    }
    yield put(actions.loginFailure());
  }
}

function fazerLogout() {
  history.push('/');
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.LOGIN_LOGOUT, fazerLogout),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)
]);
