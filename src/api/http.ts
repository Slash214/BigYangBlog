import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ElMessage } from 'element-plus'
let baseURL = ''
const env = import.meta.env.MODE

console.log(env)

const urls = new Map<string, any>([
    ['dev', 'http://127.0.0.1:4500'],
    ['test', 'http://127.0.0.1:4523/m1/532983-0-default'],
    ['production', 'https://yjpsix.com/blog/api'],
])
// vite3 可以直接获取 就不用这样了 import.meta.env.VITE_BASE_URL

// console.error('import.meta.env.VITE_BASE_URL', import.meta.env.VITE_BASE_URL)

if (urls.get(env)) baseURL = urls.get(env)
// 创建实例
const service: AxiosInstance = axios.create({
    baseURL,
    timeout: 1000 * 60 * 30,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // console.log(response)
        if (response.status === 200) {
            // 请求成功
            if (response?.data) return response.data
            else return response
        }
        console.info(JSON.stringify(response.status))
        return response
    },
    (error: AxiosError) => {
        const { response } = error
        if (response) {
            ElMessage.error('异常错误');
            return Promise.reject(response.data);
        }
        ElMessage.error('网络连接异常,请稍后再试!');
        return Promise.reject(error);
    }
)

export default service