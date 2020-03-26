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

/* 动态路由 */
router.get('/active/:id', nodemysql.active);
// 展示test
router.get('/test', (req, res) => {
    res.render('test');
});

// 获取信息页面
router.get('/getmes/:a/:b', nodemysql.getmes);
// (req, res) => {
//     res.render('getmes');

// });

/* 查看接口 */
router.get('/query', nodemysql.query);
// connection.end();
module.exports = router;
