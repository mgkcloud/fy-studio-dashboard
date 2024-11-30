import { NextResponse } from 'next/server'

export async function GET() {
  // Mock data for demonstration
  const mockCalls = [
    { id: 1, phoneNumber: '+1234567890', status: 'Completed' },
    { id: 2, phoneNumber: '+0987654321', status: 'In Progress' },
    { id: 3, phoneNumber: '+1122334455', status: 'Failed' },
  ]

  return NextResponse.json(mockCalls)
}
