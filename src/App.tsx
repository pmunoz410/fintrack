import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import type { View } from './components/layout/Sidebar'
import { useState } from "react"
import { useTransactions } from './features/transactions/useTransactions'
import { TransactionForm } from './features/transactions/TransactionForm'
import { TransactionList } from './features/transactions/TransactionList'
import { useMonthlySummary } from './features/dashboard/useMonthlySummary'
import { SummaryCards } from './features/dashboard/SummaryCards'
import { useCategoryBreakdown } from './features/dashboard/useCategoryBreakdown'
import { useMonthlyTrend } from './features/dashboard/useMonthlyTrend'
import { CategoryPieChart } from './features/dashboard/CategoryPieChart'
import { IncomeExpenseChart } from './features/dashboard/IncomeExpenseChart'
import { useBudget } from './features/budget/useBudget'
import { BudgetForm } from './features/budget/BudgetForm'
import { BudgetProgress } from './features/budget/BudgetProgress'
import { TransactionFilters } from './features/transactions/TransactionFilters'
import type { Filters } from './features/transactions/TransactionFilters'
import { Pagination } from "./features/transactions/Pagination";

const viewTitles: Record<View, string> = {
  dashboard: 'Resumen',
  transactions: 'Transacciones',
  budget: 'Presupuesto',
};

function App() {

  const [activeView, setActiveView] = useState<View>('dashboard');
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const { totalIncome, totalExpense, balance } = useMonthlySummary(transactions);
  const categoryData = useCategoryBreakdown(transactions);
  const trendData = useMonthlyTrend(transactions);
  const { budgets, setBudgetForCategory } = useBudget();
  const [filters, setFilters] = useState<Filters>({ type: 'all', categoryId: 'all' });

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filters.type === 'all' || t.type === filters.type;
    const matchesCategory = filters.categoryId === 'all' || t.categoryId === filters.categoryId;
    return matchesType && matchesCategory;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / pageSize));
  const paginatedTransactions = sortedTransactions.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
  );

  return (
      <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />

        <div className="flex-1 flex flex-col pb-20 sm:pb-0">
        <Header title={viewTitles[activeView]} />

          <main className="flex-1 p-4 sm:p-8">
          {activeView === 'dashboard' && (
              <div className="flex flex-col gap-6">
                <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CategoryPieChart data={categoryData} />
                  <IncomeExpenseChart data={trendData} />
                </div>
              </div>
          )}
          {activeView === 'transactions' && (
              <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-start">
                <TransactionForm onSubmit={addTransaction} />
                <div>
                  <TransactionFilters
                      filters={filters}
                      onChange={(newFilters) => {
                        setFilters(newFilters);
                        setCurrentPage(1);
                      }}
                  />
                  <TransactionList transactions={paginatedTransactions} onDelete={deleteTransaction} />
                  <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                  />
                </div>
              </div>
          )}
          {activeView === 'budget' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BudgetForm budgets={budgets} onSave={setBudgetForCategory} />
                <BudgetProgress budgets={budgets} categorySpending={categoryData} />
              </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
