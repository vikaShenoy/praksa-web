import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ExerciseGroup } from "../../models/ExerciseGroup"

const ViewGroups = ({ groups }: { groups: ExerciseGroup[] }) => {
  const [isEmpty] = useState(groups.length === 0)
  const { t } = useTranslation()

  return (
    <div>
      <p>View Groups!</p>
    </div>
  )
}

export default ViewGroups