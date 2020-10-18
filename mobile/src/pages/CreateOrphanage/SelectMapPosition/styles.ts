import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const Map = styled(MapView)`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
`;

export const NextButton = styled(RectButton)`
  background: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 64px;

  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  position: absolute;
  left: 25px;
  right: 25px;
  bottom: 35px;
`;

export const NextButtonText = styled.Text`
  font-family: 'nunito800';
  font-size: 18px;
  color: white;
`;
