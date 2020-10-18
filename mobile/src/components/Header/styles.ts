import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 24px;
  padding-top: 44px;
  background: #f9fafc;
  box-shadow: 0 1.5px 0 #dde3f0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'nunito600';
  color: #8fa7b3;
  font-size: 18px;
`;

export const HeaderButton = styled(BorderlessButton)``;
