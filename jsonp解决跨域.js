// 解决跨域的几种方式
// 1 jsonp跨域请求 2 postMessage解决跨域 3 跨域资源访问 CORS Cross-origin resource sharing
// 4 nginx方向代理 5 nodejs中间件正向代理 6 websocket协议解决跨域

// json客户端实现代码
(
    function(global){
        var id =0,container = document.getElementsByTagName("head")[0];

        function jsonp(options){
            if(!options||!options.url) return;
            var scriptNode = document.createElement("script"),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            fnName = "jsonp" + id++;
            // 回调函数
            data["callback"] = fnName;
            // 拼接 url
            var params = [];
            for (var key in data){
                params.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
            }
            url = url.indexOf("?")>0?(url+"&"):(url+"?");
            url = params.join("&");
            scriptNode.src = url;

            // 传递的是一个匿名回调函数执行的话需要暴露为全局方法
            global[fnName] = function(ret){
                callback&&callback(ret);
                container.removeChild(scriptNode);
                delete global[fnName];
            }
            // 出错处理
            scriptNode.onerror = function(){
                callback&&callback({error:'error'});
                container.removeChild(scriptNode);
                global[fnName]&&delete global[fnName];
            }

            scriptNode.type = "text/javascript";
            container.appendChild(scriptNode);

        }

        global.jsonp = jsonp;
    }
)(this);


// 使用示例
jsonp({
    url:'www.example.com',
    data:{
        id:1,
    },
    callback:function(ret){
        console.log(ret);
    }
})


// 服务端代码
var http = require('http');
var urllib = require('url');
var port = 8080;
var data = {'data':'world'};

http.createServer(function(req,res){
    var params = urllib.parse(req.url,true);
    if(params.query.callback){
        console.log(params.query.callback);
        var str = params.query.callback+'('+JSON.stringify(data)+')';
        res.end(str);
    }
    else{
        res.end();
    }
     
})
.listen(port,function(){
    console.log('jsonp server is on');
});
