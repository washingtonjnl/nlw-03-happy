/* eslint-disable operator-linebreak */
/* eslint-disable prettier/prettier */
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import styled, { css } from 'styled-components/native';

interface ScheduleProps {
  color: string;
}

export const Container = styled.ScrollView`
  flex: 1;
`;

export const ImagesContainer = styled.View`
  height: 240px;
  margin: 0 -2px;
`;

export const OrphanageImage = styled.Image`
  width: ${Dimensions.get('window').width};
  height: 240px;
  margin: 0 2px;
`;

export const DetailsContainer = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  color: #4d6f80;
  font-family: 'nunito700';
  font-size: 30px;
`;

export const Description = styled.Text`
  font-family: 'nunito600';
  color: #5c8599;
  font-size: 18px;
  line-height: 26px;
  margin-top: 16px;
`;

export const MapContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
  border: 1.2px solid #b3dae2;
  margin-top: 40px;
  background: #e6f7fb;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 150px;
`;

export const RoutesContainer = styled(RectButton)`
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

export const RoutesText = styled.Text`
  font-family: 'nunito700';
  font-size: 18px;
  color: #0089a5;
`;

export const Separator = styled.View`
  height: 0.8px;
  width: 100%;
  background: #d3e2e6;
  margin: 40px 0 25px 0;
`;

export const ScheduleContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ScheduleItem = styled.View<ScheduleProps>`
  width: 48%;
  padding: 20px;
  border-radius: 20px;

  ${props => props.color === 'blue' &&
    css`
      background: #e6f7fb;
      border: 1px solid #b3dae2;
    `}

  ${props => props.color === 'green' &&
    css`
      background: #edfff6;
      border: 1px solid #a1e9c5;
    `}

    ${props => props.color === 'red' &&
    css`
      background: #fef6f9;
      border: 1px solid #ffbcd4;
    `}
`;

export const ScheduleText = styled.Text<ScheduleProps>`
  font-family: 'nunito600';
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;

  ${props => props.color === 'blue' &&
    css`
      color: #5c8599;
    `}

  ${props => props.color === 'green' &&
    css`
      color: #37c77f;
    `}

  ${props => props.color === 'red' &&
    css`
      color: #ff669d;
    `}
`;

export const ContactButton = styled(RectButton)`
  background: #3cdc8c;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 40px;
`;

export const ContactButtonText = styled.Text`
  font-family: 'nunito800';
  color: white;
  font-size: 16px;
  margin-left: 16px;
`;
