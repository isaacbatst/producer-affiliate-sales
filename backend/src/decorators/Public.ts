import { SetMetadata } from '@nestjs/common';
import { Constants } from 'src/common/constants';

export const Public = () => SetMetadata(Constants.IS_PUBLIC_KEY, true);
