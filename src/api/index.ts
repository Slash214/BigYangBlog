import { blog, comment } from "@/typings"
import request from "./http"

console.error(import.meta.env.VITE_BASE_URL)
console.error(import.meta.env.VITE_BASE_URL)
// if (urls.get(env)) baseURL = urls.get(env)

export function getBlog(params: { pageSize: number, pageIndex: number }) {
    return request({
        url: `/blog/list`,
		method: 'GET',
		params
	})
}

export function addBlog(data: blog) {
    return request({
        url: `/blog/add`,
		method: 'POST',
		data
	})
}

export function getTag() {
	return request({
		url: `/blog/tag`,
		method: 'GET',
	})
}


export function getBlogDetails(params: { blogid: number, type: string  }) {
	return request({
		url: `/blog/detail`,
		method: 'GET',
		params
	})
}

export const getComment = (params: { blogid: number }) => {
	return request({
		url: `/blog/comment`,
		method: 'GET',
		params
	})
}

export const addComment = (data: comment) => {
	return request({
		url: `/blog/addremake`,
		method: 'POST',
		data
	})
}

export const updateBlog = (data: blog) => {
	return request({
		url: `/blog/fix`,
		method: 'PUT',
		data
	})
}

export const usrLogin = (data: { password: string,  username: string }) => {
	return request({
		url: `/blog/login`,
		data,
		method: 'POST'
	})
}

export const addTag = (data: { name: string }) => {
	return request({
		url: `/blog/addtag`,
		data,
		method: 'POST'
	})
}

export const removeTag = (params: { id: number }) => {
	return request({
		url: `/blog/tagdel`,
		params,
		method: 'GET'
	})
}

export const searchBlog = (params: { words?: string, tag?: string }) => {
	return request({
		url: `/blog/search`,
		params,
		method: 'GET'
	})
}