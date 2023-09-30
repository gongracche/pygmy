const db = require('../models');
const { check, validationResult } = require('express-validator');

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(400).json({ errors: errors.array() });
    }

    const user = {
        name: req.body.name
    };

    db.Users.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the user."
        });
    })

};

exports.createValidation = [
    check('name').not().isEmpty()
];

exports.findAll = (req, res) => {
    db.Users.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
        });
    })  
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    db.Users.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users with id = " + id + "."
        });
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
                message: "Note was updated successfully."
            })
        } else {
            res.send({
                message: "Cannot update Note with id=${id}. May be Note was not found or request body was empty."
            })
        }
    })
    .catch(err => {
        res.send(500).send({
            message: "Error updating Note with id=" + id
        })
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
        } else {
            res.send({
                message: "Cannot delete Note with id=${id}. May be User was not found or request body was empty."
            })
        }
    })
    .catch(err => {
        res.send(500).send({
            message: "Error delete Note with id=" + id
        })
    })
};
