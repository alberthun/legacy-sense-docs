---
title: APIs
path: /apis/overview
---

## Sense API

The Sense API is a RESTful JSON API that allows developers to access the majority of the Sense platform’s functionality, such as:

- Creating and managing user accounts within the organization 
- Configuring data channels and projects to organize rules and collections of data streams
- Defining landmarks around areas of interest for geographical-based triggers
- Specifying additional data attributes or time constraints for evaluation
- Building rules around these various conditions and the corresponding actions to be executed



## Ingress API

The Ingress API is a key component that allows data ingestion into Sense, enabling devices to connect to the Sense pipeline for event processing
- API supports both JSON and Protobuf formatted data
- Allows mobile (iOS, Android) and generic IoT devices to register with the platform
- Mobile devices post sensor data payloads to the Ingress mobile endpoint, sending device location, power and activity state, and readings of nearby beacons and WiFis
- IoT devices post sensor data payloads to the Ingress IoT endpoint


</div>