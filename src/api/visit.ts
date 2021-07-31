import request from "@/utils/request";

interface VisitParams {
  path?: string;
}

export function visit(params?: VisitParams) {
  return request({
    url: "/api/visit",
    method: "GET",
    params
  });
}
