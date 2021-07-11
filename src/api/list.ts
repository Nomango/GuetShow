import request from "@/utils/request";

export function fetchWorks(params?: any) {
  return request({
    url: "/api/work",
    method: "GET",
    params
  });
}

export function fetchSchools(params?: any) {
  return request({
    url: "/api/school",
    method: "get",
    params
  });
}

export function fetchMentors(params?: any) {
  return request({
    url: "/api/teacher",
    method: "get",
    params
  });
}

export function getWorkListById(params: { id: number }) {
  return request({
    url: `/api/work/${params.id}`,
    method: "get"
  });
}
