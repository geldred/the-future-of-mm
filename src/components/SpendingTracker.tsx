import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { day: '01', amount: 800 },
  { day: '07', amount: 1800 },
  { day: '14', amount: 2600 },
  { day: '21', amount: 3400 },
  { day: '28', amount: 4821 },
];

const SpendingTracker = () => {
  const currentMonth = "April";
  const currentAmount = 4821;
  const lastMonthAmount = 4200;
  const difference = currentAmount - lastMonthAmount;
  const percentChange = ((difference / lastMonthAmount) * 100).toFixed(1);
  const isIncrease = difference > 0;

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">{currentMonth}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
            Compare with: Last month
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="mt-2">
          <div className="text-3xl font-bold text-gray-900">
            ${currentAmount.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {isIncrease ? (
              <TrendingUp className="w-4 h-4 text-red-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-500" />
            )}
            <span className={`text-sm font-medium ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
              {isIncrease ? '+' : ''}{percentChange}% vs last month
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-32 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f766e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0f766e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-xs text-gray-500"
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#0f766e" 
                strokeWidth={2}
                fill="url(#spendingGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Button variant="outline" className="w-full">
          View spend history
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpendingTracker;