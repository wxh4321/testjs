// 回文序列
function isPalindrome(word){const s = [];for(let i=0;i<word.length;i++){s.push(word[i]);};let result='';while(s.length>0){result+=s.pop();}if(word===result){return true;}else{return false;}}
// 进制转换
function baseMul(num,base){const result=[];do{result.push(num%base);num=Math.floor(num/=base);}while(num>0);let resultStr='';while(result.length>0){resultStr+=result.pop();}return resultStr;}
// 阶乘
function factorial(n){if(n===0){return 1;}else{return n*factorial(n-1)}}
const compose = (...fns) =>val=>fns.reverse().reduce((acc,fn)=>fn(acc),val);
const compose = (a,b)=>c=>a(b(c))
const pipe = (...fns) =>val=>fns.reduce((acc,fn)=>fn(acc),val);
const pipe = (a,b)=>c=>b(a(c))