export interface MysignPlugin {
    /**
     * Initialize the Mysign SDK
     */
    initialize(options: InitializeOptions): Promise<void>;
    /**
     * Register device for biometric authentication
     */
    registerDevice(options: RegisterDeviceOptions): Promise<RegisterDeviceResult>;
    /**
     * Authorize a pending signing request
     */
    authorizePendingRequest(options: AuthorizeOptions): Promise<void>;
    /**
     * Authorize multiple pending signing requests
     */
    authorizeMultiplePendingRequests(options: AuthorizeMultipleOptions): Promise<AuthorizeMultipleResult>;
}
export interface InitializeOptions {
    baseUrl: string;
    biometricTitle: string;
    clientId: string;
    clientSecret: string;
    grantType: string;
    biometricSessionTime?: number;
}
export interface RegisterDeviceOptions {
    userId: string;
    token: string;
    biometricType?: 'FACE_ID' | 'FINGER_PRINT' | 'AUTO';
}
export interface RegisterDeviceResult {
    alias: string;
    certificate: string;
}
export interface AuthorizeOptions {
    token: string;
    transactionId: string;
    request: string;
    hashAlgorithm: string;
    biometricType?: 'FACE_ID' | 'FINGER_PRINT' | 'AUTO';
}
export interface AuthorizeMultipleOptions {
    token: string;
    requests: PendingRequest[];
    biometricType?: 'FACE_ID' | 'FINGER_PRINT' | 'AUTO';
}
export interface PendingRequest {
    transactionId: string;
    request: string;
    hashAlgorithm: string;
}
export interface AuthorizeMultipleResult {
    success: PendingRequest[];
    failed: PendingRequest[];
}
export interface ErrorResponse {
    code: string;
    message: string;
    type?: 'BAD_SERVER_RESPONSE' | 'SOME_THING_WENT_WRONG' | 'DECODING_ERROR' | 'HARDWARE_ERROR' | 'AUTHENTICATE_FAILURE';
}
