const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");

router.post("/", EventController.createEvent);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEvent);
router.get("/jobs/:jobId", EventController.getEventsByJobId);

module.exports = router;
