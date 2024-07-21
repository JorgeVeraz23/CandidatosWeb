import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
//import { getRoles } from 'app/redux/actions/CatalogueActions';
import { getQuestionType } from 'app/redux/actions/QuestionTypeActions/QuestionTypeActions';
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
    onChange?: (option: {value: string, label: string}) => void,
}

export default function questionTypeSelect(props: Props) {
    const { value, placeHolder = "Select...", isSearchable = true, isClearable = false } = props;
    const customStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (provided, state) => ({ ...provided, fontSize: '15px' }),
        option: (provided, state) => ({ ...provided, fontSize: '15px' }),
    };
    const state = useAppSelector(state => state.getQuestionType);
    const dispatch = useDispatch();
    const [valueControl, setValueControl] = useState<option | null>(value);

    useEffect(() => {
        if(state.data === null){
            dispatch(getQuestionType());
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
            options={state.data?.map(item => ({ value: item.value.toString(), label: item.label })) ?? []}
            styles={customStyles}
            onChange={(option: option) => handleSelectChange({
                value: option.value as string,
                label: option.label 
              })}
        />
    );
}