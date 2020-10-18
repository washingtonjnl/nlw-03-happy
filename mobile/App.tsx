import React from 'react';
import { useFonts } from 'expo-font';
import {
  Nunito_600SemiBold as nunito600,
  Nunito_700Bold as nunito700,
  Nunito_800ExtraBold as nunito800,
} from '@expo-google-fonts/nunito';

import Routes from './src/routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    nunito600,
    nunito700,
    nunito800,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Routes />;
};

export default App;
