/*
实现call函数
*/

Function.prototype._call = function (context = window, ...params) {
    /*
    1. call函数改变了函数执行的this指向，
    2. 运行执行者函数
    */
    // 使用Symbol作为key  避免key重名 
    if (typeof context !== 'object') context = new Object(context);
    const objKey = Symbol();
    context[objKey] = this;  // this就是需要执行的函数 给context上下文加一个该函数

    let result = context[objKey](...params); // 执行该函数

    delete context[objKey];

    return result;

}


const obj = {
    name:'xin'
}

function MyName(){
    console.log('myName',this.name);
}

MyName._call(obj,'');