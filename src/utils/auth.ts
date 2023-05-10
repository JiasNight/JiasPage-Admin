// 引入cookie
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const tokenKey = 'jias-token';

const sessionId = 'xxl_sso_sessionid';

export function getToken() {
  return cookies.get(tokenKey);
}

export function setToken(tokenVal: string, expireTimes?: string) {
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
