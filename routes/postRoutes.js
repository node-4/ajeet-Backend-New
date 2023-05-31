const express = require("express");
const router = express.Router();
const path = require("path");

const postController = require("../controllers/post.controller");
const { route } = require("./create-bidRoutes");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname} ${Date.now() + file.originalname}.${ext}`);
//   },
// });

// const fileFilter = function fileFilter(req, file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;

//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: fileFilter,
// });

router.post("/uploadfile", postController.addPost);

router.post(
  "/uploadmultiple",
  //upload.array("myFiles", 12),
  (req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(files);
  }
);

// router.post("/audio/upload", async (req, res) => {
//   // Get the file name and extension with multer
//   const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//       const fileExt = file.originalname.split(".").pop();
//       const filename = `${new Date().getTime()}.${fileExt}`;
//       cb(null, filename);
//     },
//   });

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // // Set the storage, file filter and file size with multer
  // const upload = multer({
  //   storage,
  //   limits: {
  //     fieldNameSize: 200,
  //     fileSize: 5 * 1024 * 1024,
  //   },
  //   fileFilter,
  // }).single("audio");

  // upload to cloudinary
//   upload(req, res, (err) => {
//     if (err) {
//       return res.send(err);
//     }

//     // SEND FILE TO CLOUDINARY
//     cloudinary.config({
//       cloud_name: "dbrvq9uxa",
//       api_key: "567113285751718",
//       api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
//     });
//     console.log(req.file);
//     const { path } = req.file; // file becomes available in req at this point

//     const fName = req.file.originalname.split(".")[0];
//     cloudinary.uploader.upload(
//       path,
//       {
//         resource_type: "raw",
//         public_id: `AudioUploads/${fName}`,
//       },

//       // Send cloudinary response or catch error
//       (err, audio) => {
//         if (err) return res.send(err);

//         // fs.unlinkSync(path);
//         res.send(audio);
//       }
//     );
//   });
// });

router.get("/", postController.getPost);
module.exports = router;
