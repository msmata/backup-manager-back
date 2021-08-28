const util = require("util");
const multer = require("multer");
const maxSize = 3 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/media/pi/F4F68C07F68BC7F61/fotos/');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});

let uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize}
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;