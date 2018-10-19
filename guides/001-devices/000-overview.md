---
title: Overview
description: "Connecting devices to Sense"
---

## Connecting Mobile Devices

Developers can connect mobile devices to the Sense platform easily using the Reach SDK. Device sensor data is pulled into Sense through the Ingress API. For mobile devices, this can be done by integrating the Reach SDK into a mobile app. The SDK handles sensor gathering (GPS, WiFi, beacons, activity and motion, etc) at configurable intervals, and automatically sends the data to the Ingress API. The SDKs are authenticated using the API keys for their respective channels.

Read more about the [SDKs](/guides/devices/sdk-overview).

The SDK is available for both [iOS](/guides/devices/ios-sdk) and [Android](/guides/devices/android-sdk).

## Connecting IoT Devices

The platform is able to ingest generic IoT sensor data. Developers will need to use the [Ingress API](/apis/ingress) to send data to the IoT events endpoint.

1. [Schemas](/guides/channels/schemas) are required in order to make the most of your sensor data. Contact [support@sixgill.com](mailto:support@sixgill.com) with any questions regarding setting up your channel for IoT data.
2. Create an **IoT Devices** Channel if you do not have one already and select the Schema you created.
3. Use the Channel API keys to register your IoT device. Use the JSON Web Token in the response to authenticate your future requests.
4. You can begin sending sensor data to the IoT events endpoint using a gateway or other agent.  

See the IoT Events section of the [Ingress API](/apis/ingress#/Mobile/post_v1_iot_events) docs for more information.

## Device Management

The Sense platform offers a variety of options for managing devices through the dashboard or the APIs.

### Getting Devices by ID 

On the dashboard:
1) Go to the Devices tab
2) Find the device on the list
3) Click on the row to expand and display device details. 

To get device details through the API, see [get device ID](https://docs.sixgill.com/apis/sense-api#tag/devices/paths/~1v2~1devices~1:id/get)

### Look Up Device By Alias

Aliases are optional identifiers for a device. This can be the telephone number, an email address, or another unique, identifying label for a device. Some aliases, such as the telephone number, can be set automatically by the SDK. This call allows developers to find the device ID based on a unique alias.

See [look up device by alias](https://docs.sixgill.com/apis/sense-api#tag/devices/paths/~1v2~1devices~1alias-lookup/post)

### Managing Mobile Configuration

Mobile devices have a configuration that controls cadence, sensors, event time-to-live, and maximum event cache storage. This configuratio can be set through the dashboard

On the dashboard:
1) Go to the Devices tab
2) Find the device on the list
3) Click on the Actions icon at the end of the row
4) Make desired changes to your config and click **Update**

