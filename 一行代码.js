// 进制转换
function baseMul(num,base){const result=[];do{result.push(num%base);num=Math.floor(num/=base);}while(num>0);let resultStr='';while(result.length>0){resultStr+=result.pop();}return resultStr;}