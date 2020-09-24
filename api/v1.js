const express = require("express");
const db = require('mongoose');
let api = express.Router();

const connection = require ('../db/main.js');

api.post("/article/create", function(req, res) {
    console.log('进入create')
    let t = {
        title: req.body.title,
        type: req.body.type ? req.body.type.join(',') : '',
        content: req.body.content,
        title_en: req.body.title_en
    };
    var sql = 'insert into article set title=? , type=? , content=? , title_en = ?'
    var data = [t.title, t.type, t.content]
    connection.query(sql, data, function (err, result) {
        if (err) {
            console.log(err);
            res.json({
                msg: err,
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

api.get("/article/findAll", function(req, res) {
    console.log('进入findall')
    var sql = 'select * from article';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json({
                msg: err,
                code: 400
            })
        }else{
            result = result.map((item)=>{
                return {
                    ...item,
                    type: item.type ? item.type.split(',') : ''
                }
            })
            res.status(200),
            res.json({
                code: 0,
                msg: '',
                data: result
            })
        }
    });
});
api.get("/article/findOneById", function(req, res) {
    console.log('进入findOne')
    let data = [req.query.id];
    let sql = `select * from article where id = ?`;
    connection.query(sql, data, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        result[0].type = result[0].type ? result[0].type.split(',') : '';
        res.status(200),
        res.json({
            code: 0,
            msg: '',
            data: result[0]
        })
    });
});
api.get("/article/findOne", function(req, res) {
    console.log('进入findOne')
    let data = [req.query.title];
    let sql = `update article set browse = browse + 1 where title_en = ?`;
    connection.query(sql, data, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json({
                msg: err,
                code: 400
            })
        }else{
            let sql = `select * from article where title_en = ?`;
            connection.query(sql, data, function (err, result) {
                if (err) {
                    console.log('err:', err.message);
                    res.json({
                        msg: err,
                        code: 400
                    })
                }else{
                    result[0].type = result[0].type ? result[0].type.split(',') : '';
                    res.status(200),
                    res.json({
                        code: 0,
                        msg: '',
                        data: result[0]
                    })
                }
            });
        }
    });

    
    
});
api.put("/article/update", function(req, res) {
    console.log('进入update')
    let t  = req.body
    console.log(t)
    let data = [t.title, t.type ? t.type.join(','): '', t.content, t.title_en, t.id];
    let sql = `update article set title = ? , type = ? , content = ? , title_en = ?  where id = ?`;
    connection.query(sql, data, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json({
                msg: err,
                code: 400
            })
        }else{
            res.status(200),
            res.json({
                code: 0,
                msg: ''
            })
        }
        
    });
});
api.delete("/article/delete", async function(req, res) {
    console.log('进入delete')
    var sql = `delete from article  where id = ${req.body.id}`
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('删除失败', err.message);
        }else{
            res.json({
                code: 0,
                msg: ''
            })
        }
    });
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
    let data = [req.body.account, req.body.password]
    let sql = `insert into admin_user set account=?, password=?`;
    connection.query(sql, data, function (err, result) {
        if(err){
            res.status(200)
            res.json({
                msg: 'error',
                code: 400
            })
            console.log(err)
        }else{
            res.status(200)
            res.json({
                msg: '',
                code: 0
            })
        }
    })
});

module.exports = api;