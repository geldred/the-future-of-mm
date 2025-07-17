import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const categoryData = [
  { name: 'Dining', value: 35, amount: 1687, color: '#0f766e' },
  { name: 'Groceries', value: 25, amount: 1205, color: '#059669' },
  { name: 'Entertainment', value: 18, amount: 868, color: '#10b981' },
  { name: 'Transportation', value: 12, amount: 578, color: '#34d399' },
  { name: 'Other', value: 10, amount: 483, color: '#6ee7b7' },
];

const CategoryBreakdown = () => {
  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Top Categories
        </CardTitle>
        <p className="text-sm text-gray-600">Current month spending breakdown</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-3">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    ${category.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.value}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;