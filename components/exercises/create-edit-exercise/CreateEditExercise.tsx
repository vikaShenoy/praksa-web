import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { Exercise } from '../../../models/Exercise'
import { Input } from '../../../styles/wrappers/components'
import { ErrorText, Label } from '../../../styles/wrappers/fonts'
import PrimaryBtn from '../../buttons/primary-btn/PrimaryBtn'

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

export interface ExerciseForm {
  name: string
  currentBpm?: number
  targetBpm?: number
  durationSeconds?: number
}

interface CreateEditExerciseProps {
  onSubmit: (
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) => void
  onCancel: () => void
  exercise?: Exercise
}

const CreateEditExercise: React.FC<CreateEditExerciseProps> = ({
  onSubmit,
  onCancel,
  exercise,
}) => {
  const { t } = useTranslation()

  console.log(`Exercise: ${exercise?.name}`)

  const defaultFormValues: ExerciseForm = {
    name: exercise ? exercise.name : '',
    currentBpm: exercise ? exercise.currentBpm : undefined,
    targetBpm: exercise ? exercise.targetBpm : undefined,
    durationSeconds: exercise ? exercise.durationSeconds : undefined,
  }

  console.log(defaultFormValues)

  function validateExerciseForm(values: ExerciseForm) {
    const errors: FormikErrors<ExerciseForm> = {}
    if (!values.name) {
      errors.name = t('errors.field_required')
    }
    return errors
  }

  return (
    <Formik
      initialValues={defaultFormValues}
      validate={validateExerciseForm}
      onSubmit={onSubmit}
    >
      {({ handleChange, errors, submitCount, values }) => (
        <FormWrapper>
          <FieldPair>
            <Label htmlFor="name">{t('exercises.form.name')}</Label>
            <Field
              id="name"
              value={values.name}
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
                value={values.currentBpm}
                placeholder="180"
              />
            </FieldPair>

            <FieldPair>
              <Label htmlFor="targetBpm">{t('exercises.form.targetBpm')}</Label>
              <Field
                id="targetBpm"
                component={Input}
                onChange={handleChange}
                value={values.targetBpm}
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
              value={values.durationSeconds}
              placeholder="180"
            />
          </FieldPair>

          <FlexRowCenter>
            <PrimaryBtn text={t('common.cancel')} onClick={onCancel} />
            <PrimaryBtn isSubmitBtn text={t('common.save')} />
          </FlexRowCenter>
        </FormWrapper>
      )}
    </Formik>
  )
}

export default CreateEditExercise