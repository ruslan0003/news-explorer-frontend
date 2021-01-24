import { setToken, getToken } from './token';
import { apiConfig } from './config';
import ROUTES_MAP from './routesMap';

export const register = (email, password, name) => fetch(`${apiConfig.baseUrl}${ROUTES_MAP.REGISTER}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password, name }),
})
  .then((res) => {
    if (res.status === 200) {
      console.log('Регистрация прошла успешно');
      return res.json();
    }
    if (res.status === 400) {
      console.log('Некорректно заполнено одно из полей либо такой пользователь уже зарегистрирован!');
    }
    return res;
  });

export const authorize = (email, password) => fetch(`${apiConfig.baseUrl}${ROUTES_MAP.LOGIN}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 401) {
      console.log('Неверно указан email либо пароль');
    }
    if (res.status === 400) {
      console.log('Не заполнено одно из полей');
      console.log(email, password);
    }
    return res;
  })
  .then((data) => {
    console.log(data);
    if (data) {
      setToken(data);
      return data;
    }
    return data;
  });

export const getContent = (token) => fetch(`${apiConfig.baseUrl}${ROUTES_MAP.ME}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {
    if (res.status === 200) {
      console.log('Токен передан корректно');
      return res.json();
    }
    if (res.status === 401) {
      console.log('Токен не передан или передан не в том формате');
    }
    if (res.status === 400) {
      console.log('Переданный токен некорректен');
    }
    return res;
  })
  .then((data) => data);

export function getSavedNews(token) {
  return fetch(`${apiConfig.baseUrl}${ROUTES_MAP.SAVED_NEWS}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}, заголовки: ${res.headers}`));
    });
}

export function saveCard(image, link, date, title, text, source, keyword, _id) {
  const token = getToken();
  return fetch(`${apiConfig.baseUrl}${ROUTES_MAP.SAVED_NEWS}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({
        image, link, date, title, text, source, keyword, _id,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
}

export function deleteCard(cardId) {
  const token = getToken();
  return fetch(`${apiConfig.baseUrl}${ROUTES_MAP.SAVED_NEWS}/${cardId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
}
