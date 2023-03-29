import { useMutation } from 'react-query'

async function updateNotes(notes?: string) {
  const res = await fetch('/api/notes', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes }),
  })
  if (!res.ok) {
    const json = await res.json()
    let error = 'Error getting notes'
    if (json.error) {
      error = json.error
    }
    throw new Error(error)
  }
}

export function useUpdateNotes() {
  return useMutation(updateNotes, { mutationKey: ['updateNotes'] })
}
