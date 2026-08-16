import { useMemo } from 'react'
import { getCategoryById } from '../../data/categories'
import { getCurrentMonthKey, getMonthKey } from '../../utils/formatters'
import type { Transaction } from '../../types'

export function useCategoryBreakdown(transactions: Transaction[], month = getCurrentMonthKey()) {
    return useMemo(() => {
        const expenses = transactions.filter(
            (t) => t.type === 'expense' && getMonthKey(t.date) === month
        );

        const totals = new Map<string, number>();
        for (const t of expenses) {
            totals.set(t.categoryId, (totals.get(t.categoryId) ?? 0) + t.amount);
        }

        return Array.from(totals.entries()).map(([categoryId, total]) => {
            const category = getCategoryById(categoryId);
            return {
                name: category?.name ?? 'Otro',
                value: total,
                color: category?.color ?? '#6B7280',
            };
        });
    }, [transactions, month]);
}