import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import viTranslation from "./locales/vi/translation.json";

i18n.use(initReactI18next).init({
  lng: "vi",
  fallbackLng: "en",
  resources: {
    en: {
      translation: enTranslation,
    },
    vi: {
      translation: viTranslation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
