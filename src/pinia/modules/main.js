import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
      counter: 0,
      name: 'Eduardo',
    }),
    getters: {
      doubleCount: (state) => state.counter * 2,
      // use getters in other getters
      doubleCountPlusOne() {
        return this.doubleCount + 1
      },
    },
    actions: {
      reset() {
        // `this` is the store instance
        this.counter = 0
      },
    },
  })