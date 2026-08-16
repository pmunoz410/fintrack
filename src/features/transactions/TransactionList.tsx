import { getCategoryById } from '../../data/categories'
import { formatCurrency, formatDate } from '../../utils/formatters'
import type { Transaction } from '../../types'

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <p className="text-gray-400 text-center py-8">
                Aún no registraste ninguna transacción.
            </p>
        );
    }

    return (
        <ul className="flex flex-col gap-2">
            {transactions.map((t) => {
                const category = getCategoryById(t.categoryId);
                return (
                    <li
                        key={t.id}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
                    >
                        <div className="flex items-center gap-3">
              <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: category?.color }}
              />
                            <div>
                                <p className="font-medium text-gray-800">
                                    {t.description || category?.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {category?.name} · {formatDate(t.date)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
              <span
                  className={`font-semibold ${
                      t.type === 'income' ? 'text-green-600' : 'text-red-500'
                  }`}
              >
                {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
              </span>
                            <button
                                onClick={() => onDelete(t.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Eliminar transacción"
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}