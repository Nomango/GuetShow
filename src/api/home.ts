import request from "@/utils/request";

interface RecommendParams {
  pageSize?: number;
}

export function fetchRecommend(params?: RecommendParams) {
  return request({
    url: "/api/work/recommend",
    method: "GET",
    params
  });
}
