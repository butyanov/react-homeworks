import { makeAutoObservable } from "mobx";
import i18n from "./LangAdapter";
import LangLocalRepository from "./LangLocalRepository";
import { LangType } from "./LangType";

export default class LangService {
  private langLocal: LangLocalRepository;

  constructor() {
    this.langLocal = new LangLocalRepository();
    makeAutoObservable(this);
  }

  changeLang = async (lang: LangType) => {
    await this.langLocal.set(lang);
    if (lang) {
      await i18n.changeLanguage(lang);
    }
  };

  getLang = async () => {
    return await this.langLocal.get();
  };
}
