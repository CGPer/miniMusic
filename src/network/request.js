import axios from 'axios'
export function request(config) {
  //检测当前环境是否为生产环境
  var isProEnv = Object.is(process.env.NODE_ENV, 'production')
  const instance = axios.create({
    //由于有跨域问题，所以调试和打包用不同的baseURL
    baseURL: isProEnv ? 'https://api.zsfmyz.top/music/' : '/apis/',
    timeout: 5000,
  })
  return instance(config)
}
