<template>
    <div :class="['tabbar', {'is-hidden': hidden}]">
        <div class="tabbar-item" v-for="item in tabbar" @click="jump(item.path)">
            {{ item.name }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        hidden: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tabbar: [
                {
                    name: '页面一',
                    path: '/index'
                },
                {
                    name: '页面二',
                    path: '/list'

                },
                {
                    name: '页面三',
                    path: '/detail?id=666'
                }
            ]
        };
    },
    methods: {
        jump(path) {
            this.$router.push(path)
        }
    },
};
</script>
<style lang="less">
.tabbar {
    background-color: aquamarine;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-bottom: calc(0px + constant(safe-area-inset-bottom));
    padding-bottom: calc(0px + env(safe-area-inset-bottom));
    border-top: 1px solid black;
    width: 100vw;
    height: 60px;
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
