import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '40254095-fb7e3bf791467f50a6328bb1e';

export const GetApi = async (carrRequest, page) => {
  const { data } = await axios('/', {
    params: {
      key: API_KEY,
      q: carrRequest,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page,
    },
  });
  return data;
};
