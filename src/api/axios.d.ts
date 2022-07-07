import axios from 'axios';

declare module 'axios' {
	interface IAxios<D = null> {
		message: string,
		code: number,
		total?: number,
		extra: D
	}
	export interface AxiosResponse<T = any> extends IAxios<D> { }
}
