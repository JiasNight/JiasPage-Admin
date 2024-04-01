import axios, { Axios, AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
import { createDiscreteApi } from 'naive-ui';
import router from '@/router';
import { handleResCode } from './common/requestCodeEnum';

const { message } = createDiscreteApi(['message']);

// 这个就是上面创建的router实例，用来跳转到signIn页面的
// import router from '../router';

// 请求加密方法引入
import { aesUtil, rsaUtil, publicKey } from './common/security';
import { IResponse } from '@/interface/common';

const config = {
  // 默认地址
  // baseURL: '',
  // 设置超时时间
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8;'
  },
  // 跨域时候允许携带凭证
  withCredentials: true
};
class AxiosTool {
  // 定义成员变量并指定类型
  private service: AxiosInstance;

  // 构造方法
  public constructor(config: AxiosRequestConfig) {
    // 实例化基础配置
    this.service = axios.create(config);

    this.init();
  }

  private init() {
    // 判断是否需要对请求和响应加解密
    const isEncrypt: boolean | null = localStorage.getItem('safe') === 'true';
    // 请求拦截
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig | any) => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        const token = localStorage.getItem('token');
        const headers: any = {
          authorization: token
        };
        if (isEncrypt) {
          const publicKey: string = localStorage.getItem('pKey') as string;
          const aesKey: string = aesUtil.genKey();
          const aKey = rsaUtil.encrypt(aesKey, publicKey);
          // 请求方法类型
          const requestMethod = config.method;
          if (config.params && config.params !== undefined) {
            const requestParams = config.params;
            const objParams: any = {
              data: aesUtil.encrypt(requestParams, aesKey)
            };
            config.params = objParams;
          }
          if (config.data && config.data !== undefined) {
            const requestData = config.data;
            if (Object.prototype.toString.call(requestData) === '[object FormData]') {
              // 设置请求头为表单提交头
              const jsonData: any = {};
              for (const key of requestData.keys()) {
                jsonData[key] = requestData.get(key);
              }
              const objData: any = {
                data: aesUtil.encrypt(jsonData, aesKey)
              };
              // const fd: FormData = new FormData();
              // for (const key in objData) {
              //   fd.append(key, objData[key]);
              // }
              config.data = objData;
            } else {
              const objData: any = {
                data: aesUtil.encrypt(requestData, aesKey)
              };
              config.data = objData;
            }
          }
          headers.authKey = aKey;
        }
        return {
          ...config,
          headers
        };
      },
      (error: AxiosError) => {
        // 失败处理
        return Promise.reject(error);
      }
    );

    // 响应拦截
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;
        const res = data;
        console.log(res);
        // return Promise.reject(res); reject只有catch才能捕获到
        // 登录信息失效，跳转登录界面并清空token
        if (res.code === 600) {
          localStorage.removeItem('token');
          router.push('/signIn');
          return Promise.reject(res);
        }
        if (res.code && res.code !== 200) {
          handleResCode(res.code);
          return Promise.reject(res);
        }
        return res;
      },
      (error: AxiosError) => {
        // 具体业务具体处理，加上注释只供参考
        const { response } = error;
        if (response) {
          handleResCode(response.status);
        }
        if (!navigator.onLine) {
          message.error('网络连接失败');
          // 可以跳转到错误页面，也可以不做操作
          // return router.replace({
          //   path: '/404'
          // });
        }
      }
    );
  }

  // 常用方法封装
  //   get<T>(url: string, params?: object): Promise<IResponse<T>> {
  //     return this.service.get(url, { params });
  //   }
  //   post<T>(url: string, params?: object): Promise<IResponse<T>> {
  //     return this.service.post(url, params);
  //   }
  //   put<T>(url: string, params?: object): Promise<IResponse<T>> {
  //     return this.service.put(url, params);
  //   }
  //   delete<T>(url: string, params?: object): Promise<IResponse<T>> {
  //     return this.service.delete(url, { params });
  //   }
  // 封装一个请求方法
  request<T>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.service(config);
  }
}

const service = new AxiosTool(config);

export default service;
