
const sendEmail = require("../utils/sendEmail");


const express = require("express");

const router = express.Router();

const pool = require("../config/db");


// ANALYTICS

router.get("/analytics/summary", async (req, res) => {
  try {

    const totalOrders = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    const totalRevenue = await pool.query(
      `
      SELECT COALESCE(SUM(total_price), 0)
      FROM orders
      `
    );

    const recentOrders = await pool.query(
      `
      SELECT *
      FROM orders
      ORDER BY id DESC
      LIMIT 5
      `
    );

    res.json({
      totalOrders: totalOrders.rows[0].count,

      totalRevenue:
        totalRevenue.rows[0].coalesce,

      recentOrders: recentOrders.rows,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// PLACE ORDER

router.post("/", async (req, res) => {
  try {

    const {
      user_id,
      customer_name,
      customer_email,
      product_name,
      quantity,
      total_price,
      shipping_address,
    } = req.body;

    const newOrder = await pool.query(
      `
      INSERT INTO orders
      (
        user_id,
        customer_name,
        customer_email,
        product_name,
        quantity,
        total_price,
        shipping_address
      )

      VALUES ($1,$2,$3,$4,$5,$6,$7)

      RETURNING *
      `,
      [
        user_id,
        customer_name,
        customer_email,
        product_name,
        quantity,
        total_price,
        shipping_address,
      ]
    );

await sendEmail(
  customer_email,

  "FreshIndia Order Confirmation",

  `
Hello ${customer_name},

Your order for ${product_name}
has been placed successfully.

Quantity: ${quantity}

Total Price: $${total_price}

Thank you for choosing FreshIndia.
  `
);

    res.status(201).json(newOrder.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// GET ALL ORDERS

router.get("/", async (req, res) => {
  try {

    const orders = await pool.query(
      "SELECT * FROM orders ORDER BY id DESC"
    );

    res.json(orders.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// UPDATE ORDER

router.put("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const { status, tracking_id } = req.body;

    const updatedOrder = await pool.query(
      `
      UPDATE orders

      SET
      status = $1,
      tracking_id = $2

      WHERE id = $3

      RETURNING *
      `,
      [status, tracking_id, id]
    );

await sendEmail(

  updatedOrder.rows[0]
    .customer_email,

  "FreshIndia Order Update",

  `
Hello ${updatedOrder.rows[0].customer_name},

Your order status has been updated.

New Status:
${status}

Tracking ID:
${tracking_id || "Not Assigned Yet"}

Thank you for choosing FreshIndia.
  `
);

    res.json(updatedOrder.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// DASHBOARD STATS

router.get("/dashboard/stats", async (req, res) => {
  try {

    // TOTAL ORDERS

    const orders = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    // TOTAL REVENUE

    const revenue = await pool.query(
      `
      SELECT COALESCE(SUM(total_price),0)
      FROM orders
      `
    );

    // TOTAL PRODUCTS

    const products = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    // TOTAL USERS

    const users = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    res.json({
      totalOrders: orders.rows[0].count,

      totalRevenue:
        revenue.rows[0].coalesce,

      totalProducts:
        products.rows[0].count,

      totalUsers:
        users.rows[0].count,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ADVANCED ANALYTICS

router.get("/analytics/full", async (req, res) => {
  try {

    // TOTAL REVENUE

    const revenue = await pool.query(
      `
      SELECT COALESCE(SUM(total_price),0)
      FROM orders
      `
    );

    // TOTAL ORDERS

    const orders = await pool.query(
      `
      SELECT COUNT(*)
      FROM orders
      `
    );

    // PRODUCT COUNT

    const products = await pool.query(
      `
      SELECT COUNT(*)
      FROM products
      `
    );

    // USERS

    const users = await pool.query(
      `
      SELECT COUNT(*)
      FROM users
      `
    );

    // TOP PRODUCTS

    const topProducts = await pool.query(
      `
      SELECT
        product_name,
        COUNT(*) as total_orders

      FROM orders

      GROUP BY product_name

      ORDER BY total_orders DESC

      LIMIT 5
      `
    );

    res.json({
      totalRevenue:
        revenue.rows[0].coalesce,

      totalOrders:
        orders.rows[0].count,

      totalProducts:
        products.rows[0].count,

      totalUsers:
        users.rows[0].count,

      topProducts:
        topProducts.rows,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// GET USER ORDERS

router.get("/user/:userId", async (req, res) => {
  try {

    const { userId } = req.params;

    const orders = await pool.query(
      `
      SELECT *
      FROM orders

      WHERE user_id = $1

      ORDER BY id DESC
      `,
      [userId]
    );

    res.json(orders.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;