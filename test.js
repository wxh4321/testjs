

class Promise1 {
    constructor(handle){
        this['[[PromiseState]]'] = 'pending';
        this['[[PromiseResult]]'] = undefined;
        this.resolveQueue = [];
        this.rejectQueue = [];
        handle&&handle(this._resovle.bind(this),this._reject.bind(this));
    }
    _resovle(val){
        this['[[PromiseState]]'] = 'fulfilled';
        this['[[PromiseResult]]'] = val;
        const run = () =>{
            let cb;
            while(cb=this.resolveQueue.shift()){
                cb&&cb(val);
            }
        }
        setTimeout(run);
    }
    _reject(err){
        this['[[PromiseState]]'] = 'rejected';
        this['[[PromiseResult]]'] = err;
        const run = () =>{
            let cb;
            while(cb=this.rejectQueue.shift()){
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
                    resolve(val);
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
    finallly(cb){
        this.then(cb,undefined);
    }
    static resolve(val){
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
            let eleCount = 0;
            let hasOcurredErr = false;
            for(let promise of iterable){
                let currentIndex = index;
                promise.then(
                    (val)=>{
                        if(hasOcurredErr){return;}
                        result[currentIndex] = val;
                        eleCount++;
                        if(eleCount===iterable.length){
                            resolve(result);
                        }
                    },
                    (err)=>{
                        if(hasOcurredErr){return;}
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
            let hassettleElement = false;
            for(let promise of iterable){
                promise.then(
                    (val)=>{
                        if(hassettleElement){
                            return;
                        }
                        hassettleElement = true;
                        resolve(val);
                    },
                    (err)=>{
                        if(hassettleElement){
                            return;
                        }
                        hassettleElement = true;
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
            let eleCount = 0;
            const AddEleToResult = (i,ele) => {
                result[i] = ele;
                eleCount++;
                if(eleCount===iterable.length){
                    resolve(result);
                }
            }
            for(let promise of iterable){
                let currentIndex = index;
                promise.then(
                    (value)=>{
                        AddEleToResult(currentIndex,{
                            status:'fulfilled', 
                            value
                        });
                    }, 
                    (reason)=>{
                        AddEleToResult(currentIndex,{
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

  Promise1.race([p1, p2]).then((result) => {
    console.log(result)       // 2秒后醒来
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
