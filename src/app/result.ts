export class Result {
  constructor(code: number, data: any, message: string) {
    this.code = code;
    this.data = data || "";
    this.message = message;
  }
  code: number = 200;
  message: string = "请求成功";
  data: any = {};
  static success(data?: any, message?: string): Result {
    return new Result(200, data, message);
  }
  static fail(code?: number, message?: string, data?: any) {
    return new Result(code || 500, data, message);
  }
}
