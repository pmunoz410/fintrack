import { useMemo } from 'react'
import { getCurrentMonthKey, getMonthKey } from '../../utils/formatters'
import type { Transaction } from '../../types'

export function useMonthlySummary(transactions: Transaction[], month = getCurrentMonthKey()) {
    return useMemo(() => {
        const monthTransactions = transactions.filter(
            (t) => getMonthKey(t.date) === month
        );

        const totalIncome = monthTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = monthTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    }, [transactions, month]);
}