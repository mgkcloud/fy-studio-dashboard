import React from 'react'
import Link from 'next/link'

const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-white text-2xl font-semibold">VAPI Dashboard</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link href="/" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-gray-900">
                Dashboard
              </Link>
              <Link href="/calls" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                Calls
              </Link>
              <Link href="/analytics" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                Analytics
              </Link>
              <Link href="/settings" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
