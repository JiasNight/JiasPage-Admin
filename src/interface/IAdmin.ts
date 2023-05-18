// 接口返回统一标准
export interface IResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  timestamp: string;
  data: T;
}

// 用户信息
export interface IUserInfo {
  userId: string;
  userName: string;
  userNickName: string;
  token: string;
  deptId: string;
  deptName: string;
}
