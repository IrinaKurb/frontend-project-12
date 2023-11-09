import React from 'react';
import { useTranslation } from 'react-i18next';

export const RegistratePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="center-align">
        {t('singUpPage.signup')}
      </h1>
    </div>
  );
};
