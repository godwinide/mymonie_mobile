const router = require("express").Router();
const { ensureAuthenticated } = require('../config/auth');


router.get("/",ensureAuthenticated, (req,res) => {
    res.render("account", {req});
})


module.exports = router;