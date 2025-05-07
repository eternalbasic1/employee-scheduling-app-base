import React from "react";
import { format, parseISO } from "date-fns";
import type { Employee } from "../../types";
import ScheduleHeader from "./ScheduleHeader";

interface ScheduleTableProps {
  employees: Employee[];
  dateRange: string[];
}

// Mock shift data for development - represents shifts for the schedule shown in the screenshot
const mockShifts: Record<string, { startTime: string; endTime: string }[]> = {
  // Emily Davis shifts
  "ed-2025-04-14": [{ startTime: "09:00", endTime: "17:00" }],
  "ed-2025-04-15": [{ startTime: "12:00", endTime: "20:00" }],
  "ed-2025-04-16": [{ startTime: "09:00", endTime: "17:00" }],
  "ed-2025-04-17": [{ startTime: "09:00", endTime: "17:00" }],
  "ed-2025-04-18": [{ startTime: "12:00", endTime: "20:00" }],
  "ed-2025-04-20": [{ startTime: "09:00", endTime: "17:00" }],

  // David Wilson shifts
  "dw-2025-04-14": [
    { startTime: "10:00", endTime: "18:00" },
    { startTime: "12:00", endTime: "20:00" },
  ],
  "dw-2025-04-15": [{ startTime: "14:00", endTime: "22:00" }],
  "dw-2025-04-16": [{ startTime: "10:00", endTime: "18:00" }],
  "dw-2025-04-17": [{ startTime: "10:00", endTime: "18:00" }],
  "dw-2025-04-18": [{ startTime: "14:00", endTime: "22:00" }],
  "dw-2025-04-19": [{ startTime: "09:00", endTime: "17:00" }],
  "dw-2025-04-20": [{ startTime: "10:00", endTime: "18:00" }],

  // Lisa Johnson shifts
  "lj-2025-04-14": [
    { startTime: "12:00", endTime: "20:00" },
    { startTime: "14:00", endTime: "22:00" },
  ],
  "lj-2025-04-16": [{ startTime: "09:00", endTime: "17:00" }],
  "lj-2025-04-17": [{ startTime: "12:00", endTime: "20:00" }],
  "lj-2025-04-18": [{ startTime: "10:00", endTime: "18:00" }],
  "lj-2025-04-19": [{ startTime: "09:00", endTime: "17:00" }],
  "lj-2025-04-20": [{ startTime: "12:00", endTime: "20:00" }],

  // Robert Martinez shifts
  "rm-2025-04-14": [{ startTime: "14:00", endTime: "22:00" }],
  "rm-2025-04-15": [{ startTime: "09:00", endTime: "17:00" }],
  "rm-2025-04-16": [
    { startTime: "10:00", endTime: "18:00" },
    { startTime: "14:00", endTime: "22:00" },
  ],
  "rm-2025-04-17": [{ startTime: "14:00", endTime: "22:00" }],
  "rm-2025-04-18": [
    { startTime: "12:00", endTime: "20:00" },
    { startTime: "10:00", endTime: "18:00" },
  ],
  "rm-2025-04-20": [{ startTime: "14:00", endTime: "22:00" }],

  // Amanda Thompson shifts
  "at-2025-04-15": [
    { startTime: "09:00", endTime: "17:00" },
    { startTime: "10:00", endTime: "18:00" },
  ],
  "at-2025-04-16": [{ startTime: "12:00", endTime: "20:00" }],
  "at-2025-04-17": [{ startTime: "09:00", endTime: "17:00" }],
  "at-2025-04-18": [
    { startTime: "09:00", endTime: "17:00" },
    { startTime: "14:00", endTime: "22:00" },
  ],
  "at-2025-04-20": [{ startTime: "12:00", endTime: "20:00" }],

  // Mohammed Al-Farsi shifts
  "ma-2025-04-15": [
    { startTime: "10:00", endTime: "18:00" },
    { startTime: "14:00", endTime: "22:00" },
  ],
  "ma-2025-04-16": [{ startTime: "12:00", endTime: "20:00" }],
  "ma-2025-04-17": [{ startTime: "10:00", endTime: "18:00" }],
  "ma-2025-04-18": [
    { startTime: "10:00", endTime: "18:00" },
    { startTime: "14:00", endTime: "22:00" },
  ],
};

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  employees,
  dateRange,
}) => {
  const getShiftClass = (startTime: string) => {
    const hour = parseInt(startTime.split(":")[0]);
    if (hour >= 8 && hour < 12) return "time-block-morning";
    if (hour >= 12 && hour < 16) return "time-block-afternoon";
    if (hour >= 16 && hour < 20) return "time-block-evening";
    return "time-block-night";
  };

  const renderShifts = (employeeId: string, date: string) => {
    const key = `${employeeId}-${date}`;
    const shifts = mockShifts[key] || [];

    return shifts.map((shift, index) => (
      <div
        key={`${key}-${index}`}
        className={`schedule-block ${getShiftClass(shift.startTime)} mb-1`}
      >
        {shift.startTime} - {shift.endTime}
      </div>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <table className="schedule-table">
        <ScheduleHeader dateRange={dateRange} />
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <th className="text-left">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 mr-2">
                    {employee.initials}
                  </div>
                  <div>
                    <div className="employee-name">{employee.name}</div>
                    <div className="employee-position">{employee.position}</div>
                  </div>
                </div>
              </th>
              {dateRange.map((date) => (
                <td key={date} className="align-top min-w-[100px] p-1">
                  <div className="flex flex-col gap-1">
                    {renderShifts(employee.id, date)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
