import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '../../utils/prismadb'
import { authOptions } from './auth/[...nextauth]'

interface UpdateNotesReqData {
  notes?: string
}

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
    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      return res.status(200).json({ data: { user: { notes: user?.notes } } })
    } else if (req.method === 'PATCH') {
      const body: UpdateNotesReqData = req.body
      await prisma.user.update({
        where: { id: userId },
        data: { notes: body.notes },
      })
      return res.status(200).end()
    }
  } catch (error) {
    return res.status(500).end()
  }

  return res.status(500).json({ error: 'Route not implemented' })
}
