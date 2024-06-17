const { Router } = require("express");
const baseRouter = Router();
const basePath = "/api/user";

const imageRoutes = require("../module/common/common-image/routes/imageRoutes");
const userRoutes = require("../module/common/user/routes/userRoutes");
const bannerRoutes = require("../module/common/banner/routes/bannerRoutes");
const categoryRoutes = require("../module/modules/category/routes/categoryRoutes");
const productRoutes = require("../module/modules/product/routes/productRoutes");
const pageRoutes = require("../module/common/static-pages/routes/staticPageRoutes");
const faqRoutes = require("../module/common/faq/routes/faqRoutes");
const testimonialRoutes = require("../module/common/testimonial/routes/testimonialRoutes");
const callbackRoutes = require("../module/common/callback/routes/callbackRoutes");
const cartRoutes = require("../module/modules/cart/routes/cartRoutes");
const couponRoutes = require("../module/modules/coupon/routes/couponRoutes");
const addressRoutes = require("../module/modules/user-address/routes/addressRoutes");
const orderRoutes = require("../module/modules/order/routes/orderRoutes");

baseRouter.use("/", userRoutes);
baseRouter.use("/upload", imageRoutes);
baseRouter.use("/banner", bannerRoutes);
baseRouter.use("/category", categoryRoutes);
baseRouter.use("/product", productRoutes);
baseRouter.use("/page", pageRoutes);
baseRouter.use("/faq", faqRoutes);
baseRouter.use("/testimonial", testimonialRoutes);
baseRouter.use("/callback", callbackRoutes);
baseRouter.use("/cart", cartRoutes);
baseRouter.use("/coupon", couponRoutes);
baseRouter.use("/address", addressRoutes);
baseRouter.use("/order", orderRoutes);

module.exports = { baseRouter, basePath };
