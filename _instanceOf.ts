#!/usr/bin/env node
/*
实现 instanceOf
*/
function _instanceOf(instance, ClassOrFunc) {
     if (typeof instance !== 'object' || instance === null) return false;

     let _prototype = Object.getPrototypeOf(instance);

     while(_prototype){
          if (_prototype === ClassOrFunc.prototype) return true;
          _prototype = Object.getPrototypeOf(_prototype);
     }

     return false;  

}

/*
实现call函数
*/

 Function.prototype._call =function(context = window, ...params) {

     if(typeof context !== 'object') context = new Object(context);
     /*
     1. call函数改变了函数执行的this指向，
     2. 运行执行者函数
     */
    // 使用Symbol作为key  避免key重名 
     const objKey  = Symbol();
     context[objKey] = this;  // this就是需要执行的函数 给context上下文加一个该函数

     let result = context[objKey](...params); // 执行该函数

     // 删除key  防止污染
     delete context[objKey];

     return result;
}







