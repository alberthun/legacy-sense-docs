---
title: Reach iOS SDK
description: ""
Version: 1.3.0-beta.56
---
# Sixgill Reach iOS SDK Setup
The Sixgill Reach iOS SDK v2 is a package for collecting iOS device sensor data for use with the Sixgill Sense platform. In order to fully utilize the Reach SDK, permissions will have to be requested at app level to enable features using Core Location, Push Notifications, and Core Motion. The SDK supports iOS deployment target SDK versions 10.1 and above. If you have a need to support a specific older version of iOS, please reach out to [Sixgill Support](mailto:support@sixgill.com).

Follow the guides below to configure your app.

## Release Notes
* 1.3.0-beta.56 - Support indoor atlas provider

## Installation
To integrate Sixgill into your Xcode project, use CocoaPods.

### CocoaPods
CocoaPods is a dependency manager for Cocoa projects. You can install it with the following command:
```
$ gem install cocoapods
```

Initialize podfile:
```
$ pod init
```


Specify the following in your ```Podfile```
```
source 'https://github.com/CocoaPods/Specs.git'
source 'https://github.com/sixgill/SixgillPodSpecs.git'

platform :ios, '9.0'
use_frameworks!

target '<Your Target Name>' do
pod 'SixgillSDK', '~> 1.3.0-beta.56'
end
```

Then, run the following command:
```
$ pod update
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
3. If your app supports iOS 10 and earlier, also add the key `NSLocationAlwaysUsageDescription` with a string value. Set the string value to a similar message.

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

To use the SDK functions, be sure to add the following @import statement to your header:

```objc
@import SixgillSDK;
```

### SDK Initialization

For Sixgill hosted applications, start SDK before actually enabling it in your application:
```objc
[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY"];
```

SDK behavior and settings can be set by passing an object of `SGSDKConfigManager` as second parameter to `startWithAPIKey`. The parameter and its properties are optional, and you can skip one or more properties as well as the whole object. **It's highly recommended that you pass a SGSDKConfigManager with alias map attached to it.**

You can set certain properties in `SGSDKConfigManager` object for different purposes. Following are all the options used in `SGSDKConfigManager`:

#### Set Device Aliases

`Aliases` is a `Dictionary` of `String` key-value pairs where key can be any consistent string with a value unique to each device. It can be Phone Number, IMEI, MAC Address etc. Aliases help the Sense Platform uniquely identify each device over multiple sessions and reinstalls, thus keeping all the data from one device under a single ID.

```objc
NSMutableDictionary<NSString*, NSString*> *aliases = [[NSMutableDictionary alloc] init];
// the key and value can contain any string.
// you must ensure that key is consistent and value is unique per device
[aliases setValue:@"USER_PHONE_NUMBER" forKey:@"phone"];
SGSDKConfigManager *config = [[SGSDKConfigManager alloc] init];
config.aliases = aliases; // defaults to empty Map

[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY" andConfig:config];
```

#### Configure SDK Endpoints 
```objc
SGSDKConfigManager *config = [[SGSDKConfigManager alloc] init];
config.ingressURL = "YOUR_INGRESS_URL"; //defaults to Sense Production URL

[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY" andConfig:config];
```

#### Send Event Data to External Servers
If you wish to send data to your own servers, use **shouldSendDataToServer** to disable sending to Sense servers but instead just broadcast it to the app, then delete from local database:
```objc
SGSDKConfigManager *config = [[SGSDKConfigManager alloc] init];
config.shouldSendDataToServer = false; //defaults to true

[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY" andConfig:config];
```

The app can then [get the sensor data](#getting-sensor-data-events) to perform some other action, such as routing it to an external endpoint.

#### Using the Reach Callback
A version of the method is available that lets you asynchronously intercept if the initialization was successful or not:
```objc
SGSDKConfigManager *config = [[SGSDKConfigManager alloc] init];
[[SGSDK sharedInstance] startWithAPIKey:"YOUR_API_KEY" andConfig:config 
    andSuccessHandler:^{
        //can be used enable SDK here as initialization was successful 

    } andFailureHandler:^(NSString *msg) {
        // initialization failed, code to fallback logic goes here    

    }
];
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

In your app delegate's `didRegisterForRemoteNotificationsWithDeviceToken` method, add the following code to register device token:
```objc
const unsigned *tokenBytes = [deviceToken bytes];
NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
[SGSDK setPushToken:hexToken];
```

### Save Events (required) 

In your app delegate's `applicationWillTerminate` method, add the following code to store events in offline mode:
```objc
[SGSDK saveCoreDataContext]
```

### SDK functonalities
Reach provides following methods to expose it's dfferent functionalities-

Enable SDK only after initialization of SDK is successful

To start Reach sensors, call `enable`
```objc
[SGSDK enable];
```

Just as startWithAPIKey, `enable` takes in callbacks as well to notify of success and failure event while starting the SDK services.
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

To get Sixgill Device ID:
```objc
[SGSDK deviceId];
```

To force sensors update:
```objc
[SGSDK forceSensorUpdate];
```

#### Getting Sensor Data Events

To register for the sensor updates:

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
        
## How to use Indoor location providers
Reach SDK provides support for Indoor Atlas as a provider.

Running Reach SDK with indoor providers requires you to disable bitcode
- In the project build settings, make sure you have enabled All settings to be visible.
- The Build Options are the 4th section down. Select No for the Enable Bitcode option.

To use this, you need to obtain Indoor Atlas API Key and API Secret from [Indoor Atlas](https://indooratlas.freshdesk.com/support/solutions/articles/36000050559-creating-applications-and-api-keys). Once the key is obtained, set the provider manager's instance as atlas provider to the Reach SDK
```objc
```objc
SGAtlasProvider *atlasProvider = [[SGAtlasProvider alloc] initWithApiKey:@"YOUR_API_KEY" secretKey:@"YOUR_SECRET_KEY"];
[[SGSDK sharedInstance] setProviderManager:atlasProvider];
```
```
Conform `SGAtlasDelegate` in your ViewController where you want to get the data from Indoor atlas, for example
```objc
@interface MapViewController : UIViewController <SGAtlasDelegate>

-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];

    [[SGSDK sharedInstance] providerManager].providerDelegate = self;
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    [[SGSDK sharedInstance] providerManager].providerDelegate = nil;
}

- (void)didUpdateLocation:(IALocation *)location andPoint:(CGPoint)point{

}

- (void)didEnterRegionWithFloorMap:(IAFloorPlan *)floorplan andImage:(NSData *)imageData {

}

- (void)didExitRegion {

}

@end
```

The `SGAtlasDelegate` will provide you 3 methods
- didUpdateLocation : `didUpdateLocation` will be fired when the location is changed. It will provide you the location object which gives latitude, longitude, floor-level of your current position. The other argument gives CGPoint i.e. your X and Y co-ordinate relative to the floor plan. Using these details you can mark where a user is on the given floor.
- didEnterRegionWithFloorMap : `didEnterRegionWithFloorMap` will be fired when the user enters indoor-region. It will provide you the floor plan details and an image data for the floor plan image.
- didExitRegion : `didExitRegion` will be fired when a user exits indoor-region.


## iOS Tracking Limitations

Over the years, Android and iOS have implemented various measures to limit background processing and conserve battery power. The Reach SDK is designed to run indefinitely for long periods of time. However, there may be times when iOS terminates an app in the background due to low-memory in order to free up space. It is up to the app developer to engage their users to interact with the app and bring it to the foreground from time-to-time, such as with the use of local notifications.
