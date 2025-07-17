
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, ResponsiveContainer, LabelList } from 'recharts';
import { csvService } from '@/services/csvService';
import { useCSVData } from '@/hooks/useCSVData';

const SpendingTracker = () => {
  const { isLoaded, isLoading } = useCSVData();
  
  // Get dynamic data from CSV service
  const monthlyData = isLoaded ? csvService.getMonthlySpendingData() : [];
  const currentAmount = isLoaded ? Math.round(csvService.getCurrentMonthSpending()) : 0;
  const lastMonthAmount = isLoaded ? Math.round(csvService.getPreviousMonthSpending()) : 0;
  
  // Use June since that's when our data ends
  const currentMonth = "June";
  const difference = currentAmount - lastMonthAmount;
  const percentChange = lastMonthAmount > 0 ? ((difference / lastMonthAmount) * 100).toFixed(1) : '0.0';
  const isIncrease = difference > 0;
  
  if (isLoading) {
    return (
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
        <div className="h-48 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData.length > 0 ? monthlyData : [{ day: '01', amount: 0 }]} margin={{ top: 30, right: 15, left: 15, bottom: 5 }}>
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
                dot={{ r: 4, fill: "#0f766e", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#0f766e" }}
              />
              <LabelList 
                dataKey="amount" 
                content={({ x, y, value }) => {
                  const xPos = Number(x) || 0;
                  const yPos = Number(y) || 0;
                  const numValue = Number(value) || 0;
                  
                  return (
                    <text 
                      x={xPos} 
                      y={yPos - 15} 
                      textAnchor="middle" 
                      className="text-xs font-medium fill-gray-700"
                    >
                      ${Math.round(numValue / 1000)}k
                    </text>
                  );
                }}
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
