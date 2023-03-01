<template>
    <div class="menu">
        <el-input v-model="words" @keyup.enter.native="searchInfo" placeholder="搜索文章" :suffix-icon="Search" />
        <el-tag
            size="large"
            :class="item.checked ? 'active' : ''"
            @click="changeTag(item)"
            v-for="item of state.menu"
            :key="item.id"
            >{{ item.name }}
        </el-tag>
        <span class="null_tag" v-if="state.menu.length < 2">暂无标签</span>
    </div>
    <div class="safe_area" :style="{ background: state.loading ? 'none' : '#fff' }">
        <el-skeleton :loading="state.loading" animated>
            <template #template>
                <article class="item" style="height: 270px; padding: 30px" v-for="item in 1" :key="item">
                    <el-skeleton-item class="el-image" variant="image" />
                    <div class="desc">
                        <el-skeleton-item variant="text" class="title" />
                        <el-skeleton-item variant="text" class="info" />
                        <el-skeleton-item variant="text" class="tag" />
                    </div>
                </article>
            </template>
            <template #default>
                <template v-for="item of state.list" :key="item.id">
                    <article class="item animat" @click="gotoDetails(item)">
                        <div class="cover">
                            <el-image :src="item.cover"></el-image>
                        </div>
                        <div class="desc">
                            <h4 class="title" v-text="item.title"></h4>
                            <p class="info" v-text="item.desc"></p>
                            <div class="tagbox">
                                <div class="tagleft">
                                    <!-- <span class="tag" v-for="tag_value in item.tag">
                                        {{ tag_value }}
                                    </span> -->
                                    <el-tag
                                        v-for="(tag_value, idx) in item.tag"
                                        :key="tag_value"
                                        :type="tagStyle(idx)"
                                        effect="dark"
                                    >
                                        {{ tag_value }}
                                    </el-tag>
                                </div>
                                <span class="times">{{ item.ago }}</span>
                            </div>
                        </div>
                    </article>
                    <el-divider />
                </template>
            </template>
        </el-skeleton>

        <div class="pages" v-if="!state.loading && !state.empty && state.total > 10">
            <el-pagination @current-change="hanldePage" background layout="prev, pager, next" :total="state.total" />
        </div>

        <div class="empty" v-if="state.empty">
            <el-empty
                :image-size="400"
                image="https://img.pinkyang.cn/2022.07.08-undraw_Add_notes_re_ln36.png"
                description="博主很懒，还没写相关的博客内容哦"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { getBlog, getTag, searchBlog } from '@/api'
import { useRouter } from 'vue-router'
import { blogList } from '@/typings'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

interface menulist {
    id: number
    name: string
    checked?: boolean
}

interface req {
    pageIndex: number
    pageSize: number
    tag?: string
}

let words = ref('')
const router = useRouter()
const state = reactive({
    list: <blogList[]>[],
    loading: <boolean>true,
    pageSize: <number>20,
    pageIndex: <number>1,
    total: <number>0,
    menu: <menulist[]>[],
    empty: <boolean>false,
})

onMounted(() => {
    getList()
    getTagMenu()
})

const searchInfo = async () => {
    if (!words.value) {
        ElMessage.warning('搜索内容不能为空')
        return
    }

    const { data, code, total = 0 } = await searchBlog({ words: words.value })

    if (!data.length && !total) {
        state.empty = true
        state.list = []
        return
    }

    if (code === 200) {
        state.empty = false
        state.total = total
        for (let item of data) {
            console.log(item.tag)
            item.tag = JSON.parse(item.tag)
        }
        state.list = data
        setTimeout(() => {
            state.loading = false
        }, 1000)
        console.warn(state.list)
    }
    console.log(data)
}

const getList = async (tag?: string) => {
    let reqBody: req = {
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
    }
    if (tag && tag !== '全部') reqBody['tag'] = tag
    const { code, data, message, total = 0 } = await getBlog(reqBody)

    if (message || data.length === 0) {
        console.error('请求异常')
        // 显示空数据
        state.loading = false
        state.empty = true
        return
    }

    if (code === 200) {
        state.empty = false
        state.total = total
        for (let item of data) {
            console.log(item.tag)
            item.tag = JSON.parse(item.tag)
        }
        state.list = data
        setTimeout(() => {
            state.loading = false
        }, 1000)
        console.warn(state.list)
    }
}

