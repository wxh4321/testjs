Array.prototype.mymap = function(fn){
    let resultArr = [];
    for(let i=0;i<this.length;i++){
        resultArr.push(fn(this[i],i,this));
    }
    return resultArr;
}

// let arr = [1,2,3,4]
// const res = arr.mymap((item,i)=>{
//     console.log('item i ',item,i);
//     // item = item+1;
//     return item;
// });

// console.log('res : ',res);
