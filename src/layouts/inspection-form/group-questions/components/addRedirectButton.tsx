import { useNavigate } from 'react-router-dom';
import SoftButton from "components/SoftButton";
const AddRedirectButton = (props) => {
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate('/app/grupo-preguntas/crear-grupo-preguntas');
      }
  return (
        <SoftButton color="primary" onClick={handleBackButtonClick}>
            Agregar Grupo Preguntas
          </SoftButton>
  )
}


export default AddRedirectButton;