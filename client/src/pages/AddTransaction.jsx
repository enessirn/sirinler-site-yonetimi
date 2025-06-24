import { useContext, useState } from 'react'
import { Switch } from 'antd';
import axios from 'axios';
import Transaction from "../layout/Transactions"
import TransactionContext from '../context/TransactionProvider';

function AddTransaction() {
    const [status, setStatus] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        desc: "",
        type: status,
    });
    const { getAllTransactions } = useContext(TransactionContext);
    const onChange = (checked) => {
        setStatus(checked);
        setFormData({ ...formData, type: checked });
    };


    const AddTransaction = async (e) => {
        try {
            e.preventDefault();
            if (!formData.title.trim() || !formData.amount.trim()) {
                alert("Lütfen tüm zorunlu alanları doldurun.");
                return;
            }
            const res = await axios.post("http://localhost:3000/api/transactions/add", formData);
            console.log("olduuuuuuuuuuuuuuu", res.data);
            if (res.status === 201) {
                alert("İşlem başarıyla eklendi.");
                getAllTransactions();
            } else {
                alert("İşlem eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
            alert("İşlem eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        }
        finally {
            setFormData({
                title: "",
                amount: "",
                desc: "",
                type: status,

            });
        }
    }
    const handleDeleteAll = async () => {
        try {
            if (!window.confirm("Tüm işlemleri silmek istediğinize emin misiniz? Bu işlem geri alınamaz."))
                return;
            const transaction = await axios.delete("http://localhost:3000/api/transactions/delete-all-transaction");
            const aidat = await axios.get("http://localhost:3000/api/persons/reset-all-aidats");
            if (transaction.status === 200 && aidat.status === 200) {
                alert("Tüm işlemler başarıyla silindi.");
                getAllTransactions();
            } else {
                alert("Tüm işlemler silinirken bir hata oluştu. Lütfen tekrar deneyin.");
            }
        } catch (error) {

            console.error("Error deleting all transactions:", error);
            alert("Tüm işlemler silinirken bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }
    return (
        <div className="w-full min-h-screen bg-gray-50 px-4 py-4 pb-20 md:pb-4">
            <div className="w-full flex flex-row justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h1 className="font-bold text-3xl">İşlem Ekle</h1>
                <button className='py-2 rounded border-none outline-none px-2 bg-red-300 text-red-600 font-bold cursor-pointer hover:bg-red-400 hover:text-red-700' onClick={handleDeleteAll}>Tüm işlemleri kalıcı olarak sil</button>
            </div>

            <div id='switch' className='w-full flex flex-row gap-4 justify-center items-center mb-4'>
                <span className='text-xl font-bold text-red-700'>Gider</span>
                <Switch defaultChecked onChange={onChange} />
                <span className='text-xl font-bold text-green-700'>Gelir</span>
            </div>

            <form className='w-full md:max-w-3xl mx-auto'>
                <label htmlFor="title"><span className='text-red-600'>*</span>İşlem Adı</label>
                <input
                    type="text"
                    id="title"
                    placeholder='İşlem Adı'
                    className='w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={formData.title}
                    maxLength={25}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <label htmlFor="title">İşlem Açıklaması</label>
                <input
                    type="text"
                    id="title"
                    placeholder='İşlem Açıklaması'
                    className='w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={formData.desc}
                    maxLength={150}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}

                />
                <label htmlFor="amount"> <span className='text-red-600'>*</span>İşlem Ücreti</label>
                <input
                    type="number"
                    id="amount"
                    placeholder='45,50 ₺'
                    min="0.1"
                    className='w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required={true}
                />
                <button
                    type="submit"
                    className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors'
                    onClick={(e) => AddTransaction(e)}
                >
                    İşlemi Ekle
                </button>
            </form>

            <div className="border border-t border-gray-100 w-full ">


                <Transaction />
            </div>
        </div>
    )
}

export default AddTransaction