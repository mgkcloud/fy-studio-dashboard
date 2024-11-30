'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { exportToCSV, exportToExcel } from '@/lib/exportUtils'
import { Label } from "@/components/ui/label"

interface Call {
  id: string;
  date: Date;
  assistant: string;
  duration: number;
  status: string;
  transcript: string;
  recordingUrl: string;
  marketingAccepted: boolean;
}

interface CallsTableProps {
  dateRange: { start: Date; end: Date };
  selectedAssistant: string | null;
  minDuration: number;
  callStatus: string | null;
  onAssistantSelect: (assistant: string | null) => void;
  onMinDurationChange: (duration: number) => void;
  onCallStatusChange: (status: string | null) => void;
}

const CallsTable: React.FC<CallsTableProps> = ({
  dateRange,
  selectedAssistant,
  minDuration,
  callStatus,
  onAssistantSelect,
  onMinDurationChange,
  onCallStatusChange
}) => {
  const [expandedCall, setExpandedCall] = useState<string | null>(null);
  const [selectedCalls, setSelectedCalls] = useState<Set<string>>(new Set());
  const [calls, setCalls] = useState<Call[]>([]);

  const generateMockData = useCallback((): Call[] => {
    const mockCalls = [];
    const assistants = ['AI Sales Assistant', 'AI Customer Support', 'AI Product Recommender', 'AI Market Analyzer'];
    const statuses = ['Completed', 'Transferred', 'Disconnected'];
    
    for (let i = 0; i < 50; i++) {
      const call: Call = {
        id: `call-${i}`,
        date: new Date(dateRange.start.getTime() + Math.random() * (dateRange.end.getTime() - dateRange.start.getTime())),
        assistant: assistants[Math.floor(Math.random() * assistants.length)],
        duration: Math.floor(Math.random() * 1000) + 30,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        transcript: `This is a mock transcript for call ${i}...`,
        recordingUrl: `https://example.com/recording-${i}.mp3`,
        marketingAccepted: Math.random() > 0.7
      };
      mockCalls.push(call);
    }
    
    return mockCalls.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [dateRange]);

  useEffect(() => {
    const allCalls = generateMockData();
    const filteredCalls = allCalls.filter(call => 
      (!selectedAssistant || call.assistant === selectedAssistant) &&
      call.duration >= minDuration &&
      (!callStatus || call.status === callStatus) &&
      call.date >= dateRange.start &&
      call.date <= dateRange.end
    );
    setCalls(filteredCalls);
  }, [dateRange, selectedAssistant, minDuration, callStatus, generateMockData]);

  const toggleCallSelection = useCallback((callId: string) => {
    setSelectedCalls(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(callId)) {
        newSelected.delete(callId);
      } else {
        newSelected.add(callId);
      }
      return newSelected;
    });
  }, []);

  const handleExport = useCallback((format: 'csv' | 'excel') => {
    const selectedCallsData = calls.filter(call => selectedCalls.has(call.id));
    if (format === 'csv') {
      exportToCSV(selectedCallsData, 'calls_export.csv');
    } else {
      exportToExcel(selectedCallsData, 'calls_export.xlsx');
    }
  }, [calls, selectedCalls]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="minDuration" className="mb-2 block text-sm font-medium text-gray-700">Minimum Duration (seconds)</Label>
          <Input
            id="minDuration"
            type="number"
            placeholder="Min Duration"
            value={minDuration}
            onChange={(e) => onMinDurationChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="callStatus" className="mb-2 block text-sm font-medium text-gray-700">Call Status</Label>
          <Select onValueChange={(value) => onCallStatusChange(value === 'all' ? null : value)}>
            <SelectTrigger id="callStatus" className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Transferred">Transferred</SelectItem>
              <SelectItem value="Disconnected">Disconnected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="assistant" className="mb-2 block text-sm font-medium text-gray-700">AI Assistant</Label>
          <Select onValueChange={(value) => onAssistantSelect(value === 'all' ? null : value)}>
            <SelectTrigger id="assistant" className="w-full">
              <SelectValue placeholder="Select Assistant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assistants</SelectItem>
              <SelectItem value="AI Sales Assistant">AI Sales Assistant</SelectItem>
              <SelectItem value="AI Customer Support">AI Customer Support</SelectItem>
              <SelectItem value="AI Product Recommender">AI Product Recommender</SelectItem>
              <SelectItem value="AI Market Analyzer">AI Market Analyzer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => handleExport('csv')} className="flex-1">Export to CSV</Button>
          <Button onClick={() => handleExport('excel')} className="flex-1">Export to Excel</Button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableCaption>AI-Powered Call Analytics</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead className="w-[50px]">Details</TableHead>
              <TableHead>Date and Time</TableHead>
              <TableHead>AI Assistant</TableHead>
              <TableHead>Duration (min)</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Marketing Accepted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <React.Fragment key={call.id}>
                <TableRow 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedCall(expandedCall === call.id ? null : call.id)}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedCalls.has(call.id)}
                      onCheckedChange={() => toggleCallSelection(call.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>
                    {expandedCall === call.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </TableCell>
                  <TableCell>{call.date.toLocaleString()}</TableCell>
                  <TableCell>{call.assistant}</TableCell>
                  <TableCell>{(call.duration / 60).toFixed(2)}</TableCell>
                  <TableCell>{((call.duration / 60) * 0.40).toFixed(2)}</TableCell>
                  <TableCell>{call.status}</TableCell>
                  <TableCell>{call.marketingAccepted ? 'Yes' : 'No'}</TableCell>
                </TableRow>
                {expandedCall === call.id && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="p-4 bg-gray-50">
                        <h4 className="font-semibold mb-2">AI-Generated Transcript:</h4>
                        <p className="mb-4">{call.transcript}</p>
                        <h4 className="font-semibold mb-2">Call Recording:</h4>
                        <audio controls src={call.recordingUrl} className="w-full">
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CallsTable;
