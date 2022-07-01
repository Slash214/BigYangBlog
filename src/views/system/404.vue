<template>
    <div class="nopage">
		<p>哦豁没得东西了</p>
		<el-button type="primary" @click="back">返回首页</el-button>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const back = () => {
	router.push('/')
}

</script>

<style scoped lang="scss">
.nopage {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
	flex-direction: column;
    font-size: 48px;
    color: rgb(105, 208, 242);
	p {
	  padding-bottom: 40px;
	}
}
</style>
