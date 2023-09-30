var express = require('express');
var router = express.Router();

const notes = require('../controllers/notes');

/** Create Note */
router.post('/', notes.create);

/** Retrieve Notes listing. */
router.get('/', notes.findAll);

/** Retrieve Note by id */
router.get('/:id', notes.findOne);

/** Update Note by id */
router.put('/', notes.update);

module.exports = router;
