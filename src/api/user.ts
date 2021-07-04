import request from "@/utils/request";

export function login(data: any) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data
  });
}

export function getInfo(token: any) {
  return request({
    url: "/api/user/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/api/user/logout",
    method: "post"
  });
}
