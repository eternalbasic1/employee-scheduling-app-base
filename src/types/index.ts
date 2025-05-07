export interface Employee {
  id: string;
  initials: string;
  name: string;
  position: string;
}

export interface TimeBlock {
  startTime: string;
  endTime: string;
}

export interface ScheduleEntry {
  employeeId: string;
  date: string;
  shifts: TimeBlock[];
}

export interface Schedule {
  id: string;
  startDate: string;
  endDate: string;
  entries: ScheduleEntry[];
}

export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
}
