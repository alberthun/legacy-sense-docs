---
title: Getting Started
description: "A guide for on-boarding users and devices onto the Sense platform"
---

## Creating an Account
You will need an account to get started with Sixgill Sense. You can sign up one of two ways: you will either create your organization OR you will be invited to an existing one. If you are creating own organization, follow these steps. If you are joining an organization created by someone else, skip to [Joining an Existing Organization](#joining-an-existing-organization)

1.  Go to [dash.sixgill.com](http://dash.sixgill.com) and sign up for an account. You will be required to validate your email address.
    
2.  Once you are signed in, you can add other users to your organization through the Admin tab.

### Joining an Existing Organization

Once you have been invited to join an existing organization, you will receive an email invitation titled "Welcome to Sixgill Sense".

1. In the email, click "Accept Invite".
2. Enter your full name and desired password. Read and accept the terms of service.
3. Click "Accept Inviation" to sign in to the organization's dashboard.

![](images/dash_accept_invite.png)

## Creating a Channel
A data channel is a type of data that flows into the Sense platform. A channel could consist of all iOS devices with an app that integrates the Reach SDK, or a specific sensor type. In general, are collections of devices that write to the Sense Ingress API. Creating a channel is the first step in connecting devices to the platform. See [Channels Overview](/guides/channels/overview) for more information on creating and using channels.

## Authentication

### Devices API Keys
To send sensor data to the platform using the Ingress API or the mobile SDKs, you will need to authenticate using an API key for the respective channel - eg, iOS devices use an iOS channel, IoT devices use an IoT channel, etc. You can get these keys from the **Channels** section on the dashboard.

1. In the dashboard, go to Channels
2. Click the appropriate channel on the left, or [create a new channel](/guides/channels/overview).
3. Copy an existing key from **Api Keys** section, or click **Generate New ApiKey** to create another for that channel.

This API key is then used for SDK authentication: 
- [iOS SDK initialization](/guides/sdks/ios-sdk#sdk-initialization)
- [Android SDK initialization](/guides/sdks/android-sdk#sdk-initialization)

...or if registering a device with the Ingress API directly:
[Ingress Registration](/apis/ingress#tag/Register/paths/~1v1~1registration/post)

### Sense API Authentication

The Sense API authenticates requests with a user-specific JSON web token through Bearer authentication.

To get this token, the user makes a POST /v2/login request with their email and password combination. These are the same credentials used to log into your account on the dashboard.


## Connecting Devices
Device sensor data is ingested into Sense through the [Ingress API](/apis/ingress). For Android and iOS devices, this can be done by integrating the Reach SDK into a mobile app. The SDK handles sensor gathering at configurable intervals, and automatically sends the data to the Ingress API. The Sixgill Sync 2.0 demo app uses the Reach SDK as well as the Sense API to showcase the sensor ingestion capabilities of the platform. **The SDKs are authenticated using the [API keys](##api-keys) for their respective channels.**

### iOS SDK

[Sixgill Reach iOS SDK and User Guide](/guides/sdks/ios-sdk)
*updated October 28th, 2018*

### Android SDK

[Sixgill Reach Android SDK and User Guide](/guides/sdks/android-sdk)
*updated October 28th, 2018*
  
### Sixgill Sync 2.0
Users can also demo the mobile SDK capabilities by using the Sixgill Sync 2.0 demo application, available on the App Store and (coming soon) the Google Play Store.

[Sixgill Sync 2.0 for iOS](https://itunes.apple.com/us/app/sixgill-sync-2-0/id1272269863?mt=8)

[Sixgill Sync 2.0 for Android](https://play.google.com/store/apps/details?id=sync.sixgill.com.sync)

Pre-reqs:
A dashboard account. See [Creating an Account](#creating-an-account) for details
A [Channel](#channels) for your device type.

1. Download and open the app on your device.
2. Accept the Terms of Service.
3. Allow the requested permissions for the sensor you woud like to enable. For example, to use the location sensors and gather location data, you will need to enable Location Services.

4. Login with your Sense account credentials. _These are the same credentials used to log into your account on the dashboard._ 
![](./images/ios_login_screen.jpg)

5. Select the channel and corresponding project you wish to connect to. If your project isn't listed, make sure you've selected the correct channel. The channel is configured to work with a select group of projects.
![](./images/ios_select_channel.jpg)![](./images/ios_select_project.jpg)

6. Your device will now connect to your selected channel. The app will begin collecting sensor data events for ingestion by the Sense platform.
![](./images/ios_log_information.jpg)

You will know that Sync is connected by checking your Log tab. This will begin to populate with events being emitted from the device to the Sense platform.
  

### Connecting Other Devices (IoT devices, Sensors)

The platform is able to ingest generic sensor data. Use the IoT Devices channel type to connect all other devices. Developers can use the [Ingress API](/apis/ingress) directly to send data to the IoT events endpoint, or run a [Reach Edge Agent](/guides/sense-edge/gateway-deployment) on a gateway device.

1. [Schemas](/guides/channels/schemas) are required in order to make the most of your sensor data. Contact [support@sixgill.com](mailto:support@sixgill.com) with any questions regarding setting up your schema for data ingestion.
2. Create an **IoT Devices** Channel if you do not have one already and select the Schema you created.
3. Use the Channel API keys to register your IoT device. Use the JSON Web Token in the response to authenticate your future requests.
4. You can begin sending sensor data to the IoT events endpoint.  

See the IoT Events section of the [Ingress API](/apis/ingress#/Mobile/post_v1_iot_events) docs for more information.
  
#### Setting up Schemas

In the Sense platform, the structure of device data is mapped to fields and data types in order to perform functions such as triggering rules and generating analytics. This is done using [Schemas](/guides/channels/schemas). Mobile devices (iOS, Android) use predefined schemas that are compatible with the Reach SDK.


## Adding Rules
Rules are at the heart of device interactivity within the Sense platform. Rules define conditions around devices and sensor data and specify the actions to trigger when the conditions are met. For example, devices entering a geofence or coming within range of a beacon could trigger a notification to another device, send an email to a recipient, or post data to another web service. Rules can be complex and perform multiple actions or include data from multiple channels.

See the [Rules overview](/guides/rules/overview) for more information on creating rules.


## Adding Landmarks
Landmarks, also known as geofences, are geographical points of interest (POIs) defined by a perimeter. Landmarks can be used as conditions to rules that evaluate a device's proximity to an area. A rule may check if a device has entered, exited, is inside, or outside the landmark. The Landmark API provides several options for defining landmarks.

See the [Landmarks overview](/guides/landmarks/overview) for more information on adding landmarks.
