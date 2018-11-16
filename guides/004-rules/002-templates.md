---
title: Templates
description: "Using dynamic templates to enhance messaging"
---

## Introduction

Sixgill uses [Go Templates](https://golang.org/pkg/html/template/) to let users make dynamic emails, sms, webhooks, and push messages. Templates are placeholders for data points that are to be populated dynamically when a rule is evaluated.

For example, you may want to send a different SMS to devices with different Operating Systems.

```
Welcome to the JFK Airport. Download our app to take advantage of its awesome features:
{{if eq .Device.OS "iOS"}}
https://itunes.apple.com/us/app/american-airlines/id382698565?mt=8
{{else if eq .Device.OS "Android"}}
https://play.google.com/store/apps/details?id=com.aa.android&hl=en
{{end}}
```

Or you might want to send a device's location as JSON to a device-specific url using a Webhook:

```
http://api.mycompany.com/Things/{{.Device.ID}}/Properties/Location
```

```
{
    "Location": {
        "latitude":{{.DeviceState.Location.Lat}},
        "longitude":{{.DeviceState.Location.Lon}}
    }
}
```

## Template Data Model

The Template Data Model is the structured data that's fed into the templates. Here is an outline of all the model's accessible fields:

### .Device

Field|Type|Description|Usage
-|-|-|-
ID| string | Unique Identifier (String) | {{.Device.ID}}
CreatedAt | time.Time | When the device was created | {{.Device.CreatedAt}}
UpdatedAt | time.Time | When the device was update | {{.Device.UpdatedAt}}
Manufacturer | string | Name of the manufacturer | {{.Device.Manufacturer}}
Model | string | Name of the device model | {{.Device.Model}}
OS | string | Name of the device OS | {{.Device.OS}}
OSVersion | string | Name of the device OS version | {{.Device.OSVersion}} 
SoftwareVersion | string | Name of the Sixgill software version | {{.Device.SoftwareVersion}}
Type | string | Type of device (android,ios,iot) | {{.Device.Type}}
Sensors| string | Comma seperated list of available sensors | {{.Device.Sensors}}

### .DeviceState

Field|Type|Description|Usage
-|-|-|-
Tags | [string] | Array of string tags | {{.DeviceState.Tags}}
Location | LongLat | The last known location of the device | {{.DeviceState.Location}}
UpdatedAt | time.Time | When the device state was updated | {{.DeviceState.UpdatedAt}}

### .DeviceState.Location

Field|Type|Description|Usage
-|-|-|-
Lat | float64 | Latitude | {{.DeviceState.Location.Lat}}
Lon | float64 | Longitude | {{.DeviceState.Location.Lon}}

### .Channel

Field|Type|Description|Usage
-|-|-|-
Name | string | Name of the channel | {{.Channel.Name}}
Type | string | Type of the channel | {{.Channel.Type}}

### .Event

Field|Type|Description|Usage
-|-|-|-
ID| string | Unique Identifier (String) | {{.Device.String}}
ClientSentAt | time.Time | When the event was sent from the device | {{.Event.ClientSentAt}}
ServerReceivedAt | time.Time | When the event was received by the server | {{.Event.ServerReceivedAt}}
Payload | map[string]interface{} | map of key values specific to the event | {{.Event.Payload}}
    
