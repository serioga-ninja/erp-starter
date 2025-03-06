import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export default class Logger extends ConsoleLogger {
  logError(e: unknown) {
    if (e instanceof Error) {
      this.error(e.message, e.stack);
    } else {
      this.error(e);
    }
  }
}
