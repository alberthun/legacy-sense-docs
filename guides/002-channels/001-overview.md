---
title: Overview
description: "Using Channels in Sense"
---

A data channel is a source of data that flows into the Sense platform. For example, a channel could include all iOS devices with an app that uses the Sense Reach iOS SDK. Channels are collections of mobile apps that use the Sense SDKs, or of any other devices that write to the Sense Ingress API.

Channels are created based on the type of device that will connect to it. A channel can be of type iOS, Android, or IoT.


## Creating a Channel

1.  In the dashboard, go to Channels. If this is your organization's first channel, you will be presented with an Intro screen. Click **Add New Channel**

![](images/add_new_channel.png)

2.  Click on the type of channel you would like to create
    -  Select **iOS Mobile Devices** to create a channel for iOS data for apps using the Sense Reach iOS SDK
    -  Select **Android Mobile Devices** to create a channel for Android data for apps using the Sense Reach Android SDK
    -  Select **IoT Devices** to create a channel for generic IoT data that will be sent using the Sense Ingress API
3.  Enter a name for your channel. Channel names must be unique to your account.

This will create a Channel for the type of data you wish to ingest.

See the [Channels API docs](/apis/sense-api#/) for creating and managing channels through the API.
