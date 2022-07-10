<template>
    <div class="safe_area">
        <h1 class="title">博客标签增加与删除</h1>

        <div class="content">
            <el-tag
                v-for="tag in state.dynamicTags"
                :key="tag.id"
                class="mx-1"
                size="large"
                closable
                :disable-transitions="false"
                @close="handleClose(tag.id)"
            >
                {{ tag.name }}
            </el-tag>
            <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="state.tagName"
                class="ml-1 w-20"
                size="large"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" size="large" @click="showInput"> 增加新标签 </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { addTag, getTag, removeTag } from '@/api'
import { onMounted, reactive } from '@vue/runtime-dom'
import { ElMessage, ElInput, ElMessageBox } from 'element-plus'
import { nextTick, ref } from 'vue'

onMounted(() => {
    _getTag()
})

const state = reactive({
    list: <any[]>[],
    tagName: <string>'',
    dynamicTags: <{ id: number; name: string }[]>[],
})

// const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const _getTag = async () => {
    const { data, code, message } = await getTag()

    if (code !== 200 && data?.length) {
        console.error('请求失败')
        ElMessage.error('网络连接失败, 没有请求成功')
        return
    }

    console.log(data, message, code)
    state.dynamicTags = data
}

const handleClose = (id: number) => {
    console.log('删除标签')

    ElMessageBox.confirm('你正在删除博客文章标签是否继续?', '帅气的警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
		.then(() => {
			_deleteTag(id)
            // ElMessage({
            //     type: 'success',
            //     message: 'Delete completed',
            // })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
    // state.dynamicTags.splice(dynamicTags.value.indexOf(tagName), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = async () => {
    if (state.tagName) {
        // 去增加
        await addTag({ name: state.tagName })
        // console.log('增加数据', data, code, message )
        _getTag()
    }
    inputVisible.value = false
    state.tagName = ''
}

const _deleteTag = async (id: number) => {
	await removeTag({ id })
   _getTag()
}

</script>

<style scoped lang="scss">
.safe_area {
    min-height: 90vh;
    margin: 20px auto;
    background-color: $white;
    padding: 20px;
    .title {
		@include font-set($font20, #6fccee, 500, 1.5);
	}
    .content {
        margin: 20px auto;
        width: 100%;
        .el-tag {
            margin-right: 20px;
        }
        .el-input {
            width: 180px;
        }
    }
}
</style>
