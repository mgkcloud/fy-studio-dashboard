'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CallDetailsProps {
  callId: string;
}

const CallDetails: React.FC<CallDetailsProps> = ({ callId }) => {
  // Mock data for call details
  const callDetails = {
    id: callId,
    assistant: 'REAL ESTATE AI COLD',
    transcript: 'This is a mock transcript of the call. The conversation would be displayed here.',
    recordingUrl: 'https://example.com/recording.mp3'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Details - {callId}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Assistant</h3>
          <p>{callDetails.assistant}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Transcript</h3>
          <p className="whitespace-pre-wrap">{callDetails.transcript}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Recording</h3>
          <Button onClick={() => alert('Playing recording (mock)')}>
            Play Recording
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallDetails;
