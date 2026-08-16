type View = 'dashboard' | 'transactions' | 'budget'

interface SidebarProps {
    activeView: View;
    onChangeView: (view: View) => void;
}

const navItems: { key: View; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Resumen', icon: '📊' },
    { key: 'transactions', label: 'Transacciones', icon: '💸' },
    { key: 'budget', label: 'Presupuesto', icon: '🎯' },
];

export function Sidebar({ activeView, onChangeView }: SidebarProps) {
    return (
        <aside className="w-full sm:w-64 bg-gray-900 text-white flex flex-row sm:flex-col p-3 sm:p-6 fixed sm:sticky bottom-0 sm:top-0 sm:h-screen z-50">
            <h1 className="hidden sm:block text-xl font-bold mb-8">FinTrack</h1>

            <nav className="flex flex-row sm:flex-col justify-around sm:justify-start gap-2 w-full">
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => onChangeView(item.key)}
                        className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-center sm:text-left transition-colors ${
                            activeView === item.key
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-300 hover:bg-gray-800'
                        }`}
                    >
                        <span>{item.icon}</span>
                        <span className="text-xs sm:text-base">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export type { View };