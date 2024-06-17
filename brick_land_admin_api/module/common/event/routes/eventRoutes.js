const eventRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const { addEvent, eventList, eventDetails, updateEvent, changeStatus, deleteEvent } = require("../controller/eventHandler");
const { eventJoiMiddleware,changeStatusJoiMiddleware,} = require("../service/faqService");

eventRoutes.post("/add", jwtAdminVerify, addEvent);  // remove eventJoiMiddleware  
eventRoutes.get("/list", jwtAdminVerify, eventList);
eventRoutes.get("/details/:blogsId", jwtAdminVerify, eventDetails);
eventRoutes.put("/update", jwtAdminVerify, eventJoiMiddleware, updateEvent);
eventRoutes.put("/status",jwtAdminVerify,changeStatusJoiMiddleware,changeStatus);
eventRoutes.delete("/delete", jwtAdminVerify, deleteEvent);

module.exports = eventRoutes;
