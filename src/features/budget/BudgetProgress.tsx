import { getCategoryById } from '../../data/categories'
import { formatCurrency } from '../../utils/formatters'
import type { Budget } from '../../types'

interface BudgetProgressProps {
    budgets: Budget[];
    categorySpending: { name: string; value: number; color: string }[];
}

export function BudgetProgress({ budgets, categorySpending }: BudgetProgressProps) {
    if (budgets.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-gray-400 text-center">
                Aún no definiste ningún presupuesto.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-gray-700">Progreso del presupuesto</h3>

            {budgets.map((budget) => {
                const category = getCategoryById(budget.categoryId);
                const spent =
                    categorySpending.find((c) => c.name === category?.name)?.value ?? 0;
                const percentage = Math.min((spent / budget.monthlyLimit) * 100, 100);
                const isOverBudget = spent > budget.monthlyLimit;

                return (
                    <div key={budget.categoryId}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{category?.name}</span>
                            <span className={isOverBudget ? 'text-red-500 font-medium' : 'text-gray-500'}>
                {formatCurrency(spent)} / {formatCurrency(budget.monthlyLimit)}
              </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${
                                    isOverBudget ? 'bg-red-500' : 'bg-indigo-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}