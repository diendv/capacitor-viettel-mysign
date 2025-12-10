package capacitor.viettel.mysign;

import android.app.Application;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.viettel.biometrics.signature.helpers.MySignSDK;
import com.viettel.biometrics.signature.helpers.GoSignSDKSetup;
import com.viettel.biometrics.signature.ultils.BiometricApiType;
import com.viettel.biometrics.signature.network.response.CertificateResponse;
import com.viettel.biometrics.signature.network.request.PendingAuthorisationRequest;
import com.viettel.biometrics.signature.network.response.AuthorisationResponse;
import com.viettel.biometrics.signature.network.response.ResponseError;
import com.viettel.biometrics.signature.listener.ServiceApiListener;
import com.viettel.biometrics.signature.listener.ServiceApiListenerEmpty;

import androidx.fragment.app.FragmentActivity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "Mysign")
public class MysignPlugin extends Plugin {

    private boolean isInitialized = false;

    @PluginMethod
    public void initialize(PluginCall call) {
        String baseUrl = call.getString("baseUrl");
        String biometricTitle = call.getString("biometricTitle");
        String clientId = call.getString("clientId");
        String clientSecret = call.getString("clientSecret");
        String grantType = call.getString("grantType");
        Long biometricSessionTime = call.getLong("biometricSessionTime", 60L);

        if (baseUrl == null || baseUrl.isEmpty()) {
            call.reject("baseUrl is required");
            return;
        }
        if (biometricTitle == null || biometricTitle.isEmpty()) {
            call.reject("biometricTitle is required");
            return;
        }
        if (clientId == null || clientId.isEmpty()) {
            call.reject("clientId is required");
            return;
        }
        if (clientSecret == null || clientSecret.isEmpty()) {
            call.reject("clientSecret is required");
            return;
        }
        if (grantType == null || grantType.isEmpty()) {
            call.reject("grantType is required");
            return;
        }

        try {
            Application application = (Application) getContext().getApplicationContext();

            // Initialize GoSignSDK
            GoSignSDKSetup.initialize(
                application,
                baseUrl,
                biometricTitle,
                clientId,
                clientSecret,
                grantType,
                biometricSessionTime
            );

            // Set configuration parameters
            // MySignSDK.setClientId(clientId);
            // MySignSDK.setClientSecret(clientSecret);
            // MySignSDK.setGrantType(grantType);

            isInitialized = true;
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to initialize Mysign SDK: " + e.getMessage(), e);
        }
    }

    @PluginMethod
    public void registerDevice(PluginCall call) {
        if (!isInitialized) {
            call.reject("Mysign SDK is not initialized. Call initialize() first.");
            return;
        }

        String userId = call.getString("userId");
        String token = call.getString("token");
        String biometricTypeStr = call.getString("biometricType", "AUTO");

        if (token == null || token.isEmpty()) {
            call.reject("token is required");
            return;
        }

        BiometricApiType biometricType = getBiometricApiType(biometricTypeStr);
        FragmentActivity activity = getActivity();

        if (activity == null) {
            call.reject("Activity is not available");
            return;
        }

        new MySignSDK.Builder()
            .withUserId(userId)
            .withToken(token)
            .withActivity(activity)
            .withBiometricApiType(biometricType)
            .registerDevice(new ServiceApiListener<CertificateResponse>() {
                @Override
                public void onSuccess(CertificateResponse data) {
                    JSObject result = new JSObject();
                    result.put("alias", data.getAlias());
                    result.put("certificate", data.getCertificate());
                    call.resolve(result);
                }

                @Override
                public void onFail(ResponseError error) {
                    JSObject errorObj = createErrorObject(error);
                    call.reject("Failed to register device", errorObj);
                }

                @Override
                public void showLoading() {
                    // Optional: notify UI about loading state
                }

                @Override
                public void hideLoading() {
                    // Optional: notify UI about loading state
                }
            })
            .build();
    }

