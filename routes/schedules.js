var express = require('express');
var router = express.Router();

const ScheduleController = require("../controllers/ScheduleController.js");

/* GET users listing. */
router.get('/', (req, res, next) => ScheduleController.getAll(req, res, next));
router.get('/new-schedule-form', (req, res, next) => ScheduleController.showForm(req, res, next));
router.get('/:scheduleId', (req, res, next) => ScheduleController.getOne(req, res, next));
router.post("/", (req, res, next) => ScheduleController.createOne(req, res, next))

module.exports = router;
