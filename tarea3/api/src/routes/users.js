const router = require('express').Router()
const usersControllers = require('./../controllers/users');
const { authenticateMiddleware, authorizeMiddleware }  = require('./../middlewares/auth')


router.get('', authenticateMiddleware, usersControllers.getUsers);
router.get('/:id', authenticateMiddleware, usersControllers.getUserById);
router.post('',[authenticateMiddleware, authorizeMiddleware], usersControllers.createUser);
router.put('/:id', [authenticateMiddleware, authorizeMiddleware], usersControllers.updateUser);
router.delete('/:id',[authenticateMiddleware, authorizeMiddleware], usersControllers.deleteUser);

module.exports = router;