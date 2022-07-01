<template>
    <div class="safe_area" :style="{ background: state.loading ? 'none' : '#fff' }">
        <el-skeleton :loading="state.loading" animated>
			<template #template>
				<article class="list" style="height: 190px; padding: 20px"  v-for="item in 1" :key="item">
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

const router = useRouter()
const state = reactive({
	list: <blogList[]>[],
    loading: <boolean>true,
    pageSize: <number>20,
    pageIndex: <number>1
})

onMounted(() => {
    getList()
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
		}, 1000);
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

</script>

<style scoped lang="scss">
.safe_area {
    margin: 20px auto;
    min-height: 90vh;
    .list {
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
                @include font-set($font18, #333, 500, 1.5);
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
