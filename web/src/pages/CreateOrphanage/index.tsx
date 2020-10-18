import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Main,
  Form,
  Fieldset,
  InputBlock,
  ImageContainer,
  SelectedImages,
  NewImage,
  ButtonSelect,
  Button,
  Submit,
  Error,
} from './styles';

import Sidebar from '../../components/Sidebar';

import mapIcon from '../../utils/MapIcon';
import api from '../../services/api';

interface ErrorMessage {
  [key: string]: string[];
}

const CreateOrphanage: React.FC = () => {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openning_hours, setOpenningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [trimmedErrors, setTrimmedErros] = useState<ErrorMessage>(
    {} as ErrorMessage,
  );

  useEffect(() => {
    const selectedImagesPreview = images.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }, [images]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages([...images, ...selectedImages]);
  }

  function handleRemoveImage(key: number) {
    const filteredImages = images.filter(
      image => images.indexOf(image) !== key,
    );

    setImages(filteredImages);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('instructions', instructions);
    data.append('openning_hours', openning_hours);
    data.append('open_on_weekends', open_on_weekends.toString());
    data.append('latitude', latitude.toString());
    data.append('longitude', longitude.toString());
    images.forEach(image => {
      data.append('images', image);
    });

    api
      .post('/orphanages', data)
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/app');
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
          alert(
            'Ocorreu um erro interno ao receber seu cadastro. Tente novamente mais tarde.',
          );
        }
      });
  }

  return (
    <Container>
      <Sidebar />

      <Main>
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <legend>Dados</legend>

            <InputBlock>
              <label htmlFor="about">
                Endereço
                <span>Selecione o local no mapa</span>
              </label>
              <Map
                center={[-22.9103079, -43.531849]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={handleMapClick}
                dragging
                touchZoom
                zoomControl={false}
                scrollWheelZoom
                doubleClickZoom
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}
              </Map>
              <Error>{trimmedErrors.latitude}</Error>
            </InputBlock>

            <InputBlock className="first">
              <label htmlFor="name">Nome do Orfanato</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
              <Error>{trimmedErrors.name}</Error>
            </InputBlock>

            <InputBlock>
              <label htmlFor="about">
                Descrição
                <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
              <Error>{trimmedErrors.about}</Error>
            </InputBlock>

            <InputBlock>
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="text"
                max="11"
                id="whatsapp"
                value={whatsapp}
                onChange={event => setWhatsapp(event.target.value)}
              />
              <Error>{trimmedErrors.whatsapp}</Error>
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>

              <ImageContainer>
                {previewImages.map((image, key) => {
                  return (
                    <SelectedImages key={key}>
                      <img src={image} alt={name} />
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveImage(key);
                        }}
                      >
                        <FiX size={24} color="FF669D" />
                      </button>
                    </SelectedImages>
                  );
                })}

                <NewImage htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </NewImage>
              </ImageContainer>
              <Error>{trimmedErrors.images}</Error>

              <input
                multiple
                type="file"
                id="image[]"
                accept="image/x-png,image/jpeg"
                onChange={handleSelectImages}
              />
            </InputBlock>
          </Fieldset>

          <Fieldset>
            <legend>Visitação</legend>

            <InputBlock>
              <label htmlFor="instructions">Instruções para Visitação</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
              <Error>{trimmedErrors.instructions}</Error>
            </InputBlock>

            <InputBlock>
              <label htmlFor="opening_hours">
                Horário de funcionamento
                <span>Ex: das 08:00 às 17:00</span>
              </label>
              <input
                id="opening_hours"
                value={openning_hours}
                onChange={event => setOpenningHours(event.target.value)}
              />
              <Error>{trimmedErrors.openning_hours}</Error>
            </InputBlock>

            <InputBlock>
              <label htmlFor="open_on_weekends">
                Recebe visitas aos fins de semana e feriados?
              </label>

              <ButtonSelect>
                <Button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                >
                  Sim
                </Button>
                <Button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                >
                  Não
                </Button>
              </ButtonSelect>
            </InputBlock>
          </Fieldset>

          <Submit type="submit">Completar Cadastro</Submit>
        </Form>
      </Main>
    </Container>
  );
};

export default CreateOrphanage;
