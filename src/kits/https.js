import axios from 'axios'
import axiosAdapterUniapp from 'axios-adapter-uniapp'
 
const $https = axios.create({
  baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
  adapter: axiosAdapterUniapp,
})
let count = 0;
// request拦截器
$https.interceptors.request.use(function (config) {
  count++
  uni.showLoading({
    title: '加载中'
  });
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})
 
// respone拦截器
$https.interceptors.response.use(function (response) {
  count--
  if(count === 0){
    uni.hideLoading();
  }
  // 对响应数据做点什么
  return response.data.message;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})
 
export default $https