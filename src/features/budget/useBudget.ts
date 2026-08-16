import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { Budget } from '../../types'

export function useBudget() {
    const [budgets, setBudgets] = useLocalStorage<Budget[]>('budgets', []);

    function setBudgetForCategory(categoryId: string, monthlyLimit: number) {
        setBudgets((prev) => {
            const exists = prev.find((b) => b.categoryId === categoryId);
            if (exists) {
                return prev.map((b) =>
                    b.categoryId === categoryId ? { ...b, monthlyLimit } : b
                );
            }
            return [...prev, { categoryId, monthlyLimit }];
        });
    }

    return { budgets, setBudgetForCategory };
}