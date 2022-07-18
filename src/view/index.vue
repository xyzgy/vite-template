<template>
    <div>
    </div>
</template>
<script>
import { reactive, getCurrentInstance, toRefs } from 'vue';
export default {
    components: {},
    setup(props, { emit, slots, attrs }) {
        let state = reactive({});
        return {
            ...toRefs(state)
        };
    },
}
</script>
<style lang='scss' scoped>
</style>