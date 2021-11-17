class Vue {
    constructor(){
        console.log('Vue Object');
    }
}

// 通过Object.defineProperty实现
Vue.prototype.observe = function(obj){
    var value,_this = this;
    for(var key in obj){
        value = obj[key];
        (
            function(key,value){
                if(typeof obj[key]==='object'){
                    this.observe(obj[key]);
                }
                else{
                    Object.defineProperty(_this.$data,key,{
                        get:function(){
                            console.log('get value');
                            return value;
                        },
                        set:function(newValue){
                            value = newValue;
                            _this.render(); // 重新渲染组件
                        }
                    });
                }
            }
        )(key,value);
    }
}