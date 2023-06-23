const express = require('express');
const botInfo = require("../controller/mainContoller");

const router = express.Router();

router
    .route("/")
    .get(botInfo.getPage)
    .post(botInfo.getResponse)

module.exports = router;