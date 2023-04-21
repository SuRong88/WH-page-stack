<template>
    <div>
        <button class="btn" v-for="item in 10" @click="jump()">进入列表---{{ item }}</button>
    </div>
</template>
<script>
import ScrollPosition from '@/lib/scrollPosition';

export default {
    data() {
        return {};
    },
    created() {
        console.log('index created');
    },
    mounted() {
        ScrollPosition.get.call(this);
    },
    methods: {
        jump() {
            this.$router.push({
                path: '/list'
            });
        }
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
