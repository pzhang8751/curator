
import { useState } from "react";

const AccountInformationPage = () => {

    const [hidden, setHidden] = useState(true);

    return (
        <div className="w-full h-screen bg-white">
            <h1 className="font-bold text-4xl">Account Information</h1>
        </div>
    )
}

export default AccountInformationPage