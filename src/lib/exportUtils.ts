import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface Call {
  id: string;
  date: Date;
  assistant: string;
  duration: number;
  status: string;
  transcript: string;
  recordingUrl: string;
}

export const exportToCSV = (data: Call[], filename: string) => {
  const csvContent = [
    ['ID', 'Date', 'Assistant', 'Duration (min)', 'Price ($)', 'Status', 'Transcript', 'Recording URL'],
    ...data.map(call => [
      call.id,
      call.date.toLocaleString(),
      call.assistant,
      (call.duration / 60).toFixed(2),
      ((call.duration / 60) * 0.40).toFixed(2),
      call.status,
      call.transcript,
      call.recordingUrl
    ])
  ].map(e => e.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const exportToExcel = (data: Call[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data.map(call => ({
    ID: call.id,
    Date: call.date.toLocaleString(),
    Assistant: call.assistant,
    'Duration (min)': (call.duration / 60).toFixed(2),
    'Price ($)': ((call.duration / 60) * 0.40).toFixed(2),
    Status: call.status,
    Transcript: call.transcript,
    'Recording URL': call.recordingUrl
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Calls');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, filename);
};
