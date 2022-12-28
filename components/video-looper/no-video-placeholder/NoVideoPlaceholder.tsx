import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { BodyText } from "../../../styles/wrappers/fonts"

const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.background};
`

const NoVideoPlaceholder = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <BodyText>
        {t('video_looper.placeholder')}
      </BodyText>
    </Container>
  )
}

export default NoVideoPlaceholder