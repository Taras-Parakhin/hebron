const {emailActionsEnum} = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    subject: 'Welcome on board',
    templateName: 'welcome'
  },

  [emailActionsEnum.FORGOT_PASSWORD]: {
    subject: 'Forgot password?',
    templateName: 'forgotPassword'
  }
}
