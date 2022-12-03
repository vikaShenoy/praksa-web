export interface Exercise {
  id: string
  name: string
  createdAt: Date
  currentBpm?: number
  targetBpm?: number
  durationSeconds?: number
}