const express = require("express");
const db = require('mongoose');
let api = express.Router();
// const UserModel = require("../db/models/user.js");
// const db_add = 'mongodb+srv://codedance98:liliangqi1@cluster0-cjz8o.mongodb.net/test?retryWrites=true&w=majority';
// db.connect(db_add);
const connection = require ('../db/main.js');

api.post("/create", function(req, res) {
    console.log('进入create')
    let t = {
        title:req.body.title,
        author:req.body.author,
        content:req.body.content
    };
    var sql = 'insert into article set title=? , content=? , author=?'
    var add_value = [t.title, t.content, t.author]
    connection.query(sql, add_value, function (err, result) {
        console.log(result)
        console.log(111)
        console.log(err)
        if (err) {
            console.log('新增数据失败');
            res.send('新增数据失败') //  
        }else{
            res.send('增加数据成功') //   响应内容 增加数据成功
        }   
        
    });
    // var user = new UserModel({
    //     name:req.body.name,
    //     age:req.body.age,
    //     sex:req.body.sex,
    //     email:req.body.email,
    //     instructions:req.body.instructions
    // });
    // user.save(function (err) {
    //     if (err) {
    //         console.log("Error:" + err.message);
    //     }
    //     else {
    //         res.json({
    //             ...t,
    //             msg:'保存成功'
    //         });
    //     }
    // });
});

api.get("/findAll", function(req, res) {
    // UserModel.find(function(err, ret){
    //     // console.log(err)
    //     // console.log(ret)
    //     if(err){
    //        console.log('查询失败')
    //     } else {
    //         console.log(ret)
    //         res.json(ret);
    //     }
    // })
    var sql = 'select * from article';
    connection.query(sql, function (err, result) {
        // 没报错的情况err为null
        if (err) {
            console.log('err:', err.message);
        }
        console.log(11)
        console.log(result);
        res.status(200),
        res.json(result)
    });
    
});
api.delete("/delete", async function(req, res) {
    // let wherestr = {'_id' : req.id};
    await UserModel.findByIdAndDelete(req.body.id, req.body)
    res.json({
        msg:'删除成功'
    });
    // res.json({
    //     msg:'删除成功'
    // });
    // UserModel.remove(wherestr, function(err, res){
        // if (err) {
        //     console.log("Error:" + err);
        // }
        // else {
        //     res.json({
        //         msg:'删除成功'
        //     });
        // }
    // })
});
module.exports = api;