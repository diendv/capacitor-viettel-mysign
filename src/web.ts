import { WebPlugin } from '@capacitor/core';

import type { MysignPlugin } from './definitions';

export class MysignWeb extends WebPlugin implements MysignPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
