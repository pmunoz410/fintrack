import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

interface CategoryPieChartProps {
    data: { name: string; value: number; color: string }[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-80 flex items-center justify-center text-gray-400">
                Aún no hay gastos este mes.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-hidden">
            <h3 className="font-semibold text-gray-700 mb-4">Gastos por categoría</h3>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}