<template>
    <div>
        <el-upload
            class="upload-demo"
            drag
            action=""
            :auto-upload="false"
            multiple
            :show-file-list="false"
            :on-change="handleChange"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">托放文件到这里 或 <em>点击上传图片</em></div>
            <template #tip>
                <div class="el-upload__tip">支持Jpeg、Jpg、Png、Webp图片格式互相转换</div>
            </template>
        </el-upload>

        <div class="list">
            <div class="mb20">
                <el-button type="primary">统一转为：jpeg</el-button>
                <el-button type="info" @click="downloadAll">打包下载</el-button>
                <el-button type="warning" @click="conversionAll">一键转换全部</el-button>
            </div>
            <div class="item" v-for="(item, key) of fileList" :ke="key">
                <div class="flex">
                    <p class="mr20">图片名称：{{ item.name }}</p>
                    转为：
                    <el-select v-model="item.default" class="m-2" placeholder="选择图片格式">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>

                <div class="flex">
                    <el-button type="primary" @click="Conversion(item)">开始转换</el-button>
                    <el-button type="success" @click="download(item)">下载</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
import { saveAs } from 'file-saver'
import JsZip from 'jszip'

interface FileLists extends UploadUserFile {
    default?: string
    url?: string
}

interface FileProps extends UploadProps {
    default?: string
    url?: string
}

const options = [
    { id: 1, label: 'jpeg', value: 'jpeg' },
    { id: 2, label: 'png', value: 'png' },
    { id: 3, label: 'webp', value: 'webp' },
]

const downloadData = ref<any[]>([])
const fileList = ref<any[]>([])

const handleChange = (uploadFile: FileProps, uploadFiles: FileLists[]) => {
    fileList.value = uploadFiles.map((e: FileLists) => {
        e.default = 'jpeg'
        return e
    })
}

const Conversion = async (item: FileLists) => {
    console.log(item)
    let url = await CoversionImage(item)
    for (let data of fileList.value) {
        if (data.uid === item.uid) {
            data['url'] = url
        }
    }
}

/**
 * 图片转为其他格式
 * @param item 图片文件 包括 需要转换的格式
 */
const CoversionImage = async (item: FileLists) => {
    let type = item.default || 'jpeg',
        base64: any = await fileToBase64(item.raw!),
        image = new Image()

    image.src = base64
    return new Promise((reslove, reject) => {
        image.onload = () => {
            let canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            canvas.getContext('2d')?.drawImage(image, 0, 0)
            let result = canvas.toDataURL(`image/${type}`)
            reslove(result)
        }

        image.onerror = (err) => {
            console.log('error', err)
            reject(null)
        }
    })
}

/**
 * File or Blob 转 base64
 * @param file
 */
const fileToBase64 = (file: File | Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = (e) => {
            resolve(e.target?.result)
        }

        fileReader.readAsDataURL(file)
        fileReader.onerror = () => {
            reject(new Error('文件流异常，转换失败'))
        }
    })
}

const download = (item: FileLists) => {
    console.log(item)

    if (!item?.url) {
        console.log('还没有转换')
        ElMessage.warning('请转换图片再下载')
        return
    }

    let name = item.name.split('.')[0]
    saveAs(item.url, `${name}.${item.default}`)
}

const downloadAll = async () => {
	let data = downloadData.value
    let jszip = new JsZip()
    const promisData = data.map(async (param) => await jszip.file(param.name, param.url))

    await Promise.all(promisData)
     console.log(promisData)
    jszip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `所有的图片.zip`)
    })
}

const conversionAll = async () => {
    console.log(fileList.value)

    let data: { name: string; url: any }[] = []
    fileList.value.map(async (item, index) => {
        // console.log(item)
        let n = item.name.split('.')[0]
        let value = await CoversionImage(item)
        // console.log(value)
        data.push({ name: `${n}.${item.default}`, url: await base64ToBlob(value) })
    })

	downloadData.value = data

	console.log(downloadData.value)
}

/**
 * base64 转 为 blob
 */
const base64ToBlob = (base64: string) => {
	var arr = base64.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n)

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new Blob([u8arr], { type: mime })
}

</script>

<style scoped lang="scss">
.el-upload__tip {
    padding-top: 10px;
    text-align: center;
}

.list {
    margin-top: 40px;
    .item {
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
        padding: 15px;
        box-shadow: 0 0 6px 2px #ccc;
        background-color: #f2f2f2;
        #download {
            background-color: #67c23a;
            color: #fff;
            padding: 10px;
            display: inline-block;
            border-radius: 5px;
            justify-content: center;
            align-items: center;
            line-height: 1;
            height: 32px;
            white-space: nowrap;
            cursor: pointer;
        }
    }
    .flex {
        display: flex;
        align-items: center;
    }
}
</style>
