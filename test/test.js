class stack{
    constructor(){
        this.elements = [];
        this.max = null;
        this.min = null;
    }
    add (ele){
        if(){

        }
        else{
            
        }
        this.elements.push(ele);
    }
    remove(){
        return this.elements.pop();
    }
    findMaxEle(){
        let res = null;
        for(let i=0;i<this.elements.length;i++){
            if(!res){
                res = this.elements[i];
            }
            if(res<this.elements[i]){
                res = this.elements[i];
                break;
            }
        }
        return res;
    }
    findMinEle(){
        let res = null;
        for(let i=0;i<this.elements.length;i++){
            if(!res){
                res = this.elements[i];
            }
            if(res>this.elements[i]){
                res = this.elements[i];
                break;
            }
        }
        return res;
    }
}


