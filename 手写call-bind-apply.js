// call 
Function.prototype.mycall = function(content,...args){
    console.log(content,args,...args)
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
Function.prototype.mybind = function(content,...args){
    const self = this;
    args = args?args:[];
    return function F(...newArgs){
        if(this instanceof F){
            return new self(...args,...newArgs);
        }
        else{
            const doubleArgs = args.concat(newArgs);
            return self.myapply(content,doubleArgs);
        }
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
// obj.myFun.mybind(db,'成都','上海')();
// obj.myFun.mybind(db,['成都','上海'])();

const test = ['a','b']
const t1 = [... test];
console.log('test : ',t1);

Function.prototype.mycall = function(content,...args){
    const self = content||window;
    self.fn = this;
    const result = self.fn(...args);
    delete self.fn;
    return result;
}