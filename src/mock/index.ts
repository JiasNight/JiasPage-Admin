import { MockMethod } from "vite-plugin-mock";
import { formatDate } from "@/utils/common";
import { IResponse } from "@/interface/common";

// 菜单数据
const MENU_LIST = [
  {
    pid: "0",
    id: "ab62e594a25d4c0dab54cda018b850ee",
    path: "/note",
    name: "NoteManage",
    meta: {
      title: "笔记管理",
      icon: "mdi:microsoft-onenote",
      show: 0,
      disabled: 1,
      cache: 1,
      type: 1,
      description: "笔记管理",
    },
    component: "",
    children: [
      {
        pid: "ab62e594a25d4c0dab54cda018b850ee",
        id: "594911e6ec0f4df99498675eb303be3d",
        path: "note-overview",
        name: "NoteOverview",
        meta: {
          title: "笔记概览",
          icon: "mdi:event-note-outline",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "笔记概览",
        },
        component: "/noteManage/noteOverview",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "ab62e594a25d4c0dab54cda018b850ee",
        id: "b547c33203994ae3afa48c4807a25b8f",
        path: "my-note",
        name: "MyNote",
        meta: {
          title: "我的笔记",
          icon: "mdi:notebook-edit",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "我的笔记",
        },
        component: "/noteManage/myNote",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "ab62e594a25d4c0dab54cda018b850ee",
        id: "1092792329fb40658c362c159a0557e0",
        path: "module",
        name: "ModuleType",
        meta: {
          title: "模块分类",
          icon: "mdi:list-box",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "模块分类",
        },
        component: "/noteManage/moduleType",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
    ],
    createBy: "admin",
    createTime: "2024-01-10 12:21:33",
  },
  {
    pid: "0",
    id: "6fa28cf73c6c4c11bec106553d69c1b9",
    path: "/system",
    name: "SystemManage",
    meta: {
      title: "系统管理",
      icon: "ic:baseline-settings",
      show: 0,
      disabled: 1,
      cache: 1,
      type: 1,
      description: "系统管理",
    },
    component: "",
    children: [
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "3bf0941cbcdc4f95b03e4096997ed18d",
        path: "userManage",
        name: "UserManage",
        meta: {
          title: "用户管理",
          icon: "mdi:account-details",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "用户管理",
        },
        component: "/system/userManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "0a1969567e1842a18cac009ef0d1f79f",
        path: "menuManage",
        name: "MenuManage",
        meta: {
          title: "菜单管理",
          icon: "mdi:menu",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "菜单管理",
        },
        component: "/system/menuManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "2fb5971c-d713-4f77-9d90-e6c6bc833083",
        path: "deptManage",
        name: "DeptManage",
        meta: {
          title: "部门管理",
          icon: "mdi:account-credit-card",
          show: 0,
          disabled: 1,
          cache: 0,
          type: 1,
          description: "部门管理",
        },
        component: "/system/deptManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "bbefb3e1c54e48b0a219ade0c916ca6a",
        path: "roleManage",
        name: "RoleManage",
        meta: {
          title: "角色管理",
          icon: "mdi:account-lock",
          show: 0,
          disabled: 1,
          cache: 0,
          type: 1,
          description: "角色管理",
        },
        component: "/system/roleManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "f6d3c8a3cb9e472fab9ce891e45040ef",
        path: "dictManage",
        name: "DictManage",
        meta: {
          title: "字典管理",
          icon: "mdi:book-open",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "",
        },
        component: "/system/dictManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "2fb5971c-d713-4f77-9d90-e6c6bc833083",
        path: "http://www.baidu.com",
        name: "baidu",
        meta: {
          title: "跳转百度",
          icon: "mdi:link-plus",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 3,
          description: "跳转百度",
        },
        component: "",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "12b1b100248e47a2b9fe0833dafb5caf",
        path: "sysMonitor",
        name: "SysMonitor",
        meta: {
          title: "系统监控",
          icon: "mdi:monitor-dashboard",
          show: 0,
          disabled: 0,
          cache: 1,
          type: 1,
          description: "系统监控",
        },
        component: "/system/dictManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "fb5456d06aa041dd9f194846b7b73758",
        path: "logManage",
        name: "LogManage",
        meta: {
          title: "日志管理",
          icon: "mdi:book-open",
          show: 0,
          disabled: 0,
          cache: 1,
          type: 1,
          description: "日志管理",
        },
        component: "",
        children: [
          {
            pid: "fb5456d06aa041dd9f194846b7b73758",
            id: "bca3ca6391a7484bb1aaac88b3b5a14b",
            path: "signInLog",
            name: "SignInLog",
            meta: {
              title: "登录日志",
              icon: "mdi:message-reply-text",
              show: 0,
              disabled: 1,
              cache: 1,
              type: 1,
              description: "登录日志",
            },
            component: "/system/logManage/index",
            createBy: "admin",
            createTime: "2024-01-10 12:21:33",
          },
          {
            pid: "fb5456d06aa041dd9f194846b7b73758",
            id: "d65d22de9f9f42ab96c0f3011c20a412",
            path: "operLog",
            name: "OperLog",
            meta: {
              title: "操作日志",
              icon: "mdi:wrench-cog",
              show: 0,
              disabled: 1,
              cache: 1,
              type: 1,
              description: "操作日志",
            },
            component: "/system/logManage/index",
            createBy: "admin",
            createTime: "2024-01-10 12:21:33",
          },
        ],
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
    ],
    createBy: "admin",
    createTime: "2024-01-10 12:21:33",
  },
];

// 部门数据
const DEPT_LIST = [
  {
    id: "2fb5971cd7134f779d90e6c6bc833083",
    pid: "0",
    name: "xxx公司",
    code: "aaa",
    description: "",
    status: 0,
    order: 1,
    createBy: "admin",
    createTime: "2024-01-10 12:21:33",
    children: [
      {
        id: "5c65635132b04b1d9ef456dacf5dfdbc",
        pid: "2fb5971cd7134f779d90e6c6bc833083",
        name: "部门1",
        code: "a",
        description: "",
        status: 0,
        order: 1,
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        id: "3f0e6e9885e9431ca8a984ad4439f4b1",
        pid: "2fb5971cd7134f779d90e6c6bc833083",
        name: "部门2",
        code: "b",
        description: "",
        status: 0,
        order: 2,
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
      {
        id: "cf1a2728c9ca4a0f9a90319ce564d1a3",
        pid: "2fb5971cd7134f779d90e6c6bc833083",
        name: "部门3",
        code: "c",
        description: "",
        status: 0,
        order: 3,
        createBy: "admin",
        createTime: "2024-01-10 12:21:33",
      },
    ],
  },
];

// 角色数据
const ROLE_LIST = [
  {
    name: "管理员",
    code: "admin",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32",
  },
  {
    name: "老板",
    code: "boss",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32",
  },
  {
    name: "经理",
    code: "manager",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32",
  },
];

// 笔记数据
const NOTE_LIST = [
  {
    name: "人生何处不相逢",
    code: "admin",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32",
  },
  {
    name: "处处闻啼鸟",
    code: "boss",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32",
  },
  {
    name: "初始Linux",
    code: "manager",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32",
  },
];

const mock: Array<MockMethod> = [
  {
    // 接口路径
    url: "/api/test",
    // 接口方法
    method: "get",
    // 返回数据
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "success",
        timestamp: formatDate(),
        data: "Hello World",
      };
    },
  },
  {
    url: "/api/security/pKey",
    method: "get",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "success",
        timestamp: formatDate(),
        data: {
          // eslint-disable-next-line max-len
          pKey: `-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGV1/6aM0Ko2erbkSjHUDYnxnTBigu8RqN8sR7xW+NZ62/Roy//AN52VDFjqvS7lXFDMc7T+wBfE5ScK4qvYnsmRG/n+TD2wPFFGxhmdugF86EWDxVpmo7fRV0smmPGjBvXMzHlovzJah+gzeIxkODhskLyOaj53HGpqYJ0uC807AgMBAAE=-----END PUBLIC KEY-----
          `,
          safe: true,
        },
      };
    },
  },
  {
    url: "/api/user/validateCode",
    method: "get",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取验证码成功！",
        timestamp: formatDate(),
        data: {
          base64:
            // eslint-disable-next-line max-len
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAgCAIAAAD/r+OLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAMUSURBVGiB7VlRkqIwEA3U3sJwDsNcgwSuQc1cQy2PYdBrgDkHcg3T+9E12QxETTDqTpXvSxC7Oy/9ujuYAAB5Y4L01QH8p3jz4sabFzfevLjxa3jJsmyz2TzPH/ihaZq6rj0ffgRMwE3TPMOd53Naa0II5/yh0VwBIQRjCN3RefDVUZIkQgilFLxu3kmSBADatpVS4iVGVZZlfF9B68zzXCnV932WZdNv9/u9fUkpzfP83gC/gaQ47+MHKWVMgoKyCzNZSmnuNE1zyXJc0U1DHbk7n88R3f0JIjFJEillVVXDMHx+fmKsmNWIsiz3+31ZlpF379s4fsDErOsa8/H1OkJsNhsA+Pr6cltMkqIoDofDvIBOp5NSylzaa14sFkgEY+yS92iImHsAIIQghGitZ/zKid1up7VG/YaavQeReaGUBpWVrutw/dKCc/2zt7DrOuQ9KLBrzvq+x6C7rvM1FxI91uyiKKJbBoC+7+2esFwug35+zRkmsL80PIVpq4Zz7qmOIF6megzVoJezuq6dYeGBBV2iIuwWbkMIIYRgjNmq6fv+pmus8XCLFxQLpRTtY8CItm1vr3ACL15wzaPzEWbparWyL+0HMJPNaMc5988O2ybn3CmE0ehUFAXn3Gh/sVg4C4pnTQg7H41i2u12/wz9FJEtFtSjp6ORC8OLnYkjGRr4ePQswAGiZYxRSrXWKB+bFCMom45LneU6TPtAF0II5IUxZu4zxkYyNBl93al/YwqYd4/HY57naZqifKqqsr8ihKRpulwuV6vV7KHreDx+fHwURdG2bZZlSqlhGNC4UgqHgNEpzIBzvt1ut9stsQ5NBmY+pJQOwwAA02d+IGgzp/JBoKnz+Xzn6HVpwU6nU2it7UOJDTMfeo6IAbxM5QMApsXMK/sjyJ9AYWKXudTpZmDKixBidCfgfR2xug9ivV5jl4lCihOmpkS0iSzbNqeN0sufaQ0Rg/PEg3i5KUyvuiuEgNe9posOTJYbbyci7sMjsF6vXxLnnPcvTwZGeKOtxsYv4OUl+DX/qz0Zb17c+AskFXhq7Zvh0wAAAABJRU5ErkJggg==",
        },
      };
    },
  },
  {
    url: "/api/user/signIn",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "用户登录成功！",
        timestamp: formatDate(),
        data: {
          userId: "220101197812079303",
          token: "Yji4yUXtgppyAb6IXBW5B4CEPtYzBoC0yODiOo4biBIY0cSzCb2VuZKEPdD1qLv0",
        },
      };
    },
  },
  {
    url: "/api/user/info",
    method: "get",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取用户信息成功！",
        timestamp: formatDate(),
        data: {
          userId: "220101197812079303",
          userName: "admin",
          userNickName: "超级管理员",
          token: "Yji4yUXtgppyAb6IXBW5B4CEPtYzBoC0yODiOo4biBIY0cSzCb2VuZKEPdD1qLv0",
          deptId: 100,
          deptName: "行政部",
        },
      };
    },
  },
  {
    url: "/api/system/menu/list",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取菜单数据成功！",
        timestamp: formatDate(),
        data: MENU_LIST,
      };
    },
  },
  {
    url: "/api/system/routes",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取路由表成功！",
        timestamp: formatDate(),
        data: MENU_LIST,
      };
    },
  },
  {
    url: "/api/system/getDept",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取部门数据成功！",
        timestamp: formatDate(),
        data: [
          {
            label: "部门1",
            id: "1",
            parentId: "0",
            isLeaf: false,
            children: [
              {
                label: "部门1.1",
                id: "11",
                parentId: "1",
                isLeaf: true,
              },
              {
                label: "部门1.2",
                id: "12",
                parentId: "1",
                isLeaf: true,
              },
            ],
          },
          {
            label: "部门2",
            id: "2",
            parentId: "0",
            isLeaf: false,
            children: [
              {
                label: "部门2.1",
                id: "21",
                parentId: "2",
                isLeaf: true,
              },
              {
                label: "部门2.2",
                id: "22",
                parentId: "2",
                isLeaf: true,
              },
            ],
          },
        ],
      };
    },
  },
  {
    url: "/api/system/getUsers",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取用户数据成功！",
        timestamp: formatDate(),
        data: [
          {
            userId: "121321",
            userName: "hjh_df",
            nickName: "郝佳惠",
            gender: 1,
            deptId: "",
            phoneNumber: 18564796520,
            userRole: "0",
            userAvatar: "",
            status: 0,
            createTime: "2022-06-12 15:36:20",
          },
          {
            userId: "1212321",
            userName: "dfa",
            nickName: "袁佳昊",
            gender: 1,
            deptId: "",
            phoneNumber: 17774096498,
            userRole: "0",
            userAvatar: "",
            status: 0,
            createTime: "2022-06-12 15:36:20",
          },
          {
            userId: "13132",
            userName: "test",
            nickName: "邱添池",
            gender: 1,
            deptId: "",
            phoneNumber: 15599530093,
            userRole: "0",
            userAvatar: "",
            status: 0,
            createTime: "2022-06-12 15:36:20",
          },
        ],
      };
    },
  },
  {
    url: "/api/system/dept/list",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取部门数据成功！",
        timestamp: formatDate(),
        data: DEPT_LIST,
      };
    },
  },
  {
    url: "/api/system/dept/add",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "添加部门数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/system/dept/update",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "修改部门数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/system/dept/delete",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "删除部门数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/system/role/list",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取角色数据成功！",
        timestamp: formatDate(),
        data: ROLE_LIST,
      };
    },
  },
  {
    url: "/api/system/role/add",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "添加角色数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/system/role/update",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "修改角色数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/system/role/delete",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "删除角色数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/note/list",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "获取笔记数据成功！",
        timestamp: formatDate(),
        data: NOTE_LIST,
      };
    },
  },
  {
    url: "/api/note/add",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "添加笔记数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/note/update",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "修改笔记数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
  {
    url: "/api/note/delete",
    method: "post",
    response: (): IResponse => {
      return {
        success: true,
        code: 200,
        message: "删除笔记数据成功！",
        timestamp: formatDate(),
        data: null,
      };
    },
  },
];

export default mock;
