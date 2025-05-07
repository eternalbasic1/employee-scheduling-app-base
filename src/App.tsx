import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ScheduleManagement from "./components/scheduling/ScheduleManagement";
import PlaceholderPage from "./components/common/PlaceholderPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/scheduling" replace />} />

      {/* Dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <PlaceholderPage title="Dashboard" />
          </MainLayout>
        }
      />

      {/* Scheduling routes */}
      <Route
        path="/scheduling"
        element={
          <MainLayout>
            <ScheduleManagement />
          </MainLayout>
        }
      />

      {/* Other app routes */}
      <Route
        path="/forecasting"
        element={
          <MainLayout>
            <PlaceholderPage title="Forecasting" />
          </MainLayout>
        }
      />

      <Route
        path="/manage-events"
        element={
          <MainLayout>
            <PlaceholderPage title="Manage Events" />
          </MainLayout>
        }
      />

      <Route
        path="/employees"
        element={
          <MainLayout>
            <PlaceholderPage title="Employees" />
          </MainLayout>
        }
      />

      <Route
        path="/attendance"
        element={
          <MainLayout>
            <PlaceholderPage title="Attendance" />
          </MainLayout>
        }
      />

      <Route
        path="/schedule-adherence"
        element={
          <MainLayout>
            <PlaceholderPage title="Schedule Adherence" />
          </MainLayout>
        }
      />

      <Route
        path="/reports"
        element={
          <MainLayout>
            <PlaceholderPage title="Reports" />
          </MainLayout>
        }
      />

      <Route
        path="/admin-console"
        element={
          <MainLayout>
            <PlaceholderPage title="Admin Console" />
          </MainLayout>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/scheduling" replace />} />
    </Routes>
  );
};

export default App;
