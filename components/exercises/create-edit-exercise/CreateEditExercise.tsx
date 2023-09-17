import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Exercise } from '../../../models/Exercise'
import { Input } from '../../../styles/wrappers/components'
import { ErrorText, Label } from '../../../styles/wrappers/fonts'
import PrimaryBtn from '../../buttons/primary-btn/PrimaryBtn'

const FormWrapper = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'name name'
    'currentBpm targetBpm'
    'duration .'
    'btns btns';

  row-gap: ${(props) => props.theme.spacing.xs};
  column-gap: ${(props) => props.theme.spacing.xs};

  height: 100%;
  width: 100%;
`

const FieldPair = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  max-width: 100%;
`

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
  grid-area: btns;
  margin-top: auto;
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

  const defaultFormValues: ExerciseForm = {
    name: exercise ? exercise.name : '',
    currentBpm: exercise ? exercise.currentBpm : undefined,
    targetBpm: exercise ? exercise.targetBpm : undefined,
    durationSeconds: exercise ? exercise.durationSeconds : undefined,
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
      onSubmit={onSubmit}
    >
      {({ handleChange, errors, submitCount, values }) => (
        <FormWrapper>
          <FieldPair style={{ gridArea: 'name' }}>
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

          <FieldPair style={{ gridArea: 'currentBpm' }}>
            <Label htmlFor="currentBpm">{t('exercises.form.currentBpm')}</Label>
            <Field
              id="currentBpm"
              component={Input}
              type="number"
              onChange={handleChange}
              value={values.currentBpm}
              placeholder="180"
            />
          </FieldPair>

          <FieldPair style={{ gridArea: 'targetBpm' }}>
            <Label htmlFor="targetBpm">{t('exercises.form.targetBpm')}</Label>
            <Field
              id="targetBpm"
              component={Input}
              type="number"
              onChange={handleChange}
              value={values.targetBpm}
              placeholder="210"
            />
          </FieldPair>

          <FieldPair style={{ gridArea: 'duration' }}>
            <Label htmlFor="durationSeconds">
              {t('exercises.form.duration')}
            </Label>
            <Field
              id="durationSeconds"
              component={Input}
              type="number"
              onChange={handleChange}
              value={values.durationSeconds}
              placeholder="180"
            />
          </FieldPair>

          <BtnContainer>
            <PrimaryBtn text={t('common.cancel')} onClick={onCancel} isFluid />
            <PrimaryBtn isSubmitBtn text={t('common.save')} isFluid />
          </BtnContainer>
        </FormWrapper>
      )}
    </Formik>
  )
}

export default CreateEditExercise
