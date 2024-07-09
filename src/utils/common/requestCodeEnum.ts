import { createDiscreteApi } from 'naive-ui';

const { message } = createDiscreteApi(['message']);

/**
 *
 * @param code 处理请求状态码
 */
export function handleResCode(code: number) {
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
