export interface blogList {
	id: number,
	cover: string,
	title: string,
	tag: any,
	desc: string,
	ago?: string,
	shortTime?: string,
	author: string
}

export interface comment {
	id?: number,
	content: string,
	avatar?: string,
	ago?: string,
	nickname?: string,
	blogid?: number,
}

export interface blog {
	title: string,
	content: string,
	cover: string,
	desc: string
	tag: string
}