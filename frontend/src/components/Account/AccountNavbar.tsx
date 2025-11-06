
const AccountNavbar = () => {

    return (
        <div className="flex flex-col font-semibold text-xl text-nowrap mx-5 *:px-3 *:py-2 *:w-min">
            <a href="/account/edit-profile" className="hover:bg-gray-400">Edit Profile</a>
            <a href="/account/account-information" className="hover:bg-gray-400">Account Information</a>
        </div>
    )
}

export default AccountNavbar