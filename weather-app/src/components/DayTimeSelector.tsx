// src/components/DayTimeSelector.tsx
import React from 'react';

interface Selection {
  day: string;
  timeRange: 'morning' | 'afternoon' | 'evening';
}

interface DayTimeSelectorProps {
  selection: Selection;
  onSelectionChange: (selection: Selection) => void;
}

const DayTimeSelector: React.FC<DayTimeSelectorProps> = ({ selection, onSelectionChange }) => {
  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const day = event.target.value;
    onSelectionChange({ ...selection, day });
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const timeRange = event.target.value as 'morning' | 'afternoon' | 'evening';
    onSelectionChange({ ...selection, timeRange });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '300px',
        margin: '1rem auto',
      }}
    >
      <label htmlFor="day-select" style={{ fontSize: '1rem' }}>
        Select Day:
      </label>
      <select id="day-select" value={selection.day} onChange={handleDayChange} style={selectStyle}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>

      <label htmlFor="time-range-select" style={{ fontSize: '1rem' }}>
        Select Time Range:
      </label>
      <select id="time-range-select" value={selection.timeRange} onChange={handleTimeRangeChange} style={selectStyle}>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
    </div>
  );
};

const selectStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

export default DayTimeSelector;
