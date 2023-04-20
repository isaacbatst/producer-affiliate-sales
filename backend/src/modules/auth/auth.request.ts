import { Request } from 'express';
import { User } from 'src/domain/User/User';

export interface AuthenticatedRequest extends Request {
  auth: {
    user: User;
    token: string;
  };
}
