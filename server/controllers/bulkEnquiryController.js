const pool = require("../config/db");

const nodemailer = require("nodemailer");

/* CREATE ENQUIRY */

const createBulkEnquiry = async (
  req,
  res
) => {
  try {

    const {
      fullName,
      companyName,
      country,
      email,
      phone,
      product,
      quantity,
      message,
    } = req.body;

    const newEnquiry =
      await pool.query(

        `
        INSERT INTO bulk_enquiries
        (
          full_name,
          company_name,
          country,
          email,
          phone,
          product,
          quantity,
          message
        )

        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8)

        RETURNING *
        `,

        [
          fullName,
          companyName,
          country,
          email,
          phone,
          product,
          quantity,
          message,
        ]
      );

    /* EMAIL NOTIFICATION */

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject: "New Bulk Enquiry",

      html: `
        <h2>New Bulk Enquiry Received</h2>

        <p><b>Full Name:</b> ${fullName}</p>

        <p><b>Company Name:</b> ${companyName}</p>

        <p><b>Country:</b> ${country}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Phone:</b> ${phone}</p>

        <p><b>Product:</b> ${product}</p>

        <p><b>Quantity:</b> ${quantity}</p>

        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(201).json({
      success: true,

      enquiry: newEnquiry.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,

      message: "Failed to submit enquiry",
    });
  }
};

/* GET ALL ENQUIRIES */

const getBulkEnquiries = async (
  req,
  res
) => {
  try {

    const enquiries =
      await pool.query(
        `
        SELECT *
        FROM bulk_enquiries
        ORDER BY created_at DESC
        `
      );

    res.status(200).json(
      enquiries.rows
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,

      message:
        "Failed to fetch enquiries",
    });
  }
};

/* DELETE ENQUIRY */

const deleteBulkEnquiry = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM bulk_enquiries
      WHERE id = $1
      `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
    });
  }
};

module.exports = {
  createBulkEnquiry,
  getBulkEnquiries,
  deleteBulkEnquiry,
};