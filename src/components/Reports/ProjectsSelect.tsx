import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import style from './Reports.scss';

interface IProjectsSelectProps {
  data?: IProjectProps[];
  value?: string;
  onChange?: CallableFunction;
}

interface IProjectProps {
  projectId: string;
  name: string;
}

export const ProjectsSelect = (props: IProjectsSelectProps): JSX.Element => {
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <Select
      id="projectsSelectBox"
      SelectDisplayProps={{
        // @ts-ignore
        "data-testid": `projectsSelectBox`
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
      <MenuItem value="">All projects</MenuItem>
      {props.data.map((item: IProjectProps) => (
        <MenuItem key={item.projectId} value={item.projectId}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};
