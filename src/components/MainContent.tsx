'use client';

import React from 'react'
import dynamic from 'next/dynamic'

const CallList = dynamic(() => import('./CallList'), { ssr: false })
const Analytics = dynamic(() => import('./Analytics'), { ssr: false })

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CallList />
        <Analytics />
      </div>
    </main>
  )
}

export default MainContent
