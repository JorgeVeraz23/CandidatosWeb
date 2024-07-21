import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled, useTheme } from '@mui/system';
import { Box, Typography } from '@mui/material';

interface CustomInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    type?: string;
    accept?: string;
}

const StyledTextField = styled(TextField)<{ valueofcontrol: string, isrequired?: string }>(({ theme, valueofcontrol, isrequired }) => ({
    width: '100%',
    '& .MuiInputBase-root': {
        minWidth: '100% !important',
        padding: '0 !important',
        margin: 0,
        borderRadius: '4px !important',
        border: `1px solid ${theme.palette.grey[400]}`,
        borderColor: isrequired == "true" && valueofcontrol == "" ? theme.palette.error.main : theme.palette.grey[400],
        '&:hover': {
            borderColor: isrequired == "true" && valueofcontrol == "" ? theme.palette.error.main : theme.palette.grey[500],
        },
        '&.Mui-focused': {
            borderColor: isrequired == "true" && valueofcontrol == "" ? theme.palette.error.main : theme.palette.primary.main,
            boxShadow: isrequired == "true" && valueofcontrol == "" ? "none" : `0 0 1px 1px ${theme.palette.primary.main}`,
        },
    },
    '& .Mui-disabled': {
        background: 'hsl(0, 0%, 95%)',
        borderColor: theme.palette.grey[400],
        '&:hover': {
            borderColor: theme.palette.grey[400],
        },
    },
    '& .MuiInputBase-input': {
        minWidth: '100%',
        minHeight: '38px',
        borderRadius: '4px',
        boxSizing: 'border-box',
        padding: '8px 12px 8px 12px !important',
    },
}));

const CustomInput: React.FC<CustomInputProps> = ({
    onChange,
    type = "text",
    value = "",
    placeholder,
    isRequired = false,
    isDisabled = false,
    accept = ""
}) => {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState<string>(value);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (onChange !== undefined) {
            onChange(event);
        }
        setInputValue(event.target.value);
    }

    return (
        <Box>
            <StyledTextField
                disabled={isDisabled}
                type={type}
                value={ type != "file" ? value : null}
                onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(event)}
                placeholder={placeholder}
                theme={theme}
                isrequired={isRequired.toString()}
                valueofcontrol={inputValue}
                inputProps={{ accept: accept }}
                InputLabelProps={{ shrink: true }}
            />
            {isRequired && value.length == 0 && (
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

export default CustomInput;