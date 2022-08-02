import $http from "./index";
import axios from "axios";
interface paginData {
  userName: String;
  passWord: String;
}
export const pagin11 = (data: paginData) =>
  $http({
    url: "/pagin",
    method: "post",
    data,
  });
export const getList = () =>
  $http({
    url: "/getList",
    method: "get",
  });
export const getUserList = () =>
  $http({
    url: "/userList",
    method: "get",
  });
export const getRoleList = () =>
  $http({
    url: "/roleList",
    method: "get",
  });
