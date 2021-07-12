var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const { User, Session } = require("../../models");
const { authRoute } = require("../../util/session_util");

router.get('/validate', authRoute, async (req, res) => {
  res.json({data: "success"});
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await User.findOne({ where: { username } });
    if (user) {
      const passwordCompares = bcrypt.compareSync(password, user.password_hash);
      if (passwordCompares) {
        const sessionToken = v4();
        let now = new Date();
        now.setDate(now.getDate() + 1 * 14);
        const current_session = await Session.findOne({
          where: { user_id: user.id }
        });
        if (current_session) {
          await current_session.update({
            session_uuid: sessionToken,
            expires: now
          });
        } else {
          await Session.create({
            user_id: user.id,
            session_uuid: sessionToken,
            expires: now
          });
        };
        res.json({
          response: `${user.id}:${sessionToken}`
        });
      } else {
        res.json({ response: "error - couldn't log in" });
      };
    } else {
      res.json({ response: "error - couldn't log in" });
    };
  } else {
    res.json({ response: "error - username or password undefined" });
  };
});


router.delete('/logout', authRoute, async (req, res) => {
  const session_token = req.headers.auth_token.split(":")[1];  
  if (session_token) {
    const session = await Session.findOne({
      where: { session_uuid: session_token }
    });
    const result = await session.destroy();
    if (!!result) {
      res.json({ response: "success" });
    } else {
      res.json({ response: "error - not logged out" });
    };
  } else {
    res.json({response: "error - nothing to log out"})
  }
  
});


module.exports = router;
