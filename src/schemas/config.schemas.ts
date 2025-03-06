import { ProjectConfig } from '@app/common';
import * as Joi from 'joi';

export const projectConfigSchema = Joi.object<ProjectConfig>({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_SEC: Joi.string().allow('').optional(),

  GOOGLE_CALLBACK_URL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  SESSION_SECRET: Joi.string().required(),
  SESSION_SALT: Joi.string().required().max(16),
});
