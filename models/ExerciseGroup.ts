import { Exercise } from "./Exercise"

export interface ExerciseGroup {
  uuid: string
  name: string
  exercises: Exercise[]
}