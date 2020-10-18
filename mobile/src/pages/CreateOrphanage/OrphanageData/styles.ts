import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {
  RectButton,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  color: #5c8599;
  font-size: 24px;
  font-family: 'nunito700';
  margin-top: 10px;
  padding-bottom: 24px;
  box-shadow: 0 0.8px 0 #d3e2e6;
`;

export const Label = styled.Text`
  color: #8fa7b3;
  font-size: 18px;
  font-family: 'nunito600';
  margin: 0 0 8px 5px;
`;

export const Input = styled(TextInput)`
  background: white;
  border: 1.4px solid #d3e2e6;
  border-radius: 20px;
  height: 56px;
  padding: 18px 24px;
  margin-bottom: 16px;
`;

export const Error = styled.Text`
  color: #ff669d;
  margin: -5px 0 15px 5px;
  font-size: 16px;
  font-family: 'nunito600';
`;

export const UploadedImagesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ImagePreview = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  margin: 0 8px 32px 0;
`;

export const ImagesInput = styled(TouchableOpacity)`
  background: rgba(255, 255, 255, 0.5);
  border: 1.4px dashed #96d2f0;
  border-radius: 20px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  max-width: ${Dimensions.get('window').width}px;
`;

export const NextButton = styled(RectButton)`
  background: #15c3d6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 56px;
  margin-top: 32px;
`;

export const NextButtonText = styled.Text`
  font-family: 'nunito800';
  font-size: 16px;
  color: white;
`;
