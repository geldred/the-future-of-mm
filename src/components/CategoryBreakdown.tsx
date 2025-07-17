import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categoryData = [
  { name: 'Dining', value: 35, amount: 1687, emoji: '🍽️' },
  { name: 'Groceries', value: 25, amount: 1205, emoji: '🛒' },
  { name: 'Entertainment', value: 18, amount: 868, emoji: '🎬' },
  { name: 'Transportation', value: 12, amount: 578, emoji: '🚗' },
  { name: 'Other', value: 10, amount: 483, emoji: '📦' },
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
        <div className="space-y-4">
          {categoryData.map((category) => (
            <div key={category.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">{category.emoji}</span>
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
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;