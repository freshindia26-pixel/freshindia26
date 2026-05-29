
const express = require("express");

const router = express.Router();

const pool = require("../config/db");


// GET PRODUCTS

router.get("/", async (req, res) => {
  try {

    const products = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(products.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ADD PRODUCT

router.post("/", async (req, res) => {
  try {

    const {
      name,
      category,
      description,
      price,
      stock,
      image_url,
    } = req.body;

    const newProduct = await pool.query(
      `
      INSERT INTO products
      (
        name,
        category,
        description,
        price,
        stock,
        image_url
      )

      VALUES ($1,$2,$3,$4,$5,$6)

      RETURNING *
      `,
      [
        name,
        category,
        description,
        price,
        stock,
        image_url,
      ]
    );

    res.status(201).json(newProduct.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// DELETE PRODUCT

router.delete("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [id]
    );

    res.json({
      message: "Product Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// UPDATE PRODUCT

router.put("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      category,
      description,
      price,
      stock,
      image_url,
    } = req.body;

    const updatedProduct = await pool.query(
      `
      UPDATE products

      SET
      name = $1,
      category = $2,
      description = $3,
      price = $4,
      stock = $5,
      image_url = $6

      WHERE id = $7

      RETURNING *
      `,
      [
        name,
        category,
        description,
        price,
        stock,
        image_url,
        id,
      ]
    );

    res.json(updatedProduct.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
