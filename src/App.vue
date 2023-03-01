<template>
    <Header v-if="route.meta.header" />
    <Music></Music>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive"></component>
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive"></component>
    </router-view>

    <Footer v-if="route.meta.footer" />
    <BackTop />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="scss"></style>
