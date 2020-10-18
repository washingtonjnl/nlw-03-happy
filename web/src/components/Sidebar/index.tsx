import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';
import { Aside, Footer, GoBack } from './styles';

import mapMarkerImg from '../../assets/images/map-marker.svg';

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <Aside>
      <img src={mapMarkerImg} alt="Happy" />

      <Footer>
        <GoBack type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </GoBack>
      </Footer>
    </Aside>
  );
};

export default Sidebar;
