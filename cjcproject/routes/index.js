const express = require('express');
var bodyParser = require('body-parser');
const nodemysql = require('../controller/nodemysql');
var router = express.Router();

/* post请求插件 */
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
// 查
router.get('/', (req, res) => {
    res.render('index', {title: '标题', message: '信息'});
});

/* 查数据 */
router.get('/find', nodemysql.find);

/* 新增数据 */
router.post('/add', urlencodedParser, nodemysql.add);

/* 更改数据 */
router.post('/change', urlencodedParser, nodemysql.change);

/* 删除 */
router.get('/del', nodemysql.del);

/* 按需查找 */
router.get('/choose', nodemysql.choose);
// connection.end();
module.exports = router;
