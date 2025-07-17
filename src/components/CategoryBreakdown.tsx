import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { csvService } from '@/services/csvService';
import { useCSVData } from '@/hooks/useCSVData';

const CategoryBreakdown = () => {
  const { isLoaded, isLoading } = useCSVData();
  const categoryData = isLoaded ? csvService.getCategoryBreakdown() : [];

  if (isLoading) {
    return (
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

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