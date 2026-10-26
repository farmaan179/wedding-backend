const router = require("express").Router();
const {
  createGuest, openInvitation, getGuests, deleteGuest,
} = require("../controllers/guestController");

router.post("/", createGuest);
router.get("/", getGuests);
router.get("/open/:code", openInvitation);
router.delete("/:id", deleteGuest);

module.exports = router;