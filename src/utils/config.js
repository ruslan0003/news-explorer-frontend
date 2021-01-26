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

function setDateWeekBack() {
  const dateWeekBack = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return dateWeekBack.toISOString().split('T')[0];
}

function setCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export const dateFrom = setDateWeekBack();
export const dateTo = setCurrentDate();

export const NUMBER_OF_CARDS_SHOWN = 3;
