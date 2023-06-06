<template>
    <div>
        <p class="mt10" v-for="item in 99"> me: {{ item }} <el-button class="ml10" @click="$router.push('/info')">个人信息</el-button> </p>
    </div>
</template>
<script>
export default {
    data() {
        return {  }
    },
    created() {
        console.log('me created')
    },
}
</script>
<style lang="less">
    
</style>