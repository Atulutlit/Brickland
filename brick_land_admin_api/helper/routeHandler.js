const { Router } = require("express");
const baseRouter = Router();
const basePath = "/api/admin";

const adminRoutes = require("../module/admin/routes/adminRoutes");
const imageRoutes = require("../module/common/common-image/routes/imageRoutes");
const faqRoutes = require("../module/common/faq/routes/faqRoutes");
const pageRoutes = require("../module/common/static-pages/routes/staticPageRoutes");
const testimonialRoutes = require("../module/common/testimonial/routes/testimonialRoutes");
const productRoutes = require("../module/modules/product/routes/productRoutes");
const callbackRoutes = require("../module/common/callback/routes/callbackRoutes");
const userRoutes = require("../module/common/user/routes/userRoutes");
const blogCategoryRoutes = require("../module/modules/blog-category/routes/categoryRoutes");
const eventCategoryRoutes = require("../module/modules/event-category/routes/categoryRoutes");
const eventRoutes = require("../module/common/event/routes/eventRoutes");
//@atul edited
const bannerRoutes = require("./../module/common/banner/routes/bannerRoutes");
const propertyRoutes = require("./../module/common/property/routes/propertyRoutes");
const contactInfoRoutes = require("./../module/common/contact-info/routes/contactInfoRoutes")
// @atul
const properyCategoryRoutes = require("./../module/modules/property-category/routes/categoryRoutes");
const teamRoutes = require("./../module/common/Team/routes/routes")
const careerRoutes =require("./../module/common/career/routes/routes")

baseRouter.use("/", adminRoutes);
baseRouter.use("/upload", imageRoutes);
baseRouter.use("/event/category", eventCategoryRoutes);
baseRouter.use("/event", eventRoutes);
baseRouter.use("/blog/category", blogCategoryRoutes);
baseRouter.use("/property/category",properyCategoryRoutes);

baseRouter.use("/faq", faqRoutes);
baseRouter.use("/page", pageRoutes);
baseRouter.use("/testimonials", testimonialRoutes);
// baseRouter.use("/product", productRoutes);
baseRouter.use("/callback", callbackRoutes);
baseRouter.use("/user", userRoutes);
//@atul edited
baseRouter.use("/banner",bannerRoutes);
baseRouter.use("/property", propertyRoutes);
baseRouter.use("/contact",contactInfoRoutes);
baseRouter.use("/career",careerRoutes);
baseRouter.use("/team",teamRoutes);

module.exports = { baseRouter, basePath };
