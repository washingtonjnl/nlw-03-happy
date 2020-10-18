import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  display: flex;
`;

export const Aside = styled.aside`
  width: 440px;
  padding: 80px;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.header`
  h2 {
    margin-top: 64px;

    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
  }

  p {
    margin-top: 24px;
    line-height: 28px;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;

  line-height: 24px;

  strong {
    font-weight: 800;
  }
`;

export const CreateOrphanage = styled(Link)`
  position: absolute;
  z-index: 2;
  right: 40px;
  bottom: 40px;

  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: #15c3d6;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #17d6eb;
  }
`;
