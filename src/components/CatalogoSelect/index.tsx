import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
//import { getRoles } from 'app/redux/actions/CatalogueActions';
// import { getQuestionType } from 'app/redux/actions/QuestionTypeActions/QuestionTypeActions';
import { getAllCatalogQuestion } from 'app/redux/actions/CatalogQuestionActions/CatalogQuestionActions';
import Select from 'react-select';

type option = {
    value: string | number,
    label: string
}

interface Props {
    placeHolder?: string | null,
    isClearable?: boolean | null,
    isSearchable?: boolean | null,
    value?: option | null,
    isDisabled: boolean | null, // Establecer un valor predeterminado para isDisabled

    onChange?: (option: {value: string, label: string}) => void,
}

export default function CatalogQuestionSelect(props: Props) {
    const { value, placeHolder = "Select...", isSearchable = true, isClearable = false, isDisabled = false } = props;
    const customStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (provided, state) => ({ ...provided, fontSize: '15px' }),
        option: (provided, state) => ({ ...provided, fontSize: '15px' }),
    };
    const state = useAppSelector(state => state.getAllCatalogQuestion);
    const dispatch = useDispatch();
    const [valueControl, setValueControl] = useState<option | null>(value);

    useEffect(() => {
        if(state.data === null){
            dispatch(getAllCatalogQuestion());
        }
    }, [state.data]);

    const handleSelectChange = (option: {value: string, label: string}) => {
        if(props.onChange !== undefined) props.onChange(option)
              setValueControl(() => ({...option}));

    }

    return (
        <Select
            isClearable={isClearable}
            isSearchable={isSearchable}
            placeholder={placeHolder}
            value={valueControl}
            options={state.data?.map(item => ({ value: item.idCatalogQuestion.toString(), label: item.catalogName })) ?? []}
            styles={customStyles}
            onChange={(option: option) => handleSelectChange({
                value: option.value as string,
                label: option.label 
              })}
              isDisabled={isDisabled} // Pasar la propiedad isDisabled al componente Select
        />
    );
}