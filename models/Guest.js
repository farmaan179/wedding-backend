const mongoose = require("mongoose");
const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    withText: { type: String, trim: true, maxlength: 60, default: "" },
    code: { type: String, required: true, unique: true },
    opened: { type: Boolean, default: false },
    openedAt: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Guest", guestSchema);