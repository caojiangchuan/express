const connection = require('../bin/mysql');
var sql = 'SELECT * FROM posts';

connection.connect();

// 查询语句
const find = (req, res) => {
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
};
// 新增信息
const add = (req, res) => {
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
        console.log('INSERT ID:', result);
    });
};
// 更改数据
const change = (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    var modSql = 'UPDATE posts SET title = ? WHERE id = ?';
    var modSqlParams = [title, id];
    connection.query(modSql, modSqlParams, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }

        console.log('UPDATE affectedRows', result.affectedRows);
        res.send(result);
    });
};
// 删除数据
const del = (req, res) => {
    let id = req.query.id;
    var delSql = `DELETE FROM posts where id=${id}`;
    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('DELETE affectedRows', result.affectedRows);
        res.send(result);
    });
};
// 按需查找
const choose = (req, res) => {
    let id = req.query.id;
    let title = req.query.title;
    if (title) {
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
};
// 动态路由
const active = (req, res) => {
    res.render('active');
    // console.log(req.params.id);
    // let id = req.params.id;
    var delSql = `SELECT * FROM posts WHERE id=${id}`; // 模糊搜索
    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('DELETE affectedRows', result.affectedRows);
        res.send(result);
    });
};

// 查看接口
const query = (req, res) => {

    var delSql = 'SELECT * FROM mock_api';

    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('DELETE affectedRows', result.affectedRows);
        res.send(result);
    });
};
// 动态路由
const getmes = (req, res) => {
    let api_name = req.query.api_name;
    var delSql = `SELECT * FROM mock_data WHERE name_data='${api_name}'`;
    console.log(req.query.api_name);

    connection.query(delSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('DELETE affectedRows', result.affectedRows);
        res.send(result);
    });
};
module.exports = {
    find,
    add,
    change,
    del,
    choose,
    active,
    query,
    getmes
};
