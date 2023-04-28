<template>
    <div class="navbar-comp">
        <div class="navbar">
            <div class="left">
                <i class="back-icon el-icon-arrow-left" @click="back()"></i>
            </div>
            <div class="center">{{ title }}</div>
            <div class="right"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    computed: {
        title() {
            const title = this.$route.meta.title;
            return title;
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    },
};
</script>
<style lang="less" scoped>
.navbar {
    background-color: aquamarine;
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100vw;
    height: 40px;
    display: flex;
    text-align: center;

    .left,
    .center,
    .right {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .left,
    .right {
        width: 10%;
        flex-shrink: 0;
    }
    .center {
        width: 80%;
        font-weight: 700;
    }

    .left {
        .back-icon {
            // width: 100%;
            font-weight: 700;
            font-size: 20px;
            padding: 10px;
        }
    }
}
</style>
