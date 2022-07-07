let baseURL = ''
import { blog } from "@/typings"
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

export function grtTag() {
	return request({
		url: `${baseURL}/blog/tag`,
		method: 'GET',
	})
}


export function grtBlogDetails(params: { blogid: number }) {
	return request({
		url: `${baseURL}/blog/detail`,
		method: 'GET',
		params
	})
}
