const crypto = require("crypto");
const Guest = require("../models/Guest");

// Admin types a name -> we make a link
const createGuest = async (req, res, next) => {
  try {
    const { name, withText } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Guest name is required" });
    }

    const code = crypto.randomBytes(4).toString("hex");
    const guest = await Guest.create({ name, withText, code });

    res.status(201).json({
      guest,
      link: `${process.env.CLIENT_URL}/invite/${code}`,
    });
  } catch (error) {
    next(error);
  }
};

// Guest opens the link -> we find the name
const openInvitation = async (req, res, next) => {
  try {
    const guest = await Guest.findOneAndUpdate(
      { code: req.params.code },
      { opened: true, openedAt: new Date() },
      { new: true }
    );

    if (!guest) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    res.json({ name: guest.name, withText: guest.withText });
  } catch (error) {
    next(error);
  }
};

// Admin sees the list
const getGuests = async (req, res, next) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
    res.json(guests);
  } catch (error) {
    next(error);
  }
};

// Admin deletes a guest
const deleteGuest = async (req, res, next) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGuest, openInvitation, getGuests, deleteGuest };

