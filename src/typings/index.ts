export interface blogList {
	id: number,
	picture: string,
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