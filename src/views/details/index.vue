<template>
    <div class="safe_area">
        <div class="left">
            <div class="blog_title whites">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/article/${state.blogId}` }">博客详情</el-breadcrumb-item>
                </el-breadcrumb>
                <h1 class="title mb20 mt20">{{ state.article.title }}</h1>
                <div class="info">
                    <el-avatar :size="50" src="https://img.pinkyang.cn/2022.07.01-girl.jpeg" />
                    <div class="user">
                        <span>{{ state.article.author }}</span>
                        <time>{{ state.article.time }}</time>
                    </div>
                    <el-button type="primary" plain>+点赞</el-button>
                </div>
            </div>
            <div class="blog_content whites">
                <MdViewer :value="state.content" />
            </div>
            <div class="blog_comment whites">
                <div class="mb20 commentbtns">
                    <el-input
                        class="mb10"
                        maxlength="40"
                        v-model="state.remake"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                        placeholder="友善的评论会发光哦"
                    />
                    <div class="btn">
                        <el-button class="btns" type="success" @click="handleComment">评论</el-button>
                    </div>
                </div>
                <div class="list">
                    <Comment :remake="item" v-for="item in state.commentList" :key="item.id" />
                </div>
            </div>
        </div>
        <div class="menu">
            <el-affix :offset="20">
                <div class="tree">
                    <h3 class="directory">目录</h3>
                    <el-divider style="margin: 10px 0" />
                    <ul class="menu_content">
                        <!-- <template > -->
                        <a 
                            @click="locationTxt(v, key)"
                            v-for="(v, key) of state.hast"
                            :class="state.headNum === key ? `tree_list active  level${v.level}` : `tree_list level${v.level}`"
                        >
                            {{ v.text }}
                        </a>
                        <!-- </template> -->
                    </ul>
                </div>
            </el-affix>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getBlogDetails, getComment, addComment, getAvatar, getNickname } from '@/api'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { getProcessor } from 'bytemd'
import { nextTick } from 'vue'
import { findIndex } from 'lodash'
import loadsh from 'lodash'

const route = useRoute()
const state = reactive({
    remake: <string>'',
    content: <any>``,
    blogId: <number>0,
    commentList: <any[]>[],
    article: <{ title: string; time: string; author: string }>{},


    minLevel: <number>1,
    headNum: <number>0,
    hast: <any>[],
    itemOffsetTop: <any>[],
})

onMounted(async () => {
    let item = localStorage.getItem('lovehehe_article')
    if (item) {
        state.article = JSON.parse(item)
        // console.error(state.article)
    }

    let id = route.params.id
    state.blogId = +route.params.id
    console.log(route.params)
    const { data, code } = await getBlogDetails({ blogid: +id })
    console.log(data, code)
    if (code === 200) {
        state.content = data.content
    }
    _gainComment()
    _initTree()

    window.addEventListener('scroll', onScroll,true) 
})

const _gainComment = async () => {
    const { data, code, message } = await getComment({ blogid: state.blogId })

    if (code === 200) {
        state.commentList = data
    }

    if (message) {
        ElMessage.error(message)
    }
}

const handleComment = async () => {
    if (!state.remake) {
        ElMessage.warning('请输入评论内容！')
        return
    }

    let avatar = '',
        nickname = ''
    const result = await getAvatar({ size: 70 })
    const r2 = await getNickname()

    console.log('r2昵称', r2)
    console.log('result', result)
    avatar = result?.data.name || ''
    nickname = r2?.data?.name || ''
    // return
    const { data, message, code } = await addComment({
        nickname,
        content: state.remake,
        blogid: state.blogId,
        avatar,
    })

    if (code === 200) {
        ElMessage.success('评论成功...')
        state.remake = ''
        setTimeout(() => {
            _gainComment()
        }, 500)
    }
}

const _initTree = () => {
    const stringifyHeading = function (e: { children: []; position: {} }) {
        let result: any = ''
        // console.log('loadimg', e)
        e.children.forEach((item: any) => {
            if (item.type === 'text') {
                result += item.value
            }
        })
        return result
    }
    getProcessor({
        plugins: [
            {
                rehype: p =>
                    p.use(() => (tree: any) => {
                        console.log(tree)
                        if (tree && tree.children.length) {
                            const items: any[] = []
                            tree.children
                                .filter((v: any) => v.type === 'element')
                                .forEach((node: any) => {
                                    if (node.tagName[0] === 'h' && !!node.children.length) {
                                        const i = +node.tagName[1]
                                        state.minLevel = Math.min(state.minLevel, i)
                                        items.push({
                                            level: i,
                                            text: stringifyHeading(node)
                                        })
                                    }
                                })
                            state.hast = items.filter((v: any) => v.level === 1 || v.level === 2 || v.level === 3)
                            nextTick(() => {
                                transformToId()
                                calculateOffTop()
                            })
                        }
                    }),
            },
        ],
    }).processSync(state.content)

    // console.error(state.hast)
    // console.error(state.content)
}

// 计算dom高度
const calculateOffTop = () => {
    // let sb = loadsh.throttle(() => {
        // onScroll()
    // }, 300)
    // let nod: any = document.querySelector('.safe_area') || ''
    // console.error('nod', nod)
    // nod.addEventListener('scroll', sb())
    state.hast.forEach((val: any, i: number) => {
        const firstHead: any = document.querySelector(`#head-${i}`)
        state.itemOffsetTop.push({
            key: i,
            top: firstHead?.offsetTop || 0,
        })
    })
    // console.log('asdasd', state.itemOffsetTop)
}

