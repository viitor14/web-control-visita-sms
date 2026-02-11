import PropTypes from 'prop-types';

import { DivBoxInfoDashboard } from './styled';
export default function InfoDashboard({ backgroundColor, borderColor, title, value }) {
  return (
    <DivBoxInfoDashboard backgroundcolor={backgroundColor} bordercolor={borderColor}>
      <p>{title}</p>
      <span>{value}</span>
    </DivBoxInfoDashboard>
  );
}
InfoDashboard.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};
