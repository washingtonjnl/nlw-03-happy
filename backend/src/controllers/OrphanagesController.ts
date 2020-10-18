import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import 'yup-phone';

import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/OrphanagesView';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });

    return res.status(200).json(OrphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return res.status(200).json(OrphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      about,
      whatsapp,
      instructions,
      openning_hours,
      open_on_weekends,
      latitude,
      longitude,
    } = req.body;

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const orphanagesRepository = getRepository(Orphanage);

    const data = {
      name,
      about,
      whatsapp,
      instructions,
      openning_hours,
      open_on_weekends: JSON.parse(open_on_weekends),
      latitude,
      longitude,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('O nome do orfanato é obrigatório.'),
      about: Yup.string()
        .required('Você precisa inserir uma descrição.')
        .max(300, 'A descrição deve ter no máximo 300 caracteres.'),
      whatsapp: Yup.string()
        .required(
          'Você precisa informar um número de telefone cadastrado no WhatsApp.',
        )
        .phone('BR', true, 'Insira um número de WhatsApp válido.'),
      instructions: Yup.string().required(
        'Você precisa inserir as instruções para fazer uma visita.',
      ),
      openning_hours: Yup.string().required(
        'O horário de funcionamento é obrigatório.',
      ),
      open_on_weekends: Yup.boolean().required(
        'Você precisa informar se este orfanato recebe visitas aos finais de semana e feriados.',
      ),
      latitude: Yup.number()
        .notOneOf([0], 'Você precisa selecionar o local clicando no mapa.')
        .required('Você precisa selecionar o local clicando no mapa.'),
      longitude: Yup.number()
        .notOneOf([0], 'Você precisa selecionar o local clicando no mapa.')
        .required('Você precisa selecionar o local clicando no mapa.'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ).required('Você precisa inserir pelo menos uma imagem.'),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(OrphanageView.render(orphanage));
  },
};
