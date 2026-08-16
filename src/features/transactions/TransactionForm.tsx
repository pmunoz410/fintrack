import { type SyntheticEvent, useState } from 'react'
import { categories } from '../../data/categories'
import type { Transaction, TransactionType } from '../../types'
import { getLocalDateString } from "../../utils/formatters"

interface TransactionFormProps {
    onSubmit: (data: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0].id);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(() => getLocalDateString());

    function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!amount || Number(amount) <= 0) return;

        onSubmit({ type, amount: Number(amount), categoryId, description, date });

        // reset del formulario tras enviar
        setAmount('');
        setDescription('');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4"
        >
            {/* Toggle Ingreso / Gasto */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setType('expense')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        type === 'expense'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                    }`}
                >
                    Gasto
                </button>
                <button
                    type="button"
                    onClick={() => setType('income')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        type === 'income'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                    }`}
                >
                    Ingreso
                </button>
            </div>

            <input
                type="number"
                step="0.01"
                placeholder="Monto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
            />

            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg py-2.5 font-medium hover:bg-indigo-700 transition-colors"
            >
                Agregar
            </button>
        </form>
    );
}