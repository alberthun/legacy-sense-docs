---
title: iOS SDK
description: ""
---
# Sixgill Reach iOS SDK Setup
The Sixgill Reach iOS SDK v2 is a package for collecting iOS device sensor data for use with the Sixgill Sense platform. In order to fully utilize the Reach SDK, permissions will have to be requested at app level to enable features using Core Location, Push Notifications, and Core Motion. Follow the guides below to configure your app.

## Installation
To integrate Sixgill into your Xcode project use CocoaPods

### CocoaPods
CocoaPods is a dependency manager for Cocoa projects. You can install it with the following command:
```
$ gem install cocoapods
```

Initialise podfile:
```
$ pod init
```


Specify following in your ```Podfile```
```
source 'https://github.com/CocoaPods/Specs.git'
source 'https://github.com/sixgill/SixgillPodSpecs.git'

platform :ios, '9.0'
use_frameworks!

target '<Your Target Name>' do
pod 'SixgillSDK', '~> 1.2.1'
end
```

Then, run the following command:
```
$ pod install
```

## SDK Configuration
## Permission Configuration

### Enabling Background Mode Capabilities

1. Go the Capabilities tab for your app's target and enable "Background Modes"
1. Check "Location Updates", "Background fetch", and "Remote notifications"

### Core Location

1. Find the UIRequiredDeviceCapabilities key in your app's Info.plist file and add the following keys to the array:
   - location-services
   - gps
2. In your app's Info.plist file, add the keys  `NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysAndWhenInUseUsageDescription` with string values. Set the string values to the messages you want to be displayed to your users when your app requests permission to use the location services. An example would be something like `Weather uses your location to provide you with accurate forecasts wherever you go.`
3. If your app supports iOS 10 and earlier, also add the key `NSLocationAlwaysUsageDescription` with a string value. Set the string value with message similar to above.

After you've followed the above steps, you are ready to request permission from the user to use location services using the SGDK's requestLocationPermission call:

```
_locationManager.delegate = self;
[SGSDK requestAlwaysPermission];
```

### Push Notifications

Navigate to App Settings > Capabilities and switch Push Notifications to On. Confirm that push notifications has been enabled by checking the App Bundle ID on your Apple Developer account.

### Access WiFi Information (for iOS 12 and later)

Navigate to App Settings > Capabilities and switch Access WiFi Information to On.

### Core Motion

In your app's Info.plist file add the key `NSMotionUsageDescription` with a string value. Set the string value to the message you want to be displayed to your users when your app requests permission to use the core motion services.

## Usage

Using the Reach SDK is simple. Once initialized and enabled, the SDK will run in the background.


### SDK Initialization

For Sixgill hosted applications, start SDK before actually enabling it in you application:
```objc
[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY"];
```

If you wish to configure SDK endpoints or start/stop sending events data to Sixgill Server pass config as parameter in startWithAPIKey:
- andShouldSendDataToServer = true => allowing to send events to Sixgill server
- andShouldSendDataToServer = false => restricting to send events to Sixgill server
```objc
NSMutableDictionary<NSString*, NSString*> *aliases = [[NSMutableDictionary alloc] init];
[aliases setValue:"YOUR_PHONE_NUMBER" forKey:@"PHONE_NUMBER"];
SGSDKConfigManager *config = [[SGSDKConfigManager alloc] initWithIngressURL:"INGRESS_URL" shouldSendDataToServer:true aliases:aliases];
[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY" andConfig:config];
```

One more version of the method is available that let's you asynchronously intercept if the initialisation was successful or not.
```objc
NSMutableDictionary<NSString*, NSString*> *aliases = [[NSMutableDictionary alloc] init];
[aliases setValue:"YOUR_PHONE_NUMBER" forKey:@"PHONE_NUMBER"];
SGSDKConfigManager *config = [[SGSDKConfigManager alloc] initWithIngressURL:"INGRESS_URL" shouldSendDataToServer:true aliases:aliases];

[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY" andConfig:config 
    andSuccessHandler:^{
        //can be used enable SDK here as initialisation was successful
        
    } andFailureHandler:^(NSString *msg) {
        // initialisation failed, code to fallback logic goes here    
        
    }
];
```

### SDK Stop

In your app, when you want to stop the SDK, add the following code:

```objc
[SGSDK disable];
```

