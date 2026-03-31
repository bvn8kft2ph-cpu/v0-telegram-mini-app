// ═══════════════════════════════════════════════
// i18n EXPORTS
// ═══════════════════════════════════════════════

import { he, type Translations } from "./he";
import { ru } from "./ru";
import type { Lang } from "../types";

export { he, ru };
export type { Translations };

export const i18n = { he, ru };

export function getTranslations(lang: Lang): Translations {
  return lang === "he" ? he : ru;
}
