import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";

// Props:
// - value: { date: '2025-07-11', time: '13:00' }
// - onChange: function to notify parent
// - placeholder: custom text

const CustomDateTimePicker = ({
  value = {},
  onChange,
  placeholder = "Select date",
}) => {
  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempDate, setTempDate] = useState(
    value.date ? new Date(value.date) : null
  );
  const [tempTime, setTempTime] = useState(value.time || "09:00");

  const selectedDate = value.date;
  const selectedTime = value.time;

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleConfirm = () => {
    if (tempDate && tempTime) {
      const dateStr = tempDate.toISOString().split("T")[0];
      onChange?.({ date: dateStr, time: tempTime });
      setShowCalendar(false);
    }
  };

  const handleClear = () => {
    onChange?.({ date: "", time: "" });
    setTempDate(null);
    setTempTime("09:00");
  };

  const generateTimeOptions = useMemo(() => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        times.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return times;
  }, []);

  const getDaysInMonth = useCallback((date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const days = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  }, []);

  const isToday = (date) => {
    const today = new Date();
    return (
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date) => {
    return (
      tempDate &&
      date &&
      date.getDate() === tempDate.getDate() &&
      date.getMonth() === tempDate.getMonth() &&
      date.getFullYear() === tempDate.getFullYear()
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="relative">
      {/* Trigger */}
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className="me-8 flex items-center gap-2 cursor-pointer group rounded-lg hover:bg-gray-50 transition"
      >
        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 group-hover:text-purple-600">
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
          {selectedTime && (
            <>
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-gray-600">{selectedTime}</span>
            </>
          )}
        </div>
      </div>

      {/* Popup */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="fixed top-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-100 p-6 w-[90vw] max-w-sm text-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() =>
                setCurrentMonth(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
                )
              }
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <h3 className="text-lg font-semibold text-gray-800">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>

            <button
              onClick={() =>
                setCurrentMonth(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
                )
              }
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {getDaysInMonth(currentMonth).map((date, index) => (
              <button
                key={index}
                disabled={!date}
                onClick={() => date && setTempDate(date)}
                className={`
                  p-2 text-sm rounded-lg transition
                  ${!date ? "invisible" : ""}
                  ${
                    isToday(date) ? "bg-blue-100 text-blue-600 font-medium" : ""
                  }
                  ${
                    isSelected(date)
                      ? "bg-purple-500 text-white font-medium"
                      : ""
                  }
                  ${
                    !isToday(date) && !isSelected(date)
                      ? "hover:bg-gray-100 text-gray-700"
                      : ""
                  }
                `}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>

          {/* Time Picker */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Waktu</span>
            </div>
            <select
              value={tempTime}
              onChange={(e) => setTempTime(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-purple-500"
            >
              {generateTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <button
              onClick={() => {
                setTempDate(null);
                setTempTime("09:00");
                setShowCalendar(false);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!tempDate}
              className={`
                px-4 py-2 text-sm rounded-lg
                ${
                  tempDate
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Select
            </button>
          </div>
        </div>
      )}

      {/* Clear Button */}
      {selectedDate && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-3 h-3 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default CustomDateTimePicker;
