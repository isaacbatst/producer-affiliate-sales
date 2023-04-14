import * as path from 'path';
import { Constants } from '../../common/constants';
import { FileReaderFs } from '../../infra/common/FileReader/FileReaderFs';
import { MulterFileFactory } from '../../infra/common/MulterFileFactory/MulterFileFactory';
import { TransactionDto } from './transactions.dto';

export const getSalesFileMock = async () => {
  const fileReader = new FileReaderFs();
  const buffer = await fileReader.toBuffer(
    path.join(Constants.ROOT_DIR, 'sample', 'sales.txt'),
  );
  const file = await MulterFileFactory.create(buffer, {
    destination: path.join(Constants.ROOT_DIR, 'sample'),
    fieldname: 'sales',
    filename: `sales-${Date.now()}.txt`,
    originalname: 'sales.txt',
    path: path.join(Constants.ROOT_DIR, 'sample', 'sales.txt'),
  });

  return file;
};

export const getTransactionsMock = (): TransactionDto[] => [
  {
    type: 1,
    date: '2022-01-15T19:20:30-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 12750,
    sellerName: 'JOSE CARLOS',
  },
  {
    type: 1,
    date: '2021-12-03T11:46:02-03:00',
    product: 'DOMINANDO INVESTIMENTOS',
    value: 50000,
    sellerName: 'MARIA CANDIDA',
  },
  {
    type: 2,
    date: '2022-01-16T14:13:54-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 12750,
    sellerName: 'THIAGO OLIVEIRA',
  },
  {
    type: 4,
    date: '2022-01-16T14:13:54-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 4500,
    sellerName: 'THIAGO OLIVEIRA',
  },
  {
    type: 3,
    date: '2022-01-16T14:13:54-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 4500,
    sellerName: 'JOSE CARLOS',
  },
  {
    type: 1,
    date: '2022-01-22T08:59:13-03:00',
    product: 'DOMINANDO INVESTIMENTOS',
    value: 50000,
    sellerName: 'MARIA CANDIDA',
  },
  {
    type: 1,
    date: '2022-02-01T23:35:43-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 155000,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 2,
    date: '2022-02-03T17:23:37-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 155000,
    sellerName: 'CARLOS BATISTA',
  },
  {
    type: 2,
    date: '2022-02-03T20:51:59-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 155000,
    sellerName: 'CAROLINA MACHADO',
  },
  {
    type: 2,
    date: '2022-02-04T07:42:12-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 155000,
    sellerName: 'CELSO DE MELO',
  },
  {
    type: 4,
    date: '2022-02-03T17:23:37-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 50000,
    sellerName: 'CARLOS BATISTA',
  },
  {
    type: 4,
    date: '2022-02-03T20:51:59-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 50000,
    sellerName: 'CAROLINA MACHADO',
  },
  {
    type: 4,
    date: '2022-02-04T07:42:12-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 50000,
    sellerName: 'CELSO DE MELO',
  },
  {
    type: 3,
    date: '2022-02-03T17:23:37-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 50000,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 3,
    date: '2022-02-03T20:51:59-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 50000,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 3,
    date: '2022-02-04T07:42:12-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 50000,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 1,
    date: '2022-02-19T05:33:07-03:00',
    product: 'DOMINANDO INVESTIMENTOS',
    value: 50000,
    sellerName: 'MARIA CANDIDA',
  },
  {
    type: 1,
    date: '2022-03-01T02:09:54-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 12750,
    sellerName: 'JOSE CARLOS',
  },
  {
    type: 1,
    date: '2022-03-03T09:07:35-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 155000,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 1,
    date: '2022-03-03T13:12:16-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 155000,
    sellerName: 'ELIANA NOGUEIRA',
  },
];
