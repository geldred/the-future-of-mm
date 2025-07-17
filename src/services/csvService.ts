
import { Transaction, CategorySummary, MonthlySpending, SpendingTrends } from '@/types';

class CSVService {
  private transactions: Transaction[] = [];

  // Category emoji mapping
  private categoryEmojis: Record<string, string> = {
    'Dining': '🍽️',
    'Grocery': '🛒',
    'Entertainment': '🎬',
    'Transportation': '🚗',
    'Shopping': '🛍️',
    'Bills': '💰',
    'Healthcare': '🏥',
    'Travel': '✈️',
    'Other': '📦',
    'Gas': '⛽',
    'Coffee': '☕',
    'Food': '🍽️',
    'Restaurants': '🍽️',
    'Auto': '🚗',
    'Medical': '🏥',
    'Utilities': '💡',
    'Internet': '🌐',
    'Phone': '📱',
    'Subscription': '📺',
    'Subscriptions': '📺',
    'Kids': '👶',
    'Luxury Retail': '💎'
  };

  // Use June 2025 as our reference "current month" since data ends there
  private getCurrentMonthFilter() {
    return { month: 5, year: 2025 }; // June is month 5 (0-indexed)
  }

  private getPreviousMonthFilter() {
    return { month: 4, year: 2025 }; // May is month 4 (0-indexed)
  }

  async loadCSVData(csvContent: string): Promise<void> {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    console.log('CSV Headers:', headers);
    
    this.transactions = lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      
      // Based on the actual CSV structure
      const transaction = {
        account_id: values[4] || '', // account_id
        transaction_date: values[13] || '', // transaction_date  
        transaction_category: values[10] || '', // category_display_name
        transaction_amount: Math.abs(parseFloat(values[12]) || 0), // transaction_amount (make positive)
        transaction_description: values[7] || '' // transaction_display_name
      };
      
      if (index < 5) {
        console.log(`Transaction ${index}:`, transaction);
      }
      
      return transaction;
    }).filter(t => 
      !isNaN(t.transaction_amount) && 
      t.transaction_amount > 0 &&
      t.transaction_category &&
      t.transaction_date
    );
    
    console.log(`Loaded ${this.transactions.length} valid transactions`);
    console.log('Sample transactions:', this.transactions.slice(0, 3));
  }

  getCategoryBreakdown(): CategorySummary[] {
    const { month, year } = this.getCurrentMonthFilter();
    
    // Filter transactions for June 2025
    const currentMonthTransactions = this.transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date.getMonth() === month && date.getFullYear() === year;
    });

    const categoryTotals: Record<string, number> = {};
    let totalSpending = 0;

    // Sum spending by category for June 2025
    currentMonthTransactions.forEach(transaction => {
      const category = transaction.transaction_category;
      categoryTotals[category] = (categoryTotals[category] || 0) + transaction.transaction_amount;
      totalSpending += transaction.transaction_amount;
    });

    console.log('June 2025 category totals:', categoryTotals);
    console.log('June 2025 total spending:', totalSpending);

    // Convert to CategorySummary format
    const categories = Object.entries(categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount: Math.round(amount),
        value: Math.round((amount / totalSpending) * 100),
        emoji: this.categoryEmojis[name] || '📦'
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // Top 5 categories

    console.log('June 2025 processed categories:', categories);
    return categories;
  }

  getMonthlySpendingData(): MonthlySpending[] {
    const { month, year } = this.getCurrentMonthFilter();
    
    // Filter transactions for June 2025
    const currentMonthTransactions = this.transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date.getMonth() === month && date.getFullYear() === year;
    });

    // Group by day and accumulate spending
    const dailyTotals: Record<string, number> = {};
    currentMonthTransactions.forEach(t => {
      const day = new Date(t.transaction_date).getDate().toString().padStart(2, '0');
      dailyTotals[day] = (dailyTotals[day] || 0) + t.transaction_amount;
    });

    // Create cumulative progression
    const sortedDays = Object.keys(dailyTotals).sort();
    let cumulative = 0;
    
    return sortedDays.map(day => {
      cumulative += dailyTotals[day];
      return {
        day,
        amount: Math.round(cumulative)
      };
    });
  }

  getSpendingTrends(): SpendingTrends[] {
    const monthlyTotals: Record<string, number> = {};
    
    this.transactions.forEach(t => {
      const date = new Date(t.transaction_date);
      const monthKey = date.toLocaleString('default', { month: 'short' });
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + t.transaction_amount;
    });

    return Object.entries(monthlyTotals).map(([month, amount]) => ({
      month,
      amount: Math.round(amount)
    }));
  }

  getTotalSpending(): number {
    return this.transactions.reduce((total, t) => total + t.transaction_amount, 0);
  }

  getCurrentMonthSpending(): number {
    const { month, year } = this.getCurrentMonthFilter();
    
    return this.transactions
      .filter(t => {
        const date = new Date(t.transaction_date);
        return date.getMonth() === month && date.getFullYear() === year;
      })
      .reduce((total, t) => total + t.transaction_amount, 0);
  }

  getPreviousMonthSpending(): number {
    const { month, year } = this.getPreviousMonthFilter();
    
    return this.transactions
      .filter(t => {
        const date = new Date(t.transaction_date);
        return date.getMonth() === month && date.getFullYear() === year;
      })
      .reduce((total, t) => total + t.transaction_amount, 0);
  }

  getInsights(): { content: string; trends: SpendingTrends[]; categories: CategorySummary[] } {
    const currentSpending = this.getCurrentMonthSpending();
    const previousSpending = this.getPreviousMonthSpending();
    const categories = this.getCategoryBreakdown();
    const trends = this.getSpendingTrends();
    
    const change = currentSpending - previousSpending;
    const percentChange = previousSpending > 0 ? Math.round((change / previousSpending) * 100) : 0;
    
    let insight = '';
    if (change > 0) {
      insight = `Your spending increased by $${Math.round(change)} (${percentChange}%) in June compared to May. `;
    } else if (change < 0) {
      insight = `Great news! Your spending decreased by $${Math.round(Math.abs(change))} (${Math.abs(percentChange)}%) in June compared to May. `;
    } else {
      insight = 'Your spending remained consistent between May and June. ';
    }
    
    const topCategory = categories[0];
    if (topCategory) {
      insight += `Your largest expense category in June was ${topCategory.name} at $${topCategory.amount} (${topCategory.value}% of total spending).`;
    }

    return {
      content: insight,
      trends,
      categories
    };
  }
}

export const csvService = new CSVService();
