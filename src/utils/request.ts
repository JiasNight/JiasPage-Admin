import axios, { Axios, AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
import { createDiscreteApi } from 'naive-ui';

const { message } = createDiscreteApi(['message']);

// 这个就是上面创建的router实例，用来跳转到login页面的
import router from '../router';

// 请求加密方法引入
import { aesUtil, rsaUtil, publicKey } from './common/cryption';
import { IResponse } from '@/interface/index';

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
    const isEncrypt: boolean | string | null = window.sessionStorage.getItem('safe');
    // 请求拦截
    // const aesKey = aesUtil.genKey();
    // const iv = aesUtil.genKey();
    const aesKey: string = window.sessionStorage.getItem('aesKey') || '';
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        const token = window.localStorage.getItem('token');
        if (isEncrypt) {
          // 请求方法类型
          const requestMethod = config.method;
          if (config.params && config.params !== undefined) {
            const requestParams = config.params;
            const objParams: any = {
              data: aesUtil.encrypt(requestParams, aesKey),
              aesKey: rsaUtil.encrypt(aesKey, window.sessionStorage.getItem('javaPublicKey')),
              publicKey: publicKey
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
                data: aesUtil.encrypt(jsonData, aesKey),
                aesKey: rsaUtil.encrypt(aesKey, window.sessionStorage.getItem('javaPublicKey')),
                publicKey: publicKey
              };
              // const fd: FormData = new FormData();
              // for (const key in objData) {
              //   fd.append(key, objData[key]);
              // }
              config.data = objData;
            } else {
              const objData: any = {
                data: aesUtil.encrypt(requestData, aesKey),
                aesKey: rsaUtil.encrypt(aesKey, window.sessionStorage.getItem('javaPublicKey')),
                publicKey: publicKey
              };
              config.data = objData;
            }
          }
        }
        return {
          ...config,
          headers: {
            Authorization: token
          }
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
        // 登录信息失效，跳转登录界面并清空token
        if (data.code === 600) {
          localStorage.removeItem('token');
          router.push('/signIn');
          return Promise.reject(data);
        }
        if (data.code && data.code !== 200) {
          return Promise.reject(data);
        }
        return data;
      },
      (error: AxiosError) => {
        // 具体业务具体处理，加上注释只供参考
        const { response } = error;
        if (response) {
          this.handleResCode(response.status);
        }
        if (!window.navigator.onLine) {
          message.error('网络连接失败');
          // 可以跳转到错误页面，也可以不做操作
          // return router.replace({
          //   path: '/404'
          // });
        }
      }
    );
  }

  /**
   *
   * @param code 处理请求状态码
   */
  handleResCode(code: number) {
    switch (code) {
      case 400:
        message.error('请求错误(400)');
        break;
      case 401:
        message.error('未授权，请重新登录(401)');
        break;
      case 403:
        message.error('拒绝访问(403)');
        break;
      case 404:
        message.error('请求出错(404)');
        break;
      case 408:
        message.error('请求超时(408)');
        break;
      case 500:
        message.error('服务器错误(500)');
        break;
      case 501:
        message.error('服务未实现(501)');
        break;
      case 502:
        message.error('网络错误(502)');
        break;
      case 503:
        message.error('服务不可用(503)');
        break;
      case 504:
        message.error('网络超时(504)');
        break;
      case 505:
        message.error('HTTP版本不受支持(505)');
        break;
      default:
        message.error(`连接出错(${code})!`);
        break;
    }
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
