import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/redux/hooks';

import { getForms } from 'app/redux/actions/CatalogueActions';
import { useTheme } from '@mui/system';
import { ShowFormEntity } from 'app/api/domain/entities/FormEntities/FormEntity';
import Select, { /* ValueType removed, use any instead */ } from 'react-select';
import { Box, Typography } from '@mui/material';
import { Draft } from 'immer';
import { getAllGroupQuestionFormSlice } from 'app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionsFormSlice';
import { getAllGroupQuestionsForm } from 'app/redux/actions/GroupQuestionsFormActions';
import { initialState } from 'app/redux/slices/form/CatalogueFormSlice';

export type option = {
  value: string | number,
  label: string
}

interface Props {
  id?: string, // Nuevo prop para identificador único
  placeholder?: string,
  isClearable?: boolean,
  isSearchable?: boolean,
  value?: option,
  isRequired?: boolean,
  canModifyGroupQuestion?: boolean;
  onChange?: (option: {value: string | number, label: string}) => void,
}

export default function FormSelect(props: Props) {
  const { 
       id, // Recuperar el prop id
      value, 
      placeholder = "Select...", 
      isSearchable = true, 
      isClearable = false,
      isRequired = false,
      canModifyGroupQuestion = false
  } = props;
  
  const theme = useTheme();
  const dispatch = useDispatch();
  const state = useAppSelector(state => state.catalogueForm);
  
//   const groupQuestionsState = useAppSelector(state => state.getAllGroupQuestion.data);
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
          dispatch(getForms());
      }
  }, [state.data]);
  
  const handleSelectChange = (option: {value: string | number, label: string}) => {
      if(props.onChange !== undefined){
          props.onChange(option);
        } 
      if(canModifyGroupQuestion){
          const result:number = typeof option.value === "string" ? Number(option.value) : option.value
          dispatch(getAllGroupQuestionFormSlice.actions.filterStateById({inspectForm:result, canModifyGroupQuestion}))
        
      }
      setValueControl(() => ({...option}));
  }

  return (
      <Box>
          <Select
          id={id} // Pasar el id al componente Select
          isClearable={isClearable}
          isSearchable={isSearchable}
          placeholder={placeholder}
          styles={customStyles}
          value={valueControl}
          menuPortalTarget={document.body}
          options={state.data ?? [{value: '', label: ''}]}
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