import axios from "axios";
import store from "@/store";
import { Toast } from "vant";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = "";
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res?.code !== 0) {
      Toast({
        type: "fail",
        message: res.message,
        duration: 3 * 1000
      });

      if (res.status === 401) {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return Promise.resolve(res);
    }
  },
  error => {
    Toast({
      message: error.message,
      type: "fail",
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
