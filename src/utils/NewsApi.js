import newsApiConfig from './useForm';

function setDateWeekBack() {
  const dateWeekBack = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return dateWeekBack.toISOString().split('T')[0];
}

function setCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const dateFrom = setDateWeekBack();
const dateTo = setCurrentDate();

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
