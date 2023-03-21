import { FC, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import Theme from '../Theme'

export const Wrappers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Theme>{children}</Theme>
    </I18nextProvider>
  )
}
