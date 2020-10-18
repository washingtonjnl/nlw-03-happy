import React, { useState } from 'react';
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

import {
  Container,
  Map,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  CreateOrphanageButton,
} from './styles';

import api from '../../services/api';

import mapMarker from '../../assets/images/map-marker.png';

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

  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('/orphanages').then(res => {
      setOrphanages(res.data);
    });

    loadInitialPosition();
  });

  async function loadInitialPosition() {
    const { granted } = await requestPermissionsAsync();

    if (granted) {
      const location = await getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition({ latitude, longitude });
    }
  }

  return (
    <Container>
      <StatusBar hidden />

      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.3,
                y: 0.72,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout
                tooltip
                onPress={() => {
                  navigation.navigate('OrphanageDetails', { id: orphanage.id });
                }}
              >
                <CalloutContainer>
                  <CalloutText>{orphanage.name}</CalloutText>
                </CalloutContainer>
              </Callout>
            </Marker>
          );
        })}
      </Map>

      <Footer>
        <FooterText>{`${orphanages.length} orfanatos encontrados`}</FooterText>
        <CreateOrphanageButton
          onPress={() => {
            navigation.navigate('SelectMapPosition');
          }}
        >
          <Feather name="plus" color="#fff" size={24} />
        </CreateOrphanageButton>
      </Footer>
    </Container>
  );
};

export default OrphanagesMap;
