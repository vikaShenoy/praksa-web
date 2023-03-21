import { useTranslation } from 'react-i18next'
import { FaSadCry } from 'react-icons/fa'
import { useTheme } from 'styled-components'
import { FlexColumn } from '../../styles/wrappers/containers'
import { ErrorText } from '../../styles/wrappers/fonts'

export const ExerciseLoadingError = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <FlexColumn gap={16}>
      <FaSadCry role="img" color={theme.colors.error} fontSize={36} />
      <ErrorText>{t('errors.exercise_loading')}</ErrorText>
    </FlexColumn>
  )
}
