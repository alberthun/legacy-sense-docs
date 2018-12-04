---
title: Device Overview
description: "Connecting and managing devices in Sense"
---

## Connecting Mobile Devices

Developers can connect mobile devices to the Sense platform easily using the Reach SDK. Device sensor data is pulled into Sense through the Ingress API. For mobile devices, this can be done by integrating the Reach SDK into a mobile app. The SDK handles sensor gathering (GPS, WiFi, beacons, activity and motion, etc) at configurable intervals, and automatically sends the data to the Ingress API. The SDKs are authenticated using the API keys for their respective channels.

Read more about the [SDKs](/guides/sdks/overview).

The SDK is available for both [iOS](/guides/sdks/ios-sdk) and [Android](/guides/sdks/android-sdk).

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
1. Go to the Devices tab
2. Find the device on the list
3. Click on the row to expand and display device details

To get device details through the API, see [get device ID](/apis/sense-api#tag/devices/paths/~1v2~1devices~1:id/get)

### Look Up Device By Alias

Aliases are optional identifiers for a device. This can be the telephone number, an email address, or another unique, identifying label for a device. Some aliases, such as the telephone number, can be set automatically by the SDK. This call allows developers to find the device ID based on a unique alias.

See [look up device by alias](https://docs.sixgill.com/apis/sense-api#tag/devices/paths/~1v2~1devices~1alias-lookup/post)

### Managing Mobile Configuration

Mobile devices have a configuration that controls cadence, sensors, event time-to-live, and maximum event cache storage. This configuration can be set through the dashboard, or through the API. 

* enabled - flag to set whether or not the device should collect sensor data
* cadence - the time, in *milliseconds*, between sensor data collection periods
* sensors -  the sensors that should be enabled during data collection
* eventTTL - the amount of time, *in milliseconds* that an unsent event is stored on the device for. _This value should not be less than the cadence._ For a majority of cases, the default value is fine.
* maxStorage - the number of events that are stored on the device. For a majority of cases, the default value is fine.

#### Using the dashboard

1. Go to the Devices tab
2. Find the device on the list
3. Click on the gear icon at the end of the row under **Actions**
4. Make desired changes to your config

- To change the tracking cadence, set **cadence** to a different value (in seconds). The minimum cadence supported by the SDK is 30 seconds.
- To stop a device from tracking altogether, uncheck the **enabled** option

_Note: These configurations can only be applied to Reach SDK-enabled mobile devices_

5) Click **Update** to save the changes. As long as the device is running the Reach SDK, it will sync the config on the next cadence update. For example, if the previous cadence was 300 seconds (5 minutes) and you update the config to a 30 second cadence, you may have to wait up to 5 minutes for the device to sync its config and apply the changes.

#### Using the API

To get and set the device configuration through the API, use [get config](/apis/sense-api#tag/devices/paths/~1v2~1devices~1:device~1config/get) and [set config](/apis/sense-api#tag/devices/paths/~1v2~1devices~1:device~1config/post)

For the mobile SDKs, here are some example payloads supported by [set config](/apis/sense-api#tag/devices/paths/~1v2~1devices~1:device~1config/post):

- To set the cadence to 1 minute:
```{"enabled":true,"cadence":60000,"sensors":"location,wifi,beacon,power,activity","eventTtl":172800000,"maxStorage":10000000}```


- To disable tracking (sensor data collection) but continue to update the device configuration every minute:
```{"enabled":false,"cadence":60000,"sensors":"location,wifi,beacon,power,activity","eventTtl":172800000,"maxStorage":10000000}```


- To use only the wifi sensor when collecting data:
```{"enabled":true,"cadence":60000,"sensors":"wifi","eventTtl":172800000,"maxStorage":10000000}```
