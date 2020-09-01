const express = require("express");
const db = require('mongoose');
let api = express.Router();
// const UserModel = require("../db/models/user.js");
// const db_add = 'mongodb+srv://codedance98:liliangqi1@cluster0-cjz8o.mongodb.net/test?retryWrites=true&w=majority';
// db.connect(db_add);
const connection = require ('../db/main.js');

api.post("/admin/create", function(req, res) {
    console.log('进入create')
    let t = {
        title: req.body.title,
        type: JSON.stringify(req.body.type),
        content: req.body.content
    };
    var sql = 'insert into article set title=? , type=? , content=?'
    var add_value = [t.title, t.type, t.content]
    connection.query(sql, add_value, function (err, result) {
        if (err) {
            console.log(err);
            res.json({
                msg: '错误',
                code: 400
            })  
        }else{
            res.json({
                msg: '操作成功',
                code: 0
            })
        }
    });
});

api.get("/web/findAll", function(req, res) {
    console.log('findall')
    var sql = 'select * from article';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        res.status(200),
        res.json(result)
    });
});
api.get("/web/findOne", function(req, res) {
    console.log('findOne')
    // req.params  {}
    console.log(req.query.id)
    let sql = `select * from article where id = '${req.query.id}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        res.status(200),
        res.json(result[0])
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

api.post("/admin/user/login", async function(req, res) {
    let t = {
        account: req.body.account,
        password: req.body.password
    };
    let sql = `select * from admin_user where account = '${t.account}' and password = '${t.password}'`;
    // console.log(sql)
    connection.query(sql, function (err, result) {
        // console.log(result)
        if (err || result.length == 0) {
            res.json({
                msg: '账号或密码错误',
                code: 400
            })
            console.log(err)
        } else {
            res.json({
                msg: '操作成功',
                code: 0
            })
        }
    })
});

api.post("/admin/user/register", async function(req, res) {
    let t = [req.body.account, req.body.password]
    let sql = `insert into admin_user set account=?, password=?`;
    connection.query(sql, t, function (err, result) {
        if(err){
            res.status(200)
            res.json("失败")
            console.log(err)
        }else{
            res.status(200)
            res.json("成功")
        }
    })
});

module.exports = api;