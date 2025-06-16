import React, { useEffect, useState } from 'react'
import { DollarOutlined, FileTextOutlined, NotificationOutlined } from '@ant-design/icons';
import axios from "axios"
import SlotCounter from 'react-slot-counter';
function HomeCards() {
  const [amount, setAmount] = useState(Number);
  const getAmount = async () => {
    try {
      const getAmount = await axios.get("http://localhost:3000/api/transactions/amounts");
      console.log(getAmount.data);
      setAmount(getAmount.data.totalAmount);
    } catch (error) {
      console.error("Error fetching all transactions: ", error)
    }
  }

  useEffect(() => {
    getAmount()
  }, [])
  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-stretch">
        {/* Bakiye */}
        <div className="flex-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <div className="bg-green-100 p-3 rounded-xl">
            <DollarOutlined className="text-green-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Bakiye</h3>
            <div className="text-lg font-bold text-gray-900 flex flex-row">
              <SlotCounter value={amount} />
              <div className='mt-[2px] ml-2'>₺</div>
              
              </div>
          </div>
        </div>

        {/* Aidatlar */}
        <div className="flex-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <div className="bg-blue-100 p-3 rounded-xl">
            <FileTextOutlined className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Aidatlar</h3>
            <p className="text-lg font-bold text-gray-900">11 / 13</p>
          </div>
        </div>

        {/* Duyurular */}
        <div className="flex-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <div className="bg-yellow-100 p-3 rounded-xl">
            <NotificationOutlined className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Duyurular</h3>
            <p className="text-lg font-bold text-gray-900">3 yeni</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeCards
