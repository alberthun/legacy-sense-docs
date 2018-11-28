---
title: Reach Android SDK
description: ""
---
# Sixgill Reach Android SDK Setup
The Sixgill Reach Android SDK is a package for collecting android device sensor data for use with the Sixgill Sense platform. In order to fully utilize the Reach SDK, permissions will have to be requested at app level to enable features using Location, Push Notifications, and Wifi Sensors. The SDK is "plug and play" and only requires configuration. Reach SDK supports android SDK versions from 21 to 27.

Follow the guides below to configure your app.

## Installation

Sixgill's Reach SDK can be installed by manually downloading and including an Android Archive.

**Manual**

Download the [latest Reach Android Archive](https://raw.githubusercontent.com/sixgill/sense-docs/master/android/reach-android-1.2.6.aar) and [integrate it into your project](https://developer.android.com/studio/projects/android-library.html#AddDependency).

Once added as your app's dependency, add the following dependencies to your app level build file-
```
    implementation 'com.google.protobuf:protobuf-java:3.0.0'
    implementation 'com.squareup.retrofit2:retrofit:2.3.0'
    implementation 'com.squareup.retrofit2:converter-protobuf:2.3.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:3.9.1'
    implementation 'com.google.code.gson:gson:2.8.0'
    implementation 'com.google.android.gms:play-services-gcm:11.8.0'
    implementation 'com.google.android.gms:play-services-location:11.8.0'
    implementation "android.arch.persistence.room:runtime:1.0.0"
    implementation 'com.google.android.gms:play-services-fitness:15.0.1'
    implementation 'com.google.android.gms:play-services-auth:16.0.0'
    annotationProcessor "android.arch.persistence.room:compiler:1.0.0"
    androidTestImplementation "android.arch.persistence.room:testing:1.0.0"
```
**Note: the above only applies if you are including `.aar` manually instead of using sdk hosted on cloud**


## Configuration

**Permissions**

Some of these permissions are requirements, but some can be optionally omitted to disable specific sensors.  

| Permission | Required | Omission Effect |
| --- | --- | --- |
| ACCESS\_FINE\_LOCATION | Yes | SDK inactive |
| ACCESS\_COARSE\_LOCATION | Yes | SDK inactive |
| ACCESS\_WIFI\_STATE | No | Disable Wifi detection|
| BLUETOOTH | No | Disable Beacon detection|
| BLUETOOTH\_ADMIN | No | Disable Beacon detection|
| INTERNET | Yes | SDK inactive |
| ACTIVITY\_RECOGNITION | No | Disable User Activity detection |

For Android platforms that require Runtime Permissions, it is up to the developer using the Reach SDK to get all required permissions from user depending on which sensors are being used.
If permissions are not requested or not granted by the user, the specific sensors will collect any data.
Permissions required by SDK are:
```xml
<!--Location sensors-->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-feature
        android:name="android.hardware.location.gps"
        android:required="false"/><!--optionally tell the device that app uses GPS, but it is not required-->

<!--Beacons sensors-->
    <uses-permission android:name="android.permission.BLUETOOTH"/>
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
    <uses-feature
        android:name="android.hardware.bluetooth_le"
        android:required="false"/><!--optionally tell the device that app uses Bluetooth LE sensors, but it is not required-->

<!--Wifi sensors-->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
    <uses-feature
        android:name="android.hardware.wifi"
        android:required="true"/><!--tell the device that app uses wifi hardware, which is required-->

<!--Activity recognition sensors-->
    <uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION"/>

<!--other required sensors-->
    <uses-feature android:name="android.hardware.sensor.accelerometer"
                  android:required="true" />
    <uses-feature android:name="android.hardware.sensor.compass"
                  android:required="true" />
    <uses-feature android:name="android.hardware.sensor.gyroscope"
                  android:required="true" />
```

On devices that require runtime permissions, request and acquire the required permissions from the user before starting Reach SDK.

> For more info see [Requesting runtime permissions](https://developer.android.com/training/permissions/requesting.html)

## Usage
Using the Reach SDK is simple.  Once initialized and enabled, the SDK will run in the background.

### SDK Initialization

For Sixgill hosted applications, initialize SDK before actually enabling it in your application:

```java
/**
* @param context {@link Context}
* @param apiKey {@link String}
* @return void
*/
Reach.initWithAPIKey(context, "YOUR_API_KEY");
```
SDK behavior and settings can be set by passing an object of `ReachConfig` as third parameter to `initWithAPIKey`. The parameter and its properties are optional, and you can skip one or more properties as well as the whole object. **It's highly recommended that you pass a ReachConfig with alias map attached to it.**

You can set properties in `ReachConfig` object for different purposes. Following are all the options used in `ReachConfig`:

#### Set Device Aliases
`Aliases` is a `Map` of `String` key-value pairs where key can be any consistent string with a value unique to each device. It can be Phone Number, IMEI, MAC Address etc. Aliases help the Sense Platform uniquely identify each device over multiple sessions and reinstalls, thus keeping all the data from one device under a single ID.

```java
Map<String, String> aliases = new HashMap<>();
/**      
* the key and value can contain any string.
* you must ensure that key is consistent and value is unique per device.
*/      
aliases.put("phone", "<USER PHONE NUMBER>");
ReachConfig config = new ReachConfig();
config.setAliases(aliases); // defaults to empty Map
/**           
* @param context {@link Context}
* @param apiKey {@link String}
* @param reachConfig {@link ReachConfig}
* @return void
*/         
Reach.initWithAPIKey(context, apiKey, reachConfig)
```

#### Configure SDK Endpoints
```java
ReachConfig config = new ReachConfig();
config.setIngressURL("<YOUR SDK ENDPOINT>"); //defaults to Sense Production URL
/**
* @param context {@link Context}
* @param apiKey {@link String}
* @param reachConfig {@link ReachConfig}
* @return void
*/
Reach.initWithAPIKey(context, apiKey, reachConfig)
```

#### Send Sensor Data to External Servers
If you wish to send data to your own servers, use **setSendEvents** to disable sending to Sense servers but instead just broadcast it to the app then delete from local database:
```java
ReachConfig config = new ReachConfig();
config.setSendEvents(false); //defaults to true
/**
* @param context {@link Context}
* @param apiKey {@link String}
* @param reachConfig {@link ReachConfig}
* @return void
*/
Reach.initWithAPIKey(context, apiKey, reachConfig)
```
The app can then [get the sensor data](#getting-sensor-data-events) to perform some other action, such as routing it to an external endpoint.

#### Using the Reach Callback
A version of the method is available that lets you asynchronously intercept if the initialization was successful or not.
```java
ReachConfig config = new ReachConfig();
config.setIngressURL("<YOUR SDK ENDPOINT>");
ReachCallback callback = new ReachCallback() {
    @Override
    public void onReachSuccess() {
        //can be used enable SDK here as initialization was successful
        Reach.enable(context)
    }
    @Override
    public void onReachFailure(String s) {
        // initialization failed, code to fallback logic goes here
    }
};
/**
* @param context {@link Context}
* @param apiKey {@link String}
* @param config {@link ReachConfig}
* @param callback {@link ReachCallback}
* @return void
*/
Reach.initWithAPIKey(context, apiKey, config, callback);
```

```java

public class MainApplication extends Application {
    public void onCreate() {
        super.onCreate();
        Reach.initWithAPIKey(this,"YOUR_API_KEY");
    }
}
```
> Note: `initWithAPIKey` must be called and executed successfully *at least once* before using Reach SDK at all.

### Integrating Push Notifications

Services for token refreshes and receiving messages are required to [integrate push notifications](https://firebase.google.com/docs/cloud-messaging/). Once a push notification is received it is based to the Reach SDK for processing. If your application hasn't integrated push yet, simply create the following classes and add the services to your AndroidManifest.xml. Otherwise just add the calls to the Reach SDK. Be sure to set the API key for Firebase Cloud Messaging through the dashboard. See [Configuring Your Channel for Push](/guides/getting-started#configuring-a-channel-for-push) in the Getting Started Guide.

AndroidManifest.xml
```xml 
<service
    android:name=".MyFirebaseMessagingService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
    </intent-filter>
</service>
```

MyFirebaseMessagingService.java
```java
public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onNewToken(String token) {
        Reach.setPushToken(getApplicationContext(), token);
    }
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Reach.processCommand(remoteMessage, getApplicationContext());
    }
}
```

### Reach functonalities
Other than `initWithAPIKey` mentioned above, Reach provides following methods to expose it's dfferent functionalities-

To start Reach sensors, call `enable` passing a `Context`.

```java
/**
* @param context {@link Context}
* @return void
*/
Reach.enable(context);
```
Optionally you can pass a second boolean parameter to `Reach.enable`, setting the debug mode to `true` or `false`. Logs are printed in console based on the debug mode option value. This defaults to `false`.
```java
/**
* @param context {@link Context}
* @param boolean
* @return void
*/
Reach.enable(context, true);
```
Just as `initWithAPIKey`, `enable` takes in `ReachCallback` as well to notify of success and failure event while starting the SDK services.

```java
ReachCallback callback = new ReachCallback() {
    @Override
    public void onReachSuccess() {
        // SDK running successfully
    }

    @Override
    public void onReachFailure(String s) {
        // there was some error in starting the SDK
    }
};
/**
* @param context {@link Context}
* @param boolean
* @param callback {@link ReachCallback}
* @return void
*/
Reach.enable(context, true, callback);
```


To stop Reach sensors, call `disable` passing a `Context`.

```java
/**
* @param context {@link Context}
* @return void
*/
Reach.disable(context);
```

To get Sixgill Device ID:

```java
/**
* @param context {@link Context}
* @return String - Sixgill DeviceId
*/
Reach.deviceId(context)
```

To set device push token:
```java
/**
* @param context {@link Context}
* @param token {@link String}
* @return void
*/
Reach.setPushToken(context, token)
```

To force sensors update:
```java
/**
* @param context {@link Context}
* @return void
*/
Reach.forceSensorUpdate(context)
```

To perform actions based on Push Notifications:
```java
/**
* @param remoteMessage {@link com.google.firebase.messaging.RemoteMessage}
* @param context {@link Context}
* @return void
*/
Reach.processCommand(remoteMessage, context)
```

To get FitnessOtions used by Reach
```java
/**
    returns fitness optiopns with read permissions for DataType.TYPE_STEP_COUNT_DELTA and DataType.TYPE_DISTANCE_DELTA
    for details, refer to https://developers.google.com/android/reference/com/google/android/gms/fitness/data/DataType
*/
Reach.fitnessOptions()
```

To acquire fitness permissions from user's Google account with oAuth
```java
/**
* @param requestingActivity {@link android.app.Activity}
* the activity requesting fitness permissions, should override onActivityResult to catch the success and cancel cases
* the request code will be Reach.FITNESS_REQUEST and success result should resolve with Activity.RESULT_OK in case of success
*/
Reach.getFitnessPermissions(requestingActivity)
```
> Note: To use Reach SDK with Google Fitness API, you need to register an OAUTH 2.0 client and sign your debug and release builds accordingly. For details on step by step integration, please refer to https://developers.google.com/fit/android/get-api-key

#### Listening for Push Notifications

To listen to push notifications from Sixgill, register broadcast listeners with `IntentFilter` of `Reach.PUSH_BROADCAST`

```java
const pushReceiver = new BroadcastReceiver(){
    @Override
    public void onReceive(Context context, Intent intent) {
        String actionType = intent.getStringExtras(Reach.PUSH_TYPE)
    }
}
LocalBroadcastManager manager = LocalBroadcastManager.getInstance(context);
manager.registerReceiver(pushReceiver, new IntentFilter(Reach.PUSH_BROADCAST));
```

#### Getting Sensor Data Events

To get the latest `Ingress.Event` generated from the Reach SDK, register [local broadcast](https://developer.android.com/reference/android/support/v4/content/LocalBroadcastManager) listeners with `IntentFilter` of `Reach.EVENT_BROADCAST`. You'll get the Base64 encoded `Ingress.Event` object in intent payload

```java
BroadcastReceiver mEventReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle = intent.getExtras();
        if (bundle != null) {
            String encodedEvent = bundle.getString(Reach.EVENT_DATA);
            if(encodedEvent != null) {
                byte[] b = Base64.decode(encodedEvent, Base64.DEFAULT);
                Ingress.Event  event = Ingress.Event.parseFrom(b);
            }
        }
    }
};


LocalBroadcastManager manager = LocalBroadcastManager.getInstance(this);
manager.registerReceiver(mEventReceiver, new IntentFilter(Reach.EVENT_BROADCAST));

// to unregister the listner when not in use or context is destroyed
manager.unregisterReceiver(mEventReceiver);
```
> Note: to prevent memory leaks, always make sure to unregister receivers when not in use or context is destroyed.
See [unregistering receivers](https://developer.android.com/reference/android/support/v4/content/LocalBroadcastManager#unregisterReceiver(android.content.BroadcastReceiver))


## Android Tracking Limitations

Over the years, Android and iOS have implemented various measures to limit background processing and conserve battery power. The Reach SDK uses a foreground service to be exempt from Android's Doze and App Standby modes. However, it has found that Android's power-saving measures can still impact an app's ability to track persistently over a long period of time. To further complicate the matters, device manufacturers may add their own optimization features. For best results and optimal functionality, it is recommended that:

* devices not be in power-save mode when the app is running
* devices whitelist the app from any power-saving modes or battery optimization features

While this is certainly not feasible or convenient for all users, app developers should be aware that power-saving features can impact normal SDK functionality and set expectations accordingly.

