const express = require("express");
let api = express.Router();

api.post("/girl/create", function(req, res) {
    let t = req.body;
    var sql = 'insert into girl set nickname=?, born_year=?, job=?, native_place=?, work_place=?, ref=?, character=?, other=?'
    var data = [t.nickname, t.born_year, t.job, t.native_place, t.work_place, t.ref, t.character, t.other]
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

api.get("/girl/list", function(req, res) {
    var sql = 'select * from girl';
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
                    ...item
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

api.get("/girl/get", function(req, res) {
    let data = [req.query.id];
    let sql = `select * from girl where id = ?`;
    connection.query(sql, data, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        res.status(200),
        res.json({
            code: 0,
            msg: '',
            data: result[0]
        })
    });
});

api.put("/girl/update", function(req, res) {
  let t = req.body
  let data = [t.nickname, t.born_year, t.job, t.native_place, t.work_place, t.ref, t.character, t.other, t,id]
  let sql = 'update girl set nickname=?, born_year=?, job=?, native_place=?, work_place=?, ref=?, character=?, other=? where id=?'
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

api.delete("/girl/delete", async function(req, res) {
  var sql = `delete from girl where id = ${req.body.id}`
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
module.exports = api;