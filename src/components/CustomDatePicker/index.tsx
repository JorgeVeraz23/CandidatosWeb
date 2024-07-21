import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { styled, useTheme } from '@mui/system';
import { Box, Typography } from '@mui/material';


interface CustomDatePickerProps {
    onChange: (date: Dayjs | null) => void;
    format: 'DD/MM/YYYY' | 'YYYY-MM-DD';
    value?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
}

const CustomStyledDatePicker = styled(DatePicker)<{ valueofcontrol: string, isrequired?: string, isdisabled?: string }>(({ theme, valueofcontrol, isrequired, isdisabled }) => ({
    width: '100%',
    '& .MuiInputBase-root': {
        background: isdisabled == 'true' ? 'hsl(0, 0%, 95%) !important' : 'none',
        minHeight: '38px',
        borderRadius: '4px !important',
        border: `1px solid ${theme.palette.grey[400]}`,
        borderColor: isrequired == "true" && valueofcontrol == 'false' ? theme.palette.error.main : theme.palette.grey[400],
        '&:hover': {
            borderColor: isrequired == "true" && valueofcontrol == 'false' ? theme.palette.error.main : theme.palette.grey[500],
        },
        '&.Mui-focused': {
            borderColor: isrequired == "true" && valueofcontrol == 'false'  ? theme.palette.error.main : theme.palette.primary.main,
            boxShadow: isrequired == "true" && valueofcontrol == 'false'  ? "none" : `0 0 1px 1px ${theme.palette.primary.main}`,
        },

    },
    ' &.Mui-disabled': {
        background: 'transparent',
        borderColor: theme.palette.grey[400],
        '&:hover': {
            borderColor: theme.palette.grey[400],
        },
    },
    '& .MuiInputBase-input': {
        padding: '0 !important',
        boxSizing: 'border-box',
    },
    '& .MuiIconButton-root': {
        margin: 0,
        position: 'absolute',
        right: '8px',
        padding: '0 !important',
    },
}));

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onChange, value, isRequired = false, isDisabled = false }) => {
    const theme = useTheme();
    const [validDate, setValidDate] = useState<boolean>(true);

    const handleDateChange = (date: Dayjs | null) => {
        let isValid = false;
        if(date != null && date !=  undefined){
            if (onChange !== undefined) {
                onChange(date);
            }
            isValid = date.isValid()
        }
        setValidDate(isValid);
    };

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomStyledDatePicker
                    onChange={(date: Dayjs | null) => handleDateChange(date)}
                    format="DD/MM/YYYY"
                    value={dayjs(value, 'DD/MM/YYYY')}
                    disabled={isDisabled}
                    isdisabled={isDisabled.toString()}
                    valueofcontrol={validDate.toString()}
                    isrequired={isRequired.toString()}
                    theme={theme}
                />
            </LocalizationProvider>
            {isRequired && !validDate && (
                <Typography
                    fontSize={12}
                    color={theme.palette.error.main}
                >
                    Este campo es requerido
                </Typography>
            )}
        </Box>

    );
};

export default CustomDatePicker;