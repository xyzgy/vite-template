import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist';
const pinia = createPinia() 
pinia.use(piniaPluginPersist); //辅助实现数据持久化功能   数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key
export {
  pinia
}
