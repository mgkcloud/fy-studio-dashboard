'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CallAnalysisProps {
  dateRange: { start: Date; end: Date };
}

const CallAnalysis: React.FC<CallAnalysisProps> = ({ dateRange }) => {
  // Mock data generation based on date range
  const generateMockData = (start: Date, end: Date) => {
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const total = days * 100;
    return {
      completed: Math.floor(total * 0.7),
      transferred: Math.floor(total * 0.15),
      disconnected: Math.floor(total * 0.1),
      other: Math.floor(total * 0.05)
    };
  };

  const mockData = generateMockData(dateRange.start, dateRange.end);

  const reasonData = {
    labels: ['Completed', 'Transferred', 'Disconnected', 'Other'],
    datasets: [
      {
        data: [mockData.completed, mockData.transferred, mockData.disconnected, mockData.other],
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444', '#8B5CF6'],
      },
    ],
  };

  const durationData = {
    labels: ['Assistant 1', 'Assistant 2', 'Assistant 3', 'Others'],
    datasets: [
      {
        data: [20.48, 15.2, 10.5, 0.05],
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444', '#8B5CF6'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 px-4 py-3">
          <CardTitle className="text-lg font-medium text-gray-900">Reason Call Ended</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Doughnut data={reasonData} options={options} />
        </CardContent>
      </Card>
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 px-4 py-3">
          <CardTitle className="text-lg font-medium text-gray-900">Average Call Duration by Assistant</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Doughnut data={durationData} options={options} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CallAnalysis;
