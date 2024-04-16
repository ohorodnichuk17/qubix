import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface OutlinedAlertsProps {
    message: string;
}

const mainColor = '#FF7F50';

const OutlinedErrorAlert: React.FC<OutlinedAlertsProps> = ({ message }) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert
                variant="outlined"
                severity="error"
                sx={{
                    borderColor: mainColor,
                    color: mainColor,
                    '& .MuiAlert-icon': {
                        color: mainColor,
                    },
                }}
            >
                {message}
            </Alert>
        </Stack>
    );
};

export default OutlinedErrorAlert;
