import { ExerciseGroup } from "../../models/ExerciseGroup"

interface Props {
  onCancel: () => void
  onSave: (group: ExerciseGroup) => void
}

const CreateGroup = ({}: Props) => {
  return (
    <div>
      <p>Create!</p>
    </div>
  )
}

export default CreateGroup