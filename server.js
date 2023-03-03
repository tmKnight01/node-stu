'use strict' 
// 导入 http模块
const http =  require('http');

// 创建http server 并传入回调函数 
const server = http.createServer((request,response)=>{
    // 回调函数接受require和response对象
    console.log(request.method +':'+ request.url);
    //将HTTP响应200写入response，同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    //将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口号
// server.listen(8080);

// console.log('Server is running ar http://127.0.0.1:8080/');


module.exports = server
