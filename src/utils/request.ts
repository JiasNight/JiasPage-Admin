import axios, { Axios, AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { errorCodeType } from './requestErrorCode';
import { getCurrentInstance } from 'vue';

// 这个就是上面创建的router实例，用来跳转到login页面的
import router from '../router';

// 请求加密方法引入
import { aesUtil, rsaUtil, publicKey } from './common/cryption';

class Interceptors {
  instance: AxiosInstance;
  loading: any;
  constructor() {
    // 基础配置
    this.instance = axios.create({
      // 服务接口请求
      // baseURL: import.meta.env.VITE_APP_BASE_URL,
      // 超时设置
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8;'
      },
      // 表示跨域请求时是否需要使用凭证
      withCredentials: false
    });

    this.init();
  }

  init() {
    // 判断是否需要对请求和响应加解密
    const isEncrypt: boolean | string | null = window.sessionStorage.getItem('safe');
    // 请求拦截
    // const aesKey = aesUtil.genKey();
    // const iv = aesUtil.genKey();
    const aesKey: string = window.sessionStorage.getItem('aesKey') || '';
    this.instance.interceptors.request.use(
      (config: any) => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        const token = window.localStorage.getItem('TOKEN');
        token && (config.headers.Authorization = token);
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
          return config;

        } else {
          return config;
        }
      },
      (error) => {
        // 失败就简单处理了
        return Promise.reject(error);
      }
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          return Promise.resolve(response.data);
        } else {
          // 这个就是错误的时候自行处理的代码了，具体业务具体处理，加上注释只供参考
          if (response.data.code === '401') {
            // 清除token
            localStorage.removeItem('TOKEN');
            router.push('/signIn');
            // ctx.$Message.error(errorCodeType('401'));
          } else if (response.status === 200) {
            // ctx.$Message.error(response.data.message || '系统错误');
            return Promise.resolve(response.data);
          } else {
            // ctx.$Message.error(errorCodeType(response.data.code));
            return Promise.reject(response.data);
          }
          return;
        }
      },
      (error) => {
        // 具体业务具体处理，加上注释只供参考
        const { status } = error.response;
        if (status === '401') {
          // ctx.$Message.error(errorCodeType('401'));
          // 清除token
          localStorage.removeItem('TOKEN');
          // 页面跳转
          router.push('/signIn');
        } else {
          // ctx.$Message.error('系统错误');
        }
        return Promise.reject(error);
      }
    );
  }

  getInterceptors() {
    return this.instance;
  }
}

// 请求配置
class serviceHttp {
  axios: any;
  // 获取axios实例
  constructor() {
    this.axios = new Interceptors().getInterceptors();
  }
}

const service = new serviceHttp();

export default service;
