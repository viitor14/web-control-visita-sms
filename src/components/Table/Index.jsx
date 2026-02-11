import PropTypes from 'prop-types';

import { FiEye } from 'react-icons/fi';

import {
  DivContainer,
  Container,
  HeaderRow,
  HeaderItem,
  DataRow,
  Cell,
  Pagination,
  InfoPage
} from './styled';

export default function TabelaVisitas({
  colunas,
  dados,
  layoutGrid,
  page,
  totalPages,
  onPageChange
}) {
  return (
    <DivContainer>
      <Container>
        <HeaderRow layout={layoutGrid}>
          {colunas.map((col, index) => (
            <HeaderItem key={index}>{col.titulo}</HeaderItem>
          ))}
        </HeaderRow>

        {dados.map((item, rowIndex) => (
          <DataRow key={item.id || rowIndex} layout={layoutGrid}>
            {colunas.map((col, colIndex) => (
              <Cell key={`${rowIndex}-${colIndex}`}>
                {col.render ? col.render(item) : item[col.campo]}
              </Cell>
            ))}
          </DataRow>
        ))}
        {/* Paginação */}
        {totalPages > 0 && (
          <Pagination>
            {/* Botão ANTERIOR */}
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              style={{
                opacity: page === 1 ? 0.5 : 1,
                cursor: page === 1 ? 'not-allowed' : 'pointer'
              }}>
              Anterior
            </button>

            <InfoPage>
              {page} de {totalPages}
            </InfoPage>

            {/* Botão PRÓXIMO */}
            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              style={{
                opacity: page >= totalPages ? 0.5 : 1,
                cursor: page >= totalPages ? 'not-allowed' : 'pointer'
              }}>
              Próximo
            </button>
          </Pagination>
        )}
      </Container>
    </DivContainer>
  );
}

TabelaVisitas.propTypes = {
  colunas: PropTypes.array.isRequired,
  dados: PropTypes.array.isRequired,
  layoutGrid: PropTypes.string.isRequired
};
