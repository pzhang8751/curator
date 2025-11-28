
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const AccountInformationPage = () => {

    const user = useAuth(); 

    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [])

    return (
        <div className="w-full h-screen bg-white">
            <h1 className="font-bold text-4xl">Account Information</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input id="email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            </form>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default AccountInformationPage