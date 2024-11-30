'use client';

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import KPISection from './KPISection'
import CallAnalysis from './CallAnalysis'
import AssistantsTable from './AssistantsTable'
import DateRangePicker from './DateRangePicker'
import CallDetails from './CallDetails'
import CallsTable from './CallsTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() });
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [minDuration, setMinDuration] = useState<number>(0);
  const [callStatus, setCallStatus] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4 lg:mb-6">VAPI Dashboard</h1>
            <DateRangePicker onChange={setDateRange} />
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="callDetails">Call Details</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <KPISection dateRange={dateRange} />
                <CallAnalysis dateRange={dateRange} />
                <AssistantsTable 
                  dateRange={dateRange} 
                  onAssistantSelect={setSelectedAssistant}
                />
              </TabsContent>
              <TabsContent value="calls">
                <CallsTable 
                  dateRange={dateRange}
                  selectedAssistant={selectedAssistant}
                  minDuration={minDuration}
                  callStatus={callStatus}
                  onCallSelect={setSelectedCall}
                  onMinDurationChange={setMinDuration}
                  onCallStatusChange={setCallStatus}
                />
              </TabsContent>
              <TabsContent value="callDetails">
                {selectedCall ? (
                  <CallDetails callId={selectedCall} />
                ) : (
                  <p>Please select a call from the Calls tab to view details.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
