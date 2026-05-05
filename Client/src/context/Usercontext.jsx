import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../config/api";
export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setuser] = useState('')
    const [ready, setready] = useState(false)
    useEffect(() => {
        if (!user) {
            axios.get(API_ENDPOINTS.AUTH.PROFILE).then(({ data }) => {
                setuser(data);
                setready(true);
            }).catch(() => {
                setuser(null);
                setready(true);
            });
        } else {
            setready(true);
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setuser, ready }}>
            {children}
        </UserContext.Provider>
    )
}