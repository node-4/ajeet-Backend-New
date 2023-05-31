
const path = require("path");

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
//   const filetypes = /jpeg|jpg|png|gif|pdf|ppt|json|txt/;

//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   console.log(extname)
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype || extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// };

const upload = () => {
  
}

module.exports = upload;
