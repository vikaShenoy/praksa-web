import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { UpdateExerciseData } from '../../../hooks/api/exercise/useUpdateExercise'
import { prisma } from '../../../utils/prismadb'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const userId = session?.user.id
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).end()
  }

  if (!userId) {
    return res.status(401).end()
  }

  try {
    if (req.method === 'PATCH') {
      const data: UpdateExerciseData = req.body
      const dataWithNulls = addNullsToEditDataIfNeeded(data)
      await prisma?.exercise.update({ where: { id }, data: dataWithNulls })
      return res.status(200).end()
    } else if (req.method === 'DELETE') {
      const exercise = await prisma?.exercise.findUnique({
        where: {
          id,
        },
      })
      if (!exercise) {
        return res.status(404).end()
      }
      await prisma?.exercise.delete({ where: { id } })
      return res.status(200).end()
    }
  } catch (e) {
    return res.status(500).end()
  }

  return res.status(500).json({ error: 'Route not implemented' })
}

function addNullsToEditDataIfNeeded(data: UpdateExerciseData) {
  const { currentBpm, targetBpm, durationSeconds } = data

  const dataWithNulls = {
    ...data,
    currentBpm: currentBpm ? currentBpm : null,
    targetBpm: targetBpm ? targetBpm : null,
    durationSeconds: durationSeconds ? durationSeconds : null,
  }

  return dataWithNulls
}
