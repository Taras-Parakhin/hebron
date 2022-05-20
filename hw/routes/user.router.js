const {Router} = require('express');

const {userController} = require('../controllers');
const {
  userMiddleware: {
    createUserValidator,
    updateUserValidator,
    duplicateEmail,
    validId,
    getUserDynamically
  },
  queryMiddleware
} = require('../middlewares');

const userRouter = Router();

userRouter.get('/', queryMiddleware.queryValidator, userController.getAllUsers);
userRouter.post('/', createUserValidator, duplicateEmail, userController.createUser);

userRouter.all('/:userId', validId, getUserDynamically('userId', 'params', '_id'));
userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', updateUserValidator, userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter;
