import { useQuery } from 'react-query'

async function getNotes(): Promise<string> {
  const res = await fetch('/api/notes', { method: 'GET' })

  if (!res.ok) {
    const json = await res.json()
    let error = 'Error getting notes'
    if (json.error) {
      error = json.error
    }
    throw new Error(error)
  }

  const json = await res.json()
  return json.data.user.notes
}

export const useGetNotes = () => {
  return useQuery(['notes'], getNotes)
}
