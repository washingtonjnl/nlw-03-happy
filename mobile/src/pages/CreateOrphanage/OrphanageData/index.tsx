import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Switch } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import api from '../../../services/api';

import {
  Container,
  Title,
  Label,
  Input,
  Error,
  UploadedImagesContainer,
  ImagePreview,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
} from './styles';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

interface ErrorMessage {
  [key: string]: string[];
}

const OrphanageData: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [openning_hours, setOpenningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState([]);

  const [trimmedErrors, setTrimmedErros] = useState<ErrorMessage>(
    {} as ErrorMessage,
  );

  function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('whatsapp', whatsapp);
    data.append('openning_hours', openning_hours);
    data.append('open_on_weekends', open_on_weekends.toString());
    data.append('latitude', latitude.toString());
    data.append('longitude', longitude.toString());
    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    api
      .post('/orphanages', data)
      .then(() => {
        alert('Orfanato criado com sucesso!');
        navigation.navigate('OrphanagesMap');
      })
      .catch(err => {
        if (err.response.status === 400) {
          const { errors } = err.response.data;

          let errorsLength = Object.keys(errors).length;

          if (errors.latitude) {
            errorsLength -= 1;
          }

          setTrimmedErros(errors);

          alert(
            `Percebemos ${errorsLength} ${
              errorsLength === 1 ? 'erro' : 'erros'
            } ao validar suas informações. Cheque seu formulário.`,
          );
        } else {
          console.log(err.response.data);
          alert(
            'Ocorreu um erro interno ao receber seu cadastro. Tente novamente mais tarde.',
          );
        }
      });
  }

  async function handleSelectImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <Input returnKeyType="next" value={name} onChangeText={setName} />
      <Error>{trimmedErrors.name}</Error>

      <Label>Sobre</Label>
      <Input
        returnKeyType="next"
        style={{ height: 110 }}
        multiline
        value={about}
        onChangeText={setAbout}
      />
      <Error>{trimmedErrors.about}</Error>

      <Label>Whatsapp</Label>
      <Input
        returnKeyType="done"
        keyboardType="numeric"
        value={whatsapp}
        onChangeText={setWhatsapp}
      />
      <Error>{trimmedErrors.whatsapp}</Error>

      <Label>Fotos</Label>
      <UploadedImagesContainer>
        {images.map(image => {
          return <ImagePreview key={image} source={{ uri: image }} />;
        })}
      </UploadedImagesContainer>
      <ImagesInput onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </ImagesInput>
      <Error style={{ marginTop: -20 }}>{trimmedErrors.images}</Error>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <Input
        returnKeyType="next"
        style={{ height: 110 }}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />
      <Error>{trimmedErrors.instructions}</Error>

      <Label>Horario de visitas</Label>
      <Input
        returnKeyType="done"
        value={openning_hours}
        onChangeText={setOpenningHours}
      />
      <Error>{trimmedErrors.openning_hours}</Error>

      <SwitchContainer>
        <Label>Aberto aos fins de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          style={{ marginLeft: 20 }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </SwitchContainer>
      <Error>{trimmedErrors.open_on_weekends}</Error>

      <NextButton onPress={handleCreateOrphanage}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default OrphanageData;
