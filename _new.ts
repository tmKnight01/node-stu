#!/usr/bin/env node


/*
实现一个new操作符
*/

function _new(ClassOrFunc,...params) {
   /*
   new 操作符做了什么?
   1. 创建一个对象
   2. 将对象的proto属性指向构造函数的prototype 
   3. 执行构造函数,并且this指向
   */ 
  console.log('params',...params);
   const obj  = Object.create(ClassOrFunc.prototype); 
   const newObj = ClassOrFunc.apply(obj,params);
   
    // 当调用构造函数时，可能会返回一个继承的object 所以需要判断下apply返回的是否是object
    if(typeof newObj == 'object'){
        return newObj;
    } else {
     return obj
    }

}
// 用法
function Person(name, age) {
    this.name = name;
    this.age = age;

    // 如果构造函数内部，return 一个引用类型的对象，则整个构造函数失效，而是返回这个引用类型的对象，而不是返回this
    // 在实例中就没法获取Person原型上的getName方法
}
Person.prototype.say = function () {
    console.log(this.age);
};
let p1 = _new(Person,'porty', 18);
p1.say();