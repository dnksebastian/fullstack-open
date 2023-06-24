import { useState } from 'react'

import axios from 'axios'


export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const resetAll = () => {
        setValue('')
    }

    const fieldProps = {
        type,
        value,
        onChange
    }
  
    return {
      fieldProps,
      resetAll
    }
  }
  

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    
    
    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
        // console.log('received');
    }
  
    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        const updatedResources = [...resources, response.data]
        setResources(updatedResources)
        // console.log('created');
    }
  
    const service = {
        getAll,
        create
    }
  
    return [
      resources, service
    ]
  }