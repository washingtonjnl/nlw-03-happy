import Image from '../models/Image';

const serverURL = process.env.SERVER_URL || 'http://localhost:3333';

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${serverURL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  },
};
