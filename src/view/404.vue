<template>
  <div>
    页面不存在
  </div>
</template>
<script>
import { reactive, getCurrentInstance, toRefs } from 'vue';
import { useRoute } from 'vue-router';
export default {
  components: {},
  setup(props, { emit, slots, attrs }) {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    let state = reactive({});
    return {
      ...toRefs(state)
    };
  },
}
</script>
<style lang='scss' scoped>
</style>