import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Aidats() {
  const [aidats, setAidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getAidats = async () => {
    try {
      setLoading(true);
      const res = await await axios.get("http://localhost:3000/api/persons");
      setAidats(res.data);
      console.log(res.data);

    } catch (error) {
      console.error("Error fetching aidats:", error);
      setError("Failed to fetch aidats. Please try again later.");
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAidats();
    console.log("Aidat component mountedd", aidats);
  }, []);

  // reset aidats
  const resetAidats = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:3000/api/persons/reset-all-aidats");
      alert("Aidatlar başarıyla sıfırlandı.");

    } catch (error) {
      console.error("Error resetting aidats:", error);
      setError("Sıfırlanma işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
    finally {
      setLoading(false);
    }
  }
  // reset buton
  const handleResetClick = async () => {
    if (window.confirm("Yeni ay için aidatlar sıfırlanacak. Devam etmek istiyor musunuz?")) {
      await resetAidats();
      await getAidats();
    }
  };

  const handleAddAidat = async (aidatId) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/persons/add-aidat/${aidatId}`);
      console.log(res.data);
      if (res.data.success)
        alert("Aidat başarıyla eklendi.");
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
    finally {
      await getAidats();
    }
  };

  const handleDeleteAidat = async (id, aidatId) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/persons/delete-aidat/${id}/${aidatId}`);
      console.log(res.data);
      if (res.data.success)
        alert("Aidat başarıyla silindi.");

    } catch (error) {
      console.error("Error deleting aidat:", error);
      setError("Aidat silme işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
    finally {
      await getAidats();
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-4 pb-20 md:pb-4">
      <div className="w-full flex flex-row justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">Aidat</h1>
        <button onClick={handleResetClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
          Aidatları Sıfırla
        </button>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Yükleniyor...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aidats.map((aidat) => (
            <div
              key={aidat._id}
              className="flex justify-between items-center px-4 py-5 bg-white hover:bg-gray-50 transition cursor-pointer rounded mb-2"
            >
              <div className={`${aidat.aidat ? "text-sm w-24 text-left text-green-600 font-medium" : "text-sm w-24 text-left text-gray-400 italic"}`}>
                {aidat.date ? new Date(aidat.date).toLocaleDateString('tr-TR', {
                  day: '2-digit',
                  month: 'short',
                }) : "Ödenmedi"}
              </div>
              <div className="w-full mx-2 text-gray-800 font-medium overflow-hidden">
                {aidat.fullName}
              </div>
              <div className="text-sm w-32 text-right">
                {aidat.aidat ? (
                  <button onClick={() => handleDeleteAidat(aidat?._id, aidat?.aidatId)} className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer hover:bg-red-600 transition">
                    Geri Al
                  </button>
                ) : (
                  <button className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded hover:bg-green-600 transition" onClick={() => handleAddAidat(aidat._id)}>
                    Öde
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Aidats;
