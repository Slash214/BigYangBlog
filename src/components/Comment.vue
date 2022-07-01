<template>
	<div class="comment">
		<el-avatar src="https://img.pinkyang.cn/2022.07.01-girl.jpeg" :size="50"></el-avatar>
		<div class="content">
			<span class="">{{remake.nickname}}</span>
			<span class="ml10">{{remake.time}}</span>
			<p>{{remake.content}}</p>
		</div>
	</div>
</template>
	
<script setup lang='ts'>
import { comment } from '@/typings';


const props = defineProps({
	remake: {
		type: Object,
	    default: () => <comment>{}
   }
})
</script>
	
<style scoped lang="scss">
	.comment {
		width: 100%;
		margin-bottom: 20px;
		@include flex-auto(center);
		.el-avatar {
			margin-right: 15px;
		}
		.content {
			padding-top: 15px;
			flex: 1;
			span {
				display: inline-block;
				padding-bottom: 10px;
				line-height: 1.5;
			}
			p {
			  @include font-set($font14, #999, false, 1.4);
			}
		}
	}
</style>