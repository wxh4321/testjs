// 回文序列
function isPalindrome(word){const s = [];for(let i=0;i<word.length;i++){s.push(word[i]);};let result='';while(s.length>0){result+=s.pop();}if(word===result){return true;}else{return false;}}
// 进制转换
function baseMul(num,base){const result=[];do{result.push(num%base);num=Math.floor(num/=base);}while(num>0);let resultStr='';while(result.length>0){resultStr+=result.pop();}return resultStr;}