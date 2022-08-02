export interface listInt {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface SelectDataInt {
  page: number;
  count: number;
  title: string;
  body: string;
}
export class InitData {
  selectData: SelectDataInt = {
    page: 0,
    count: 0,
    title: "",
    body: "",
  };
  list: [listInt][] = [];
  dataList: listInt[] = [];
}
