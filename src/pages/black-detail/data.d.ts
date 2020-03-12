export interface DetailTypes {
  _id: string;
  name: string;
  info: string;
  time: string;
  checked: boolean;
}

export interface RateListTypes {
  _id: string;
  content: string;
}

export interface SubmitResTypes {
  result: {
    errMsg: 'collection.add:ok' | '';
    errCode: number
  };
  errMsg: 'collection.add:ok' | '';
}

export interface ResTypes {
  errMsg: 'collection.get:ok';
  result: {
    list: Array<DetailTypes>;
    total: number;
  };
  data: Array<RateListTypes>;
}