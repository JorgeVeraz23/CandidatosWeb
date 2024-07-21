// ReportRepository.ts
import { GETEXCEL_REPORT } from "app/api/urls/urls";

// Define la función fuera de la clase
export const downloadExcel = () => {
  const url = GETEXCEL_REPORT('2024-03-01', '2024-03-01', 7);
  window.open(url, '_blank');
};

export default class ReportRepository {
  // Contenido de la clase
}
