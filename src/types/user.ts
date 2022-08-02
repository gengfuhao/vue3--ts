export interface listInt {
  id: number;
  nikeName: string;
  userName: string;
  role: roleInt[];
}
interface reactiveInt {
  id: number;
  nikeName: string;
  userName: string;
  role: number[];
}

interface roleInt {
  role: number;
  roleName: string;
}

interface SelectDataInt {
  role: number;
  nikeName: string;
}
interface roleListInt {
  roleId: number;
  roleName: string;
  authority: number[];
}

export class InitData {
  selectData: SelectDataInt = {
    role: 0,
    nikeName: "",
  };
  list: [listInt][] = [];
  list2: [listInt][] = [];
  roleList: roleListInt[] = [];
  active: reactiveInt = {
    id: 0,
    nikeName: "",
    userName: "",
    role: [],
  };
  isShow: boolean = false;
}
