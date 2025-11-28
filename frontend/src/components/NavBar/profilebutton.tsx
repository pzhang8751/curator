import { useState } from "react";

const ProfileButton = () => {

    const [hover, setHover] = useState(false); 

    return (
        <div className="relative justify-self-center place-self-center" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        
            <a href="/account/edit-profile" className="text-white  bg-blue-950 py-3 px-4 rounded-2xl hover:scale-90" >
                Profile
            </a>
            {/* {hover && (
                <div className="flex flex-col z-20 bg-white w-full">
                    <a>
                        Settings
                    </a>
                    <a>
                        Profile
                    </a>
                </div>
            )} */}
        </div>
    )
}

export default ProfileButton