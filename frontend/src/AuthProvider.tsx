
import { createContext, useContext, useState, useEffect, type ReactNode} from "react";

const AuthContext = createContext(null); 

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await fetch("/api/get-authenticated", {
                credentials: "include",
            }); 
            const data = await res.json();
            if (data.isAuthenticated) {
                setUser(data.user); 
            } else {
                setUser(null); 
            }
        } catch (error) {
            console.error("Failed to fetch user: ", error)
        }
    }

    useEffect(() => { // this is running every time any page gets refreshed, is there any way to change so it only gets refreshed when needed 
        fetchUser(); 
    }, [])

    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    // if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context; 
}