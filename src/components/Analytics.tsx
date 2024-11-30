'use client';

import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Call Analytics',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = {
  labels,
  datasets: [
    {
      label: 'Calls',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Duration',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const Analytics: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <Bar options={options} data={data} />
    </div>
  )
}

export default Analytics
