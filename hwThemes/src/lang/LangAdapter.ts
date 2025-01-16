import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./localization/en.json";
import ru from "./localization/ru.json";
import { LangType } from "./LangType";

const resources = {
  en: en,
  ru: ru,
};

i18n.use(initReactI18next).init({
  resources,
  lng: LangType.RU,
  returnNull: false,
  fallbackLng: LangType.RU,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
