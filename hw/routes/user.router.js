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
userRouter.post('/', emptyField, validEmail, duplicateEmail, userController.createUser);

userRouter.all('/:userId', validId, existId);
userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter;
