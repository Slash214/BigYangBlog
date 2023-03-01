<template>
    <div class="safe_area">
        <div class="left" >
            <div class="blog_title whites">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/article/${state.blogId}` }">博客详情</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">返回上一页</el-breadcrumb-item>
                </el-breadcrumb>
                <h1 class="title mb20 mt20">{{ state.article.title }}</h1>
                <div class="info">
                    <el-avatar :size="50" src="https://img.pinkyang.cn/2022.07.09-4403.jpg" />
                    <div class="user">
                        <span>{{ state.article.author }}</span>
                        <time>{{ state.article.createdAt }}</time>
                    </div>
                </div>
                <div class="update-text" v-if="state.flag" @click="updateDetails">修改</div>
            </div>
            
            <div class="blog_content whites">
                <div v-if="!state.content" class="loading"> 
                    <Loading />
                    <p class="loading-text">加载中...</p>
                </div>
                <MdViewer v-else :value="state.content" />
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
                        <li v-for="(item, key) of cata.menuData" :key="key"
                           :style="menuStyle(item.type)"
                           >
                            <a
                                :href="'#' + item.point"
                                :class="cata.menuState === item.txt ? `tree_list active` : `tree_list`"
                            >
                                {{ item.txt }}
                            </a>
                        </li>
                    </ul>
                </div>
            </el-affix>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getBlogDetails, getComment, addComment } from '@/api'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
// import { Viewer } from '@bytemd/vue-next'
// 没有样式


interface Menu {
    type: string;
    txt: string;
    offsetTop: number;
    point: string
}


const route = useRoute()
const router = useRouter()

const state = reactive({
    remake: <string>'',
    content: <any>``,
    blogId: <number>0,
    commentList: <any[]>[],
    article: <{ title: string; createdAt: string; author: string }>{},
    flag: <boolean>false,
})

const cata = reactive({
    menuData: <Menu[]>[],
    menuState: '',
})

onMounted(async () => {
    let userInfo = localStorage.getItem('BigYangBlog_userinfo')

    if (userInfo) {
        console.log('userInfo')
        let user = JSON.parse(userInfo)
        state.flag = user?.id ? true : false
    }
    let id = route.params.id
    state.blogId = +route.params.id
    const {
        data: { info, detail },
        code,
    } = await getBlogDetails({ blogid: +id, type: 'update' })
    if (code === 200) {
        // console.log('data', detail, info)
        state.content = detail.content
        state.article = info
    }
    _gainComment()
    componentDidMount()
    window.addEventListener('scroll', onScroll, true)

})

/**
 * h1 h2 h3 h4 标签样式
 * @param type 
 */
const menuStyle = (type: string) => {
    let style = {}
    if (type === 'H2') style = { 'padding-left': 10 + 'px' }
    if (type === 'H3') style = { 'padding-left': 20 + 'px' }
    if (type === 'H4') style = { 'padding-left': 30 + 'px' }

    return style
}

// 重新实现目录的定位
const componentDidMount = () => {
    nextTick(() => {
        getElement(['H1', 'H2', 'H3', 'H4'])
    })
}



/**
 * 获取标题锚点
 * 参数nodeArr 表示需要解析目录内容的标题
 */
const getElement = (nodeArr: string[]) => {
    let nodeInfo: Menu[] = []
    const dom: any = document.querySelector('.markdown-body')
    // console.log(dom.childNodes)
    dom.childNodes.forEach((item: any, key: number) => {
        // console.log(item.nodeName)
        if (nodeArr.includes(item.nodeName)) {
            nodeInfo.push({
                type: item.nodeName,
                txt: item.innerText,
                offsetTop: item.offsetTop,
                point: `target_${key}`,
            })
            item.setAttribute('id', `target_${key}`)
            console.log(item)
        }
    })

    cata.menuData = nodeInfo
    cata.menuState = nodeInfo[0].txt
    console.log('nodeInfo', nodeInfo)

}

/**
 * 监听页面开始滚动
 */
const onScroll = (e: any) => {
    // 当前页面滚动的距离
    let scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop
    // console.log(scrollTop)
    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    //变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

    let currentmenu = cata.menuData[0].txt // 设置menuState对象默认值第一个标题
    for (let item of cata.menuData) {
        console.log(item.offsetTop)
        if (scrollTop >= item.offsetTop) {
            currentmenu = item.txt
        } else break
    }

    if (currentmenu !== cata.menuState) {
        cata.menuState = currentmenu
    }

    // 如果到底部，就命中最后一个标题
    if (scrollTop + windowHeight === scrollHeight) {
        console.log('滚动到底部了')
        cata.menuState = cata.menuData[cata.menuData.length - 1].txt
    }
}

/**
 * 修改详情
 */
const updateDetails = () => {
    console.log(state.article)
    console.log('内容', state.content)
    router.push(`/admin/${state.blogId}`)
}

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

    let avatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        nickname = '默认昵称'
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
            position: relative;
            cursor: pointer;
            .title {
                @include font-set($font32, #222, 600, 1.3);
            }
            .info {
                @include flex-auto(center);
            }
            .user {
                width: 87%;
                height: 40px;
                margin-left: 20px;
                @include flex-auto(false, space-between, column);
                span {
                    @include font-set($font16, #515151, false, 1.4);
                }
                time {
                    padding-top: 6px;
                    @include font-set($font14, #8a8a8a, false, 1.4);
                }
            }
            .update-text {
                position: absolute;
                right: 20px;
                top: 30px;
                cursor: pointer;
                color: #1e80ff;
                font-weight: 600;
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
            min-height: 70vh;
            .loading {
                margin-top: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
                .loading-text {
                    padding-top: 40px;
                    letter-spacing: 2px;
                    line-height: 2;
                    font-weight: 600;
                    font-size: 18px;
                    color: #1e80ff;
                }
            }
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
