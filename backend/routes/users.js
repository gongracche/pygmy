var express = require('express');
var router = express.Router();

const users = require('../controllers/users');

/** Create User */
router.post('/', users.createValidation, users.create);

/** Retrieve Users listing. */
router.get('/', users.findAll);

/** Retrieve User by id */
router.get('/:id', users.findOne);

/** Update User by id */
router.put('/:id', users.updateValidation, users.update);

/** Delete User by id */
router.delete('/:id', users.delete);

module.exports = router;
