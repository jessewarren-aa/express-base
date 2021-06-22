var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

const { authRoute } = require("../util/session_util");
const { User } = require("../models");
const e = require('express');

router.get("/", authRoute, async (req, res) => {
  const userId = req.headers.auth_token.split(":")[0];
  
  const user = await User.findByPk(userId, {
    attributes: ["username"]
  });

  res.json({ 
    response: user.username
  });
});

router.post("/", async (req, res) => {
  const user = await User.build({ 
    username: req.body.username,
    password_hash: bcrypt.hashSync(req.body.password)
   });
  if (user) {
    await user.save()
    res.json({ 
      response: user
    });
  } else {
    res.json({ response: "error - couldn't create account"})
  }
});

module.exports = router;