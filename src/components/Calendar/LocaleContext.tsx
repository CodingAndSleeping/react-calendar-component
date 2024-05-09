import { createContext } from 'react'
import { languageType } from './locale'

export interface LocaleContextType {
  locale: languageType
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'zh-CN',
})

export default LocaleContext
