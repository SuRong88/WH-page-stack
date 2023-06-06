<template>
    <page>
        <div class="page page-list" v-loading="loading">
            <el-input v-model="name"></el-input>
            <el-input v-model="num"></el-input>
            <li v-for="item in list" class="item">
                <div class="item-scroll">
                    <!-- <p v-for="num in 20" class="">{{ num }}</p> -->
                </div>
                <button class="btn" @click="jumpDetail(item.id)">详情---{{ item.id }}</button>
            </li>
        </div>
    </page>
</template>
<script>
export default {
    name: 'List',
    data() {
        return {
            loading: true,
            name: '',
            num: '',
            list: []
        };
    },
    created() {
        console.log('list created');
        this.init();
    },
    methods: {
        init() {
            this.loading = true;
            const { id } = this.$route.query;
            this.id = id;

            this.name = '';
            this.num = '';

            setTimeout(() => {
                for (let index = 0; index < 4; index++) {
                    const item = {
                        id: index + 1
                    };
                    this.list.push(item);
                }
                this.loading = false;
            }, 500);
        },
        jumpDetail(id) {
            this.$router.push({
                path: '/detail/' + id
                // query: {
                //     id,
                //     refresh: 1
                // }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page-list {
    min-height: 100%;
}
.item {
    position: relative;
    height: 200px;
    border: 1px dashed red;

    &:nth-child(n + 2) {
        margin-top: 10px;
    }

    .item-scroll {
        background-color: pink;
        width: 40%;
        height: 80%;
        overflow-y: scroll;
    }

    .btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
        border: none;
        color: #fff;
        background-color: #1e80ff;
        border-radius: 3px;
        padding: 0.5em 1em;
        font-size: 14px;
        white-space: nowrap;
    }
}
</style>
