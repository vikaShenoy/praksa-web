import { createContext } from 'react'

interface GroupContextProps {
  showViewGroups: boolean
  setShowViewGroups: (show: boolean) => void

  showCreateGroup: boolean
  setShowCreateGroup: (show: boolean) => void

  selectedGroup: string | null
  setSelectedGroup: (uuid: string | null) => void
}

export const defaultGroupContextValue = {
  showViewGroups: false,
  setShowViewGroups: () => {},
  showCreateGroup: false,
  setShowCreateGroup: () => {},
  selectedGroup: null,
  setSelectedGroup: () => {},
}

const GroupContext = createContext<GroupContextProps>(defaultGroupContextValue)
export default GroupContext
