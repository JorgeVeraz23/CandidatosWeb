/**
 * Obtiene la fecha de hoy en formato de cadena "yyyy-MM-dd".
 * @returns La fecha de hoy en formato "yyyy-MM-dd".
 */
export function getTodayDateStr(days: number = 0): string {
    const today = new Date();
    today.setDate(today.getDate() + days);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Convierte un string de fecha del formato "yyyy-MM-ddTHH:mm:ss" a "yyyy-MM-dd".
 * @param {string} fecha - La cadena de fecha en formato "yyyy-MM-ddTHH:mm:ss".
 * @returns {string} La cadena de fecha en formato "yyyy-MM-dd".
 */
export function convertISODateTimeToDate(isoDateString: string): string{
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate; 
}

/**
 * Convierte un string de fecha del formato "yyyy-MM-dd" a "dd/MM/yyyy".
 * @param {string} fecha - La cadena de fecha en formato "yyyy-MM-dd".
 * @returns {string} La cadena de fecha en formato "dd/MM/yyyy".
 */
export function convertISODateToLocalDate(fecha: string): string {
    const fechaObj = new Date(fecha);
    
    const dia = fechaObj.getUTCDate().toString().padStart(2, '0');
    const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const año = fechaObj.getUTCFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
}

export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}