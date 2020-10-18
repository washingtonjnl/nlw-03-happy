import styled from 'styled-components/native';

import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
`;

export const CalloutContainer = styled.View`
  width: 160px;
  height: 46px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  justify-content: center;
`;

export const CalloutText = styled.Text`
  color: #0089a5;
  font-size: 16px;
  font-family: 'nunito800';
`;

export const Footer = styled.View`
  position: absolute;
  left: 25px;
  right: 25px;
  bottom: 35px;

  background-color: white;
  border-radius: 20px;
  padding-left: 25px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
`;

export const FooterText = styled.Text`
  color: #8fa7b3;
  font-size: 16px;
  font-family: 'nunito700';
`;

export const CreateOrphanageButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  background-color: #15c3d6;
  margin: 5px;

  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
