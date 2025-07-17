import OpenAI from 'openai';
import { ChatMessage, ChartConfig } from '@/components/ChatInterface';
import { csvService } from './csvService';

// For demo purposes, we'll use a mock service that simulates AI responses
// In production, you would configure this with your actual OpenAI API key
class AIService {
  private mockResponses = [
    {
      trigger: ['reduce', 'dining', 'expenses', 'food'],
      response: "Based on your July spending of $2,800, here are some strategies to reduce dining expenses: 1) Set a weekly dining budget of $150, 2) Cook at home 3-4 times per week, 3) Use cashback apps for restaurant purchases. You could potentially save $400-600 per month.",
      chartConfig: {
        type: 'bar' as const,
        title: 'Monthly Dining Expenses',
        description: 'Your dining expenses over the last 6 months',
        data: [
          { name: 'Feb', value: 600 },
          { name: 'Mar', value: 750 },
          { name: 'Apr', value: 650 },
          { name: 'May', value: 800 },
          { name: 'Jun', value: 700 },
          { name: 'Jul', value: 950 }
        ]
      }
    },
    {
      trigger: ['trend', 'analysis', 'pattern', 'time'],
      response: "Your spending shows an upward trend since March, with the highest peak in July. This 55% increase suggests seasonal spending or lifestyle changes. Consider setting up monthly spending alerts and budget categories.",
      chartConfig: {
        type: 'line' as const,
        title: 'Spending Trend Analysis',
        description: '6-month spending trend with projection',
        data: [
          { name: 'Feb', value: 1800 },
          { name: 'Mar', value: 2200 },
          { name: 'Apr', value: 1800 },
          { name: 'May', value: 2200 },
          { name: 'Jun', value: 1800 },
          { name: 'Jul', value: 2800 }
        ]
      }
    },
    {
      trigger: ['category', 'breakdown', 'distribution', 'where'],
      response: "Your July spending breakdown shows: Dining (34%), Housing (28%), Transportation (15%), Entertainment (12%), Shopping (8%), Other (3%). Dining represents the largest discretionary category with room for optimization.",
      chartConfig: {
        type: 'pie' as const,
        title: 'July Spending by Category',
        description: 'Distribution of your $2,800 July expenses',
        data: [
          { name: 'Dining', value: 950 },
          { name: 'Housing', value: 784 },
          { name: 'Transportation', value: 420 },
          { name: 'Entertainment', value: 336 },
          { name: 'Shopping', value: 224 },
          { name: 'Other', value: 86 }
        ]
      }
    }
  ];

  async generateResponse(message: string, context: ChatMessage[]): Promise<{ content: string; chartConfig?: ChartConfig }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = message.toLowerCase();
    
    // Generate dynamic responses based on actual CSV data
    if (lowerMessage.includes('reduce') || lowerMessage.includes('dining') || lowerMessage.includes('expenses') || lowerMessage.includes('food')) {
      const categories = csvService.getCategoryBreakdown();
      const diningCategory = categories.find(c => c.name.toLowerCase().includes('dining'));
      const trends = csvService.getSpendingTrends();
      
      return {
        content: `Based on your spending data, ${diningCategory ? `you spent $${diningCategory.amount} on dining (${diningCategory.value}% of total)` : 'dining is a significant expense'}. Here are some strategies to reduce dining expenses: 1) Set a weekly dining budget, 2) Cook at home more often, 3) Use cashback apps for restaurant purchases.`,
        chartConfig: {
          type: 'bar' as const,
          title: 'Monthly Dining Expenses',
          description: 'Your dining expenses over recent months',
          data: trends.map(t => ({ name: t.month, value: Math.round(t.amount * 0.35) })) // Estimate dining portion
        }
      };
    }

    if (lowerMessage.includes('trend') || lowerMessage.includes('analysis') || lowerMessage.includes('pattern') || lowerMessage.includes('time')) {
      const trends = csvService.getSpendingTrends();
      const currentSpending = csvService.getCurrentMonthSpending();
      const previousSpending = csvService.getPreviousMonthSpending();
      const change = currentSpending - previousSpending;
      const percentChange = previousSpending > 0 ? Math.round((change / previousSpending) * 100) : 0;
      
      return {
        content: `Your spending shows ${change > 0 ? 'an increase' : 'a decrease'} of ${Math.abs(percentChange)}% compared to last month. ${change > 0 ? 'Consider setting monthly spending alerts and budget categories.' : 'Great job on reducing your expenses!'}`,
        chartConfig: {
          type: 'line' as const,
          title: 'Spending Trend Analysis',
          description: 'Your spending trend over recent months',
          data: trends.map(t => ({ name: t.month, value: t.amount }))
        }
      };
    }

    if (lowerMessage.includes('category') || lowerMessage.includes('breakdown') || lowerMessage.includes('distribution') || lowerMessage.includes('where')) {
      const categories = csvService.getCategoryBreakdown();
      const totalSpending = csvService.getCurrentMonthSpending();
      
      return {
        content: `Your spending breakdown shows: ${categories.map(c => `${c.name} (${c.value}%)`).join(', ')}. ${categories[0] ? `${categories[0].name} represents your largest discretionary category with room for optimization.` : ''}`,
        chartConfig: {
          type: 'pie' as const,
          title: 'Spending by Category',
          description: `Distribution of your $${Math.round(totalSpending)} in expenses`,
          data: categories.map(c => ({ name: c.name, value: c.amount }))
        }
      };
    }

    // Default response with insights
    const insights = csvService.getInsights();
    return {
      content: insights.content + " I can help you analyze your spending patterns. Try asking about reducing expenses, trend analysis, or category breakdowns.",
    };
  }
}

// Export a singleton instance
export const aiService = new AIService();