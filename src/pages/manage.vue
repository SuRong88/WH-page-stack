<template>
    <div>
        <p class="mt10" v-for="item in 99"> manage: {{ item }} <el-button class="ml10" @click="$router.push('/department')">部门管理</el-button> </p>
    </div>
</template>
<script>
export default {
    data() {
        return {  }
    },
    created() {
        console.log('manage created')
    },
}
</script>
<style lang="less">
    
</style>