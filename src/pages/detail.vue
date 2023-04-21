<template>
    <div>
        detail
        <p>{{ id }}</p>
        <div v-for="num in 50">
            {{ num }}
        </div>
        -------
    </div>
</template>
<script>
import ScrollPosition from '@/lib/scrollPosition';
export default {
    name: 'Detail',
    data() {
        return {
            id: ''
        };
    },
    created() {
        console.log('detail created');
        const { id } = this.$route.query;
        this.id = id;
    },
    activated() {
        ScrollPosition.goTop.call(this);
    },
    mounted() {
        ScrollPosition.goTop.call(this);
    },
};
</script>
<style lang="less"></style>
