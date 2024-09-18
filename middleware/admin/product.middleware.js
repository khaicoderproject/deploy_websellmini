const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: "deg6aworl",
  api_key: "143667287442364",
  api_secret: "vT8DyIa7w0ZakFgise5h5iTTT2U", // Click 'View API Keys' above to copy your API secret
});
module.exports.uploadCloud = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log("url ảnh là: " + result.secure_url);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }
    upload(req);
  } else {
    next();
  }
};
