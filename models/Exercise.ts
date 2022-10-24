import { ExerciseLog } from './ExerciseLog'

export interface Exercise {
  uuid: string
  exerciseGroup: string
  name: string
  description?: string
  initialBpm?: number
  targetBpm?: number
  logs?: ExerciseLog[]
}
