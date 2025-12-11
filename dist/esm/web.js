import { WebPlugin } from '@capacitor/core';
export class MysignWeb extends WebPlugin {
    async initialize(options) {
        console.log('Mysign SDK initialization (web platform not supported)', options);
        throw this.unavailable('Mysign SDK is not available on web platform');
    }
    async getDeviceId() {
        console.log('Get device ID (web platform not supported)');
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
//# sourceMappingURL=web.js.map