const getTagMenu = async () => {
    const { data, code, message } = await getTag()
    if (code === 200) {
        let arr = []
        for (const val of data) {
            let { id, name } = val
            arr.push({ id, name, checked: false })
        }
        arr.unshift({ id: 0, name: '全部', checked: true })
        state.menu = arr
    }
}

const gotoDetails = (val: blogList) => {
    // console.log('跳转', val)
    // console.log(val.id)
    let item = {
        time: val.shortTime,
        author: val.author,
        title: val.title,
    }
    localStorage.setItem('lovehehe_article', JSON.stringify(item))
    // return
    router.push(`/article/${val.id}`)
}

const hanldePage = (pageIndex: number) => {
    console.log(pageIndex)
    state.pageIndex = pageIndex

    if (words.value) {
        searchInfo()
        return
    }
    getList()
    document.documentElement.scrollTop = 0
}

const changeTag = (val: menulist) => {
    state.menu.map((e) => {
        e.checked = false
        if (val.id === e.id) e.checked = true
    })

    console.error('2', val)
    words.value = ''
    state.list = []
    getList(val.name)
}

const tagStyle = (key: number) => {
    if (key === 0) return 'success'
    if (key === 1) return 'info'
    if (key === 2) return 'danger'
    if (key === 3) return 'warning'
    if (key >= 4) return ''
}
</script>

<style scoped lang="scss">
.menu {
    margin: 20px auto 0 auto;
    width: 1240px;
    max-width: 1240px;
    min-width: 1240px;
    padding: 20px;
    background-color: $white;
    cursor: pointer;
    .el-input {
        width: 250px;
        margin-right: 20px;
    }
    .null_tag {
        @include font-set($font14, #777, 400, 1.5);
        padding: 0 0 0 10px;
    }
    .el-tag {
        margin: 0 10px 10px 0;
        &:hover {
            background-color: #409eff;
            color: #fff;
        }
    }
    .active {
        background-color: #409eff;
        color: #fff;
    }
}
.safe_area {
    margin: 20px auto;
    min-height: 90vh;
    .item {
        position: relative;
        cursor: pointer;
        &:first-child {
            padding-top: 20px;
        }
        background-color: $white;
        padding: 0 30px;
        @include flex-auto(center, space-between);
        position: relative;

        .cover {
            width: 270px;
            height: 180px;
            overflow: hidden;
            .el-image {
                transition: all ease 0.3s;
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: $br-s;
                &:hover {
                    transform: scale(1.2);
                }
            }
        }
        .desc {
            flex: 1;
            height: 180px;
            padding: 10px 0;
            line-height: 2;
            letter-spacing: 2px;
            @include flex-auto(false, space-between, column);
            margin-left: 30px;
            text-align: justify;
            .title {
                @include text-hidden(1);
                @include font-set($font20, #1a1a1a, 500, 1.5);
            }
            .info {
                @include text-hidden(3);
                @include font-set($font16, #888, false, 1.5);
            }
            .tagbox {
                @include flex-auto(center, space-between);
                width: 100%;
                .tagleft {
                    width: 80%;
                    .el-tag {
                        margin-right: 10px;
                    }
                }
                .times {
                    flex: 1;
                    text-align: right;
                }
            }
        }
    }
    .animat {
        &::after {
            position: absolute;
            content: ' ';
            bottom: -24px;
            left: 0;
            height: 5px;
            width: 0;
            background-image: linear-gradient(
                -225deg,
                rgb(93, 159, 255) 0%,
                rgb(184, 220, 255) 48%,
                rgb(107, 187, 255) 100%
            );
            transition: all ease-in-out 0.5s;
        }
        &:hover {
            &::after {
                width: 100%;
            }
        }
    }
    .pages {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .empty {
        padding-top: 100px;
    }
}
</style>
