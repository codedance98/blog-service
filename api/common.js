const express = require("express");
let api = express.Router();
const sgMail = require("@sendgrid/mail");
const connection = require ('../db/main.js');

api.post("/admin/user/login", async function(req, res) {
    let t = {
        account: req.body.account,
        password: req.body.password
    };
    let sql = `select * from admin_user where account = '${t.account}' and password = '${t.password}'`;
    connection.query(sql, function (err, result) {
        if (err || result.length == 0) {
            res.json({
                msg: err,
                code: 400
            })
            console.log(err)
        } else {
            res.json({
                code: 0,
                msg: '操作成功',
                data: {
                    account: req.body.account
                }
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

api.post("/mail/send",function(req, res) {
    let res_another = res;
    let result = [];
    req.body.toArr.forEach((item, idx) => {
        sgMail.setApiKey('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');
        const msg = {
            to: item,
            from: 'Info@filecoinmine.me',
            subject: req.body.subject,
            text: req.body.contentText,
            html: req.body.contentHtml
        }
        sgMail.send(msg).then((res)=> {
            console.log(`发送${item}邮件：成功`)
            console.log(res)
            res.email = item;
            result.push(res)
            if(result.length === req.body.toArr.length){
                res_another.status(200)
                res_another.json({
                    data: result
                })
            }
        }).catch((err)=> {
            console.log(`发送${item}邮箱：失败`)
            console.log(err)
            res.email = item;
            result.push(err)
            if(result.length === req.body.toArr.length){
                res_another.status(200)
                res_another.json({
                    data: result
                })
            }
        })
    })
});
module.exports = api;