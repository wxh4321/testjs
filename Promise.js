class Promise1 {
    constructor(handle){
        this['[[PromiseState]]'] = 'pending';
        this['[[PromiseResult]]'] = undefined;
        this.resolveQueue = [];
        this.rejectQueue = [];
        handle&&handle(this._resolve.bind(this),this._reject.bind(this));
    }
    // #resolve(val){
    _resolve(val){
        this['[[PromiseState]]'] = 'fulfilled';
        this['[[PromiseResult]]'] = val;
        const run = () =>{
            let cb ;
            while(cb=this.resolveQueue.shift()){
                cb&&cb(val);
            }
        }
        setTimeout(run);
    }
    // #reject(err){ 
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
            const resolveFn = (val) => {
                let res = onResolved&&onResolved(val);
                if(res instanceof Promise1){
                    res.then(resolve);
                }
                else{
                    resolve(res); // 普通值
                }
            }
            this.resolveQueue.push(resolveFn);
            const rejectFn = (err) =>{
                onRejected&&onRejected(err);
                reject(err);
            }
            this.rejectQueue.push(rejectFn);
        })
    }
    catch(cb){
        this.then(undefined,cb);
    }
    finally(cb){
        this.then(cb,undefined);
    }
    static resolve(val){
        return new Promise1((resolve,reject)=>{
            resolve(val);
        })
    }
    static reject(err){
        return new Promise1((resolve,reject)=>{
            reject(err);
        });
    }
    static all(iterable) {
        return new Promise1((resolve,reject)=>{
            let index = 0;
            let result = new Array(index);
            let hasErrOccured = false;
            let elecount = 0;
            for (let promise of iterable){
                let currentIndex = index; // 防止闭包拿不到index
                promise.then(
                    (value)=>{
                        if(hasErrOccured)return;
                        result[currentIndex] = value;
                        elecount++;
                        if(elecount===iterable.length){
                            resolve(result);
                        }
                    },
                    (err)=>{
                        if(hasErrOccured)return;
                        hasErrOccured = true;
                        reject(err);
                    }
                );
                index++;
            }
            if(index===0){
                resolve([]);
                return;
            }
        });
    }
    static race(iterable){
        return new Promise((resolve,reject)=>{
            let settleElementOccured = false;
            for(let promise of iterable){
                promise.then(
                    (value)=>{
                        if(settleElementOccured)return;
                        settleElementOccured = true;
                        resolve(value);
                    },
                    (err)=>{
                        if(settleElementOccured)return;
                        settleElementOccured = true;
                        reject(err);
                    }
                );
            }
        });
    }
    // static allSettled(iterable){
    //     return new Promise((resolve,reject)=>{
    //         let index = 0;
    //         let result = new Array(index);
    //         let elementCount = 0;
    //         const AddEleToResult = (i,ele) =>{
    //             result[i] = ele;
    //             elementCount++;
    //             if(elementCount===result.length){
    //                 resolve(result);
    //             }
    //         }
    //         for(let promise of iterable){
    //             let currentIndex = index;
    //             promise.then(
    //                 (value)=>{
    //                     AddEleToResult(currentIndex,{
    //                         status:'fulfilled',
    //                         value,
    //                     })
    //                 },
    //                 (reason)=>{
    //                     AddEleToResult(currentIndex,{
    //                         status:'rejected',
    //                         reason
    //                     })
    //                 }
    //             );
    //             index++;
    //         }
    //         if(index===0){
    //             resolve([]);
    //         }
    //     });
    // }
    static allSettled(iterable){
        return new Promise((resolve,reject)=>{
            if(iterable.length===0){
                resolve([]);
            }
            let result = new Array(iterable.length);
            let elementCount = 0;
            const AddEleToResult = (i,ele) =>{
                result[i] = ele;
                elementCount++;
                if(elementCount===iterable.length){
                    resolve(result);
                }
            }
            iterable.forEach((promise,currentIndex)=>{
                promise.then(
                    (value)=>{
                        AddEleToResult(currentIndex,{
                            status:'fulfilled',
                            value,
                        })
                    },
                    (reason)=>{
                        AddEleToResult(currentIndex,{
                            status:'rejected',
                            reason
                        })
                    }
                );
            });
           
        });
    }
}
class Promise2 {

}
// let p = new Promise1()
// p.all()
// console.log('p instanceof Promise1 =  ',p instanceof Promise1)

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
// 1 3 4 6 5 2


