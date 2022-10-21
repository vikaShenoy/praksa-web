import { ExerciseLog } from './ExerciseLog'

export interface Exercise {
  uuid: string
  exerciseGroupUuid: string
  name: string
  description?: string
  initialBpm?: number
  targetBpm?: number
  logs?: ExerciseLog[]
}
