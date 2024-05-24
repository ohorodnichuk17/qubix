import React, { FC } from 'react';
import { TextField } from "@mui/material";

interface BirthdayInputProps {
   field: string;
   onChange: (isValid: boolean, value: Date | null) => void;
   validator: (value: Date | null) => string | false;
}

const BirthdayInput: FC<BirthdayInputProps> = ({ onChange, validator }) => {
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.valueAsDate;
      const error = validator(newValue);
      onChange(!error, newValue);
   };

   const inputStyles = {
      '& label.Mui-focused': {
         color: '#FF7F50',
      },
      '& .MuiInput-underline:after': {
         borderBottomColor: '#FF7F50',
      },
      '& .MuiOutlinedInput-root': {
         '& fieldset': {
            borderColor: '#FF7F50',
         },
         '&:hover fieldset': {
            borderColor: '#FF9966',
         },
         '&.Mui-focused fieldset': {
            borderColor: '#FF7F50',
         },
      },
   };

   return (
      <TextField
         type="date"
         label="Birthday"
         onChange={handleChange}
         InputLabelProps={{
            shrink: true,
         }}
         variant="outlined"
         fullWidth
         sx={inputStyles}
      />
   );
};

export default BirthdayInput;
