'use client';

import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CallList: React.FC = () => {
  const { data, error } = useSWR('/api/phoneCalls', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
      <ul>
        {data.map((call: any) => (
          <li key={call.id} className="mb-2 p-2 hover:bg-gray-100 rounded">
            {call.phoneNumber} - {call.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CallList
