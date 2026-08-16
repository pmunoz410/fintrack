import { categories } from '../../data/categories'
import type { TransactionType } from '../../types'

export interface Filters {
    type: TransactionType | 'all';
    categoryId: string | 'all';
}

interface TransactionFiltersProps {
    filters: Filters;
    onChange: (filters: Filters) => void;
}

export function TransactionFilters({ filters, onChange }: TransactionFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <select
                value={filters.type}
                onChange={(e) =>
                    onChange({ ...filters, type: e.target.value as Filters['type'] })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="all">Todos los tipos</option>
                <option value="income">Ingresos</option>
                <option value="expense">Gastos</option>
            </select>

            <select
                value={filters.categoryId}
                onChange={(e) => onChange({ ...filters, categoryId: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="all">Todas las categorías</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    );
}