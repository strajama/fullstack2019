import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const print = () => ({
    type, value, onChange
  })

  return {
    type,
    value,
    onChange,
    reset,
    print
  }
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => { // highlighl-line
  // ...
}