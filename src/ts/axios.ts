import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { adminToken } from "./cookie";
import Loading from "../ts/loading";
import { apiAddress, apiSiteName } from "../ts/config";
import { ElMessage } from "element-plus";

const loading = Loading();

const isDev = process.env.NODE_ENV === "development";
const axiosInstance: any = axios.create({
  baseURL: isDev ? "/api" : apiAddress,
});

axiosInstance.defaults.timeout = 10000;
axiosInstance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    loading.show();
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    loading.hide();
    const response = res.data;
    if (response.code === 200) {
      return response.data;
    } else {
      if (response.msg) {
        ElMessage.error(`${response.code}:${response.msg}`);
      }
      return null;
    }
  },
  (err: any) => {
    loading.hide();
    if (err.response && err.response.data && err.response.data.code) {
      ElMessage.error(`ERRCODE:${err.response.data.code}`);
    } else {
      ElMessage.error(err.toString())
    }
    return null;
  }
);

interface requestDataInterface {
  method?: string;
  url: string;
  data?: { [key: string]: any };
  upload?: boolean;
  param?: FormData;
}

const request = ({
  method = "get",
  url,
  data,
  upload = false,
  param,
}: requestDataInterface): Promise<any> => {
  const token = adminToken.get();

  if (token) {
    axiosInstance.defaults.headers.Authorization = "Bearer " + token;
  }

  return new Promise((resolve) => {
    try {
      if (upload) {
        axiosInstance.post(url, param).then((response: any) => {
          resolve(response);
        });
      } else {
        data = Object.assign({ siteName: apiSiteName }, data);
        data =
          method === "get"
            ? { params: data }
            : method === "delete"
              ? { data }
              : data;
        axiosInstance[method](url, data).then((response: any) => {
          resolve(response);
        });
      }
    } catch (err) {
      console.log("axios config:" + err);
    }
  });
};

export default request;
