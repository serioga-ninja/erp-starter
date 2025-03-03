import { Global, Module } from '@nestjs/common';
import { StringService } from './services';

@Global()
@Module({
  providers: [StringService],
  exports: [StringService],
})
export default class HelpersModule {}
