import { AppError } from "@/domain/Errors/ AppError"
import axios, { AxiosError } from "axios"

export class SalesFormErrorHandler {
  static UNKNOWN_ERROR_MESSAGE = 'Nao foi possivel processar suas vendas, tente novamente mais tarde.'
  static BAD_REQUEST_MESSAGE = 'Hmm, parece que o arquivo nao esta correto, tente enviar um .txt'

  static toReadable(error: unknown): string {

    if(error instanceof AppError){
      return error.message
    } 

    if(axios.isAxiosError(error)){
      return SalesFormErrorHandler.handleAxiosError(error)
    }

    return SalesFormErrorHandler.UNKNOWN_ERROR_MESSAGE
  }

  private static handleAxiosError(error: AxiosError<{error: string, line: number}>): string {
    console.log(error.response?.status)
    if(error.response?.status === 400){
      const message = SalesFormErrorHandler.handleBadRequest(error.response.data.error)
      return `Linha ${error.response.data.line}: ${message}`
    }

    return SalesFormErrorHandler.UNKNOWN_ERROR_MESSAGE
  }

  private static badRequastErrorMap: Record<string, string> = {
    INVALID_TRANSACTION_TYPE_NAN: 'A posição 0 deve ser um número, representando o tipo de transação',
    INVALID_TRANSACTION_TYPE_INTERVAL: 'A posição 0 deve ser um número entre 1 e 4',
    INVALID_TRANSACTION_DATE: 'Data inválida, ela deve estar entre as posições 1 e 26',
    INVALID_TRANSACTION_PRODUCT: 'O nome do produto deve estar entre as posições 56 e 66',
    INVALID_TRANSACTION_SELLER_NAME: 'O nome do vendedor deve estar entre as posições 66 e 86',
    INVALID_TRANSACTION_VALUE: 'O valor deve estar entre as posições 56 e 66'
  }

  private static handleBadRequest(error: string): string{
    if(error in SalesFormErrorHandler.badRequastErrorMap){
      return SalesFormErrorHandler.badRequastErrorMap[error]
    }
    return SalesFormErrorHandler.BAD_REQUEST_MESSAGE
  }
}