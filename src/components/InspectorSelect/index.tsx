import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { getInspectorsActive } from 'app/redux/actions/CatalogueActions';
import { useTheme } from '@mui/system';

import { Box, Typography } from '@mui/material';
import Select from 'react-select';

type option = {
    value: string,
    label: string
}

interface Props {
    placeholder?: string,
    isClearable?: boolean,
    isSearchable?: boolean,
    isRequired?: boolean,
    value?: option,
    onChange?: (option: { value: string, label: string }) => void,
}

export default function InspectorSelect(props: Props) {
    const {
        value,
        placeholder = "Select...",
        isSearchable = true,
        isClearable = false,
        isRequired = false
    } = props;

    const theme = useTheme();
    const dispatch = useDispatch();
    const state = useAppSelector(state => state.getInspectorActive);
    const [valueControl, setValueControl] = useState<option | null>(value);

    const customStyles = {
        menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
        control: (base: any, controlState: any) => ({
            ...base,
            fontSize: '12px',
            paddingTop: '1px',
            border: isRequired && valueControl == null
                ? `1px solid ${theme.palette.error.main}`
                : controlState.isFocused
                    ? `1px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.grey[400]}`,
            boxShadow: isRequired && valueControl == null
                ? `none`
                : controlState.isFocused
                    ? `0 0 1px 1px ${theme.palette.primary.main}`
                    : 'none',
            '&:hover': {
                borderColor: !controlState.isFocused && isRequired && valueControl == null
                    ? theme.palette.error.main
                    : !controlState.isFocused
                        ? theme.palette.grey[500]
                        : 'none'
            }
        }),
        option: (base: any, optionState: any) => ({
            ...base,
            fontSize: '12px',
            backgroundColor: optionState.isSelected ? theme.palette.primary.main : 'transparent',
            '&:hover': {
                backgroundColor: optionState.isSelected ? theme.palette.primary.main : theme.palette.primary.container,
            },
        }),
    };


    useEffect(() => {
        if (state.data === null) {
            dispatch(getInspectorsActive());
        }
    }, [state.data]);

    const handleSelectChange = (option: { value: string, label: string }) => {
        if (props.onChange !== undefined) {
            props.onChange(option);
        }
        setValueControl(option);
    }

    return (
        <Box>
            <Select
                isClearable={isClearable}
                isSearchable={isSearchable}
                placeholder={placeholder}
                value={value}
                options={state.data ?? [{ value: '', label: '' }]}
                styles={customStyles}
                onChange={(option: option) => handleSelectChange(option)}
            />
            {isRequired && valueControl == null && (
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