const imageRoutes = require("express").Router();
const { jwtCustomerVerify } = require("../../../../helper/authHandler");
const { uploadImagesS3, uploadVideosS3, uploadDocumentsS3 } = require("../../../../helper/s3BucketHelper");
const {
  uploadMultipleImage,
  uploadImage,
  uploadMultipleVideo,
  uploadVideo,
  uploadMultipleDocuments,
  uploadDocuments,
  deleteFile
} = require("../controller/imageHandler");

imageRoutes.post("/image", jwtCustomerVerify, uploadImagesS3.single('image'), uploadImage);
imageRoutes.post("/images", jwtCustomerVerify, uploadImagesS3.array('image'), uploadMultipleImage);
imageRoutes.post("/video", jwtCustomerVerify, uploadVideosS3.single('video'), uploadVideo);
imageRoutes.post("/videos", jwtCustomerVerify, uploadVideosS3.array('video'), uploadMultipleVideo);
imageRoutes.post("/doc", jwtCustomerVerify, uploadDocumentsS3.single('doc'), uploadDocuments);
imageRoutes.post("/docs", jwtCustomerVerify, uploadDocumentsS3.array('doc'), uploadMultipleDocuments);
imageRoutes.post("/delete", jwtCustomerVerify, deleteFile);

module.exports = imageRoutes;
