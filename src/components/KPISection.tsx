'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface KPIProps {
  title: string;
  value: string;
  trend: number;
  data: number[];
}

const KPICard: React.FC<KPIProps> = ({ title, value, trend, data }) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 px-4 py-3">
        <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-3">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '+' : ''}{trend.toFixed(2)}%
            </p>
          </div>
          <div className="w-1/2 h-12">
            <Sparklines data={data} width={100} height={30}>
              <SparklinesLine color={trend >= 0 ? "#10B981" : "#EF4444"} />
            </Sparklines>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface KPISectionProps {
  dateRange: { start: Date; end: Date };
}

const KPISection: React.FC<KPISectionProps> = ({ dateRange }) => {
  // Mock data generation based on date range
  const generateMockData = (start: Date, end: Date) => {
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return Array.from({ length: days }, () => Math.floor(Math.random() * 100));
  };

  const mockData = generateMockData(dateRange.start, dateRange.end);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
      <KPICard title="Total Call Minutes" value={`${mockData.reduce((a, b) => a + b, 0)} minutes`} trend={3.56} data={mockData} />
      <KPICard title="Number of Calls" value={mockData.length.toString()} trend={0} data={mockData} />
      <KPICard title="Total Spent" value={`$${(mockData.reduce((a, b) => a + b, 0) * 0.1).toFixed(2)}`} trend={7.17} data={mockData} />
      <KPICard title="Average Cost per Call" value={`$${(mockData.reduce((a, b) => a + b, 0) * 0.1 / mockData.length).toFixed(2)}`} trend={7.17} data={mockData} />
    </div>
  );
};

export default KPISection;
