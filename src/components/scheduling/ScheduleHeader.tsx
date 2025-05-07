import React from "react";
import { format, parseISO } from "date-fns";

interface ScheduleHeaderProps {
  dateRange: string[];
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ dateRange }) => {
  return (
    <thead>
      <tr>
        <th className="w-48"></th>
        {dateRange.map((date, index) => {
          const dateObj = parseISO(date);
          const dayName = format(dateObj, "EEE");
          const dayNumber = format(dateObj, "d");
          const monthName = format(dateObj, "MMM");

          return (
            <th key={date} className="text-center">
              <div>{dayName}</div>
              <div className="font-bold">
                {dayNumber} {monthName}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default ScheduleHeader;
