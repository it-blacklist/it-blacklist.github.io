import { DetailTypes } from '../black-detail/data'

export interface ResTypes {
  errMsg: 'collection.get:ok' | 'cloud.callFunction:ok';
  result: {
    list: Array<DetailTypes>;
    total: number;
  };
  data: Array<DetailTypes>;
}