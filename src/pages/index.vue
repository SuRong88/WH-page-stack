<template>
    <div class="page page-index" v-loading="loading">
        <el-input v-model="name"></el-input>
        <el-input v-model="num"></el-input>
        <button class="btn" v-for="item in 10" @click="jump()">进入列表---{{ item }}</button>
    </div>
</template>
<script>
import keepAliveMixin from '@/mixins/keepAlive';
export default {
    name: 'Index',
    mixins: [keepAliveMixin],
    data() {
        return {
            loading: true,
            name: '',
            num: '',
        };
    },
    created() {
        this.init();
    },
    methods: {
        jump() {
            this.$router.push({
                path: '/list',
                query: {
                    refresh: 1
                }
            });
        },
        init() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
    }
};
</script>
<style scoped lang="less">
.btn {
    display: block;
    &:nth-child(n+2) {
        margin-top: 60px;
    }
}
</style>
