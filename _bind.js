#!/usr/bin/env node
/*
  实现bind函数
  bind函数和apply函数相比，需要返回一个函数 这里涉及到边界问题 需要考虑的东西是
  当返回的函数作为构造函数使用时 也要保证不丢失this的指向
*/
Function.prototype._bind = function (context = window, ...params) {
    
    if (typeof context !== 'object') context = new Object(context);

     const that = this;
    // let fnKey = Symbol();
    // context[fnKey] = this;

    let resFunc = function (...innerArg) {   
        // 判断 resFunc 是否作为了构造函数 如果作为了构造函数 那么 this 则指向
        console.log('xxx',this instanceof resFunc, this,that );
       return that.apply(this instanceof resFunc ? this : context,  params.concat(innerArg));
    }
    // 如果作为构造函数 那么需要resFunc 继承 this的原型对象
    resFunc.prototype = Object.create(this.prototype);

    return resFunc;

}

const bindObj = {
     name: 'poetries',
     age: 18
}

function Myage() {
    console.log('myAge', this.age);
}

// Myage._bind(bindObj)();

// 测试用例


// 充当构造函数
function MyPerson(name, age) {
  console.log('Person name：', name);
  console.log('Person age：', age);
  console.log('Person this：', this); // 构造函数this指向实例对象
//   this.name = name;
}


// 普通函数
function normalFun(name, age) {
  console.log('普通函数 name：', name); 
  console.log('普通函数 age：', age); 
  console.log('普通函数 this：', this);  // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
}


MyPerson.prototype.sayName = function(){
    console.log('say Name');
}

// const Son = MyPerson._bind(bindObj,'xin shi hao');
// const child = new Son(24);

const bindNormFun = normalFun._bind(bindObj,'清合',0);
bindNormFun();


