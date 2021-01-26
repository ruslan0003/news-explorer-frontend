import React from 'react';
import failure from '../../images/failure.svg';

function Page404() {
  return (
    <div className="page-404">
      <div className="page-404__container">
        <img className="page-404__image" src={failure} alt="Иконка" />
        <h2 className="page-404__title">Ошибка 404. Такой страницы не существует:(</h2>
      </div>
    </div>
  );
}

export default Page404;
