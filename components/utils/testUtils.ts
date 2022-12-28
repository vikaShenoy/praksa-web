import { fireEvent } from '@testing-library/react'

export function inputText(element: any, text: string) {
  fireEvent.change(element, { target: { value: text } })
}
