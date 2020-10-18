import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

import { Linking, Text } from 'react-native';
import {
  Container,
  ImagesContainer,
  OrphanageImage,
  DetailsContainer,
  Title,
  Description,
  MapContainer,
  Map,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  ScheduleItem,
  ScheduleText,
  ContactButton,
  ContactButtonText,
} from './styles';

import mapMarkerImg from '../../assets/images/map-marker.png';
import api from '../../services/api';

interface OrphanageDetailsRouteParams {
  id: string;
}

interface Orphanage {
  id: string;
  name: string;
  about: string;
  whatsapp: string;
  instructions: string;
  openning_hours: string;
  open_on_weekends: boolean;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
}

const OrphanageDetails: React.FC = () => {
  const route = useRoute();
  const params = route.params as OrphanageDetailsRouteParams;

  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(res => {
      setOrphanage(res.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return (
      <Container
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Carregando...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => {
            return (
              <OrphanageImage
                key={image.id}
                source={{
                  uri: image.url,
                }}
              />
            );
          })}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <Map
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </Map>

          <RoutesContainer
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`,
              );
            }}
          >
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItem color="blue">
            <Feather name="clock" size={40} color="#2AB5D1" />
            <ScheduleText color="blue">
              {`Segunda à Sexta ${orphanage.openning_hours}`}
            </ScheduleText>
          </ScheduleItem>
          {orphanage.open_on_weekends ? (
            <ScheduleItem color="green">
              <Feather name="info" size={40} color="#39CC83" />
              <ScheduleText color="green">
                Atendemos fins de semana e feriados
              </ScheduleText>
            </ScheduleItem>
          ) : (
            <ScheduleItem color="red">
              <Feather name="info" size={40} color="#FF669D" />
              <ScheduleText color="red">
                Não atendemos fins de semana e feriados
              </ScheduleText>
            </ScheduleItem>
          )}
        </ScheduleContainer>

        <ContactButton
          onPress={() => {
            Linking.openURL(
              `https://api.whatsapp.com/send?phone=55${orphanage.whatsapp}`,
            );
          }}
        >
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
      </DetailsContainer>
    </Container>
  );
};

export default OrphanageDetails;
