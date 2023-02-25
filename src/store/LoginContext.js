import { createContext, useState } from "react"

export const LoginContext = createContext(false)

function Login(props) {
  const [login, setLogin] = useState(false)

  return(
    <LoginContext.Provider value={{login, setLogin}}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default Login