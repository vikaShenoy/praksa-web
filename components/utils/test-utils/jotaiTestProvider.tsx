import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

interface Props {
  initialValues: any
  children: JSX.Element
}

const HydrateAtoms = ({ initialValues, children }: Props) => {
  useHydrateAtoms(initialValues)
  return children
}

export const JotaiTestProvider = ({ initialValues, children }: Props) => {
  return (
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  )
}
