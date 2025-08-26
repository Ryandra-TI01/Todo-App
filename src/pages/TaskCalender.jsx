import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../context/AuthContext";
import HeaderSection from "../components/Calender/HeaderSection";
import CalendarSection from "../components/Calender/CalenderSection";
const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading] = useState(false);
  const [viewMode, setViewMode] = useState("month");

  const { token } = useAuth();
  const { taskStatsQuery, calendarTasksQuery } = useTasks(token);

  const calendarTasks = calendarTasksQuery.data?.data || [];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month's days to fill the grid
    const totalCells = Math.ceil(days.length / 7) * 7;
    let nextMonthDay = 1;
    while (days.length < totalCells) {
      const day = new Date(year, month + 1, nextMonthDay);
      days.push({ date: day, isCurrentMonth: false });
      nextMonthDay++;
    }

    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTasksForDate = (due_date) => {
    const dateStr = formatDate(due_date);
    return calendarTasks.filter(
      (task) => task.due_date?.slice(0, 10) === dateStr
    );
  };

 const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <div className="mt-12">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <HeaderSection
          navigateMonth={navigateMonth}
          currentDate={currentDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* calender */}
        <CalendarSection
          loading={loading}
          days={days}
          getTasksForDate={getTasksForDate}
          isToday={isToday}
          isSelected={isSelected}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          selectedDateTasks={selectedDateTasks}
          taskStatsQuery={taskStatsQuery}
        />

      </div>
    </div>
  );
};

export default TaskCalendar;
