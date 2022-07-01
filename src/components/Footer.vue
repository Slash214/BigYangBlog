<template>
	<footer class="footers">
		<div class="safe_area">
			<a href="#">大羊博客@记录 开发笔记</a>
		</div>
	</footer>
</template>
	
<script setup lang='ts'>
	
</script>
	
<style scoped lang="scss">
	.footers {
		width: 100%;
		padding: 40px;
		background-color: $black;
		.safe_area {
			a {
			  @include font-set($font14, $white, 550, 1.5);
			}
		}
	}
</style>