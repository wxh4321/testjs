var ob = {
    a:1,
    b:2
}
// obj 为ob的添加了监听对象
var obj = new Proxy(ob,{
    // target 为第一参数ob,receive 为返回的obj 返回的proxy对象
    // get:function(target,key,receive){
    //     console.log('get value ',target);
    //     return target[key];
    // },
    // set:function(target,key,newVal,receive){
    //     console.log('set value ',target,newVal);
    //     // 赋值操作
    //     target[key] = newVal;
    // }
    get:(target,key,receive)=>{
        console.log('get value ',target);
        return target[key];
    },
    set:(target,key,newVal,receive)=>{
        console.log('set value ',target,newVal);
        // 赋值操作
        target[key] = newVal;
    }
});

console.log(obj.a);
obj.a = 1;