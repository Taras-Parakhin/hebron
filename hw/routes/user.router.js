const {Router} = require('express');

const {userController} = require('../controllers');
const {
  userMiddleware: {
    newUserValidator,
    duplicateEmail,
    validId,
    existId
  }
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', newUserValidator, duplicateEmail, userController.createUser);

userRouter.all('/:userId', validId, existId);
userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter;
