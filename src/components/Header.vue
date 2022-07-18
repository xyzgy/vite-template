<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :label="item.name" :name="index" v-for="(item, index) in routes" :key="item.path">
            {{ store.isMobile }} {{ item.name }}
        </el-tab-pane>
    </el-tabs>
</template>
<script  setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useConfigStore } from "@/pinia/modules/config.js";

const routes = ref([{ name: '首页', path: '/' }, { name: '二月', path: '/third' }])
const route = useRoute(), router = useRouter();
const store = useConfigStore();

const activeName = ref(0);
watch(() => route.path, (a, b) => {
    let index = 0;
    if (a !== '/') {
        index = routes.value.findIndex(item => item.path !== '/' && a.startsWith(item.path));
    }
    activeName.value = index
})

const emits = defineEmits(['handleClick']);

const handleClick = (tab, event) => {
    router.push(routes.value[tab.index].path)
    emits('handleClick', tab.index)
}
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
