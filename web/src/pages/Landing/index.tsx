import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import { Container, ContentWrapper, Main, Location, EnterApp } from './styles';

import logoImg from '../../assets/images/logo.svg';

const Landing: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <img src={logoImg} alt="Happy Logo" />

        <Main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </Main>

        <Location>
          <strong>Rio de Janeiro</strong>
          <span>RJ</span>
        </Location>

        <EnterApp to="/app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </EnterApp>
      </ContentWrapper>
    </Container>
  );
};

export default Landing;
