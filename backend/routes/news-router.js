require ("dotenv").config();
const express = require("express");
const { getNews } = require("../controllers/news")
const router = express.Router();
router.get("/news", getNews);
module.exports = router;

