# capacitor-viettel-mysign

ky so viettel

## Install

```bash
npm install capacitor-viettel-mysign
npx cap sync
```

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`getDeviceId()`](#getdeviceid)
* [`registerDevice(...)`](#registerdevice)
* [`authorizePendingRequest(...)`](#authorizependingrequest)
* [`authorizeMultiplePendingRequests(...)`](#authorizemultiplependingrequests)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options: InitializeOptions) => Promise<void>
```

Initialize the Mysign SDK

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#initializeoptions">InitializeOptions</a></code> |

--------------------


### getDeviceId()

```typescript
getDeviceId() => Promise<{ deviceId: string; }>
```

Get device ID

**Returns:** <code>Promise&lt;{ deviceId: string; }&gt;</code>

--------------------


### registerDevice(...)

```typescript
registerDevice(options: RegisterDeviceOptions) => Promise<RegisterDeviceResult>
```

Register device for biometric authentication

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#registerdeviceoptions">RegisterDeviceOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#registerdeviceresult">RegisterDeviceResult</a>&gt;</code>

--------------------


### authorizePendingRequest(...)

```typescript
authorizePendingRequest(options: AuthorizeOptions) => Promise<void>
```

Authorize a pending signing request

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#authorizeoptions">AuthorizeOptions</a></code> |

--------------------


### authorizeMultiplePendingRequests(...)

```typescript
authorizeMultiplePendingRequests(options: AuthorizeMultipleOptions) => Promise<AuthorizeMultipleResult>
```

Authorize multiple pending signing requests

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#authorizemultipleoptions">AuthorizeMultipleOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#authorizemultipleresult">AuthorizeMultipleResult</a>&gt;</code>

--------------------


### Interfaces


#### InitializeOptions

| Prop                       | Type                |
| -------------------------- | ------------------- |
| **`baseUrl`**              | <code>string</code> |
| **`biometricTitle`**       | <code>string</code> |
| **`clientId`**             | <code>string</code> |
| **`clientSecret`**         | <code>string</code> |
| **`grantType`**            | <code>string</code> |
| **`biometricSessionTime`** | <code>number</code> |


#### RegisterDeviceResult

| Prop              | Type                |
| ----------------- | ------------------- |
| **`alias`**       | <code>string</code> |
| **`certificate`** | <code>string</code> |


#### RegisterDeviceOptions

| Prop                | Type                                               |
| ------------------- | -------------------------------------------------- |
| **`userId`**        | <code>string</code>                                |
| **`token`**         | <code>string</code>                                |
| **`biometricType`** | <code>'FACE_ID' \| 'FINGER_PRINT' \| 'AUTO'</code> |


#### AuthorizeOptions

| Prop                | Type                                               |
| ------------------- | -------------------------------------------------- |
| **`token`**         | <code>string</code>                                |
| **`transactionId`** | <code>string</code>                                |
| **`request`**       | <code>string</code>                                |
| **`hashAlgorithm`** | <code>string</code>                                |
| **`biometricType`** | <code>'FACE_ID' \| 'FINGER_PRINT' \| 'AUTO'</code> |


#### AuthorizeMultipleResult

| Prop          | Type                          |
| ------------- | ----------------------------- |
| **`success`** | <code>PendingRequest[]</code> |
| **`failed`**  | <code>PendingRequest[]</code> |


#### PendingRequest

| Prop                | Type                |
| ------------------- | ------------------- |
| **`transactionId`** | <code>string</code> |
| **`request`**       | <code>string</code> |
| **`hashAlgorithm`** | <code>string</code> |


#### AuthorizeMultipleOptions

| Prop                | Type                                               |
| ------------------- | -------------------------------------------------- |
| **`token`**         | <code>string</code>                                |
| **`requests`**      | <code>PendingRequest[]</code>                      |
| **`biometricType`** | <code>'FACE_ID' \| 'FINGER_PRINT' \| 'AUTO'</code> |

</docgen-api>
