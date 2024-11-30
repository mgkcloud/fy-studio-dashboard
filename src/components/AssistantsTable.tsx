'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AssistantsTableProps {
  dateRange: { start: Date; end: Date };
  onAssistantSelect: (assistant: string) => void;
}

const AssistantsTable: React.FC<AssistantsTableProps> = ({ dateRange, onAssistantSelect }) => {
  // Mock data generation based on date range
  const generateMockData = (start: Date, end: Date) => {
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const multiplier = days / 7; // Assuming original data was for a week
    return [
      { name: 'REAL ESTATE AI COLD', callCount: Math.floor(3083 * multiplier), avgDuration: 3.70 },
      { name: 'Mateen YONG REAL ESTATE', callCount: Math.floor(646 * multiplier), avgDuration: 3.05 },
      { name: 'REAL ESTATE AI COLD (REPLY)', callCount: Math.floor(289 * multiplier), avgDuration: 3.36 },
      { name: 'Sam Latest Property Assistant', callCount: Math.floor(136 * multiplier), avgDuration: 20.48 },
      { name: 'Unknown Assistant', callCount: Math.floor(2 * multiplier), avgDuration: 0.05 },
    ];
  };

  const assistantsData = generateMockData(dateRange.start, dateRange.end);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Table>
        <TableCaption>Assistants Performance</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Assistant Name</TableHead>
            <TableHead>Call Count</TableHead>
            <TableHead>Average Duration (min)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assistantsData.map((assistant, index) => (
            <TableRow 
              key={index} 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onAssistantSelect(assistant.name)}
            >
              <TableCell className="font-medium">{assistant.name}</TableCell>
              <TableCell>{assistant.callCount}</TableCell>
              <TableCell>{assistant.avgDuration.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssistantsTable;
