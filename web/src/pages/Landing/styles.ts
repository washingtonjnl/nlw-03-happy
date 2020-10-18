import styled from 'styled-components';

import { Link } from 'react-router-dom';
import landingImg from '../../assets/images/landing.svg';

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  padding: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  position: relative;

  width: 100vw;
  max-width: 1440px;
  height: 100vh;
  max-height: 820px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  background: url(${landingImg}) no-repeat 85% center;
`;

export const Main = styled.main`
  max-width: 500px;

  h1 {
    font-size: 76px;
    font-weight: 900;
    line-height: 78px;
  }

  p {
    margin: 30px 0 100px 0;
    font-size: 24px;
    line-height: 34px;
  }
`;

export const Location = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  font-size: 24px;
  line-height: 34px;
  text-align: right;

  strong {
    font-weight: 800;
  }
`;

export const EnterApp = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 60px;

  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 80px;
  background: #ffd666;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #96feff;
  }
`;
