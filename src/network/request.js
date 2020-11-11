import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    //由于有跨域问题，所以调试和打包用不同的baseURL
    baseURL: Object.is(process.env.NODE_ENV, 'production') ? 'https://api.zsfmyz.top/music/' : '/apis/',
    timeout: 5000,
  })
  return instance(config)
}
