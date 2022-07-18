// axios > v0.22.0

import axios from 'axios';

import useLoading from '@/hooks/loading.js';

const pending = new Map();
const addPending = (config) => {
    const url = getUrl(config)
    const controller = new AbortController(); // 每个请求时都新生成一个AbortController实例
    config.signal = controller.signal; // 设置请求的signal字段为new AbortController()的signal
    if (pending.has(url)) {
        delPending(config)
    } else {
        pending.set(url, controller)
    }
}
const delPending = (config) => {
    const url = getUrl(config);
    if (pending.has(url)) {
        const controller = pending.get(url);
        controller.abort(); // 取消请求
        pending.delete(url)
    }
}
const clearPending = () => {
    for (const [url, controller] of pending) {
        controller.abort(); // 取消请求
    }
    pending.clear()
}
const getUrl = (config) => {
    const {
        method, url
    } = config;
    return `${method}-${url}`
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 99999,
})
instance.interceptors.request.use(
    config => {
        addPending(config)
        config.headers = {
            'xxxx': 'xxx'
        };
        return config;
    },
    err => {
        console.log('请求失败', err);
        return Promise.reject(err);
    },
);
instance.interceptors.response.use(
    response => {
        // 2xx响应
        delPending(response.config)
        return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
    },
    err => {
        // 超出2xx响应
        if (axios.isCancel(err)) {
            console.log('Request canceled', '终止请求');
            err.msg = 'canceled'
        }
        return Promise.reject(err)
    },
);

function baseRequest(options = {}, config = {}) {
    console.log('config', config)
    const { loading = false } = config;
    let loadingInstance = null;
    if (loading) {
        loadingInstance = useLoading().showLoading();
    }
    return instance(options).then(res => {
        if (loading) {
            useLoading().hideLoading(loadingInstance)
        }
        const data = res.data || {};
        if (res.status === 200) {
            return Promise.resolve(data.data || data);
        }
    }).catch(err => {
        if (loading) {
            useLoading().hideLoading(loadingInstance)
        }
        return Promise.reject({
            msg: err.msg,
        });
    });
}

// data:方法请求的参数会放到请求体body里面，后台接收的是json的格式,可传递特殊字符
// params:方法请求的参数会放到url字符串里面，后台接收的是字符串键值的形式
const request = ['post', 'put', 'patch'].reduce((request, method) => {
    // 允许同时存在data,params字段
    request[method] = (url, data = {}, config = {}) => {
        return baseRequest({ method, data, url, ...config });
    };
    return request
}, {});

['get', 'delete', 'head'].forEach(method => {
    request[method] = (url, params = {}, config = {}) => {
        return baseRequest(
            { method, params, url, }, config
        );
    };
});

export default request;