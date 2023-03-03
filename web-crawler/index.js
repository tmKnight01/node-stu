const express = require('express');
// const { axios}
const app = express();
app.get('/',(req,res)=>{
    res.send('服务已启动');
})


module.exports =app;