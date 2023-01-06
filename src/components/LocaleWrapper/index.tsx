import { FC } from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

import { messages as enMessages } from "../../locales/en";
import { messages as zhMessages } from "../../locales/zh";

import { getLocale } from "@/utils/i18n";

const getLocaleName = () => {
  if (getLocale() === "en") {
    return "en";
  } else if (getLocale() === "zh-cn") {
    return "zh";
  } else {
    return "";
  }
};

const getMessages = () => {
  if (getLocale() === "en") {
    return enMessages;
  } else if (getLocale() === "zh-cn") {
    return zhMessages;
  } else {
    return {};
  }
};

const loadI18n = () => {
  i18n.load(getLocaleName(), getMessages());
  i18n.activate(getLocaleName());
};

loadI18n();

i18n.loadLocaleData({
  en: {
    plurals: () => ({}),
  },
  zh: {
    plurals: () => ({}),
  },
});

const LocaleWrapper: FC = ({ children }) => {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default LocaleWrapper;
