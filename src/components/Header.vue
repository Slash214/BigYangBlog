<template>
	<header class="headers">
		<div class="safe_area">
			<div class="logo">
				<router-link tag="h4" to="/">大羊博客</router-link>
				<a target="_blank" href="https://github.com/Slash214/vite-vue3-lovehaha-webSite">GitHub</a>
				<router-link tag="a" to="/about">关于项目</router-link>
			</div>
			<div class="link">
				阿萨大
			</div>
		</div>
	</header>
</template>
	
<script setup lang='ts'>
	
</script>
	
<style scoped lang="scss">
.headers {
	height: $h60;
	line-height: $h60;
	background-color: #fff;
	.safe_area {
		@include flex-auto(center, space-between);
		.logo {
			width: 50%;
			@include flex-auto();
			h4 {
			  @include font-set($font18, $black, 600, 1.5);
			  line-height: $h60;
			  width: 120px;
			//   text-align: center;
			}
			a {
			  padding-left: 15px;
			  color: #888;
			  &:hover {
				color: #753bfe;
			  }
			}
		}
	}
}
</style>