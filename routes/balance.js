const router = require("express").Router();
const { ensureAuthenticated } = require('../config/auth');
const padMinutes = require("../utils/padMinutes");


router.get("/", ensureAuthenticated, (req,res) => {
    const date = new Date().toLocaleDateString();
    const time = `${new Date().getHours()}:${padMinutes(new Date().getMinutes())}`;
    res.render("balance", {req, date, time});
})


module.exports = router;