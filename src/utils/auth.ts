// 引入cookie
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const tokenKey = "page-token";

// cookie存储时间
const expireTimes = "1d";

const sessionId = "sso-sessionid";

export function getToken() {
  return cookies.get(tokenKey);
}

export function setToken(tokenVal: string) {
  return cookies.set(tokenKey, tokenVal, expireTimes);
}

export function removeToken() {
  return cookies.remove(tokenKey);
}

export function getSessionId() {
  return cookies.get(sessionId);
}

export function setSessionId(session: string) {
  return cookies.set(sessionId, session);
}

export function removeLocalStorage() {
  const localList: Storage = localStorage;
  for (const key in localList) {
    localStorage.removeItem(key);
  }
}
