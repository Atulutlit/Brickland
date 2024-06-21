const { Router } = require("express");
const baseRouter = Router();
const basePath = "/api/admin";

const adminRoutes = require("../module/admin/routes/adminRoutes");
const imageRoutes = require("../module/common/common-image/routes/imageRoutes");
const faqRoutes = require("../module/common/faq/routes/faqRoutes");
const testimonialRoutes = require("../module/common/testimonial/routes/testimonialRoutes");
const callbackRoutes = require("../module/common/callback/routes/callbackRoutes");
const userRoutes = require("../module/common/user/routes/userRoutes");
const eventRoutes = require("../module/common/event/routes/eventRoutes");
const bannerRoutes = require("./../module/common/banner/routes/bannerRoutes");
const propertyRoutes = require("./../module/common/property/routes/propertyRoutes");
const contactInfoRoutes = require("./../module/common/contact-info/routes/contactInfoRoutes")
const teamRoutes = require("./../module/common/Team/routes/routes")
const careerRoutes =require("./../module/common/career/routes/routes")
const blogsRoutes = require("./../module/common/blogs/routes/blogsRoutes");

// admin(login)
baseRouter.use("/", adminRoutes);
// upload(image,video and many more)
baseRouter.use("/upload", imageRoutes);
// Event(add,delete,update and read)
baseRouter.use("/event", eventRoutes);
// Frequently asked Question(read,update,delete and add)
baseRouter.use("/faq", faqRoutes);
// Testimonial added
baseRouter.use("/testimonials", testimonialRoutes);
// Callback routes added
baseRouter.use("/callback", callbackRoutes);
// user routes added
baseRouter.use("/user", userRoutes);
// banner at about 
baseRouter.use("/banner",bannerRoutes);
// property related
baseRouter.use("/property", propertyRoutes);
// contact information of company
baseRouter.use("/contact",contactInfoRoutes);
// Career Page
baseRouter.use("/career",careerRoutes);
// Detailing of Team
baseRouter.use("/team",teamRoutes);
// Blog Page
baseRouter.use("/blog",blogsRoutes);

module.exports = { baseRouter, basePath };
