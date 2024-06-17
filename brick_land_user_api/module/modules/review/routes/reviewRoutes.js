const reviewRoutes = require("express").Router();
const { jwtVerify } = require("../../../../helper/authHandler");
const {
    addReview,
    reviewList,
    reviewDetails,
    updateReview,
    addReviewProductMultiple
} = require("../controller/reviewHandler");

reviewRoutes.post("/add", jwtVerify, addReview);
reviewRoutes.post("/product/add", jwtVerify, addReviewProductMultiple);
reviewRoutes.get("/list", jwtVerify, reviewList);
reviewRoutes.get("/details", jwtVerify, reviewDetails);
reviewRoutes.put("/update", jwtVerify, updateReview);

module.exports = reviewRoutes;