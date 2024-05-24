import React, { FC } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface GenderInputProps {
   field: string;
   onChange: (isValid: boolean, value: string) => void;
   validator: (value: string) => string | undefined;
}

const GenderInput: FC<GenderInputProps> = ({ field, onChange, validator }) => {
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      const error = validator(newValue);
      onChange(!error, newValue);
   };

   const radioStyles = {
      '&.Mui-checked': {
         color: '#FF7F50',
      },
   };

   const labelStyles = {
      '&.Mui-focused': {
         color: '#FF7F50',
      }
   };

   return (
      <FormControl component="fieldset" variant="outlined">
         <FormLabel component="legend" sx={labelStyles}>Gender</FormLabel>
         <RadioGroup
            row
            aria-label="gender"
            name={field}
            onChange={handleChange}
         >
            <FormControlLabel value="Female" control={<Radio sx={radioStyles} />} label="Female" />
            <FormControlLabel value="Male" control={<Radio sx={radioStyles} />} label="Male" />
            <FormControlLabel value="Other" control={<Radio sx={radioStyles} />} label="Other" />
         </RadioGroup>
      </FormControl>
   );
};

export default GenderInput;