### Integrating Push Notifications

First check you have `Push Notification` in `Permission Configuration`, then go ahead with following steps:

To register for push notifications, add the following in app delegate's `didFinishLaunchingWithOptions` method:
```objc
[[UIApplication sharedApplication] registerForRemoteNotifications];
```

To hook the Reach SDK up to your app's push notification, implement the following code in your app delegate's `didReceiveRemoteNotification` method.
```objc
[SGSDK didReceivePushNotificationPayload:userInfo withCompletionHandler:completionHandler];
```

In your app delegate's `didRegisterForRemoteNotificationsWithDeviceToken` method add the following code to register device token:
```objc
const unsigned *tokenBytes = [deviceToken bytes];
NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
[SGSDK setPushToken:hexToken];
```

In your app delegate's `applicationWillTerminate` method add the following code to store events in offline mode:
```objc
[SGSDK saveCoreDataContext]
```

### SDK functonalities
Reach provides following methods to expose it's dfferent functionalities-

Enable SDK only after initalisation of SDK is successful

To start Reach sensors, call enable
```objc
[SGSDK enable];
```

Just as startWithAPIKey, enable takes in callbacks as well to notify of success and failure event while starting the SDK services.
```objc
[SGSDK enable:^{
        // SDK running successfully
    [SGSDK setMotionActivityEnabled:YES]; // Depending on if you need activity services        
    } onFailureHandler:^(NSString *msg) {
        // there was some error in starting the SDK
        
    }
];
```

To stop Reach sensors:
```objc
[SGSDK disable];
```

To get Reach logs:
```objc
[SGSDK logs];
```

To clear Reach logs:
```objc
[SGSDK clearLogs];
```

To get Sixgill Device ID:
```objc
[SGSDK deviceId];
```

To force sensors update:
```objc
[SGSDK forceSensorUpdate];
```

To get sensor update event location:
```
NSArray *locations = [SGSDK sensorUpdateHistory:count];

for (NSDictionary *d in locations) {
    NSNumber *lat = d[@"lat"];
    NSNumber *lon = d[@"lon"];
    float laf = lat.floatValue;
    float lof = lon.floatValue;
}
```

To get the sensor updates:

- In class where you want this data, extend that class with  `SensorUpdateDelegate`.
- On viewDidAppear, do this
```objc
[SGSDK registerForSensorUpdates:self];
```
- On viewWillDisappear, do this
```objc
[SGSDK registerForSensorUpdates:nil];
```
- Implement this method `sensorUpdateSentWithData`  to access sensor updated data. This method gives `sensorData` as Ingress.Event and it can be used to get different data. To use sensorData, refer to the following snippets:
    - Activities
    ```
    NSArray<Activity *> *activities = sensorData.activitiesArray;
    ```
    - Locations
    ```
    NSArray<Location *> *locations = sensorData.locationsArray;
    ```
    - Configuration
    ```
    Configuration *configurations = sensorData.configurations;
    ```
    - Power
    ```
    NSArray<Power *> *powersArray = sensorData.powersArray;
    ```
    -  Beacons in range
    ```
    NSArray<IBeacon *> *ibeaconsArray = sensorData.ibeaconsArray;
    ```
    -  Wifi
    ```
    NSArray<Wifi *> *wifisArray = sensorData.wifisArray;
    ```
    -  Health Data
        ```
        NSDictionary *attributes = sensorData.attributes;
        ```
        * Steps Moved:
        ```
        if ([attributes objectForKey:@"STEPS"]) {
              NSString *steps = attributes[@"STEPS"];
        }
        ```
        * Distance Covered: 
        ```
        if ([attributes objectForKey:@"DISTANCE"]) {
               CGFloat distance = [attributes[@"DISTANCE"] floatValue];
               NSString *distanceInMeters = [NSString stringWithFormat:@"%.02f meters", distance];
        }    
        ```
        * Floors Ascended: 
        ```
        if ([attributes objectForKey:@"FLOORS-ASCENDED"]) {
            NSString *floorsAscended = attributes[@"FLOORS-ASCENDED"];
        }
        ```
        * Floors Descended: 
        ```
        if ([attributes objectForKey:@"FLOORS-DESCENDED"]) {
            NSString *floorsDescended = attributes[@"FLOORS-DESCENDED"];
        }
        ```
    