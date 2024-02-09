const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('', (req, res) => {
    res.send(usersRouter);
    console.log(usersRouter);
})

module.exports = router;