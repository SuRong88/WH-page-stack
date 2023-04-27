<template>
    <div class="page page-address" v-loading="loading">
        <div class="flex">
            <el-input v-model="keyword"></el-input>
            <!-- <el-button class="ml10" @click="reload($route.name)">刷新</el-button> -->
            <el-button class="ml10" @click="search">搜索</el-button>
        </div>
        <ul class="address-list">
            <li class="item" v-for="item in 100" @click="clickItem(item)">{{ item }}</li>
        </ul>
    </div>
</template>
<script>
import keepAliveMixin from '@/mixins/keepAlive';
export default {
    inject: ['reload'],
    mixins: [keepAliveMixin],
    data() {
        return {
            loading: false,
            keyword: '',
            list: []
        };
    },
    created() {
        console.log('address created');
        sessionStorage.removeItem('address');
        this.search();
    },
    activated() {
        console.log('address activated');
    },
    methods: {
        search() {
            this.loading = true;
            setTimeout(() => {
                const mock = [];
                const random = Math.ceil(Math.random() * 10);
                for (let i = 0; i < random; i++) {
                    mock.push(`地址${this.convertToChinaNum(i + 1)}${this.keyword} (${new Date().toLocaleString()})`);
                }
                this.list = mock;
                this.loading = false;
            }, 500);
        },
        clickItem(address) {
            // const address = `联系地址：${this.convertToChinaNum(item)}`;
            sessionStorage.setItem('address', address);
            this.$router.back();
        }
    }
};
</script>
<style lang="less" scoped>
.address-list {
    margin-top: 10px;
    // padding: 0 10px;
    .item {
        border: 1px solid #dcdfe6;
        margin-bottom: 10px;
        padding: 5px;
    }
}
</style>
