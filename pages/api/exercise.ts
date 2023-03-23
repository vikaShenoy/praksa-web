import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '../../utils/prismadb'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const userId = session?.user.id

  if (!userId) {
    return res.status(401).end()
  }

  try {
    if (req.method === 'POST') {
      const data = req.body
      if (!data.name) {
        return res.status(400).json({ error: 'Name is required' })
      }

      await prisma?.exercise.create({
        data: { ...data, createdAt: new Date(), userId },
      })

      return res.status(200).end()
    }
  } catch (e) {
    return res.status(500).end()
  }

  return res.status(500).json({ error: 'Route not implemented' })
}
