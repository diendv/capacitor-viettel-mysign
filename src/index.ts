import { registerPlugin } from '@capacitor/core';

import type { MysignPlugin } from './definitions';

const Mysign = registerPlugin<MysignPlugin>('Mysign', {
  web: () => import('./web').then((m) => new m.MysignWeb()),
});

export * from './definitions';
export { Mysign };
