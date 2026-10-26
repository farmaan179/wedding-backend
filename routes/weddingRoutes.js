const router = require("express").Router();
const wedding = require("../data/wedding");

router.get("/", (req, res) => {
  res.json(wedding);
});

module.exports = router;