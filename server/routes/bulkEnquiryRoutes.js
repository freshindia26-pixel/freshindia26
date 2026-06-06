const express = require("express");

const router = express.Router();

const {
  createBulkEnquiry,
  getBulkEnquiries,
  deleteBulkEnquiry,
} = require("../controllers/bulkEnquiryController");

router.post("/", createBulkEnquiry);

router.get("/", getBulkEnquiries);

router.delete("/:id", deleteBulkEnquiry);

module.exports = router;