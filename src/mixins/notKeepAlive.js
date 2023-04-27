import ScrollPosition from '@/lib/scrollPosition';
export default {
    created() {
        // console.log(this);
        // // console.log('global mixin');
        // if (this.$route) {
        //     const route = this.$route;
        //     if (!route.meta || !route.meta.keepAlive) {
        //         this.setPosition(true);
        //     }
        // }
        this.setPosition(true);

        // 如果keep-alive使用transition的话，搭配定时器使用会好些
        // setTimeout(() => {
        //     this.setPosition(true);
        // }, 500)
    },
    methods: {
        setPosition(isReset = true) {
            console.log('isReset', isReset);
            if (isReset) {
                ScrollPosition.goTop.call(this);
            } else {
                ScrollPosition.get.call(this);
            }
        }
    }
};
