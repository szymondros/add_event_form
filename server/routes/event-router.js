const express = require('express')

const EventCtrl = require('../controllers/event-ctrl');

const router = express.Router();

router.post('/event', EventCtrl.createEvent)

module.exports = router;