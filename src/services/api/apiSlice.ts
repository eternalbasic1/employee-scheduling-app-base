import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee, Schedule } from "../../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Employees", "Schedules"],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
      providesTags: ["Employees"],
    }),
    getSchedules: builder.query<
      Schedule[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `/schedules?startDate=${startDate}&endDate=${endDate}`,
      providesTags: ["Schedules"],
    }),
    saveSchedule: builder.mutation<Schedule, Partial<Schedule>>({
      query: (schedule) => ({
        url: "/schedules",
        method: "POST",
        body: schedule,
      }),
      invalidatesTags: ["Schedules"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetSchedulesQuery,
  useSaveScheduleMutation,
} = api;
