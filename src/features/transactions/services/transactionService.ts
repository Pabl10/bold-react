import { TransactionsResponse, Transaction } from '../types/transaction.types';

/**
 * URL base de la API
 */
const API_BASE_URL = 'https://bold-fe-api.vercel.app/api';

/**
 * Clase de error personalizada para errores de API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Función para manejar errores de respuesta HTTP
 */
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `Error ${response.status}: ${response.statusText}`;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // Si no se puede parsear el JSON, usar el mensaje por defecto
  }
  
  throw new ApiError(errorMessage, response.status, response);
};

/**
 * Obtiene todas las transacciones desde la API
 * @returns Promise con la respuesta de la API
 * @throws {ApiError} Si hay un error en la petición
 */
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data: TransactionsResponse = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Error de red u otro tipo de error
    throw new ApiError(
      'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.',
      0
    );
  }
};

/**
 * Simula un delay para testing (opcional)
 * @param ms Milisegundos de delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Función de utilidad para reintentar peticiones fallidas
 * @param fn Función a ejecutar
 * @param retries Número de reintentos
 * @param delayMs Delay entre reintentos
 */
export const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await delay(delayMs);
      return retryRequest(fn, retries - 1, delayMs);
    }
    throw error;
  }
};
