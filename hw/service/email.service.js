const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');

const {SYSTEM_MAIL, SYSTEM_MAIL_PASSWORD, FRONTEND_URL} = require('../config/config');
const templateInfoObject = require('../email-templates');
const ApiError = require('../error/apiError');
const {errorsEnum} = require('../constants');

const sendMail = async (receiverMail, emailAction, locals = {}) => {
  const templateRender = new EmailTemplate({
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  });

  const templateInfo = templateInfoObject[emailAction];

  if (!templateInfo) {
    throw new ApiError(errorsEnum.WRONG_EMAIL_ACTION);
  }

  locals = {...locals, frontendURL: FRONTEND_URL}

  const html = await templateRender.render(templateInfo.templateName, locals);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SYSTEM_MAIL,
      pass: SYSTEM_MAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: SYSTEM_MAIL,
    to: receiverMail,
    subject: templateInfo.subject,
    html
  });
};

module.exports = {
  sendMail
}