    @PluginMethod
    public void authorizePendingRequest(PluginCall call) {
        if (!isInitialized) {
            call.reject("Mysign SDK is not initialized. Call initialize() first.");
            return;
        }

        String token = call.getString("token");
        String transactionId = call.getString("transactionId");
        String request = call.getString("request");
        String hashAlgorithm = call.getString("hashAlgorithm");
        String biometricTypeStr = call.getString("biometricType", "AUTO");

        if (token == null || token.isEmpty()) {
            call.reject("token is required");
            return;
        }
        if (transactionId == null || transactionId.isEmpty()) {
            call.reject("transactionId is required");
            return;
        }
        if (request == null || request.isEmpty()) {
            call.reject("request is required");
            return;
        }
        if (hashAlgorithm == null || hashAlgorithm.isEmpty()) {
            call.reject("hashAlgorithm is required");
            return;
        }

        BiometricApiType biometricType = getBiometricApiType(biometricTypeStr);
        FragmentActivity activity = getActivity();

        if (activity == null) {
            call.reject("Activity is not available");
            return;
        }

        PendingAuthorisationRequest pendingRequest = new PendingAuthorisationRequest(
            transactionId,
            request,
            hashAlgorithm
        );

        new MySignSDK.Builder()
            .withToken(token)
            .withActivity(activity)
            .withBiometricApiType(biometricType)
            .authorisationPendingRequest(pendingRequest, new ServiceApiListenerEmpty() {
                @Override
                public void onSuccess() {
                    call.resolve();
                }

                @Override
                public void onFail(ResponseError error) {
                    JSObject errorObj = createErrorObject(error);
                    call.reject("Failed to authorize pending request", errorObj);
                }

                @Override
                public void showLoading() {
                    // Optional: notify UI about loading state
                }

                @Override
                public void hideLoading() {
                    // Optional: notify UI about loading state
                }
            })
            .build();
    }

    @PluginMethod
    public void authorizeMultiplePendingRequests(PluginCall call) {
        if (!isInitialized) {
            call.reject("Mysign SDK is not initialized. Call initialize() first.");
            return;
        }

        String token = call.getString("token");
        JSArray requestsArray = call.getArray("requests");
        String biometricTypeStr = call.getString("biometricType", "AUTO");

        if (token == null || token.isEmpty()) {
            call.reject("token is required");
            return;
        }
        if (requestsArray == null || requestsArray.length() == 0) {
            call.reject("requests array is required and cannot be empty");
            return;
        }

        BiometricApiType biometricType = getBiometricApiType(biometricTypeStr);
        FragmentActivity activity = getActivity();

        if (activity == null) {
            call.reject("Activity is not available");
            return;
        }

        List<PendingAuthorisationRequest> pendingRequests = new ArrayList<>();
        try {
            for (int i = 0; i < requestsArray.length(); i++) {
                JSONObject requestObj = requestsArray.getJSONObject(i);
                String transactionId = requestObj.getString("transactionId");
                String request = requestObj.getString("request");
                String hashAlgorithm = requestObj.getString("hashAlgorithm");

                pendingRequests.add(new PendingAuthorisationRequest(
                    transactionId,
                    request,
                    hashAlgorithm
                ));
            }
        } catch (JSONException e) {
            call.reject("Invalid requests format: " + e.getMessage());
            return;
        }

        new MySignSDK.Builder()
            .withToken(token)
            .withActivity(activity)
            .withBiometricApiType(biometricType)
            .authorisationListPendingRequest(pendingRequests, new ServiceApiListener<AuthorisationResponse>() {
                @Override
                public void onSuccess(AuthorisationResponse data) {
                    JSObject result = new JSObject();
                    
                    JSArray successArray = new JSArray();
                    if (data.getSuccess() != null) {
                        for (String transactionId : data.getSuccess()) {
                            successArray.put(transactionId);
                        }
                    }
                    
                    JSArray failedArray = new JSArray();
                    if (data.getFailed() != null) {
                        for (String transactionId : data.getFailed()) {
                            failedArray.put(transactionId);
                        }
                    }
                    
                    result.put("success", successArray);
                    result.put("failed", failedArray);
                    call.resolve(result);
                }

                @Override
                public void onFail(ResponseError error) {
                    JSObject errorObj = createErrorObject(error);
                    call.reject("Failed to authorize multiple pending requests", errorObj);
                }

                @Override
                public void showLoading() {
                    // Optional: notify UI about loading state
                }

                @Override
                public void hideLoading() {
                    // Optional: notify UI about loading state
                }
            })
            .build();
    }

    private BiometricApiType getBiometricApiType(String type) {
        switch (type.toUpperCase()) {
            case "FACE_ID":
                return BiometricApiType.FACE_ID;
            case "FINGER_PRINT":
                return BiometricApiType.FINGER_PRINT;
            default:
                return BiometricApiType.AUTO;
        }
    }

    private JSObject createErrorObject(ResponseError error) {
        JSObject errorObj = new JSObject();
        errorObj.put("code", error.getError().getCode());
        errorObj.put("message", error.getErrorMessage());
        errorObj.put("type", error.getErrorType().toString());
        return errorObj;
    }
}
