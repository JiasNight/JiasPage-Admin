// src/mock/_index.bundled_1720869306467_twx27gg1tzq.mjs
import { h } from "vue";
import { NIcon } from "naive-ui";
import { Icon } from "@iconify/vue";
function formatDate(date = /* @__PURE__ */ new Date(), fmt = "yyyy-MM-dd hh:mm:ss") {
  const _date = new Date(date);
  function padLeftZero(str) {
    return ("00" + str).substring(str.length);
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substring(4 - RegExp.$1.length));
  }
  const o = {
    "M+": _date.getMonth() + 1,
    "d+": _date.getDate(),
    "h+": _date.getHours(),
    "m+": _date.getMinutes(),
    "s+": _date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}
var MENU_LIST = [
  {
    pid: "0",
    id: "ab62e594a25d4c0dab54cda018b850ee",
    path: "/note",
    name: "NoteManage",
    meta: {
      title: "\u7B14\u8BB0\u7BA1\u7406",
      icon: "mdi:microsoft-onenote",
      show: 0,
      disabled: 1,
      cache: 1,
      type: 1,
      description: "\u7B14\u8BB0\u7BA1\u7406"
    },
    component: "",
    children: [
      {
        pid: "ab62e594a25d4c0dab54cda018b850ee",
        id: "594911e6ec0f4df99498675eb303be3d",
        path: "note-overview",
        name: "NoteOverview",
        meta: {
          title: "\u7B14\u8BB0\u6982\u89C8",
          icon: "mdi:event-note-outline",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "\u7B14\u8BB0\u6982\u89C8"
        },
        component: "/noteManage/noteOverview",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "ab62e594a25d4c0dab54cda018b850ee",
        id: "b547c33203994ae3afa48c4807a25b8f",
        path: "my-note",
        name: "MyNote",
        meta: {
          title: "\u6211\u7684\u7B14\u8BB0",
          icon: "mdi:notebook-edit",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "\u6211\u7684\u7B14\u8BB0"
        },
        component: "/noteManage/myNote",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "ab62e594a25d4c0dab54cda018b850ee",
        id: "1092792329fb40658c362c159a0557e0",
        path: "module",
        name: "ModuleType",
        meta: {
          title: "\u6A21\u5757\u5206\u7C7B",
          icon: "mdi:list-box",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "\u6A21\u5757\u5206\u7C7B"
        },
        component: "/noteManage/moduleType",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      }
    ],
    createBy: "admin",
    createTime: "2024-01-10 12:21:33"
  },
  {
    pid: "0",
    id: "6fa28cf73c6c4c11bec106553d69c1b9",
    path: "/system",
    name: "SystemManage",
    meta: {
      title: "\u7CFB\u7EDF\u7BA1\u7406",
      icon: "ic:baseline-settings",
      show: 0,
      disabled: 1,
      cache: 1,
      type: 1,
      description: "\u7CFB\u7EDF\u7BA1\u7406"
    },
    component: "",
    children: [
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "3bf0941cbcdc4f95b03e4096997ed18d",
        path: "userManage",
        name: "UserManage",
        meta: {
          title: "\u7528\u6237\u7BA1\u7406",
          icon: "mdi:account-details",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "\u7528\u6237\u7BA1\u7406"
        },
        component: "/system/userManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "0a1969567e1842a18cac009ef0d1f79f",
        path: "menuManage",
        name: "MenuManage",
        meta: {
          title: "\u83DC\u5355\u7BA1\u7406",
          icon: "mdi:menu",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: "\u83DC\u5355\u7BA1\u7406"
        },
        component: "/system/menuManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "2fb5971c-d713-4f77-9d90-e6c6bc833083",
        path: "deptManage",
        name: "DeptManage",
        meta: {
          title: "\u90E8\u95E8\u7BA1\u7406",
          icon: "mdi:account-credit-card",
          show: 0,
          disabled: 1,
          cache: 0,
          type: 1,
          description: "\u90E8\u95E8\u7BA1\u7406"
        },
        component: "/system/deptManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "bbefb3e1c54e48b0a219ade0c916ca6a",
        path: "roleManage",
        name: "RoleManage",
        meta: {
          title: "\u89D2\u8272\u7BA1\u7406",
          icon: "mdi:account-lock",
          show: 0,
          disabled: 1,
          cache: 0,
          type: 1,
          description: "\u89D2\u8272\u7BA1\u7406"
        },
        component: "/system/roleManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "f6d3c8a3cb9e472fab9ce891e45040ef",
        path: "dictManage",
        name: "DictManage",
        meta: {
          title: "\u5B57\u5178\u7BA1\u7406",
          icon: "mdi:book-open",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 1,
          description: ""
        },
        component: "/system/dictManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "2fb5971c-d713-4f77-9d90-e6c6bc833083",
        path: "http://www.baidu.com",
        name: "baidu",
        meta: {
          title: "\u8DF3\u8F6C\u767E\u5EA6",
          icon: "mdi:link-plus",
          show: 0,
          disabled: 1,
          cache: 1,
          type: 3,
          description: "\u8DF3\u8F6C\u767E\u5EA6"
        },
        component: "",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "12b1b100248e47a2b9fe0833dafb5caf",
        path: "sysMonitor",
        name: "SysMonitor",
        meta: {
          title: "\u7CFB\u7EDF\u76D1\u63A7",
          icon: "mdi:monitor-dashboard",
          show: 0,
          disabled: 0,
          cache: 1,
          type: 1,
          description: "\u7CFB\u7EDF\u76D1\u63A7"
        },
        component: "/system/dictManage/index",
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        pid: "6fa28cf73c6c4c11bec106553d69c1b9",
        id: "fb5456d06aa041dd9f194846b7b73758",
        path: "logManage",
        name: "LogManage",
        meta: {
          title: "\u65E5\u5FD7\u7BA1\u7406",
          icon: "mdi:book-open",
          show: 0,
          disabled: 0,
          cache: 1,
          type: 1,
          description: "\u65E5\u5FD7\u7BA1\u7406"
        },
        component: "",
        children: [
          {
            pid: "fb5456d06aa041dd9f194846b7b73758",
            id: "bca3ca6391a7484bb1aaac88b3b5a14b",
            path: "signInLog",
            name: "SignInLog",
            meta: {
              title: "\u767B\u5F55\u65E5\u5FD7",
              icon: "mdi:message-reply-text",
              show: 0,
              disabled: 1,
              cache: 1,
              type: 1,
              description: "\u767B\u5F55\u65E5\u5FD7"
            },
            component: "/system/logManage/index",
            createBy: "admin",
            createTime: "2024-01-10 12:21:33"
          },
          {
            pid: "fb5456d06aa041dd9f194846b7b73758",
            id: "d65d22de9f9f42ab96c0f3011c20a412",
            path: "operLog",
            name: "OperLog",
            meta: {
              title: "\u64CD\u4F5C\u65E5\u5FD7",
              icon: "mdi:wrench-cog",
              show: 0,
              disabled: 1,
              cache: 1,
              type: 1,
              description: "\u64CD\u4F5C\u65E5\u5FD7"
            },
            component: "/system/logManage/index",
            createBy: "admin",
            createTime: "2024-01-10 12:21:33"
          }
        ],
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      }
    ],
    createBy: "admin",
    createTime: "2024-01-10 12:21:33"
  }
];
var DEPT_LIST = [
  {
    id: "2fb5971cd7134f779d90e6c6bc833083",
    pid: "0",
    name: "xxx\u516C\u53F8",
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
        name: "\u90E8\u95E81",
        code: "a",
        description: "",
        status: 0,
        order: 1,
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        id: "3f0e6e9885e9431ca8a984ad4439f4b1",
        pid: "2fb5971cd7134f779d90e6c6bc833083",
        name: "\u90E8\u95E82",
        code: "b",
        description: "",
        status: 0,
        order: 2,
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      },
      {
        id: "cf1a2728c9ca4a0f9a90319ce564d1a3",
        pid: "2fb5971cd7134f779d90e6c6bc833083",
        name: "\u90E8\u95E83",
        code: "c",
        description: "",
        status: 0,
        order: 3,
        createBy: "admin",
        createTime: "2024-01-10 12:21:33"
      }
    ]
  }
];
var ROLE_LIST = [
  {
    name: "\u7BA1\u7406\u5458",
    code: "admin",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32"
  },
  {
    name: "\u8001\u677F",
    code: "boss",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32"
  },
  {
    name: "\u7ECF\u7406",
    code: "manager",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32"
  }
];
var NOTE_LIST = [
  {
    name: "\u4EBA\u751F\u4F55\u5904\u4E0D\u76F8\u9022",
    code: "admin",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32"
  },
  {
    name: "\u5904\u5904\u95FB\u557C\u9E1F",
    code: "boss",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32"
  },
  {
    name: "\u521D\u59CBLinux",
    code: "manager",
    createBy: "admin",
    createTime: "2024-01-01 14:21:32"
  }
];
var mock = [
  {
    // 接口路径
    url: "/api/test",
    // 接口方法
    method: "get",
    // 返回数据
    response: () => {
      return {
        success: true,
        code: 200,
        message: "success",
        timestamp: formatDate(),
        data: "Hello World"
      };
    }
  },
  {
    url: "/api/security/pKey",
    method: "get",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "success",
        timestamp: formatDate(),
        data: {
          // eslint-disable-next-line max-len
          pKey: `-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGV1/6aM0Ko2erbkSjHUDYnxnTBigu8RqN8sR7xW+NZ62/Roy//AN52VDFjqvS7lXFDMc7T+wBfE5ScK4qvYnsmRG/n+TD2wPFFGxhmdugF86EWDxVpmo7fRV0smmPGjBvXMzHlovzJah+gzeIxkODhskLyOaj53HGpqYJ0uC807AgMBAAE=-----END PUBLIC KEY-----
          `,
          safe: true
        }
      };
    }
  },
  {
    url: "/api/user/validateCode",
    method: "get",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u9A8C\u8BC1\u7801\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: {
          base64: (
            // eslint-disable-next-line max-len
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAgCAIAAAD/r+OLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAMUSURBVGiB7VlRkqIwEA3U3sJwDsNcgwSuQc1cQy2PYdBrgDkHcg3T+9E12QxETTDqTpXvSxC7Oy/9ujuYAAB5Y4L01QH8p3jz4sabFzfevLjxa3jJsmyz2TzPH/ihaZq6rj0ffgRMwE3TPMOd53Naa0II5/yh0VwBIQRjCN3RefDVUZIkQgilFLxu3kmSBADatpVS4iVGVZZlfF9B68zzXCnV932WZdNv9/u9fUkpzfP83gC/gaQ47+MHKWVMgoKyCzNZSmnuNE1zyXJc0U1DHbk7n88R3f0JIjFJEillVVXDMHx+fmKsmNWIsiz3+31ZlpF379s4fsDErOsa8/H1OkJsNhsA+Pr6cltMkqIoDofDvIBOp5NSylzaa14sFkgEY+yS92iImHsAIIQghGitZ/zKid1up7VG/YaavQeReaGUBpWVrutw/dKCc/2zt7DrOuQ9KLBrzvq+x6C7rvM1FxI91uyiKKJbBoC+7+2esFwug35+zRkmsL80PIVpq4Zz7qmOIF6megzVoJezuq6dYeGBBV2iIuwWbkMIIYRgjNmq6fv+pmus8XCLFxQLpRTtY8CItm1vr3ACL15wzaPzEWbparWyL+0HMJPNaMc5988O2ybn3CmE0ehUFAXn3Gh/sVg4C4pnTQg7H41i2u12/wz9FJEtFtSjp6ORC8OLnYkjGRr4ePQswAGiZYxRSrXWKB+bFCMom45LneU6TPtAF0II5IUxZu4zxkYyNBl93al/YwqYd4/HY57naZqifKqqsr8ihKRpulwuV6vV7KHreDx+fHwURdG2bZZlSqlhGNC4UgqHgNEpzIBzvt1ut9stsQ5NBmY+pJQOwwAA02d+IGgzp/JBoKnz+Xzn6HVpwU6nU2it7UOJDTMfeo6IAbxM5QMApsXMK/sjyJ9AYWKXudTpZmDKixBidCfgfR2xug9ivV5jl4lCihOmpkS0iSzbNqeN0sufaQ0Rg/PEg3i5KUyvuiuEgNe9posOTJYbbyci7sMjsF6vXxLnnPcvTwZGeKOtxsYv4OUl+DX/qz0Zb17c+AskFXhq7Zvh0wAAAABJRU5ErkJggg=="
          )
        }
      };
    }
  },
  {
    url: "/api/user/signIn",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u7528\u6237\u767B\u5F55\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: {
          userId: "220101197812079303",
          token: "Yji4yUXtgppyAb6IXBW5B4CEPtYzBoC0yODiOo4biBIY0cSzCb2VuZKEPdD1qLv0"
        }
      };
    }
  },
  {
    url: "/api/user/info",
    method: "get",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: {
          userId: "220101197812079303",
          userName: "admin",
          userNickName: "\u8D85\u7EA7\u7BA1\u7406\u5458",
          token: "Yji4yUXtgppyAb6IXBW5B4CEPtYzBoC0yODiOo4biBIY0cSzCb2VuZKEPdD1qLv0",
          deptId: 100,
          deptName: "\u884C\u653F\u90E8"
        }
      };
    }
  },
  {
    url: "/api/system/menu/list",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u83DC\u5355\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: MENU_LIST
      };
    }
  },
  {
    url: "/api/system/routes",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u8DEF\u7531\u8868\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: MENU_LIST
      };
    }
  },
  {
    url: "/api/system/getDept",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u90E8\u95E8\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: [
          {
            label: "\u90E8\u95E81",
            id: "1",
            parentId: "0",
            isLeaf: false,
            children: [
              {
                label: "\u90E8\u95E81.1",
                id: "11",
                parentId: "1",
                isLeaf: true
              },
              {
                label: "\u90E8\u95E81.2",
                id: "12",
                parentId: "1",
                isLeaf: true
              }
            ]
          },
          {
            label: "\u90E8\u95E82",
            id: "2",
            parentId: "0",
            isLeaf: false,
            children: [
              {
                label: "\u90E8\u95E82.1",
                id: "21",
                parentId: "2",
                isLeaf: true
              },
              {
                label: "\u90E8\u95E82.2",
                id: "22",
                parentId: "2",
                isLeaf: true
              }
            ]
          }
        ]
      };
    }
  },
  {
    url: "/api/system/getUsers",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u7528\u6237\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: [
          {
            userId: "121321",
            userName: "hjh_df",
            nickName: "\u90DD\u4F73\u60E0",
            gender: 1,
            deptId: "",
            phoneNumber: 18564796520,
            userRole: "0",
            userAvatar: "",
            status: 0,
            createTime: "2022-06-12 15:36:20"
          },
          {
            userId: "1212321",
            userName: "dfa",
            nickName: "\u8881\u4F73\u660A",
            gender: 1,
            deptId: "",
            phoneNumber: 17774096498,
            userRole: "0",
            userAvatar: "",
            status: 0,
            createTime: "2022-06-12 15:36:20"
          },
          {
            userId: "13132",
            userName: "test",
            nickName: "\u90B1\u6DFB\u6C60",
            gender: 1,
            deptId: "",
            phoneNumber: 15599530093,
            userRole: "0",
            userAvatar: "",
            status: 0,
            createTime: "2022-06-12 15:36:20"
          }
        ]
      };
    }
  },
  {
    url: "/api/system/dept/list",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u90E8\u95E8\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: DEPT_LIST
      };
    }
  },
  {
    url: "/api/system/dept/add",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u6DFB\u52A0\u90E8\u95E8\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/system/dept/update",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u4FEE\u6539\u90E8\u95E8\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/system/dept/delete",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u5220\u9664\u90E8\u95E8\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/system/role/list",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u89D2\u8272\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: ROLE_LIST
      };
    }
  },
  {
    url: "/api/system/role/add",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u6DFB\u52A0\u89D2\u8272\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/system/role/update",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u4FEE\u6539\u89D2\u8272\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/system/role/delete",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u5220\u9664\u89D2\u8272\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/note/list",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u83B7\u53D6\u7B14\u8BB0\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: NOTE_LIST
      };
    }
  },
  {
    url: "/api/note/add",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u6DFB\u52A0\u7B14\u8BB0\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/note/update",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u4FEE\u6539\u7B14\u8BB0\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  },
  {
    url: "/api/note/delete",
    method: "post",
    response: () => {
      return {
        success: true,
        code: 200,
        message: "\u5220\u9664\u7B14\u8BB0\u6570\u636E\u6210\u529F\uFF01",
        timestamp: formatDate(),
        data: null
      };
    }
  }
];
var mock_default = mock;
export {
  mock_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21vY2svc3JjL3V0aWxzL2NvbW1vbi9pbmRleC50cyIsICJzcmMvbW9jay9zcmMvbW9jay9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCJDOlxcXFxVc2Vyc1xcXFxKSUFTXFxcXERlc2t0b3BcXFxcSmlhc1BhZ2VcXFxcSmlhc1BhZ2UtQWRtaW5cXFxcc3JjXFxcXHV0aWxzXFxcXGNvbW1vblxcXFxpbmRleC50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCJDOlxcXFxVc2Vyc1xcXFxKSUFTXFxcXERlc2t0b3BcXFxcSmlhc1BhZ2VcXFxcSmlhc1BhZ2UtQWRtaW5cXFxcc3JjXFxcXHV0aWxzXFxcXGNvbW1vblwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vQzovVXNlcnMvSklBUy9EZXNrdG9wL0ppYXNQYWdlL0ppYXNQYWdlLUFkbWluL3NyYy91dGlscy9jb21tb24vaW5kZXgudHNcIjtpbXBvcnQgeyBoLCBDb21wb25lbnQsIGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSc7XHJcbmltcG9ydCB7IE5JY29uLCBGb3JtSW5zdCB9IGZyb20gJ25haXZlLXVpJztcclxuaW1wb3J0IHsgSWNvbiB9IGZyb20gJ0BpY29uaWZ5L3Z1ZSc7XHJcbmltcG9ydCB7IElDT04gfSBmcm9tICdAL2VudW1zL2ljb24nO1xyXG5cclxuLy8gXHU2RTMyXHU2N0QzXHU4M0RDXHU1MzU1XHU1NkZFXHU2ODA3XHU2NUI5XHU2Q0Q1XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiByZW5kZXJJY29uKGljb24gPSAnbWRpOmVtb3RpY29uJywgcHJvcHMgPSB7IHNpemU6IDE2IH0pIHtcclxuLy8gICByZXR1cm4gKCkgPT4gaChOSWNvbiwgcHJvcHMsIHsgZGVmYXVsdDogKCkgPT4gaChJY29uIGFzIENvbXBvbmVudCwgeyBpY29uOiBpY29uIH0pIH0pO1xyXG4vLyB9XHJcblxyXG4vLyBcdTU2RkVcdTY4MDdcdTZFMzJcdTY3RDNcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckljb24odHlwZTogSUNPTiwgaWNvbiA9ICdtZGk6ZW1vdGljb24nLCBwcm9wcyA9IHsgc2l6ZTogMTQgfSkge1xyXG4gIC8vIFx1NTIyNFx1NjVBRFx1NjYyRlx1NzZGNFx1NjNBNVx1NkUzMlx1NjdEM1x1OEZEOFx1NjYyRlx1OEZENFx1NTZERVx1NTZGRVx1NjgwN1x1NUJGOVx1OEM2MVx1OEZEQlx1ODg0Q1x1NkUzMlx1NjdEM1xyXG4gIGlmICh0eXBlID09PSAnTycpIHtcclxuICAgIGNvbnN0IGljb25JbmZvID0ge1xyXG4gICAgICBuYW1lOiBpY29uLFxyXG4gICAgICByZW5kZXI6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gaChOSWNvbiwgcHJvcHMsIHsgZGVmYXVsdDogKCkgPT4gaChJY29uIGFzIENvbXBvbmVudCwgeyBpY29uOiBpY29uIH0pIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGljb25JbmZvO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gKCk6IFZOb2RlID0+IGgoTkljb24sIHByb3BzLCB7IGRlZmF1bHQ6ICgpID0+IGgoSWNvbiBhcyBDb21wb25lbnQsIHsgaWNvbjogaWNvbiB9KSB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAqIFx1NjgzQ1x1NUYwRlx1NTMxNlx1NjVGNlx1OTVGNFxyXG4gKiBAcGFyYW0gZGF0ZSBcdTY4MDdcdTUxQzZcdTY1RjZcdTk1RjRcdTY4M0NcdTVGMEZcclxuICogQHBhcmFtIGZtdCBcdThGOTNcdTUxRkFcdTY4M0NcdTVGMEZcclxuICogQHJldHVybnMgXHU2NzFGXHU2NzFCXHU3Njg0XHU4RjkzXHU1MUZBXHU2ODNDXHU1RjBGXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlID0gbmV3IERhdGUoKSwgZm10ID0gJ3l5eXktTU0tZGQgaGg6bW06c3MnKSB7XHJcbiAgY29uc3QgX2RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBmdW5jdGlvbiBwYWRMZWZ0WmVybyhzdHI6IHN0cmluZykge1xyXG4gICAgcmV0dXJuICgnMDAnICsgc3RyKS5zdWJzdHJpbmcoc3RyLmxlbmd0aCk7XHJcbiAgfVxyXG4gIGlmICgvKHkrKS8udGVzdChmbXQpKSB7XHJcbiAgICBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChfZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cmluZyg0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xyXG4gIH1cclxuICBjb25zdCBvOiBhbnkgPSB7XHJcbiAgICAnTSsnOiBfZGF0ZS5nZXRNb250aCgpICsgMSxcclxuICAgICdkKyc6IF9kYXRlLmdldERhdGUoKSxcclxuICAgICdoKyc6IF9kYXRlLmdldEhvdXJzKCksXHJcbiAgICAnbSsnOiBfZGF0ZS5nZXRNaW51dGVzKCksXHJcbiAgICAncysnOiBfZGF0ZS5nZXRTZWNvbmRzKClcclxuICB9O1xyXG4gIGZvciAoY29uc3QgayBpbiBvKSB7XHJcbiAgICBpZiAobmV3IFJlZ0V4cChgKCR7a30pYCkudGVzdChmbXQpKSB7XHJcbiAgICAgIGNvbnN0IHN0ciA9IG9ba10gKyAnJztcclxuICAgICAgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCBSZWdFeHAuJDEubGVuZ3RoID09PSAxID8gc3RyIDogcGFkTGVmdFplcm8oc3RyKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmbXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAqIFx1NzUxRlx1NjIxMFx1NEUwMFx1NEUyQVx1NEUwRFx1OTFDRFx1NTkwRFx1NzY4NElEXHJcbiAqIEBwYXJhbSByYW5kb21MZW5ndGggXHU5NzAwXHU4OTgxXHU3NTFGXHU2MjEwXHU3Njg0XHU5NTdGXHU1RUE2XHJcbiAqIEByZXR1cm5zXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0VVVJRCA9IChyYW5kb21MZW5ndGggPSAxMCkgPT4ge1xyXG4gIHJldHVybiBOdW1iZXIoTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cmluZygyLCByYW5kb21MZW5ndGgpICsgRGF0ZS5ub3coKSkudG9TdHJpbmcoMzYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFx1NzUxRlx1NjIxMFx1OTY4Rlx1NjczQVx1OTg5Q1x1ODI3MiBSR0JcdTY4M0NcdTVGMEZcclxuICogQHJldHVybnMgXHU5NjhGXHU2NzNBXHU5ODlDXHU4MjcyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tQ29sb3IoKSB7XHJcbiAgY29uc3QgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcclxuICBsZXQgY29sb3IgPSAnIyc7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcclxuICB9XHJcbiAgcmV0dXJuIGNvbG9yO1xyXG59XHJcblxyXG4vKipcclxuICogKiBcdTkxQ0RcdTdGNkVcdTg4NjhcdTUzNTVcdTVCRjlcdThDNjFcclxuICogQHBhcmFtIHJlZnNFbCBcdTg4NjhcdTUzNTVcdTUxNDNcdTdEMjBcclxuICovXHJcbmV4cG9ydCBjb25zdCByZXNldEZvcm0gPSAocmVmc0VsOiBGb3JtSW5zdCB8IG51bGwsIGZvcm1PYmo6IGFueSkgPT4ge1xyXG4gIGNvbnN0IG9iamVjdCA9IGZvcm1PYmo7XHJcbiAgY29uc3QgcmVzdWx0T2JqOiBhbnkgPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XHJcbiAgICAgIGxldCBlbGUgPSBvYmplY3Rba2V5XTtcclxuICAgICAgLy8gQXJyYXkuaXNBcnJheShlbGUpID8gKGVsZSA9IFtdKSA6IChlbGUgPSBudWxsKTtcclxuICAgICAgZWxlID0gbnVsbDtcclxuICAgICAgcmVzdWx0T2JqW2tleV0gPSBlbGU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChyZWZzRWwpIHJlZnNFbC5yZXN0b3JlVmFsaWRhdGlvbigpO1xyXG4gIHJldHVybiByZXN1bHRPYmo7XHJcbn07XHJcblxyXG4vLyAvKipcclxuLy8gICogQGRlc2MgIFx1NTFGRFx1NjU3MFx1ODI4Mlx1NkQ0MVxyXG4vLyAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4vLyAgKiBAcGFyYW0ge051bWJlcn0gd2FpdFxyXG4vLyAgKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZm46IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpIHtcclxuLy8gICBsZXQgY29udGV4dCwgYXJncztcclxuLy8gICBsZXQgcHJldmlvdXMgPSAwO1xyXG5cclxuLy8gICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XHJcbi8vICAgICBjb250ZXh0ID0gdGhpcztcclxuLy8gICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbi8vICAgICBpZiAobm93IC0gcHJldmlvdXMgPiB3YWl0KSB7XHJcbi8vICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4vLyAgICAgICBwcmV2aW91cyA9IG5vdztcclxuLy8gICAgIH1cclxuLy8gICB9O1xyXG4vLyB9XHJcblxyXG4vLyAvKipcclxuLy8gICogQGRlc2MgIFx1NTFGRFx1NjU3MFx1OTYzMlx1NjI5NlxyXG4vLyAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXHJcbi8vICAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0XHJcbi8vICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW1tZWRpYXRlXHJcbi8vICAqIEByZXR1cm4geyp9XHJcbi8vICAqL1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gZGVib3VuY2UobWV0aG9kOiBGdW5jdGlvbiwgd2FpdDogbnVtYmVyLCBpbW1lZGlhdGU6IGJvb2xlYW4pIHtcclxuLy8gICBsZXQgdGltZW91dDogYW55O1xyXG4vLyAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJnczogYW55KSB7XHJcbi8vICAgICBjb25zdCBjb250ZXh0OiBhbnkgPSB0aGlzIHx8IG51bGw7XHJcbi8vICAgICBpZiAodGltZW91dCkge1xyXG4vLyAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbi8vICAgICB9XHJcbi8vICAgICAvLyBcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NENcdTk3MDBcdTg5ODFcdTRFMjRcdTRFMkFcdTY3NjFcdTRFRjZcdUZGMENcdTRFMDBcdTY2MkZpbW1lZGlhdGVcdTRFM0F0cnVlXHVGRjBDXHU0RThDXHU2NjJGdGltZW91dFx1NjcyQVx1ODhBQlx1OEQ0Qlx1NTAzQ1x1NjIxNlx1ODhBQlx1N0Y2RVx1NEUzQW51bGxcclxuLy8gICAgIGlmIChpbW1lZGlhdGUpIHtcclxuLy8gICAgICAgLyoqXHJcbi8vICAgICAgICAqIFx1NTk4Mlx1Njc5Q1x1NUI5QVx1NjVGNlx1NTY2OFx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1N0FDQlx1NTM3M1x1NjI2N1x1ODg0Q1x1RkYwQ1x1NUU3Nlx1OEJCRVx1N0Y2RVx1NEUwMFx1NEUyQVx1NUI5QVx1NjVGNlx1NTY2OFx1RkYwQ3dhaXRcdTZCRUJcdTc5RDJcdTU0MEVcdTVDMDZcdTVCOUFcdTY1RjZcdTU2NjhcdTdGNkVcdTRFM0FudWxsXHJcbi8vICAgICAgICAqIFx1OEZEOVx1NjgzN1x1Nzg2RVx1NEZERFx1N0FDQlx1NTM3M1x1NjI2N1x1ODg0Q1x1NTQwRXdhaXRcdTZCRUJcdTc5RDJcdTUxODVcdTRFMERcdTRGMUFcdTg4QUJcdTUxOERcdTZCMjFcdTg5RTZcdTUzRDFcclxuLy8gICAgICAgICovXHJcbi8vICAgICAgIGNvbnN0IGNhbGxOb3cgPSAhdGltZW91dDtcclxuLy8gICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4vLyAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4vLyAgICAgICB9LCB3YWl0KTtcclxuLy8gICAgICAgaWYgKGNhbGxOb3cpIHtcclxuLy8gICAgICAgICBtZXRob2QuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIC8vIFx1NTk4Mlx1Njc5Q2ltbWVkaWF0ZVx1NEUzQWZhbHNlXHVGRjBDXHU1MjE5XHU1MUZEXHU2NTcwd2FpdFx1NkJFQlx1NzlEMlx1NTQwRVx1NjI2N1x1ODg0Q1xyXG4vLyAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogYXJnc1x1NjYyRlx1NEUwMFx1NEUyQVx1N0M3Qlx1NjU3MFx1N0VDNFx1NUJGOVx1OEM2MVx1RkYwQ1x1NjI0MFx1NEVFNVx1NEY3Rlx1NzUyOGZuLmFwcGx5XHJcbi8vICAgICAgICAgICogXHU0RTVGXHU1M0VGXHU1MTk5XHU0RjVDbWV0aG9kLmNhbGwoY29udGV4dCwgLi4uYXJncylcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBtZXRob2QuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbi8vICAgICAgIH0sIHdhaXQpO1xyXG4vLyAgICAgfVxyXG4vLyAgIH07XHJcbi8vIH1cclxuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcSklBU1xcXFxEZXNrdG9wXFxcXEppYXNQYWdlXFxcXEppYXNQYWdlLUFkbWluXFxcXHNyY1xcXFxtb2NrXFxcXGluZGV4LnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXEpJQVNcXFxcRGVza3RvcFxcXFxKaWFzUGFnZVxcXFxKaWFzUGFnZS1BZG1pblxcXFxzcmNcXFxcbW9ja1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vQzovVXNlcnMvSklBUy9EZXNrdG9wL0ppYXNQYWdlL0ppYXNQYWdlLUFkbWluL3NyYy9tb2NrL2luZGV4LnRzXCI7aW1wb3J0IHsgTW9ja01ldGhvZCB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xyXG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnQC91dGlscy9jb21tb24nO1xyXG5pbXBvcnQgeyBJUmVzcG9uc2UgfSBmcm9tICdAL2ludGVyZmFjZS9jb21tb24nO1xyXG5cclxuLy8gXHU4M0RDXHU1MzU1XHU2NTcwXHU2MzZFXHJcbmNvbnN0IE1FTlVfTElTVCA9IFtcclxuICB7XHJcbiAgICBwaWQ6ICcwJyxcclxuICAgIGlkOiAnYWI2MmU1OTRhMjVkNGMwZGFiNTRjZGEwMThiODUwZWUnLFxyXG4gICAgcGF0aDogJy9ub3RlJyxcclxuICAgIG5hbWU6ICdOb3RlTWFuYWdlJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgdGl0bGU6ICdcdTdCMTRcdThCQjBcdTdCQTFcdTc0MDYnLFxyXG4gICAgICBpY29uOiAnbWRpOm1pY3Jvc29mdC1vbmVub3RlJyxcclxuICAgICAgc2hvdzogMCxcclxuICAgICAgZGlzYWJsZWQ6IDEsXHJcbiAgICAgIGNhY2hlOiAxLFxyXG4gICAgICB0eXBlOiAxLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1x1N0IxNFx1OEJCMFx1N0JBMVx1NzQwNidcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnQ6ICcnLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAge1xyXG4gICAgICAgIHBpZDogJ2FiNjJlNTk0YTI1ZDRjMGRhYjU0Y2RhMDE4Yjg1MGVlJyxcclxuICAgICAgICBpZDogJzU5NDkxMWU2ZWMwZjRkZjk5NDk4Njc1ZWIzMDNiZTNkJyxcclxuICAgICAgICBwYXRoOiAnbm90ZS1vdmVydmlldycsXHJcbiAgICAgICAgbmFtZTogJ05vdGVPdmVydmlldycsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgdGl0bGU6ICdcdTdCMTRcdThCQjBcdTY5ODJcdTg5QzgnLFxyXG4gICAgICAgICAgaWNvbjogJ21kaTpldmVudC1ub3RlLW91dGxpbmUnLFxyXG4gICAgICAgICAgc2hvdzogMCxcclxuICAgICAgICAgIGRpc2FibGVkOiAxLFxyXG4gICAgICAgICAgY2FjaGU6IDEsXHJcbiAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdcdTdCMTRcdThCQjBcdTY5ODJcdTg5QzgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnQ6ICcvbm90ZU1hbmFnZS9ub3RlT3ZlcnZpZXcnLFxyXG4gICAgICAgIGNyZWF0ZUJ5OiAnYWRtaW4nLFxyXG4gICAgICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGlkOiAnYWI2MmU1OTRhMjVkNGMwZGFiNTRjZGEwMThiODUwZWUnLFxyXG4gICAgICAgIGlkOiAnYjU0N2MzMzIwMzk5NGFlM2FmYTQ4YzQ4MDdhMjViOGYnLFxyXG4gICAgICAgIHBhdGg6ICdteS1ub3RlJyxcclxuICAgICAgICBuYW1lOiAnTXlOb3RlJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1NjIxMVx1NzY4NFx1N0IxNFx1OEJCMCcsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOm5vdGVib29rLWVkaXQnLFxyXG4gICAgICAgICAgc2hvdzogMCxcclxuICAgICAgICAgIGRpc2FibGVkOiAxLFxyXG4gICAgICAgICAgY2FjaGU6IDEsXHJcbiAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdcdTYyMTFcdTc2ODRcdTdCMTRcdThCQjAnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnQ6ICcvbm90ZU1hbmFnZS9teU5vdGUnLFxyXG4gICAgICAgIGNyZWF0ZUJ5OiAnYWRtaW4nLFxyXG4gICAgICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGlkOiAnYWI2MmU1OTRhMjVkNGMwZGFiNTRjZGEwMThiODUwZWUnLFxyXG4gICAgICAgIGlkOiAnMTA5Mjc5MjMyOWZiNDA2NThjMzYyYzE1OWEwNTU3ZTAnLFxyXG4gICAgICAgIHBhdGg6ICdtb2R1bGUnLFxyXG4gICAgICAgIG5hbWU6ICdNb2R1bGVUeXBlJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1NkEyMVx1NTc1N1x1NTIwNlx1N0M3QicsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOmxpc3QtYm94JyxcclxuICAgICAgICAgIHNob3c6IDAsXHJcbiAgICAgICAgICBkaXNhYmxlZDogMSxcclxuICAgICAgICAgIGNhY2hlOiAxLFxyXG4gICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnXHU2QTIxXHU1NzU3XHU1MjA2XHU3QzdCJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50OiAnL25vdGVNYW5hZ2UvbW9kdWxlVHlwZScsXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjcmVhdGVCeTogJ2FkbWluJyxcclxuICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgcGlkOiAnMCcsXHJcbiAgICBpZDogJzZmYTI4Y2Y3M2M2YzRjMTFiZWMxMDY1NTNkNjljMWI5JyxcclxuICAgIHBhdGg6ICcvc3lzdGVtJyxcclxuICAgIG5hbWU6ICdTeXN0ZW1NYW5hZ2UnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICB0aXRsZTogJ1x1N0NGQlx1N0VERlx1N0JBMVx1NzQwNicsXHJcbiAgICAgIGljb246ICdpYzpiYXNlbGluZS1zZXR0aW5ncycsXHJcbiAgICAgIHNob3c6IDAsXHJcbiAgICAgIGRpc2FibGVkOiAxLFxyXG4gICAgICBjYWNoZTogMSxcclxuICAgICAgdHlwZTogMSxcclxuICAgICAgZGVzY3JpcHRpb246ICdcdTdDRkJcdTdFREZcdTdCQTFcdTc0MDYnXHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50OiAnJyxcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwaWQ6ICc2ZmEyOGNmNzNjNmM0YzExYmVjMTA2NTUzZDY5YzFiOScsXHJcbiAgICAgICAgaWQ6ICczYmYwOTQxY2JjZGM0Zjk1YjAzZTQwOTY5OTdlZDE4ZCcsXHJcbiAgICAgICAgcGF0aDogJ3VzZXJNYW5hZ2UnLFxyXG4gICAgICAgIG5hbWU6ICdVc2VyTWFuYWdlJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1NzUyOFx1NjIzN1x1N0JBMVx1NzQwNicsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOmFjY291bnQtZGV0YWlscycsXHJcbiAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IDEsXHJcbiAgICAgICAgICBjYWNoZTogMSxcclxuICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1x1NzUyOFx1NjIzN1x1N0JBMVx1NzQwNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudDogJy9zeXN0ZW0vdXNlck1hbmFnZS9pbmRleCcsXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwaWQ6ICc2ZmEyOGNmNzNjNmM0YzExYmVjMTA2NTUzZDY5YzFiOScsXHJcbiAgICAgICAgaWQ6ICcwYTE5Njk1NjdlMTg0MmExOGNhYzAwOWVmMGQxZjc5ZicsXHJcbiAgICAgICAgcGF0aDogJ21lbnVNYW5hZ2UnLFxyXG4gICAgICAgIG5hbWU6ICdNZW51TWFuYWdlJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1ODNEQ1x1NTM1NVx1N0JBMVx1NzQwNicsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOm1lbnUnLFxyXG4gICAgICAgICAgc2hvdzogMCxcclxuICAgICAgICAgIGRpc2FibGVkOiAxLFxyXG4gICAgICAgICAgY2FjaGU6IDEsXHJcbiAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdcdTgzRENcdTUzNTVcdTdCQTFcdTc0MDYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnQ6ICcvc3lzdGVtL21lbnVNYW5hZ2UvaW5kZXgnLFxyXG4gICAgICAgIGNyZWF0ZUJ5OiAnYWRtaW4nLFxyXG4gICAgICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgcGlkOiAnNmZhMjhjZjczYzZjNGMxMWJlYzEwNjU1M2Q2OWMxYjknLFxyXG4gICAgICAgIGlkOiAnMmZiNTk3MWMtZDcxMy00Zjc3LTlkOTAtZTZjNmJjODMzMDgzJyxcclxuICAgICAgICBwYXRoOiAnZGVwdE1hbmFnZScsXHJcbiAgICAgICAgbmFtZTogJ0RlcHRNYW5hZ2UnLFxyXG4gICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgIHRpdGxlOiAnXHU5MEU4XHU5NUU4XHU3QkExXHU3NDA2JyxcclxuICAgICAgICAgIGljb246ICdtZGk6YWNjb3VudC1jcmVkaXQtY2FyZCcsXHJcbiAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IDEsXHJcbiAgICAgICAgICBjYWNoZTogMCxcclxuICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1x1OTBFOFx1OTVFOFx1N0JBMVx1NzQwNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudDogJy9zeXN0ZW0vZGVwdE1hbmFnZS9pbmRleCcsXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwaWQ6ICc2ZmEyOGNmNzNjNmM0YzExYmVjMTA2NTUzZDY5YzFiOScsXHJcbiAgICAgICAgaWQ6ICdiYmVmYjNlMWM1NGU0OGIwYTIxOWFkZTBjOTE2Y2E2YScsXHJcbiAgICAgICAgcGF0aDogJ3JvbGVNYW5hZ2UnLFxyXG4gICAgICAgIG5hbWU6ICdSb2xlTWFuYWdlJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1ODlEMlx1ODI3Mlx1N0JBMVx1NzQwNicsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOmFjY291bnQtbG9jaycsXHJcbiAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IDEsXHJcbiAgICAgICAgICBjYWNoZTogMCxcclxuICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1x1ODlEMlx1ODI3Mlx1N0JBMVx1NzQwNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudDogJy9zeXN0ZW0vcm9sZU1hbmFnZS9pbmRleCcsXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwaWQ6ICc2ZmEyOGNmNzNjNmM0YzExYmVjMTA2NTUzZDY5YzFiOScsXHJcbiAgICAgICAgaWQ6ICdmNmQzYzhhM2NiOWU0NzJmYWI5Y2U4OTFlNDUwNDBlZicsXHJcbiAgICAgICAgcGF0aDogJ2RpY3RNYW5hZ2UnLFxyXG4gICAgICAgIG5hbWU6ICdEaWN0TWFuYWdlJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1NUI1N1x1NTE3OFx1N0JBMVx1NzQwNicsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOmJvb2stb3BlbicsXHJcbiAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IDEsXHJcbiAgICAgICAgICBjYWNoZTogMSxcclxuICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudDogJy9zeXN0ZW0vZGljdE1hbmFnZS9pbmRleCcsXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwaWQ6ICc2ZmEyOGNmNzNjNmM0YzExYmVjMTA2NTUzZDY5YzFiOScsXHJcbiAgICAgICAgaWQ6ICcyZmI1OTcxYy1kNzEzLTRmNzctOWQ5MC1lNmM2YmM4MzMwODMnLFxyXG4gICAgICAgIHBhdGg6ICdodHRwOi8vd3d3LmJhaWR1LmNvbScsXHJcbiAgICAgICAgbmFtZTogJ2JhaWR1JyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1OERGM1x1OEY2Q1x1NzY3RVx1NUVBNicsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOmxpbmstcGx1cycsXHJcbiAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IDEsXHJcbiAgICAgICAgICBjYWNoZTogMSxcclxuICAgICAgICAgIHR5cGU6IDMsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1x1OERGM1x1OEY2Q1x1NzY3RVx1NUVBNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudDogJycsXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwaWQ6ICc2ZmEyOGNmNzNjNmM0YzExYmVjMTA2NTUzZDY5YzFiOScsXHJcbiAgICAgICAgaWQ6ICcxMmIxYjEwMDI0OGU0N2EyYjlmZTA4MzNkYWZiNWNhZicsXHJcbiAgICAgICAgcGF0aDogJ3N5c01vbml0b3InLFxyXG4gICAgICAgIG5hbWU6ICdTeXNNb25pdG9yJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1N0NGQlx1N0VERlx1NzZEMVx1NjNBNycsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOm1vbml0b3ItZGFzaGJvYXJkJyxcclxuICAgICAgICAgIHNob3c6IDAsXHJcbiAgICAgICAgICBkaXNhYmxlZDogMCxcclxuICAgICAgICAgIGNhY2hlOiAxLFxyXG4gICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnXHU3Q0ZCXHU3RURGXHU3NkQxXHU2M0E3J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50OiAnL3N5c3RlbS9kaWN0TWFuYWdlL2luZGV4JyxcclxuICAgICAgICBjcmVhdGVCeTogJ2FkbWluJyxcclxuICAgICAgICBjcmVhdGVUaW1lOiAnMjAyNC0wMS0xMCAxMjoyMTozMydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHBpZDogJzZmYTI4Y2Y3M2M2YzRjMTFiZWMxMDY1NTNkNjljMWI5JyxcclxuICAgICAgICBpZDogJ2ZiNTQ1NmQwNmFhMDQxZGQ5ZjE5NDg0NmI3YjczNzU4JyxcclxuICAgICAgICBwYXRoOiAnbG9nTWFuYWdlJyxcclxuICAgICAgICBuYW1lOiAnTG9nTWFuYWdlJyxcclxuICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ1x1NjVFNVx1NUZEN1x1N0JBMVx1NzQwNicsXHJcbiAgICAgICAgICBpY29uOiAnbWRpOmJvb2stb3BlbicsXHJcbiAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IDAsXHJcbiAgICAgICAgICBjYWNoZTogMSxcclxuICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1x1NjVFNVx1NUZEN1x1N0JBMVx1NzQwNidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudDogJycsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGlkOiAnZmI1NDU2ZDA2YWEwNDFkZDlmMTk0ODQ2YjdiNzM3NTgnLFxyXG4gICAgICAgICAgICBpZDogJ2JjYTNjYTYzOTFhNzQ4NGJiMWFhYWM4OGIzYjVhMTRiJyxcclxuICAgICAgICAgICAgcGF0aDogJ3NpZ25JbkxvZycsXHJcbiAgICAgICAgICAgIG5hbWU6ICdTaWduSW5Mb2cnLFxyXG4gICAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdcdTc2N0JcdTVGNTVcdTY1RTVcdTVGRDcnLFxyXG4gICAgICAgICAgICAgIGljb246ICdtZGk6bWVzc2FnZS1yZXBseS10ZXh0JyxcclxuICAgICAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgICAgIGRpc2FibGVkOiAxLFxyXG4gICAgICAgICAgICAgIGNhY2hlOiAxLFxyXG4gICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdcdTc2N0JcdTVGNTVcdTY1RTVcdTVGRDcnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogJy9zeXN0ZW0vbG9nTWFuYWdlL2luZGV4JyxcclxuICAgICAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcGlkOiAnZmI1NDU2ZDA2YWEwNDFkZDlmMTk0ODQ2YjdiNzM3NTgnLFxyXG4gICAgICAgICAgICBpZDogJ2Q2NWQyMmRlOWY5ZjQyYWI5NmMwZjMwMTFjMjBhNDEyJyxcclxuICAgICAgICAgICAgcGF0aDogJ29wZXJMb2cnLFxyXG4gICAgICAgICAgICBuYW1lOiAnT3BlckxvZycsXHJcbiAgICAgICAgICAgIG1ldGE6IHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ1x1NjRDRFx1NEY1Q1x1NjVFNVx1NUZENycsXHJcbiAgICAgICAgICAgICAgaWNvbjogJ21kaTp3cmVuY2gtY29nJyxcclxuICAgICAgICAgICAgICBzaG93OiAwLFxyXG4gICAgICAgICAgICAgIGRpc2FibGVkOiAxLFxyXG4gICAgICAgICAgICAgIGNhY2hlOiAxLFxyXG4gICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdcdTY0Q0RcdTRGNUNcdTY1RTVcdTVGRDcnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogJy9zeXN0ZW0vbG9nTWFuYWdlL2luZGV4JyxcclxuICAgICAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjcmVhdGVCeTogJ2FkbWluJyxcclxuICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gIH1cclxuXTtcclxuXHJcbi8vIFx1OTBFOFx1OTVFOFx1NjU3MFx1NjM2RVxyXG5jb25zdCBERVBUX0xJU1QgPSBbXHJcbiAge1xyXG4gICAgaWQ6ICcyZmI1OTcxY2Q3MTM0Zjc3OWQ5MGU2YzZiYzgzMzA4MycsXHJcbiAgICBwaWQ6ICcwJyxcclxuICAgIG5hbWU6ICd4eHhcdTUxNkNcdTUzRjgnLFxyXG4gICAgY29kZTogJ2FhYScsXHJcbiAgICBkZXNjcmlwdGlvbjogJycsXHJcbiAgICBzdGF0dXM6IDAsXHJcbiAgICBvcmRlcjogMSxcclxuICAgIGNyZWF0ZUJ5OiAnYWRtaW4nLFxyXG4gICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnNWM2NTYzNTEzMmIwNGIxZDllZjQ1NmRhY2Y1ZGZkYmMnLFxyXG4gICAgICAgIHBpZDogJzJmYjU5NzFjZDcxMzRmNzc5ZDkwZTZjNmJjODMzMDgzJyxcclxuICAgICAgICBuYW1lOiAnXHU5MEU4XHU5NUU4MScsXHJcbiAgICAgICAgY29kZTogJ2EnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgICAgICBzdGF0dXM6IDAsXHJcbiAgICAgICAgb3JkZXI6IDEsXHJcbiAgICAgICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICAgICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMTAgMTI6MjE6MzMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogJzNmMGU2ZTk4ODVlOTQzMWNhOGE5ODRhZDQ0MzlmNGIxJyxcclxuICAgICAgICBwaWQ6ICcyZmI1OTcxY2Q3MTM0Zjc3OWQ5MGU2YzZiYzgzMzA4MycsXHJcbiAgICAgICAgbmFtZTogJ1x1OTBFOFx1OTVFODInLFxyXG4gICAgICAgIGNvZGU6ICdiJyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJycsXHJcbiAgICAgICAgc3RhdHVzOiAwLFxyXG4gICAgICAgIG9yZGVyOiAyLFxyXG4gICAgICAgIGNyZWF0ZUJ5OiAnYWRtaW4nLFxyXG4gICAgICAgIGNyZWF0ZVRpbWU6ICcyMDI0LTAxLTEwIDEyOjIxOjMzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdjZjFhMjcyOGM5Y2E0YTBmOWE5MDMxOWNlNTY0ZDFhMycsXHJcbiAgICAgICAgcGlkOiAnMmZiNTk3MWNkNzEzNGY3NzlkOTBlNmM2YmM4MzMwODMnLFxyXG4gICAgICAgIG5hbWU6ICdcdTkwRThcdTk1RTgzJyxcclxuICAgICAgICBjb2RlOiAnYycsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgICAgIHN0YXR1czogMCxcclxuICAgICAgICBvcmRlcjogMyxcclxuICAgICAgICBjcmVhdGVCeTogJ2FkbWluJyxcclxuICAgICAgICBjcmVhdGVUaW1lOiAnMjAyNC0wMS0xMCAxMjoyMTozMydcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuXTtcclxuXHJcbi8vIFx1ODlEMlx1ODI3Mlx1NjU3MFx1NjM2RVxyXG5jb25zdCBST0xFX0xJU1QgPSBbXHJcbiAge1xyXG4gICAgbmFtZTogJ1x1N0JBMVx1NzQwNlx1NTQ1OCcsXHJcbiAgICBjb2RlOiAnYWRtaW4nLFxyXG4gICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICBjcmVhdGVUaW1lOiAnMjAyNC0wMS0wMSAxNDoyMTozMidcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdcdTgwMDFcdTY3N0YnLFxyXG4gICAgY29kZTogJ2Jvc3MnLFxyXG4gICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICBjcmVhdGVUaW1lOiAnMjAyNC0wMS0wMSAxNDoyMTozMidcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdcdTdFQ0ZcdTc0MDYnLFxyXG4gICAgY29kZTogJ21hbmFnZXInLFxyXG4gICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICBjcmVhdGVUaW1lOiAnMjAyNC0wMS0wMSAxNDoyMTozMidcclxuICB9XHJcbl07XHJcblxyXG4vLyBcdTdCMTRcdThCQjBcdTY1NzBcdTYzNkVcclxuY29uc3QgTk9URV9MSVNUID0gW1xyXG4gIHtcclxuICAgIG5hbWU6ICdcdTRFQkFcdTc1MUZcdTRGNTVcdTU5MDRcdTRFMERcdTc2RjhcdTkwMjInLFxyXG4gICAgY29kZTogJ2FkbWluJyxcclxuICAgIGNyZWF0ZUJ5OiAnYWRtaW4nLFxyXG4gICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMDEgMTQ6MjE6MzInXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnXHU1OTA0XHU1OTA0XHU5NUZCXHU1NTdDXHU5RTFGJyxcclxuICAgIGNvZGU6ICdib3NzJyxcclxuICAgIGNyZWF0ZUJ5OiAnYWRtaW4nLFxyXG4gICAgY3JlYXRlVGltZTogJzIwMjQtMDEtMDEgMTQ6MjE6MzInXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnXHU1MjFEXHU1OUNCTGludXgnLFxyXG4gICAgY29kZTogJ21hbmFnZXInLFxyXG4gICAgY3JlYXRlQnk6ICdhZG1pbicsXHJcbiAgICBjcmVhdGVUaW1lOiAnMjAyNC0wMS0wMSAxNDoyMTozMidcclxuICB9XHJcbl07XHJcblxyXG5jb25zdCBtb2NrOiBBcnJheTxNb2NrTWV0aG9kPiA9IFtcclxuICB7XHJcbiAgICAvLyBcdTYzQTVcdTUzRTNcdThERUZcdTVGODRcclxuICAgIHVybDogJy9hcGkvdGVzdCcsXHJcbiAgICAvLyBcdTYzQTVcdTUzRTNcdTY1QjlcdTZDRDVcclxuICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAvLyBcdThGRDRcdTU2REVcdTY1NzBcdTYzNkVcclxuICAgIHJlc3BvbnNlOiAoKTogSVJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBtZXNzYWdlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogJ0hlbGxvIFdvcmxkJ1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zZWN1cml0eS9wS2V5JyxcclxuICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXHJcbiAgICAgICAgICBwS2V5OiBgLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1NSUdlTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdNQURDQmlBS0JnR1YxLzZhTTBLbzJlcmJrU2pIVURZbnhuVEJpZ3U4UnFOOHNSN3hXK05aNjIvUm95Ly9BTjUyVkRGanF2UzdsWEZETWM3VCt3QmZFNVNjSzRxdlluc21SRy9uK1REMndQRkZHeGhtZHVnRjg2RVdEeFZwbW83ZlJWMHNtbVBHakJ2WE16SGxvdnpKYWgrZ3plSXhrT0Roc2tMeU9hajUzSEdwcVlKMHVDODA3QWdNQkFBRT0tLS0tLUVORCBQVUJMSUMgS0VZLS0tLS1cclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgICBzYWZlOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS91c2VyL3ZhbGlkYXRlQ29kZScsXHJcbiAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgcmVzcG9uc2U6ICgpOiBJUmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdcdTgzQjdcdTUzRDZcdTlBOENcdThCQzFcdTc4MDFcdTYyMTBcdTUyOUZcdUZGMDEnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIGJhc2U2NDpcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cclxuICAgICAgICAgICAgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRjBBQUFBZ0NBSUFBQUQvcitPTEFBQUFDWEJJV1hNQUFBN0VBQUFPeEFHVkt3NGJBQUFBRVhSRldIUlRiMlowZDJGeVpRQlRibWx3WVhOMFpWMFh6dDBBQUFNVVNVUkJWR2lCN1ZsUmtxSXdFQTNVM3NKd0RzTmNnd1N1UWMxY1F5MlBZZEJyZ0RrSGNnM1QrOUUxMlF4RVRURHFUcFh2U3hDN095Lzl1anVZQUFCNVk0TDAxUUg4cDNqejRzYWJGemZldkxqeGEzakpzbXl6MlR6UEgvaWhhWnE2cmowZmZnUk13RTNUUE1PZDUzTmFhMElJNS95aDBWd0JJUVJqQ04zUmVmRFZVWklrUWdpbEZMeHUza21TQkFEYXRwVlM0aVZHVlpabGZGOUI2OHp6WENuVjkzMldaZE52OS91OWZVa3B6ZlA4M2dDL2dhUTQ3K01IS1dWTWdvS3lDek5aU21udU5FMXp5WEpjMFUxREhiazduODhSM2YwSklqRkpFaWxsVlZYRE1IeCtmbUtzbU5XSXNpejMrMzFabHBGMzc5czRmc0RFck9zYTgvSDFPa0pzTmhzQStQcjZjbHRNa3FJb0RvZkR2SUJPcDVOU3lsemFhMTRzRmtnRVkreVM5MmlJbUhzQUlJUWdoR2l0Wi96S2lkMXVwN1ZHL1lhYXZRZVJlYUdVQnBXVnJ1dHcvZEtDYy8yenQ3RHJPdVE5S0xCcnp2cSt4NkM3cnZNMUZ4STkxdXlpS0tKYkJvQys3KzJlc0Z3dWczNSt6Umttc0w4MFBJVnBxNFp6N3FtT0lGNm1lZ3pWb0plenVxNmRZZUdCQlYyaUl1d1dia01JSVlSZ2pObXE2ZnYrcG11czhYQ0xGeFFMcFJUdFk4Q0l0bTF2cjNBQ0wxNXd6YVB6RVdicGFyV3lMKzBITUpQTmFNYzU5ODhPMnlibjNDbUUwZWhVRkFYbjNHaC9zVmc0QzRwblRRZzdINDFpMnUxMi93ejlGSkV0RnRTanA2T1JDOE9MbllrakdScjRlUFFzd0FHaVpZeFJTclhXS0IrYkZDTW9tNDVMbmVVNlRQdEFGMElJNUlVeFp1NHp4a1l5TkJsOTNhbC9Zd3FZZDQvSFk1N25hWnFpZktxcXNyOGloS1JwdWx3dVY2dlY3S0hyZUR4K2ZId1VSZEcyYlpabFNxbGhHTkM0VWdxSGdORXB6SUJ6dnQxdXQ5c3RzUTVOQm1ZK3BKUU93d0FBMDJkK0lHZ3pwL0pCb0tueitYem42SFZwd1U2blUyaXQ3VU9KRFRNZmVvNklBYnhNNVFNQXBzWE1LL3NqeUo5QVlXS1h1ZFRwWm1ES2l4QmlkQ2ZnZlIyeHVnOWl2VjVqbDRsQ2loT21wa1MwaVN6Yk5xZU4wc3VmYVEwUmcvUEVnM2k1S1V5dnVpdUVnTmU5cG9zT1RKWWJieWNpN3NNanNGNnZYeExublBjdlR3WkdlS090eHNZdjRPVWwrRFgvcXowWmIxN2MrQXNrRlhocTdadmgwd0FBQUFCSlJVNUVya0pnZ2c9PSdcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICcvYXBpL3VzZXIvc2lnbkluJyxcclxuICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgcmVzcG9uc2U6ICgpOiBJUmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdcdTc1MjhcdTYyMzdcdTc2N0JcdTVGNTVcdTYyMTBcdTUyOUZcdUZGMDEnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHVzZXJJZDogJzIyMDEwMTE5NzgxMjA3OTMwMycsXHJcbiAgICAgICAgICB0b2tlbjogJ1lqaTR5VVh0Z3BweUFiNklYQlc1QjRDRVB0WXpCb0MweU9EaU9vNGJpQklZMGNTekNiMlZ1WktFUGREMXFMdjAnXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS91c2VyL2luZm8nLFxyXG4gICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIHJlc3BvbnNlOiAoKTogSVJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBtZXNzYWdlOiAnXHU4M0I3XHU1M0Q2XHU3NTI4XHU2MjM3XHU0RkUxXHU2MDZGXHU2MjEwXHU1MjlGXHVGRjAxJyxcclxuICAgICAgICB0aW1lc3RhbXA6IGZvcm1hdERhdGUoKSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB1c2VySWQ6ICcyMjAxMDExOTc4MTIwNzkzMDMnLFxyXG4gICAgICAgICAgdXNlck5hbWU6ICdhZG1pbicsXHJcbiAgICAgICAgICB1c2VyTmlja05hbWU6ICdcdThEODVcdTdFQTdcdTdCQTFcdTc0MDZcdTU0NTgnLFxyXG4gICAgICAgICAgdG9rZW46ICdZamk0eVVYdGdwcHlBYjZJWEJXNUI0Q0VQdFl6Qm9DMHlPRGlPbzRiaUJJWTBjU3pDYjJWdVpLRVBkRDFxTHYwJyxcclxuICAgICAgICAgIGRlcHRJZDogMTAwLFxyXG4gICAgICAgICAgZGVwdE5hbWU6ICdcdTg4NENcdTY1M0ZcdTkwRTgnXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vbWVudS9saXN0JyxcclxuICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgcmVzcG9uc2U6ICgpOiBJUmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdcdTgzQjdcdTUzRDZcdTgzRENcdTUzNTVcdTY1NzBcdTYzNkVcdTYyMTBcdTUyOUZcdUZGMDEnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IE1FTlVfTElTVFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vcm91dGVzJyxcclxuICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgcmVzcG9uc2U6ICgpOiBJUmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdcdTgzQjdcdTUzRDZcdThERUZcdTc1MzFcdTg4NjhcdTYyMTBcdTUyOUZcdUZGMDEnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IE1FTlVfTElTVFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vZ2V0RGVwdCcsXHJcbiAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgIHJlc3BvbnNlOiAoKTogSVJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBtZXNzYWdlOiAnXHU4M0I3XHU1M0Q2XHU5MEU4XHU5NUU4XHU2NTcwXHU2MzZFXHU2MjEwXHU1MjlGXHVGRjAxJyxcclxuICAgICAgICB0aW1lc3RhbXA6IGZvcm1hdERhdGUoKSxcclxuICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnXHU5MEU4XHU5NUU4MScsXHJcbiAgICAgICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgICAgIHBhcmVudElkOiAnMCcsXHJcbiAgICAgICAgICAgIGlzTGVhZjogZmFsc2UsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdcdTkwRThcdTk1RTgxLjEnLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICcxMScsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRJZDogJzEnLFxyXG4gICAgICAgICAgICAgICAgaXNMZWFmOiB0cnVlXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1x1OTBFOFx1OTVFODEuMicsXHJcbiAgICAgICAgICAgICAgICBpZDogJzEyJyxcclxuICAgICAgICAgICAgICAgIHBhcmVudElkOiAnMScsXHJcbiAgICAgICAgICAgICAgICBpc0xlYWY6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnXHU5MEU4XHU5NUU4MicsXHJcbiAgICAgICAgICAgIGlkOiAnMicsXHJcbiAgICAgICAgICAgIHBhcmVudElkOiAnMCcsXHJcbiAgICAgICAgICAgIGlzTGVhZjogZmFsc2UsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdcdTkwRThcdTk1RTgyLjEnLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICcyMScsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRJZDogJzInLFxyXG4gICAgICAgICAgICAgICAgaXNMZWFmOiB0cnVlXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1x1OTBFOFx1OTVFODIuMicsXHJcbiAgICAgICAgICAgICAgICBpZDogJzIyJyxcclxuICAgICAgICAgICAgICAgIHBhcmVudElkOiAnMicsXHJcbiAgICAgICAgICAgICAgICBpc0xlYWY6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICcvYXBpL3N5c3RlbS9nZXRVc2VycycsXHJcbiAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgIHJlc3BvbnNlOiAoKTogSVJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBtZXNzYWdlOiAnXHU4M0I3XHU1M0Q2XHU3NTI4XHU2MjM3XHU2NTcwXHU2MzZFXHU2MjEwXHU1MjlGXHVGRjAxJyxcclxuICAgICAgICB0aW1lc3RhbXA6IGZvcm1hdERhdGUoKSxcclxuICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogJzEyMTMyMScsXHJcbiAgICAgICAgICAgIHVzZXJOYW1lOiAnaGpoX2RmJyxcclxuICAgICAgICAgICAgbmlja05hbWU6ICdcdTkwRERcdTRGNzNcdTYwRTAnLFxyXG4gICAgICAgICAgICBnZW5kZXI6IDEsXHJcbiAgICAgICAgICAgIGRlcHRJZDogJycsXHJcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAxODU2NDc5NjUyMCxcclxuICAgICAgICAgICAgdXNlclJvbGU6ICcwJyxcclxuICAgICAgICAgICAgdXNlckF2YXRhcjogJycsXHJcbiAgICAgICAgICAgIHN0YXR1czogMCxcclxuICAgICAgICAgICAgY3JlYXRlVGltZTogJzIwMjItMDYtMTIgMTU6MzY6MjAnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1c2VySWQ6ICcxMjEyMzIxJyxcclxuICAgICAgICAgICAgdXNlck5hbWU6ICdkZmEnLFxyXG4gICAgICAgICAgICBuaWNrTmFtZTogJ1x1ODg4MVx1NEY3M1x1NjYwQScsXHJcbiAgICAgICAgICAgIGdlbmRlcjogMSxcclxuICAgICAgICAgICAgZGVwdElkOiAnJyxcclxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IDE3Nzc0MDk2NDk4LFxyXG4gICAgICAgICAgICB1c2VyUm9sZTogJzAnLFxyXG4gICAgICAgICAgICB1c2VyQXZhdGFyOiAnJyxcclxuICAgICAgICAgICAgc3RhdHVzOiAwLFxyXG4gICAgICAgICAgICBjcmVhdGVUaW1lOiAnMjAyMi0wNi0xMiAxNTozNjoyMCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogJzEzMTMyJyxcclxuICAgICAgICAgICAgdXNlck5hbWU6ICd0ZXN0JyxcclxuICAgICAgICAgICAgbmlja05hbWU6ICdcdTkwQjFcdTZERkJcdTZDNjAnLFxyXG4gICAgICAgICAgICBnZW5kZXI6IDEsXHJcbiAgICAgICAgICAgIGRlcHRJZDogJycsXHJcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAxNTU5OTUzMDA5MyxcclxuICAgICAgICAgICAgdXNlclJvbGU6ICcwJyxcclxuICAgICAgICAgICAgdXNlckF2YXRhcjogJycsXHJcbiAgICAgICAgICAgIHN0YXR1czogMCxcclxuICAgICAgICAgICAgY3JlYXRlVGltZTogJzIwMjItMDYtMTIgMTU6MzY6MjAnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vZGVwdC9saXN0JyxcclxuICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgcmVzcG9uc2U6ICgpOiBJUmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdcdTgzQjdcdTUzRDZcdTkwRThcdTk1RThcdTY1NzBcdTYzNkVcdTYyMTBcdTUyOUZcdUZGMDEnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IERFUFRfTElTVFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vZGVwdC9hZGQnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1NkRGQlx1NTJBMFx1OTBFOFx1OTVFOFx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vZGVwdC91cGRhdGUnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1NEZFRVx1NjUzOVx1OTBFOFx1OTVFOFx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vZGVwdC9kZWxldGUnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1NTIyMFx1OTY2NFx1OTBFOFx1OTVFOFx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vcm9sZS9saXN0JyxcclxuICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgcmVzcG9uc2U6ICgpOiBJUmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdcdTgzQjdcdTUzRDZcdTg5RDJcdTgyNzJcdTY1NzBcdTYzNkVcdTYyMTBcdTUyOUZcdUZGMDEnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IFJPTEVfTElTVFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vcm9sZS9hZGQnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1NkRGQlx1NTJBMFx1ODlEMlx1ODI3Mlx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vcm9sZS91cGRhdGUnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1NEZFRVx1NjUzOVx1ODlEMlx1ODI3Mlx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9zeXN0ZW0vcm9sZS9kZWxldGUnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1NTIyMFx1OTY2NFx1ODlEMlx1ODI3Mlx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9ub3RlL2xpc3QnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1ODNCN1x1NTNENlx1N0IxNFx1OEJCMFx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogTk9URV9MSVNUXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICcvYXBpL25vdGUvYWRkJyxcclxuICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgcmVzcG9uc2U6ICgpOiBJUmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdcdTZERkJcdTUyQTBcdTdCMTRcdThCQjBcdTY1NzBcdTYzNkVcdTYyMTBcdTUyOUZcdUZGMDEnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogZm9ybWF0RGF0ZSgpLFxyXG4gICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogJy9hcGkvbm90ZS91cGRhdGUnLFxyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICByZXNwb25zZTogKCk6IElSZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgbWVzc2FnZTogJ1x1NEZFRVx1NjUzOVx1N0IxNFx1OEJCMFx1NjU3MFx1NjM2RVx1NjIxMFx1NTI5Rlx1RkYwMScsXHJcbiAgICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKCksXHJcbiAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2FwaS9ub3RlL2RlbGV0ZScsXHJcbiAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgIHJlc3BvbnNlOiAoKTogSVJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBtZXNzYWdlOiAnXHU1MjIwXHU5NjY0XHU3QjE0XHU4QkIwXHU2NTcwXHU2MzZFXHU2MjEwXHU1MjlGXHVGRjAxJyxcclxuICAgICAgICB0aW1lc3RhbXA6IGZvcm1hdERhdGUoKSxcclxuICAgICAgICBkYXRhOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9jaztcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VSxTQUFTLFNBQXFDO0FBQzVYLFNBQVMsYUFBdUI7QUFDaEMsU0FBUyxZQUFZO0FBOEJkLFNBQVMsV0FBVyxPQUFPLG9CQUFJLEtBQUssR0FBRyxNQUFNLHVCQUF1QjtBQUN6RSxRQUFNLFFBQVEsSUFBSSxLQUFLLElBQUk7QUFDM0IsV0FBUyxZQUFZLEtBQWE7QUFDaEMsWUFBUSxPQUFPLEtBQUssVUFBVSxJQUFJLE1BQU07RUFDMUM7QUFDQSxNQUFJLE9BQU8sS0FBSyxHQUFHLEdBQUc7QUFDcEIsVUFBTSxJQUFJLFFBQVEsT0FBTyxLQUFLLE1BQU0sWUFBWSxJQUFJLElBQUksVUFBVSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUM7RUFDekY7QUFDQSxRQUFNLElBQVM7SUFDYixNQUFNLE1BQU0sU0FBUyxJQUFJO0lBQ3pCLE1BQU0sTUFBTSxRQUFRO0lBQ3BCLE1BQU0sTUFBTSxTQUFTO0lBQ3JCLE1BQU0sTUFBTSxXQUFXO0lBQ3ZCLE1BQU0sTUFBTSxXQUFXO0VBQ3pCO0FBQ0EsYUFBVyxLQUFLLEdBQUc7QUFDakIsUUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsR0FBRztBQUNsQyxZQUFNLE1BQU0sRUFBRSxDQUFDLElBQUk7QUFDbkIsWUFBTSxJQUFJLFFBQVEsT0FBTyxJQUFJLE9BQU8sR0FBRyxXQUFXLElBQUksTUFBTSxZQUFZLEdBQUcsQ0FBQztJQUM5RTtFQUNGO0FBQ0EsU0FBTztBQUNUO0FDakRBLElBQU0sWUFBWTtFQUNoQjtJQUNFLEtBQUs7SUFDTCxJQUFJO0lBQ0osTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO01BQ0osT0FBTztNQUNQLE1BQU07TUFDTixNQUFNO01BQ04sVUFBVTtNQUNWLE9BQU87TUFDUCxNQUFNO01BQ04sYUFBYTtJQUNmO0lBQ0EsV0FBVztJQUNYLFVBQVU7TUFDUjtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7SUFDRjtJQUNBLFVBQVU7SUFDVixZQUFZO0VBQ2Q7RUFDQTtJQUNFLEtBQUs7SUFDTCxJQUFJO0lBQ0osTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO01BQ0osT0FBTztNQUNQLE1BQU07TUFDTixNQUFNO01BQ04sVUFBVTtNQUNWLE9BQU87TUFDUCxNQUFNO01BQ04sYUFBYTtJQUNmO0lBQ0EsV0FBVztJQUNYLFVBQVU7TUFDUjtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1BQU07VUFDTixNQUFNO1VBQ04sVUFBVTtVQUNWLE9BQU87VUFDUCxNQUFNO1VBQ04sYUFBYTtRQUNmO1FBQ0EsV0FBVztRQUNYLFVBQVU7UUFDVixZQUFZO01BQ2Q7TUFDQTtRQUNFLEtBQUs7UUFDTCxJQUFJO1FBQ0osTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1VBQ0osT0FBTztVQUNQLE1B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
