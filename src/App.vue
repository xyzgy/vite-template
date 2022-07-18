

<template>
  <template v-if="store.headerShow">
    <Header @handleClick="handleClick" />
  </template>
  <div id="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <template v-if="store.footerShow">
    <Footer />
  </template>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useConfigStore } from "@/pinia/modules/config.js";

import { onMounted } from "vue";

import { debounce } from 'throttle-debounce';

const store = useConfigStore()
const handleClick = (e) => {
  console.log('xxxxxxxxxxx', e)
}

onMounted(() => {
  store.updateScreenInfo();
  window.addEventListener(
    "resize",
    debounce(500, () => {
      store.updateScreenInfo();
    }),
    { passive: true }
  );
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main>div {
  width: 100%;
  min-height: 60vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  position: absolute;

  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}


.slide-enter-to {
  position: absolute;
  right: 0;
}


.slide-enter-from {
  position: absolute;
  right: -100%;
}


.slide-leave-to {
  position: absolute;
  left: -100%;
}


.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>