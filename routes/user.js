const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    req.db.query('SELECT id, name, email FROM user', (err, result) => {
        if (err) {
            console.error('Database query error', err);
            return res.status(500).send();
        }

        res.json(result);
    });
});

router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    req.db.query('SELECT id, name, email FROM user WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Database query error', err);
            return res.status(500).send();
        }

        if (result.length === 0)
            return res.status(404).send();

        res.json(result[0]);
    });
});

router.post('/user', (req, res) => {
    const {name, email} = req.body;
    req.db.query('INSERT INTO user (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) {
            console.error('Database query error', err);
            return res.status(500).send();
        }

        let user = {id: result.insertId, name, email};
        res.location(`/api/user/${user.id}`);
        res.status(201).json(user);
    });
});

router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    req.db.query('DELETE FROM user WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Database query error', err);
            return res.status(500).send();
        }

        if (result.affectedRows === 0)
            return res.status(404).send();

        res.status(204).send();
    });
});

module.exports = router;
