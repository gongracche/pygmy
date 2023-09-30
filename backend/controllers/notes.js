const db = require('../models');

exports.create = (req, res) => {
    // Varidate request

    const note = {
        name: req.body.name,
        content: req.body.content
    };

    db.Notes.create(note)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the note."
        });
    })

};

exports.findAll = (req, res) => {
    db.Notes.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving notes."
        });
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    db.Notes.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving notes with id = " + id + "."
        });
    })
};

exports.update = (req, res) => {
    const id = req.params.id;
    db.Notes.update(req.body, {
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

exports.delete = (req, res) => {
    const id = req.params.id;
    db.Notes.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Note was deleted successfully."
            })
        } else {
            res.send({
                message: "Cannot delete Note with id=${id}. May be Note was not found or request body was empty."
            })
        }
    })
    .catch(err => {
        res.send(500).send({
            message: "Error delete Note with id=" + id
        })
    })
};