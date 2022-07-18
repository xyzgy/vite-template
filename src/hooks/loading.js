import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css';
import { useConfigStore } from "@/pinia/modules/config.js";

import { Toast } from 'vant';
import 'vant/es/toast/style';

export default function () {
    const store = useConfigStore();
    const showLoading = (background, text = '加载中') => {
        if (store.isMobile) {
            Toast.loading({
                duration: 0,
                forbidClick: true,
                message: text,
            })
        } else {
            return ElLoading.service({ fullscreen: true, text, background })
        }
    }
    const hideLoading = (loadingInstance) => {
        if (store.isMobile) {
            Toast.clear()
        } else {
            loadingInstance.close()
        }
    }
    return {
        showLoading,
        hideLoading
    }
}