const errorMessage = {
  User: {
    Register: {
      existEmail: "已经存在该邮箱，无法进行注册",
      missingParameter: "缺少请求参数，请确认携带参数是否完整",
    },
  },
  Article: {},
  Global: {
    missingParameter: (value?: string) =>
      `缺少请求参数${value}，请确认携带参数是否完整`,
  },
};
export default errorMessage;
