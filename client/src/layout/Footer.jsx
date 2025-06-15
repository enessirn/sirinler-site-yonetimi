import React from 'react'

function Footer() {
    const d = new Date();
    return (
        <footer className="w-full bg-white border-t border-gray-200 mt-16 px-6 py-10 shadow-inner">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Şirinler Sitesi</h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        Apartman gelir ve gider takibini modernleştiriyoruz. Güvenli, hızlı ve kullanıcı dostu bir deneyim.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">İletişim</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a
                                href="mailto:enessirinbusiness@gmail.com"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                enessirinbusiness@gmail.com
                            </a>
                        </li>
                        
                    </ul>
                </div>

            </div>

            <div className="mt-8 text-center text-xs text-gray-400">
                © {String(d.getFullYear())} Şirinler Sitesi
            </div>
        </footer>

    )
}

export default Footer