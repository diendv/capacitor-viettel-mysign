'use strict';

var core = require('@capacitor/core');

const Mysign = core.registerPlugin('Mysign', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.MysignWeb()),
});

class MysignWeb extends core.WebPlugin {
    async initialize(options) {
        console.log('Mysign SDK initialization (web platform not supported)', options);
        throw this.unavailable('Mysign SDK is not available on web platform');
    }
    async registerDevice(options) {
        console.log('Register device (web platform not supported)', options);
        throw this.unavailable('Mysign SDK is not available on web platform');
    }
    async authorizePendingRequest(options) {
        console.log('Authorize pending request (web platform not supported)', options);
        throw this.unavailable('Mysign SDK is not available on web platform');
    }
    async authorizeMultiplePendingRequests(options) {
        console.log('Authorize multiple pending requests (web platform not supported)', options);
        throw this.unavailable('Mysign SDK is not available on web platform');
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MysignWeb: MysignWeb
});

exports.Mysign = Mysign;
//# sourceMappingURL=plugin.cjs.js.map
