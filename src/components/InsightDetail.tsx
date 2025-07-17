
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import SpendingTracker from './SpendingTracker';
import CategoryBreakdown from './CategoryBreakdown';

interface InsightDetailProps {
  onBackClick: () => void;
}

const spendingData = [
  { month: 'Feb', amount: 1800, label: '$1800' },
  { month: 'Mar', amount: 2200, label: '$2200' },
  { month: 'Apr', amount: 1800, label: '$1800' },
  { month: 'May', amount: 2200, label: '$2200' },
  { month: 'Jun', amount: 1800, label: '$1800' },
  { month: 'Jul', amount: 2800, label: '$2800' },
];

const InsightDetail = ({ onBackClick }: InsightDetailProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBackClick}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="text-2xl font-bold text-blue-600">Capital One</div>
            </div>
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
        {/* Feature Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingTracker />
          <CategoryBreakdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Insight Text */}
          <div className="space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Insight Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Your spending increased significantly in July, reaching $2,800 compared to your average of $2,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>The largest increase was in dining and entertainment categories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Consider setting up spending alerts to stay within your monthly budget goals</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Recommendations</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Based on your spending patterns, we recommend creating a monthly dining budget of $800 
                    and setting up automatic alerts when you reach 75% of your limit. This can help you 
                    maintain consistent spending habits while still enjoying your favorite activities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Visualization */}
          <div className="space-y-6">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Your monthly spending
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  You spent $1000 more than last month.
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        className="text-xs"
                      />
                      <YAxis hide />
                      <Bar 
                        dataKey="amount" 
                        fill="#0f766e"
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Data Labels */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                  {spendingData.map((item, index) => (
                    <div key={item.month} className="text-center">
                      <div className={`font-medium ${index === spendingData.length - 1 ? 'text-teal-600' : 'text-gray-900'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs">{item.month}</div>
                    </div>
                  ))}
                </div>

                {/* Highlight box for latest month */}
                <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">July Spending</span>
                    <span className="text-lg font-bold text-teal-600">+$1000</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    40% increase from your average monthly spending
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InsightDetail;
