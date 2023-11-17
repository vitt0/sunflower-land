import { ENGLISH_TERMS } from "./englishDictionary";
import { PORTUGUESE_TERMS } from "./portugueseDictionary";
import { CHINESE_SIMPLIFIED_TERMS } from "./chineseSimplifiedDictionary";
import { CHINESE_TRADITIONAL_TERMS } from "./chineseTraditionalDictionary";
import { TranslationKeys } from "./types";

export type LanguageCode = "en" | "pt" | "cs" | "ct";

export type TranslationResource = Record<TranslationKeys, string>;

export const resources: Record<
  LanguageCode,
  { translation: TranslationResource }
> = {
  en: {
    translation: ENGLISH_TERMS,
  },
  pt: {
    translation: PORTUGUESE_TERMS,
  },
  cs: {
    translation: CHINESE_SIMPLIFIED_TERMS,
  },
  ct: {
    translation: CHINESE_TRADITIONAL_TERMS,
  },
};
