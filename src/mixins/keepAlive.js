import ScrollPosition from '@/lib/scrollPosition';
export default {
    inject: ['reload'],
    data() {
        return {
            firstActivated: true,
            fullPath: ''
        };
    },
    created() {
        console.log(document.documentElement.scrollTop);
        const routeName = this.$route.name;
        console.log(`${routeName} created`);
    },
    mounted() {
        const routeName = this.$route.name;
        console.log(`${routeName} mounted`);
        setTimeout(() => {
            this.setPosition(true);
        }, 500);
    },
    activated() {
        const routeName = this.$route.name;
        console.log(`${routeName} activated`, this.firstActivated);
        const { fullPath } = this.$route;

        if (this.firstActivated) {
            this.fullPath = fullPath;
            this.firstActivated = false;
            this.setPosition(true);
            return;
        }

        if (fullPath !== this.fullPath) {
            // this.fullPath = fullPath;
            this.reload(routeName);
            console.log('%c 页面重载', 'color: green;');
        } else {
            this.setPosition(false);
        }
    },
    methods: {
        setPosition(isReset = true) {
            console.log('isReset keepAlive', isReset);
            if (isReset) {
                ScrollPosition.goTop.call(this);
            } else {
                ScrollPosition.get.call(this);
            }
        }
    }
};
