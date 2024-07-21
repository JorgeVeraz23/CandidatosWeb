import { useNavigate } from 'react-router-dom';
import SoftButton from "components/SoftButton";
const AddRedirectButton = (props) => {
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate('/app/pregunta/crear-preguntas');
      }
  return (
        <SoftButton color="primary" onClick={handleBackButtonClick}>
            Agregar Nueva Pregunta
          </SoftButton>
  )
}

export default AddRedirectButton;