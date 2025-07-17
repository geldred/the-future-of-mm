
import OpenAI from 'openai';
import { ChatMessage, ChartConfig } from '@/components/ChatInterface';
import { csvService } from './csvService';

// For demo purposes, we'll use a mock service that simulates AI responses
// In production, you would configure this with your actual OpenAI API key
class AIService {
  async generateResponse(message: string, context: ChatMessage[]): Promise<{ content: string; chartConfig?: ChartConfig }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = message.toLowerCase();
    
    // Generate dynamic responses based on actual CSV data (June 2025)
    if (lowerMessage.includes('reduce') || lowerMessage.includes('dining') || lowerMessage.includes('expenses') || lowerMessage.includes('food')) {
      const categories = csvService.getCategoryBreakdown();
      const diningCategory = categories.find(c => c.name.toLowerCase().includes('dining'));
      const trends = csvService.getSpendingTrends();
      
      return {
        content: `Based on your June 2025 spending data, ${diningCategory ? `you spent $${diningCategory.amount} on dining (${diningCategory.value}% of total)` : 'dining is a significant expense'}. Here are some strategies to reduce dining expenses: 1) Set a weekly dining budget of $125 (targeting $500/month), 2) Cook at home 4-5 times per week, 3) Use cashback apps for restaurant purchases. This could save you $200-300 per month.`,
        chartConfig: {
          type: 'bar' as const,
          title: 'Monthly Dining Expenses Estimate',
          description: 'Estimated dining portion of your monthly spending',
          data: trends.slice(-6).map(t => ({ 
            name: t.month, 
            value: Math.round(t.amount * 0.07) // Use 7% as dining estimate based on June data
          }))
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
        content: `Your spending trend shows ${change > 0 ? 'an increase' : 'a decrease'} of ${Math.abs(percentChange)}% in June compared to May (${change > 0 ? '+' : ''}$${Math.round(change)}). ${change > 0 ? 'Consider setting monthly spending alerts and budget categories to maintain consistency.' : 'Great job on managing your expenses!'}`,
        chartConfig: {
          type: 'line' as const,
          title: 'Monthly Spending Trend',
          description: 'Your spending pattern over the past months',
          data: trends.slice(-6).map(t => ({ name: t.month, value: Math.round(t.amount) }))
        }
      };
    }

    if (lowerMessage.includes('category') || lowerMessage.includes('breakdown') || lowerMessage.includes('distribution') || lowerMessage.includes('where')) {
      const categories = csvService.getCategoryBreakdown();
      const totalSpending = csvService.getCurrentMonthSpending();
      
      return {
        content: `Your June 2025 spending breakdown shows: ${categories.map(c => `${c.name} (${c.value}%)`).join(', ')}. ${categories[0] ? `${categories[0].name} represents your largest expense category with potential for optimization.` : ''}`,
        chartConfig: {
          type: 'pie' as const,
          title: 'June 2025 Spending by Category',
          description: `Distribution of your $${Math.round(totalSpending).toLocaleString()} in June expenses`,
          data: categories.map(c => ({ name: c.name, value: c.amount }))
        }
      };
    }

    if (lowerMessage.includes('luxury') || lowerMessage.includes('retail')) {
      const categories = csvService.getCategoryBreakdown();
      const luxuryCategory = categories.find(c => c.name === 'Luxury Retail');
      
      if (luxuryCategory) {
        return {
          content: `Your luxury retail spending in June was $${luxuryCategory.amount.toLocaleString()}, representing ${luxuryCategory.value}% of your total expenses. To reduce luxury spending: 1) Set a monthly luxury budget of $1,500, 2) Wait 24 hours before making non-essential purchases over $200, 3) Focus on experiences over material items.`,
          chartConfig: {
            type: 'bar' as const,
            title: 'Top Spending Categories',
            description: 'Your highest expense categories in June',
            data: categories.slice(0, 5).map(c => ({ name: c.name, value: c.amount }))
          }
        };
      }
    }

    // Default response with real insights from June data
    const insights = csvService.getInsights();
    return {
      content: `${insights.content} I can help you analyze your June 2025 spending patterns. Try asking about reducing specific expenses, trend analysis, or category breakdowns.`,
    };
  }
}

// Export a singleton instance
export const aiService = new AIService();
