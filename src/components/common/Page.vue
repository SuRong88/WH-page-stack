<template>
    <div class="wrapper">
        <v-navbar></v-navbar>
        <!-- <router-view></router-view> -->
        <slot />
    </div>
</template>

<script>
import vNavbar from './Navbar.vue';

export default {
    components: {
        vNavbar,
    },
};
</script>
