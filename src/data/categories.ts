import type { Category } from '../types'

export const categories: Category[] = [
    // Gastos
    { id: 'food', name: 'Comida', color: '#F59E0B', type: 'expense' },
    { id: 'transport', name: 'Transporte', color: '#3B82F6', type: 'expense' },
    { id: 'entertainment', name: 'Ocio', color: '#EC4899', type: 'expense' },
    { id: 'health', name: 'Salud', color: '#10B981', type: 'expense' },
    { id: 'housing', name: 'Vivienda', color: '#8B5CF6', type: 'expense' },
    { id: 'shopping', name: 'Compras', color: '#EF4444', type: 'expense' },
    { id: 'other-expense', name: 'Otros gastos', color: '#6B7280', type: 'expense' },

    // Ingresos
    { id: 'salary', name: 'Salario', color: '#22C55E', type: 'income' },
    { id: 'freelance', name: 'Freelance', color: '#14B8A6', type: 'income' },
    { id: 'other-income', name: 'Otros ingresos', color: '#84CC16', type: 'income' },
];

export function getCategoryById(id: string): Category | undefined {
    return categories.find((c) => c.id === id);
}