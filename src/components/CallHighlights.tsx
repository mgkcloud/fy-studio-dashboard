'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface CallHighlightsProps {
  dateRange: { start: Date; end: Date };
}

const CallHighlights: React.FC<CallHighlightsProps> = ({ dateRange }) => {
  const [highlightedCalls, setHighlightedCalls] = useState<Call[]>([]);

  useEffect(() => {
    // Mock data generation
    const generateMockData = (): Call[] => {
      const calls = [];
      const assistants = ['AI Sales Assistant', 'AI Customer Support', 'AI Product Recommender', 'AI Market Analyzer'];
      const statuses = ['Completed', 'Transferred', 'Disconnected'];
      
      for (let i = 0; i < 20; i++) {
        const call: Call = {
          id: `call-${i}`,
          date: new Date(dateRange.start.getTime() + Math.random() * (dateRange.end.getTime() - dateRange.start.getTime())),
          assistant: assistants[Math.floor(Math.random() * assistants.length)],
          duration: Math.floor(Math.random() * 1000) + 30,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          transcript: `This is a highlighted transcript for call ${i}...`,
          recordingUrl: `https://example.com/recording-${i}.mp3`,
          marketingAccepted: true
        };
        calls.push(call);
      }
      
      return calls.sort((a, b) => b.date.getTime() - a.date.getTime());
    };

    setHighlightedCalls(generateMockData());
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-900">Marketing Accepted Calls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlightedCalls.map((call) => (
          <Card key={call.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-indigo-700">{call.assistant}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{call.date.toLocaleString()}</p>
              <p className="text-sm text-gray-800 mb-4">{call.transcript}</p>
              <audio controls src={call.recordingUrl} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CallHighlights;
