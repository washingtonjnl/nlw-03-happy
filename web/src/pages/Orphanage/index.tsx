import React, { useEffect, useState } from 'react';
import { FiClock, FiInfo } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/MapIcon';

import {
  Container,
  Main,
  ThisOrphanage,
  MainImage,
  Images,
  ImageButton,
  Details,
  MapContainer,
  GoogleMapsLink,
  OpenDetails,
  Hour,
  OpenOnWeekends,
  ContactButton,
} from './styles';

interface Orphanage {
  name: string;
  about: string;
  whatsapp: string;
  instructions: string;
  openning_hours: string;
  open_on_weekends: string;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

const ViewOrphanage: React.FC = () => {
  const params = useParams<OrphanageParams>();

  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(res => {
      setOrphanage(res.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  function handleGoToWhatsApp() {
    if (orphanage) {
      const wppLink = `https://api.whatsapp.com/send?phone=55${orphanage.whatsapp}`;
      const win = window?.open(wppLink, '_blank');
      // eslint-disable-next-line no-unused-expressions
      win?.focus();
    }
  }

  return (
    <Container>
      <Sidebar />

      <Main>
        <ThisOrphanage>
          <MainImage
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <Images className="images">
            {orphanage.images.map((image, index) => {
              return (
                <ImageButton
                  key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </ImageButton>
              );
            })}
          </Images>

          <Details>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <MapContainer>
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging
                touchZoom
                zoomControl={false}
                scrollWheelZoom
                doubleClickZoom
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <GoogleMapsLink>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </GoogleMapsLink>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <OpenDetails>
              <Hour>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta
                <br />
                {orphanage.openning_hours}
              </Hour>
              {orphanage.open_on_weekends ? (
                <OpenOnWeekends>
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos
                  <br />
                  fim de semana
                </OpenOnWeekends>
              ) : (
                <OpenOnWeekends className="closed">
                  <FiInfo size={32} color="#FF669d" />
                  Não atendemos
                  <br />
                  fim de semana
                </OpenOnWeekends>
              )}
            </OpenDetails>

            <ContactButton type="button" onClick={handleGoToWhatsApp}>
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ContactButton>
          </Details>
        </ThisOrphanage>
      </Main>
    </Container>
  );
};

export default ViewOrphanage;
