/**
 * 获取环境变量
 * @param type 环境变量前缀
 */
function getEnvApi(type?: string) {
  const nodeEnvs = process.env;

  let resultApi = '';
  for (const key in nodeEnvs) {
    if (key.includes('VITE_APP_') && key.includes('API')) {
      const item: string = nodeEnvs[key] as string;
      const regex = new RegExp('[^/]+(?!.*/)');
      const proxyPrefix: string = regex.exec(item)!.length > 0 ? regex.exec(item)![0] : '';
      const proxyApi = '/' + proxyPrefix + 'Api';
      if (type === proxyPrefix) {
        resultApi = proxyApi;
        return resultApi;
      }
    }
  }
}

export default getEnvApi;
