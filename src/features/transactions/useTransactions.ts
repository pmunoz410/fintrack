import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { Transaction } from '../../types'

export function useTransactions() {
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
        'transactions',
        []
    );

    function addTransaction(data: Omit<Transaction, 'id'>) {
        const newTransaction: Transaction = {
            ...data,
            id: crypto.randomUUID(),
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    }

    function deleteTransaction(id: string) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    }

    return { transactions, addTransaction, deleteTransaction };
}