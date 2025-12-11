import { WebPlugin } from '@capacitor/core';
import type { 
  MysignPlugin, 
  InitializeOptions, 
  RegisterDeviceOptions, 
  RegisterDeviceResult,
  AuthorizeOptions,
  AuthorizeMultipleOptions,
  AuthorizeMultipleResult
} from './definitions';

export class MysignWeb extends WebPlugin implements MysignPlugin {
  async initialize(options: InitializeOptions): Promise<void> {
    console.log('Mysign SDK initialization (web platform not supported)', options);
    throw this.unavailable('Mysign SDK is not available on web platform');
  }

  async getDeviceId(): Promise<{ deviceId: string }> {
    console.log('Get device ID (web platform not supported)');
    throw this.unavailable('Mysign SDK is not available on web platform');
  }

  async registerDevice(options: RegisterDeviceOptions): Promise<RegisterDeviceResult> {
    console.log('Register device (web platform not supported)', options);
    throw this.unavailable('Mysign SDK is not available on web platform');
  }

  async authorizePendingRequest(options: AuthorizeOptions): Promise<void> {
    console.log('Authorize pending request (web platform not supported)', options);
    throw this.unavailable('Mysign SDK is not available on web platform');
  }

  async authorizeMultiplePendingRequests(options: AuthorizeMultipleOptions): Promise<AuthorizeMultipleResult> {
    console.log('Authorize multiple pending requests (web platform not supported)', options);
    throw this.unavailable('Mysign SDK is not available on web platform');
  }
}