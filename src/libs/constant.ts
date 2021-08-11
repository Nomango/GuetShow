export enum SELECTTYPE {
  "school" = 1,
  "mentor" = 2,
  "level" = 3,
  "default" = -1
}

export const defaultWorksConfig = {
  page: 1,
  pageSize: 10
};

export const defaultLevel = {
  origin: [
    {
      id: 1,
      name: "一等奖"
    },
    {
      id: 2,
      name: "二等奖"
    },
    {
      id: 3,
      name: "三等奖"
    },
  ],
  target: ["一等奖", "二等奖", "三等奖"]
};
