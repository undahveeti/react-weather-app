import React, { useState } from 'react';

interface Props {
  onSelectionChange: (selection: { day: string; timeRange: 'morning' | 'afternoon' | 'evening' }) => void;
}

const DayTimeSelector: React.FC<Props> = ({ onSelectionChange }) => {
  const [day, setDay] = useState<string>('Friday');
  const [timeRange, setTimeRange] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');

  const handleSelectionChange = () => {
    onSelectionChange({ day, timeRange });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
      {/* Day Selector */}
      <select
        value={day}
        onChange={(e) => {
          setDay(e.target.value);
          handleSelectionChange();
        }}
        style={{ padding: '0.5rem', borderRadius: '4px' }}
      >
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>

      {/* Time Range Selector */}
      <select
        value={timeRange}
        onChange={(e) => {
          setTimeRange(e.target.value as 'morning' | 'afternoon' | 'evening');
          handleSelectionChange();
        }}
        style={{ padding: '0.5rem', borderRadius: '4px' }}
      >
        <option value="morning">Morning (8-11 AM)</option>
        <option value="afternoon">Afternoon (12-3 PM)</option>
        <option value="evening">Evening (5-8 PM)</option>
      </select>
    </div>
  );
};

export default DayTimeSelector;
