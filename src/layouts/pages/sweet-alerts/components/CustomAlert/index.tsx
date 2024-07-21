// sweetalert2 components
import Swal, { SweetAlertResult } from "sweetalert2";
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string,
  icon: "info" | "success" | "warning" | "error" | "question",
  html: string,
  showCancelButton?: boolean | null,
  confirmButtonText?: string | null,
  cancelButtonText?: string | null,
  dismiss?: boolean | null,
  onConfirm?: () => void,
}

function MyAlert(props: Props): Promise<SweetAlertResult<any>> {

  return new Promise((resolve, reject) => {
    const { 
      title, 
      icon, 
      html, 
      showCancelButton = false,
      confirmButtonText = 'Aceptar',
      cancelButtonText = 'Cancel',
      dismiss = true 
    } = props; 

    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: "button button-primary",
        cancelButton: "button button-error",
      },
      buttonsStyling: false,
    });

    newSwal.fire({
      title: `<strong>${title}</strong>`,
      icon: icon,
      html: html,
      focusConfirm: false,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: cancelButtonText,
      cancelButtonAriaLabel: "Thumbs down",
      allowOutsideClick: dismiss,
    }).then((result) => {
      resolve(result);
    });
  });
}

export const showAlertAsync = async (props: Props): Promise<void> => {
  const { onConfirm } = props; 
  try {
    const result = await MyAlert(props);
    if (result.isConfirmed) {
      if(onConfirm != null){
        onConfirm();
      }
    }
  } catch (error) {
    console.error("Error al mostrar el alerta:", error);
  }
};