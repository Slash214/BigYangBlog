<template>
    <Header v-if="route.meta.header" />
    <router-view></router-view>
    <Footer v-if="route.meta.footer" />
    <BackTop />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

// onMounted(() => {
//     console.log(route)
//     console.log(route.meta.footer)
// })

</script>

<style scoped lang="scss"></style>

