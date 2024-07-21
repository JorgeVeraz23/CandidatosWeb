import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useState } from 'react';
import Select from 'react-select';

interface OptionType<T> {
    [key: string]: any;
    value: string;
    label: string;
}

interface CustomSelectProps<T> {
    isDisabled?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    placeholder?: string;
    options?: OptionType<T>[];
    value: OptionType<T> | null | undefined;
    onChange: (option: T | null | undefined) => void;
    isRequired?: boolean;
}

export default function CustomSelect<T>(props: CustomSelectProps<T>) {
    const {
        value,
        placeholder = "Select...",
        isSearchable = true,
        isClearable = false,
        isDisabled = false,
        isRequired = false,
        options
    } = props;

    const theme = useTheme();

    const [valueControl, setValueControl] = useState<OptionType<T>>(value);

    const customStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
        control: (base: any, state: any) => ({
            ...base,
            fontSize: '12px',
            paddingTop: '1px',
            border: isRequired && valueControl.value == "" 
                ? `1px solid ${theme.palette.error.main}`
                : state.isFocused 
                    ? `1px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.grey[400]}`,
            boxShadow: isRequired && valueControl.value == "" 
                ? `none` 
                : state.isFocused
                    ? `0 0 0 1px ${theme.palette.primary.main}`
                    : 'none',
            '&:hover': {
                borderColor: !state.isFocused && isRequired && valueControl.value == "" 
                    ? theme.palette.error.main
                    : !state.isFocused
                        ? theme.palette.grey[500]
                        : 'none'
            }
        }),
        option: (base: any, state: any) => ({ 
            ...base, 
            fontSize: '12px',
            backgroundColor: state.isSelected ? theme.palette.primary.main : 'transparent',
            '&:hover': {
                backgroundColor: state.isSelected ? theme.palette.primary.main : theme.palette.primary.container,
            },
        }),
    };

    const handleSelectChange = (option: OptionType<T>) => {
        if (props.onChange !== undefined ) {
            props.onChange(option as T);
        }
        const aux = {...valueControl};
        aux.value = option != null ? option.value : "";
        setValueControl(aux)
    };

    return (
        <Box>
            <Select
                isDisabled={isDisabled}
                isClearable={isClearable}
                isSearchable={isSearchable}
                placeholder={placeholder}
                styles={customStyles}
                value={value}
                menuPortalTarget={document.body}
                options={options}
                onChange={(option: OptionType<T>) => handleSelectChange(option)}
            />
            {isRequired && valueControl.value == "" && (
                <Typography
                    fontSize={12}
                    color={theme.palette.error.main}
                >
                    Este campo es requerido
                </Typography>
            )}
        </Box>
    );
}