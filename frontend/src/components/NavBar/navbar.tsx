import LoginButton from "./loginbutton";
import SearchBar from "./searchbar";
import { useAuth } from "../../AuthProvider";

const NavBar = () => {
    // this is an error 
    const user = useAuth(); 

    console.log(user);

    return (
        <nav className="w-full h-16 bg-white fixed flex flex-row">
            {/* <SearchBar></SearchBar> */}
            <LoginButton></LoginButton>
        </nav>
    )
}

export default NavBar; 