import { ProjectConfig } from '@app/common';
import * as Joi from 'joi';

export const projectConfigSchema = Joi.object<ProjectConfig>({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
});
