import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, addDays, parseISO } from "date-fns";
import type { RootState } from "../../store";
import {
  setCurrentWeek,
  setDraftSaved,
} from "../../features/scheduling/schedulingSlice";
import ScheduleTable from "./ScheduleTable";
import type { Employee } from "../../types";

// Mock data for development
const mockEmployees: Employee[] = [
  {
    id: "ed",
    initials: "ED",
    name: "Emily Davis",
    position: "Sales Associate",
  },
  {
    id: "dw",
    initials: "DW",
    name: "David Wilson",
    position: "Sales Associate",
  },
  { id: "lj", initials: "LJ", name: "Lisa Johnson", position: "Cashier" },
  { id: "rm", initials: "RM", name: "Robert Martinez", position: "Team Lead" },
  {
    id: "at",
    initials: "AT",
    name: "Amanda Thompson",
    position: "Sales Associate",
  },
  {
    id: "ma",
    initials: "MA",
    name: "Mohammed Al-Farsi",
    position: "Senior Sales Associate",
  },
];

const ScheduleManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { currentWeek, currentView, isDraftSaved } = useSelector(
    (state: RootState) => state.scheduling
  );
  const [activeTab, setActiveTab] = useState<"schedule" | "saved">("schedule");

  // In a real app, these would come from the API
  const [employees] = useState<Employee[]>(mockEmployees);

  const handleSaveDraft = () => {
    // In a real app, this would call an API to save the draft
    console.log("Saving draft...");
    dispatch(setDraftSaved(true));
  };

  const handlePublishSchedule = () => {
    // In a real app, this would call an API to publish the schedule
    console.log("Publishing schedule...");
    dispatch(setDraftSaved(true));
  };

  const handlePreviousWeek = () => {
    const startDateObj = parseISO(currentWeek.startDate);
    const newStartDate = format(addDays(startDateObj, -7), "yyyy-MM-dd");
    const newEndDate = format(addDays(parseISO(newStartDate), 6), "yyyy-MM-dd");

    dispatch(setCurrentWeek({ startDate: newStartDate, endDate: newEndDate }));
  };

  const handleNextWeek = () => {
    const startDateObj = parseISO(currentWeek.startDate);
    const newStartDate = format(addDays(startDateObj, 7), "yyyy-MM-dd");
    const newEndDate = format(addDays(parseISO(newStartDate), 6), "yyyy-MM-dd");

    dispatch(setCurrentWeek({ startDate: newStartDate, endDate: newEndDate }));
  };

  const handleToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust when today is Sunday

    const mondayOfCurrentWeek = new Date(today);
    mondayOfCurrentWeek.setDate(today.getDate() - diff);

    const newStartDate = format(mondayOfCurrentWeek, "yyyy-MM-dd");
    const newEndDate = format(addDays(mondayOfCurrentWeek, 6), "yyyy-MM-dd");

    dispatch(setCurrentWeek({ startDate: newStartDate, endDate: newEndDate }));
  };

  // Format date range for display
  const formattedDateRange = `${format(
    parseISO(currentWeek.startDate),
    "MMM d"
  )} - ${format(parseISO(currentWeek.endDate), "MMM d, yyyy")}`;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Schedule Management</h2>
        <p className="text-gray-600">
          All Locations - Managing employee shifts manually
        </p>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex space-x-1">
          <button
            onClick={handlePreviousWeek}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            &lt;
          </button>
          <button
            onClick={handleToday}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Today
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            &gt;
          </button>
          <span className="inline-flex items-center px-4 py-2 font-medium">
            {formattedDateRange}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">View:</span>
          <select
            className="border rounded p-1"
            value={currentView}
            onChange={(e) =>
              dispatch(
                setCurrentWeek({
                  ...currentWeek,
                })
              )
            }
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow flex-1 flex flex-col">
        <div className="border-b">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 ${
                  activeTab === "schedule"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("schedule")}
              >
                Schedule
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "saved"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("saved")}
              >
                Saved Schedules
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                onClick={handleSaveDraft}
                disabled={isDraftSaved}
              >
                Save as Draft
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handlePublishSchedule}
              >
                Publish Schedule
              </button>
            </div>
          </div>
        </div>

        {activeTab === "schedule" ? (
          <div className="flex-1 overflow-auto">
            <ScheduleTable
              employees={employees}
              dateRange={currentWeek.dateRange}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Saved Schedules</h3>
              <p className="text-gray-600">
                This feature will be available soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleManagement;
