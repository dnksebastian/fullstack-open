import { useState } from 'react'

export const useField = (type) => {
  
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => {
    setValue('')
  }

  const fieldProps = {
    type,
    value,
    onChange
  }

  return {
    fieldProps,
    resetValue
  }
}