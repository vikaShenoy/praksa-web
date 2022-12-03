import { Field, Formik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css, useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Exercise } from '../../models/Exercise'
import { Card, Input } from '../../styles/wrappers/components'
import { BodyText, BoldText, Label } from '../../styles/wrappers/fonts'
import PrimaryBtn from '../buttons/primary-btn/PrimaryBtn'
import SecondaryBtn from '../buttons/secondary-btn/SecondaryBtn'

interface ExerciseForm {
  name: string
  currentBpm?: number
  targetBpm?: number
  durationSeconds?: number
}

const ExercisesCard = styled(Card)`
  gap: ${(props) => props.theme.spacing.lg};
  justify-content: flex-start;
`

const MarginTopWrapper = styled.div`
  margin-top: auto;
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
`

const FieldPair = styled.div<{ solo?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  min-width: 0;

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

const Exercises = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const defaultValues = {
    name: '',
    currentBpm: undefined,
    targetBpm: undefined,
    durationSeconds: undefined,
  }

  function validate() {
    // TODO
    const errors = {}
    return errors
  }

  function onSubmit(values: any, { setSubmitting }: { setSubmitting: any }) {
    // TODO
    console.log('submitting!', values)
    return
  }

  return (
    <ExercisesCard isMobile={isMobile}>
      <BoldText>{t('exercises.title')}</BoldText>
      {isEditing && (
        <Formik
          initialValues={defaultValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <FieldPair>
                <Label htmlFor="name">{t('exercises.form.name')}</Label>
                <Field name="name" component={Input} />
              </FieldPair>

              <FlexRow>
                <FieldPair>
                  <Label htmlFor="currentBpm">
                    {t('exercises.form.currentBpm')}
                  </Label>
                  <Field name="currentBpm" component={Input} type="number" />
                </FieldPair>

                <FieldPair>
                  <Label htmlFor="targetBpm">
                    {t('exercises.form.targetBpm')}
                  </Label>
                  <Field name="targetBpm" component={Input} />
                </FieldPair>
              </FlexRow>

              <FieldPair solo>
                <Label htmlFor="durationSeconds">
                  {t('exercises.form.duration')}
                </Label>
                <Field name="durationSeconds" component={Input} />
              </FieldPair>

              <FlexRowCenter>
                <PrimaryBtn text={t('common.cancel')} onClick={() => setIsEditing(false)} />
                <PrimaryBtn isSubmitBtn text={t('common.save')} />
              </FlexRowCenter>
            </FormWrapper>
          )}
        </Formik>
      )}

      {!isEditing && exercises.length > 0 && (
        <>
          <p>Content!</p>
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
