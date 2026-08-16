export type TransactionType = 'income' | 'expense'

export interface Category {
    id: string;
    name: string;
    color: string;
    type: 'income' | 'expense';
    icon?: string;
}

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    categoryId: string;
    description: string;
    date: string;      // ej: "2026-08-15"
}

export interface Budget {
    categoryId: string;
    monthlyLimit: number;
}

export interface MonthlySummary {
    month: string;      // ej: "2026-08"
    totalIncome: number;
    totalExpense: number;
    balance: number;
}