
import { useState } from "react";
import { useAuth } from "../../AuthProvider";
import { LogoutButton } from "./LogoutButton";

const AccountInformationPage = () => {

    const user = useAuth();
    console.log(user);

    const [hidden, setHidden] = useState(true);

    return (
        <div className="w-full h-screen bg-white">
            <h1 className="font-bold text-4xl">Account Information</h1>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default AccountInformationPage