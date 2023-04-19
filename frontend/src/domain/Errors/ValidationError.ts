import { AppError } from "./ AppError";

export class ValidationError extends AppError {
  name = 'ValidationError';
}