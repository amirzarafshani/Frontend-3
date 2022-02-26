import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import style from './Reports.scss';

interface IGatewaysSelectProps {
  data: IGatewayProps[];
  value: string;
  onChange: CallableFunction;
}

interface IGatewayProps {
  gatewayId: string;
  name: string;
}

export const GatewaySelect = (props: IGatewaysSelectProps): JSX.Element => {
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <Select
      id="gatewaysSelectBox"
      SelectDisplayProps={{
        // @ts-ignore
        "data-testid": `gatewaysSelectBox`
      }}
      className={style.materialSelect}
      value={props.value}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      MenuProps={{
        MenuListProps: {
          sx: {
            bgcolor: '#1BC5BD',
            color: '#fff',
            '& .MuiMenuItem-root': {
              padding: 2,
            },
          },
        },
      }}
    >
      <MenuItem value="">All gateways</MenuItem>
      {props.data.map((item: IGatewayProps) => (
        <MenuItem key={item.gatewayId} value={item.gatewayId}>{item.name}</MenuItem>
      ))}
    </Select>
  )
};
