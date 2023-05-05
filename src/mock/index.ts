import { MockMethod } from 'vite-plugin-mock';

// 接口返回标准
interface IResponse {
  success: boolean;
  code: number;
  message: string;
  timestamp: string;
  data: any;
}

const mock: Array<MockMethod> = [
  {
    // 接口路径
    url: '/api/test',
    // 接口方法
    method: 'get',
    // 返回数据
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: 'success',
        timestamp: new Date().getTime().toString(),
        data: 'Hello World'
      };
    }
  },
  {
    url: '/api/system/aesKey',
    method: 'get',
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: 'success',
        timestamp: new Date().getTime().toString(),
        data: 158680186259587
      };
    }
  },
  {
    url: '/api/user/validateCode',
    method: 'get',
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: '获取验证码成功！',
        timestamp: new Date().getTime().toString(),
        // eslint-disable-next-line max-len
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAgCAIAAAD/r+OLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAMUSURBVGiB7VlRkqIwEA3U3sJwDsNcgwSuQc1cQy2PYdBrgDkHcg3T+9E12QxETTDqTpXvSxC7Oy/9ujuYAAB5Y4L01QH8p3jz4sabFzfevLjxa3jJsmyz2TzPH/ihaZq6rj0ffgRMwE3TPMOd53Naa0II5/yh0VwBIQRjCN3RefDVUZIkQgilFLxu3kmSBADatpVS4iVGVZZlfF9B68zzXCnV932WZdNv9/u9fUkpzfP83gC/gaQ47+MHKWVMgoKyCzNZSmnuNE1zyXJc0U1DHbk7n88R3f0JIjFJEillVVXDMHx+fmKsmNWIsiz3+31ZlpF379s4fsDErOsa8/H1OkJsNhsA+Pr6cltMkqIoDofDvIBOp5NSylzaa14sFkgEY+yS92iImHsAIIQghGitZ/zKid1up7VG/YaavQeReaGUBpWVrutw/dKCc/2zt7DrOuQ9KLBrzvq+x6C7rvM1FxI91uyiKKJbBoC+7+2esFwug35+zRkmsL80PIVpq4Zz7qmOIF6megzVoJezuq6dYeGBBV2iIuwWbkMIIYRgjNmq6fv+pmus8XCLFxQLpRTtY8CItm1vr3ACL15wzaPzEWbparWyL+0HMJPNaMc5988O2ybn3CmE0ehUFAXn3Gh/sVg4C4pnTQg7H41i2u12/wz9FJEtFtSjp6ORC8OLnYkjGRr4ePQswAGiZYxRSrXWKB+bFCMom45LneU6TPtAF0II5IUxZu4zxkYyNBl93al/YwqYd4/HY57naZqifKqqsr8ihKRpulwuV6vV7KHreDx+fHwURdG2bZZlSqlhGNC4UgqHgNEpzIBzvt1ut9stsQ5NBmY+pJQOwwAA02d+IGgzp/JBoKnz+Xzn6HVpwU6nU2it7UOJDTMfeo6IAbxM5QMApsXMK/sjyJ9AYWKXudTpZmDKixBidCfgfR2xug9ivV5jl4lCihOmpkS0iSzbNqeN0sufaQ0Rg/PEg3i5KUyvuiuEgNe9posOTJYbbyci7sMjsF6vXxLnnPcvTwZGeKOtxsYv4OUl+DX/qz0Zb17c+AskFXhq7Zvh0wAAAABJRU5ErkJggg=='
      };
    }
  },
  {
    url: '/api/system/routes',
    method: 'post',
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: '获取路由表成功！',
        timestamp: new Date().getTime().toString(),
        data: 158680186259587
      };
    }
  },
];

export default mock;
