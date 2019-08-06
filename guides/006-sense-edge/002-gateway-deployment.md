---
title: Reach Edge Agent (Beta)
description: "Reach Edge Agent Guide"
---

## Introduction

The Reach Edge Agent (beta) is a lightweight version of our production system's pipeline in an embeddable version for edge computing.  It is designed to run on "gateway" devices that aggregate and processes data from sensors.  The Reach Edge Agent can serve many use cases such as reducing networking costs by only propagating exceptional events or preserving privacy by taking actions on data that never touches the cloud.  Reach Edge Agents can be configured via the Sixgill Dash or Sense API enabling dynamic capabilities on the edge.   

## Installation

The Reach Edge Agent is currently in Beta.  For access please contact [Sixgill Support](mailto:support@sixgill.com) and request access.  Windows, Mac, and Linux are currently supported.    

## Usage

The Reach Edge Agent (beta) runs as a binary on a "gateway" device.  To start the agent run the following command:  

```
reach-edge-agent gateway -parent-address="https://sense-ingress-api.sixgill.com" -api-key=MY-KEY-12345
```

**Flag**|**Description**
-|-
**parent-address** | Parent (defaults to Sense production) instance API URL
**api-key** | API Key retrieved from the Sense Dash

Running the binary, with the proper flag values, registers the agent with the parent instance making it visible in Sense Dash.  Once running, the agent will auto-update its internal set of rules and configuration settings while listening on the given port for incoming sensor data.  The agent operates using the same REST API interface as the Sense Ingress API.  For example, to register a device with the agent:

```bash
curl -X POST http://localhost:8080/v1/registration -d `{
  "apiKey": "12345ABCDEF",
  "properties": {
    "model": "iPhone",
    "type": "iOS"
  }
}`
```

To send event data to the agent:

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

Check out our documentation on [Rules](/guides/rules/overview) to get a full sense of what's possible with the Reach Edge Agent's edge computing capabilities. 
