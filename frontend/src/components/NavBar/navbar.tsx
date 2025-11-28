import LoginButton from "./loginbutton";
import ProfileButton from "./profilebutton";
import SearchBar from "./searchbar";

const NavBar = () => {
    // const user = useAuth(); 

    const hasToken = document.cookie.includes("access_token");
    console.log(hasToken);

    return (
        <nav className="w-full h-16 bg-white fixed flex flex-row">
            {/* <SearchBar></SearchBar> */}
            {/* <LoginButton></LoginButton> */}
            {(!hasToken) ? <LoginButton></LoginButton> : <ProfileButton></ProfileButton>}
        </nav>
    )
}

export default NavBar; 