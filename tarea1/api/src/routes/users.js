const router = require('express').Router()
const usersControllers = require('./../controllers/users');

router.get('', usersControllers.getUsers);
router.get('/:id',  usersControllers.getUserById);
router.post('', usersControllers.createUser);
router.put('/:id', usersControllers.updateUser);
router.delete('/:id', usersControllers.deleteUser);

module.exports = router;