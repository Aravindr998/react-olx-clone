import { createContext, useState } from "react"

export const PostContext = createContext(null)

function Post(props) {
  const [postDetails, setPostDetails] = useState()

  return(
    <PostContext.Provider value={{postDetails, setPostDetails}}>
      {props.children}
    </PostContext.Provider>
  )
}

export default Post