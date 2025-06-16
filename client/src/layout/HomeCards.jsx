import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { DollarOutlined, FileTextOutlined, NotificationOutlined, InfoCircleOutlined } from '@ant-design/icons';
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // aidats check
  const[aidatsLength,setAidatsLength] = useState(null);
  const[doneLength, setDoneLength] = useState(null)
  const getAidats = async () => {
    try {
      const getAllPerson = await axios.get("http://localhost:3000/api/persons");
      const filteredGaveAidat = getAllPerson.data.filter(t => t.aidat === true);
      if(!getAllPerson) return console.error("Error aidatlar fetching")
      
      setAidatsLength(getAllPerson.data.length)
      setDoneLength(filteredGaveAidat.length)

    } catch (error) {
      console.error("Aidatlar fetching", error)
    }
  }



  useEffect(() => {
    getAmount()
    getAidats()
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
            <p className="text-lg font-bold text-gray-900">{doneLength} / {aidatsLength}</p>
          </div>
        </div>

        {/* Duyurular */}
        <div className="flex-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer" onClick={showModal}>
          <div className="bg-yellow-100 p-3 rounded-xl">
            <NotificationOutlined className="text-yellow-600 text-2xl" />
          </div>
          <div >
            <h3 className="text-gray-600 text-sm font-medium">Duyurular</h3>
            <p className="text-lg font-bold text-gray-900">1 yeni</p>
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 text-blue-600 text-lg font-semibold">
            <InfoCircleOutlined />
            Duyurular
          </div>
        }
        closable={{ "aria-label": "Kapat" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="text-center px-2 py-4">
          <p className="text-gray-700 text-base mb-2">
            Duyurular bölümü şu anda <span className="font-semibold text-red-500">kullanıma kapalıdır</span>.
          </p>
          <p className="text-gray-500 text-sm">
            En kısa sürede aktif edilecektir. İlginiz için teşekkür ederiz.
          </p>
        </div>
      </Modal>
    </>
  )
}

export default HomeCards
