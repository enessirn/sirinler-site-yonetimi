import { useState, useEffect } from 'react';
import { Modal } from 'antd'
import axios from "axios"
function Transactions() {
  const [allTransactions, setAllTransactions] = useState([]);
  const getAllTransactions = async () => {
    try {
      const getAll = await axios.get("http://localhost:3000/api/transactions");
      console.log(getAll.data);
      setAllTransactions(getAll.data.reverse())
    } catch (error) {
      console.error("Error fetching all transactions: ", error)
    }
  }

  useEffect(() => {
    getAllTransactions()

  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allTransactions.slice(startIndex, startIndex + itemsPerPage);



  const showModal = (t) => {
    setSelectedTransaction(t)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-600 tracking-tight mb-4 border-b border-gray-200">İşlem Geçmişi</h2>

      <div className="flex flex-col divide-y divide-gray-200">
        {currentItems.map((t) => (
          <div
            key={t._id}
            onClick={() => showModal(t)}
            className="flex justify-between items-center px-4 py-5 bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            <div className={`text-base font-semibold w-24 ${t.type === "gelir" ? "text-green-500" : "text-red-500"}`}>
              {t.type === "gelir" ? "+" : "-"}{t.amount} ₺
            </div>

            <div className="flex-1 mx-2 text-gray-800 font-medium truncate">
              {t.title.length > 50 ? t.title.slice(0, 50) + '...' : t.title}
            </div>

            <div className="text-sm text-gray-400 w-28 text-right">{
              new Intl.DateTimeFormat("tr-TR", {
                timeZone: "Europe/Istanbul",
                month: "short",
                day: "numeric",
              }).format(new Date(t.date))}</div>
          </div>
        ))}
      </div>

      {/* modal */}

      <Modal
        title="İşlem Detayı"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {
          selectedTransaction && (
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Miktar:</span>
                <span className={`font-semibold ${selectedTransaction.type === "gelir" ? "text-green-500" : "text-red-500"}`}>
                  {selectedTransaction.type === "gelir" ? "+" : "-"}{selectedTransaction.amount} ₺
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Başlık:</span>
                <span className="text-right max-w-[60%]">{selectedTransaction.title}</span>
              </div>


              {
                selectedTransaction.desc.trim() !== "" && (
                  <div className="flex justify-between">
                    <span className="font-medium">Açıklama:</span>
                    <span className="text-right max-w-[60%]">{selectedTransaction.desc}</span>
                  </div>
                )
              }
              <div className="flex justify-between">
                <span className="font-medium">Tarih:</span>
                <span>{
                  new Intl.DateTimeFormat("tr-TR", {
                    timeZone: "Europe/Istanbul",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  }).format(new Date(selectedTransaction.date))}</span>
              </div>
            </div>
          )
        }
      </Modal>
      {/* sayfalar gecisi */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer "
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        <span className="text-sm text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer "
          disabled={currentPage === totalPages}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}

export default Transactions;
