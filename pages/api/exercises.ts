import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: any = await getServerSession(req, res, authOptions)
  const userId = session?.user.id

  if (!userId) {
    return res.status(401)
  }

  if (req.method === 'GET') {
    try {
      const exercises = await prisma?.exercise.findMany({
        where: {
          userId,
        },
      })
      return res.status(200).json({ data: exercises })
    } catch (error) {
      return res.status(500)
    }
  }

  return res.status(500).json({ error: 'Route does not exist ' })
}
