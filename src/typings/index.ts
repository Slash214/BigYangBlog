export interface blogList {
	id: number,
	cover: string,
	title: string,
	tag: any,
	desc: string
}

export interface comment {
	id: number,
	content: string,
	avatar: string,
	time: string,
	nickname: string,
}

export interface blog {
	title: string,
	content: string,
	cover: string,
	desc: string
	tag: string
}