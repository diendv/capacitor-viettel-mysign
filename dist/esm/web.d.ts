import { WebPlugin } from '@capacitor/core';
import type { MysignPlugin, InitializeOptions, RegisterDeviceOptions, RegisterDeviceResult, AuthorizeOptions, AuthorizeMultipleOptions, AuthorizeMultipleResult } from './definitions';
export declare class MysignWeb extends WebPlugin implements MysignPlugin {
    initialize(options: InitializeOptions): Promise<void>;
    getDeviceId(): Promise<{
        deviceId: string;
    }>;
    registerDevice(options: RegisterDeviceOptions): Promise<RegisterDeviceResult>;
    authorizePendingRequest(options: AuthorizeOptions): Promise<void>;
    authorizeMultiplePendingRequests(options: AuthorizeMultipleOptions): Promise<AuthorizeMultipleResult>;
}
