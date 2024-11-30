'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CallAnalysisProps {
  dateRange: { start: Date; end: Date };
}

const CallAnalysis: React.FC<CallAnalysisProps> = ({ dateRange }) => {
  const colors = [
    'rgba(251, 191, 36, 1)',  // Yellow-400
    'rgba(236, 72, 153, 1)',  // Pink-500
    'rgba(5, 150, 105, 1)',   // Green-600
    'rgba(251, 191, 36, 1)',  // Yellow-400
  ];

  const generateMockData = (start: Date, end: Date) => {
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const labels = Array.from({length: days}, (_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      return date.toLocaleDateString();
    });

    return {
      labels,
      costPerConversion: labels.map(() => Math.random() * 50 + 10),
      conversionRate: labels.map(() => Math.random() * 0.3 + 0.1),
      cost: labels.map(() => Math.random() * 1000 + 100),
      minutes: labels.map(() => Math.random() * 500 + 50),
      calls: labels.map(() => Math.floor(Math.random() * 100 + 10)),
    };
  };

  const mockData = generateMockData(dateRange.start, dateRange.end);

  const createChartData = (label: string, data: number[], color: string) => ({
    labels: mockData.labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color.replace('1)', '0.1)'),
        tension: 0.1
      }
    ]
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost per Conversion ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <Line options={options} data={createChartData('Cost per Conversion', mockData.costPerConversion, colors[0])} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <Line options={options} data={createChartData('Conversion Rate', mockData.conversionRate.map(v => v * 100), colors[1])} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cost ($) and Minutes</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <Line options={{...options, scales: { y: { beginAtZero: true }, y1: { position: 'right', beginAtZero: true }}}} 
              data={{
                labels: mockData.labels,
                datasets: [
                  {
                    label: 'Cost',
                    data: mockData.cost,
                    borderColor: colors[2],
                    backgroundColor: colors[2].replace('1)', '0.1)'),
                    yAxisID: 'y',
                  },
                  {
                    label: 'Minutes',
                    data: mockData.minutes,
                    borderColor: colors[3],
                    backgroundColor: colors[3].replace('1)', '0.1)'),
                    yAxisID: 'y1',
                  }
                ]
              }} 
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Number of Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <Line options={options} data={createChartData('Number of Calls', mockData.calls, colors[0])} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallAnalysis;
