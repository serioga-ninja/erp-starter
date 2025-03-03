import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export default class StringService {
  randomString(length: number): string {
    if (length % 2 !== 0) {
      length++;
    }

    return randomBytes(length / 2).toString('hex');
  }
}
