import SearchBar from "./searchbar";

const NavBar = () => {
    return (
        <nav className="w-full h-16 bg-blue-900 fixed">
            <SearchBar></SearchBar>
            <a href="/login">Login</a>
        </nav>
    )
}

export default NavBar; 