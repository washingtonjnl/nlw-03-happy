import React from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Container, Title, HeaderButton } from './styles';

interface HeaderProps {
  title: string;
  showCancel: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showCancel = true,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar barStyle="dark-content" hidden={false} />
      <HeaderButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </HeaderButton>
      <Title>{title}</Title>
      {showCancel ? (
        <HeaderButton
          onPress={() => {
            navigation.navigate('OrphanagesMap');
          }}
        >
          <Feather name="x" size={24} color="#ff669d" />
        </HeaderButton>
      ) : (
        <HeaderButton>
          <Feather name="x" size={24} color="#fff" />
        </HeaderButton>
      )}
    </Container>
  );
};

export default Header;
