import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Exercise } from '../../../models/Exercise'
import { FieldLabelText } from '../../../styles/fonts'
import PrimaryBtn from '../../buttons/primary-btn/PrimaryBtn'

const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.tertiary};
  padding: ${(props) => props.theme.spacing.sm};
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.disabled};
  height: 3rem;
  padding: ${(props) => props.theme.spacing.sm};
`

interface Props {
  onSave: (exercise: Exercise) => void
}

const AddExercisePanel = ({ onSave }: Props) => {
  const { t } = useTranslation()
  const [isValid, setIsValid] = useState(false)

  const onSaveClick = () => {
    // TODO
  }

  return (
    <Container>
      <Field>
        <FieldLabelText>{t('exercise.exercise_name')}</FieldLabelText>
        <Input />
      </Field>

      <Flex>
        <Field>
          <FieldLabelText>{t('exercise.starting_bpm')}</FieldLabelText>
          <Input />
        </Field>
        <Field>
          <FieldLabelText>{t('exercise.target_bpm')}</FieldLabelText>
          <Input />
        </Field>
      </Flex>

      <Flex>
        <Field>
          <FieldLabelText>{t('exercise.duration')}</FieldLabelText>
          <Input />
        </Field>
        <PrimaryBtn
          text={t('common.save')}
          onClick={onSaveClick}
          disabled={!isValid}
        />
      </Flex>
    </Container>
  )
}

export default AddExercisePanel
