// 实现go函数
// go('1'); // go1
// go()('1'); // goo1
// go()()('1'); // gooo1

function go(...args){
    let o='o'
    const fn = function(...args){
        if(typeof args[0]==='undefined'){
            return function(...args){
                o+='o';
                return fn(...args);
            }
        }
        else{
            return 'g'+o+args[0];
        }
    }
    return fn(...args);
}

console.log(go()()('1'))