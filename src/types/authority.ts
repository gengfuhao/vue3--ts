export class InitData {
  roleId;
  authority;
  constructor(roleId: number, authority: string) {
    this.roleId = roleId;
    //将string类型的 转换为string类型的数组 在通过map转化为number类型的数组
    this.authority = authority.split(",").map((v) => +v);
  }
}
