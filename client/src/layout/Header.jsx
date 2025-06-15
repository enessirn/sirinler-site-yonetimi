function Header() {
    return (

        <header className="w-full h-16 lg:h-24 shadow-md bg-white mb-6 border-b border-gray-200 px-6 flex justify-between items-center">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 tracking-tight">
                Şirinler Sitesi Yönetimi
            </h1>
            <button className="text-sm lg:text-base bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition-all duration-200 cursor-pointer">
                Yönetici Girişi
            </button>
        </header>
    )
}

export default Header