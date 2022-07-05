<template>
    <div class="menu">
        <el-tag size="large" :class="item.checked ? 'active' : ''"  @click="changeTag(item)"
        v-for="item of state.menu" :key="item.id">{{ item.name }} </el-tag>
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
                        <el-image :src="item.picture"></el-image>
                        <div class="desc">
                            <h4 class="title" v-text="item.title"></h4>
                            <p class="info" v-text="item.desc"></p>
                            <span class="tag">12312</span>
                        </div>
                    </article>
                    <el-divider />
                </template>
            </template>
        </el-skeleton>

        <div class="pages" v-if="!state.loading">
            <el-pagination @current-change="hanldePage" background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getBlog } from '@/api'
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
    menu: <menulist[]>[
        { id: 1, name: 'JavaScript' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'HTML' },
        { id: 4, name: 'Node' },
        { id: 5, name: 'Git' },
        { id: 6, name: 'Vue' },
        { id: 7, name: 'Angular' },
        { id: 8, name: 'Uni-App' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
        { id: 9, name: '微信小程序' },
    ],
})

onMounted(() => {
    getList()
    state.menu.unshift({ id: 0, name: '全部' })
    for (let item of state.menu) {
        if (item.id === 0) item['checked'] = true
        else item['checked'] = false
    }
})

const getList = async () => {
    const { code, data, message } = await getBlog({
        pageIndex: state.pageSize,
        pageSize: state.pageIndex,
    })

    if (message) {
        console.error('请求异常')
        // 显示空数据
        return
    }

    if (code === 200) {
        state.list = data
        setTimeout(() => {
            state.loading = false
        }, 1000)
        // console.error(state.list)
    }
}

const gotoDetails = (val: blogList) => {
    console.log('跳转')
    console.log(val.id)
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
            .tag {
                @include font-set($font14, #999, false, 1.4);
            }
        }
    }
    .pages {
        @include flex-auto(center, center);
        padding-bottom: 20px;
    }
}
</style>
