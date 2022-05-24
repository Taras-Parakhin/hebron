const {emailActionsEnum} = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    subject: 'Welcome on board',
    templateName: 'welcome'
  }
}
