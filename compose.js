// const compose = (...fns) =>val=>fns.reverse().reduce((acc,fn)=>fn(acc),val);
// const compose = (a,b)=>c=>a(b(c))
// const pipe = (...fns) =>val=>fns.reduce((acc,fn)=>fn(acc),val);
// const pipe = (a,b)=>c=>b(a(c))
// 与pipe执行相反

const compose = function(fn1,fn2){
    return function(val){
        return fn1(fn2(val))
    }
}

// 通用版
const compose = function(...fns){
    return function(val){
        return fns.reverse().reduce((acc,fn)=>{
            return fn(acc);
        },val)
    }
}

// function aFn(a){
//     return a+1;
// }
// function bFn(b){
//     return b+3;
// }
// let myfn = compose(aFn,bFn);
// let res = myfn(2);
// console.log(res);

const pipe = function(...fns){
    return function(arg){
        return fns.reduce((acc,fn)=>{
            return fn(acc);
        },arg);
    }
}