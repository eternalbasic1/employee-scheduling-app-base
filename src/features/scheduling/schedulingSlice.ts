import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TimeBlock, ScheduleEntry } from "../../types";
import { addDays, format } from "date-fns";

interface SchedulingState {
  currentWeek: {
    startDate: string;
    endDate: string;
    dateRange: string[];
  };
  currentView: "week" | "month";
  draftSchedule: ScheduleEntry[];
  isDraftSaved: boolean;
}

// Helper function to generate array of dates for current week
const generateWeekDates = (startDate: Date): string[] => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(format(addDays(startDate, i), "yyyy-MM-dd"));
  }
  return dates;
};

// Get current week's start date (Monday) and end date (Sunday)
const today = new Date();
const dayOfWeek = today.getDay();
const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust when today is Sunday
const mondayOfCurrentWeek = new Date(today);
mondayOfCurrentWeek.setDate(today.getDate() - diff);

const startDate = format(mondayOfCurrentWeek, "yyyy-MM-dd");
const endDate = format(addDays(mondayOfCurrentWeek, 6), "yyyy-MM-dd");

const initialState: SchedulingState = {
  currentWeek: {
    startDate,
    endDate,
    dateRange: generateWeekDates(mondayOfCurrentWeek),
  },
  currentView: "week",
  draftSchedule: [],
  isDraftSaved: true,
};

export const schedulingSlice = createSlice({
  name: "scheduling",
  initialState,
  reducers: {
    setCurrentWeek: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      const { startDate, endDate } = action.payload;
      state.currentWeek.startDate = startDate;
      state.currentWeek.endDate = endDate;

      // Generate date range for the week
      const startDateObj = new Date(startDate);
      state.currentWeek.dateRange = generateWeekDates(startDateObj);
    },
    setCurrentView: (state, action: PayloadAction<"week" | "month">) => {
      state.currentView = action.payload;
    },
    addShiftToDraft: (
      state,
      action: PayloadAction<{
        employeeId: string;
        date: string;
        shift: TimeBlock;
      }>
    ) => {
      const { employeeId, date, shift } = action.payload;

      // Find existing entry for employee and date
      const existingEntry = state.draftSchedule.find(
        (entry) => entry.employeeId === employeeId && entry.date === date
      );

      if (existingEntry) {
        // Add shift to existing entry
        existingEntry.shifts.push(shift);
      } else {
        // Create new entry
        state.draftSchedule.push({
          employeeId,
          date,
          shifts: [shift],
        });
      }

      state.isDraftSaved = false;
    },
    removeShiftFromDraft: (
      state,
      action: PayloadAction<{
        employeeId: string;
        date: string;
        shiftIndex: number;
      }>
    ) => {
      const { employeeId, date, shiftIndex } = action.payload;

      const entryIndex = state.draftSchedule.findIndex(
        (entry) => entry.employeeId === employeeId && entry.date === date
      );

      if (entryIndex !== -1) {
        // Remove the specific shift
        state.draftSchedule[entryIndex].shifts.splice(shiftIndex, 1);

        // If no shifts left, remove the entire entry
        if (state.draftSchedule[entryIndex].shifts.length === 0) {
          state.draftSchedule.splice(entryIndex, 1);
        }

        state.isDraftSaved = false;
      }
    },
    setDraftSaved: (state, action: PayloadAction<boolean>) => {
      state.isDraftSaved = action.payload;
    },
  },
});

export const {
  setCurrentWeek,
  setCurrentView,
  addShiftToDraft,
  removeShiftFromDraft,
  setDraftSaved,
} = schedulingSlice.actions;

export default schedulingSlice.reducer;
