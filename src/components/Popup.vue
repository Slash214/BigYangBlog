<template>
    <div class="popup" v-if="show">
        <h1 class="title">发布文章</h1>
        <div class="content">
            <div class="item">
                <p>添加标签：</p>
                <el-select v-model="state.currentValue" multiple filterable placeholder="请选择标签">
                    <el-option
                        v-for="item in state.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>
            <div class="item">
                <p>文章封面：</p>
                <el-upload
                    class="avatar-uploader"
                    action="https://lovehaha.cn/api/qiniu"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-progress="OnProgress"
                >
                    <img v-if="state.imageUrl" :src="state.imageUrl" class="avatar" />
                    <div class="box" v-else-if="state.percentage">
                        <el-progress class="progress" :percentage="state.percentage" />
                    </div>
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    <div @click.stop="DeleteImage" v-if="state.imageUrl" class="delete">
                        <el-icon><Delete /></el-icon>
                    </div>
                </el-upload>
            </div>
            <div class="item">
                <p>编辑摘要：</p>
                <el-input
                    v-model="state.desc"
                    maxlength="100"
                    placeholder=""
                    rows="5"
                    show-word-limit
                    type="textarea"
                />
            </div>
        </div>
        <div class="bottom">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="send">确定并发布</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getTag } from '@/api'
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

interface select {
    label: string
    value: number | string
}

const state = reactive({
    options: <select[]>[],
    currentValue: <any>'',
    desc: <string>'',
    imageUrl: <string>'',
    percentage: <number>0,
})

const emits = defineEmits(['onCancel', 'onSuccess'])
const props = defineProps({
    show: Boolean,
})

onMounted(async () => {
    const { data, code } = await getTag()
    if (code === 200) {
        console.log(data)
        let arr = []
        for (const item of data) {
            arr.push({
                label: item.name,
                value: item.name,
            })
        }

        state.options = arr
    }
})

const cancel = () => {
    emits('onCancel', '取消')
}

const send = () => {
	let { currentValue, imageUrl, desc } = state

	console.log(currentValue)
    if (!currentValue.length || !imageUrl || !desc) {
        ElMessage.warning('请保证标签和封面以及编辑摘要填写完整')
        return
    }

    // console.log('参数', state.desc, state.currentValue, state.imageUrl)
    let item = JSON.stringify({ desc, label: currentValue, cover: imageUrl })
    emits('onSuccess', item)
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	console.log(response)
	let { code, data } = response
	console.log('图片上传成功', code, data)
	state.imageUrl = data?.url || URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 1) {
        ElMessage.error('图片尺寸不能大于 1MB!')
        return false
    }
    return true
}

const OnProgress: UploadProps['onProgress'] = (evt, uploadFiles) => {
    state.percentage = evt.percent << 0
}

const DeleteImage = () => {
	console.log('删除图片', 1)
}
</script>

<style scoped lang="scss">
.popup {
    position: absolute;
    top: 60px;
    right: 100px;
    width: 560px;
    font-size: 14.5px;
    white-space: nowrap;
    color: #909090;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 2px #f1f1f1;
    box-shadow: 0 1px 2px #f1f1f1;
    cursor: default;
    z-index: 100;
    &::before {
        content: '';
        position: absolute;
        margin-left: -6px;
        top: -7.2px;
        right: 60px;
        width: 12px;
        height: 12px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-right: none;
        border-bottom: none;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .title {
        @include font-set($font20, #1a1a1a, 400, 1.5);
        padding: 20px 0 20px 20px;
    }
    .content {
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        padding: 20px;
        .item {
            @include flex-auto();
            margin-bottom: 30px;
            font-size: 14px;
            p {
                padding: 5px 8px 0 0;
                color: #1a1a1a;
            }
            &:last-child {
                margin-bottom: 0;
            }
            .avatar {
                width: 261px;
                height: 147px;
            }
            .box {
                width: 261px;
                height: 147px;
                position: relative;
                background-color: #eee;
                .progress {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    padding: 0 10px;
                    transform: translate(-50%, -50%);
                }
            }
            .avatar-uploader {
                position: relative;
                .delete {
                    font-size: 24px;
                    background-color: #ddd;
					color: #333;
                    position: absolute;
                    top: 0;
                    right: 0;
					width: 38px;
					height: 38px;
					@include flex-auto(center, center);
                }
            }
            .avatar-uploader .el-upload {
                border: 1px dashed var(--el-border-color);
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                transition: var(--el-transition-duration-fast);
            }

            .avatar-uploader .el-upload:hover {
                border-color: var(--el-color-primary);
            }
            .el-icon.avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 261px;
                height: 147px;
                text-align: center;
                position: relative;
                z-index: 0;
                background-color: #eee;
            }
        }
    }
    .bottom {
        text-align: right;
        padding: 20px;
    }
}
</style>
