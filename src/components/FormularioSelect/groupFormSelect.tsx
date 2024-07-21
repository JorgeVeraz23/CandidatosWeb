import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/redux/hooks';
import { useTheme } from '@mui/system';
import Select, { /* ValueType removed, use any instead */ } from 'react-select';
import { Box, Typography } from '@mui/material';
import { getAllGroupQuestionsForm } from 'app/redux/actions/GroupQuestionsFormActions';

export type option = {
  value: string | number,
  label: string
}

interface Props {
  placeholder?: string,
  isClearable?: boolean,
  isSearchable?: boolean,
  value?: option,
  isRequired?: boolean,
  onChange?: (option: {value: string, label: string}) => void,
  isDisabled?: boolean, // Nueva propiedad para deshabilitar el componente

}

export function GroupFormSelect(props: Props) {
  const { 
      value, 
      placeholder = "Select...", 
      isSearchable = true, 
      isClearable = false,
      isRequired = false,
      isDisabled = false, // Establecer un valor predeterminado para isDisabled

  } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const canModifyGroupQuestion = useAppSelector(state => state.getAllGroupQuestion.canModifyGroupQuestion);
  const state = useAppSelector(state => canModifyGroupQuestion ? 
    state.getAllGroupQuestion.filteredData: state.getAllGroupQuestion.data);
    
  const [valueControl, setValueControl] = useState<option | null>(value);
  const [loading, setLoading] = useState<boolean>(false); // Estado para el CircularProgress
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Comienza la carga
      if(!canModifyGroupQuestion){
          dispatch(getAllGroupQuestionsForm());
      }
      setLoading(false); // Finaliza la carga
    };
    fetchData();
  }, []);
  useEffect(() => {
        if(state === null && !canModifyGroupQuestion){
            dispatch(getAllGroupQuestionsForm());
        }
    }, [state, canModifyGroupQuestion]);

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
  
  const handleSelectChange = (option: {value: string, label: string}) => {
      if(props.onChange !== undefined){
          props.onChange(option);
      } 
      setValueControl(() => ({...option}));
  }

  return (
      <Box>
          <Select
          isClearable={isClearable}
          isSearchable={isSearchable}
          placeholder={placeholder}
          styles={customStyles}
          value={valueControl}
          menuPortalTarget={document.body}
          options={state.map(x => ({
            value: x.idGroupQuestionForm as any,
            label: x.nameGroupES
          })) ?? [{value: '', label: ''}]}
          onChange={(option: option) => handleSelectChange({
            value: option.value as string,
            label: option.label 
          })}
          isDisabled={isDisabled} // Pasar la propiedad isDisabled al componente Select

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