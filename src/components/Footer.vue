<template>
    <footer class="footers">
        <div class="safe_area">
            <a href="#">爱呵呵个人博客@记录 开发笔记 前端开发笔记！方法合集，bug处理</a>
            <p class="link">友情链接：<a href="https://lovehaha.cn" target="_blank">软件分享网站-小白之家</a></p>
            <p class="copy">
                Copyright © 2023 小杨学开发 -
                <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">蜀ICP备19024285号-4</a>
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footers {
    width: 100%;
    padding: 50px 0;
    background-color: $black;
    .safe_area {
        a {
            @include font-set($font14, #f2f2f2, 400, 1.5);
        }
        p {
            color: $white;
            padding-top: 10px;
            font-weight: 400;
        }
        .link {
            a {
                color: #98b6f7;
            }
        }
        .copy {
            font-size: 12px;
            color: #fffade;
            a {
                font-size: 12px;
                color: #fffade;
            }
        }
    }
}
</style>
