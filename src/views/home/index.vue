<template>
    <div class="menu">
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
                <article class="list" style="height: 190px; padding: 20px" v-for="item in 1" :key="item">
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
                    <article class="list" @click="gotoDetails(item)">
                        <el-image :src="item.cover"></el-image>
                        <div class="desc">
                            <h4 class="title" v-text="item.title"></h4>
                            <p class="info" v-text="item.desc"></p>
                            <div class="tagbox">
                                <span class="tag" v-for="tag_value in item.tag">
                                    {{ tag_value }}
                                </span>
                            </div>
                        </div>
                    </article>
                    <el-divider />
                </template>
            </template>
        </el-skeleton>

        <div class="pages" v-if="!state.loading && !state.empty">
            <el-pagination @current-change="hanldePage" background layout="prev, pager, next" :total="state.total" />
        </div>

        <div class="empty" v-if="state.empty">
            <el-empty :image-size="400"
            image="https://img.pinkyang.cn/2022.07.08-undraw_Add_notes_re_ln36.png" description="博主很懒，还没写任何博客内容哦" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getBlog, getTag } from '@/api'
import { useRouter } from 'vue-router'
import { blogList } from '@/typings'

interface menulist {
    id: number
    name: string
    checked?: boolean
}

const router = useRouter()
const state = reactive({
    list: <blogList[]>[],
    loading: <boolean>true,
    pageSize: <number>20,
    pageIndex: <number>1,
    total: <number>0,
    menu: <menulist[]>[],
    empty: <boolean>false
})

onMounted(() => {
    getList()
    getTagMenu()
})

const getList = async () => {
    const {
        code,
        data,
        message,
        total = 0,
    } = await getBlog({
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
    })

    if (message || data.length === 0) {
        console.error('请求异常')
        // 显示空数据
        state.loading = false
        state.empty = true
        return
    }

    if (code === 200) {
        state.total = total
        for (let item of data) {

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
    getList()
    document.documentElement.scrollTop = 0
}

const changeTag = (val: menulist) => {
    state.menu.map(e => {
        e.checked = false
        if (val.id === e.id) e.checked = true
    })
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
    .list {
        cursor: pointer;
        &:first-child {
            padding-top: 20px;
        }
        height: 150px;
        background-color: $white;
        padding: 0 20px;
        @include flex-auto(center, space-between);
        .el-image {
            width: 200px;
            height: 150px;
            border-radius: $br-s;
        }
        .desc {
            flex: 1;
            height: 100%;
            padding: 10px 0;
            @include flex-auto(false, space-between, column);
            margin-left: 40px;
            text-align: justify;
            .title {
                @include text-hidden(1);
                @include font-set($font20, #1a1a1a, 500, 1.5);
            }
            .info {
                @include text-hidden(2);
                @include font-set($font16, #555, false, 1.4);
            }
            .tagbox {
                .tag {
                    margin-right: 10px;
                    @include font-set($font14, #999, false, 1.4);
                }
            }
        }
    }
    .pages {
        @include flex-auto(center, center);
        // padding-bottom: 20px;
        position: absolute;
        bottom: 0;
        left: 50%;
    }

    .empty {
        padding-top: 100px;
    }
}
</style>
