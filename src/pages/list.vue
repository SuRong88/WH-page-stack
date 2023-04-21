<template>
    <div class="page-list" v-loading="loading">
        <li v-for="item in list" class="item">
            <button class="btn" @click="jumpDetail(item.id)">详情---{{ item.id }}</button>
        </li>
    </div>
</template>
<script>
import ScrollPosition from '@/lib/scrollPosition';
let rememberPostion = false;
export default {
    data() {
        return {
            loading: true,
            list: []
        };
    },
    beforeRouteEnter(to, from, next) {
        console.log('from.path', from.path);
        console.log('rememberPostion', rememberPostion);
        if (from.path === '/detail') {
            rememberPostion = true;
        } else {
            rememberPostion = false;
        }
        next();
    },
    created() {
        console.log('list created');
        setTimeout(() => {
            for (let index = 0; index < 4; index++) {
                const item = {
                    id: index + 1
                };
                this.list.push(item);
            }
            this.loading = false;
            this.setPosition();
        }, 500);
    },
    mounted() {
        this.setPosition();
    },
    methods: {
        jumpDetail(id) {
            this.$router.push({
                path: '/detail',
                query: {
                    id
                }
            });
        },
        setPosition() {
            console.log('rememberPostion', rememberPostion);
            if (rememberPostion) {
                ScrollPosition.get.call(this);
            } else {
                ScrollPosition.goTop.call(this);
            }
        }
    }
};
</script>
<style lang="less">
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
