import { ExerciseGroup } from '../models/ExerciseGroup'

export const mockGroups: ExerciseGroup[] = [
  {
    uuid: '1',
    name: 'Lead guitar',
    exercises: [
      {
        uuid: '1',
        exerciseGroup: '1',
        name: 'Tapping',
        initialBpm: 80,
        targetBpm: 120,
      },
      {
        uuid: '2',
        exerciseGroup: '1',
        name: 'Sweeping',
        initialBpm: 120,
        targetBpm: 180,
      },
      {
        uuid: '3',
        exerciseGroup: '1',
        name: 'Alternate picking',
        initialBpm: 145,
        targetBpm: 160,
      },
    ],
  },
  {
    uuid: '2',
    name: 'Rhythm guitar',
    exercises: [
      {
        uuid: '4',
        exerciseGroup: '2',
        name: 'Master of Puppets',
        initialBpm: 190,
        targetBpm: 212,
      },
      {
        uuid: '5',
        exerciseGroup: '2',
        name: 'Downpicking',
        initialBpm: 210,
        targetBpm: 220,
      },
      {
        uuid: '6',
        exerciseGroup: '2',
        name: 'Funk',
        initialBpm: 130,
        targetBpm: 135,
      },
    ],
  },
]
