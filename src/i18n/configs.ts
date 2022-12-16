import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translation_en from './en.json'
import translation_zh from './zh.json'

const resources = {
  en: {
    translation: translation_en
  },
  zh: {
    translation: translation_zh
  }
}

i18n
  .use(initReactI18next) // 初始化react-i18next
  .init({
    resources, // 剛剛創立的那兩個json文件
    lng: "zh", // 默認初始化的語言

    // header.slogan 這樣就可以獲得字符串了
    interpolation: {     // react already safes from xss
      escapeValue: false // 使用false為不會為了防止xss攻擊 強制把html的字符轉換為普同的字串 因為react已經自帶防止被攻擊的機制了 
    }
  });

export default i18n;