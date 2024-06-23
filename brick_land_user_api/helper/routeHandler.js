const { Router } = require("express");
const baseRouter = Router();
const basePath = "/api/user";

const imageRoutes = require("../module/common/common-image/routes/imageRoutes");
const userRoutes = require("../module/common/user/routes/userRoutes");
const bannerRoutes = require("../module/common/banner/routes/bannerRoutes");
const faqRoutes = require("../module/common/faq/routes/faqRoutes");
const testimonialRoutes = require("../module/common/testimonial/routes/testimonialRoutes");
const callbackRoutes = require("../module/common/callback/routes/callbackRoutes");
const contactInfoRoutes = require("./../module/common/contact-info/routes/contactInfoRoutes");
const careerRoutes = require("./../module/common/career/routes/routes");
const teamRoutes = require("./../module/common/Team/routes/routes")
const propertyRoutes = require("./../module/common/property/routes/propertyRoutes");
const eventRoutes = require("./../module/common/event/routes/eventRoutes");
const blogRoutes = require("./../module/common/blogs/routes/blogsRoutes")

baseRouter.use("/", userRoutes);
baseRouter.use("/upload", imageRoutes);
// banner
baseRouter.use("/banner", bannerRoutes);
// Faq
baseRouter.use("/faq", faqRoutes);
// testimonial
baseRouter.use("/testimonial", testimonialRoutes);
// contact us
baseRouter.use("/callback", callbackRoutes);
baseRouter.use("/contactInfo",contactInfoRoutes);
// career page
baseRouter.use("/career",careerRoutes);
// team
baseRouter.use("/team",teamRoutes)
// property page
baseRouter.use("/property",propertyRoutes);
// event page
baseRouter.use("/event",eventRoutes);
// blog page
baseRouter.use("/blog",blogRoutes);

module.exports = { baseRouter, basePath };
