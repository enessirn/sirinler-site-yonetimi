import React from 'react';
import { HomeOutlined, FileTextOutlined, TeamOutlined, NotificationOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router';

function Cards() {
    const location = useLocation();

    const cardData = [
        { title: 'Aidat', href: "aidats", icon: <HomeOutlined style={{ fontSize: '24px' }} />, color: '#1677ff'},
        { title: 'İşlemler', href: "transaction", icon: <FileTextOutlined style={{ fontSize: '24px' }} />, color: '#52c41a' },
        { title: 'Kişiler', href: "contacts", icon: <TeamOutlined style={{ fontSize: '24px' }} />, color: '#9254de' },
        { title: 'Duyurular', href: "events", icon: <NotificationOutlined style={{ fontSize: '24px' }} />, color: '#fa8c16' },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto mt-8 px-4">
            {/* Masaüstü görünüm */}
            <div className="hidden md:grid grid-cols-4 gap-4">
                {cardData.map((card, index) => (
                    <NavLink key={index} to={card.href}>
                        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                            {React.cloneElement(card.icon, { style: { fontSize: '32px', color: card.color } })}
                            <h2 className="mt-4 text-lg font-semibold text-gray-800">{card.title}</h2>
                        </div>
                    </NavLink>
                ))}
            </div>

            {/* Mobil alt menü */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t border-gray-200 flex justify-around items-center py-2 md:hidden">
                {cardData.map((card, index) => (
                    <NavLink 
                        key={index} 
                        to={card.href}
                        className={`flex flex-col items-center text-xs ${location.pathname === card.href ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                         {React.cloneElement(card.icon, { style: { fontSize: '24px' } })}
                        <span className="mt-1">{card.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Cards;
