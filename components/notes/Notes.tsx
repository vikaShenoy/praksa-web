import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useGetNotes } from '../../hooks/api/notes/useGetNotes'
import { useUpdateNotes } from '../../hooks/api/notes/useUpdateNotes'
import { Card } from '../../styles/wrappers/components'
import { BodyText, BoldText } from '../../styles/wrappers/fonts'
import SecondaryBtn from '../buttons/secondary-btn/SecondaryBtn'

const NotesCard = styled(Card)<{ spaceBetween: boolean }>`
  gap: ${(props) => props.theme.spacing.md};
  justify-content: flex-start;
`

const TextInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.faded};
  resize: none;

  border: none;

  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.accent};
  }
`

const NotesContainer = styled(BodyText)`
  width: 100%;
  text-align: left;
  white-space: pre;
  padding: ${(props) => props.theme.spacing.sm};
`

const BtnWrapper = styled.div`
  margin-top: auto;
`

const EditBtnContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`

const Notes = () => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const { data: notes, refetch: refetchNotes } = useGetNotes()
  const { mutate: updateNotes } = useUpdateNotes()
  const notesInput = useRef<HTMLTextAreaElement>(null)

  function onSave() {
    if (
      notesInput &&
      notesInput.current &&
      notesInput.current.value.length > 0
    ) {
    }
    const updatedNotes = notesInput.current!.value
    updateNotes(updatedNotes, {
      onSuccess: () => {
        refetchNotes()
      },
    })
    setIsEditing(false)
  }

  return (
    <NotesCard gridArea="notes" spaceBetween={!isEditing && !!notes}>
      <BoldText>{t('notes.title')}</BoldText>
      {isEditing && (
        <>
          <TextInput
            rows={10}
            ref={notesInput}
            defaultValue={notes}
            role="textbox"
          />
          <EditBtnContainer>
            <SecondaryBtn
              text={t('common.cancel')}
              onClick={() => setIsEditing(false)}
            />
            <SecondaryBtn text={t('common.save')} onClick={onSave} />
          </EditBtnContainer>
        </>
      )}

      {!isEditing && !notes && (
        <>
          <BodyText>{t('notes.prompt')}</BodyText>
          <BtnWrapper>
            <SecondaryBtn
              text={t('common.add')}
              onClick={() => setIsEditing(true)}
            />
          </BtnWrapper>
        </>
      )}

      {!isEditing && !!notes && (
        <>
          <NotesContainer>{notes}</NotesContainer>
          <BtnWrapper>
            <SecondaryBtn
              text={t('common.edit')}
              onClick={() => setIsEditing(true)}
            />
          </BtnWrapper>
        </>
      )}
    </NotesCard>
  )
}

export default Notes
