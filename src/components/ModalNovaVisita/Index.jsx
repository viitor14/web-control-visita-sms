import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../services/axios';

import { Overlay, Content, DivHeader, IconCLoseModal, DivLabelInput } from './styled';

export default function ModalNovaVisita({ onClose }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [visitanteId, setVisitanteId] = useState(null);
  const [loadingCpf, setLoadingCpf] = useState(false);
  const [setorId, setSetorId] = useState('');
  const [motivo, setMotivo] = useState('');
  const [setores, setSetores] = useState([]);

  async function handleBuscarSetor() {
    try {
      const response = await axios.get('/setor');
      // Aqui você pode armazenar os setores no estado, se necessário
      setSetores(response.data);
    } catch (error) {
      toast.error('Erro ao buscar setores');
    }
  }

  async function handleBuscarCpf() {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return;
    setLoadingCpf(true);
    try {
      const response = await axios.post('/visitante/buscar', {
        cpf: cpfLimpo
      });

      const visitante = response.data;

      setNome(visitante.nome);
      setTelefone(visitante.telefone);
      setVisitanteId(visitante.id);
      toast.success('Visitante encontrado!');
    } catch (error) {
      setVisitanteId(null);
      setNome('');
      setTelefone('');
      toast.info('Visitante não cadastrado. Preencha informação do visitante.');
    } finally {
      setLoadingCpf(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let idFinal = visitanteId;

      if (!idFinal) {
        if (cpf.length !== 11) {
          toast.error('O CPF deve ter 11 dígitos.');
          return;
        }

        const responseVisitante = await axios.post('/visitante', {
          nome,
          cpf: cpf.replace(/\D/g, ''),
          telefone: telefone.replace(/\D/g, '')
          // Adicione telefone ou foto aqui se tiver no form
        });
        idFinal = responseVisitante.data.id;
      }

      await axios.post('/visita', {
        visitante_id: idFinal,
        setor_id: setorId,
        obs: motivo
      });

      toast.success('Entrada registrada com sucesso!');
      onClose();
    } catch (error) {
      const errorEspecifico = error.response.data.error;
      toast.error(errorEspecifico);
    }
  }

  return (
    <Overlay>
      <Content>
        <DivHeader>
          <h2>Nova Visita</h2>
          <IconCLoseModal onClick={onClose} />
        </DivHeader>

        <form onSubmit={handleSubmit}>
          <DivLabelInput style={{ position: 'relative' }}>
            <p>CPF *</p>
            <input
              placeholder="CPF (apenas números)"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              onBlur={handleBuscarCpf} // <--- Busca ao sair do campo
              required
              disabled={loadingCpf} // Trava enquanto busca
              maxLength={14} // Máscara simples
            />
            {/* Ícone de loading ou lupa no canto do input */}
            {loadingCpf && (
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                Buscando... ⏳
              </span>
            )}
          </DivLabelInput>

          {/* CAMPO NOME (Vem preenchido se achar o CPF) */}
          <DivLabelInput>
            <p>Nome</p>
            <input
              placeholder="Nome do Visitante"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              readOnly={!!visitanteId}
            />
          </DivLabelInput>

          <DivLabelInput>
            <p>Telefone</p>
            <input
              placeholder="Telefone do Visitante"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              readOnly={!!visitanteId}
            />
          </DivLabelInput>

          <DivLabelInput>
            <p>Setor *</p>
            <select
              value={setorId}
              onChange={(e) => setSetorId(e.target.value)}
              required
              onClick={handleBuscarSetor}>
              <option value="" disabled>
                Selecione o Setor
              </option>
              {setores.map((setor) => (
                <option key={setor.id} value={setor.id}>
                  {setor.nome}
                </option>
              ))}
            </select>
          </DivLabelInput>

          <DivLabelInput>
            <p>Movito*</p>
            <textarea
              placeholder="Motivo da visita"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            />
          </DivLabelInput>

          <button
            type="submit"
            disabled={loadingCpf}
            style={{
              opacity: loadingCpf ? 0.7 : 1
            }}>
            {loadingCpf ? 'Aguarde...' : 'Registrar Entrada'}
          </button>
        </form>
      </Content>
    </Overlay>
  );
}
