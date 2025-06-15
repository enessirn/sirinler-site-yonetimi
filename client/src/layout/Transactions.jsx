import { useState } from 'react';

function Transactions() {
  const allTransactions = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    amount: i % 2 === 0 ? `+${100 + i} ₺` : `-${100 + i} ₺`,
    title: `İşlem ${i + 1}`,
    date: `2024-06-${(i % 30) + 1}`
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allTransactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-600 tracking-tight mb-4 border-b border-gray-200">İşlem Geçmişi</h2>

      <div className="flex flex-col divide-y divide-gray-200">
        {currentItems.map((t) => (
          <div
            key={t.id}
            onClick={() => console.log('Modal açılacak:', t)}
            className="flex justify-between items-center px-4 py-5 bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            <div className={`text-base font-semibold w-24 ${t.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
              {t.amount}
            </div>

            <div className="flex-1 mx-2 text-gray-800 font-medium truncate">
              {t.title.length > 50 ? t.title.slice(0, 50) + '...' : t.title}
            </div>

            <div className="text-sm text-gray-400 w-28 text-right">{t.date}</div>
          </div>
        ))}
      </div>


      {/* sayfalar gecisi */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer font-black"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className="text-sm text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer font-black"
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Transactions;
