import request from './request';

// 设置全局配置
request.setConfig({
    url: 'http://59.208.244.108:8080/wuhan-data-panel/',  // 基地址
    contentType: 'json',
    header: {
        // uid:'xxxx'
    }
});

// 不return config或者return false, 都不会发送请求(例如配置token)
request.addInterceptors.request(config => {
    return config;
})

// 不return res或者return false, 则都不会返回值
// return Promise.reject('xxxxx')，主动抛出错误
request.addInterceptors.response(res => {
    let firstCodeNum = String(res.statusCode).substr(0, 1)

    // 2xx
    if (firstCodeNum === '2') {
        // do something
        return res;
    }

    // 3xx
    if (firstCodeNum === '3') {
        // do something
        return res;
    }

    // 4xx or 5xx
    if (firstCodeNum === '4' || firstCodeNum === '5') {
        // do something
        return Promise.reject(res)
    }

    // 停止发送请求 request.stop()
    if (JSON.stringify(res) === '{"errMsg":"request:fail abort"}') {
        // do something
        return false;
    }

    return Promise.reject(res)
})

export default request