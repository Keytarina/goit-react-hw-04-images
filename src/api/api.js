import axios from 'axios';

const KEY_API = '37101348-01b9475ae8f5d0f542cc9660e';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getImages(searchValue, page) {
  const { data } = await axios({
    params: {
      key: KEY_API,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return data;
}

const api = {
  getImages,
};
export default api;
