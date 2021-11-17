function add(a){
    console.log('a');
    return function(b){
        console.log('b');
        return function(c){
            console.log('c');
            return a+b+c;
        }
    }
}
// console.log(add(1)(2)(4));

const curry = (fn) => {
    return function curryFunc(...args){
        if(args.length<fn.length){
            return function(){
                return curryFunc(...args.concat(Array.from(arguments)));
            }
        }
        return fn(...args);
    }
}
function add(a,b,c){
    return a+b+c;
}
// console.log(add.length);
const myAdd = curry(add);
console.log(myAdd(1)(3)(5));
