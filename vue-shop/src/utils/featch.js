//引入axios库
import axios from "axios";

//创建axios实例
const instance = axios.create({
  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: "json", // default
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 7000,
  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,
  // 重试次数
  retry: 3,
  // 重试延时，3秒重试一次
  retryDelay: 3000,
  // 重试条件，默认只要是错误都需要重试
  shouldRetry: () => true
});

//配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    //在headers头部添加参数
    config.headers["Content-Type"] = "application/json;charset=UTF-8";

    const token = window.sessionStorage.getItem("token");

    //判断是否存在token令牌
    if (token) {
      config.headers.Authorization = token;
    }

    //返回config
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    const { status: code } = response.data.meta;

    //判断响应状态码
    switch (code) {
      case 200:
        return Promise.resolve(response);

      case 400:
        return Promise.resolve(response);
    }
  },
  function(error) {
    // 对响应错误做点什么
    //获取error的config属性
    const { config } = error;

    //如果config不存在 或者 retry选项没有设置 用reject 抛出异常
    if (!config || !config.retry) return Promise.reject(error);

    //设置变量跟踪重试次数
    config.__retryCount = config.__retryCount || 0;

    //检查重试次数是否超出最大重试次数
    if (config.__retryCount >= config.retry) {
      //使用reject方法抛出错误
      Notification({
        title: "请求超时",
        message: "当前网络不佳 , 请稍后刷新重试"
      });

      //返回错误信息
      return Promise.reject(error);
    }

    //计算重试次数
    config.__retryCount += 1;
    //创建新的Promise 处理 exponential backoff
    let backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    //返回
    return backoff.then(function() {
      return instance(config);
    });
  }
);

//导出axios实例
export default instance;
