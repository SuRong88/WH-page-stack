import ScrollPosition from '@/lib/scrollPosition';
export default {
    inject: ['reload'],
    data() {
        return {
            firstActivated: true,
            fullPath: ''
        };
    },
    activated() {
        const routeName = this.$route.name;
        console.log(`${routeName} activated`, this.firstActivated);
        let { fullPath, query } = this.$route;

        const handleQueryRefresh = () => {
            if (query.refresh) {
                query = JSON.parse(JSON.stringify(query));
                delete query.refresh;
                this.$router.replace({
                    query
                });
                console.log(this.$route.fullPath);
                fullPath = this.$route.fullPath;
            }
        };

        if (this.firstActivated) {
            handleQueryRefresh();
            this.fullPath = fullPath;
            this.firstActivated = false;
            // this.setPosition(true); // 在全局mixin返顶
            return;
        }

        if (fullPath !== this.fullPath) {
            handleQueryRefresh();
            this.fullPath = fullPath;
            this.reload(routeName);
            console.log('%c 页面重载', 'color: green;');
        } else {
            this.setPosition(false);
        }
    },
    created() {
        console.log('keepAlive mixin');
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
