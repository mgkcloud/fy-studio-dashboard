'use client';

import React from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRangePicker as ShadcnDateRangePicker } from './ui/date-range-picker';
import { Button } from './ui/button';

interface DateRangePickerProps {
  onChange: (range: { start: Date; end: Date }) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  return (
    <div className="flex items-center space-x-2 mb-6">
      <ShadcnDateRangePicker
        date={date}
        onDateChange={(newDate) => {
          setDate(newDate);
          if (newDate?.from && newDate?.to) {
            onChange({ start: newDate.from, end: newDate.to });
          }
        }}
      >
        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </ShadcnDateRangePicker>
    </div>
  );
};

export default DateRangePickerComponent;
