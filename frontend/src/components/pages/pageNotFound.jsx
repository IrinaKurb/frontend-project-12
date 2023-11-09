import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../../assets/404.png';


export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img alt={t('notFoundPage')} className="center-align" src={notFoundImg} />
      <h1 className="center-align">
        {t('notFoundPage')}
      </h1>
    </div>
  );
};
