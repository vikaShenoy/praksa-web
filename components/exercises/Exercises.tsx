import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css, useTheme } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Exercise } from '../../models/Exercise'
import { Card, Input } from '../../styles/wrappers/components'
import {
  BodyText,
  BoldText,
  ErrorText,
  Label
} from '../../styles/wrappers/fonts'
import PrimaryBtn from '../buttons/primary-btn/PrimaryBtn'
import SecondaryBtn from '../buttons/secondary-btn/SecondaryBtn'

const ExercisesCard = styled(Card)`
  gap: ${(props) => props.theme.spacing.lg};
  justify-content: flex-start;
`

const MarginTopWrapper = styled.div`
  margin-top: auto;
`

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
`

const FieldPair = styled.div<{ solo?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  width: 100%;

  ${(props) =>
    props.solo &&
    css`
      width: calc(50% - 0.5rem);
    `};
`

const FlexRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
`

const FlexRowCenter = styled(FlexRow)`
  margin-top: 1rem;
  justify-content: center;
`

interface ExerciseForm {
  name: string
  currentBpm?: number
  targetBpm?: number
  durationSeconds?: number
}

const Exercises = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const defaultFormValues: ExerciseForm = {
    name: '',
    currentBpm: undefined,
    targetBpm: undefined,
    durationSeconds: undefined,
  }

  function validateExerciseForm(values: ExerciseForm) {
    const errors: FormikErrors<ExerciseForm> = {}
    if (!values.name) {
      errors.name = t('errors.field_required')
    }
    return errors
  }

  function onSubmit(
    values: ExerciseForm,
    { setSubmitting, resetForm }: FormikHelpers<ExerciseForm>
  ) {
    setSubmitting(true)
    // TODO - remove dev code and use a real API request to persist the new exercise
    const exercise: Exercise = {
      id: uuidv4(),
      createdAt: new Date(),
      ...values,
    }
    setExercises([exercise])
    setSubmitting(false)
    setIsEditing(false)
    return
  }

  return (
    <ExercisesCard isMobile={isMobile}>
      <BoldText>{t('exercises.title')}</BoldText>
      {isEditing && (
        <Formik
          initialValues={defaultFormValues}
          validate={validateExerciseForm}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleChange, errors, submitCount }) => (
            <FormWrapper>
              <FieldPair>
                <Label htmlFor="name">{t('exercises.form.name')}</Label>
                <Field
                  id="name"
                  component={Input}
                  placeholder={t('placeholders.exercise_name')}
                  onChange={handleChange}
                />
                {submitCount > 0 && errors.name && (
                  <ErrorText>{errors.name}</ErrorText>
                )}
              </FieldPair>

              <FlexRow>
                <FieldPair>
                  <Label htmlFor="currentBpm">
                    {t('exercises.form.currentBpm')}
                  </Label>
                  <Field
                    id="currentBpm"
                    component={Input}
                    type="number"
                    onChange={handleChange}
                    placeholder="180"
                  />
                </FieldPair>

                <FieldPair>
                  <Label htmlFor="targetBpm">
                    {t('exercises.form.targetBpm')}
                  </Label>
                  <Field
                    id="targetBpm"
                    component={Input}
                    onChange={handleChange}
                    placeholder="210"
                  />
                </FieldPair>
              </FlexRow>

              <FieldPair solo>
                <Label htmlFor="durationSeconds">
                  {t('exercises.form.duration')}
                </Label>
                <Field
                  id="durationSeconds"
                  component={Input}
                  onChange={handleChange}
                  placeholder="180"
                />
              </FieldPair>

              <FlexRowCenter>
                <PrimaryBtn
                  text={t('common.cancel')}
                  onClick={() => setIsEditing(false)}
                />
                <PrimaryBtn isSubmitBtn text={t('common.save')} />
              </FlexRowCenter>
            </FormWrapper>
          )}
        </Formik>
      )}

      {!isEditing && exercises.length > 0 && (
        <>
          {exercises.map((exercise) => (
            <div key={exercise.id}>
              <BodyText>{exercise.name}</BodyText>
            </div>
          ))}
          <MarginTopWrapper>
            <SecondaryBtn
              text={t('common.add')}
              onClick={() => setIsEditing(true)}
            />
          </MarginTopWrapper>
        </>
      )}

      {!isEditing && exercises.length === 0 && (
        <>
          <BodyText>{t('exercises.prompt')}</BodyText>
          <MarginTopWrapper>
            <SecondaryBtn
              text={t('common.add')}
              onClick={() => setIsEditing(true)}
            />
          </MarginTopWrapper>
        </>
      )}
    </ExercisesCard>
  )
}

export default Exercises
