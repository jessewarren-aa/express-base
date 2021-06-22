const { User, Session } = require("../models")


const userLoggedIn = async (user_id, session_token) => {
  if (!session_token) { return false }
  const sessions = await Session.findAll({
    where: {
      session_uuid: session_token
    }
  });
  const session = sessions[0];

  const user = await User.findByPk(user_id);

  if (session && user) {
    return (user.id == session.user_id);
  } else {
    return false;
  }
}


const authRoute = async (req, res, next) => {
  if (req.headers.auth_token) {
    const auth_token_split = req.headers.auth_token.split(":");
    const user_id = auth_token_split[0];
    const session_token = auth_token_split[1];
    const userAuthed = await userLoggedIn(user_id, session_token);
    if (userAuthed) {
      next()
    } else {
      res.json({
        errors: ["error - user not authed"]
      })
    }
  } else {
    res.json({
      errors: ["error - user not authed"]
    })
  }
}


module.exports = {
  authRoute
}
