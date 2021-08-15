
n isPalindrome(word){const s = [];for(let i=0;i<word.length;i++){s.push(word[i]);};let result='';while(s.length>0){result+=s.pop();}if(word===result){return true;}else{return false;}}
