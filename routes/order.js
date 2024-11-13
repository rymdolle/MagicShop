const express = require('express');
const router = express.Router();

router.get('/order/:id',  async (req, res) => {
    const { id } = req.params;
    try {
        const pool = req.db.promise();
        const order = await getOrder(pool, id);
        if (!order) {
            return res.status(404).send();
        }
        console.log(order);
        res.json(order);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.post('/order', async (req, res) => {
    const { items, user } = req.body;
    console.log(items);
    if (items.length === 0)
        return res.status(400).json({error: 'No items in cart'});

    try {
        // Create order
        const pool = req.db.promise();
        const orderId = await createOrder(pool, user);

        // Create all order items
        for (const item of items) {
            await createOrderItem(pool, item, orderId);
        }

        // Update order total when all items are created
        await pool.query('UPDATE orders SET total = (SELECT SUM(order_item.price * order_item.quantity) AS total FROM order_item WHERE order_id = orders.id) WHERE id = ?', [orderId]);

        const order = await getOrder(pool, orderId);
        // Set location and return the new order
        res.location(`/api/order/${order.id}`);
        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err});
    }
});

async function createOrder(pool, user) {
    const sql = 'INSERT INTO orders (user) VALUES ((SELECT id FROM user WHERE email = ?))';
    const [result] = await pool.query(sql, [user]);
    return result.insertId;
}

async function createOrderItem(pool, item, orderId) {
    const [result] = await pool.query('SELECT id, price FROM item WHERE name = ?', [item.name]);
    item.price = result[0].price;
    const [orderItemResult] = await pool.query('INSERT INTO order_item (item, price, quantity, order_id) VALUES (?, ?, ?, ?)', [result[0].id, item.price, item.quantity, orderId]);

    return orderItemResult.insertId;
}

async function getOrder(pool, id) {
    const [result] = await pool.query('SELECT orders.id, user.name AS user, orders.total FROM orders INNER JOIN user ON orders.user = user.id WHERE orders.id = ?', [id]);
    if (result.length === 0)
        return null;

    const order = result[0];
    const [items] = await pool.query('SELECT item.name AS name, quantity, order_item.price FROM order_item INNER JOIN item ON order_item.item = item.id WHERE order_id = ?', [id]);
    order.items = items;

    return order;
}

module.exports = router;
