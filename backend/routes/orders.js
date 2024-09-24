const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
  const { cartItems, total } = req.body;
  res.json({ message: 'Order placed successfully', cartItems, total });
});

module.exports = router;
