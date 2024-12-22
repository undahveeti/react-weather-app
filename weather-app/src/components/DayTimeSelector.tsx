import React, { useState } from 'react';

interface DayTimeSelectorProps {
  onSelectionChange: (selection: { day: string; timeRange: 'morning' | 'afternoon' | 'evening' }) => void;
}

const DayTimeSelector: React.FC<DayTimeSelectorProps> = ({ onSelectionChange }) => {
  const [selectedDay, setSelectedDay] = useState('Friday'); // Default day is Friday
  const [selectedTimeRange, setSelectedTimeRange] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value;
    setSelectedDay(newDay);
    onSelectionChange({ day: newDay, timeRange: selectedTimeRange }); // Notify parent of the updated selection
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeRange = e.target.value as 'morning' | 'afternoon' | 'evening';
    setSelectedTimeRange(newTimeRange);
    onSelectionChange({ day: selectedDay, timeRange: newTimeRange }); // Notify parent of the updated selection
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', justifyContent: 'center' }}>
      {/* Day Selector */}
      <div>
        <label style={{ marginRight: '0.5rem' }}>Day:</label>
        <select value={selectedDay} onChange={handleDayChange}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      {/* Time Range Selector */}
      <div>
        <label style={{ marginRight: '0.5rem' }}>Time Range:</label>
        <select value={selectedTimeRange} onChange={handleTimeRangeChange}>
          <option value="morning">Morning (8 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="evening">Evening (5 PM - 9 PM)</option>
        </select>
      </div>
    </div>
  );
};

export default DayTimeSelector;
