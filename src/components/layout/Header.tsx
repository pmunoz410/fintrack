interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    const today = new Intl.DateTimeFormat('es-PE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }).format(new Date());

    return (
        <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <span className="text-sm text-gray-500 capitalize">{today}</span>
        </header>
    );
}