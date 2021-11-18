// call 
Function.prototype.mycall = function(content,...args){
    console.log('mycall ',content,args,...args,arguments)
    const self = content||window;
    // args = args.slice(1);
    self.fn = this;
    const result = self.fn(...args); 
    delete self.fn;
    return result;
}
Function.prototype.myapply = function(content,args=[]){
    // console.log(content,args,...args)
    const self = content||window;
    self.fn = this;
    let result = null;
    if(args.length){
        result = self.fn(...args);
    }
    else{
        result = self.fn();
    }
    delete self.fn;
    return result;
}
// Function.prototype.mybind = function(content,...args){
//     const self = this;
//     args = args?args:[];
//     return function F(...newArgs){
//         if(this instanceof F){
//             console.log('...args,...newArgs ',...args,...newArgs);
//             return new self(...args,...newArgs);
//         }
//         else{
//             const doubleArgs = args.concat(newArgs);
//             return self.myapply(content,doubleArgs);
//         }
//     }
// }
// 二版
Function.prototype.mybind =  function(content){
    const fn = this;
    console.log('[...arguments]',[...arguments],arguments);
    let args = [...arguments].slice(1);
    return function F(){
        return fn.apply(this instanceof F?new fn:content,args.concat(...arguments))
    }
}


var name = '小王',age = 17;
var obj = {
    name:'小张',
    objAge:this.age,
    myFun:function(fm, t ){
        console.log(this.name + " 年龄 "+this.age,"来自 "+fm+" 去往 "+t);
    }
}

var db = {
    name:'德玛', 
    age:99,
}
// obj.myFun.call(db,'成都','上海');
// obj.myFun.apply(db,['成都','上海']);
// obj.myFun.bind(db,'成都','上海')();
// obj.myFun.bind(db,['成都','上海'])();

obj.myFun.mycall(db,'成都','上海');
obj.myFun.myapply(db,['成都','上海']);
obj.myFun.mybind(db,'成都','上海')();
obj.myFun.mybind(db,['成都','上海'])();
// const bindFun = obj.myFun.mybind(db);
// const res = new bindFun('成都','上海');
// console.log('res : ',res(db,'1','2'));
// res();


