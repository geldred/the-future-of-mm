
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import SpendingTracker from './SpendingTracker';
import CategoryBreakdown from './CategoryBreakdown';
import { ChatInterface, ChatMessage, ChartConfig } from './ChatInterface';
import { DynamicChart } from './DynamicChart';
import { aiService } from '@/services/aiService';
import { Link } from 'react-router-dom';
import { csvService } from '@/services/csvService';
import { useCSVData } from '@/hooks/useCSVData';

interface InsightDetailProps {}

const InsightDetail = ({}: InsightDetailProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChart, setCurrentChart] = useState<ChartConfig | null>(null);
  const { isLoaded } = useCSVData();

  // Get real data from CSV service
  const trends = isLoaded ? csvService.getSpendingTrends() : [];
  const currentSpending = isLoaded ? Math.round(csvService.getCurrentMonthSpending()) : 0;
  const previousSpending = isLoaded ? Math.round(csvService.getPreviousMonthSpending()) : 0;
  const categories = isLoaded ? csvService.getCategoryBreakdown() : [];
  
  const spendingIncrease = currentSpending - previousSpending;
  const topCategory = categories[0];

  useEffect(() => {
    // Scroll to the bottom card when component mounts
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const response = await aiService.generateResponse(message, chatMessages);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date(),
        chartConfig: response.chartConfig
      };
      setChatMessages(prev => [...prev, assistantMessage]);

      // Auto-generate chart if provided
      if (response.chartConfig) {
        setCurrentChart(response.chartConfig);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChartGenerated = (chartConfig: ChartConfig) => {
    setCurrentChart(chartConfig);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-gray-600">Loading data...</div>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Big Lending Bank
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Need help?</Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">Gabe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Plan & Spend</h1>
        </div>
        {/* Feature Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingTracker />
          <CategoryBreakdown />
        </div>

        {/* Combined Insight Card */}
        <Card ref={cardRef} className="bg-white shadow-lg border-0 animate-[highlight-border_2s_ease-in-out_forwards]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Monthly Spend Recap - June 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Insight Text */}
              <div className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Your spending in June was ${currentSpending.toLocaleString()}, {spendingIncrease > 0 ? `$${spendingIncrease.toLocaleString()} more` : `$${Math.abs(spendingIncrease).toLocaleString()} less`} than May</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{topCategory ? `Your largest expense category was ${topCategory.name} at $${topCategory.amount.toLocaleString()} (${topCategory.value}% of total)` : 'Loading category breakdown...'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Consider setting up spending alerts to stay within your monthly budget goals</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Recommendations</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {topCategory ? (
                      `Based on your spending patterns, we recommend creating a monthly ${topCategory.name.toLowerCase()} budget of $${Math.round(topCategory.amount * 0.8).toLocaleString()} and setting up automatic alerts when you reach 75% of your limit.`
                    ) : (
                      'Based on your spending patterns, we recommend setting up category-based budgets and automatic alerts to help maintain consistent spending habits.'
                    )}
                  </p>
                </div>

                {/* Chat Interface */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Ask Follow-up Questions</h4>
                  <ChatInterface onSendMessage={handleSendMessage} messages={chatMessages} isLoading={isLoading} onChartGenerated={handleChartGenerated} />
                </div>
              </div>

              {/* Right Column - Visualization */}
              <div className="space-y-4">
                {currentChart ? <DynamicChart config={currentChart} /> : <>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Monthly Spend</h3>
                      <p className="text-gray-600">
                        You spent ${Math.abs(spendingIncrease).toLocaleString()} {spendingIncrease > 0 ? 'more' : 'less'} than last month.
                      </p>
                    </div>
                    
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trends} margin={{
                      top: 40,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
                          <YAxis hide />
                          <Bar dataKey="amount" fill="#0f766e" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity">
                            <LabelList dataKey="amount" position="top" className="text-xs font-medium fill-gray-600" formatter={(value: number) => `$${Math.round(value / 1000)}k`} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>;
};

export default InsightDetail;
