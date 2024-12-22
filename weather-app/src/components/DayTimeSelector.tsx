// src/components/DayTimeSelector.tsx
import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';

interface Selection {
  day: string;
  timeRange: 'morning' | 'afternoon' | 'evening';
}

interface DayTimeSelectorProps {
  selection: Selection;
  onSelectionChange: (selection: Selection) => void;
}

const DayTimeSelector: React.FC<DayTimeSelectorProps> = ({ selection, onSelectionChange }) => {
  const handleDayChange = (event: SelectChangeEvent<string>) => {
    const day = event.target.value;
    onSelectionChange({ ...selection, day });
  };

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    const timeRange = event.target.value as 'morning' | 'afternoon' | 'evening';
    onSelectionChange({ ...selection, timeRange });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      }}
    >
      {/* Select Day */}
      <FormControl fullWidth>
        <InputLabel id="day-select-label">Select Day</InputLabel>
        <Select
          labelId="day-select-label"
          id="day-select"
          value={selection.day}
          label="Select Day"
          onChange={handleDayChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        >
          <MenuItem value="">
            <em>-- Choose a day --</em>
          </MenuItem>
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
          <MenuItem value="Sunday">Sunday</MenuItem>
        </Select>
      </FormControl>

      {/* Select Time Range */}
      <FormControl fullWidth>
        <InputLabel id="time-range-select-label">Select Time Range</InputLabel>
        <Select
          labelId="time-range-select-label"
          id="time-range-select"
          value={selection.timeRange}
          label="Select Time Range"
          onChange={handleTimeRangeChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        >
          <MenuItem value="">
            <em>-- Choose a time range --</em>
          </MenuItem>
          <MenuItem value="morning">Morning</MenuItem>
          <MenuItem value="afternoon">Afternoon</MenuItem>
          <MenuItem value="evening">Evening</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DayTimeSelector;
