---
title: Gateway (Beta)
description: "Deploying the Gateway for Edge Rule Processing"
---

## Introduction

The Sixgill Sense Gateway (beta) is a lightweight version of our production system's pipeline in an embeddable version for edge computing.  It is designed to run on "Gateway" devices that aggregate and processes data from sensors.  The Sixgill Sense Gateway can serve many use cases such as reducing networking costs by only propagating exceptional events or preserving privacy by taking actions on data that never touches the cloud.  Gateways can be configured via the Sixgill Dash or Sense API enabling dynamic capabilities on the edge.   

## Installation

The Sixgill Sense Gateway is currently in Beta.  For access please contact [Sixgill Support](support@sixgill.com) and request access.  Windows, Mac, and Linux are currently supported.    

## Usage

The Sixgill Sense Gateway (beta) runs as a binary on a "Gateway" device.  To start the gateway run the following command:  

```
sense-gateway -assets=my_dir -parent="https://sense-ingress-api.sixgill.com" -apikey=MY-KEY-12345 -port=8080
```

**Flag**|**Description**
-|-
**assets** | Directory to store required assets
**parent** | Parent (defaults to Sense production) instance API URL
**apikey** | Gateway API Key retrieved from the Sense Dash
**port** | Gateway's listening port

Running the binary, with the proper flag values, registers the gateway with the parent instance making it visible in Sense Dash.  Once running, the gateway will auto-update its internal set of rules and configuration settings while listening on the given port for incoming sensor data.  The Gateway operates using the same REST API interface as the Sense Ingress API.  For example, to register a device with the gateway:

```bash
curl -X POST http://localhost:8080/v1/registration -d `{
  "apiKey": "12345ABCDEF",
  "properties": {
    "model": "iPhone",
    "type": "iOS"
  }
}`
```

To send event data to the gateway:

```bash
curl -X POST http://localhost:8080/v1/events -d `{
  "timestamp": 1529462707,
  "locations": [
    {
      "timestamp": 1529462707,
      "latitude": 43.09569324585551,
      "longitude": -77.5658711003336,
      "velocity": 12.2,
      "course": 77.9,
      "accuracy": 10.4
    }
  ]
}`
```
