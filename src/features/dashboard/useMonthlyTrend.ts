import { useMemo } from 'react'
import { getMonthKey } from '../../utils/formatters'
import type { Transaction } from '../../types'

function getLastNMonths(n: number): string[] {
    const months: string[] = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
    return months;
}

export function useMonthlyTrend(transactions: Transaction[], monthsBack = 6) {
    return useMemo(() => {
        const months = getLastNMonths(monthsBack);

        return months.map((monthKey) => {
            const monthTransactions = transactions.filter(
                (t) => getMonthKey(t.date) === monthKey
            );

            const income = monthTransactions
                .filter((t) => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);

            const expense = monthTransactions
                .filter((t) => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);

            const [year, month] = monthKey.split('-');
            const label = new Intl.DateTimeFormat('es-PE', { month: 'short' }).format(
                new Date(Number(year), Number(month) - 1)
            );

            return { month: label, income, expense };
        });
    }, [transactions, monthsBack]);
}