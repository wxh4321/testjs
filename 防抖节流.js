import { time } from "console";

// 防抖
const debounce = (fn,delay) => {
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(fn,delay);
    }

}

// 节流 
const throttle = (fn,delay) =>{
    let valid =true;
    let timer = null;

    return function(){
        if(!valid){
            return false;
        }
        valid = false;
        setTimeout(()=>{
            fn&&fn();
            valid = true;
        },delay)
    }
}

// 节流(二)
const throttle2 = (fn,delay) =>{
    let last = 0;
    let timer;
    return function(){
        let now = +new Date();
        if(last&&(now-last<delay)){ // 延时执行
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(()=>{
                last = now;
                fn&&fn();
            },delay);
        }
        else{
            last = now;
            fn&&fn();
        }
        
    }
}
