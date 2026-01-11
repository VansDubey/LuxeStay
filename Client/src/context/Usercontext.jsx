import { createContext,useContext,useState,useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({})

export  function UserContextProvider({children}){
    const [user, setuser] = useState('')
    const [ready, setready] = useState(false)
    useEffect(() => {
       if(!user){
        axios.get('http://localhost:3000/profile').then(({data})=>{
            setuser(data);
            setready(true);
        })
       }
    }, [])
    
return(
    <UserContext.Provider value={{user,setuser}}>
           {children}
    </UserContext.Provider>   
)
}