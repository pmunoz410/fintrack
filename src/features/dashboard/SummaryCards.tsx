import { formatCurrency } from '../../utils/formatters'

interface SummaryCardsProps {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export function SummaryCards({ totalIncome, totalExpense, balance }: SummaryCardsProps) {
    const cards = [
        { label: 'Ingresos', value: totalIncome, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Gastos', value: totalExpense, color: 'text-red-500', bg: 'bg-red-50' },
        {
            label: 'Balance',
            value: balance,
            color: balance >= 0 ? 'text-indigo-600' : 'text-red-500',
            bg: balance >= 0 ? 'bg-indigo-50' : 'bg-red-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((card) => (
                <div key={card.label} className={`rounded-xl p-6 ${card.bg}`}>
                    <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                    <p className={`text-2xl font-bold ${card.color}`}>
                        {formatCurrency(card.value)}
                    </p>
                </div>
            ))}
        </div>
    );
}