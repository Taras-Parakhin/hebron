const {Router} = require('express');

const userController = require('../controllers/user.controller');
const {
        emptyField,
        validEmail,
        duplicateEmail,
        validId,
        existId
      } = require('../middlewares/user.middleware');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', validId, existId, userController.getUserById);
userRouter.post('/', emptyField, validEmail, duplicateEmail, userController.createUser);
userRouter.put('/:userId', validId, existId, userController.updateUser);
userRouter.delete('/:userId', validId, existId, userController.deleteUser);

module.exports = userRouter;