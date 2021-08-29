
class EventBus{
    constructor(){
        this._events = [];
    }
    on(event,fn){
        if(Array.isArray(event)){
            for(let i=0;i<event.length;i++){
                this.on(event[i],fn);
            }
        }
        else{
            (this._events[event]||(this._events[event]=[])).push(fn);
        }
    }
    once(event,fn){
        const _self = this;
        function handler(){ 
            fn.apply(null,arguments);
            _self.off(event,handler);
        }
        this.on(event,handler);
    }
    off(event,fn){
        if(!arguments.length){ // 不传参数清空列表
            this._events = [];
        }
        if(Array.isArray(event)){
            for(let i=0;i<event.length;i++){
                this.off(event[i],fn);
            }
        }
        if(arguments.length===1){
            this._events[event] = null;
        }
        const cbs = this._events[event];
        if(!cbs){
            return;
        }
        let cb,i=cbs.length;
        while(i--){
            cb = cbs[i];
            if(cb===fn){
                cbs.splice(i,1);
                break;
            }
        }
    }
    emit(event){
        const cbs = this._events[event];
        if(cbs){
            for(let i=0;i<cbs.length;i++){
                try{
                    cbs[i].apply(null,[...arguments].slice(1));
                }
                catch(e){
                    new Error('error',e);
                }
                
            }
        }
        
    }
}


const myevent = new EventBus();
myevent.on('myfunc',(e)=>{
    console.log('params ',e);
});
myevent.once('myfunc1',(e)=>{
    console.log('params1 ',e);
});
myevent.emit('myfunc','jjjj');
myevent.emit('myfunc1','jjjj11');
myevent.emit('myfunc','jjjj');
myevent.emit('myfunc1','jjjj11');

