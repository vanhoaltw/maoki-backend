const multer = require("multer");
// const path = require("path");

const uploadImage = multer({
  // fileFilter: (req, file, cb) => {
  //   const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  //   // Check allowed extensions
  //   const isAllowedExt = fileExts.includes(
  //     path.extname(file.originalname.toLowerCase())
  //   );

  //   // Mime type must be an image
  //   const isAllowedMimeType = file.mimetype.startsWith("image/");

  //   if (isAllowedExt && isAllowedMimeType) {
  //     return cb(null, true); // no errors
  //   }
  //   // pass error msg to callback, which can be displaye in frontend
  //   return cb("Error: File type not allowed!");
  // },

  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

module.exports = {
  uploadImage,
};
