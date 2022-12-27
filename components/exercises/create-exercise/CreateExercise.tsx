import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
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

interface CreateExerciseProps {
  onCreate: (
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) => void,
  onCancel: () => void
}

const CreateExercise: React.FC<CreateExerciseProps> = ({ onCreate, onCancel }) => {
  const { t } = useTranslation()

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

  return (
    <Formik
      initialValues={defaultFormValues}
      validate={validateExerciseForm}
      onSubmit={onCreate}
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
              <Label htmlFor="targetBpm">{t('exercises.form.targetBpm')}</Label>
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
              onClick={onCancel}
            />
            <PrimaryBtn isSubmitBtn text={t('common.save')} />
          </FlexRowCenter>
        </FormWrapper>
      )}
    </Formik>
  )
}

export default CreateExercise
