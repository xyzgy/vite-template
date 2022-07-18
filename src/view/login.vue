<template>
  <div>
    
  </div>
</template>
<script setup>
import {ref, reactive, getCurrentInstance, toRefs } from 'vue';
import {getSentence,getPicture} from '@/api/index'
getSentence().then(res=>{
  console.log(res)
})
getPicture().then(res=>{})
</script>
<style lang='scss' scoped>
</style>