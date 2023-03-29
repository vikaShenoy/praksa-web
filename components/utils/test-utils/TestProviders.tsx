import { FC } from 'react'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import i18n from '../../../i18n/i18n'
import Theme from '../../Theme'

interface TestProvidersProps {
  children: JSX.Element
}

export const TestProviders: FC<TestProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <I18nextProvider i18n={i18n}>
        <Theme>{children}</Theme>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