// 定位
const transformToId = () => {
    const dom: any = document.querySelector('.markdown-body')
    // console.log(dom)
    let children: any = Array.from(dom.children)
    if (children.length > 0) {
        // current element has children, look deeper
        for (let i = 0; i < children.length; i += 1) {
            const tagName = children[i].tagName
            if (tagName === 'H1' || tagName === 'H2' || tagName === 'H3') {
                const index = findIndex(state.hast, (v:any) => v.text === children[i].textContent)
                if (index >= 0) {
                    children[i].setAttribute('id', `head-${index}`)
                }
            }
        }
    }
    // console.log(children)
}


const onScroll = () => {
    // console.log('触发滚动')
    state.itemOffsetTop = []
    state.hast.forEach((val: any, i: number) => {
        const firstHead: any = document.querySelector(`#head-${i}`) 
        // console.warn('获取的firstHead', firstHead?.offsetTop)
        state.itemOffsetTop.push({
            key: i,
            top: firstHead?.offsetTop,
        })
    })

    // const scrollTop: any = document.querySelector('.safe_area')?.scrollTop
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // console.warn('获取的scrollTop', scrollTop)
    let num = 0
    for (let n = 0; n < state.itemOffsetTop.length; n++ ) {
        // console.error('n', n)
        if (scrollTop >= state.itemOffsetTop[n].top) {
            num = state.itemOffsetTop[n].key
        }
    }
    state.headNum = num

    // console.error('headNum', state.headNum)
}

const locationTxt = (item: any, index: number) => {
    state.headNum = index
    nextTick(() => {
        document.querySelector(`#head-${index}`)?.scrollIntoView({
            behavior: 'smooth',
        })
    })
}
</script>

<style scoped lang="scss">
.safe_area {
    min-height: 90vh;
    display: flex;
    justify-content: space-between;
    .left {
        width: 75%;
        .whites {
            background-color: $white;
            padding: 20px;
        }
        .blog_title {
            margin-top: 20px;
            .title {
                @include font-set($font32, #222, 600, 1.3);
            }
            .info {
                @include flex-auto(center, space-between);
            }
            .user {
                width: 87%;
                height: 40px;
                @include flex-auto(false, space-between, column);
                span {
                    @include font-set($font16, #515151, false, 1.4);
                }
                time {
                    @include font-set($font14, #8a8a8a, false, 1.4);
                }
            }
        }
        .blog_comment {
            margin: 20px 0;
            .btn {
                width: 100%;
                display: flex;
                flex-direction: row-reverse;
            }
        }
        .blog_content {
            .viewer {
                min-height: 50vh;
                width: 100%;
            }
        }
    }
    .menu {
        width: 23%;
        margin-top: 20px;
        .tree {
            width: 100%;
            min-height: 400px;
            background-color: $white;
            padding: 20px;
            max-height: 70vh;
            min-height: 10vh;
            overflow-y: scroll;
            .directory {
                @include font-set($font18, #1a1a1a, 400, 1.5);
            }
            .menu_content {
                width: 100%;
                .tree_list {
                    display: block;
                    @include font-set($font14, #888, 400, 1.3);
                    padding: 10px 0;
                    &:hover {
                        background-color: #f7f8fa;
                        border-radius: 6px;
                    }
                }
                .active {
                    position: relative;
                    color: #1e80ff;
                    &::before {
                        content: '';
                        height: 20px;
                        width: 5px;
                        background: #1e80ff;
                        position: absolute;
                        left: -17px;
                        top: 50%;
                        border-radius: 0 5px 5px 0;
                        transform: translate(-50%, -50%);
                    }
                }
                .level1 {
                }
                .level2 {
                    padding-left: 10px;
                }
                .level3 {
                    padding-left: 30px;
                }
            }
        }
    }
}

::-webkit-scrollbar {
    width: 6px;
    background-color: #fff;
}
/*定义滚动条轨道：内阴影+圆角*/
::-webkit-scrollbar-track {
    background-color: #fff;
}
/*定义滑块：内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #e4e6eb;
}
</style>
