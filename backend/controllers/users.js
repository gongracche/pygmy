const db = require('../models');
const { check, validationResult } = require('express-validator');

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(422);
    }

    const user = {
        name: req.body.name,
        email: req.body.email
    };

    db.Users.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.sendStatus(500);
    })
};

exports.createValidation = [
    check('name').not().isEmpty(),
    check('email').not().isEmpty()
];

exports.findAll = (req, res) => {
    db.Users.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.sendStatus(500);
    })  
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    db.Users.findByPk(id)
    .then(data => {
        if(data === null) {
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    })
    .catch(err => {
        res.sendStatus(500);
    })
};

exports.update = (req, res) => {
    const id = req.params.id;
    db.Users.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User was updated successfully."
            })
        } else if (num == 0) {
            res.send({
                message: "Cannot update Note with id=${id}. May be Note was not found or request body was empty."
            })
        } else {
            res.send({
                message: "User was updated successfully."
            })
        }
    })
    .catch(err => {
        res.sendStatus(500);
    })
};

exports.updateValidation = [
    check('id').custom((value, { req }) => {
        if(req.body.id !== req.params.id) {
            throw new Error("data's id not match for param's id.");
        }
    }),
    check('name').not().isEmpty()
];

exports.delete = (req, res) => {
    const id = req.params.id;
    db.Users.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully."
            })
        } else if (num == 0) {
            res.send({
                message: "Cannot delete Note with id=${id}. May be User was not found or request body was empty."
            })
        } else {
            res.send({
                message: "User was deleted successfully."
            })
        }
    })
    .catch(err => {
        res.send(500).send({
            message: "Error delete Note with id=" + id
        })
    })
};
