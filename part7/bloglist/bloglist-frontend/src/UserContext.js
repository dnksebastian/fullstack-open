import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
  switch(action.type) {
  case 'LOGIN': {
    const newUserObj = {
      token: action.payload.token,
      username: action.payload.username,
      name: action.payload.name,
    }
    return state = newUserObj
  }
  case 'LOGOUT': {
    console.log('logging out')
    return state = null
  }
  default:
    return state
  }
}


const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}
export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}


export default UserContext