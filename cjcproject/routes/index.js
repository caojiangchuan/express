const connection = require('../bin/mysql');
const express = require('express');
var bodyParser = require('body-parser');
// const app = express();
var router = express.Router();

// console.log(con);

/* post请求插件 */
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

console.log(connection);

var sql = 'SELECT * FROM posts';
// 查
connection.connect();

router.get('/', (req, res) => {

    res.render('index', {title: '标题', message: '信息'});
});

/* 查数据 */
router.get('/find', (req, res) => {

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        res.send({
            data: result,
            code: '0000',
            status: 'success'
        });

    });
});

/* 新增数据 */
router.post('/add', urlencodedParser, (req, res) => {
    // connection.connect();
    let id = req.body.id;
    let title = req.body.title;
    var addSql = 'INSERT INTO posts(id,title) VALUES(?,?)';
    var addSqlParams = [id, title];
    connection.query(addSql, addSqlParams, function (err, result) {
        for (let i = 0; i < addSqlParams.length; i++) {
            if (addSqlParams[i] === '') {
                res.sendStatus(400);
                return;
            }

        }

        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        res.send({
            data: '添加成功'
        });

        // console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:', result);
    });
});

/* 更改数据 */
router.post('/change', urlencodedParser, (req, res) => {
    // connection.connect();
    let id = req.body.id;
    let title = req.body.title;

    var modSql = 'UPDATE posts SET title = ? WHERE id = ?';
    var modSqlParams = [title, id];
    // 改
    connection.query(modSql, modSqlParams, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }

        console.log('UPDATE affectedRows', result.affectedRows);
        res.send(result);

    });
});

/* 删除 */

router.get('/del', (req, res) => {
    // connection.connect();
    let id = req.query.id;

    var delSql = `DELETE FROM posts where id=${id}`;
    // 删
    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('DELETE affectedRows', result.affectedRows);
        res.send(result);

    });
});

/* 按需查找 */

router.get('/choose', (req, res) => {
    // connection.connect();
    let id = req.query.id;
    let title = req.query.title;

    if (title) {
        // var delSql = `SELECT * FROM posts where id=${id}`;
        var delSql = `SELECT * FROM posts WHERE title LIKE '%${title}%'`; // 模糊搜索
    }
    else {
        var delSql = 'SELECT * FROM posts';
    }

    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('DELETE affectedRows', result.affectedRows);
        res.send(result);

    });
});

// connection.end();

module.exports = router;
