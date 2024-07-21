
import * as React from 'react';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToggleButton from '@mui/material/ToggleButton';
import { Typography } from '@mui/material';
import SoftBox from "components/SoftBox";

interface DateFilterFormProps {
  onSubmit: (filterData: { FechaDesde: string | null; FechaHasta: string | null }) => void;

}

const DateFilterForm: React.FC<DateFilterFormProps> = ({ onSubmit }) => {
  const [valueDesde, setValueDesde] = React.useState('');
  const [valueHasta, setValueHasta] = React.useState('');

  const handleDateChangeDesde = (newValue: Dayjs | null) => {
    console.log('Nuevo valor Desde:', newValue);
    setValueDesde(newValue ? newValue.startOf('day').toISOString() : '');
  };

  const handleDateChangeHasta = (newValue: Dayjs | null) => {
    console.log('Nuevo valor Hasta:', newValue);
    setValueHasta(newValue ? newValue.endOf('day').toISOString() : '');
  };

  // const handleSubmit = () => {
  //   console.log('Enviando datos de filtro:', { FechaDesde: valueDesde, FechaHasta: valueHasta });
  //   onSubmit({ FechaDesde: valueDesde ? dayjs(valueDesde) : null, FechaHasta: valueHasta ? dayjs(valueHasta) : null });
  // };

  // const handleSubmit = () => {
  //   console.log('Enviando datos de filtro:', { FechaDesde: valueDesde, FechaHasta: valueHasta });
    
  //   // Formatear las fechas en formato ISO 8601 antes de enviarlas
  //   const formattedDesde = valueDesde ? dayjs(valueDesde).toISOString() : null;
  //   const formattedHasta = valueHasta ? dayjs(valueHasta).toISOString() : null;
    
  //   onSubmit({ FechaDesde: formattedDesde, FechaHasta: formattedHasta });
  // };

  const handleSubmit = () => {
    console.log('Enviando datos de filtro:', { FechaDesde: valueDesde, FechaHasta: valueHasta });
    
    // Convertir las fechas a cadenas ISO 8601 con la parte del tiempo
    const formattedDesde = valueDesde ? dayjs(valueDesde).toISOString() : null;
    const formattedHasta = valueHasta ? dayjs(valueHasta).toISOString() : null;
    
    onSubmit({ FechaDesde: formattedDesde, FechaHasta: formattedHasta });
  };
  

//   const handleClearFilter = () => {
//     setValueDesde(''); // Reinicia el estado del filtro desde
//     setValueHasta(''); // Reinicia el estado del filtro hasta
//     onClear(); // Solicita todos los datos nuevamente al backend
//   };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <SoftBox>
        <Typography>
          Fecha Desde
        </Typography>
        <DatePicker
          label=""
          value={valueDesde ? dayjs(valueDesde) : null}
          onChange={handleDateChangeDesde}
        />
        </SoftBox>
        <SoftBox>
        <Typography>
          Fecha Hasta
        </Typography>
        <DatePicker
          label=""
          value={valueHasta ? dayjs(valueHasta) : null}
          onChange={handleDateChangeHasta}
        />
        </SoftBox>
<SoftBox mt={4}>
<ToggleButton
    onClick={handleSubmit}
  value="check"
  aria-label="check"
  sx={{
    // Aquí puedes definir estilos utilizando CSS en línea
    backgroundColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: 'orange',
    },
  }}
>
  Filtrar
</ToggleButton>
</SoftBox>

{/* <ToggleButton
    onClick={handleSubmit}
  value="check"
  aria-label="check"
  sx={{
    // Aquí puedes definir estilos utilizando CSS en línea
    backgroundColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: 'orange',
    },
  }}
>
  Limpiar
</ToggleButton> */}
        
      </div>
    </LocalizationProvider>
  );
};

export default DateFilterForm;
