
// 修改数据 
// 1.
// useConfigStore.headerShow = false
// 2.批量
// useConfigStore.$patch({
//     headerShow: false,
//     footerShow: false
// })
// 3 actions方法
// useConfigStore.updateHeaderShow()

import { defineStore } from 'pinia'
import { isMobile } from '@/utils';
export const useConfigStore = defineStore('config', {
    state: () => {
        return {
            headerShow: false,
            footerShow: false,
            isMobile: false,
        };
    },
    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            { key: 'xxx-bbb', storage: localStorage, paths: ['headerShow'] }, // 未设置key 以默认store id为key
        ],
    },
    getters: {
        // isMobile(state){return this.isMobile}
    },
    actions: {
        updateHeaderShow(show = true) {
            this.headerShow = show
        },
        updateFooterShow(show = true) {
            this.footerShow = show
        },
        updateScreenInfo() {
            const width = document.documentElement.getBoundingClientRect().width;
            const bodyClassName = document.body.className;
            if (isMobile() || width < 768) {
                this.isMobile = true;
                if(bodyClassName.indexOf('pc-class')>-1){
                    document.body.classList.remove("pc-class");
                }
                if (bodyClassName.indexOf('mobile-class') === -1) {
                    document.body.className = "mobile-class";
                }
            } else {
                if(bodyClassName.indexOf('mobile-class')>-1){
                    document.body.classList.remove("mobile-class");
                }
                if (bodyClassName.indexOf('pc-class') === -1) {
                    document.body.className = "pc-class";
                }
                this.isMobile = false
            }

        }
    }
})

