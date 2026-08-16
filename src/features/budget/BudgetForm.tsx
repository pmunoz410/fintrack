import { useState } from 'react'
import { categories } from '../../data/categories'
import type { Budget } from '../../types'

const expenseCategories = categories.filter((c) => c.type === 'expense');

interface BudgetFormProps {
    budgets: Budget[];
    onSave: (categoryId: string, monthlyLimit: number) => void;
}

export function BudgetForm({ budgets, onSave }: BudgetFormProps) {
    const [values, setValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        for (const b of budgets) initial[b.categoryId] = String(b.monthlyLimit);
        return initial;
    });

    function handleChange(categoryId: string, value: string) {
        setValues((prev) => ({ ...prev, [categoryId]: value }));
    }

    function handleBlur(categoryId: string) {
        const raw = values[categoryId];
        const num = Number(raw);
        if (raw && num > 0) {
            onSave(categoryId, num);
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Definir presupuesto mensual</h3>
            <div className="flex flex-col gap-3">
                {expenseCategories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
              <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
              />
                            <span className="text-sm text-gray-700">{cat.name}</span>
                        </div>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={values[cat.id] ?? ''}
                            onChange={(e) => handleChange(cat.id, e.target.value)}
                            onBlur={() => handleBlur(cat.id)}
                            className="w-28 border border-gray-300 rounded-lg px-3 py-1.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}