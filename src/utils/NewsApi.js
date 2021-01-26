import newsApiConfig from './useForm';
import { dateFrom, dateTo } from './config';

function findArticles(keyword) {
  return fetch(`https://newsapi.org/v2/everything?q=${keyword}&from=${dateFrom}&to=${dateTo}&pageSize=100&apiKey=3e086957fce948b5bba8f71d7135642d`,
    {
      headers: newsApiConfig.headers,
      method: 'GET',
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}, заголовки: ${res.headers}`));
    });
}

export default findArticles;
