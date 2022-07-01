<template>
	<div class="safe_area">
	   <p>项目采用的是vite+vue3+TypeScipt+Element-plus框架</p>
	   <p>后端是NodeJS使用的Koa2框架+Sequelize模型+Mysql数据库</p>
	   <p>项目包括前端页面，后端接口，还有控制面板去增删查改页面数据</p>
	   <p>项目实现的功能包括，博客的增删查改，搜索，评论，图片上传，视频转码</p>
	   <p>登陆功能，登陆验证，token生成，小伙伴们可以拉取下来代码替换数据库</p>
	   <p>替换地址就可以快速生成一个博客了</p>
	</div>
</template>
	
<script setup lang='ts'>
	
</script>
	
<style scoped lang="scss">
.safe_area {
   min-height: 90vh;
   margin: 20px auto;
   background-color: $white;
   border-radius: $br-m;
   text-align: center;
   padding: 100px;
   p {
	@include font-set($font24, #333, 550, 1.5);
	padding-bottom: 10px;
   }
}
</style>