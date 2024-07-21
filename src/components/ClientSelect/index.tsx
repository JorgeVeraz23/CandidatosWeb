import { useEffect, useState } from 'react';
import { useTheme } from '@mui/system';
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { getClients } from 'app/redux/actions/CatalogueActions';
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
    value?: option,
    isRequired?: boolean,
    onChange?: (option: {value: string, label: string}) => void,
}

export default function ClientSelect(props: Props) {
    const { 
        value = {value: '', label: ''}, 
        placeholder = "Select...", 
        isSearchable = true, 
        isClearable = false,
        isRequired = false,
    } = props;
    
    const theme = useTheme();
    const dispatch = useDispatch();
    const state = useAppSelector(state => state.catalogueClient);
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
        if(state.data === null){
            dispatch(getClients());
        }
    }, [state.data]);
    
    const handleSelectChange = (option: {value: string, label: string}) => {
        if(props.onChange !== undefined){
            props.onChange(option);
        } 
        setValueControl(option);
    }

    console.log(valueControl)

    return (
        <Box>
            <Select
            isClearable={isClearable}
            isSearchable={isSearchable}
            placeholder={placeholder}
            styles={customStyles}
            value={value}
            menuPortalTarget={document.body}
            options={state.data ?? [{value: '', label: ''}]}
            onChange={(option: option) => handleSelectChange(option)}
        />
            {isRequired && valueControl == null && value.value == '' && (
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