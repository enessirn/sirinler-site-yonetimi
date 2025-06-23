function Navbar() {
    return (
        <nav className="bg-white shadow-md w-full h-16 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
                <a href="/dashboard" className="font-bold text-2xl text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                    Bina Yönetim Paneli
                </a>
            </div>

            <div className="flex items-center">
                <a
                    href="/logout"
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors text-sm"
                >
                    Çıkış
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
