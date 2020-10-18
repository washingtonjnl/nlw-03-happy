import Orphanage from '../models/Orphanage';
import imagesView from './ImagesView';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      about: orphanage.about,
      whatsapp: orphanage.whatsapp,
      instructions: orphanage.instructions,
      openning_hours: orphanage.openning_hours,
      open_on_weekends: orphanage.open_on_weekends,
      latitude: parseFloat(orphanage.latitude.toString()),
      longitude: parseFloat(orphanage.longitude.toString()),
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage));
  },
};
