var express = require('express');
var router = express.Router();

const UserController = require("../controllers/UserController.js");

/* GET users listing. */
router.get('/form/', (req, res, next) => UserController.renderForm(req, res, next));
router.get('/form/:id', (req, res, next) => UserController.renderForm(req, res, next));
router.delete('/delete/:id', (req, res, next) => UserController.remove(req, res, next));
router.post("/", (req, res, next) => UserController.create(req, res, next))
router.get('/', (req, res, next) => UserController.getUsers(req, res, next));
router.put('/:id', (req, res, next) => UserController.update(req, res, next));
router.get('/:userId', (req, res, next) => UserController.getUser(req, res, next));

module.exports = router;
