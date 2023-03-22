import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

interface UpdateExerciseData {
  name?: string
  durationSeconds?: number
  currentBpm?: number
  targetBpm?: number
}

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
      await prisma?.exercise.update({ where: { id }, data })
      return res.status(200).end()
    } else if (req.method === 'DELETE') {
      const exercise = await prisma?.exercise.findUnique({
        where: {
          id,
        }
      })
      if (!exercise) {
        return res.status(404).end()
      }
      await prisma?.exercise.delete({where: { id }})
      return res.status(200).end()
    }
  } catch (e) {
    return res.status(500).end()
  }

  return res.status(500).json({ error: 'Route not implemented' })
}
