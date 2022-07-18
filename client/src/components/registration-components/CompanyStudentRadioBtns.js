import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function CompanyStudentRadioBtns(props) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Is this account for a company or a student?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        onChange={props.handler}
        defaultValue="true"
      >
        <FormControlLabel value="true" control={<Radio />} label="Student" />
        <FormControlLabel value="false" control={<Radio />} label="Company" />
      </RadioGroup>
    </FormControl>
  )
}
