import { CalendarType } from './interface'
import CalendarLocaleZN from './zh-CN'
import CalendarLocaleEN from './en-US'

export type languageType = 'zh-CN' | 'en-US'

const allLocales: Record<languageType, CalendarType> = {
  'zh-CN': CalendarLocaleZN,
  'en-US': CalendarLocaleEN,
}

export default allLocales
