#!/usr/bin/env node 
const fs = require('fs');
const chalk = require("chalk");
const server = require('../server.js');
const urlServer = require('../url-server/url-server.js');
const app = require('../web-crawler/index.js');
const cheerio = require('cheerio');
const path = require('path');
const { default: axios } = require('axios');
console.log('Hello Node Cli~');

// 读取文件
// fs.readFile('exmple.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log("err:",err);
//     }else{
//         console.log('data:',data);
//     }
// });
// const data = `现在的时间是${new Date()}`
// // 编写文件
// fs.writeFile('exmple.txt',data,(err)=>{
//     if(err){
//         console.log('err:',err);
//     }else{
//         console.log('ok.');
//     }
// })

// // 获取文件大小，创建时间等
// const fileInfo =  fs.statSync('exmple.txt');

//         // 是否是文件:
//         console.log('isFile: ' + fileInfo.isFile());
//         // 是否是目录:
//         console.log('isDirectory: ' + fileInfo.isDirectory());
//         if (fileInfo.isFile()) {
//             // 文件大小:
//             console.log('size: ' + fileInfo.size);
//             // 创建时间, Date对象:
//             console.log('birth time: ' + fileInfo.birthtime);
//             // 修改时间, Date对象:
//             console.log('modified time: ' + fileInfo.mtime);
// }

/*
stream
Node提供的仅在服务区端可用的模块，目的是支持“流”这种数据结构
标准输入流（stdin）：从键盘输入到应用程序的数据流
标准输出流（stdout）：从应用程序输出到显示器的数据流
流的特点是数据有序，而且必须依次读取，或者依次写入，不能像Array那样随机定位
在Node.js中，流是对象，只需要响应流的事件：data事件表示流的数据已经可以读取了，end事件表示这个流已经到末尾了，没有数据可以读取了，error事件表示出错了。
*/

// 打开一个流
// const rs = fs.createReadStream('exmple.txt','utf-8');
// let count = 1;
// // 要注意， data事件可能会有多次，每次传递的chunk是流的一部分数据
// rs.on('data',(chunk)=>{
//    console.log('count:',count,'Data:');
//    console.log(chunk);
// });
// rs.on('end',()=>{
//     console.log('读取流结束');
// })

/*
写入文件流数据
要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束：
*/
// const ws = fs.createWriteStream('ouput.ts','utf-8');
// ws.write('//Write Start\n');
// ws.write('const a = 1;\n');
// ws.write('const b = 2;\n');
// ws.write('//END');
// ws.end();

/*
pipe
一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。
在Node.js中，通过Readable流的pipe()方法实现
pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，实际上是一个复制文件的程序
*/
// server.listen(8080);

/*
url 文件服务器
*/
// urlServer.listen(8080);
// console.log('Server is running at ' + chalk.bgBlue.bold('http://127.0.0.1:8080/file/index.html....'));

/*
网络爬虫服务器
*/
const Netserver = app.listen(8080,()=>{
     console.log('Listening on port %d',`${Netserver.address().port}`);
});
const img_url = 'https://pic.netbian.com/'; //请求地址
const imgDir = path.join(__dirname,'./cache/img/'); // 保存地址

// 获取路径模板
function geturlHtml(){
   return  axios.get(img_url);
}
// 获取html文件内的图片地址集合
function  getImgUrl (){
    console.log('test');
 geturlHtml().then(res => {
    const $ = cheerio.load(res.data);
    console.log('res',$('.clearfix'));
    const result_list = [];
    $('.clearfix').each(item =>{
        console.log('url',$(item));
        result_list.push({
            url: $(item,'li','a').find('img').attr('src')
        })
    })
 }).catch(err =>{
     console.log('err',err);
 })
}
getImgUrl();



