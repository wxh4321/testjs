if(typeof XMLHttpRequest!=='undefined'){
    console.log('broswer');
}
else if(typeof process!=='undefined'){
    console.log('node');
}