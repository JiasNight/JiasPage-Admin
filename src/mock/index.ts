import { MockMethod } from 'vite-plugin-mock';
import { formatDate } from '@/utils/common';
import { IResponse } from '@/interface/IAdmin';

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
        timestamp: formatDate(),
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
        timestamp: formatDate(),
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
        timestamp: formatDate(),
        // eslint-disable-next-line max-len
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAgCAIAAAD/r+OLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAMUSURBVGiB7VlRkqIwEA3U3sJwDsNcgwSuQc1cQy2PYdBrgDkHcg3T+9E12QxETTDqTpXvSxC7Oy/9ujuYAAB5Y4L01QH8p3jz4sabFzfevLjxa3jJsmyz2TzPH/ihaZq6rj0ffgRMwE3TPMOd53Naa0II5/yh0VwBIQRjCN3RefDVUZIkQgilFLxu3kmSBADatpVS4iVGVZZlfF9B68zzXCnV932WZdNv9/u9fUkpzfP83gC/gaQ47+MHKWVMgoKyCzNZSmnuNE1zyXJc0U1DHbk7n88R3f0JIjFJEillVVXDMHx+fmKsmNWIsiz3+31ZlpF379s4fsDErOsa8/H1OkJsNhsA+Pr6cltMkqIoDofDvIBOp5NSylzaa14sFkgEY+yS92iImHsAIIQghGitZ/zKid1up7VG/YaavQeReaGUBpWVrutw/dKCc/2zt7DrOuQ9KLBrzvq+x6C7rvM1FxI91uyiKKJbBoC+7+2esFwug35+zRkmsL80PIVpq4Zz7qmOIF6megzVoJezuq6dYeGBBV2iIuwWbkMIIYRgjNmq6fv+pmus8XCLFxQLpRTtY8CItm1vr3ACL15wzaPzEWbparWyL+0HMJPNaMc5988O2ybn3CmE0ehUFAXn3Gh/sVg4C4pnTQg7H41i2u12/wz9FJEtFtSjp6ORC8OLnYkjGRr4ePQswAGiZYxRSrXWKB+bFCMom45LneU6TPtAF0II5IUxZu4zxkYyNBl93al/YwqYd4/HY57naZqifKqqsr8ihKRpulwuV6vV7KHreDx+fHwURdG2bZZlSqlhGNC4UgqHgNEpzIBzvt1ut9stsQ5NBmY+pJQOwwAA02d+IGgzp/JBoKnz+Xzn6HVpwU6nU2it7UOJDTMfeo6IAbxM5QMApsXMK/sjyJ9AYWKXudTpZmDKixBidCfgfR2xug9ivV5jl4lCihOmpkS0iSzbNqeN0sufaQ0Rg/PEg3i5KUyvuiuEgNe9posOTJYbbyci7sMjsF6vXxLnnPcvTwZGeKOtxsYv4OUl+DX/qz0Zb17c+AskFXhq7Zvh0wAAAABJRU5ErkJggg=='
      };
    }
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: '用户登录成功！',
        timestamp: formatDate(),
        data: {
          userId: '220101197812079303',
          token: 'Yji4yUXtgppyAb6IXBW5B4CEPtYzBoC0yODiOo4biBIY0cSzCb2VuZKEPdD1qLv0'
        }
      };
    }
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: '获取用户信息成功！',
        timestamp: formatDate(),
        data: {
          userId: '220101197812079303',
          userName: 'admin',
          userNickName: '超级管理员',
          token: 'Yji4yUXtgppyAb6IXBW5B4CEPtYzBoC0yODiOo4biBIY0cSzCb2VuZKEPdD1qLv0',
          deptId: 100,
          deptName: '行政部'
        }
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
        timestamp: formatDate(),
        data: [
          {
            path: '/article',
            name: 'ArticleManage',
            meta: {
              title: '文章管理'
            },
            isShow: true,
            isCache: false,
            menuType: 1,
            component: 'layout/index',
            children: [
              {
                path: 'releaseArticle',
                name: 'ReleaseArticle',
                meta: {
                  title: '发布文章'
                },
                isShow: true,
                isCache: false,
                menuType: 2,
                component: '/article/index'
              }
            ]
          }
          // {
          //   path: '/system',
          //   name: 'SystemManage',
          //   meta: {
          //     title: '系统管理'
          //   },
          //   isShow: true,
          //   isCache: false,
          //   menuType: 1,
          //   component: 'layout/index',
          //   children: [
          //     {
          //       path: 'userManage',
          //       name: 'UserManage',
          //       meta: {
          //         title: '用户管理'
          //       },
          //       isShow: true,
          //       isCache: false,
          //       menuType: 2,
          //       component: 'system/userManage/index'
          //     }
          //   ]
          // }
        ]
      };
    }
  }
];

export default mock;