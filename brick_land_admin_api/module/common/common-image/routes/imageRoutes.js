const imageRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
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

imageRoutes.post("/image", jwtAdminVerify, uploadImagesS3.single('image'), uploadImage);
imageRoutes.post("/images", jwtAdminVerify, uploadImagesS3.array('image'), uploadMultipleImage);
imageRoutes.post("/video", jwtAdminVerify, uploadVideosS3.single('video'), uploadVideo);
imageRoutes.post("/videos", jwtAdminVerify, uploadVideosS3.array('video'), uploadMultipleVideo);
imageRoutes.post("/doc", jwtAdminVerify, uploadDocumentsS3.single('doc'), uploadDocuments);
imageRoutes.post("/docs", jwtAdminVerify, uploadDocumentsS3.array('doc'), uploadMultipleDocuments);
imageRoutes.post("/delete", jwtAdminVerify, deleteFile);

module.exports = imageRoutes;
