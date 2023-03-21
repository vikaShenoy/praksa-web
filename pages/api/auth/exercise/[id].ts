import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const userId = session?.user.id

  if (!userId) {
    return res.status(401)
  }

  try {
    if (req.method === 'PATCH') {
      // TODO
      return res.status(501)
    } else if (req.method === 'DELETE') {
      // TODO
      return res.status(501)
    }
  } catch (e) {
    console.error(e)
    return res.status(500)
  }

  return res.status(500).json({ error: 'Route not implemented' })
}
