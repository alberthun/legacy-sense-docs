---
title: Channels Overview
description: "Using Channels in Sense"
---

A data channel is a type of data that flows into the Sense platform. A channel could consist of all iOS devices with an app that integrates the Reach SDK, or a specific sensor type. Channels are created based on the type of device that will connect to it. A channel can be of type iOS, Android, or IoT. 

Creating a channel is the first step in connecting devices to the platform.

_Note: Each channel uses its own API key for authentication._

## Creating a Channel

1.  In the dashboard, go to Channels. If this is your organization's first channel, you will be presented with an Intro screen. Click **Add New Channel**

![](./images/add_new_channel.png)

2.  Click on the type of channel you would like to create
    -  Select **iOS Mobile Devices** to create a channel for iOS data for apps using the Sense Reach iOS SDK
    -  Select **Android Mobile Devices** to create a channel for Android data for apps using the Sense Reach Android SDK
    -  Select **IoT Devices** to create a channel for generic IoT data that will be sent using the Sense Ingress API
3.  Enter a name for your channel. Channel names must be unique to your account.
4. 	Enter the name of one or more projects to assign your channel to. Rules created under these projects will be able to use this channel as a data source.

This will create a Channel for the type of data you wish to ingest.

## Editing a Channel

1. In the dashboard, go to Channels. Select the channel you would like to edit.
2. In the top right, click **Edit Channel**
3. Edit the name or projects the channel is assigned to. You also have the option to delete the channel. _Note: Deleting a channel will impact the devices connected to it._
4. Click **Update** when you have completed your changes.

## Using the Channels API

See the [Channels API docs](/apis/sense-api#tag/channels) for creating and managing channels through the API.


## Configuring a Channel for Push
In order to receive Push notifications, the Channel will need to be configured with mobile keys depending on the app you are using to stream data. For iOS, you will need to upload the Push certificate for your app as a **.p12 file**. For Android, you will need the Firebase key or Google Cloud Messaging key used by the app.

1. Go to Channels
2. Select the mobile channel you wish to add mobile keys for.
3. Click **Manage Mobile Keys** at the top right corner  

### Apple Push ###
- If this is an iOS channel, select the type of Environment this certificate is configured for - **Development** or **Production**. This needs to match the certificate type for Push to work so double-check that you have selected the correct option.
- Click "Choose File" and select the .p12 file from your system.
- Click **Save**  
The certificate type should be listed on the left.

### Android Push ###
- If this is an Android channel, select the messaging type you will be using - **Google Cloud Messaging** or **Firebase Cloud Messaging**. This needs to match the messaging type used by the app, so double-check that you have selected the correct option.
- Enter the API key
- Click **Save**  
The selected messaging type should be listed on the left.

_Note: If you are using the Sync 2.0 demo app and would like to test the Send Push action, please contact support@sixgill.com to configure your Channel with the proper push certificate_  
