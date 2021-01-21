import { getToken } from './token';

export const newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=3e086957fce948b5bba8f71d7135642d';

export const mainApiUrl = 'https://api.rlukichev.students.nomoredomains.work';

const jwt = getToken();

export const apiConfig = {
  baseUrl: mainApiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  },
};

export const newsApiConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
