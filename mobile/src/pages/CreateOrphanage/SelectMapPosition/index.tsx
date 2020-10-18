/* eslint-disable object-curly-newline */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  getCurrentPositionAsync,
  requestPermissionsAsync,
} from 'expo-location';
import { Container, Map, NextButton, NextButtonText } from './styles';

import mapMarkerImg from '../../../assets/images/map-marker.png';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useFocusEffect(() => {
    loadInitialPosition();
  });

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

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
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </Map>

      {position.latitude !== 0 && (
        <NextButton
          onPress={() => {
            navigation.navigate('OrphanageData', { position });
          }}
        >
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      )}
    </Container>
  );
};

export default SelectMapPosition;
