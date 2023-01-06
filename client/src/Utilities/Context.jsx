import { createContext, useState } from 'react'


export const ModalContext = createContext(null)

export const UserContext = createContext(null)

export const FriendContext = createContext(null)

export const UserFollowersContext = createContext(null)

export const ErrorContext = createContext(null)


export const Modal = ({children}) => {

    const [showmodal, setShowModal] = useState(false)

    return (

        <ModalContext.Provider  value={{ showmodal, setShowModal }}>

            {children}

        </ModalContext.Provider>

    )

}


export const User = ({children})=>{

    const [user,setUser] = useState()
      
    return(
        <UserContext.Provider value={{user,setUser}}>
          {children}
        </UserContext.Provider>
    )
   

}


export const Friend = ({children})=>{

      const [friend,setFriend] = useState()

      return(

        <FriendContext.Provider value={{friend,setFriend}}>
            {children}
        </FriendContext.Provider>
         
      )

} 


export const Follow = ({children})=>{
    
    const[userFollower,setUserFollower] = useState()

    return(
        <FriendContext.Provider value={{userFollower,setUserFollower}}>

            {children}
   
        </FriendContext.Provider>
    )

}



export const Errors = ({children})=>{
     
    const [errors,setErrors] = useState()

    return(
        <ErrorContext.Provider value={{errors,setErrors}}>
              {children}

        </ErrorContext.Provider>
    )

}