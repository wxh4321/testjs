class InterceptorsManage {
    constructor(){
        this.handlers = [];
    }

    use(fulfilled,rejected){
        this.handlers.push({
            fulfilled,
            rejected
        });
    }
}

class Axios{
    constructor(){
        this.interceptors = {
            request:new InterceptorsManage,
            response:new InterceptorsManage
        } 
    }
    // 不加事件拦截的请求
    // request(config){
    //     return new Promise((resolve,reject)=>{
    //         const { method='',url,data={} } = config;
    //         let xhr = new XMLHttpRequest();
    //         xhr.open(method,url,true);
    //         xhr.onload = function(){
    //             resolve(xhr.responseText);
    //         }
    //         xhr.send(data);
    //     });
    // }
    request(config){
        // 拦截器和请求组装队列
        let chain = [this.sendAjax.bind(this),undefined]; //undefined表示失败的暂时不处理
        // 请求拦截
        this.interceptors.request.handlers.forEach(interceptor=>{
            chain.unshift(interceptor.fulfilled,interceptor.rejected);
        });
        // 响应拦截
        this.interceptors.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fulfilled,interceptor.rejected);
        });
        // 执行队列 每执行一次 给promise赋新值
        let promise = Promise.resolve(config);
        while(chain.length>0){
            promise = promise.then(chain.shift(),chain.shift());
        }
        return promise;
    }
    sendAjax(config){
        return new Promise(resolve=>{
            const {method='get',url='',data={}} = config;
            const xhr = new XMLHttpRequest();
            xhr.open(method,url,true);
            xhr.onload = function(){
                resolve(xhr.responseText);
            }
            xhr.send(data);
        });
    }
}
// 不加事件拦截的请求
// 定义get post等挂在axios上
const methodsArr = ['get','post','head','delete','put','patch','options'];
methodsArr.forEach(met=>{
    Axios.prototype[met] = function(){
        console.log('执行'+met+'方法');
        if(['get','delete','head','options'].includes(met)){
            this.request({
                method:met,
                url:arguments[0],
                ...arguments[1]||{}
            });
        }
        else{
            this.request({
                method:met,
                url:arguments[0],
                data:arguments[1]||{},
                ...arguments[2]||{}
            });
        }
    }
});


// 工具方法 实现b的方法或属性混入a;
const utils = {
    extend(a,b,context){
        for(let key in b){
            if(b.hasOwnProperty(key)){
                if(typeof b[key] === 'function'){
                    a[key] = b[key].bind(context);
                }
                else{
                    a[key] = b[key];
                }
            }
        }
        
    }
}

// 最终导出 axios 的方法 即实例的request方法
function CreateAxiosFn(){
    let axios = new Axios();
    let req = axios.request.bind(axios);
    // 混入方法， 处理axios的request方法，使之拥有get,post...方法
    utils.extend(req, Axios.prototype, axios)
    // 混入属性，处理axios的request方法，使之拥有axios实例上的所有属性
    utils.extend(req, axios);
    return req;
}

let axios = CreateAxiosFn();
// console.log(axios)
// // 添加请求拦截器
// axios.interceptors.request.use(function(config){
//     // 在发送请求之前做些什么
//     return config;
// },function(error){
//     return Promise.reject(error);
// });
// // 添加响应拦截器
// axios.interceptors.response.use(function(response){
//     // 对响应数据做点什么
//     return response;
// },function(error){
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });