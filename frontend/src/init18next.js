import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const initI18next = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  return i18nextInstance;
};

export default initI18next;
