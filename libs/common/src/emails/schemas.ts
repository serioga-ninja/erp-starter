import type { EmailConfig } from '@app/common';
import * as Joi from 'joi';

export const emailsConfigSchema = Joi.object<EmailConfig>({
  MAILGUN_API_KEY: Joi.string().required(),
  MAILGUN_DOMAIN: Joi.string().required(),
  MAILGUN_EMAIL_FROM: Joi.string().required(),
});
