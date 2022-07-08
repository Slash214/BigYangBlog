let baseURL = ''
import { blog, comment } from "@/typings"
import request from "./http"
const env = import.meta.env.MODE
console.log(env)

const urls = new Map<string, any>([
	['dev', 'http://127.0.0.1:4500'],
	['test','http://127.0.0.1:4523/m1/532983-0-default'],
	['production', 'https://yjpsix.com/api'],
])

if (urls.get(env)) baseURL = urls.get(env)


export function getBlog(params: { pageSize: number, pageIndex: number }) {
    return request({
        url: `${baseURL}/blog/list`,
		method: 'GET',
		params
	})
}

export function addBlog(data: blog) {
    return request({
        url: `${baseURL}/blog/add`,
		method: 'POST',
		data
	})
}

export function getTag() {
	return request({
		url: `${baseURL}/blog/tag`,
		method: 'GET',
	})
}


export function getBlogDetails(params: { blogid: number }) {
	return request({
		url: `${baseURL}/blog/detail`,
		method: 'GET',
		params
	})
}

export const getComment = (params: { blogid: number }) => {
	return request({
		url: `${baseURL}/blog/comment`,
		method: 'GET',
		params
	})
}

export const addComment = (data: comment) => {
	return request({
		url: `${baseURL}/blog/addremake`,
		method: 'POST',
		data
	})
}

export const getAvatar = (params: { size?: number }) => {
	return request({
		url: `${baseURL}/random/avatar`,
		method: 'GET',
		params
	})
}

export const getNickname = () => {
	return request({
		url: `${baseURL}/random/nickname`,
		method: 'GET',
	})
}