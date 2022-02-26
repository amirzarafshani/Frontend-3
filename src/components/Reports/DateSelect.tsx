import * as React from 'react';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import style from './Reports.scss';

interface IDateSelectProps {
  value: Date | null;
  onChange: CallableFunction;
  minDate?: Date | null;
  name: string | null;
  label: string | null;
}

export const DateSelect = (props: IDateSelectProps): JSX.Element => {
  // const [value, setValue] = React.useState<Date | null>(null);

  const handleChange = (date: Date) => {
    props.onChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        minDate={props.minDate ?? null}
        inputFormat="yyyy/MM/dd"
        label={props.label}
        value={props.value}
        clearable
        onChange={handleChange}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box className={style.dateSelect} sx={{ display: 'flex', alignItems: 'center' }}>
            <input ref={inputRef} {...inputProps} name={props.name} placeholder={props.label} />
            {InputProps?.endAdornment}
          </Box>
        )}
      />
    </LocalizationProvider>
  );
};
