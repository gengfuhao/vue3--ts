import axios from "axios";
//引入提示窗
// import { ElMessage } from "element-plus";

// enum MSGS {
//   "操作成功" = 200,
//   "密码错误",
//   "帐号错误",
//   "请求异常",
// }

//创建http请求
const $http = axios.create({
  baseURL: " http://localhost:3000",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

//请求拦截
$http.interceptors.request.use((config) => {
  //   config.headers = config.headers || {};
  //   if (localStorage.getItem("token")) {
  //     config.headers.token = localStorage.getItem("token") || "123";
  //   }
  return config;
});

$http.interceptors.response.use(
  (response) => {
    // const code: number = response.data.code;
    // console.log(code);

    // if (code !== 200) {
    //   ElMessage.error("122");

    //   return Promise.reject(response.data);
    // }

    return response.data;
  },
  (err) => {
    console.log(err);
  }
);
export default $http;
