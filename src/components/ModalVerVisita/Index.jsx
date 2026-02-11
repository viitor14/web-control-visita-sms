import { useState } from 'react';
import { format, isToday, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import axios from '../../services/axios';

import { Overlay, Content, DivHeader, IconCLoseModal, DivLabelInput, DivStatus } from './styled';

export default function ModalVerVisita({ dadosVisita, onClose }) {
  return (
    <Overlay>
      <Content>
        <DivHeader>
          <h2>Visualização da visita</h2>
          <IconCLoseModal onClick={onClose} />
        </DivHeader>
        <div>
          {/* Bloco do Visitante */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            {dadosVisita.foto && (
              <img
                src={dadosVisita.foto}
                alt="Foto"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  marginRight: 15,
                  objectFit: 'cover'
                }}
              />
            )}
            <div>
              <h3>{dadosVisita.nome}</h3>
              <p>CPF: {dadosVisita.cpf}</p>
              <p>Tel: {dadosVisita.telefone}</p>
            </div>
          </div>

          <hr style={{ margin: '15px 0', border: '1px solid #eee' }} />

          {/* Detalhes da Visita */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <strong>Setor Destino:</strong>
              <p>{dadosVisita.setor}</p>
            </div>

            <DivStatus tipo={dadosVisita.status}>
              <strong>Status:</strong>
              <span>{dadosVisita.status}</span>
            </DivStatus>
            <div>
              <strong>Data Entrada:</strong>
              {/* Verifica se a data é string ou objeto Date antes de formatar */}
              <p>
                {dadosVisita.created_at
                  ? format(
                      typeof dadosVisita.created_at === 'string'
                        ? parseISO(dadosVisita.created_at)
                        : dadosVisita.created_at,
                      'dd/MM/yyyy HH:mm'
                    )
                  : '-'}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <strong>Motivo/Observação:</strong>
            <p style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
              {dadosVisita.motivo || 'Sem observações.'}
            </p>
          </div>
        </div>
      </Content>
    </Overlay>
  );
}
