const router = require("express").Router();
const { ensureAuthenticated } = require('../config/auth');
const padMinutes = require("../utils/padMinutes");


router.get("/:id", ensureAuthenticated, (req,res) => {
    const id = req.params.id;
    const hist = req.user.history.filter(e => e.id == id)[0];
    console.log(hist)
    res.render("detail", {req, hist, padMinutes});
})


module.exports = router;