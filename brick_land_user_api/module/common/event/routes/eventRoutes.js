const eventRoutes = require("express").Router();
const { addEvent, eventList, eventDetails } = require("../controller/eventHandler");

eventRoutes.get("/list", eventList);
eventRoutes.get("/details/:blogsId", eventDetails);

module.exports = eventRoutes;
