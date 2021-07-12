const router = require('express').Router();
const sessionRouter = require('./sessions.js');
const usersRouter = require('./users.js');

router.use('/sessions', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;