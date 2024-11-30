'use client';

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import KPISection from './KPISection'
import CallAnalysis from './CallAnalysis'
import CallsTable from './CallsTable'
import CallHighlights from './CallHighlights'
import DateRangePicker from './DateRangePicker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "@/components/theme-provider"

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() });
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);
  const [minDuration, setMinDuration] = useState<number>(0);
  const [callStatus, setCallStatus] = useState<string | null>(null);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8">
            <div className="max-w-full mx-auto space-y-8">
              <h1 className="text-3xl font-bold">AI-Powered Call Analytics</h1>
              <DateRangePicker onChange={setDateRange} />
              <Tabs defaultValue="overview" className="space-y-6 w-full">
                <TabsList className="w-full justify-start bg-muted">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="calls" className="flex-1">Calls</TabsTrigger>
                  <TabsTrigger value="highlights" className="flex-1">Call Highlights</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6">
                  <KPISection dateRange={dateRange} />
                  <CallAnalysis dateRange={dateRange} />
                </TabsContent>
                <TabsContent value="calls">
                  <CallsTable 
                    dateRange={dateRange}
                    selectedAssistant={selectedAssistant}
                    minDuration={minDuration}
                    callStatus={callStatus}
                    onAssistantSelect={setSelectedAssistant}
                    onMinDurationChange={setMinDuration}
                    onCallStatusChange={setCallStatus}
                  />
                </TabsContent>
                <TabsContent value="highlights">
                  <CallHighlights dateRange={dateRange} />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Dashboard
