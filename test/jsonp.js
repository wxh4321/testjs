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
            console.log('url ',url);
            // 回调函数
            data["callback"] = fnName;
            // 拼接 url
            var params = [];
            for (var key in data){
                params.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
            }
            url = url.indexOf("?")>0?(url+"&"):(url+"?");
            url += params.join("&");
            console.log('url ',url);
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
