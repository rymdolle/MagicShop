const express = require('express');
const router = express.Router();

router.get('/items', (req, res) => {
    req.db.query('SELECT id, name, description, price FROM item', (err, result) => {
        if (err) {
            console.error('Database query error', err);
            return res.status(500).send();
        }

        res.json(result);
    });
});

router.get('/item/:id', (req, res) => {
    const { id } = req.params;
    req.db.query('SELECT id, name, description, price FROM item WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Database query error', err);
            return res.status(500).send();
        }

        if (result.length === 0)
            return res.status(404).send();

        res.json(result[0]);
    });
});

module.exports = router;
