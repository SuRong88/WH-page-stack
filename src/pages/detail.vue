<template>
    <div class="page page-detail" v-loading="loading">
        <el-divider content-position="left">表单</el-divider>
        <el-form v-model="formData" label-width="60px">
            <el-form-item label="ID">
                <div class="flex">
                    <el-input v-model="formData.id" disabled></el-input>
                </div>
            </el-form-item>
            <el-form-item label="姓名">
                <div class="flex">
                    <el-input v-model="formData.name"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="手机">
                <div class="flex">
                    <el-input v-model="formData.phone"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="地址">
                <div class="flex">
                    <el-input v-model="formData.address" disabled></el-input>
                    <el-button class="ml10" @click="jumpAddress">选择</el-button>
                </div>
            </el-form-item>
        </el-form>
        <el-divider content-position="left">按钮</el-divider>
        <el-button @click="reload($route.name)">刷新</el-button>
        <el-button @click="jumpList(false)">列表（不刷新）</el-button>
        <el-button @click="jumpList(true)">列表（刷新）</el-button>
        <el-divider content-position="left">其他推荐</el-divider>
        <div class="recommend-list">
            <div class="item" v-for="num in 25" @click="jumpDetail(num)">
                {{ num }}
            </div>
        </div>
    </div>
</template>
<script>
import keepAliveMixin from '@/mixins/keepAlive';
export default {
    name: 'Detail',
    mixins: [keepAliveMixin],
    data() {
        return {
            loading: false,
            formData: {
                id: '',
                name: '',
                phone: '',
                address: ''
            }
        };
    },
    watch: {
        $route: {
            deep: true,
            handler(newValue, oldValue) {
                const isJumpCurrentPage = newValue.path === '/detail' && oldValue.path === '/detail';
                const isNotRefresh = newValue.query.refresh || oldValue.query.refresh;
                if (isJumpCurrentPage && !isNotRefresh) {
                    console.log('当前页变化');
                    this.reload(newValue.name);
                }
                // console.log('Detail watch', newValue.path === '/detail');
                // const isCurrentPage = newValue.path === '/detail';
                // const isRefresh = !!newValue.refresh;
                // const isNewId = newValue.query.id !== this.formData.id;
                // if (isCurrentPage && !isRefresh && isNewId) {
                //     // this.reload(newValue.name);
                // } else {
                //     console.log('0000');
                // }
            }
        }
    },
    created() {
        console.log('detail created');
        this.init();
    },
    mounted() {
        console.log('detail mounted');
    },
    activated() {
        console.log(2222222222, this.firstActivatedForPage$);
        if (!this.firstActivatedForPage$) {
            console.log('detail activated 检查地址');
            this.checkSelectAddress();
        } else {
            this.firstActivatedForPage$ = false;
        }
    },
    methods: {
        init() {
            this.loading = true;
            const { id } = this.$route.query;
            setTimeout(() => {
                this.formData.id = id;
                this.formData.name = `名字：${this.convertToChinaNum(id)}`;
                this.formData.phone = Date.now()
                    .toString()
                    .slice(0, 11);
                this.loading = false;
            }, 500);
        },
        jumpList(refresh) {
            const query = {};
            refresh && (query.refresh = 1);
            this.$router.push({
                path: '/list',
                query
            });
        },
        jumpDetail(id) {
            const query = JSON.parse(JSON.stringify(this.$route.query));
            query.id = id;
            this.$router.push({
                query
            });
        },
        jumpAddress() {
            this.$router.push({
                path: '/address'
            });
        },
        checkSelectAddress() {
            const address = sessionStorage.getItem('address');
            if (address) {
                this.formData.address = address;
                sessionStorage.removeItem('address');
            }
        }
    }
};
</script>
<style lang="less" scoped>
.recommend-list {
    display: flex;
    flex-wrap: wrap;
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: calc((100% - 25px) / 4);
        height: 40px;
        border: 1px solid #dcdfe6;
        margin-bottom: 5px;
        margin-left: 5px;
    }
}
</style>
