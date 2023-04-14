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
    destination: path.join(Constants.ROOT_DIR, 'samples'),
    fieldname: 'sales',
    filename: `sales-${Date.now()}.txt`,
    originalname: 'sales.txt',
    path: path.join(Constants.ROOT_DIR, 'samples', 'sales.txt'),
  });

  return file;
};

export const getTransactionsMock = (): TransactionDto[] => [
  {
    type: 1,
    date: '2022-01-15T19:20:30-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 127.5,
    sellerName: 'JOSE CARLOS',
  },
  {
    type: 1,
    date: '2021-12-03T11:46:02-03:00',
    product: 'DOMINANDO INVESTIMENTOS',
    value: 500.0,
    sellerName: 'MARIA CANDIDA',
  },
  {
    type: 2,
    date: '2022-01-16T14:13:54-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 127.5,
    sellerName: 'THIAGO OLIVEIRA',
  },
  {
    type: 4,
    date: '2022-01-16T14:13:54-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 45.0,
    sellerName: 'THIAGO OLIVEIRA',
  },
  {
    type: 3,
    date: '2022-01-16T14:13:54-03:00',
    product: 'CURSO DE BEM-ESTAR',
    value: 45.0,
    sellerName: 'JOSE CARLOS',
  },
  {
    type: 1,
    date: '2022-01-22T08:59:13-03:00',
    product: 'DOMINANDO INVESTIMENTOS',
    value: 500.0,
    sellerName: 'MARIA CANDIDA',
  },
  {
    type: 1,
    date: '2022-02-01T23:35:43-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 1550.0,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 2,
    date: '2022-02-03T17:23:37-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 1550.0,
    sellerName: 'CARLOS BATISTA',
  },
  {
    type: 2,
    date: '2022-02-03T20:51:59-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 1550.0,
    sellerName: 'CAROLINA MACHADO',
  },
  {
    type: 2,
    date: '2022-02-04T07:42:12-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 1550.0,
    sellerName: 'CELSO DE MELO',
  },
  {
    type: 4,
    date: '2022-02-03T17:23:37-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 500.0,
    sellerName: 'CARLOS BATISTA',
  },
  {
    type: 4,
    date: '2022-02-03T20:51:59-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 500.0,
    sellerName: 'CAROLINA MACHADO',
  },
  {
    type: 4,
    date: '2022-02-04T07:42:12-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 500.0,
    sellerName: 'CELSO DE MELO',
  },
  {
    type: 3,
    date: '2022-02-03T17:23:37-03:00',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 500.0,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 3,
    date: '2022-02-03T20:23:37.000Z',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 500.0,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 3,
    date: '2022-02-04T10:51:59.000Z',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 500.0,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 1,
    date: '2022-02-19T08:33:07.000Z',
    product: 'DOMINANDO INVESTIMENTOS',
    value: 500.0,
    sellerName: 'MARIA CANDIDA',
  },
  {
    type: 1,
    date: '2022-03-01T05:09:54.000Z',
    product: 'CURSO DE BEM-ESTAR',
    value: 127.5,
    sellerName: 'JOSE CARLOS',
  },
  {
    type: 1,
    date: '2022-03-03T12:07:35.000Z',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 1550.0,
    sellerName: 'ELIANA NOGUEIRA',
  },
  {
    type: 1,
    date: '2022-03-03T16:12:16.000Z',
    product: 'DESENVOLVEDOR FULL STACK',
    value: 1550.0,
    sellerName: 'ELIANA NOGUEIRA',
  },
];
