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


export function getBlogDetails(params: { blogid: number, type: string  }) {
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

export const updateBlog = (data: blog) => {
	return request({
		url: `${baseURL}/blog/fix`,
		method: 'PUT',
		data
	})
}

export const usrLogin = (data: { password: string,  username: string }) => {
	return request({
		url: `${baseURL}/blog/login`,
		data,
		method: 'POST'
	})
}

export const addTag = (data: { name: string }) => {
	return request({
		url: `${baseURL}/blog/addtag`,
		data,
		method: 'POST'
	})
}

export const removeTag = (params: { id: number }) => {
	return request({
		url: `${baseURL}/blog/tagdel`,
		params,
		method: 'GET'
	})
}

export const searchBlog = (params: { words?: string, tag?: string }) => {
	return request({
		url: `${baseURL}/blog/search`,
		params,
		method: 'GET'
	})
}