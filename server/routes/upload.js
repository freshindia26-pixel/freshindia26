
const express = require("express");

const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});


// IMAGE UPLOAD

router.post(
  "/",
  upload.single("image"),

  async (req, res) => {
    try {

      const file = req.file;

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "freshindia",
        }
      );

      res.json({
        imageUrl: result.secure_url,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Upload Failed",
      });
    }
  }
);

module.exports = router;
