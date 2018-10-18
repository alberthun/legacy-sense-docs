---
title: Sense Edge
description: "Using Edge Processing in Sense"
---

## Introduction
Edge processing allows data and operations to be processed directly on a governed device without the need for a persistent connection to the platform. This improves latency and allows automated responses to be generated and received
while they are still relevant. It can also significantly cut down on data that has to be processed and
sent to storage in a cloud connected system and can provide system functionality in low
connectivity environments.

Sixgill’s Sense Edge processing is configurable so that individual rules can be triggered on-device
or in the cloud. Customers can also determine an automated schedule for devices to report back
to the platform or can be configured to be completely network gapped. All components are
designed to utilize multiple CPU cores so a single process binary can fully utilize a target device’s
hardware if desired.


## Deploying the Sixgill Gateway

The Sixgill Gateway is a small lightweight executable that ingests data from connected devices running the Sixgill Agent.  It determines how to route inbound data via a local rules module, and take action when appropriate

### Requesting the Binary
Sixgill maintains builds for many architectures. Make sure you request the appropriate one for your needs.

### Installing the Binary
The binary has few dependencies. It will need a local installation of SqlLite3 and the following env variables set:


**Variable**|**Description**
-|-
**INGRESS\_IP\_WITH_PORT** | Ingress address and port of gateway
**JWT\_SIGNING\_KEY**  | JWT key for device registrations
**PARENT\_INGRESS** | parent gateway ingress
**PARENT\_STATS** | Parent gateway stats
**STATS\_URL** | URL for stats service
**ORG\_ID** | Organization ID for authentication
**DISABLE\_AUTHENTICATION** | Disable auth for testing
**DB\_PERSISTER\_DB\_PATH** | Reference to locatl Sqlite3 File

If you’re running Ubuntu or another flavor of Linux on your hardware, you can use a package manager to get the sqllite3 dependency.

Run:
```sudo apt-get install sqlite3```

### Running the Gateway
Once the prerequisites have been completed, you can run the gateway. Either schedule the gateway as a service or execute the binary to start the gateway.  Right away, the gateway will register with its parent and begin listening on its assigned port.

### Connecting a Device
Now that the gateway is up and running, you’ll want to connect a device.  To do this, you’ll first want to make sure that the device has a Sixgill Agent installed.  If this is complete, then you’ll need to configure the Agent to talk to the gateway.  Depending on your local network setup, this will be the local intranet address and port running the Sixgill Gateway.


### Putting it all Together
Now that you have your device connected to your gateway, you may want certain rules to run on your new gateway. Log in to the Sixgill Dashboard and make a new Edge Rule. Specify the Gateway ID, and within minutes you’ll have your new rule running on the edge.