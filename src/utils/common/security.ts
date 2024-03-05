import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

const DEFAULT_KEY = 'def009A1bcO538JK';

/**
 * aes加密
 */
export const aesUtil = {
  // 获取key，
  genKey: (length = 16) => {
    const random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
      str = str + random.charAt(Math.random() * random.length);
    }
    return str;
  },

  // 加密
  encrypt: (textStr: any, key: string = DEFAULT_KEY) => {
    if (textStr instanceof Object) {
      // JSON.stringify
      textStr = JSON.stringify(textStr);
    }
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(textStr), CryptoJS.enc.Utf8.parse(key), {
      // ECB不需要iv
      // iv:  CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },

  // 解密
  decrypt: (textStr: any, key: string = DEFAULT_KEY) => {
    const base64 = CryptoJS.enc.Base64.parse(textStr);
    const src = CryptoJS.enc.Base64.stringify(base64);
    const decrypt = CryptoJS.AES.decrypt(src, CryptoJS.enc.Utf8.parse(key), {
      // iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    const decString = decrypt.toString(CryptoJS.enc.Utf8);
    return decString.toString();
  }
};

/**
 * rsa加密
 */
export const rsaUtil: any = {
  // RSA 位数，这里要跟后端对应
  bits: 1024,

  // 当前JSEncrypted对象
  thisKeyPair: {},

  // 生成密钥对(公钥和私钥)
  genKeyPair: (bits = rsaUtil.bits) => {
    const genKeyPair: any = {};
    rsaUtil.thisKeyPair = new JSEncrypt({
      // eslint-disable-next-line camelcase
      default_key_size: bits
    });
    // 这里项目使用的是静态秘钥，所以该方法在本地执行一次，获取到配对的公私钥保存下即可
    // 获取私钥
    genKeyPair.privateKey = rsaUtil.thisKeyPair.getPrivateKey();

    // 获取公钥
    genKeyPair.publicKey = rsaUtil.thisKeyPair.getPublicKey();

    return genKeyPair;
  },

  // 公钥加密
  encrypt: (textStr: any, publicKey: string) => {
    // 由于秘钥已经生存一对保存在本地，该方法就在内部调用，生成setPublicKey方法
    // this.genKeyPair();

    if (textStr instanceof Object) {
      // 1、JSON.stringify
      textStr = JSON.stringify(textStr);
    }
    publicKey && rsaUtil.thisKeyPair.setPublicKey(publicKey);
    return rsaUtil.thisKeyPair.encrypt(JSON.stringify(textStr));
  },

  // 私钥解密
  decrypt: (textStr: any, privateKey: string) => {
    privateKey && rsaUtil.thisKeyPair.setPrivateKey(privateKey);
    let decString = rsaUtil.thisKeyPair.decrypt(textStr);
    if (decString.charAt(0) === '{' || decString.charAt(0) === '[') {
      // JSON.parse
      decString = JSON.parse(decString);
    }
    return decString;
  }
};

/**
 * 本地rsa已经生成的秘钥，可以统一带-----BEGIN PUBLIC KEY-----/-----END PUBLIC KEY-----的前后缀，也可以不带
 */
const genKey = rsaUtil.genKeyPair();

export const publicKey = genKey.publicKey;

export const privateKey = genKey.privateKey;
