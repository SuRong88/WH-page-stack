<template>
    <div class="tabbar-comp">
        <div class="tabbar is-hidden"></div>
        <div class="tabbar">
            <div class="tabbar-item" v-for="item in tabbar" @click="jump(item.path)">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabbar: [
                {
                    name: '首页',
                    path: '/index'
                },
                {
                    name: '列表',
                    path: '/list'
                },
                {
                    name: '详情',
                    path: '/detail?id=3'
                },
                {
                    name: '地址',
                    path: '/address'
                }
            ]
        };
    },
    methods: {
        jump(path) {
            this.$router.push(path);
        }
    }
};
</script>
<style lang="less">
.tabbar {
    background-color: aquamarine;
    position: fixed;
    z-index: 99;
    left: 0;
    bottom: 0;
    padding-bottom: calc(0px + constant(safe-area-inset-bottom));
    padding-bottom: calc(0px + env(safe-area-inset-bottom));
    border-top: 1px solid black;
    width: 100vw;
    // height: 60px;
    height: calc(60px + constant(safe-area-inset-bottom));
    height: calc(60px + env(safe-area-inset-bottom));
    display: flex;

    &.is-hidden {
        position: static;
        opacity: 0;
    }

    .tabbar-item {
        flex: 1;
        flex-shrink: 0;
        text-align: center;
        line-height: 60px;
        border-right: 1px dashed black;

        &:last-child {
            border: none;
        }
    }
}
</style>
