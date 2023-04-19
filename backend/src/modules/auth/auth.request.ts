import { Request } from 'express';
import { UserDto } from '../users/users.dto';

export interface AuthenticatedRequest extends Request {
  auth: {
    user: UserDto;
  };
}
