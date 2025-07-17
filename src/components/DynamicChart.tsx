import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, LabelList, Tooltip, Legend } from 'recharts';
import { ChartConfig } from './ChatInterface';

interface DynamicChartProps {
  config: ChartConfig;
}

const COLORS = ['#0f766e', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#84cc16'];

export const DynamicChart: React.FC<DynamicChartProps> = ({ config }) => {
  const { type, data, title, description } = config;

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="#0f766e" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="value" position="top" className="text-xs font-medium fill-gray-600" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0f766e" 
                strokeWidth={2}
                dot={{ r: 4, fill: "#0f766e" }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div className="flex items-center justify-center h-full text-gray-500">Unsupported chart type</div>;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        )}
      </div>
      <div className="h-80 w-full">
        {renderChart()}
      </div>
    </div>
  );
};