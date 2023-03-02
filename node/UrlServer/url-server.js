'use strict'
const
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  http = require('http');
/* process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。
第一个元素为process.execPath。
第二个元素为当前执行的JavaScript文件路径。
剩余的元素为其他命令行参数。
因此，我们把要编译的文件名从第三个参数开始去设置，也意味着每次可以指定一个或多个文件去进行相应的处理。
*/
const root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

function succ(filePath,resp,address){
    console.log('200'+ address);

    // output to response
    resp.writeHead(200,{'Content-Type': 'text/html'});
    fs.createReadStream(filePath).pipe(resp);
};

function failed(resp,address){
    console.log('404'+ address);
    resp.writeHead(404);
    resp.end('404 NOT Found');
};


// 递归函数
//递归函数
function readRightFile(filepathArr, callback, index = 0) {
    //终止判断
    if (filepathArr.length <= index) {
      return false;
    }
    fs.stat(filepathArr[index], function(err) {
      if (err) { //如果异常但不是最后一条则继续递归
        if (index == filepathArr.length) {
          //如果最后一条仍然报错则表示目录中无法找到缺省文件
          callback(false);
          return false;
        }
        index += 1;
        readRightFile(filepathArr, callback, index);
      } else {
        //找到之后再回调函数中返回对应路径
        callback(filepathArr[index]);
      }
    })
  }

  // 创建服务器:
const server = http.createServer((request, response) => {
    // 获得URL的path
    const pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    const filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, (err, stats) => {
      if (err) {
        // 出错了或者文件不存在:
        failed(response, request.url);
      } else {
        if(stats.isFile()) {
          // 是文件
          succ(filepath, response, request.url);
        } else {
          console.log('Directory');
          // 获取省缺文件目录数组
         const  filepathArr = [
            path.join(root, "/index.html"),
            path.join(root, "/default.html")
          ];
          readRightFile(filepathArr, (filepath) => {
            if (filepath) {
              succ(filepath, response, response);
            } else  {
              failed(response, request.url);
            }
          });
        }
      }
    });
  });

  module.exports = server;





