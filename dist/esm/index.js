import { registerPlugin } from '@capacitor/core';
const Mysign = registerPlugin('Mysign', {
    web: () => import('./web').then((m) => new m.MysignWeb()),
});
export * from './definitions';
export { Mysign };
//# sourceMappingURL=index.js.map