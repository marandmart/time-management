var express = require('express');
const Controller = require("../controllers/IndexController");
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => Controller.get(req, res, next));

module.exports = router;
