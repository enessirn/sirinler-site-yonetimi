import Login from "../components/Login"
function Header() {
    return (

        <header className="w-full h-16 lg:h-24 shadow-md bg-white mb-6 border-b border-gray-200 px-6 flex justify-between items-center">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 tracking-tight">
                Şirinler Sitesi
            </h1>
            <Login />
        </header>
    )
}

export default Header