import PropTypes from 'prop-types';

import { DivTitle, DivIconTitle, TimerIcon, DivInfoTitle } from './styled';

export default function TitlePage({ title, description }) {
  return (
    <DivTitle>
      <DivIconTitle>
        <TimerIcon />
        <DivInfoTitle>
          <p>{title}</p>
          <span>{description}</span>
        </DivInfoTitle>
      </DivIconTitle>
    </DivTitle>
  );
}

TitlePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
