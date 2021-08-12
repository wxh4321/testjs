class Promise1{
    constructor(handle){
        this['[[PromiseState]]']='pending';
        this['[[PromiseResult]]']=undefined;
        this.resolveQueue = [];
        this.rejectQueue = [];
        handle&&handle(this._resovle.bind(this),this._reject.bind(this));
    }
    _resovle(val){
        this['[[PromiseState]]']='fulfilled';
        this['[[PromiseResult]]']=val;
        const run = () => {
            let cb =null;
            while(cb=this.resolveQueue.shift()){
                cb&&cb(val);
            }
        }
        setTimeout(run);
    }
    _reject(err){
        this['[[PromiseState]]']='rejected';
        this['[[PromiseResult]]']=err;
        const run = () => {
            let cb =null;
            while(cb=this.resolveQueue.shift()){
                cb&&cb(err);
            }
        }
        setTimeout(run);
    }
    then(onResolved,onRejected){
        return new Promise1((resolve,reject)=>{
            const resolveFn = (val) =>{
                const res = onResolved&&onResolved(val);
                if(res instanceof Promise1){
                    res.then(resolve);
                }
                else{
                    resolve(res);
                }
            }
            this.resolveQueue.push(resolveFn);
            const rejectFn = (err) => {
                onRejected&&onRejected(err);
                reject(err);
            }
            this.rejectQueue.push(rejectFn);
        });
    }
    catch(cb){
        this.then(undefined,cb);
    }
    finally(cb){
        this.then(cb,undefined);
    }
    static resovle(val){
        return new Promise1((resolve,reject)=>{
            resolve(val);
        });
    }
    static reject(err){
        return new Promise1((resolve,reject)=>{
            reject(err);
        });
    }
    static all(iterable){
        return new Promise1((resolve,reject)=>{
            let index = 0;
            const result = new Array(index);
            let hasOcurredErr = false;
            let elecount = 0;
            for(let promise of iterable){
                let currentIndex = index;
                promise.then(
                    (val)=>{
                        if(hasOcurredErr)return;
                        result[currentIndex] = val;
                        elecount++;
                        if(elecount===iterable.length){
                            resolve(result);
                        }
                    },
                    (err)=>{
                        if(hasOcurredErr)return;
                        hasOcurredErr = true;
                        reject(err);
                    }
                );
                index++;
            }
            if(index===0){
                resolve([]);
            }
        });
    }
    static race(iterable){
        return new Promise1((resolve,reject)=>{
            let elesettledstate = false;
            for(let promise of iterable){
                promise.then(
                    (val)=>{
                        if(elesettledstate){return};
                        elesettledstate = true;
                        resolve(val);
                    },
                    (err)=>{
                        if(elesettledstate){return};
                        elesettledstate = true;
                        reject(err);
                    }
                );
            }
        });
    }
    static allSettled(iterable){
        return new Promise1((resolve,reject)=>{
            let index = 0;
            const result = new Array(index);
            let elecount = 0;
            const setEleToResult = (i,ele) => {
                result[i] = ele;
                elecount++;
                if(elecount===iterable.length){
                    resolve(result);
                }
            }
            for(let promise of iterable){
                let currentIndex = index;
                
                promise.then(
                    (value)=>{
                        setEleToResult(currentIndex,{
                            status:'fulfilled',
                            value
                        });
                    },
                    (reason)=>{
                        setEleToResult(currentIndex,{
                            status:'rejected',
                            reason
                        });
                    }
                );
                index++;
            }
            if(index===0){
                resolve([]);
            }
        });
    }
}

let wake = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`${time / 1000}秒后醒来`)
      }, time)
    })
  }
  
  let p1 = wake(3000)
  let p2 = wake(2000)
  
  Promise1.all([p1, p2]).then((result) => {
    console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
  }).catch((error) => {
    console.log(error)
  })


  let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    },1000)
  })
  
  let p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('failed')
    }, 500)
  })
  
 
 
 
 
Promise1.allSettled([p3, p4]).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)  // 打开的是 'failed'
})


console.log(1)
setTimeout(() => {
   console.log(2); 
});
let promise1 = new Promise((res,rej)=>{
    console.log(3)
    res("success");
});
console.log(4)
promise1.then(res=>{
    console.log(5);
})
console.log(6);