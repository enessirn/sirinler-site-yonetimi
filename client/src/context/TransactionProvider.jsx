import { createContext, useState } from 'react'

const TransactionContext = createContext();
import axios from "axios";
export function TransactionProvider({ children }) {
    const [allTransactions, setAllTransactions] = useState([]);
    const getAllTransactions = async () => {
        try {
            const getAll = await axios.get("http://localhost:3000/api/transactions");
            console.log("getAll", getAll.data);
            setAllTransactions(getAll.data.reverse())
        } catch (error) {
            console.error("Error fetching all transactions: ", error)
        }
    }
    const values = {
        allTransactions,
        getAllTransactions
    }
    return (
        <TransactionContext.Provider value={values} >
            {children}
        </TransactionContext.Provider >
    )
}

export default TransactionContext