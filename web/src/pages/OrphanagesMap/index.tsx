import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, Aside, Header, Footer, CreateOrphanage } from './styles';

import mapMarkerImg from '../../assets/images/map-marker.svg';

import '../../styles/leaflet.css';
import mapIcon from '../../utils/MapIcon';

interface Orphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition({ latitude, longitude });
    });
  }, []);

  useEffect(() => {
    api.get('/orphanages').then(res => {
      setOrphanages(res.data);
    });
  }, []);

  return (
    <Container>
      <Aside>
        <Header>
          <img src={mapMarkerImg} alt="Happy Icon" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </Header>

        <Footer>
          <strong>Rio de Janeiro</strong>
          <span>RJ</span>
        </Footer>
      </Aside>

      <Map
        center={[initialPosition.latitude, initialPosition.longitude]}
        zoom={15}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="white" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <CreateOrphanage to="orphanages/create">
        <FiPlus size={32} color="white" />
      </CreateOrphanage>
    </Container>
  );
};

export default OrphanagesMap;
